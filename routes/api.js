var express = require('express');
var router = express.Router();
var signupUserPath= require("../api/controller/signupUser")
var verifyNumber = require("../api/controller/verifyNumber")
var login = require("../api/controller/login")
var reSendOtp = require("../api/controller/reSendOtp")
var jwt = require("jsonwebtoken");
var signupUserModel= require("../api/model/signupModelUser")
var fetchCompanyDetail = require("../api/controller/fetchCompanyDetails")
var fetchUserDetails = require("../api/controller/userDetails")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var verifyToken = function (req, res, next) {
    let TOKEN = "";
    if (req.headers.authorization) {
      TOKEN = req.headers.authorization;
      // console.log(req.headers);
    }
    if (TOKEN) {
      jwt.verify(TOKEN, "qazwsxedcrfvtgbyhnujmikolp", function (err, decoded) {
        if (err) {
          return res.status(500).send({ status: false, mess: 'Verification failed' })
        } else {
            signupUserModel.findOne({ _id: decoded._id }).then(function (response) {
            if (!response || response == "") {
              return res.status(500).json({ status: false, mess: "User not found" })
            } if (response) {
              req.user_data = response;
              return next();
            } else {
              return response.status(500).json({ status: false, mess: "User not found" })
            }
          }).catch(function (err) {
            console.log("ERROR OF MIDDLEWARE", err)
            return res.status(500).send({ status: false, mess: "Some error occured, please try after sometime" })
          })
        }
      })
    } else {
      return res.status(500).json({ status: false, mess: "Verification failed" })
    }
  }


router.post('/signupUserApi',signupUserPath)
router.post('/verifyNumber',verifyNumber)
router.post('/login',login)
router.post('/reSendOtp',reSendOtp)
router.post("/fetchUserDetails",verifyToken,fetchUserDetails)
router.post("/fetchCompanyDetail",verifyToken,fetchCompanyDetail)
module.exports = router;
