var express = require('express');
var router = express.Router();
var blogModel = require('../models/blogs')
/* GET home page. */
router.get('/', async function(req, res, next) {
  let sort = {'_id':-1};
  let blogList = [];
  await blogModel.find().sort(sort).then((data) => {
    for (var i of data){
      blogList.push(i)
    }
    const payload =[];
    payload['title'] = "Blogging";
    payload['data'] = blogList,
    res.render('index',payload)
  })
  res.render('index', { title: 'Fitlab' });
});

router.get('/login', function(req, res, next) {

  res.render('login',{ title: 'Login' });
});



module.exports = router;
