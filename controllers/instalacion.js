const { Instalacion } = require('../models')

module.exports = {

    list(_, res){
        return Instalacion.findAll()
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err))
    },

    getOne(req, res){
        return Instalacion.findByPk(req.params.id)
        .then(obj => res.status(200).send(obj))
        .catch(err => res.status(404).send(err))
    },

    create(req, res){
        return Instalacion.create({
            label: req.body.label,
            capacidad: req.body.capacidad
        }).then(obj => res.status(201).send(obj))
        .catch(err => res.status(400).send(err))
    },

    update(req, res){
        return Instalacion.findByPk(req.params.id).then(instalacion => {
            if(!instalacion){
                return res.status(404).send({message: 'Instalacion no encontrada!'})
            }

            return instalacion.update({
                label: req.body.label,
                capacidad: req.body.capacidad
            }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    }, 

    delete(req, res){
        return Instalacion.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=> res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    }
}