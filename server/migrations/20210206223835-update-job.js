/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('jobs','description', 'content')
    await queryInterface.changeColumn('jobs','content', {
      type: Sequelize.TEXT,
    })
    await queryInterface.removeColumn('jobs','title')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('jobs', 'content', 'description')
    await queryInterface.addColumn('jobs','title', { type: Sequelize.TEXT })
  }
};
