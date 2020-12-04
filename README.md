# Fitness Center

## Back-end application 

Este proyecto fue creado como parte de la materia Integración de Aplicaciones, correspondiente al cuarto año de Ingeniería en Informática. En la consigna se nos pide crear una plataforma de un Gimnasio y luego conectar con servicios externos. En este caso, se requirió conectar con el servicio de pagos con tarjeta de crédito y con el servicio de acreditación de sueldos automática de una aplicación que representa a un banco.

***

### Servicios REST:

URL: `localhost:8000`

***

#### /empleados
**GET**
- Descripción: Devuelve la lista de empleados que están registrados en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Empleado[]
  - Mensaje de error: 400 Bad Request
  
**POST**
- Descripción: Registra un nuevo empleado en la base de datos.
- Parámetros: nombre, apellido, dni, sueldo_base, sueldo_clase, cargo, cbu, teléfono, dirección, email
- Devuelve:
  - Mensaje de éxito: 201 Created - Empleado{}
  - Mensaje de error: 400 Bad Request

#### /empleados/:id
**GET**
- Descripción: Devuelve el empleado que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Empleado{}
  - Mensaje de error: 404 Not Found
  
**PUT**
- Descripción: Actualiza los datos enviados en un empleado de la bd.
- Parámetros: id, nombre, apellido, dni, sueldo_base, sueldo_clase, cargo, cbu, teléfono, dirección, email
- Devuelve:
  - Mensaje de éxito: 200 OK - Empleado{}
  - Mensaje de error: 404 Not Found
  
**DELETE**
- Descripción: Elimina un empleado de forma lógica cambiando la variable “activo”.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /empleados/:id/liquidarsueldo
**GET**
- Descripción: Calcula el salario de un empleado para el mes corriente. El salario para los profesores se calcula sumando al sueldo base la bonificación por clase multiplicada por las clases que haya impartido en el mes. Para administrativos o personal de mantenimiento, devuelve el sueldo base.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - `{ monto: float, mes: [Date, Date] }`
  - Mensaje de error: 404 Not Found
  
#### /empleados/:id/recibo
**POST**
- Descripción: Genera el recibo de sueldo del empleado correspondiente. Verifica que no se hayan hecho recibos para el mismo empleado el mismo mes, y que el empleado exista. Envía los datos al servicio de Acreditación de Sueldos del banco previo a generar el recibo. En caso de error en los controles preliminares, la operación no se realiza. Los detalles de integración con servicios externos se encuentran especificados en el Documento de Integración. 
- Parámetros: `{ cbu: string, monto: float }`
- Devuelve:
  - Mensaje de éxito: 201 Created - ReciboSueldo{}
  - Mensaje de error: 400 Bad Request. En caso de error en la conexión con el servicio de acreditación de sueldos, se propaga el error que devuelva el servidor externo: `{status (400, 404, 409), errorCode, error}`

#### /profesores
**GET**
- Descripción: Devuelve la lista de empleados cuyo cargo sea “profesor”.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Empleado[]
  - Mensaje de error: 400 Bad Request

#### /socios
**GET**
- Descripción: Devuelve la lista de socios que están registrados en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Socio[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra un nuevo socio en la base de datos.
- Parámetros: nombre, apellido, dni, teléfono, dirección, email
- Devuelve:
  - Mensaje de éxito: 201 Created - Socio{}
  - Mensaje de error: 400 Bad Request]

#### /socios/:id
**GET**
- Descripción: Devuelve el socio que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Socio{}
  - Mensaje de error: 404 Not Found

**PUT**
- Descripción: Actualiza los datos enviados en un socio de la base de datos.
- Parámetros: id, nombre, apellido, dni, teléfono, dirección, email
- Devuelve:
  - Mensaje de éxito: 200 OK - Socio{}
  - Mensaje de error: 404 Not Found

**DELETE**
- Descripción: Elimina un socio de forma lógica cambiando la variable “activo”.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /socios/:id/datosmedicos
**POST**
- Descripción: Registra los datos médicos de un socio.
- Parámetros: id, historial, aclaraciones, alergias, apto_fisico, fecha_desde, fecha_hasta
- Devuelve:
  - Mensaje de éxito: 201 Created - DatosMedicos{}
  - Mensaje de error: 400 Bad Request

#### /socios/:id/claseshoy
**GET**
- Descripción: Devuelve las clases en las que el socio ingresado esté inscripto.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase[]
  - Mensaje de error: 400 Bad Request

#### /instalaciones
**GET**
- Descripción: Devuelve la lista de instalaciones que están registradas en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Instalacion[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra una nueva instalación en la base de datos.
- Parámetros: label, capacidad
- Devuelve:
  - Mensaje de éxito: 201 Created - Instalacion{}
  - Mensaje de error: 400 Bad Request

#### /instalaciones/:id
**GET**
- Descripción: Devuelve los datos de la instalación que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Instalacion{}
  - Mensaje de error: 404 Not Found

**PUT**
- Descripción: Actualiza los datos enviados en una instalación de la base de datos.
- Parámetros: id, label, capacidad
- Devuelve:
  - Mensaje de éxito: 200 OK - Instalacion{}
  - Mensaje de error: 404 Not Found

**DELETE**
- Descripción: Elimina una instalación de la base de datos.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /servicios
**GET**
- Descripción: Devuelve la lista de servicios que están registrados en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Servicio[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra un nuevo servicio en la base de datos.
- Parámetros: label, instalacion_id
- Devuelve:
  - Mensaje de éxito: 201 Created - Servicio{}
  - Mensaje de error: 400 Bad Request

#### /servicios/:id
**GET**
- Descripción: Devuelve el servicio que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Servicio{}
  - Mensaje de error: 404 Not Found

**PUT**
- Descripción: Actualiza los datos enviados en un servicio de la base de datos.
- Parámetros: id, label, instalacion_id
- Devuelve:
  - Mensaje de éxito: 200 OK - Servicio{}
  - Mensaje de error: 404 Not Found

**DELETE**
- Descripción: Elimina un servicio de la base de datos.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /servicios/:id/clases
**GET**
- Descripción: Devuelve las clases que correspondan a un servicio, y que estén programadas para dentro de los próximos 7 días.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase[]
  - Mensaje de error: 400 Bad Request

#### /abonos
**GET**
- Descripción: Devuelve la lista de abonos que están registrados en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Abono[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra un nuevo abono en la base de datos.
- Parámetros: label, tipo, dias_abono, precio
- Devuelve:
  - Mensaje de éxito: 201 Created - Abono{}
  - Mensaje de error: 400 Bad Request

#### /abonos/:id
**GET**
- Descripción: Devuelve el abono que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Abono{}
  - Mensaje de error: 404 Not Found

**PUT**
- Descripción: Actualiza los datos enviados en un abono de la base de datos.
- Parámetros: id,  label, tipo, dias_abono, precio
- Devuelve:
  - Mensaje de éxito: 200 OK - Abono{}
  - Mensaje de error: 404 Not Found

**DELETE**
- Descripción: Elimina un abono de la base de datos.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /clases
**GET**
- Descripción: Devuelve la lista de clases que están registradas en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra una nueva clase en la base de datos.
- Parámetros: fecha_inicio, duracion, servicio_id, profesor_id
- Devuelve:
  - Mensaje de éxito: 201 Created - Clase{}
  - Mensaje de error: 400 Bad Request

#### /clases/:id
**GET**
- Descripción: Devuelve la clase que coincide con el id enviado como parámetro.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase{}
  - Mensaje de error: 404 Not Found

**PUT**
- Descripción: Actualiza los datos enviados en una clase de la base de datos.
- Parámetros: id,  fecha_inicio, duracion, servicio_id, profesor_id, cancelada
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase{}
  - Mensaje de error: 404 Not Found

**DELETE**
- Descripción: Elimina una clase de la base de datos.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 204 No Content
  - Mensaje de error: 404 Not Found

#### /clases/:id/inscribir
**POST**
- Descripción: Crea la inscripción de un socio a una clase, controlando que el abono esté vigente y sea correcto.
- Parámetros: id, socio_id
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase{}
  - Mensaje de error: 400 Bad Request - {message: ErrorMessage}

**DELETE**
- Descripción: Cancela la inscripción de un socio a una clase
- Parámetros: id, socio_id
- Devuelve:
  - Mensaje de éxito: 200 OK
  - Mensaje de error: 400 Bad Request

#### /multiplesclases
**POST**
- Descripción: Crea una clase por semana en el horario determinado. Asigna a este grupo de clases una clave única para posibilitar la inscripción de un socio a todas las clases.
- Parámetros: fecha_inicio, duracion, repetir_hasta, servicio_id, profesor_id
- Devuelve:
  - Mensaje de éxito: 201 Created - Clase[]
  - Mensaje de error: 400 Bad Request - {msg: ‘Las clases no pudieron crearse, error: ErrorMessage }

#### /inscripcionmultiple
**PUT**
- Descripción: Inscribe a un socio determinado a una clase de forma semanal, utilizando la clave única que estas clases comparten. Se verifica la vigencia y el tipo de abono del socio.
- Parámetros: socio_id, clave
- Devuelve:
  - Mensaje de éxito: 200 OK
  - Mensaje de error: 400 Bad Request - { message: ErrorMessage }

#### /getclaseshoy
**GET**
- Descripción: Devuelve la lista de clases que estén programadas para el día corriente.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase[]
  - Mensaje de error: 400 Bad Request

#### /getclasessemana
**GET**
- Descripción: Devuelve la lista de clases que estén programadas para dentro de los próximos 7 días.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Clase[]
  - Mensaje de error: 400 Bad Request

#### /usuarios
**GET**
- Descripción: Devuelve la lista de usuarios que están registrados en la base de datos. Es utilizado para debug y no debe incluirse en caso de lanzar una versión de producción.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Usuario[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Registra un nuevo usuario en la base de datos.
- Parámetros: usuario, rol, password
- Devuelve:
  - Mensaje de éxito: 201 Created - Clase{}
  - Mensaje de error: 400 Bad Request

**PATCH**
- Descripción: Actualiza la contraseña de un usuario.
- Parámetros: usuario, password
- Devuelve: 
  - Mensaje de éxito: 200 OK - Usuario{}
  - Mensaje de error: 404 Not Found

#### /login
**POST**
- Descripción: Verifica las credenciales de un usuario para el ingreso en el sistema.
- Parámetros: usuario, password
- Devuelve:
  - Mensaje de éxito: 200 OK - Usuario{}
  - Mensaje de error: 404 Not Found

#### /fichadossocios
**GET**
- Descripción: Devuelve la lista de registros de entrada de los socios.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - FichadoSocio[]
  - Mensaje de error: 400 Bad Request

#### /fichadossocios/:id
**POST**
- Descripción: Registra la entrada de un socio en el gimnasio.
- Parámetros: id
- Devuelve:
  - Mensaje de éxito: 201 Created - FichadoSocio{}
  - Mensaje de error: 400 Bad Request

#### /fichadosempleados
**GET**
- Descripción: Devuelve la lista de registros de entrada o salida de los empleados.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - FichadoEmpleado[]
  - Mensaje de error: 400 Bad Request

#### /fichadosempleados/:id
**POST**
- Descripción: Registra la entrada o salida de un empleado en el gimnasio.
- Parámetros: id, tipo (“entrada” o “salida”)
- Devuelve:
  - Mensaje de éxito: 201 Created - FichadoEmpleado{}
  - Mensaje de error: 400 Bad Request

#### /buscarsocio
**POST**
- Descripción: Devuelve el socio cuyo dni coincida con el dni enviado como parámetro.
- Parámetros: dni
- Devuelve:
  - Mensaje de éxito: 200 OK - Socio{}
  - Mensaje de error: 404 Not Found

#### /buscarempleado
**POST**
- Descripción: Devuelve el empleado cuyo dni coincida con el dni enviado como parámetro.
- Parámetros: dni
- Devuelve:
  - Mensaje de éxito: 200 OK - Empleado{}
  - Mensaje de error: 404 Not Found

#### /facturas
**GET**
- Descripción: Devuelve la lista de facturas registradas en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - Factura[]
  - Mensaje de error: 400 Bad Request

#### /facturarabono
**POST**
- Descripción: Registra una nueva compra de abono en la base de datos. Crea la factura correspondiente y actualiza los datos del abono en el socio. En caso de que el método de pago sea “tarjeta”, el servidor se conecta con el servicio correspondiente para incluir el número de transacción en la factura. Los detalles de integración con servicios externos se encuentran especificados en el Documento de Integración.
- Parámetros: socio_id, abono_id, medio_pago, total, nro_tarjeta, cvv, dni
- Devuelve:
  - Mensaje de éxito: 201 Created - `{ factura: Factura{}, socio: Socio{} }`
  - Mensaje de error: 400 Bad Request
  - En caso de error en la conexión con el servicio de tarjeta de crédito, se propaga el error que devuelva el servidor: `{ status (400, 404), message }`

#### /sueldos
**GET**
- Descripción: Devuelve una lista de todos los empleados que se encuentren activos junto con el cálculo de su salario para el mes corriente. El salario para los profesores se calcula sumando al sueldo base la bonificación por clase multiplicada por las clases que haya impartido en el mes. Para administrativos o personal de mantenimiento, devuelve el sueldo base.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - `{ empleado: Empleado{}, sueldo: float, mes: [Date, Date] }[]`
  - Mensaje de error: 400 Bad Request

#### /recibos
**GET**
- Descripción: Devuelve la lista de recibos de sueldo registrados en la base de datos.
- Parámetros: -
- Devuelve:
  - Mensaje de éxito: 200 OK - ReciboSueldo[]
  - Mensaje de error: 400 Bad Request

**POST**
- Descripción: Genera los recibos de sueldo para todos los empleados enviados como parámetros. Verifica que no se hayan hecho recibos para el mismo empleado el mismo mes, y que el empleado exista. Envía los datos al servicio de Acreditación de Sueldos del banco previo a generar el recibo. En caso de error en los controles preliminares, la operación no se realiza. Los detalles de integración con servicios externos se encuentran especificados en el Documento de Integración. En caso de que la liquidación sea rechazada para una parte de los empleados, se envían por separado los válidos y los rechazados para que el sistema front-end le solicite una decisión al usuario.
- Parámetros: `{empleados: [ empleado_id, nombre, apellido, monto, cbu ] }`
- Devuelve:
  - Mensaje de éxito: 201 Created - ReciboSueldo[]
  - Mensaje de error: 400 Bad Request
  - Mensaje de error: 412 Precondition Failed - `{ validos: Empleado[], rechazados: Empleado[] }`
  - En caso de error en la conexión con el servicio de acreditación de sueldos, se propaga el error que devuelva el servidor externo: {status (400, 404, 409), errorCode, error}
