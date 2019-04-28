const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
const saverUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    verifyNumber:{
        type:Boolean,
        required:true
    },
   
})
var saveUser = mongoose.model("saveUser",saverUserSchema)
module.exports = saveUser