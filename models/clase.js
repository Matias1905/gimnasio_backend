'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clase.belongsTo(models.Servicio, {
        foreignKey: 'servicio_id',
        onDelete: 'CASCADE'
      })

      Clase.belongsTo(models.Empleado, {
        foreignKey: 'profesor_id',
        as: 'profesor',
        onDelete: 'CASCADE'
      })
    }
  };
  Clase.init({
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    cancelada: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Clase',
  });
  return Clase;
};