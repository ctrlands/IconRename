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

/*   let msg = 'default';
  let i = 1;

  let o_session = 'o_value'; */
  // res.send('444').end();
  res.render('index',{});
  /* req.session.theme = 'default';
  if (req.session.theme) {
    console.log(req.session);
    res.send({title: 'Express', count: req.session.theme , msg: msg}).end();;
  } else {
    req.session.theme = 'default-value';
    res.send({ title: 'Express', count: req.session.theme, msg: msg}).end();
  } */

  // if (req.cookies.isFirst) {
  //   res.send("欢迎再次访问！");
  //   console.log(req.cookies);
  // } else {
  //   res.cookie("isFirst", 1, { maxAge: 30 * 1000 });
  //   res.send("欢迎第一次访问！")
  // }


  
  /* if (req.cookies.isFirsts) {
    i++;
    msg = '欢迎第' + i + '次访问';
    res.send({ title: 'Express', count: i, msg: msg});
  } else {
    res.cookie('isFirsts', 'themeName', {maxAge: 20 * 1000});
    msg = '欢迎第' + i + '次访问';
    res.send({ title: 'Express', count: i, msg: msg});
  } */



  /* res.cookie("isTheme", {
    "name": "abc"
  }, {
    maxAge: 1000 * 60
  })

  if (req.cookies["isTheme"]) {
    res.locals.isTheme = req.cookies.isTheme.name;
  } */
  
});

module.exports = router;
