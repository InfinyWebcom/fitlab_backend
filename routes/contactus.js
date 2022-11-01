var express = require('express');
var router = express.Router();
const contactus = require('../controllers/contactus');
const { check } = require('express-validator');
/* GET users listing. */

router.post("/creatContactUser",
[
    check("name", "Please enter name").notEmpty(),
    check("email", "Please enter email").notEmpty(),
    check("subject", "Please enter subject").notEmpty(),
    check("your_message", "Please enter your message").notEmpty()
 
  ],function (req, res) {
    contactus.create_contact_user(req, res);}
);

router.get("/contactUsList",(req,res) => {
  contactus.contact_us_list(req,res)
})

module.exports = router;