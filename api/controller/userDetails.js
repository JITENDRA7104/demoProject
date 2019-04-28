var signupUserModel= require("../model/signupModelUser")
var fetchUserDetails = (req,res)=>{
    try {
        var userRole=req.body.role
        if(userRole == "admin"){
            signupUserModel.findOne({role:"user"}).then((response)=>{
                if(response != "null"){
                    return res.status(200).json({"status":true, fetchUserDetails:response, "msg":"fetch company details"})
                }else{
                    return res.status(500).json({"status":false, "msg":"Internal server"})
    
                }
            }).catch((err)=>{
                return res.status(500).json({"status":false, "msg":"Internal server"})
            })
        }
    } catch (error) {
        return res.status(500).json({"status":false, "msg":"Internal server"})
    }
  
}
module.exports=fetchUserDetails