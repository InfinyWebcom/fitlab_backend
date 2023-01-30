const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const http = require('http');
const instagramToken = require("../models/instgramToken");
const user = require("../models/users")
const { validationResult } = require("express-validator");
const { query } = require("express");
const jsonp = require('jsonp');
const axios = require('axios');
const querystring = require('querystring');
//create blog


// const options = {
//     hostname: 'jsonplaceholder.typicode.com',
//     path: '/posts',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
const addInstagramToken = async (req, res) => {
    try {
        const { code } = req.body;
        const result = validationResult(req);
        if (result.errors.length > 0) {
            return res.status(200).json({
                error: true,
                title: result.errors[0].message,
            });
        } else {
            console.log("ddddddddhdhbdhsjkbdi", code)
            const postData = {
                code: code,
                client_id: 515496257115643,
                // client_secret: "39975e5676dac99d96119d2adc05fbe5",
                client_secret:"72a79c71a0df0ba22401527a5215711b",
                grant_type: 'authorization_code',
                redirect_uri: "https://www.thefitlabhoboken.com/"
            };
            await makePost(postData,res)
        }
    }
    catch (error) {
        return res.status(200).json({
            error: true,
            title: error.message || "something went wrong"
        });
    }
}


// const postData = JSON.stringify({
//     code: '',
//     client_id:"924478315594743",
//     client_secret:"39975e5676dac99d96119d2adc05fbe5",
//     grant_type:'authorization_code',
//     redirect_uri:"https://www.thefitlabhoboken.com/"
//   });

//   const options = {
//     hostname: 'https://api.instagram.com/oauth/access_token',
//     // path: '/oauth/access_token',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': Buffer.byteLength(postData),
//     },
//   };

const makePost =async (postData,res) => {
   
    axios.post('https://api.instagram.com/oauth/access_token', querystring.stringify(postData))
        .then(async(response) => {
            let add = {token:response.data.access_token, api_secrete_key:515496257115643                ,user_id:response.data.user_id}
            let tokenlist=await instagramToken.findOne({api_secrete_key:'515496257115643'}) 
            if(tokenlist){
                await instagramToken.updateOne({api_secrete_key:"515496257115643"} ,add).then((data)=>{
                    res.status(200).json({
                        error: false,
                        title: "success fully store in Database",
                    })
                })
            }else{
                await instagramToken.create(add).then((data)=>{
                    res.status(200).json({
                        error: false,
                        title: "success fully store in Database",
                    })
                })
            }
         
        })
        .catch(error => {
            return res.status(200).json({
                error: true, 
                title: error.response.data.error_message || "something went wrong"
            });
        });
};

const getinstagramToken= async (req, res) => {
        try {
            let blog_details = await instagramToken.findOne({ })
            if(blog_details){
                await instagramToken.findOne({},'token').then((data) => {
                    res.status(200).json({
                        error: false,
                        title: "Data fetch successfully",
                        data
                    })
                })
            }
            
        } catch (error) {
            return res.status(200).json({
                error: true,
                title: error.message || "something went wrong"
            });
        }
}



module.exports = {
    addInstagramToken,
    getinstagramToken

}