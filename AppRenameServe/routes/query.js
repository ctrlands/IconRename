let express = require('express');
let router = express.Router();

// 导入MySQL模块
let mysql = require('mysql');
let dbConfig = require('../db/config');
let simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
let pool = mysql.createPool(dbConfig.mysql);


/* 查询 GET. */
router.get('/', function (req, res, next) {

});


/* 查询 POST */
router.post('/', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数

    let theme_name = req.cookies.inUseOfThemeName; // 当前使用主题
    let query_keyword = req.body.query_keyword; // 前台传来的查询关键词
    // 建立连接, 分页查询
    // let countSql = `SELECT COUNT(*) AS sum FROM apps_name WHERE CONCAT(IFNULL(cn_name,""),IFNULL(company,"")) like "%${query_keyword}%"`;
    let current_page = 0; // 当前页码，默认为0
    let per_page_total = 30; // 每页显示数量，默认为30
    let all_page_total = 0; // 总共有多少页
    let all_total = 0; // 查询结果数据总量
    let prev_page = 0; // 上一页
    let next_page = 0; // 下一页

    // 查询符合关键词的应用信息
    connection.query(simpleSql.queryApps, `%${query_keyword}%`, function (err, result) {
      if (err) {
        res.send(err).end(); //mysql内部错误, eg: sql语法错误
      } else {
        // 查询符合条件的数据信息总数--分页使用
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


            let queryAppsIconDoneSql= `SELECT * FROM apps_name AS app, theme_name AS theme, src_info AS src WHERE CONCAT(IFNULL(app.cn_name,""),IFNULL(app.company,"")) like '%${query_keyword}%' AND src.theme_id = theme.theme_id AND src.app_id = app.app_id AND theme.theme_name = '${theme_name}'`;
            // 查询符合条件的图标中已经完成的图标
            connection.query(queryAppsIconDoneSql, '', (errOfIconDone, resultOfIconDone) => {
              if (errOfIconDone) {
                res.send(errOfIconDone).end();
                connection.release();
              } else {
                for (let i =0; i < result.length; i++) { // 符合条件的图标
                  for (let j =0; j < resultOfIconDone.length; j++) { // 符合条件的图标中已制作的图标
                    if (result[i].app_id == resultOfIconDone[j].app_id) {
                      result[i].src = resultOfIconDone[j].src_resource;
                    }
                  }
                }
                let toFrontData = {
                  all_total: all_total,
                  prev_page: prev_page,
                  next_page: next_page,
                  current_page: current_page,
                  all_page_total: all_page_total
                }
                res.json([result, toFrontData]);
                connection.release();
              }
            });

          }
        })

      }
    });
  });
});



module.exports = router;