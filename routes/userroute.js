const express = require('express');
//const app= express();
const router = express.Router();
let obj = require('./usercontroller');
let auth = require('./auth');
router.post('/api/users', obj.register);
router.post('/api/session', obj.login);//for customer login
router.post('/api/otp-validation', obj.otpValidation);
router.use(auth.authorization);
router.get('/api/buyfood', obj.restaurents)
module.exports = router;