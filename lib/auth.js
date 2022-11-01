var jwt = require("jsonwebtoken");
var helper = require("../lib/helper");
var user = require("../models/users");

const authenticateUser = async (req,res,next) => {
    const token = req.headers.token ? req.headers.token : req.query.token;
    const decoded = jwt.decode(token,process.env.JwtSecret);
    try{
        let userData = await user.findById(decoded._id).lean().exec();
        if(!userData || userData == undefined){
            return res.status(201).json({
                error : true,
                title : "user not found"
            })
        }
        req.user = userData;
        return next(null,userData);
    }
    catch(error){
        return res.status(200).json({
            error : true,
            title : "Authorization required",
            detail : error,
            isDenied  : true
        });
    }
}

module.exports = {
    authenticateUser
}