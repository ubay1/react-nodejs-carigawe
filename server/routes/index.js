const express = require('express');
const router  = express.Router();
const { validationResult } = require('express-validator');

const userController = require('../controller/user');
const userValidation = require('./user_validation')

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    next();
}

router.post('/user/signup', userValidation, handleValidationErrors,  userController.signup);
router.post('/user/signin', userController.signin);
router.post('/user/check_token', userController.checkToken);
router.put('/user/:userId',userController.update);

module.exports = router