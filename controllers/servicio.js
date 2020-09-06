const { Servicio, Instalacion } = require('../models')

module.exports = {

    list(_, res){
        return Servicio.findAll({
            include: [{
                model:Instalacion,
                as: 'instalacion'
            }]
        })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err))
    },

    getOne(req, res){
        return Servicio.findByPk(req.params.id, {
            include: [{
                model:Instalacion,
                as: 'instalacion'
            }]
        })
        .then(obj => res.status(200).send(obj))
        .catch(err => res.status(404).send(err))
    },

    create(req, res){
        return Servicio.create({
            label: req.body.label,
            foto: req.body.foto,
            instalacion_id: req.body.instalacion_id
        }).then(obj => res.status(201).send(obj))
        .catch(err => res.status(400).send(err))
    },

    update(req, res){
        return Servicio.findByPk(req.params.id).then(servicio => {
            if(!servicio){
                return res.status(404).send({message: 'Servicio no encontrado!'})
            }

            return servicio.update({
                label: req.body.label,
                foto: req.body.foto,
                instalacion_id: req.body.instalacion_id
            }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    }, 

    delete(req, res){
        return Servicio.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=> res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    }

}