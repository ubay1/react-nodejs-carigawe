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
    // Comment.belongsTo(models.job, {foreignKey: 'job_id'})
    // Comment.belongsTo(models.user, {foreignKey: 'user_id'})
  }

  return comment;
};