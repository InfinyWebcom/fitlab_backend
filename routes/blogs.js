var express = require("express");
var router = express.Router();
var blog = require("../controllers/blogs");
var {check} = require("express-validator");
var auth = require('../lib/auth')

router.post("/addblog",[
    check("title","please enter title").notEmpty(),
    check("image","please set proper image").notEmpty(),
    check("author","please enter author name").notEmpty(),
    check("content","please enter contents").notEmpty()
],[auth.authenticateUser],(req,res)=>{
    blog.addblog(req,res)
});

router.post("/editblog",[
    check("id","please enter id").notEmpty(),
    check("title","please enter title").notEmpty(),
    check("image","please set proper image").notEmpty(),
    check("author","please enter author name").notEmpty(),
    // check("category","please enter category").notEmpty(),
    check("content","please enter contents").notEmpty()
],[auth.authenticateUser],(req,res)=>{
    blog.editblog(req,res)
});

router.get('/blogDetails',(req,res) => {
    blog.blogDetails(req,res)
})

router.get("/listBlog",(req,res)=>{
    blog.listBlog(req,res)
});

router.post("/removeBlog",[auth.authenticateUser],(req,res)=>{
    blog.removeBlog(req,res)
});

router.get('/blogList',(req,res) => {
    blog.blog_list(req,res)
  })
  

module.exports = router;