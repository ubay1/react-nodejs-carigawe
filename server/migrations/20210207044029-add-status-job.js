/* eslint-disable no-unused-vars */
'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.addColumn('jobs','expiredAt', { type: DataTypes.DATE_NO_TZ })
  },

  down: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.removeColumn('jobs','expiredAt', { type: DataTypes.DATE_NO_TZ })
  }
};
