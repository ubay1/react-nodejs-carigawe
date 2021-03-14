/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // class user extends Model {};
  
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    // disable biar gakditampilin
    email_verif: DataTypes.BOOLEAN,
    password: DataTypes.TEXT, 
    photo: DataTypes.TEXT,
    recruiter: DataTypes.BOOLEAN,
    job_seeker: DataTypes.BOOLEAN,
    gender: DataTypes.STRING, 
    background_image: DataTypes.TEXT,
    email_verification_token: DataTypes.TEXT,
  },
  );

  user.associate = function(models) {
    user.hasMany(models.job)
    user.hasOne(models.like)
    user.hasOne(models.comment)
  };

  return user;
};