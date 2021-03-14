/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','email_verification_token', { type: Sequelize.TEXT,allowNull: true })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users','email_verification_token', { type: Sequelize.TEXT,allowNull: true })
  }
};
