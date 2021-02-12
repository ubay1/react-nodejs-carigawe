/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users','phone_verif', { type: Sequelize.BOOLEAN })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','phone_verif', { type: Sequelize.BOOLEAN })
  }
};
