'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize')
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
        as: 'servicio',
        onDelete: 'CASCADE'
      })

      Clase.belongsTo(models.Empleado, {
        foreignKey: 'profesor_id',
        as: 'profesor',
        onDelete: 'CASCADE'
      })

      Clase.belongsToMany(models.Socio, {through: 'SocioClase', as: 'inscriptos'})
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

  Clase.beforeCreate((async (clase, options) => {
    const start = new Date(clase.fecha_inicio)
    const end = new Date(clase.fecha_fin)
    const { servicio_id, profesor_id } = clase;

    const isInvalid = await Clase.findOne({
      where: {
        [Op.and]: [{
          [Op.or]: [{
            fecha_inicio: {
              [Op.between]: [start, end]
            }
          }, {
            fecha_fin: {
              [Op.between]: [start, end]
            }
          }]
        }, {
          [Op.or]: [
            { servicio_id: servicio_id },
            { profesor_id: profesor_id }
          ]
        }]
      }
    })

    if (isInvalid) {
      return Promise.reject('La clase no pudo ser creada')
    } else {
      return Promise.resolve()
    }

  }))

  return Clase;
};