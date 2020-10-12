const { Factura, Socio, Abono } = require('../models');
var moment = require('moment');

module.exports = {

    
    gestionarCompraAbono(req, res) {
        //OPCION: si la llamada no contiene el total, buscar total en el abono correspondiente.

        //TODO: if medio_pago = tarjeta: pegarle a la api antes de crear factura
        //facturar abono correspondiente
        return Factura.create({
            fecha: new Date(),
            socio_id: req.body.socio_id,
            abono_id: req.body.abono_id,
            medio_pago: req.body.medio_pago,
            nro_transaccion: req.body.nro_transaccion,
            total: req.body.total
        }).then(factura => {
            //actualizar datos en el socio
            return actualizarSocio(req.body.socio_id, req.body.abono_id)
                .then(socio => res.status(201).send({ factura: factura, socio: socio }))
                .catch(err => res.status(401).send(err))
        }).catch(err => res.status(400).send(err))

    },

    list(_, res) {
        return Factura.findAll({
            include: [
                {
                    model: Socio
                },
                {
                    model: Abono
                }
            ],
            order: [
                ['id', 'desc']
            ]
        }).then(list => res.status(200).send(list))
            .catch(err => res.status(400).send(err))
    }


}

const actualizarSocio = async (socio_id, abono_id) => {
    const socio = await Socio.findByPk(socio_id)
    const abono = await Abono.findByPk(abono_id)

    //cambiar fecha de vencimiento del abono a la de hoy + los días del abono
    let date = moment().add(abono.dias_abono, 'days')

    socio.abonado_hasta = date;
    socio.tipo_abono = abono.tipo
    //actualizar datos en el socio
    await socio.save()
    //devolver socio
    return socio
}

//testeado pocamente