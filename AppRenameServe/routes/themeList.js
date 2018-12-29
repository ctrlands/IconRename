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


/* 获取当前themeLsit GET. */
router.get('/', function (req, res, next) {
  pool.getConnection( (err, connection) => {
    if (err) {
      res.send('连接数据库异常').end();
    } else {
      connection.query(simpleSql.themeList, '', (qryerr, result) => {
        if (qryerr) {
          res.send('sql语法错误' + qryerr).end();
          connection.release();
        } else {
          res.json([result]);
          connection.release();
        }
      });
      
    }
  });
});

module.exports = router;