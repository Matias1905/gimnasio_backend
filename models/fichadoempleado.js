'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FichadoEmpleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FichadoEmpleado.belongsTo(models.Empleado, {
        foreignKey: 'empleado_id',
        as: 'fichados',
        onDelete: 'CASCADE'
      })
    }
  };
  FichadoEmpleado.init({
    fecha_hora: DataTypes.DATE,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FichadoEmpleado',
    tableName: 'FichadosEmpleado'
  });
  return FichadoEmpleado;
};