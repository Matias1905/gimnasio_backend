const { Socio } = require('../models')
const empleado = require('../models/empleado')

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
            }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    delete(req, res){
        return Socio.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=> res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    }


}