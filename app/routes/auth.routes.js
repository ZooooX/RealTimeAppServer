const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifySignUp, authJwt } = require('../middlewares');
const verifySignup = require('../middlewares/verifySignup');

router.route('/signin')
    .post(authController.signin);


router.route('/signup')
    .post(
        verifySignup.checkEmptyFields,
        verifySignUp.checkDuplicateUsernameOrEmail,
        authController.signup);
        
        
module.exports = router;