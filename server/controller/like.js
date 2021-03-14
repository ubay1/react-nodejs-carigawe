/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const models = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv"); 
const path = require("path") 
const fs = require('fs-extra')
// get config vars
dotenv.config();
const moment = require('moment')
const hashids = require('../utils/helper')

const likeController = {
    
}

module.exports = likeController