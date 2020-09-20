'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Facturas', 'medio_pago', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('Facturas', 'total', {
      type: Sequelize.FLOAT
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Facturas', 'medio_pago'),
      await queryInterface.removeColumn('Facturas', 'total')
  }
};
