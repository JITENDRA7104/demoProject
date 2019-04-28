var signupUser= require("../model/signupModelUser")
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('232881A0qhC1tUiPK5b7bbad0','{{otp}} is your 6 digit verification code for Demo Web App. please do not share it with anybody');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var signupUserApi = (req,res)=>{
    try {
    var userName = req.body.name;
    var userMobile = req.body.mobile;
    var userEmail = req.body.email;
    var userAddress = req.body.address;
    var userPassword = req.body.password
    var userRole = req.body.role;
    console.log("11111111111111",req.body)
    if(userName==' ' && userName==null){
        return res.status(200).json({"status":false, "msg":"Nmae is must be required"});
    }else if(userMobile=='' && userMobile == null){
        return res.status(200).json({"status":false, "msg":"Mobile is must be required"});
    }else if(userEmail == '' && userEmail == null){
        return res.status(200).json({"status":false, "msg":"Email is must be required"});
    }else if(userAddress == " " && userAddress==null){
        return res.status(200).json({"status":false, "msg":"Address is must required"});
    }else if(userPassword == '' && userPassword == null){
        return res.status(200).json({"status":false, "msg":"Password is must be requird"})
    }else if(userRole == '' && userRole == null){
        return res.status(200).json({"status":false, "msg":"Role is must select"});
    }else{
        signupUser.findOne({mobile:req.body.userMobile}).then((foundUser)=>{
            if(foundUser){
                return res.status(200).json({"status":false,"msg":"User Already exits"});
            }else{
                const hashedPassword = cryptr.encrypt(userPassword);
                var user = new signupUser();
                user.name=userName
                user.mobile = userMobile
                user.email = userEmail
                user.address = userAddress
                user.password = hashedPassword
                user.role = userRole
                user.verifyNumber = false
                 user.save((err)=>{
                     if(err){
                     return res.status(500).json({"status":false, "msg":"Signup not successful"})
                     }else{
                        var randomOtp = Math.floor(1000 + Math.random() * 900000);
                        sendOtp.send(userMobile,"DEMOAP",randomOtp,function(err,data){
                        return res.status(200).json({"status":true, "msg":"Signup  successfull"});
                        })
                     }
                 })
            }
        })
    }
    } catch (error) {
       return res.status(404).json({"status":true, "msg": "Some technical error"}) 
    }
}
module.exports = signupUserApi