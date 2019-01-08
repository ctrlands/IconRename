let express = require('express');
let router = express.Router();

// 导入MySQL模块
let mysql = require('mysql');
let dbConfig = require('../db/config');
let simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
let pool = mysql.createPool(dbConfig.mysql);

router.post('/', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send('数据库连接失败！' + err).end();
      connection.release();
    } else {
      /* 分页查询 */
      var pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
      connection.query(pageTotalSql, '', function (err, result) {
        if (err) {
          res.send(err).end(); // mysql内部错误，eg: sql语法错误
          connection.release();
        } else {
          var current_page = req.body.page ? req.body.page : 0; // 当前页码，默认为1
          var per_page_total = 15; // 每页显示数量，默认为30
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
              var pageInfo = {
                all_total: all_total,
                prev_page: prev_page,
                next_page: next_page,
                current_page: current_page,
                all_page_total: all_page_total
              }
              res.json([datas, pageInfo]).end();
              connection.release();
            }
          });

        }
      });
     

    }

  });

});

router.get('/', (req, res, next) => {


});

module.exports = router;