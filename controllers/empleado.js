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
                return res.status(404).send({message: 'Empleado no encontrado!'})
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
        }).catch(err => res.status(400).send(err))
    },


    //Revisar en caso de querer hacer borrado lógico nada más
    delete(req, res){
        return Empleado.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    },


    liquidarSueldo(req, res) {
        return Empleado.findByPk(req.params.id).then(empleado => {
            if (!empleado) {
                return res.sendStatus(404)
            }
            empleado.calcularSueldo().then(monto => res.status(200).send({ monto: monto }))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },


    getProfesores(req, res) {
        return Empleado.findAll({
            where: {
                cargo: 'profesor'
            }
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    }

}