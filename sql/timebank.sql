/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : timebank

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 01/09/2018 15:09:38 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usr` varchar(20) DEFAULT NULL,
  `psw` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `account`
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES ('1', 'admin', 'admin');
COMMIT;

-- ----------------------------
--  Table structure for `activity`
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `timestamp` bigint(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `activity`
-- ----------------------------
BEGIN;
INSERT INTO `activity` VALUES ('1', '清明郊游骑行活动', '时间：4月5号，地点：烟台市牟平区昆嵛山', '1522893600000');
COMMIT;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `source` varchar(20) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `content` varchar(100) NOT NULL,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `message`
-- ----------------------------
BEGIN;
INSERT INTO `message` VALUES ('1', '技术团队', '1514946901318', '令人期待的1.0版本将在今晚推出!', '1');
COMMIT;

-- ----------------------------
--  Table structure for `plan`
-- ----------------------------
DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `timestamp` bigint(13) NOT NULL,
  `place` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `phone_number` bigint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `plan`
-- ----------------------------
BEGIN;
INSERT INTO `plan` VALUES ('1', '帮忙搬家', '1516242000000', '西门外悦海小区', '6', '18736448888'), ('4', '求帮忙代缴水电表', '1515722400000', '科学院小区', '2', '1834759324'), ('5', '求帮接孩子', '1514972640000', '鲸园小学', '4', '18734838484'), ('6', '5号下午求帮忙接孩子', '1516092600000', '航天幼儿园', '4', '18738472893');
COMMIT;

-- ----------------------------
--  Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL,
  `complete_degree` int(2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` bigint(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `task`
-- ----------------------------
BEGIN;
INSERT INTO `task` VALUES ('1', '5号6号下午求帮忙接孩子', '50', '1', '1514946901318');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `true_name` varchar(10) NOT NULL,
  `credit_value` int(11) NOT NULL,
  `domicile` varchar(100) NOT NULL,
  `phone_number` bigint(11) NOT NULL,
  `id_card` binary(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'coderben', '金奔', '193', '山大学15宿舍楼', '17896739782', 0x6e756c6c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000), ('2', '小明', '王小明', '64', '高区金沙滩小区', '13849234823', 0x6e756c6c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
COMMIT;

-- ----------------------------
--  Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `autograph` varchar(20) NOT NULL,
  `timestamp` bigint(13) NOT NULL,
  `photo_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `userinfo`
-- ----------------------------
BEGIN;
INSERT INTO `userinfo` VALUES ('1', '金奔', '前端工程师', '1511136000000', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
