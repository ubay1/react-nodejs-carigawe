const { check} = require('express-validator');

const userValidation = [
  check('name')
    .exists()
    .withMessage('nama wajib diisi'),
  check('phone')
    .exists()
    .withMessage('nomor telepon wajib diisi')
    .isLength({min: 11})
    .withMessage('nomor telepon minimal 11 karakter'),
  check('email')
    .exists()
    .withMessage('email wajib diisi')
    .isEmail()
    .withMessage('email not valid'),
  check('password')
    .exists()
    .withMessage('password wajib diisi')
    .isLength({min: 5})
    .withMessage('password minimal 5 karakter'),
];

const userValidation2 = [
  check('name')
    .exists()
    .withMessage('nama wajib diisi'),
  check('phone')
    .exists()
    .withMessage('nomor telepon wajib diisi')
    .isLength({min: 11})
    .withMessage('nomor telepon minimal 11 karakter'),
  check('email')
    .exists()
    .withMessage('email wajib diisi')
    .isEmail()
    .withMessage('email not valid'),
  check('password')
    .exists()
    .withMessage('password wajib diisi')
    .isLength({min: 5})
    .withMessage('password minimal 5 karakter'),
];

module.exports = [userValidation, userValidation2]