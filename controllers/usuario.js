const { Usuario } = require('../models')

module.exports = {

    list(_, res) {
        return Usuario.findAll().then(list => res.status(200).send(list))
            .catch(err => res.status.send(err))
    },

    create(req, res){
        return Usuario.create({
            usuario: req.body.usuario,
            password: req.body.password,
            rol: req.body.rol
        }).then(obj => res.status(201).send(obj))
        .catch(err => res.status(400).send(err))
    },

    verificarUsuario(req, res){
        return Usuario.findOne({
            where:{
                usuario: req.body.usuario,
                password: req.body.password
            }
        }).then(obj => {
            if(!obj){
                return res.sendStatus(404)
            }
            return res.status(200).send(obj)
        }).catch(err => res.status(400).send(err))
    },

    update

}

async function update(req, res){
    const usuario = await Usuario.findOne({ where: { usuario: req.body.usuario } });

    if(!usuario){
        return res.sendStatus(404)
    }

    usuario.password = req.body.password

    const response = await usuario.save();

    return res.status(200).send(response)
}