/* eslint-disable no-unused-vars */
'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobId: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
            model : 'jobs',
            key : 'id',
            // as : 'jobId'
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
            model : 'users',
            key : 'id',
            // as : 'userId'
        },
      },
      like: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('likes');
  }
};