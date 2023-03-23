var express = require("express");
var router = express.Router();
var instagramToken = require("../controllers/instgramToken");
var {check} = require("express-validator");
var auth = require('../lib/auth')

router.post("/instagramToken",[
    check("code","please enter code").notEmpty(),
    
],(req,res)=>{
    instagramToken.addInstagramToken(req,res)
});
router.get("/getinstagramToken",[
],(req,res)=>{
    instagramToken.getinstagramToken(req,res)
});

module.exports = router;
