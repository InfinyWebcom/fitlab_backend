var express = require('express');
var router = express.Router();
var user = require("../controllers/users");
var {check} = require("express-validator");

/* GET users listing. */

router.post("/createaccount",[
  check("name","please enter name").notEmpty(),
  check("email","please enter email").notEmpty(),
  check("phone","please enter phone").notEmpty(),
  check("password","please enter password").notEmpty()
],(req,res)=>{
  user.createaccount(req,res);
});

router.patch("/editaccount",[
  check("id","please enter id").notEmpty(),
  check("name","please enter name").notEmpty(),
  check("email","please enter email").notEmpty(),
  check("phone","please enter phone").notEmpty(),
  check("password","please enter password").notEmpty()
],(req,res)=>{
  user.editaccount(req,res);
});

router.delete("/deleteaccount",(req,res)=>{
  user.deleteaccount(req,res);
});

router.post("/login",(req,res)=>{
  user.login(req,res);
});

router.post('/forgotPassword', (req, res, next) => {
  user.forgotPassword(req, res);
});

router.post('/verifyOtp' ,(req, res, next) => {
  user.verifyOtp(req, res);
});

router.post('/bloggerDeatils',(req,res) => {
  user.blogger_details(req,res);
})

module.exports = router;
