'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Factura.belongsTo(models.Abono, {
        foreignKey: 'abono_id'
      })

      Factura.belongsTo(models.Socio, {
        foreignKey: 'socio_id'
      })

      Factura.belongsToMany(models.Producto, { through: models.ItemFactura })
    }
  };
  Factura.init({
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};