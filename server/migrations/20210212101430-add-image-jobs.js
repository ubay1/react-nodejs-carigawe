/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobs','image_content', { type: Sequelize.TEXT })
    await queryInterface.addColumn('jobs','title', { type: Sequelize.STRING })
    await queryInterface.addColumn('jobs','city', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobs','image_content', { type: Sequelize.TEXT })
    await queryInterface.removeColumn('jobs','title', { type: Sequelize.STRING })
    await queryInterface.removeColumn('jobs','city', { type: Sequelize.STRING })
  }
};
