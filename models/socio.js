'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Socio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Socio.hasMany(models.DatosMedicos, {
        foreignKey: 'socio_id',
        as: 'datos_medicos'
      })

      Socio.hasMany(models.FichadoSocio, {
        foreignKey: 'socio_id',
        as: 'fichados'
      })

      Socio.hasMany(models.Factura, {
        foreignKey: 'socio_id'
      })

      Socio.belongsToMany(models.Clase, { through: 'SocioClase', as: 'inscripciones' })
    }
  };
  Socio.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    email: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    genero: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    abonado_hasta: DataTypes.DATE,
    tipo_abono: DataTypes.STRING,
    fecha_asociado: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Socio',
  });
  return Socio;
};