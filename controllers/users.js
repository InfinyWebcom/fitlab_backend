const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const async = require("async");
const moment = require("moment");
const userModel = require("../models/users");
const helper = require("../lib/helper");
const blogModel = require("../models/blogs")

const createaccount = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const result = validationResult(req);
        if (result.errors.length > 0) {
            res.status(200).json({
                error: true,
                title: message.errors[0].msg,
                errors: result
            });
        }

        const emailExist = await userModel.findOne({ email: email });
        if (emailExist) {
            res.status(200).json({
                error: true,
                title: "Email already exist"
            })
        }

        const hashPass = await bcrypt.hash(password, 12)
        let user = { name, email, phone, password: hashPass }
        const data = await userModel.create(user)
        const mail = await helper.create_mail(req.body)
        res.status(200).json({
            title: "User added successfully",
            error: false,
            data
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteaccount = async (req, res) => {
    try {
        const { id } = req.query;
        await userModel.deleteOne({ _id: id })
        res.status(200).json({
            error: false,
            title: "account deleted successfully"
        });
    }
    catch (error) {
        return res.status(200).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

const editaccount = async (req, res) => {
    const { id, name, email, phone, password } = req.body;
    const checkData = await userModel.findOne({ email: email, _id: { $ne: id } })
    if (checkData) {
        return res.status(200).json({
            error: true,
            title: "email already exist !!"
        });
    }

    const update_user = { name, email };
    if (password) {
        let pass = await bcrypt.hash(password, 12)
        update_user.password = pass
    }

    //const editmail = await helper.edit_mail(req.body)
    userModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, update_user).then((data) => {
        res.status(201).json({
            error: false,
            title: "account edited successfully",
            data
        });
    }).catch((err) => {
        return res.status(200).json({
            error: true,
            title: err.message || "something went wrong"
        });
    });
};

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             res.status(200).json({
//                 title: "Email and Password is required.",
//                 error: true
//             })
//             // res.render('login', { message: message })
//         }else{

//             let blogger = await userModel.findOne({ email: email.trim().toLowerCase() });
//             let pass = await bcrypt.compare(req.body.password, blogger.password);
//             console.log("DddddddddddddddddddDDDDDD",pass)
//             if (!pass || !blogger) {
//                 res.status(200).json({
//                     title: "Email or password is incorrect.",
//                     error: true
//                 })
//             }else{
//                 const accesstoken = jwt.sign({_id:mongoose.Types.ObjectId(blogger._id), email: blogger.email }, process.env.JwtSecret)
//                 res.status(200).json({
//                     title: "Logged in succeessfully.",
//                     error: false,
//                     token: accesstoken
//                 })
        
//             }

//         }

      
       
//     } catch (error) {
//         res.status(200).json({
//             title: error.message || "Something went wrong.",
//             error: true
//         })
//     }
// }

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("body",req.body)
      if (!email || !password) {
          return res.status(200).json({
          title: 'Email and password is required',
          error: true
      });
      }
      
      let admin = await userModel.findOne({ email });
      if (!admin) {
        return res.status(200).json({
          title: 'User not found',
          error: true
      });
      }
      let pass = await bcrypt.compare(req.body.password, admin.password);
      if (!pass) {
        return res.status(200).json({
          title: 'Email or password is incorrect.',
          error: true
      });
      }
      const accessToken = jwt.sign(
        { _id: admin._id,  email: admin.email },
        process.env.JwtSecret
      );
  
     
      return res.status(200).json({
        title: 'Logged in successfully ',
        error: false,
        token : accessToken
  
     });
    } catch (err) {
      return res.status(500).json({
        title: 'Something went wrong',
        error: true,
  
     });
    }
  };

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(200).json({
                title: "Email is required",
                error: true,
            });
        }
        const user = await userModel.findOne({ email: email.trim().toLowerCase() }).exec();
        if (!user) {
            return res.status(200).json({
                title: "User not found",
                error: true,
            });
        }

        const otp = await helper.sendOtp(user);
        await userModel.findByIdAndUpdate(user._id, { otp }).exec();
        return res.status(200).json({
            title: "Otp sent successfully",
            error: false,
        });
    } catch (error) {
        return res.status(200).json({
            title: error.message || "Something went wrong",
            error: true,
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(200).json({
                title: 'Email and otp is required',
                error: true
            });
        }

        const data = await userModel.findOne({ email: email }).exec();

        if (!data) {
            return res.status(200).json({
                title: "User not found",
                error: true,
            });
        }
        if (String(data.otp) === String(otp)) {
            await userModel.findByIdAndUpdate(data._id, { otp: '' }).exec();
            const token = await jwt.sign({
                user_id: data._id,
                email: email,
                name: data.name,

            }, process.env.JwtSecret);
            return res.status(200).json({
                title: "Otp verified successfully",
                error: false,
                token
            });
        }
        else {
            return res.status(200).json({
                title: "Please enter valid otp",
                error: true,
            });
        }
    } catch (error) {

        return res.status(200).json({
            title: error.message || "Something went wrong",
            error: true,
        });

    }
}

const blogger_details = async (req, res) => {
    try {
        const { email } = req.body;
        let user = [];
        await userModel.findOne({ email: email }, { name: 1 }).then((data) => {
            for (var i of data) {
                user.push(i)
            }
            const payload = [];
            payload['data'] = user,
                res.render('dashbord', payload)
        })
    } catch (error) {
        return res.status(200).json({
            title: error.message || "Something went wrong",
            error: true,
        });
    }
}

module.exports = {
    createaccount,
    deleteaccount,
    editaccount,
    login,
    forgotPassword,
    verifyOtp,
    blogger_details
}