const SendOtp = require('sendotp');
var signupUser= require("../model/signupModelUser")
const sendOtp = new SendOtp('232881A0qhC1tUiPK5b7bbad0','{{otp}} is your 6 digit verification code for Local App. please do not share it with anybody');
var verifyNumber = (req,res)=>{
    var otpNumber =req.body.verifyOtp;
    var userMobile = req.body.mobile;
    sendOtp.verify(userMobile, otpNumber,function(resp,err){
        if(err.type == "success"){
            signupUser.findOneAndUpdate({mobile:userMobile},{$set:{verifyNumber:true}}, {new: true}).then((respo)=>{
                return res.staus(200).json({"staus":true,"msg":"OTP verified successfully"})
            })
            
        }else{
            return res.staus(500).json({"staus":false,"msg": "OTP verification failed"})
        }
    });
}
module.exports =verifyNumber;