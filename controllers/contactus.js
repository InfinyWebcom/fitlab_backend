const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const async = require('async');
const contactModel = require('../models/contactus');
const moment = require('moment');
const mongoose = require('mongoose');
const { parser } = require('json2csv');
const helper = require('../lib/helper');
const userModel = require('../models/users');
const { name } = require('ejs');
const blogModel = require('../models/blogs');

const create_contact_user = async (req, res) => {
  try {
    const { name, email, subject ,your_message } = req.body
    const result = validationResult(req);
    if (result.errors.length > 0) {
      return res.status(200).json({
        error: true,
        title: result.errors[0].msg,
      })
    }
    const emailExist = await contactModel.findOne({ email: email });
    if (emailExist) {
      res.status(200).json({
        error: true,
        title: "Email already exist",
      })
    }
    else{
    let add = { name,email,subject,your_message }
    console.log("hdhdhdhhdddddddddddddddddddddhdhdhdhdh",add)

    const otp = await helper.sendEmailstoClient(add);
    const data = await contactModel.create(add)
    res.status(200).json({
      title:"Your request sent successfully",
      error:false,
      data
    })
  }
}
  catch (error) {
    return res.status(200).json({
      title: error.message || "Something went wrong",
      error: true
    })
  }
}

const contact_us_list = async(req,res) => {
  let sort = {'_id':-1};
  var user = await contactModel.find().then((data)=>{
    res.status(200).json({
      title:"data fetch succefully",
      error:false,
      data
    })
  })
  // var admin = user[0].name
  
  // var adminArr =[];
  // adminArr.push(admin)
  // await await blogModel.find().sort(sort).then((data) => {
  //   for (var i of data){
  //     adminArr.push(i)
  //   }
  //   const payload = [];
  //   payload['title'] = "Fitlab";
  //   payload['data'] = adminArr;
  //   res.render('contactus',payload)
  //   //console.log(payload)
  // })
  .catch((err) => {
    //console.log("essss", err)
    res.status(200).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  });
}



module.exports = {
  create_contact_user,
  contact_us_list
}