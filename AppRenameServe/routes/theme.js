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

  
  var resultJson;
  pool.getConnection((err, connection) => {
    if (err) {
      res.send('数据库连接错误！' + err).end();
      connection.release();
    } else {
      var theme = req.query.theme;
      connection.query(simpleSql.getAppsByThemeName, theme, (qryerr, result) => {
        if (qryerr) {
          res.send('sql语法错误！' + qryerr).end();
          connection.release();
        } else {
          connection.query(simpleSql.queryAll, '', (qry1err, allresult) => {
            for (let i = 0; i < allresult.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (result[j].app_id == allresult[i].app_id) {
                  allresult[i].src = result[j].src_resource;
                }
              }
            }
            res.json([allresult]);
            console.log(allresult);

          })

          // res.json([result]).end();
          connection.release();
        }
      })
    }
  })

});


/* 设置theme名字 POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    if (err) {
      res.send('数据库连接错误' + err);
      connection.release();
    } else {

      // 获取前台页面传过来的参数
      var theme_name = req.body.theme_name;
      var msg = {
        code: '',
        msg: ''
      };
      // 判断主题名是否重复
      connection.query(simpleSql.isDuplicateThemeName, theme_name, (qryerr, result) => {
        if (qryerr) {
          res.send('sql语法错误' + qryerr).end(); // 数据库连接异常
          connection.release();
        } else {
          if (result.length >= 1) {
            msg.code = '-200';
            msg.msg = '该主题已存在, 请重命名或选择打开该主题';
            res.json([msg]).end();
            connection.release();
          } else {
            // 建立连接, 分页查询
            connection.query(simpleSql.setThemeName, theme_name, function (qryerr1, addresult) {
              if (qryerr1) {
                res.send('sql语法错误' + qryerr1).end(); // 数据库连接异常
                connection.release();
              } else {
                /* var toFrontData = [{
                  all_total: all_total,
                  prev_page: prev_page,
                  next_page: next_page,
                  current_page: current_page,
                  all_page_total: all_page_total
                }] */
                msg.code = '200';
                msg.msg = '创建新主题成功！';
                req.session['themeName'] = theme_name;
                // console.log(req.session);
                res.json([msg]).end();
                connection.release();
              }
            });
          }
        }
      })
    }
  });
});



module.exports = router;