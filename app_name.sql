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

 Date: 18/01/2019 17:42:48
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
) ENGINE = InnoDB AUTO_INCREMENT = 10144 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `apps_name` VALUES (10010, '全名K歌', 'com.tencent.karaoke', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.karaoke.png');
INSERT INTO `apps_name` VALUES (10011, '王者荣耀', 'com.tencent.tmgp.sgame', 'w', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.tmgp.sgame.png');
INSERT INTO `apps_name` VALUES (10012, '网易云音乐', 'com.netease.cloudmusic', 'w', '网易', NULL, NULL, 'DEFAULTICONOFALL/com.netease.cloudmusic.png');
INSERT INTO `apps_name` VALUES (10013, 'QQ音乐', 'com.tencent.qqmusic', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qqmusic.png');
INSERT INTO `apps_name` VALUES (10014, '酷狗音乐', 'com.kugou.android', 'k', '', NULL, NULL, 'DEFAULTICONOFALL/com.kugou.android.png');
INSERT INTO `apps_name` VALUES (10015, '虾米音乐', 'fm.xiami.main', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/fm.xiami.main.png');
INSERT INTO `apps_name` VALUES (10016, '海贝音乐', 'com.hiby.music', 'h', '', NULL, NULL, 'DEFAULTICONOFALL/com.hiby.music.png');
INSERT INTO `apps_name` VALUES (10017, '多米音乐', 'com.duomi.android', 'd', '', NULL, NULL, 'DEFAULTICONOFALL/com.duomi.android.png');
INSERT INTO `apps_name` VALUES (10018, '5sing原创音乐', 'com.sing.client', '5', '', NULL, NULL, 'DEFAULTICONOFALL/com.sing.client.png');
INSERT INTO `apps_name` VALUES (10019, '摩拜单车', 'com.mobike.mobikeapp', 'm', '', NULL, NULL, 'DEFAULTICONOFALL/com.mobike.mobikeapp.png');
INSERT INTO `apps_name` VALUES (10020, '共享单车', 'so.ofo.labofo', 'g', '', NULL, NULL, 'DEFAULTICONOFALL/so.ofo.labofo.png');
INSERT INTO `apps_name` VALUES (10021, '小蓝单车', 'com.beastbike.bluegogo', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.beastbike.bluegogo.png');
INSERT INTO `apps_name` VALUES (10022, '百度地图', 'com.baidu.BaiduMap', 'b', '百度', NULL, NULL, 'DEFAULTICONOFALL/com.baidu.BaiduMap.png');
INSERT INTO `apps_name` VALUES (10023, '高德地图', 'com.autonavi.minimap', 'g', '', NULL, NULL, 'DEFAULTICONOFALL/com.autonavi.minimap.png');
INSERT INTO `apps_name` VALUES (10024, 'Bmap地图', 'me.gfuil.bmap', 'b', '', NULL, NULL, 'DEFAULTICONOFALL/me.gfuil.bmap.png');
INSERT INTO `apps_name` VALUES (10025, '迅雷', 'com.xunlei.downloadprovider', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.xunlei.downloadprovider.png');
INSERT INTO `apps_name` VALUES (10026, 'QQ国际版', 'com.tencent.mobileqqi', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.mobileqqi.png');
INSERT INTO `apps_name` VALUES (10027, 'QQ日本版', 'com.tencent.qq.kddi', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qq.kddi.png');
INSERT INTO `apps_name` VALUES (10028, 'QQ轻聊版', 'com.tencent.qqlite', 'q', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.qqlite.png');
INSERT INTO `apps_name` VALUES (10029, '钉钉', 'com.alibaba.android.rimet', 'd', '阿里', NULL, NULL, 'DEFAULTICONOFALL/com.alibaba.android.rimet.png');
INSERT INTO `apps_name` VALUES (10030, '易信', 'im.yixin', 'y', '网易', NULL, NULL, 'DEFAULTICONOFALL/im.yixin.png');
INSERT INTO `apps_name` VALUES (10031, 'Tim', 'com.tencent.tim', 't', '腾讯', NULL, NULL, 'DEFAULTICONOFALL/com.tencent.tim.png');
INSERT INTO `apps_name` VALUES (10032, '讯飞输入法', 'com.iflytek.inputmethod', 'x', '', NULL, NULL, 'DEFAULTICONOFALL/com.iflytek.inputmethod.png');
INSERT INTO `apps_name` VALUES (10033, 'YY', 'com.duowan.mobile', 'y', '', NULL, NULL, 'DEFAULTICONOFALL/com.duowan.mobile.png');
INSERT INTO `apps_name` VALUES (10034, '斗鱼直播', 'air.tv.douyu.android', 'd', '', NULL, NULL, 'DEFAULTICONOFALL/air.tv.douyu.android.png');
INSERT INTO `apps_name` VALUES (10035, '楚留香网易官方版', 'com.netease.wyclx', 'c', '网易', NULL, NULL, 'DEFAULTICONOFALL/com.netease.wyclx.png');
INSERT INTO `apps_name` VALUES (10036, '网易新闻', 'com.netease.newsreader.activity', 'w', '', NULL, NULL, 'DEFAULTICONOFALL/com.netease.newsreader.activity.png');
INSERT INTO `apps_name` VALUES (10037, '酷安', 'com.coolapk.market', 'k', '', NULL, NULL, 'DEFAULTICONOFALL/com.coolapk.market.png');
INSERT INTO `apps_name` VALUES (10038, 'RE管理器:Root Explorer', 'com.speedsoftware.rootexplorer', 'r', '', NULL, NULL, 'DEFAULTICONOFALL/com.speedsoftware.rootexplorer.png');
INSERT INTO `apps_name` VALUES (10040, 'WiFi万能钥匙', 'com.snda.wifilocating', 'w', '', NULL, NULL, 'DEFAULTICONOFALL/com.snda.wifilocating.png');
INSERT INTO `apps_name` VALUES (10041, '支付宝', 'com.eg.android.AlipayGphone', 'z', '阿里', NULL, NULL, 'DEFAULTICONOFALL/com.eg.android.AlipayGphone.png');
INSERT INTO `apps_name` VALUES (10065, '招商银行', 'cmb.pb', 'z', NULL, NULL, NULL, 'DEFAULTICONOFALL/cmb.pb.png');
INSERT INTO `apps_name` VALUES (10066, '优酷', 'com.youku.phone', 'y', NULL, NULL, NULL, 'DEFAULTICONOFALL/com.youku.phone.png');
INSERT INTO `apps_name` VALUES (10067, '小米移动', 'com.xiaomi.mimobile', 'x', NULL, NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.mimobile.png');
INSERT INTO `apps_name` VALUES (10068, 'vlc播放器', 'org.videolan.vlc', 'v', NULL, NULL, NULL, 'DEFAULTICONOFALL/org.videolan.vlc.png');
INSERT INTO `apps_name` VALUES (10069, '小米wifi', 'com.xiaomi.router', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.router.png');
INSERT INTO `apps_name` VALUES (10070, '小米运动', 'com.xiaomi.hm.health', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.hm.health.png');
INSERT INTO `apps_name` VALUES (10071, '小爱音响', 'com.xiaomi.mico', 'x', '小米', NULL, NULL, 'DEFAULTICONOFALL/com.xiaomi.mico.png');
INSERT INTO `apps_name` VALUES (10170, '企鹅电竞', 'com.tencent.qgame', 'q', '腾讯', '直播', NULL, 'DEFAULTICONOFALL/com.tencent.qgame');
INSERT INTO `apps_name` VALUES (10172, '虎牙直播', 'com.duowan.kiwi', 'h', '', '直播', NULL, 'DEFAULTICONOFALL/com.duowan.kiwi.png');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10057 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
