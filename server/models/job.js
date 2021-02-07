/* eslint-disable no-unused-vars */
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // class job extends Model {};
  
  const job = sequelize.define('job', {
    author_job_id: DataTypes.NUMBER,
    received_job_id: DataTypes.NUMBER,
    content: DataTypes.TEXT,
    expiredAt: DataTypes.DATE,
  }, {});
  
  job.associate = function(models) {
    job.hasOne(models.like, {as: 'likes'})
    job.hasOne(models.comment, {as: 'comments'})
    job.belongsTo(models.user, {foreignKey: 'author_job_id'})
    job.belongsTo(models.user, {foreignKey: 'received_job_id'})
  };
  return job;
};