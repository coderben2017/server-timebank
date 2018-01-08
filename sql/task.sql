# 建表
create table if not exists `task` (
	`id` int unsigned auto_increment,
	`content` varchar(100) not null,
	`completedegree` int not null,
	`userid` int not null,
	primary key (`id`)
)engine=innodb default charset=utf8;