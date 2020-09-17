const { Op } = require('sequelize')
const { Clase, Socio, Empleado, Servicio, Instalacion } = require('../models')
const moment = require('moment')


module.exports = {

    list(_, res) {
        return Clase.findAll({
            include: [{
                model: Socio,
                as: 'inscriptos',
                through: {
                     attributes: []
                }
            }]
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getOne(req, res) {
        return Clase.findByPk(req.params.id)
            .then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    create(req, res) {
        return Clase.create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            servicio_id: req.body.servicio_id,
            profesor_id: req.body.profesor_id,
            cancelada: false
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    update(req, res) {
        return Clase.findByPk(req.params.id).then(clase => {
            if (!clase) {
                return res.status(404).send({ message: 'Clase no encontrada!' })
            }

            return clase.update({
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                servicio_id: req.body.servicio_id,
                profesor_id: req.body.profesor_id,
                cancelada: req.body.cancelada
            }).then(obj => res.status(200).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    delete(req, res){
        return Clase.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=> res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    },

    inscribirSocio(req, res){
        return Clase.findByPk(req.params.id).then(clase => {
            if(!clase){
                return res.sendStatus(404)
            }
            return clase.addSocio(req.body.socio_id)
            .then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    getClasesSemana(_, res) {
        const semana = calcularSemana()
        return Clase.findAll({
            where: {
                fecha_inicio: {
                    [Op.between]: semana
                }
            },
            order: [
                ['fecha_inicio', 'asc']
            ],
            include: [
                {
                    model: Socio,
                    as: 'inscriptos',
                    through: {
                        attributes: []
                    }
                }, {
                    model: Empleado,
                    as: 'profesor',
                    attributes: ['id', 'nombre', 'apellido']
                }, {
                    model: Servicio,
                    as: 'servicio',
                    attributes: ['id', 'label'],
                    include: [{
                        model: Instalacion,
                        as: 'instalacion',
                        attributes: ['id', 'label', 'capacidad']
                    }]
                }
            ]
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getClasesServicio(req, res) {
        const semana = calcularSemana()
        return Clase.findAll({
            where: {
                servicio_id: req.params.id,
                fecha_inicio: {
                    [Op.between]: semana
                }
            },
            include: [
                {
                    model: Socio,
                    as: 'inscriptos',
                    through: {
                        attributes: []
                    }
                }, {
                    model: Empleado,
                    as: 'profesor',
                    attributes: ['id', 'nombre', 'apellido']
                }, {
                    model: Servicio,
                    as: 'servicio',
                    attributes: ['id', 'label'],
                    include: [{
                        model: Instalacion,
                        as: 'instalacion',
                        attributes: ['id', 'label', 'capacidad']
                    }]
                }
            ]
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    }

}

const calcularSemana = () => {
    const fechaS = moment().hours(0).minutes(0)
    const fechaE = moment(fechaS).add(7, 'days')

    return [fechaS, fechaE]
}