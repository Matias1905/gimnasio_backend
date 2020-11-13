const { ReciboSueldo, Empleado } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')
const fetch = require('node-fetch')


module.exports = {

    list(_, res) {
        return ReciboSueldo.findAll({
            include: [
                {
                    model: Empleado,
                    as: 'empleado',
                    attributes: ['id', 'nombre', 'apellido']
                }
            ],
            order: [
                ['id', 'desc']
            ]
        }).then(arr => res.status(200).send(arr))
            .catch(err => res.status(400).send(err))
    },

    generarReciboSueldo(req, res) {
        const data = [{ cbu: req.body.cbu, monto: req.body.monto }]
        return verificarRecibo(req.params.id, new Date()).then(() => {
            return conexionBanco(data).then(response => {
                if (response.status !== 204) {
                    //handle error y salir
                    const { status } = response;
                    return response.json().then(err => res.status(status).send(err))
                } else {
                    return ReciboSueldo.create({
                        empleado_id: req.params.id,
                        monto: req.body.monto,
                        fecha: new Date()
                    }).then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err))
                }
            }).catch(err => res.status(400).send('La conexion con el banco no pudo ser realizada. ' + err))
        }).catch(err => res.status(400).send('La liquidación no pudo ser procesada. ' + err))
    },

    generarRecibosMultiples(req, res) {
        const fecha = new Date()
        const array = req.body.empleados.map(a => ({
            empleado_id: a.empleado_id,
            nombre: a.nombre,
            apellido: a.apellido,
            monto: a.monto,
            cbu: a.cbu,
            fecha
        }))

        //Chequeo que la liquidacion sea valida para cada empleado
        // si hay empleados invalidos mandar error y arrays de validos-invalidos
        return verificarEmpleados(array, fecha).then(([arrValidos, arrRechazados]) => {
            if (arrRechazados.length !== 0) {
                return res.status(409).send({ validos: arrValidos, rechazados: arrRechazados })
            }

            //Conexion con API del banco para la liquidación de sueldos
            return conexionBanco(array).then(response => {
                if (response.status !== 204) {
                    //handle error y salir
                    const { status } = response;
                    return response.json().then(err => res.status(status).send(err))
                } else {
                    return ReciboSueldo.bulkCreate(array, { returning: true }).then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err))
                }
            })

        })


    }
}

const conexionBanco = (data) => {
    const endpointBanco = 'https://mockup-integracion.herokuapp.com/banco'
    // const endpointBanco = 'https://krrl-bank.herokuapp.com/bank-api/salary-payment'

    const employerCBU = '3857985432229831285334'
    const salaries = data.map(s => ({ employeeCBU: s.cbu, salary: s.monto }))
    const body = {
        employerCBU,
        salaries
    }

    return fetch(endpointBanco, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(resp => { return resp })
}

const verificarRecibo = async (id, fecha) => {
    const start = moment(fecha).startOf('month');
    const end = moment(fecha).endOf('month');

    const empleado = await Empleado.findOne({
        where: {
            id: id,
            activo: true
        }
    })

    if (!empleado) {
        return Promise.reject('El empleado no existe o ha sido desactivado.')
    }

    const isInvalid = await ReciboSueldo.findOne({
        where: {
            fecha: {
                [Op.between]: [start, end]
            },
            empleado_id: id
        }
    })

    if (isInvalid) {
        return Promise.reject('El sueldo del empleado para este mes ya ha sido liquidado.')
    } else {
        return Promise.resolve()
    }
}


const verificarEmpleados = async (array, fecha) => {
    const start = moment(fecha).startOf('month');
    const end = moment(fecha).endOf('month');
    const arrValidos = [], arrRechazados = []
    for (const empleado of array) {
        try {

            const existeEmp = await Empleado.findOne({
                where: {
                    id: empleado.empleado_id,
                    activo: true
                }
            })

            if (!existeEmp) {
                arrRechazados.push(empleado);
            } else {
                const isInvalid = await ReciboSueldo.findOne({
                    where: {
                        fecha: {
                            [Op.between]: [start, end]
                        },
                        empleado_id: empleado.empleado_id
                    }
                })
                if (isInvalid) {
                    arrRechazados.push(empleado)
                } else {
                    arrValidos.push(empleado)
                }
            }
        } catch {
            arrRechazados.push(empleado)
        }
    }
    return [arrValidos, arrRechazados]
}