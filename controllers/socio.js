const { Socio } = require('../models')

module.exports = {

    list(_, res) {
        return Socio.findAll()
            .then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getOne(req, res) {
        return Socio.findByPk(req.params.id)
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
    }

}