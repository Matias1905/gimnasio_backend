'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abono extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Abono.hasMany(models.Factura, {
        foreign_key: 'abono_id'
      })
    }
  };
  Abono.init({
    label: DataTypes.STRING,
    tipo: DataTypes.STRING,
    dias_abono: DataTypes.INTEGER,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Abono',
  });
  return Abono;
};