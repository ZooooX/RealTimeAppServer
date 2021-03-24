const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifySignup } = require('../middlewares');

router.route('/signin')
    .post(authController.signin);


router.route('/signup')
    .post(
        verifySignup.checkEmptyFields,
        verifySignup.checkDuplicateUsernameOrEmail,
        authController.signup);
        
        
module.exports = router;