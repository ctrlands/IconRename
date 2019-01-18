let express = require('express');
let router = express.Router();

// 导入MySQL模块
let mysql = require('mysql');
let dbConfig = require('../db/config');
let simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
let pool = mysql.createPool(dbConfig.mysql);


/* 获取当前theme GET. */
router.get('/', function (req, res, next) {
  let theme = req.query.theme;
  // 获取前台页面传过来的参数
  let page = req.query.page ? req.query.page : 0;
  let pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';

  let isThemeSql = `SELECT COUNT(*) AS sumOfTheme FROM theme_name WHERE theme_name = '${theme}'`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.send('数据库连接错误！' + err).end();
      connection.release();
    } else {

      connection.query(isThemeSql, '', (err, result) => {
        if (result[0].sumOfTheme < 1) {
          let allresult = [{}];
          let tname = {};
          let toFrontData = [{
            all_total: 0,
            prev_page: 0,
            next_page: 0,
            current_page: 0,
            all_page_total: 0
          }]
          res.json([allresult, tname, toFrontData]).end();
          connection.release();
        } else {
          connection.query(pageTotalSql, '', (err, result) => {
            if (err) {
              res.send(err).end(); // 数据库内部错误, eg： sql语法错误
            } else {
              res.cookie('inUseOfThemeName', theme, {
                maxAge: 20 * 1000 * 60
              });
              let current_page = page; // 当前页码，默认为0
              let per_page_total = 30; // 每页显示数量，默认为30
              let all_page_total = Math.ceil(result[0].sum / per_page_total); // 总共有多少页
              let all_total = result[0].sum; // 数据总量
              let prev_page = current_page - 1; // 上一页
              if (current_page <= 0) {
                prev_page = 0;
                current_page = 0;
              }
              let next_page = current_page + 1; // 下一页
              if (next_page >= all_page_total) {
                next_page = all_page_total;
              }
              let pageQuerySql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
              let off = per_page_total * current_page;
              let theme_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme}' LIMIT ${per_page_total} OFFSET ${off}`;
              // 查询已完成图标
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
                    let tname = {
                      theme_name: theme
                    };
                    let toFrontData = [{
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













      /* connection.query(pageTotalSql, '', (err, result) => {
        if (err) {
          res.send(err).end(); // 数据库内部错误, eg： sql语法错误
        } else {
          let current_page = page; // 当前页码，默认为0
          let per_page_total = 30; // 每页显示数量，默认为30
          let all_page_total = Math.ceil(result[0].sum / per_page_total); // 总共有多少页
          let all_total = result[0].sum; // 数据总量
          let prev_page = current_page - 1; // 上一页
          if (current_page <= 0) {
            prev_page = 0;
            current_page = 0;
          }
          let next_page = current_page + 1; // 下一页
          if (next_page >= all_page_total) {
            next_page = all_page_total;
          }
          let pageQuerySql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
          let off = per_page_total * current_page;
          let theme_sql = `SELECT theme.theme_name, app.app_id, app.pkg_name, app.cn_name, src.src_resource FROM apps_name AS app, theme_name AS theme, src_info AS src where src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme}' LIMIT ${per_page_total} OFFSET ${off}`;
          // 查询已完成图标
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
                let tname = {
                  theme_name: theme
                };
                let toFrontData = [{
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
      }) */


    }
  })



});


/* 设置theme名字 POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    if (err) {
      res.send('数据库连接错误' + err).end();
      connection.release();
    } else {

      // 获取前台页面传过来的参数
      let theme_name = req.body.theme_name;
      let msg = {
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

                // 获取前台页面传过来的参数
                let page = 0;
                // 建立连接, 分页查询
                let pageTotalSql = 'SELECT COUNT(*) AS sum FROM apps_name';
                connection.query(pageTotalSql, '', function (err, result) {
                  if (err) {
                    res.send(err).end(); // 数据库连接异常
                  } else {
                    let current_page = page; // 当前页码，默认为0
                    let per_page_total = 30; // 每页显示数量，默认为30
                    let all_page_total = Math.ceil(result[0].sum / per_page_total); // 总共有多少页
                    let all_total = result[0].sum; // 数据总量
                    let prev_page = current_page - 1; // 上一页
                    if (current_page <= 0) {
                      prev_page = 0;
                      current_page = 0;
                    }
                    let next_page = current_page + 1; // 下一页
                    if (next_page >= all_page_total) {
                      next_page = all_page_total;
                    }

                    let pageQuerySql = 'SELECT * FROM apps_name LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
                    connection.query(pageQuerySql, page, function (err, datas) {
                      if (err) {
                        res.send(err).end(); // 数据库连接异常
                      } else {
                        // req.cookies.inUseOfThemeName = theme_name;

                        res.cookie('inUseOfThemeName', theme_name, {
                          maxAge: 20 * 1000 * 60
                        });
                        msg.code = '200';
                        msg.msg = '创建新主题成功！';
                        let toFrontData = {
                          all_total: all_total,
                          prev_page: prev_page,
                          next_page: next_page,
                          current_page: current_page,
                          all_page_total: all_page_total
                        }
                        let t_name = {
                          theme_name: theme_name
                        }
                        res.json([msg, datas, toFrontData, t_name]).end();
                        connection.release();
                      }
                    })
                  }
                });


                // req.session['themeName'] = theme_name;

                // res.json([msg]).end();
                // connection.release();
              }
            });
          }
        }
      })
    }
  });
});



module.exports = router;