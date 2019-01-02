var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // var ses = req.session;
  // if (ses.views) {
  //   ses.views++;
  //   // res.setHeader('Content-Type', 'text/html')
  //   // res.write('<p>欢迎第 ' + sess.views + '次访问       ' + 'expires in:' + (sess.cookie.maxAge / 1000) + 's</p>')
  //   res.render('index', { title: 'Express', count: sess.views });
  // } else {
  //   sess.views = 1;
  //   res.render('index', { title: 'Express', count: sess.views });
  // }

  gen_session: (o_session, res) => {
    let auth_user = 'admin';
    res.cookie('isTheme', auth_user, {
      path: '/',
      signed: true,
      httpOnly: true,
      maxAge: 30 * 1000
    })
  }

  let o_session = 'o_value';
  auth.gen_session(o_session, res);

  


  let msg = 'default';
  let i = 1;
  // if (req.cookies.isFirst) {
  //   i++;
  //   msg = '欢迎第' + i + '次访问';
  // } else {
  //   res.cookie('isFirst', 1, {maxAge: 20 * 1000});
  //   msg = '欢迎第' + i + '次访问';
  // }



  /* res.cookie("isTheme", {
    "name": "abc"
  }, {
    maxAge: 1000 * 60
  })

  if (req.cookies["isTheme"]) {
    res.locals.isTheme = req.cookies.isTheme.name;
  } */
  res.render('index', { title: 'Express', count: i , msg: msg});
});

module.exports = router;
