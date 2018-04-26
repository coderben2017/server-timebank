/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : timebank

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-04-22 10:55:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usr` varchar(20) DEFAULT NULL,
  `psw` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', 'admin', 'admin');
INSERT INTO `account` VALUES ('2', 'aaaaaa', 'aaaaaa');
INSERT INTO `account` VALUES ('3', 'bbbbbb', 'bbbbbb');
INSERT INTO `account` VALUES ('4', 'cccccc', 'cccccc');
INSERT INTO `account` VALUES ('5', 'jjjjjj', 'jjjjjj');
INSERT INTO `account` VALUES ('6', 'ssssss', 'ssssss');
INSERT INTO `account` VALUES ('7', 'tttttt', 'tttttt');

-- ----------------------------
-- Table structure for `activity`
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
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '清明郊游骑行活动', '时间：4月5号，地点：烟台市牟平区昆嵛山', '1522893600000');

-- ----------------------------
-- Table structure for `complaints`
-- ----------------------------
DROP TABLE IF EXISTS `complaints`;
CREATE TABLE `complaints` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `phone_number` bigint(11) DEFAULT NULL,
  `content` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of complaints
-- ----------------------------
INSERT INTO `complaints` VALUES ('3', '17862707398', '21');
INSERT INTO `complaints` VALUES ('4', null, '112');
INSERT INTO `complaints` VALUES ('5', null, '222');

-- ----------------------------
-- Table structure for `message`
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
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', '技术团队', '1514946901318', '令人期待的1.0版本将在今晚推出!', '1');

-- ----------------------------
-- Table structure for `plan`
-- ----------------------------
DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `timestamp` bigint(13) NOT NULL,
  `place` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `phone_number` bigint(11) NOT NULL,
  `receive_person_id` int(10) DEFAULT NULL,
  `is_received` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of plan
-- ----------------------------
INSERT INTO `plan` VALUES ('29', '取快递', '1524107460000', '学15', '2', '17826384738', '3', '1');
INSERT INTO `plan` VALUES ('30', '发快递', '1524201180000', '学14', '3', '17839493940', '4', '1');
INSERT INTO `plan` VALUES ('31', '发快递', '1524291240000', '学14', '4', '17847384912', '5', '1');
INSERT INTO `plan` VALUES ('32', '打热水', '1524381300000', '学15', '5', '18473843838', '6', '1');
INSERT INTO `plan` VALUES ('33', '带饭', '1524471360000', '学14', '6', '18344328384', '6', '1');
INSERT INTO `plan` VALUES ('34', '取快递', '1524561420000', '学15', '7', '18344328384', '7', '1');
INSERT INTO `plan` VALUES ('35', '发快递', '1524651480000', '学15', '8', '18349538471', '1', '1');
INSERT INTO `plan` VALUES ('36', '带饭', '1524330060000', '学15', '11', '17862701111', null, '0');

-- ----------------------------
-- Table structure for `task`
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
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('1', '5号6号下午求帮忙接孩子', '50', '1', '1514946901318');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `true_name` varchar(10) NOT NULL,
  `credit_value` int(11) NOT NULL,
  `domicile` varchar(100) NOT NULL,
  `phone_number` bigint(11) NOT NULL,
  `id_card` bigint(18) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Ben', '金奔', '23', '15号楼123', '17862701111', '370283199511223344');
INSERT INTO `user` VALUES ('2', 'Alien', '张三', '25', '14号楼321', '17826384738', '354034199403131412');
INSERT INTO `user` VALUES ('3', 'Bob', '李四', '24', '15号楼123', '17839493940', '130482199605139418');
INSERT INTO `user` VALUES ('4', 'Christin', '王五', '24', '14号楼321', '17847384912', '381923199611234563');
INSERT INTO `user` VALUES ('5', 'Jack', '陈六', '24', '15号楼123', '18473843838', '328493199904374903');
INSERT INTO `user` VALUES ('6', 'Selina', '钱七', '24', '14号楼321', '18344328384', '138294199603234581');
INSERT INTO `user` VALUES ('7', 'Tom', '周八', '24', '15号楼123', '18349538471', '370310199505121314');

-- ----------------------------
-- Table structure for `userinfo`
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
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', '金奔', '前端工程师', '1511136000000', '1');
INSERT INTO `userinfo` VALUES ('2', 'Alien', '学生', '1511136000000', '2');
INSERT INTO `userinfo` VALUES ('3', 'Bob', '学生', '1511136000000', '3');
INSERT INTO `userinfo` VALUES ('4', 'Christin', '学生', '1511136000000', '4');
INSERT INTO `userinfo` VALUES ('5', 'Jack', '学生', '1511136000000', '5');
INSERT INTO `userinfo` VALUES ('6', 'Selina', '学生', '1511136000000', '6');
INSERT INTO `userinfo` VALUES ('7', 'Tom', '学生', '1511136000000', '7');
