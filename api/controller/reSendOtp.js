const SendOtp = require('sendotp');
const sendOtp = new SendOtp('232881A0qhC1tUiPK5b7bbad0','{{otp}} is your 6 digit verification code for Local App. please do not share it with anybody');
var reSendOtp = (req,res)=>{
    var userMobile = req.body.mobile;
    var randomOtp = Math.floor(1000 + Math.random() * 900000);
    sendOtp.send(userMobile,"DEMOAP",randomOtp,function(err,data){
    return res.status(200).json({"status":true, "msg":"Send otp"});
    })
}
module.exports =reSendOtp;