const jwt = require("jsonwebtoken");
const async = require("async");
const moment = require("moment");
const mongoose = require("mongoose");
const blog = require("../models/blogs");
const user = require("../models/users")
const { validationResult } = require("express-validator");
const blogModel = require("../models/blogs");
const { query } = require("express");
const userModel = require('../models/users')
const { base64Upload, file_ext } = require('../lib/helper')
//create blog
const addblog = async (req, res) => {
    try {
        const { title, image, author, category, content } = req.body;
        const result = validationResult(req);
        if (result.errors.length > 0) {
            return res.status(200).json({

                error: true,
                title: result.errors[0].message,
                errors: result
            });
        }
        // console.log("================", image)
        let ext = file_ext(image);   // Function is called, return value will end up in x
        // console.log(ext)
        let d_date = new Date()
        let add = { title, image, date: d_date, author, category, content }
        const data = await blog.create(add)

        dir_path = "blog_imgs";
        file_name_with_extention = `file1${Date.now()}.`+ ext;
        image_type = "image/" + ext;
        base64Upload(dir_path, file_name_with_extention, image_type, image, async (BlogImage) => {
            await blogModel.findByIdAndUpdate(data._id, { image: BlogImage })
            data.image = BlogImage
            res.status(200).json({
                title: "Blog added successfully",
                error: false,
                data
            })

        });
    }


    catch (error) {
        return res.status(200).json({
            data: "nice",
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

//update blog
const editblog = async (req, res) => {
    try {
        const { id, title, image, date, author, category, content } = req.body
        if(!image.includes('https://fitlabimgs.s3.ap-south-1.amazonaws.com')){
            let ext = file_ext(image);   
            dir_path = "blog_imgs";
            file_name_with_extention = `file1${Date.now()}.`+ ext;
            image_type = "image/" + ext;
            base64Upload(dir_path, file_name_with_extention, image_type, image, async (BlogImage) => {
                await blogModel.findByIdAndUpdate(id, { image: BlogImage })
            });
        }
        let updateBlog = { title, date, author, category, content };

        await blog.updateOne({ _id: mongoose.Types.ObjectId(id) }, updateBlog)
            .then((data) => {
                res.status(201).json({
                    error: false,
                    title: "blog edited successfully !!",
                    data
                });
            })
    }
    catch (error) {
        return res.status(200).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

//delete blog
const removeBlog = async (req, res) => {
    try {
        const { id } = req.body;
        await blog.deleteOne({ _id: id });
        res.status(201).json({
            error: false,
            title: "blog deleted successfully"
        });
    } catch (error) {
        return res.status(200).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

//listing blog
const listBlog = async (req, res) => {
    try {
        await userModel.findOne({ email: email }, { name: 1 }).then((data) => {
            const payload = [];
            payload['title'] = "Blogging";
            payload['admin'] = data.name,
                res.render('dashbord', payload)
        })
        let sort = { '_id': -1 };
        let blogList = [];
        await blogModel.find().sort(sort).then((data) => {
            for (var i of data) {
                blogList.push(i)
            }
            const payload = [];
            payload['title'] = "Blogging";
            payload['data'] = blogList,
                res.render('dashbord', payload)
            //console.log(payload)

        });
    } catch (error) {
        return res.status(200).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

const blogDetails = async (req, res) => {
    try {
        let blog_details = await blogModel.findOne({ _id: req.query._id })
        await blogModel.findOne({ _id: blog_details._id }).then((data) => {
            res.status(200).json({
                error: false,
                title: "Data fetch successfully",
                data
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}

const blog_list = async (req, res) => {
    try {
        const sort = { '_id': -1 }
        const list = await blogModel.find().sort(sort).then((data) => {
            res.status(200).json({
                title: "Data fetch.",
                error: false,
                data,
            });
        })
    } catch (error) {
        return res.status(200).json({
            title: error.message,
            error: true
        })
    }
}


module.exports = {
    addblog,
    editblog,
    removeBlog,
    listBlog,
    blogDetails,
    blog_list
}