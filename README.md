# Fitness Center

## Back-end application 

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

Work In Progress...
