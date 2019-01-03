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


/* 分页 GET. */
router.get('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    /* 分页查询 */
    var pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
    connection.query(pageTotalSql, '', function (err, result) {
      if (err) {
        res.send(err).end(); // 数据库连接异常
        connection.release();
      } else {
        var current_page = 0; // 当前页码，默认为1
        var per_page_total = 30; // 每页显示数量，默认为30
        var all_page_total = Math.ceil(result[0].sum / per_page_total); // 总共有多少页
        var all_total = result[0].sum; // 数据总量
        var prev_page = current_page - 1; // 上一页
        if (current_page <= 0) {
          prev_page = 0;
          current_page = 0;
        }
        var next_page = current_page + 1; // 下一页
        if (next_page >= all_page_total) {
          next_page = all_page_total;
        }

        var pageQuerySql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
        connection.query(pageQuerySql, '', function (err, datas) {
          if (err) {
            res.send(err).end(); // 数据库连接异常
          } else {
            var toFrontData = [{
              all_total: all_total,
              prev_page: prev_page,
              next_page: next_page,
              current_page: current_page,
              all_page_total: all_page_total
            }]
           res.json([datas,toFrontData]);
           connection.release();
          }
        });

      }
    });
  });
});

/* 分页 POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var page = req.body.page;
    // 建立连接, 分页查询
    var pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
    connection.query(pageTotalSql, '', function (err, result) {
      if (err) {
        res.send(err).end(); // 数据库连接异常
      } else {
        var current_page = page; // 当前页码，默认为0
        var per_page_total = 30; // 每页显示数量，默认为30
        var all_page_total = Math.ceil(result[0].sum / per_page_total); // 总共有多少页
        var all_total = result[0].sum; // 数据总量
        var prev_page = current_page - 1; // 上一页
        if (current_page <= 0) {
          prev_page = 0;
          current_page = 0;
        }
        var next_page = current_page + 1; // 下一页
        if (next_page >= all_page_total) {
          next_page = all_page_total;
        }

        var pageQuerySql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
        connection.query(pageQuerySql, page, function (err, datas) {
          if (err) {
            res.send(err).end(); // 数据库连接异常
          } else {
            var toFrontData = [{
              all_total: all_total,
              prev_page: prev_page,
              next_page: next_page,
              current_page: current_page,
              all_page_total: all_page_total
            }]
           res.json([datas,toFrontData]);
           connection.release();
          }
        })
      }
    });
  });
});

module.exports = router;