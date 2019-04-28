var signupUserModel= require("../model/signupModelUser")
var fetchCompanyDetail = (req,res)=>{
    var userRole=req.body.role
    var mobile = req.body.mobile
    if(userRole == "user"){
        signupUserModel.find({role:"admin"}).than((response)=>{
            if(response){
                return res.status({"status":true, companyDetails:response, "msg":"fetch company details"})
            }else{
                return res.status({"status":false, "msg":"Internal server"})

            }
        })
    }
}
module.exports=fetchCompanyDetail