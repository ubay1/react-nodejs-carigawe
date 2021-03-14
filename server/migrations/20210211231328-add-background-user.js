/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.addColumn('users','background_image', { type: Sequelize.TEXT, allowNull: true })
  },

  down: async (queryInterface, Sequelize) => {
    // const Sequelize = withDateNoTz(Sequelize);
    await queryInterface.removeColumn('users','background_image', { type: Sequelize.TEXT, allowNull: true })
  }
};
