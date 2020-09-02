const { Producto } = require('../models')

module.exports = {
    
    list(_, res){
        return Producto.findAll()
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send(err))
    },

    getOne(req, res){
        return Producto.findByPk(req.params.id)
        .then(obj => res.status(200).send(obj))
        .catch(err => res.status(404).send(err))
    },

    create(req, res){
        return Producto.create({
            label: req.body.label,
            precio_unit: req.body.precio_unit
        }).then(obj => res.status(201).send(obj))
        .catch(err => res.status(400).send(err))
    },

    update(req, res){
        return Producto.findByPk(req.params.id).then(producto => {
            if(!producto){
                return res.status(404).send({message: 'Producto no encontrado!'})
            }

            return producto.update({
                label: req.body.label,
                precio_unit: req.body.precio_unit
            }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    }, 

    delete(req, res){
        return Producto.destroy({
            where: {
                id: req.params.id
            }
        }).then(()=> res.sendStatus(204))
        .catch(err => res.status(400).send(err))
    }

}