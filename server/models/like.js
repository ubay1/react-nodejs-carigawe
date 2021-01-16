/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class like extends Model {};

  const like = sequelize.define('like', {
    job_id: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER,
    like: DataTypes.BOOLEAN
  }, {});

  like.associate = function(models) {
    // like.belongsTo(models.job, {foreignKey: 'job_id'})
    // like.belongsTo(models.user, {foreignKey: 'user_id'})
  }

  return like;
};