/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
            model : 'jobs',
            key : 'id',
            as : 'job_id'
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
            model : 'users',
            key : 'id',
            as : 'user_id'
        },
      },
      comment: {
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
    await queryInterface.dropTable('comments');
  }
};