var express = require('express');
var router = express.Router();
const fitlabImages = require('../controllers/fitlabImages');
const { check } = require('express-validator');
/* GET users listing. */

router.post("/addImages",
[
    check("images", "Please enter name").notEmpty(),
  ],function (req, res) {
    fitlabImages.addImages(req, res);}
);

router.get("/getImages",(req,res) => {
    fitlabImages.getImages(req,res)
})

module.exports = router;