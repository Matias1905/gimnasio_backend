'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DatosMedicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      socio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Socios',
          key: 'id'
        }
      },
      historial: {
        type: Sequelize.TEXT
      },
      aclaraciones: {
        type: Sequelize.TEXT
      },
      alergias: {
        type: Sequelize.TEXT
      },
      apto_fisico: {
        type: Sequelize.BOOLEAN
      },
      fecha_desde: {
        type: Sequelize.DATE
      },
      fecha_hasta: {
        type: Sequelize.DATE
      },
      vigente: {
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
    await queryInterface.dropTable('DatosMedicos');
  }
};