var simpleSql = {
  insert: 'INSERT INTO apps_name (cn_name,en_name,pkg_name,default_icon) VALUES(?,?,?,?)',

  queryAll: 'SELECT * FROM apps_name',

  queryApps: 'SELECT * FROM apps_name WHERE CONCAT(IFNULL(cn_name,""),IFNULL(company,"")) like ?',

  getAppNameById: 'SELECT pkg_name FROM apps_name WHERE app_id = ?',

  setThemeName: 'INSERT INTO theme_name(theme_name) value(?)',

  getThemeIdByName: 'SELECT thmem_id FROM theme_name WHERE theme_name = ?',

  getThemeNameByName: 'SELECT * FROM theme_name WHERE theme_name = ?',

  setAppName: 'INSERT INTO src_info(app_id, theme_id, src_resource) value(?,?,?)',

  countQueryApps: 'SELECT COUNT(*) AS sum FROM apps_name WHERE CONCAT(IFNULL(cn_name,""),IFNULL(company,"")) like ?'

};
/**
 * insert: 后台数据管理界面, 对数据进行插入操作, 目前是手动在数据库添加的
 * queryAll: 查询所有数据, 目前在首页打开时调用, 后期首页打开时改为分页查询接口
 * queryApps: 根据app应用名称及应用开发商查询接口
 * getAppNameById: 根据id查询app的应用包名
 * setThemeName: 设置主题唯一识别码，便于关联主题与图标
 * getThemeIdByName: 根据主题名称查询主题Id
 * getThemeName: 获取当前主题
 * setAppName: 将当前上传图片信息插入数据库
 * countQueryApps: 统计查询结果的总数量，便于分页
 * 
 */
module.exports = simpleSql;