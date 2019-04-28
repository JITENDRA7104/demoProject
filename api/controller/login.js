var signupUserModel= require("../model/signupModelUser")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var jwt = require("jsonwebtoken");
var login = (req,res)=>{
    try {
        var userMobile = req.body.mobile;
        var userPassword = req.body.password;
        if(userMobile=='' && userMobile == null){
         return res.status(200).json({"status":false, "msg":"Mobile number must be required"})
        }else if(userPassword == '' && userPassword == null){
            return res.status(200).json({"status":false, "msg":"Password must be required"})
        }else{
        signupUserModel.findOne({mobile:userMobile}).then((user)=>{
            const hashPassword = cryptr.decrypt(user.password);
            var token = jwt.sign({ _id: user._id }, "qazwsxedcrfvtgbyhnujmikolp");
            if(user.verifyNumber == false){
                return res.status(200).json({"status":false, "msg":"Please verify your mobile number"})
            }else if(hashPassword == userPassword){
                return res.status(200).json({"status":true, "msg":"Login successful",token:token,role:user.role,mobile:user.mobile})
            }else{
                return res.status(200).json({"status":false, "msg":"Login not successful"})
            }
        })
        }
    } catch (error) {
        return res.status(404).json({"status":false, "msg":"Some teachnical error"})
    }
   
}
module.exports = login