const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const async = require('async');
const subscribeEmailModel = require('../models/subscribeEmail');
const moment = require('moment');
const mongoose = require('mongoose');
const { parser } = require('json2csv');
const helper = require('../lib/helper');

const creat_subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = validationResult(req);
    if (result.errors.length > 0) {
      return res.status(200).json({
        error: true,
        title: result.errors[0].msg,
        error: result,
      })
    }
    const emailExist = await subscribeEmailModel.findOne({ email: email });
    if (emailExist) {
      res.status(200).json({
        error: true,
        title: "Email already exist"
      })
    }
    let add = { email }
    const data = await subscribeEmailModel.create(add)
    const subcribeMail = await helper.subscribeEmail(req.body)
    res.status(200).json({
      title: "Your request sent successfully",
      error: false,
      data
    })
  }
  catch (error) {
    return res.status(200).json({
      title: error.message || "Something went wrong",
      error: true
    })
  }
}

module.exports = {
  creat_subscribeUser
}