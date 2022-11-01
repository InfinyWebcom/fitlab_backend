const async = require("async");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cryptr = require("cryptr");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var ejs = require("ejs");
const AWS = require("aws-sdk");
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_REGION_NAME = process.env.AWS_REGION_NAME
AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: "ap-south-1"
});
const s3Bucket = new AWS.S3({ params: { Bucket: AWS_BUCKET_NAME } });
const s3BaseUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION_NAME}.amazonaws.com/`;

const sendmail = (data) => {
    try {
        let smtpTransport = nodemailer.createTransport({
            port: 587,
            secureConnection: false,
            host: 'smtp.gmail.com',
            requiresAuth: true,
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        var mailOptions = {
            to: data.email,
            from: process.env.email,
            subject: data.subject,
            html: data.body
        }
        if (data.attachments) {
            mailOptions.attachments = data.attachments
        }

        if (data.cc && data.cc.length > 0) {
            mailOptions.cc = data.cc
        }

        smtpTransport.sendMail(mailOptions, function (err) {
            console.log("Error in sending mail", err);
            return true;
        });
    }
    catch (error) {
        console.log("Email error", error);
        return error;
    }
}

const create_mail = (data) => {
    const { name, email, phone, password } = data;
    const info = {
        title: "user account created",
        name,
        email,
        phone,
        password,
        year: moment().get('year')
    }

    const emailContent = fs.readFileSync(process.cwd() + '/views/createUser.ejs', 'utf8');
    const emailhtml = ejs.render(emailContent, info);
    var mailData = {
        email,
        subject: "user account created",
        body: emailhtml,
    };
    sendmail(mailData);
    return email;
}

const contact_create_mail = (data) => {
    const { name, email, subject, message } = data;
    const info = {
        title: "contact added",
        name,
        email,
        subject,
        message,
        year: moment().get('year')
    }

    const emailContent = fs.readFileSync(process.cwd() + '/views/createContact.ejs', 'utf8');
    const emailhtml = ejs.render(emailContent, info);
    var mailData = {
        email,
        subject: "contact added",
        body: emailhtml,
    };
    sendmail(mailData);
    return email;
}

const sendOtp = (user) => {
    const { name, email } = user;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const data = {
        title: `OTP for login verification`,
        name,
        email,
        otp,
        year: moment().get('year')
    }
    const emailContent = fs.readFileSync(process.cwd() + '/views/sendotp.ejs', 'utf8');
    const emailHtml = ejs.render(emailContent, data);
    var mailData = {
        email,
        subject: `OTP for login verification`,
        body: emailHtml,
    };
    sendmail(mailData);
    return otp;
}

const subscribeEmail = (user) => {
    const { name, email } = user;
    const info = {
        title: `Fitlab`,
        name,
        email,
        year: moment().get('year')
    }
    const emailContent = fs.readFileSync(process.cwd() + '/views/subscribeEmail.ejs', 'utf8');
    const emailHtml = ejs.render(emailContent, info);
    var mailData = {
        email,
        subject: `Fitlab Subcription`,
        body: emailHtml,
    };
    sendmail(mailData);
    return (email);
}

const base64Upload = (dir_path, file_name_with_extention, type, base64Str, cb) => {

    const object_key = dir_path + "/" + file_name_with_extention;
    const fileBuffer = Buffer.from(base64Str.replace(/^data:image\/\w+;base64,/, "").replace(/^data:application\/\w+;base64,/, ""), 'base64')
    var data = {
        Key: object_key,
        Body: fileBuffer,
        ContentEncoding: 'base64',
        ContentType: type,
        ACL: 'public-read',
        Bucket: AWS_BUCKET_NAME
    };
    s3Bucket.putObject(data, function (err, data) {
        if (err) {
            console.log('File upload err', err);
            cb('')
        } else {
            console.log('File uploaded ', file_name_with_extention)
            cb(s3BaseUrl + object_key);
        }
    });
}

const file_ext = (base64_img) => {
    const extension = ["png", "jpg", "jpeg"]

    for (let i = 0; i < extension.length; i++) {
        result = base64_img.match(extension[i]);
        if (result != null) {
            return result[0]
        }
    }
}

module.exports = {
    sendmail,
    create_mail,
    contact_create_mail,
    sendOtp,
    subscribeEmail,
    base64Upload,
    file_ext
}