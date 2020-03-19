var otpGenerator = require('otp-generator');//otp generator
var nodemailer = require('nodemailer');
const data = require('./usermodel');//importing usermodel
const auth = require('./auth');
const operationObject = {};
const customerDetails = {
    CustomerName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    Address: ''
};
operationObject.register = async function (req, res) {
    customerDetails.CustomerName = req.body.name;
    customerDetails.PhoneNumber = req.body.phone;
    customerDetails.Email = req.body.email;
    customerDetails.Password = req.body.password;
    customerDetails.Address = req.body.address;
    let isSave = await data.addCustomer(req.body.phone, req.body.email, customerDetails);
    console.log(isSave);
    if (isSave) {
        console.log("successfully saved");
        //redirect for login page
        // res.redirect();
    } else {
        console.log("save Failed");
        //redirect for signup page
        //res.redirect();
    }
}
//for login
operationObject.login = async function (req, res) {
    let phone = req.body.phone;
    // console.log(phone);
    let isLogin = await data.checkLogin(phone);
    console.log(isLogin);
    if (isLogin) {
        //for otp
        let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        data.saveOtp(otp, phone);
        var message = otp;
        sendMail(customerDetails.Email, 'welcome to the foodapp', message);
        //redirect for otp page
        // res.redirect();
    } else {
        console.log("Failed");
        //again login page
        // res.redirect()
    }

}

operationObject.otpValidation = async function (req, res) {
    let phone = req.body.phone;
    let isValid = await data.validateOtp(req.body.otp, phone);
    if (isValid) {
        console.log("Successfully logged in");
        let { token } = auth.tokenGenerator(phone, 'secret');
        console.log(token);
        //redirect page after login
        //  res.redirect()
    } else {
        console.log("enter valid otp");
        //redirect for otp
        // res.redirect();=
    }
}
operationObject.restaurents = function (req, res) {
    console.log("List of restaurents");
}
//sending otp to email
function sendMail(to, subject, message) {
    var smtpConfig = {
        service: 'gmail',
        auth: {
            user: 'naveeagrahari56',//sender's username 
            pass: 'XXXXX'// sender's password 
        },
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var mailOptions = {
        from: '"naveen agrahari" <naveeagrahari56@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'Hello world ?', // plaintext body
        html: message // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(info.response);

        }
    });

}

module.exports = operationObject;