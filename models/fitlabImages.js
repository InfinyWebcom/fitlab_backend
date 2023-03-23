const mongoose = require('mongoose');

const fitlabImagesSchema = mongoose.Schema({
    
    image : String,
   
  
    content : String,
    is_deleted : {
        type : Boolean,
        default : false
    }
});

var fitlabImagesModel = mongoose.model("blog",fitlabImagesSchema);
module.exports = fitlabImagesModel;