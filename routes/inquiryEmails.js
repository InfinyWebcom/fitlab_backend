var express = require('express');
var router = express.Router();
const inquiryEmails = require('../controllers/inquiryEmails');
const { check } = require('express-validator');
/* GET users listing. */

router.post("/enquiry",
[
    // check("name", "Please enter name").notEmpty(),
    check("email", "Please enter email").notEmpty().isEmail(),
    // check("subject", "Please enter subject").notEmpty(),
    // check("your_message", "Please enter your message").notEmpty()
 
  ],function (req, res) {
    inquiryEmails.create_Enquiry(req, res);}
);

// router.get("/contactUsList",(req,res) => {
//   contactus.contact_us_list(req,res)
// })

module.exports = router;