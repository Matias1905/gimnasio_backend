const { empleado } = require('../controllers')

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Fitness Center API!'
    }));


    app.get('/empleados', empleado.list)
    app.get('/empleados/:id', empleado.getOne)
    app.post('/empleados', empleado.create)
};