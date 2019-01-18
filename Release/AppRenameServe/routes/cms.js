let express = require('express');
let router = express.Router();

// 导入文件上传模块
let fs = require('fs');
let multer = require('multer');

// 导入MySQL模块
let mysql = require('mysql');
let dbConfig = require('../db/config');

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

          var pageQuerySql = 'SELECT * FROM apps_name ORDER BY company DESC' + ' LIMIT ' + per_page_total + ' OFFSET ' + per_page_total * current_page;
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
  res.render('index',{});
});


// 创建文件夹
let createFolder = function (folder) {
  try {
    // 测试path指定的文件或目录的用户权限，我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误'no such file or directory'
    fs.accessSync(folder);
  } catch (e) {
    // 文件夹不存在，以同步的方式创建目录
    fs.mkdirSync(folder);
  }
}

// 使用硬盘存储模式设置存放接收到的文件的路径及文件名
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接受到文件后输出的保存路径(若不存在则需要创建)
    let uploadFolder = 'D:/upload/DEFAULTICONOFALL';
    createFolder(uploadFolder);
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    if (req.body.pkgName != '' && req.body.pkgName) {
      cb(null, req.body.pkgName + '.png');
    } else {
      cb(null, 'default-' + '.png');
    }
  }
})


// 创建multer对象
let upload = multer({
  storage: storage
});




// 编辑-数据保存
router.post('/edit', upload.single('uploadedfile'), (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err).end();
      connection.release();
    } else {
      let msg = {
        code: '',
        msg: ''
      };
      let cn_name = req.body.app_name;
      let pkg_name = req.body.pkg_name;
      let company = req.body.company;
      let app_id = req.body.app_id;
      let editSql = `UPDATE apps_name SET cn_name='${cn_name}', pkg_name='${pkg_name}', company='${company}' WHERE app_id = '${app_id}'`;
      connection.query(editSql, '', (errOfEdit, resultOfEdit) => {
        if (errOfEdit) {
          res.send(errOfEdit).end();
          connection.release();
        } else {
          msg.code = '200';
          msg.msg = '修改成功！';
          res.json([msg]).end();
          connection.release();
        }
      })
    }
  });
});

// 编辑-根据appId获取应用信息
router.post('/editOfGetInfo', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err).end();
      connection.release();
    } else {
      let app_id = req.body.app_id;
      let editOfGetSql = `SELECT * FROM apps_name WHERE app_id = '${app_id}'`;
      connection.query(editOfGetSql, '', (errOfGetSql, resultOfGetSql) => {
        if (errOfGetSql) {
          res.send(errOfEdit).end();
          connection.release();
        } else {
          res.json(resultOfGetSql).end();
          connection.release();
        }
      })
    }
  });
});

// 添加

router.post('/add', upload.single('uploadedfile'), (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err).end();
      connection.release();
    } else {
      let msg = {
        code: '',
        msg: ''
      }
      let app_name = req.body.app_name;
        let pkg_name = req.body.pkg_name;
        let company = req.body.company;
        let alpha_index = req.body.alphaIndex;
        let category = req.body.category;
        let isAppSql = `SELECT COUNT(pkg_name) AS sumOfApp FROM apps_name  WHERE pkg_name = '${pkg_name}'`;
        let cmsSrc = 'DEFAULTICONOFALL/' + req.body.pkg_name + '.png';
        let addSql = `INSERT INTO apps_name (cn_name, pkg_name, company, alpha_index, category, cms_src) VALUES ('${app_name}', '${pkg_name}', '${company}', '${alpha_index}', '${category}', '${cmsSrc}')`;

        
        connection.query(isAppSql, '', (errOfIsAppSql, resultOfIsAppSql) => {
          if (resultOfIsAppSql[0].sumOfApp >= 1) {
            msg.code = '-200';
            msg.msg = req.body.pkg_name + '该应用信息已存在！';
            res.json([msg]).end();
            connection.release();
          } else {
            connection.query(addSql, '', (errOfAddSql, resultOfAddSql) => {
              if (errOfAddSql) {
                res.send(errOfAddSql).end();
                connection.release();
              } else {
                msg.code = '200';
                msg.msg = '新建成功！';
                res.json([msg]).end();
                connection.release();
              }
            })
          }
        })

    }
  });
});

module.exports = router;