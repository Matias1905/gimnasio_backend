const { empleado, socio, instalacion, servicio, abono, producto, usuario, clase, factura } = require('../controllers');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Fitness Center API!'
    }));

    //ABM empleados
    app.get('/empleados', empleado.list)
    app.get('/empleados/:id', empleado.getOne)
    app.post('/empleados', empleado.create)
    app.put('/empleados/:id', empleado.update)
    app.delete('/empleados/:id', empleado.delete)

    //ABM socios
    app.get('/socios', socio.list)
    app.get('/socios/:id', socio.getOne)
    app.post('/socios', socio.create)
    app.put('/socios/:id', socio.update)
    app.delete('/socios/:id', socio.delete)
    app.post('/socios/:id/datosmedicos', socio.agregarDatosMedicos)

    //ABM instalaciones
    app.get('/instalaciones', instalacion.list)
    app.get('/instalaciones/:id', instalacion.getOne)
    app.post('/instalaciones', instalacion.create)
    app.put('/instalaciones/:id', instalacion.update)
    app.delete('/instalaciones/:id', instalacion.delete)

    //ABM servicios
    app.get('/servicios', servicio.list)
    app.get('/servicios/:id', servicio.getOne)
    app.post('/servicios', servicio.create)
    app.put('/servicios/:id', servicio.update)
    app.delete('/servicios/:id', servicio.delete)

    //ABM abonos
    app.get('/abonos', abono.list)
    app.get('/abonos/:id', abono.getOne)
    app.post('/abonos', abono.create)
    app.put('/abonos/:id', abono.update)
    app.delete('/abonos/:id', abono.delete)

    //ABM productos
    app.get('/productos', producto.list)
    app.get('/productos/:id', producto.getOne)
    app.post('/productos', producto.create)
    app.put('/productos/:id', producto.update)
    app.delete('/productos/:id', producto.delete)

    //ABM clases
    app.get('/clases', clase.list)
    app.get('/clases/:id', clase.getOne)
    app.post('/clases', clase.create)
    app.put('/clases/:id', clase.update)
    app.delete('/clases/:id', clase.delete)
    app.put('/clases/:id/inscribir', clase.inscribirSocio)

    //ABM facturas
    app.get('/facturas', factura.list)




    //signUp y login
    app.get('/usuarios', usuario.list)
    app.post('/usuarios', usuario.create)
    app.post('/login', usuario.verificarUsuario)
    app.patch('/usuarios/:id', usuario.update)




    //otros métodos

    app.post('/buscarSocio', socio.getByDni) //reworkear nombre
    app.get('/profesores', empleado.getProfesores)

    app.get('/empleados/:id/liquidarSueldo', empleado.liquidarSueldo) //falta que se calcule segun las clases del mes
    app.get('/sueldos', empleado.liquidarTodo)

    app.post('/facturarAbono', factura.gestionarCompraAbono)

    app.get('/getClasesSemana', clase.getClasesSemana)

    app.get('/servicios/:id/clases', clase.getClasesServicio)



    //endpoint de prueba
    app.post('/multiplesclases', clase.repetirClasesSemana)

};