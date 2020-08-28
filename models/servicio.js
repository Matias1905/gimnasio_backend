'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Servicio.belongsTo(models.Instalacion, {
        foreignKey: 'instalacion_id',
        onDelete: 'CASCADE'
      })

      Servicio.hasMany(models.Clase, {
        foreignKey: 'servicio_id',
      })
    }
  };
  Servicio.init({
    label: DataTypes.STRING,
    foto: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Servicio',
  });
  return Servicio;
};