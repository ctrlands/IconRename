var express = require('express');
var router = express.Router();

var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  const baseUrl = 'https://www.coolapk.com';

  var type = req.query.type; // 类型
  var page = req.query.page; // 页码
  type = type || 'apk';
  page = page || '1';
  var route = `/${type}?p=${page}`;
  superagent.get(baseUrl + route)
    .charset('utf-8')
    .end((err, sres) => {
      var items = [];
      if (err) {
        console.log('ERR: ' + err);
        res.json({
          code: 400,
          msg: err,
          sets: items
        });
        return;
      }
      var $ = cheerio.load(sres.text);
      $('.app_left .app_left_list a').each((idx, element) => {
        var $element = $(element);
        var $subElement = $element.find('.alllist_img');

        var name = $($element.find('.list_app_title')).val();
        var thumbImgSrc = $subElement.attr('src');
        items.push({
          title: name,
          href: $element.attr('href'),
          thumbSrc: thumbImgSrc
        });
      });
      res.render('index', {
        title: 'Express',
        code: 200,
        msg: 'success',
        data: items
      });
    })
});

module.exports = router;