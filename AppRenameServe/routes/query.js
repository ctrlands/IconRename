var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/config');
var simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
var pool = mysql.createPool(dbConfig.mysql);
//响应一个JSON数据
var responseJSON = function (res1, ret) {
  if (typeof ret === 'undefined') {
    res1.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res1.json(ret);
  }
};


/* 查询 GET. */
router.get('/', function (req, res, next) {

});


/* 查询 POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var query_keyword = req.body.query_keyword;
    // 建立连接, 分页查询
    // var countSql = `SELECT COUNT(*) AS sum FROM apps_name WHERE CONCAT(IFNULL(cn_name,""),IFNULL(company,"")) like "%${query_keyword}%"`;
    var current_page = 0; // 当前页码，默认为0
    var per_page_total = 30; // 每页显示数量，默认为30
    var all_page_total = 0; // 总共有多少页
    var all_total = 0; // 查询结果数据总量
    var prev_page = 0; // 上一页
    var next_page = 0; // 下一页

    connection.query(simpleSql.queryApps, `%${query_keyword}%`, function (err, result) {
      if (err) {
        res.send(err).end(); // 数据库连接异常
      } else {
        connection.query(simpleSql.countQueryApps, `%${query_keyword}%`, function (err, pageInfo) {
          if (err) {
            res.send(err).end();
          } else {
            all_total = pageInfo[0].sum;
            prev_page = current_page - 1; // 上一页
            if (current_page <= 0) {
              prev_page = 0;
              current_page = 0;
            }
            next_page = current_page + 1; // 下一页
            if (next_page >= all_page_total) {
              next_page = all_page_total;
            }
            all_page_total = Math.ceil(pageInfo[0].sum / per_page_total);
          }
        })
        var toFrontData = [{
          all_total: all_total,
          prev_page: prev_page,
          next_page: next_page,
          current_page: current_page,
          all_page_total: all_page_total
        }]
        res.json([result, toFrontData]);
        connection.release();
      }
    });
  });
});



module.exports = router;