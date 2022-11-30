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
const addImages = async (req, res) => {
    try {
        const {images} = req.body;
        const result = validationResult(req);
        if (result.errors.length > 0) {
            return res.status(200).json({
                error: true,
                title: result.errors[0].message,
                errors: result
            });
        }
        if(images){
            for (let i=0;i<images.length;i++){ 
            if(!images[i].includes('https://s3.us-east-1.amazonaws.com/')){
              base64Upload(`property_gallery/${property_id}`, Math.floor(Math.random() * 1000000000) + ".png", "image/png", images[i] ,async(url) => {
                    propertyImage.updateOne({property_id}, {$push: {images: url}},{upsert: true}).exec();
                
                })
            }
        }
        setTimeout(()=>{
        res.status(200).json( {
            title: "Image added successfully",
            error: false,
        })},3000)
        }




        // console.log("================", image)
    }
    catch (error) {
        return res.status(200).json({
            data: "nice",
            error: true,
            title: error.message || "something went wrong"
        });
    }
}
const add_images = async (req, res) => {
    try {
        const {property_id, image} = req.body

        let propertyData = await property.findOne({_id : property_id})
        if (!propertyData) {
            return res.status(200).json({
                title: 'Property not found',
                error: true
            });
        }
         if(image){
            for (let i=0;i<image.length;i++){ 
            if(!image[i].includes('https://s3.us-east-1.amazonaws.com/')){
              base64Upload(`property_gallery/${property_id}`, Math.floor(Math.random() * 1000000000) + ".png", "image/png", image[i] ,async(url) => {
                    propertyImage.updateOne({property_id}, {$push: {images: url}},{upsert: true}).exec();
                
                })
            }
        }
        setTimeout(()=>{
        res.status(200).json( {
            title: "Image added successfully",
            error: false,
        })},3000)
        }
    }
    catch (error) {
        return res.status(200).json({
            title: error.message || "Something went wrong",
            error: true,
        });
    }
}

//update blog


//delete blog
const deleteImages = async (req, res) => {
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

const listImages = async (req, res) => {
    try {
        const sort = { '_id': -1 }
        const list = await blogModel.find().sort(sort).then((data) => {
            res.status(200).json({
                title: "Data fetch.",
                error: "true",
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
    addImages,
    deleteImages,
    listImages,
  
}