/* eslint-disable no-unused-vars */
'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    
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
        type: DataTypes.DATE_NO_TZ
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE_NO_TZ
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};