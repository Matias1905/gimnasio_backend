'use strict';
const {
  Model, Op
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    //provisorio
    calcularSueldo(mes) {
      const fijo = this.sueldo_base
      if (this.cargo === 'profesor') {
        return this.countClases({
          where: {
            fecha_inicio: {
              [Op.between]: mes
            },
            cancelada: false
          }
        }).then(cant => {
          return fijo + cant * this.sueldo_clase;
        }).catch(err => -1)
      } else {
        return Promise.resolve(fijo)
      }
    }


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Empleado.hasMany(models.ReciboSueldo, {
        foreignKey: 'empleado_id',
        as: 'recibos'
      })

      Empleado.hasMany(models.FichadoEmpleado, {
        foreignKey: 'empleado_id',
        as: 'fichados'
      })

      Empleado.hasMany(models.Clase, {
        foreignKey: 'profesor_id',
        as: 'clases'
      })
    }
  };
  Empleado.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    genero: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    fecha_contratacion: DataTypes.DATE,
    cargo: DataTypes.STRING,
    sueldo_base: DataTypes.FLOAT,
    sueldo_clase: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Empleado',
  });
  return Empleado;
};