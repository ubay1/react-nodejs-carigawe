/* eslint-disable no-unused-vars */
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // class job extends Model {};
  
  const job = sequelize.define('job', {
    // userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    expiredAt: DataTypes.DATE,
    image_content: DataTypes.TEXT,
    title: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {});
  
  job.associate = function(models) {
    job.hasMany(models.like)
    job.hasMany(models.comment)
    job.belongsTo(models.user, {foreignKey: "userId"})
  };
  return job;
};