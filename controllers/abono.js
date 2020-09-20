const { Abono } = require('../models')

module.exports = {

    list(_, res) {
        return Abono.findAll({
            order: [
                ['dias_abono', 'asc']
            ]
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    },

    getOne(req, res) {
        return Abono.findByPk(req.params.id)
            .then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    create(req, res) {
        return Abono.create({
            label: req.body.label,
            tipo: req.body.tipo,
            dias_abono: req.body.dias_abono,
            precio: req.body.precio
        }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
    },

    update(req, res) {
        return Abono.findByPk(req.params.id).then(abono => {
            if (!abono) {
                return res.status(404).send({ message: 'Abono no encontrado!' })
            }

            return abono.update({
                label: req.body.label,
                tipo: req.body.tipo,
                dias_abono: req.body.dias_abono,
                precio: req.body.precio
            }).then(obj => res.status(200).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    delete(req, res) {
        return Abono.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.sendStatus(204))
            .catch(err => res.status(400).send(err))
    }

}