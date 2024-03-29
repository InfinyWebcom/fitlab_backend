var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var cors = require("cors");
var session= require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blogs');
var instgramTokenRout = require('./routes/instagramToken');
var contactRouter = require('./routes/contactus');
var fitlabImagesRouter = require('./routes/fitlabImages');
var subscribeEmailRouter = require('./routes/subscribeEmail')
var inquiryEmails = require('./routes/inquiryEmails')



var app = express();

app.use(cors());
app.use(session({
  secret: "asdasd",
  resave:false,
  saveUninitialized:false

}))

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
console.log('process.env.db', process.env.db)
mongoose.connect(process.env.db, { useNewUrlParser: true });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog',blogRouter);
app.use('/instagramToken',instgramTokenRout);
app.use('/contactus',contactRouter);
app.use('/fitlabImages',fitlabImagesRouter);
// app.use('/subscribeEmail',subscribeEmailRouter);
app.use('/inquiryEmails',inquiryEmails);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
