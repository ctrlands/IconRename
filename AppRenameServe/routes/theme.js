var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/config');
var simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
var pool = mysql.createPool(dbConfig.mysql);
//响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};


/* 获取当前theme GET. */
router.get('/', function (req, res, next) {

});


/* 设置theme POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var theme_name = req.body.theme_name;
    // 建立连接, 分页查询
    connection.query(simpleSql.setThemeName, theme_name, function (err, result) {
      if (err) {
        res.send(err).end(); // 数据库连接异常
      } else {
        /* var toFrontData = [{
          all_total: all_total,
          prev_page: prev_page,
          next_page: next_page,
          current_page: current_page,
          all_page_total: all_page_total
        }] */
        responseJSON(res,result);
        connection.release();
      }
    });
  });
});



module.exports = router;