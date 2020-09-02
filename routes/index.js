const { empleado, socio } = require('../controllers')

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Fitness Center API!'
    }));

    //ABM empleados
    app.get('/empleados', empleado.list)
    app.get('/empleados/:id', empleado.getOne)
    app.post('/empleados', empleado.create)
    app.put('/empleados/:id', empleado.update)

    //ABM socios
    app.get('/socios', socio.list)
    app.get('/socios/:id', socio.getOne)
    app.post('/socios', socio.create)

};