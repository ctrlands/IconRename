var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sqlTestRouter = require('./routes/sqls');

var uploadRouter = require('./routes/upload');

var themeRouter = require('./routes/theme');
var themeListRouter = require('./routes/themeList');

var nullRouter = require('./routes/null');

var queryRouter = require('./routes/query');

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

// app.use(session({
//   name: 'cookie-session',
//   secret: 'admin',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 30 * 1000
//   }
// }))
// (function() {
// 	var keys = [];
// 	for (var i = 0; i < 10000; i++) {
// 		keys[i] = 'CtrlAndS' + Math.random();
// 	}
// 	app.use(session({
// 		name: 'session_id',
// 		keys: keys,
// 		maxAge: 1 * 60 * 1000 //1min
// 	}));
// })();

// app.use(session({
//   secret: 'ctrlands',
//   name: 'themeName', // 这里的name值是cookie的name, 默认cookie的name是：connect.sid
//   // store: new fileStore(), // 本地储存session
//   cookie: { maxAge:  30 * 1000 }, // 设置session时长, 这里设置10s, 即10s后session的相应的cookie失效过期
//   resave: false, // 一个请求在另一个请求结束时对session进行修改覆盖并保存，默认值true
//   saveUninitialized: true, // 初始化session时是否保存到储存
  
// }))



app.use(express.static(path.join(__dirname, 'public')));
app.use('/default', express.static('D:/upload/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sql', sqlTestRouter);
app.use('/theme', themeRouter);
app.use('/themeList', themeListRouter);
app.use('/query', queryRouter);

app.use('/upload', uploadRouter)

app.use('/null', nullRouter)

app.use((req, res, next) => {
  if (req.cookies.isTheme) {
    res.locals.isTheme = req.cookies.isTheme.name;
  }
  next();
})

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
