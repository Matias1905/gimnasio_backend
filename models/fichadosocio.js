'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FichadoSocio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FichadoSocio.belongsTo(models.Socio, {
        foreignKey: 'socio_id',
        as: 'fichados',
        onDelete: 'CASCADE'
      })
    }
  };
  FichadoSocio.init({
    fecha_hora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'FichadoSocio',
    tableName: 'FichadosSocio'
  });
  return FichadoSocio;
};