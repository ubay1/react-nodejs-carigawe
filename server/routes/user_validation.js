const { check} = require('express-validator');

const userValidation = [
    check('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email not valid'),

    check('password')
      .exists()
      .withMessage('password is required')
      .isLength({min: 5})
      .withMessage('password minimal 5 character'),
];

module.exports = userValidation