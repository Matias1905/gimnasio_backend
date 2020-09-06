'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatosMedicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DatosMedicos.belongsTo(models.Socio, {
        foreignKey: 'socio_id',
        as: 'datos_medicos',
        onDelete: 'CASCADE'
      })
    }
  };
  DatosMedicos.init({
    historial: DataTypes.TEXT,
    aclaraciones: DataTypes.TEXT,
    alergias: DataTypes.TEXT,
    apto_fisico: DataTypes.BOOLEAN,
    fecha_desde: DataTypes.DATE,
    fecha_hasta: DataTypes.DATE,
    vigente: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DatosMedicos',
  });
  return DatosMedicos;
};