const { FichadoSocio, FichadoEmpleado } = require('../models');

module.exports = {

    getFichadosSocios(req, res) {
        return FichadoSocio.findAll().then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getFichadosEmpleados(req, res) {
        return FichadoEmpleado.findAll().then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    ficharSocio(req, res) {
        return FichadoSocio.create({
            socio_id: req.params.id,
            fecha_hora: new Date()
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    ficharEmpleado(req, res) {
        return FichadoEmpleado.create({
            empleado_id: req.params.id,
            tipo: req.body.tipo,
            fecha_hora: new Date()
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    }


}