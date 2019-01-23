/*
 Navicat Premium Data Transfer

 Source Server         : localMySql
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : app_name

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 22/01/2019 17:40:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apps_name
-- ----------------------------
DROP TABLE IF EXISTS `apps_name`;
CREATE TABLE `apps_name`  (
  `app_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cn_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '应用中文名',
  `pkg_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '应用包名',
  `alpha_index` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字母索引',
  `company` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '应用开发商',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '应用类型',
  `src` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '前后端分离时使用',
  `cms_src` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '前后端整合时使用_图标路径',
  PRIMARY KEY (`app_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10196 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apps_name
-- ----------------------------
INSERT INTO `apps_name` VALUES (10000, '哔哩哔哩', 'tv.danmaku.bili', 'b', '哔哩哔哩', NULL, NULL, 'DEFAULTICONOFALL/tv.danmaku.bili.png');
INSERT INTO `apps_name` VALUES (10001, '哔哩哔哩概念', 'com.bilibili.app.blue', 'b', '哔哩哔哩', NULL, NULL, 'DEFAULTICONOFALL/com.bilibili.app.blue.png');
INSERT INTO `apps_name` VALUES (10002, 'bilibili link', 'com.bilibili.bilibililive', 'b', '哔哩哔哩', NULL, NULL, 'DEFAULTICONOFALL/com.bilibili.bilibililive.png');
INSERT INTO `apps_name` VALUES (10003, '哔哩哔哩漫画', 'com.bilibili.comic', 'b', '哔哩哔哩', NULL, NULL, 'DEFAULTICONOFALL/com.bilibili.comic.png');
INSERT INTO `apps_name` VALUES (10004, 'QQ', 'com.tencent.mobileqq', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.mobileqq.png');
INSERT INTO `apps_name` VALUES (10005, '微信读书', 'com.tencent.weread', 'w', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.weread.png');
INSERT INTO `apps_name` VALUES (10006, '腾讯视频', 'com.tencent.qqlive', 't', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qqlive.png');
INSERT INTO `apps_name` VALUES (10007, '微信', 'com.tencent.mm', 'w', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.mm.png');
INSERT INTO `apps_name` VALUES (10008, 'QQ浏览器', 'com.tencent.mtt', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.mtt.png');
INSERT INTO `apps_name` VALUES (10009, 'QQ飞车手游', 'com.tencent.tmgp.speedmobile', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.tmgp.speedmobile.png');
INSERT INTO `apps_name` VALUES (10010, '全民K歌', 'com.tencent.karaoke', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.karaoke.png');
INSERT INTO `apps_name` VALUES (10011, '王者荣耀', 'com.tencent.tmgp.sgame', 'w', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.tmgp.sgame.png');
INSERT INTO `apps_name` VALUES (10012, '网易云音乐', 'com.netease.cloudmusic', 'w', '网易', NULL, NULL, 'DEFAULTICONOFALL/com.netease.cloudmusic.png');
INSERT INTO `apps_name` VALUES (10013, 'QQ音乐', 'com.tencent.qqmusic', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qqmusic.png');
INSERT INTO `apps_name` VALUES (10014, '酷狗音乐', 'com.kugou.android', 'k', '', NULL, NULL, 'DEFAULTICONOFALL/com.kugou.android.png');
INSERT INTO `apps_name` VALUES (10015, '虾米音乐', 'fm.xiami.main', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/fm.xiami.main.png');
INSERT INTO `apps_name` VALUES (10016, '海贝音乐', 'com.hiby.music', 'h', '', '音乐播放器', NULL, 'DEFAULTICONOFALL/com.hiby.music.png');
INSERT INTO `apps_name` VALUES (10017, '多米音乐', 'com.duomi.android', 'd', '', '音乐播放器', NULL, 'DEFAULTICONOFALL/com.duomi.android.png');
INSERT INTO `apps_name` VALUES (10018, '5sing原创音乐', 'com.sing.client', '5', '', '音乐播放器', NULL, 'DEFAULTICONOFALL/com.sing.client.png');
INSERT INTO `apps_name` VALUES (10019, '摩拜单车', 'com.mobike.mobikeapp', 'm', '', NULL, NULL, 'DEFAULTICONOFALL/com.mobike.mobikeapp.png');
INSERT INTO `apps_name` VALUES (10020, '共享单车', 'so.ofo.labofo', 'g', '', NULL, NULL, 'DEFAULTICONOFALL/so.ofo.labofo.png');
INSERT INTO `apps_name` VALUES (10021, '小蓝单车', 'com.beastbike.bluegogo', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.beastbike.bluegogo.png');
INSERT INTO `apps_name` VALUES (10022, '百度地图', 'com.baidu.BaiduMap', 'b', '百度', NULL, NULL, 'DEFAULTICONOFALL/com.baidu.BaiduMap.png');
INSERT INTO `apps_name` VALUES (10023, '高德地图', 'com.autonavi.minimap', 'g', '', NULL, NULL, 'DEFAULTICONOFALL/com.autonavi.minimap.png');
INSERT INTO `apps_name` VALUES (10024, 'Bmap地图', 'me.gfuil.bmap', 'b', '', '地图导航', NULL, 'DEFAULTICONOFALL/me.gfuil.bmap.png');
INSERT INTO `apps_name` VALUES (10025, '迅雷', 'com.xunlei.downloadprovider', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.xunlei.downloadprovider.png');
INSERT INTO `apps_name` VALUES (10026, 'QQ国际版', 'com.tencent.mobileqqi', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.mobileqqi.png');
INSERT INTO `apps_name` VALUES (10027, 'QQ日本版', 'com.tencent.qq.kddi', 'q', '腾讯', '社交', NULL, 'DEFAULTICONOFALL/com.tencent.qq.kddi.png');
INSERT INTO `apps_name` VALUES (10028, 'QQ轻聊版', 'com.tencent.qqlite', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qqlite.png');
INSERT INTO `apps_name` VALUES (10029, '钉钉', 'com.alibaba.android.rimet', 'd', '阿里', '办公', NULL, 'DEFAULTICONOFALL/com.alibaba.android.rimet.png');
INSERT INTO `apps_name` VALUES (10030, '易信', 'im.yixin', 'y', '网易', NULL, NULL, 'DEFAULTICONOFALL/im.yixin.png');
INSERT INTO `apps_name` VALUES (10031, 'Tim', 'com.tencent.tim', 't', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.tim.png');
INSERT INTO `apps_name` VALUES (10032, '讯飞输入法', 'com.iflytek.inputmethod', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.iflytek.inputmethod.png');
INSERT INTO `apps_name` VALUES (10033, 'YY', 'com.duowan.mobile', 'y', '', NULL, NULL, 'DEFAULTICONOFALL/com.duowan.mobile.png');
INSERT INTO `apps_name` VALUES (10034, '斗鱼直播', 'air.tv.douyu.android', 'd', '', '直播', NULL, 'DEFAULTICONOFALL/air.tv.douyu.android.png');
INSERT INTO `apps_name` VALUES (10035, '楚留香网易官方版', 'com.netease.wyclx', 'c', '网易', NULL, NULL, 'DEFAULTICONOFALL/com.netease.wyclx.png');
INSERT INTO `apps_name` VALUES (10036, '网易新闻', 'com.netease.newsreader.activity', 'w', '', NULL, NULL, 'DEFAULTICONOFALL/com.netease.newsreader.activity.png');
INSERT INTO `apps_name` VALUES (10037, '酷安', 'com.coolapk.market', 'k', '', NULL, NULL, 'DEFAULTICONOFALL/com.coolapk.market.png');
INSERT INTO `apps_name` VALUES (10038, 'RE管理器:Root Explorer', 'com.speedsoftware.rootexplorer', 'r', '', NULL, NULL, 'DEFAULTICONOFALL/com.speedsoftware.rootexplorer.png');
INSERT INTO `apps_name` VALUES (10040, 'WiFi万能钥匙', 'com.snda.wifilocating', 'w', '', NULL, NULL, 'DEFAULTICONOFALL/com.snda.wifilocating.png');
INSERT INTO `apps_name` VALUES (10041, '支付宝', 'com.eg.android.AlipayGphone', 'z', '阿里', NULL, NULL, 'DEFAULTICONOFALL/com.eg.android.AlipayGphone.png');
INSERT INTO `apps_name` VALUES (10065, '招商银行', 'cmb.pb', 'z', '招商银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/cmb.pb.png');
INSERT INTO `apps_name` VALUES (10066, '优酷', 'com.youku.phone', 'y', '优酷', '视频播放器', NULL, 'DEFAULTICONOFALL/com.youku.phone.png');
INSERT INTO `apps_name` VALUES (10067, '小米移动', 'com.xiaomi.mimobile', 'x', NULL, NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.mimobile.png');
INSERT INTO `apps_name` VALUES (10069, '小米wifi', 'com.xiaomi.router', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.router.png');
INSERT INTO `apps_name` VALUES (10070, '小米运动', 'com.xiaomi.hm.health', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.hm.health.png');
INSERT INTO `apps_name` VALUES (10071, '小爱音响', 'com.xiaomi.mico', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.mico.png');
INSERT INTO `apps_name` VALUES (10170, '企鹅电竞', 'com.tencent.qgame', 'q', '腾讯', '直播', NULL, 'DEFAULTICONOFALL/com.tencent.qgame');
INSERT INTO `apps_name` VALUES (10172, '虎牙直播', 'com.duowan.kiwi', 'h', '', '直播', NULL, 'DEFAULTICONOFALL/com.duowan.kiwi.png');
INSERT INTO `apps_name` VALUES (10173, '领英', 'com.linkedin.android', 'l', '', '办公', NULL, 'DEFAULTICONOFALL/com.linkedin.android.png');
INSERT INTO `apps_name` VALUES (10174, 'vlc播放器', 'org.videolan.vlc', 'v', '', '视频播放器', NULL, 'DEFAULTICONOFALL/org.videolan.vlc.png');
INSERT INTO `apps_name` VALUES (10176, 'MX播放器', 'com.mxtech.videoplayer.ad', 'm', '', '视频播放器', NULL, 'DEFAULTICONOFALL/com.mxtech.videoplayer.ad.png');
INSERT INTO `apps_name` VALUES (10177, 'AcFun', 'tv.acfundanmaku.video', 'a', '', '影音娱乐', NULL, 'DEFAULTICONOFALL/tv.acfundanmaku.video.png');
INSERT INTO `apps_name` VALUES (10178, '前程无忧', 'com.job.android', 'q', '', '', NULL, 'DEFAULTICONOFALL/com.job.android.png');
INSERT INTO `apps_name` VALUES (10179, '陌陌', 'com.immomo.momo', 'm', '', '聊天社交', NULL, 'DEFAULTICONOFALL/com.immomo.momo.png');
INSERT INTO `apps_name` VALUES (10180, '触手直播', 'com.kascend.chushou', 'c', '', '直播', NULL, 'DEFAULTICONOFALL/com.kascend.chushou.png');
INSERT INTO `apps_name` VALUES (10181, '花椒直播', 'com.huajiao', 'h', '', '直播', NULL, 'DEFAULTICONOFALL/com.huajiao.png');
INSERT INTO `apps_name` VALUES (10182, '腾讯NOW直播', 'com.tencent.now', 't', '腾讯', '直播', NULL, 'DEFAULTICONOFALL/com.tencent.now.png');
INSERT INTO `apps_name` VALUES (10183, '映客直播', 'com.meelive.ingkee', 'y', '', '直播', NULL, 'DEFAULTICONOFALL/com.meelive.ingkee.png');
INSERT INTO `apps_name` VALUES (10184, '战旗直播', 'com.gameabc.zhanqiAndroid', 'z', '', '直播', NULL, 'DEFAULTICONOFALL/com.gameabc.zhanqiAndroid.png');
INSERT INTO `apps_name` VALUES (10185, '酷我音乐', 'cn.kuwo.player', 'k', '', '音乐播放器', NULL, 'DEFAULTICONOFALL/cn.kuwo.player.png');
INSERT INTO `apps_name` VALUES (10186, '千千音乐', 'com.ting.mp3.android', 'q', '', '音乐播放器', NULL, 'DEFAULTICONOFALL/com.ting.mp3.android.png');
INSERT INTO `apps_name` VALUES (10187, 'Soul', 'cn.soulapp.android', 's', '', '社交', NULL, 'DEFAULTICONOFALL/cn.soulapp.android.png');
INSERT INTO `apps_name` VALUES (10188, '下厨房', 'com.xiachufang', 'x', '', '居家生活', NULL, 'DEFAULTICONOFALL/com.xiachufang.png');
INSERT INTO `apps_name` VALUES (10189, '淘票票', 'com.taobao.movie.android', 't', '', '', NULL, 'DEFAULTICONOFALL/com.taobao.movie.android.png');
INSERT INTO `apps_name` VALUES (10190, '58同城', 'com.wuba', '5', '', '', NULL, 'DEFAULTICONOFALL/com.wuba.png');
INSERT INTO `apps_name` VALUES (10191, '超级课程表', 'com.xtuone.android.syllabus', 'c', '', '教育学习', NULL, 'DEFAULTICONOFALL/com.xtuone.android.syllabus.png');
INSERT INTO `apps_name` VALUES (10192, '百词斩', 'com.jiongji.andriod.card', 'b', '', '教育学习', NULL, 'DEFAULTICONOFALL/com.jiongji.andriod.card.png');
INSERT INTO `apps_name` VALUES (10193, '扇贝单词', 'com.shanbay.words', 's', '', '教育学习', NULL, 'DEFAULTICONOFALL/com.shanbay.words.png');
INSERT INTO `apps_name` VALUES (10194, '金山词霸', 'com.kingsoft', 'j', '', '学习教育', NULL, 'DEFAULTICONOFALL/com.kingsoft.png');
INSERT INTO `apps_name` VALUES (10195, 'vae+', 'com.taihe.fans', 'v', '', '', NULL, 'DEFAULTICONOFALL/com.taihe.fans.png');
INSERT INTO `apps_name` VALUES (10196, '腾讯动漫', 'com.qq.ac.android', 't', '腾讯', '图书阅读', NULL, 'DEFAULTICONOFALL/com.qq.ac.android.png');
INSERT INTO `apps_name` VALUES (10197, 'Wps Office', 'cn.wps.moffice_eng', 'w', '', '办公', NULL, 'DEFAULTICONOFALL/cn.wps.moffice_eng.png');
INSERT INTO `apps_name` VALUES (10198, '企业微信', 'com.tencent.wework', 'q', '腾讯', '办公', NULL, 'DEFAULTICONOFALL/com.tencent.wework.png');
INSERT INTO `apps_name` VALUES (10199, 'QQ邮箱', 'com.tencent.androidqqmail', 'q', '腾讯', '办公', NULL, 'DEFAULTICONOFALL/com.tencent.androidqqmail.png');
INSERT INTO `apps_name` VALUES (10200, 'Outlook', 'com.microsoft.office.outlook', 'o', '微软', '办公', NULL, 'DEFAULTICONOFALL/com.microsoft.office.outlook.png');
INSERT INTO `apps_name` VALUES (10201, '名片全能王', 'com.intsig.BizCardReader', 'm', '', '办公', NULL, 'DEFAULTICONOFALL/com.intsig.BizCardReader.png');
INSERT INTO `apps_name` VALUES (10202, '滴答清单', 'cn.ticktick.task', 'd', '', '办公', NULL, 'DEFAULTICONOFALL/cn.ticktick.task.png');
INSERT INTO `apps_name` VALUES (10203, 'TeamViewer', 'com.teamviewer.teamviewer.market.mobile', 't', '', '办公', NULL, 'DEFAULTICONOFALL/com.teamviewer.teamviewer.market.mobile.png');
INSERT INTO `apps_name` VALUES (10204, '快递100', 'com.Kingdee.Express', 'k', '', '居家生活', NULL, 'DEFAULTICONOFALL/com.Kingdee.Express.png');
INSERT INTO `apps_name` VALUES (10205, '腾讯微云', 'com.qq.qcloud', 't', '腾讯', '办公', NULL, 'DEFAULTICONOFALL/com.qq.qcloud.png');
INSERT INTO `apps_name` VALUES (10206, '番茄ToDo', 'com.plan.kot32.tomatotime', 'f', '', '办公', NULL, 'DEFAULTICONOFALL/com.plan.kot32.tomatotime.png');
INSERT INTO `apps_name` VALUES (10207, '有道云笔记', 'com.youdao.note', 'y', '网易', '办公', NULL, 'DEFAULTICONOFALL/com.youdao.note.png');
INSERT INTO `apps_name` VALUES (10208, '车来了', 'com.ygkj.chelaile.standard', 'c', '', '旅行交通', NULL, 'DEFAULTICONOFALL/com.ygkj.chelaile.standard.png');
INSERT INTO `apps_name` VALUES (10209, '滴滴出行', 'com.sdu.didi.psnger', 'd', '北京小桔科技有限公司', '旅行交通', NULL, 'DEFAULTICONOFALL/com.sdu.didi.psnger.png');
INSERT INTO `apps_name` VALUES (10210, '滴滴车主', 'com.sdu.didi.gsui', 'd', '北京小桔科技有限公司', '旅行交通', NULL, 'DEFAULTICONOFALL/com.sdu.didi.gsui.png');
INSERT INTO `apps_name` VALUES (10211, '滴滴司机', 'com.sdu.didi.gui', 'd', '北京小桔科技有限公司', '旅行交通', NULL, 'DEFAULTICONOFALL/com.sdu.didi.gui.png');
INSERT INTO `apps_name` VALUES (10212, '滴滴顺风车', 'com.sdu.didi.beatles', 'd', '北京小桔科技有限公司', '旅行交通', NULL, 'DEFAULTICONOFALL/com.sdu.didi.beatles.png');
INSERT INTO `apps_name` VALUES (10213, '美团外卖', 'com.sankuai.meituan.takeoutnew', 'm', '北京三快在线科技有限公司', '居家生活', NULL, 'DEFAULTICONOFALL/com.sankuai.meituan.takeoutnew.png');
INSERT INTO `apps_name` VALUES (10214, '美团外卖商家版', 'com.sankuai.meituan.meituanwaimaibusiness', 'm', '北京三快在线科技有限公司', '居家生活', NULL, 'DEFAULTICONOFALL/com.sankuai.meituan.meituanwaimaibusiness.png');
INSERT INTO `apps_name` VALUES (10215, '美团骑手', 'com.sankuai.meituan.dispatch.homebrew', 'm', '北京三快在线科技有限公司', '实用工具', NULL, 'DEFAULTICONOFALL/com.sankuai.meituan.dispatch.homebrew.png');
INSERT INTO `apps_name` VALUES (10216, '美团跑腿', 'com.meituan.banma.errand', 'm', '北京三快在线科技有限公司', '居家生活', NULL, 'DEFAULTICONOFALL/com.meituan.banma.errand.png');
INSERT INTO `apps_name` VALUES (10217, '中国建设银行', 'com.chinamworld.main', 'z', '中国建设银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.chinamworld.main.png');
INSERT INTO `apps_name` VALUES (10218, '中国工商银行', 'com.icbc', 'z', '中国工商银行股份有限公司ICBC', '金融理财', NULL, 'DEFAULTICONOFALL/com.icbc.png');
INSERT INTO `apps_name` VALUES (10219, '中国银行', 'com.chinamworld.bocmbci', 'z', '北京联龙博通电子商务技术有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.chinamworld.bocmbci.png');
INSERT INTO `apps_name` VALUES (10220, '邮储银行', 'com.yitong.mbank.psbc', 'y', '中国邮政储蓄银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.yitong.mbank.psbc.png');
INSERT INTO `apps_name` VALUES (10221, '中国农业银行', 'com.android.bankabc', 'z', '中国农业银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.android.bankabc.png');
INSERT INTO `apps_name` VALUES (10222, '交通银行', 'com.bankcomm.Bankcomm', 'j', '交通银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.bankcomm.Bankcomm.png');
INSERT INTO `apps_name` VALUES (10223, '掌上生活', 'com.cmbchina.ccd.pluto.cmbActivity', 'z', '招商银行股份有限公司信用卡中心', '居家生活', NULL, 'DEFAULTICONOFALL/com.cmbchina.ccd.pluto.cmbActivity.png');
INSERT INTO `apps_name` VALUES (10224, '中信银行', 'com.ecitic.bank.mobile', 'z', '中信银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.ecitic.bank.mobile.png');
INSERT INTO `apps_name` VALUES (10225, '民生银行', 'cn.com.cmbc.newmbank', 'm', '中国民生银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/cn.com.cmbc.newmbank.png');
INSERT INTO `apps_name` VALUES (10226, '浦发银行', 'cn.com.spdb.mobilebank.per', 'p', '上海浦东发展银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/cn.com.spdb.mobilebank.per.png');
INSERT INTO `apps_name` VALUES (10227, '网商银行', 'com.mybank.android.phone', 'w', '浙江网商银行股份有限公司', '金融理财', NULL, 'DEFAULTICONOFALL/com.mybank.android.phone.png');

-- ----------------------------
-- Table structure for src_info
-- ----------------------------
DROP TABLE IF EXISTS `src_info`;
CREATE TABLE `src_info`  (
  `src_id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `app_id` int(5) DEFAULT NULL COMMENT '关联每个应用',
  `theme_id` int(5) DEFAULT NULL COMMENT '关联theme_name表',
  `src_resource` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片地址',
  PRIMARY KEY (`src_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for theme_name
-- ----------------------------
DROP TABLE IF EXISTS `theme_name`;
CREATE TABLE `theme_name`  (
  `theme_id` int(5) NOT NULL AUTO_INCREMENT,
  `theme_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`theme_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10058 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of theme_name
-- ----------------------------
INSERT INTO `theme_name` VALUES (10057, 'default');

SET FOREIGN_KEY_CHECKS = 1;
