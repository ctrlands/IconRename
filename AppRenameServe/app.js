var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sqlTestRouter = require('./routes/sqls');

var uploadRouter = require('./routes/upload');

var themeRouter = require('./routes/theme');

var queryRouter = require('./routes/query');
var ejs = require('ejs');

var app = express();

// 允许跨域设置
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* app.all("*", function (req, res, next) {
  var regOrigin = req.header("origin");
  if (req.method === "OPTIONS") {
    console.log("cros");
    var header = {};
    res.header("access-control-allow-origin", "http://127.0.0.1:3000");
    res.header("Access-Control_Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.end();
  } else {
    if (regOrigin != undefined && regOrigin.indexOf("http://127.0.0.1:4200") > -1) {
      // 设置允许http://127.0.0.1:3000响应
      res.header("access-control-allow-origin", "http://127.0.0.1:4200");
      res.header("Access-Control_Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      next();
    }
  }
}) */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sql', sqlTestRouter);
app.use('/theme', themeRouter);
app.use('/query', queryRouter);

app.use('/upload', uploadRouter)

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
