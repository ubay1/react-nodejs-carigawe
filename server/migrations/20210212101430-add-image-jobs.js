/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobs','image_content', { type: Sequelize.TEXT })
    await queryInterface.addColumn('jobs','title', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobs','image_content', { type: Sequelize.TEXT })
    await queryInterface.removeColumn('jobs','title', { type: Sequelize.STRING })
  }
};
