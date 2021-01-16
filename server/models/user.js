/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // class user extends Model {};
  
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone_verif: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    email_verif: DataTypes.BOOLEAN,
    password: DataTypes.TEXT,
    photo: DataTypes.STRING,
    recruiter: DataTypes.BOOLEAN,
    job_seeker: DataTypes.BOOLEAN
  }, 
  // {
  //   defaultScope: {
  //     attributes: {
  //       exclude: ['password']
  //     }
  //   }
  // }
  );

  user.associate = function(models) {
    user.hasMany(models.job, {as: 'jobs'})
    // User.hasOne(models.like, {as: 'likes'})
    // User.hasOne(models.comment, {as: 'comments'})
  };

  return user;
};