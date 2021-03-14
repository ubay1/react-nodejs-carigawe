/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class like extends Model {};

  const like = sequelize.define('like', {
    // jobId: DataTypes.INTEGER,
    // userId: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN
  }, {});

  like.associate = function(models) {
    like.belongsTo(models.job, {foreignKey: 'jobId'})
    like.belongsTo(models.user, {foreignKey: 'userId'})
  }

  return like;
};