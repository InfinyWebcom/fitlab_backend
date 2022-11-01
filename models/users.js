const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : String,
    email : {
        unique : true,
        type : String,
        lowercase : true,
        required: "email is required"
    },
    phone : String,
    password : String,
    otp:String,
    
},{timestamps:true});
 
var userModel = mongoose.model("user",userSchema);
module.exports = userModel;