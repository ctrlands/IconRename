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
  if (req.cookies.themeName) {
    // 获取前台页面传过来的参数
    var page = req.body.page ? req.body.page : 0;
    var pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
    pool.getConnection((err, connection) => {
      if (err) {
        res.send('数据库连接错误！' + err).end();
        connection.release();
      } else {
        connection.query(pageTotalSql, '', (err, result) => {
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

            var theme = req.query.theme;
            var off = per_page_total * current_page;
            var theme_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme}' LIMIT ${per_page_total} OFFSET ${off}`;

            // 查询已完成图标
            var theme = req.query.theme;
            // console.log(req.cookies.themeName);
            connection.query(theme_sql, {
              theme,
              page
            }, (qryerr, result) => {
              if (qryerr) {
                res.send('sql语法错误！' + qryerr).end();
                connection.release();
              } else {
                connection.query(pageQuerySql, page, (qry1err, allresult) => {
                  for (let i = 0; i < allresult.length; i++) {
                    for (let j = 0; j < result.length; j++) {
                      if (result[j].app_id == allresult[i].app_id) {
                        allresult[i].src = result[j].src_resource;
                      }
                    }
                  }
                  var tname = {
                    theme_name: theme
                  };
                  var toFrontData = [{
                    all_total: all_total,
                    prev_page: prev_page,
                    next_page: next_page,
                    current_page: current_page,
                    all_page_total: all_page_total
                  }]
                  res.json([allresult, tname, toFrontData]);
                })
                connection.release();
              }
            })
          }
        })
      }
    })

  } else {
    var theme = req.query.theme;
    res.cookie('inUseOfThemeName', theme, {
      maxAge: 20 * 1000 * 60
    });
    // 获取前台页面传过来的参数
    var page = req.body.page ? req.body.page : 0;
    var pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
    pool.getConnection((err, connection) => {
      if (err) {
        res.send('数据库连接错误！' + err).end();
        connection.release();
      } else {
        connection.query(pageTotalSql, '', (err, result) => {
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

            // var theme = req.query.theme;
            var off = per_page_total * current_page;
            var theme_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme}' LIMIT ${per_page_total} OFFSET ${off}`;

            // 查询已完成图标
            var theme = req.query.theme;
            // console.log(req.cookies.themeName);
            connection.query(theme_sql, {
              theme,
              page
            }, (qryerr, result) => {
              if (qryerr) {
                res.send('sql语法错误！' + qryerr).end();
                connection.release();
              } else {
                connection.query(pageQuerySql, page, (qry1err, allresult) => {
                  for (let i = 0; i < allresult.length; i++) {
                    for (let j = 0; j < result.length; j++) {
                      if (result[j].app_id == allresult[i].app_id) {
                        allresult[i].src = result[j].src_resource;
                      }
                    }
                  }
                  var tname = {
                    theme_name: theme
                  };
                  var toFrontData = [{
                    all_total: all_total,
                    prev_page: prev_page,
                    next_page: next_page,
                    current_page: current_page,
                    all_page_total: all_page_total
                  }]
                  res.json([allresult, tname, toFrontData]);
                })
                connection.release();
              }
            })
          }
        })
      }
    })

  }




  // if (req.cookies.themeName) {
  //   pool.getConnection((err, connection) => {
  //     if (err) {
  //       res.send('数据库连接错误！' + err).end();
  //       connection.release();
  //     } else {
  //       var theme = req.query.theme;
  //       console.log(req.cookies.themeName);
  //       connection.query(simpleSql.getAppsByThemeName, theme, (qryerr, result) => {
  //         if (qryerr) {
  //           res.send('sql语法错误！' + qryerr).end();
  //           connection.release();
  //         } else {
  //           connection.query(simpleSql.queryAll, '', (qry1err, allresult) => {
  //             for (let i = 0; i < allresult.length; i++) {
  //               for (let j = 0; j < result.length; j++) {
  //                 if (result[j].app_id == allresult[i].app_id) {
  //                   allresult[i].src = result[j].src_resource;
  //                 }
  //               }
  //             }
  //             var tname = {
  //               theme_name: theme
  //             }
  //             res.json([allresult, tname]);
  //           })
  //           connection.release();
  //         }
  //       })
  //     }
  //   })

  // } else {
  //   pool.getConnection((err, connection) => {
  //     if (err) {
  //       res.send('数据库连接错误！' + err).end();
  //       connection.release();
  //     } else {
  //       var theme = req.query.theme;
  //       res.cookie('inUseOfThemeName', theme, {
  //         maxAge: 20 * 1000 * 60
  //       });
  //       connection.query(simpleSql.getAppsByThemeName, theme, (qryerr, result) => {
  //         if (qryerr) {
  //           res.send('sql语法错误！' + qryerr).end();
  //           connection.release();
  //         } else {
  //           connection.query(simpleSql.queryAll, '', (qry1err, allresult) => {
  //             for (let i = 0; i < allresult.length; i++) {
  //               for (let j = 0; j < result.length; j++) {
  //                 if (result[j].app_id == allresult[i].app_id) {
  //                   allresult[i].src = result[j].src_resource;
  //                 }
  //               }
  //             }
  //             var tname = {
  //               theme_name: theme
  //             }
  //             res.json([allresult, tname]);
  //           })
  //           connection.release();
  //         }
  //       })
  //     }
  //   })
  // }
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