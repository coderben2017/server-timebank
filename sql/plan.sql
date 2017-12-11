# 建表
create table if not exists `plan` (
	`id` int unsigned auto_increment,
	`name` varchar(50) not null,
	`timestamp` bigint not null,
	`place` varchar(100) not null,
	`salary` int not null,
	`detail` text,
	primary key (`id`)
)engine=innodb default charset=utf8;