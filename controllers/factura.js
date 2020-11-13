const { Factura, Socio, Abono } = require('../models');
var moment = require('moment');
const fetch = require('node-fetch')

module.exports = {

    
    gestionarCompraAbono(req, res) {
        //OPCION: si la llamada no contiene el total, buscar total en el abono correspondiente.

        //TODO: if medio_pago = tarjeta: pegarle a la api antes de crear factura
        if (req.body.medio_pago === 'tarjeta') {
            //registrar pago en api tarjeta
            let data = {
                cardNumber: req.body.nro_tarjeta,
                cardCode: req.body.cvv,
                buyer: req.body.dni,
                amount: req.body.total
            }
            return conexionTarjeta(data).then(response => {
                if (response.status !== 200) {
                    //handle error y devolver 400
                    const { status } = response;
                    return response.json().then(err => res.status(status).send(err))
                } else {
                    return response.json().then(datos => {
                        console.log('datosTarjeta', datos)
                        let datosTarjeta = {
                            socio_id: req.body.socio_id,
                            abono_id: req.body.abono_id,
                            medio_pago: req.body.medio_pago,
                            nro_transaccion: datos.consumption._id,
                            total: req.body.total
                        }
                        return facturarAbono(datosTarjeta, res)
                    })
                }
            })
        } else {
            let datosPago = {
                socio_id: req.body.socio_id,
                abono_id: req.body.abono_id,
                medio_pago: req.body.medio_pago,
                total: req.body.total
            }
            return facturarAbono(datosPago, res)
        }
    },

    list(_, res) {
        return Factura.findAll({
            include: [
                {
                    model: Socio
                },
                {
                    model: Abono
                }
            ],
            order: [
                ['id', 'desc']
            ]
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    }


}

const facturarAbono = (data, res) => {
    return Factura.create({
        fecha: new Date(),
        socio_id: data.socio_id,
        abono_id: data.abono_id,
        medio_pago: data.medio_pago,
        nro_transaccion: data.nro_transaccion,
        total: data.total
    }).then(factura => {
        //actualizar datos en el socio
        return actualizarSocio(data.socio_id, data.abono_id)
            .then(socio => res.status(201).send({ factura: factura, socio: socio }))
            .catch(err => res.status(401).send(err))
    }).catch(err => res.status(400).send(err))
}

const actualizarSocio = async (socio_id, abono_id) => {
    const socio = await Socio.findByPk(socio_id)
    const abono = await Abono.findByPk(abono_id)

    //cambiar fecha de vencimiento del abono a la de hoy + los días del abono
    let date = moment().add(abono.dias_abono, 'days').endOf("day")

    socio.abonado_hasta = date;
    socio.tipo_abono = abono.tipo
    //actualizar datos en el socio
    await socio.save()
    //devolver socio
    return socio
}

//testeado pocamente

//test conexion sin fetch
const conexionTarjeta = (data) => {
    const cuit = "30-12341234-3"  //CUIT DEL COMERCIO
    let body = {
        commerce: cuit,
        ...data,
    };
    //llamado al endpoint de la tarjeta

    const endpointTarjeta = 'https://vister.herokuapp.com/api/consumos'
    //const endpointTarjeta = 'https://mockup-integracion.herokuapp.com/tarjeta'

    return fetch(endpointTarjeta, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(resp => { return resp })
}