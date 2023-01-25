const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const async = require('async');
const inquiryEmails = require('../models/inquiryEmails');
const moment = require('moment');
const mongoose = require('mongoose');
const { parser } = require('json2csv');
const helper = require('../lib/helper');
const userModel = require('../models/users');
const { name } = require('ejs');
const blogModel = require('../models/blogs');
var requestIP = require('request-ip');
const create_Enquiry = async (req, res) => {
  try {
    const {  email  } = req.body
    let clientIP =  requestIP.getClientIp(req)
    const result = validationResult(req);
    if (result.errors.length > 0) {
      return res.status(200).json({
        error: true,
        title: result.errors[0].msg,
        error: result,
      })
    }
    const emailExist = await inquiryEmails.findOne({ email: email });
    if (emailExist) {
      res.status(200).json({
        error: true,
        title: "Email already exist"
      })
    }
    else{
      let add = { email ,ip_add:clientIP }
      const data = await inquiryEmails.create(add)
      res.status(200).json({
        title:"Thank you for Contact",
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





module.exports = {
    create_Enquiry
  }