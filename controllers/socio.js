const { Socio, DatosMedicos } = require('../models')

module.exports = {

    list(_, res) {
        return Socio.findAll({
            include: [{
                model: DatosMedicos,
                as: 'datos_medicos'
            }]
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getOne(req, res) {
        return Socio.findByPk(req.params.id, {
            include: [{
                model: DatosMedicos,
                as: 'datos_medicos'
            }]
        })
            .then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    create(req, res) {
        return Socio.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            email: req.body.email,
            fecha_nacimiento: req.body.fecha_nacimiento,
            genero: req.body.genero,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fecha_asociado: new Date()
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(404).send(err))
    },

    update(req, res) {
        return Socio.findByPk(req.params.id).then(socio => {
            if (!socio) {
                return res.status(404).send({ message: 'Socio no encontrado!' })
            }

            return socio.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                email: req.body.email,
                fecha_nacimiento: req.body.fecha_nacimiento,
                genero: req.body.genero,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                activo: req.body.activo
            }).then(obj => res.status(200).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    delete(req, res) {
        return Socio.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.sendStatus(204))
            .catch(err => res.status(400).send(err))
    },

    agregarDatosMedicos(req, res) {
        return DatosMedicos.create({
            socio_id: req.params.id,
            historial: req.body.historial,
            aclaraciones: req.body.aclaraciones,
            alergias: req.body.alergias,
            apto_fisico: req.body.apto_fisico,
            fecha_desde: req.body.fecha_desde,
            fecha_hasta: req.body.fecha_hasta,
            vigente: true
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    getByDni(req, res) {
        return Socio.findOne({
            where: {
                dni: req.body.dni,
                activo: true
            }
        }).then(obj => {
            if (!obj) {
                return res.sendStatus(404)
            }
            return res.status(200).send(obj)
        }).catch(err => res.status(400).send(err))
    },
}