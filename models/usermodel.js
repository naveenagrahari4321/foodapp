const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/foodapp');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function () {
    console.log("connection succeeded");
})
//creating Schema for customer
let customerSchema = mongoose.Schema({
    CustomerName:{
      type:String,
      required:true
    } ,
    PhoneNumber: {
       type: Number,
       required:true
    },
    Email: {
      type:String,
      required:true
    },
    Password: {
       type: String,
       required:true
    },
    Address: String
})
//creating Schema for otp
let otpSchema = mongoose.Schema({
    otp:{
        type:String,
        required:true
    } ,
    phone: {
        type:Number,
        required:true
    }
})
//creating model for customer
let Customer = mongoose.model('Customer', customerSchema);
//creating model for otp
let Otp = mongoose.model('Otp', otpSchema);
//In order to check user exist or not
const data = {};
//for registration
data.addCustomer = async function (phone, email, customer) {
    try {
        //checking customer is already exist or not
        let cust = await Customer.findOne({ $or: [{ 'PhoneNumber': phone }, { 'Email': email }] }).exec();
        console.log(cust);
        if (cust) {
            return false;
        } else {
            let c1 = new Customer(customer);//create customer details object
            let saveCustomer = await c1.save(); //
            if (saveCustomer) {
                return true;
            }
        }
    } catch (err) {
        throw err;
    }

}
data.checkLogin = async function (phone) {
    // console.log(phone);
    //checking user exist or not
    let cust = await Customer.findOne({ 'PhoneNumber': phone }).exec();
    console.log(cust);
    if (cust) {
        return true;
    } else {
        return false;
    }
}
data.saveOtp = async function (generatedOtp, mobile) {
    otpDetails = {
        otp: generatedOtp,
        phone: mobile
    }
    let otp1 = new Otp(otpDetails);
    console.log(otpDetails);
    try {
        let isData = await Otp.findOne({ 'phone': mobile }).exec();
        if (isData) {
            let otpUpdate = await Otp.findOneAndUpdate({ 'phone': mobile }, { $set: { 'otp': generatedOtp } }).exec();
            if (otpUpdate) {
                console.log("Successfuly update otp");
            }
        } else {
            let otpSave = await otp1.save(otpDetails);
            if (otpSave) {
                console.log("successfully saved otp ");
            }
        }
    } catch (err) {
        throw err;
    }
}
data.validateOtp = async function (enteredOtp, phone) {
    try {
        let isOtp = await Otp.findOne({ $and: [{ 'otp': enteredOtp }, { 'phone': phone }] }).exec();
        if (isOtp) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}
module.exports = data;