'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize')
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  class ReciboSueldo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReciboSueldo.belongsTo(models.Empleado, {
        foreignKey: 'empleado_id',
        as: 'empleado',
        onDelete: 'CASCADE'
      })
    }
  };
  ReciboSueldo.init({
    fecha: DataTypes.DATE,
    monto: DataTypes.FLOAT,
    mes: {
      type: DataTypes.VIRTUAL,
      get() {
        return new Date(this.fecha).getMonth() + 1;
      },
      set(value) {
        throw new Error('No se puede setear el periodo!')
      }
    },
    year: {
      type: DataTypes.VIRTUAL,
      get() {
        return new Date(this.fecha).getFullYear();
      },
      set(value) {
        throw new Error('No se puede setear el periodo!')
      }
    }
  }, {
    sequelize,
    modelName: 'ReciboSueldo',
    tableName: 'RecibosSueldo'
  });

  // ReciboSueldo.beforeCreate(async (recibo, options) => {

  //   const { fecha, empleado_id } = recibo;
  //   const start = moment(fecha).startOf('month')
  //   const end = moment(fecha).endOf('month')

  //   const isInvalid = await ReciboSueldo.findOne({
  //     where: {
  //       fecha: {
  //         [Op.between]: [start, end]
  //       },
  //       empleado_id: empleado_id
  //     }
  //   })

  //   if (isInvalid) {
  //     return Promise.reject('El sueldo del empleado para este mes ya ha sido liquidado')
  //   } else {
  //     return Promise.resolve()
  //   }
  // })

  return ReciboSueldo;
};