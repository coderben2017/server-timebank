# 建表
create table if not exists `message` (
	`id` int unsigned auto_increment,
	`source` varchar(20) not null,
	`timestamp` bigint not null,
	`content` varchar(100) not null,
	primary key (`id`)
)engine=innodb default charset=utf8;