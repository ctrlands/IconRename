var express = require('express');
var router = express.Router();

// 导入文件上传模块
var fs = require('fs');
var multer = require('multer');

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/config');
var simpleSql = require('../db/simpleSql');
// 创建一个msql连接池
var pool = mysql.createPool(dbConfig.mysql);

var thmemName = 'default';
var uploadFolder = 'D:/upload';

/**
 * 根据app_id获取app信息
 * @param {*} id : app_id
 * @param {*} _callback : 回调函数
 */
function getAppNameById(id, _callback) {
  if (id == '' || id == 'null') {
    _callback('id null');
  } else {
    pool.getConnection(function (err, connection) {
      connection.query(simpleSql.getAppNameById, id, function (err, result) {
        if (err) {
          return err;
        } else {
          _callback(result[0].pkg_name);
          connection.release(); // 释放连接池
          // pool.end(); // 关闭数据库连接
        }
      })
    })
  }
}

// 创建文件夹
var createFolder = function (folder) {
  try {
    // 测试path指定的文件或目录的用户权限，我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误'no such file or directory'
    fs.accessSync(folder);
  } catch (e) {
    // 文件夹不存在，以同步的方式创建目录
    fs.mkdirSync(folder);
  }
}

function getThemeByName(themeName, _callback) {
  if (themeName == '' || themeName == 'null') {
    _callback('themeName null');
  } else {
    pool.getConnection(function (err, connection) {
      connection.query(simpleSql.getThemeNameByName, themeName, function (err, result) {
        if (err) {
          return err;
        } else {
          uploadFolder = 'D:/upload/' + result[0].theme_name;
          createFolder(uploadFolder);
          _callback(result[0].theme_name);
          connection.release(); // 释放连接池
        }
      })
    })
  }
}

/* 使用硬盘存储模式设置存放接收到的文件的路径及文件名 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接受到文件后输出的保存路径(若不存在则需要创建)
    if (req.body.theme_name != '' && req.body.theme_name) {
      getThemeByName(req.body.theme_name, function (result) {
        cb(null, uploadFolder);
      })
    } else {
      createFolder(uploadFolder);
      uploadFolder = 'D:/upload/default'
      createFolder(uploadFolder);
      cb(null, uploadFolder);
    }
  },
  filename: function (req, file, cb) {
    if (req.body.nowid != '' && req.body.nowid) {
      getAppNameById(req.body.nowid, function (result) {
        cb(null, result + '.png');
      })
    }
  }
})


// 创建multer对象
var upload = multer({
  storage: storage
});

/* post upload listing. */
router.post('/', upload.single('uploadedfile'), function (req, res, next) {
  var file = req.file;
  // 接收文件成功后返回数据给前端
  // console.log(file.filename);
  var themeName = req.body.themeName;
  var id = req.body.nowid;
  // var srcResource = '/default/' + themeName + '/' + file.filename;
  var srcResource = '/default/default/' + file.filename;
  console.log(themeName,id);


  pool.getConnection(function (err, connection) {
    if (err) {
      res.send(err).end();
    } else {
      var it = `INSERT INTO src_info(app_id, theme_id, src_resource) value('${id}', '${themeName}', '${srcResource}')`;
      connection.query(it, '', function (err, result) {
        if (err) {
          return err;
        } else {
          res.json({
            res_name: file.filename,
            res_src: srcResource
          });
          connection.release(); // 释放连接池
        }
      })
    }
  });


  // res.json({
  //   res_name: file.filename
  // });
});


module.exports = router;