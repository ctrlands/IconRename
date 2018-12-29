var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ses = req.session;
  if (ses.views) {
    ses.views++;
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<p>欢迎第 ' + sess.views + '次访问       ' + 'expires in:' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.render('index', { title: 'Express', count: sess.views });
  } else {
    sess.views = 1;
    res.render('index', { title: 'Express', count: sess.views });
  }
});

module.exports = router;
