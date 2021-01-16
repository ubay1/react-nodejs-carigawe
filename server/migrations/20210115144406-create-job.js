/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_job_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete : 'CASCADE',
        references : {
            model : 'users',
            key : 'id',
            as : 'author_job_id'
        },
      },
      received_job_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete : 'CASCADE',
        references : {
            model : 'users',
            key : 'id',
            as : 'received_job_id'
        },
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('jobs');
  }
};