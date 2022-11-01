var express = require('express');
var router = express.Router();
const subscribeEmail = require('../controllers/subscribeEmail');
const { check } = require('express-validator');
/* GET users listing. */

router.post("/creatSubcribeEmailUser",
[
    check("email", "Please enter email").notEmpty(),
 
  ],function (req, res) {
    subscribeEmail.creat_subscribeUser(req, res);}
);

module.exports = router;