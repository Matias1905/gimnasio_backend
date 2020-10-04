const { empleado, socio, instalacion, servicio, abono, producto, usuario, clase, factura, fichado, recibos } = require('../controllers');

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
    app.get('/profesores', empleado.getProfesores)
    
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
    app.post('/multiplesclases', clase.repetirClasesSemana)
    //TODO: chequear apto físico previo a inscribir
    app.put('/clases/:id/inscribir', clase.inscribirSocio)
    app.delete('/clases/:id/inscribir', clase.desinscribirSocio)
    app.put('/inscripcionmultiple', clase.inscripcionMultiple)

    //ABM facturas
    app.get('/facturas', factura.list)
    

    app.get('/getClasesHoy', clase.getClasesHoy)
    app.get('/socios/:id/claseshoy', clase.getClasesSocioHoy)



    //signUp y login
    app.get('/usuarios', usuario.list)
    app.post('/usuarios', usuario.create)
    app.post('/login', usuario.verificarUsuario)
    app.patch('/usuarios', usuario.update)


    //fichado
    app.get('/fichadosSocios', fichado.getFichadosSocios)
    app.get('/fichadosEmpleados', fichado.getFichadosEmpleados)
    app.post('/ficharSocio/:id', fichado.ficharSocio)
    app.post('/ficharEmpleado/:id', fichado.ficharEmpleado)


    //otros métodos

    app.post('/buscarSocio', socio.getByDni) 
    app.post('/buscarEmpleado', empleado.getByDni)




    //TODO: refinar
    app.get('/empleados/:id/liquidarSueldo', empleado.liquidarSueldo) 
    app.get('/sueldos', empleado.liquidarTodo)
    app.get('/recibos', recibos.list)
    app.post('/recibos/:id', recibos.generarReciboSueldo)
    app.post('/recibos', recibos.generarRecibosMultiples)


    app.post('/facturarAbono', factura.gestionarCompraAbono)

    app.get('/getClasesSemana', clase.getClasesSemana)

    app.get('/servicios/:id/clases', clase.getClasesServicio)




};