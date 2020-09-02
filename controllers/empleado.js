const { Empleado } = require('../models')
const empleado = require('../models/empleado')

module.exports = {

    list(_, res) {
        return Empleado.findAll()
            .then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getOne(req, res) {
        return Empleado.findByPk(req.params.id)
            .then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    create(req, res) {
        return Empleado.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            genero: req.body.genero,
            fecha_nacimiento: req.body.fecha_nacimiento,
            fecha_contratacion: req.body.fecha_contratacion,
            cargo: req.body.cargo,
            sueldo_base: req.body.sueldo_base,
            sueldo_clase: req.body.sueldo_clase,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion
        })
            .then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    update(req, res){
        return Empleado.findByPk(req.params.id).then(empleado => {
            if(!empleado){
                res.status(404).send({message: 'Empleado no encontrado!'})
            }
            return empleado.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                genero: req.body.genero,
                fecha_nacimiento: req.body.fecha_nacimiento,
                fecha_contratacion: req.body.fecha_contratacion,
                cargo: req.body.cargo,
                sueldo_base: req.body.sueldo_base,
                sueldo_clase: req.body.sueldo_clase,
                telefono: req.body.telefono,
                email: req.body.email,
                direccion: req.body.direccion
            }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        })
    }



}