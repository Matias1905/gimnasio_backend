'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instalacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instalacion.hasOne(models.Servicio, {
        foreignKey: 'instalacion_id',
        as: 'instalacion',
        onDelete: 'CASCADE'
      })
    }
  };
  Instalacion.init({
    label: DataTypes.STRING,
    capacidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instalacion',
    tableName: 'Instalaciones'
  });
  return Instalacion;
};