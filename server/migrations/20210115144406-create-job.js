/* eslint-disable no-unused-vars */
'use strict';

const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);

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
        type: DataTypes.DATE_NO_TZ
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE_NO_TZ
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};