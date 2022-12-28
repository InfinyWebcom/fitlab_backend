const mongoose = require('mongoose');
const inquiryEmailsSchema = mongoose.Schema({
//   name: String,
  email:  {
    unique: true,
    type: String,
    required: 'Email address is required',
  },
  ip_add:{
    type: String,
  }
//   subject:String,
//   your_message:String
}
  ,{
  timestamps:true
  });

var inquiryEmails = mongoose.model("inquiryEmails", inquiryEmailsSchema);

module.exports = inquiryEmails;