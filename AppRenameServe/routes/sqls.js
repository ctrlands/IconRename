let express = require('express');
let router = express.Router();

// 导入MySQL模块
let mysql = require('mysql');
let dbConfig = require('../db/config');
let simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
let pool = mysql.createPool(dbConfig.mysql);
//响应一个JSON数据
let responseJSON = function (res, ret) {
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
  console.log(req.cookies.themeName);
  if (req.cookies.themeName) {
    console.log(req.cookies.themeName);
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
              var tname = {
                theme_name: req.cookies.themeName
              };
              var toFrontData = [{
                all_total: all_total,
                prev_page: prev_page,
                next_page: next_page,
                current_page: current_page,
                all_page_total: all_page_total
              }]
              res.json([datas, tname, toFrontData]);
              connection.release();
            }
          });

        }
      });
    });

  }






});

/* 分页 POST */
router.post('/', (req, res, next) => {

  // 存在cookie时
  if (req.cookies.inUseOfThemeName) {
    let page = req.body.page ? req.body.page : 0; // 获取前台页面传过来的参数, page: 当前页码
    let pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name'; // 查询所有应用总数
    pool.getConnection((errOfConn, connection) => {
      if (errOfConn) {
        res.send('数据库连接错误！' + err).end();
        connection.release();
      } else {
        connection.query(pageTotalSql, '', (errOfCountSql, resultOfCount) => {
          if (errOfCountSql) {
            res.send('sql语法错误！' + errOfCountSql).end(); // 查询数据sql语句语法错误
          } else {
            let current_page = page; // 当前页码，默认为0
            let per_page_total = 30; // 每页显示数量，默认为30
            let all_page_total = Math.ceil(resultOfCount[0].sum / per_page_total); // 总共有多少页
            let all_total = resultOfCount[0].sum; // 数据总量
            let prev_page = current_page - 1; // 上一页
            let next_page = current_page + 1; // 下一页

            let theme_name = req.cookies.inUseOfThemeName; // 当前主题名称, 从cookie中获取
            let offset_num = per_page_total * current_page; // 数据偏移量

            if (current_page <= 0) {
              prev_page = 0;
              current_page = 0;
            }

            if (next_page >= all_page_total) {
              next_page = all_page_total;
            }

            let appInfoSql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page; // 每次查询30条应用数据信息

            let theme_IconDone_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme_name}' LIMIT ${per_page_total} OFFSET ${offset_num}`;

            // 查询已完成图标
            connection.query(theme_IconDone_sql, '', (errOfApp, resultOfApp) => {
              if (errOfApp) {
                res.send('sql语法错误！' + errOfApp).end();
                connection.release();
              } else {
                connection.query(appInfoSql, page, (errOfTheme, resultOfTheme) => {
                  if (errOfTheme) {
                    res.send('sql语法错误！' + errOfTheme).end();
                    connection.release();
                  } else {
                    for (let i = 0; i < resultOfTheme.length; i++) {
                      for (let j = 0; j < resultOfApp.length; j++) {
                        if (resultOfApp[j].app_id == resultOfTheme[i].app_id) {
                          resultOfTheme[i].src = resultOfApp[j].src_resource;
                        }
                      }
                    }
                    let themeNameInfo = {
                      theme_name: req.cookies.inUseOfThemeName
                    };
                    let pageInfo = {
                      all_total: all_total,
                      prev_page: prev_page,
                      next_page: next_page,
                      current_page: current_page,
                      all_page_total: all_page_total
                    };
                    res.json([resultOfTheme, themeNameInfo, pageInfo]);
                    connection.release();
                  }
                })
              }
            })
          }
        })
      }
    })

  } else {
    // 获取前台页面传过来的参数
    var page = req.body.page;
    var theme = req.body.theme;
    // 建立连接, 分页查询
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

            var off = per_page_total * current_page;
            var theme_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme}' LIMIT ${per_page_total} OFFSET ${off}`;

            // 查询已完成图标
            connection.query(theme_sql, '', (qryerr, result) => {
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












  /* // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var page = req.body.page;
    var theme = req.bodt.theme;
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
  }); */




});

module.exports = router;