const mongoose = require('mongoose');
const subcribeEmailSchema = mongoose.Schema({
  email:  {
    unique: true,
    type: String,
    lowercase: true,
    required: 'Email address is required',
  }

},{
  timestamps:true
});

var subcribeEmailModel = mongoose.model("subcribeEmail", subcribeEmailSchema);

module.exports = subcribeEmailModel;