const express = require('express');
const router  = express.Router();
const { validationResult } = require('express-validator');

const userController = require('../controller/user');
const userValidation = require('./user_validation')

const jobController = require('../controller/job');

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    next();
}

router.post('/user/signup', userValidation, handleValidationErrors,  userController.signup);
router.post('/user/signin', userController.signin);
router.post('/user/signout', userController.signout);
router.post('/user/check_token', userController.checkToken);
router.post('/user/get_user', userController.getUser);
router.put('/user/:userId',userController.update);
router.get('/coba_asosiation', userController.cobaAssociation);

router.post('/recruiter/postjob', jobController.postJob);

module.exports = router