/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class comment extends Model {};

  const comment = sequelize.define('comment', {
    job_id: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER,
    comment: DataTypes.STRING
  }, {});

  comment.associate = function(models) {
    comment.belongsTo(models.job, {foreignKey: 'jobId'})
    comment.belongsTo(models.user, {foreignKey: 'userId'})
  }

  return comment;
};