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
    monto: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ReciboSueldo',
    tableName: 'RecibosSueldo'
  });
  return ReciboSueldo;
};