'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      servicio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Servicios',
          key: 'id'
        }
      },
      profesor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Empleados',
          as: 'profesor',
          key: 'id'
        }
      },
      cancelada: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clases');
  }
};