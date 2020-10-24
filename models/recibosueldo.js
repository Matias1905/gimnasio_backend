'use strict';
const {
  Model
} = require('sequelize');
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
        as: 'recibos',
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
  return ReciboSueldo;
};