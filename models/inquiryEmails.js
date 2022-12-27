const mongoose = require('mongoose');
const inquiryEmailsSchema = mongoose.Schema({
//   name: String,
  email:  {
    unique: true,
    type: String,
    lowercase: true,
    required: 'Email address is required',
  },
//   subject:String,
//   your_message:String
}
  ,{
  timestamps:true
  });

var inquiryEmails = mongoose.model("inquiryEmails", inquiryEmailsSchema);

module.exports = inquiryEmails;