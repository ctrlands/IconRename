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

  let items = [];
  superagent.get(baseUrl + route)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) {
        res.json({
          code: 400,
          msg: err,
          sets: item1
        });
        return;
      }

      var $ = cheerio.load(sres.text);
      $('.app_left .app_left_list > a').each((idx, element) => {
        var $element = $(element);
        var $subElement = $element.find('.alllist_img');
        var thumbImgSrc = $subElement.attr('src');
        items.push({
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

router.post('/', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  const baseUrl = 'https://www.coolapk.com';

  var type = req.body.type; // 类型
  var page = req.body.page; // 页码
  type = type || 'apk';
  page = page || '1';
  var route = `/${type}?p=${page}`;

  let items = [];
  superagent.get(baseUrl + route)
    .charset('utf-8')
    .end((err, sres) => {
      if (err) {
        res.json({
          code: 400,
          msg: err,
          sets: item1
        });
        return;
      }

      var $ = cheerio.load(sres.text);
      $('.app_left .app_left_list > a').each((idx, element) => {
        var $element = $(element);
        var $subElement = $element.find('.alllist_img');
        var thumbImgSrc = $subElement.attr('src');
        items.push({
          thumbSrc: thumbImgSrc
        });
      });
      res.json(items);
      /* res.render('index', {
        title: 'Express',
        code: 200,
        msg: 'success',
        data: items
      }); */
    })
});

module.exports = router;