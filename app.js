var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/questions');

require('dotenv').config()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var DB_URL;
if(process.env.NODE_MODE == "developing")
{
  DB_URL = process.env.LOCAL_DATABASE_LINK;
}
else{
  DB_URL = process.env.ONLINE_DATABASE_LINK;
}


console.log("DATABASE LINK : " + DB_URL);

const connect = mongoose.connect(DB_URL, {autoIndex: false});
// connecting to the database
connect.then((db) => {
    console.log("Connected to the MongoDB server\n\n");
}, (err) => { console.log(err); });



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/question', questionRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
