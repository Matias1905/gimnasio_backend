'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsToMany(models.Factura, { through: models.ItemFactura })
    }
  };
  Producto.init({
    label: DataTypes.STRING,
    precio_unit: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};