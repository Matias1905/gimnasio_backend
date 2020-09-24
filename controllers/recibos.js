const { ReciboSueldo } = require('../models')

module.exports = {

    list(_, res) {
        return ReciboSueldo.findAll().then(arr => res.status(200).send(arr))
            .catch(err => res.status(400).send(err))
    },

    generarReciboSueldo(req, res) {
        return ReciboSueldo.create({
            empleado_id: req.params.id,
            monto: req.body.monto,
            fecha: new Date()
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    generarRecibosMultiples(req, res) {
        const fecha = new Date()
        const array = req.body.empleados.map(a => ({ empleado_id: a.empleado_id, monto: a.monto, fecha }))
        return ReciboSueldo.bulkCreate(array, { returning: true }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    }
}