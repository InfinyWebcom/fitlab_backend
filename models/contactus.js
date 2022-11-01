const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
  name: String,
  email:  {
    unique: true,
    type: String,
    lowercase: true,
    required: 'Email address is required',
  },
  subject:String,
  your_message:String}
  ,{
  timestamps:true
  });

var contactModel = mongoose.model("contactus", contactSchema);

module.exports = contactModel;