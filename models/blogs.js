const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : String,
    image : String,
    date : Date,
    author : String,
    cotegory : String,
    content : String,
    is_deleted : {
        type : Boolean,
        default : false
        
    }
});

var blogModel = mongoose.model("blog",blogSchema);
module.exports = blogModel;