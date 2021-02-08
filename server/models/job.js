/* eslint-disable no-unused-vars */
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // class job extends Model {};
  
  const job = sequelize.define('job', {
    // userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    expiredAt: DataTypes.DATE
  }, {});
  
  job.associate = function(models) {
    // job.hasOne(models.like)
    // job.hasOne(models.comment)
    job.belongsTo(models.user, {foreignKey: "userId"})
  };
  return job;
};