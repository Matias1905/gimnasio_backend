'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Abonos', [{
      label: 'Diario',
      tipo: 'libre',
      dias_abono: 1,
      precio: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Diario',
      tipo: 'clases',
      dias_abono: 1,
      precio: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Diario',
      tipo: 'musculacion',
      dias_abono: 1,
      precio: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semanal',
      tipo: 'libre',
      dias_abono: 7,
      precio: 600,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semanal',
      tipo: 'clases',
      dias_abono: 7,
      precio: 450,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semanal',
      tipo: 'musculacion',
      dias_abono: 7,
      precio: 350,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Quincenal',
      tipo: 'libre',
      dias_abono: 15,
      precio: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Quincenal',
      tipo: 'clases',
      dias_abono: 15,
      precio: 800,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Quincenal',
      tipo: 'musculacion',
      dias_abono: 15,
      precio: 600,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Mensual',
      tipo: 'libre',
      dias_abono: 30,
      precio: 1800,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Mensual',
      tipo: 'clases',
      dias_abono: 30,
      precio: 1400,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Mensual',
      tipo: 'musculacion',
      dias_abono: 30,
      precio: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semestral',
      tipo: 'libre',
      dias_abono: 180,
      precio: 7000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semestral',
      tipo: 'clases',
      dias_abono: 180,
      precio: 5500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Semestral',
      tipo: 'musculacion',
      dias_abono: 180,
      precio: 4200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Anual',
      tipo: 'libre',
      dias_abono: 365,
        precio: 12000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Anual',
      tipo: 'clases',
      dias_abono: 365,
        precio: 9000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Anual',
      tipo: 'musculacion',
      dias_abono: 365,
        precio: 7200,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Abonos', null, {})
  }
};
