const mongoose = require('mongoose');

const instagramTokenSchema = mongoose.Schema({
    api_secrete_key : String,
    token : String,
    user_id:String,
   
    is_deleted : {
        type : Boolean,
        default : false
    }
},
{
    timestamps:true
  });

var instagramTokenModel = mongoose.model("instagramToken",instagramTokenSchema);
module.exports = instagramTokenModel;