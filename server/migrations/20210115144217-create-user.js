/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      phone_verif: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING
      },
      email_verif: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      password: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      recruiter: {
        type: Sequelize.BOOLEAN
      },
      job_seeker: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('users');
  }
};