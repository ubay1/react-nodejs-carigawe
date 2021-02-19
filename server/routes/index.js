/* eslint-disable no-unused-vars */
const express = require('express');
const router  = express.Router();
const { validationResult } = require('express-validator');

const authMiddleware = require('../middleware/auth')
const userController = require('../controller/user');
const userValidation2 = require('../middleware/validation')

const jobController = require('../controller/job');

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    next();
}

router.post('/user/signup', userValidation2, handleValidationErrors,  userController.signup);
router.post('/user/signin', userController.signin);
router.post('/user/send_verify_email', authMiddleware, userController.sendVerifyEmail);
router.get('/user/verify', userController.verifyEmail);
router.post('/user/signout', userController.signout);
router.post('/user/check_token', userController.checkToken);
router.post('/user/get_user',authMiddleware, userController.getUser);
router.put('/user/:userId',userController.update);
router.get('/coba_asosiation', userController.cobaAssociation);

router.post('/recruiter/post_job', authMiddleware, jobController.postJob);
router.get('/recruiter/get_all_post_job', jobController.getAllJob);
router.post('/recruiter/get_all_post_job_user', authMiddleware, jobController.getJobUser);

module.exports = router