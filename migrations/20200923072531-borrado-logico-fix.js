'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Socios', 'activo', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })

    await queryInterface.addColumn('Empleados', 'activo', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Socios', 'activo')
    await queryInterface.removeColumn('Empleados', 'activo')
  }
};
