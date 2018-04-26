"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var connectHistoryApiFallback = require("connect-history-api-fallback");
var account_1 = require("./account");
var Plan_1 = require("./Plan");
var User_1 = require("./User");
var Message_1 = require("./Message");
var Task_1 = require("./Task");
var UserInfo_1 = require("./UserInfo");
var Activity_1 = require("./Activity");
var conn_1 = require("./db/conn");
/**
 * 数据缓存池
 */
var accounts0 = account_1.getAccounts();
var plans0 = Plan_1.getPlans();
var users0 = User_1.getUsers();
var userInfos0 = UserInfo_1.getUserInfos();
var messages = Message_1.getMessages();
var tasks = Task_1.getTasks();
var activities = Activity_1.getActivities();
/**
 * 服务器
 */
var app = express();
// 使用浏览器路由
app.use('/', connectHistoryApiFallback());
// 引用静态资源
app.use('/', express.static(path.join(__dirname, '..', 'client')));
// post请求的body解析器（https://github.com/expressjs/body-parser）
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**
 * 接口
 */
// login API
app.post('/api/login', function (req, res) {
    var usr = req.body['username'];
    var psw = req.body['password'];
    conn_1.connection.query('select * from account', function (err, results) {
        if (err) {
            console.error(err.message);
        }
        else {
            var accounts = [];
            for (var i = 0; i < results.length; ++i) {
                accounts.push(new account_1.Account(results[i].id, results[i].usr, results[i].psw));
            }
            accounts0 = accounts;
            if (accounts0.find(function (account) { return account.username === usr && account.password === psw; })) {
                res.json({
                    status: true
                });
            }
            else {
                res.json({
                    status: false
                });
            }
        }
    });
});
// plan API
app.get('/api/plans', function (req, res) {
    conn_1.connection.query('select * from plan', function (err, results) {
        var plans = [];
        for (var i = 0; i < results.length; ++i) {
            plans.push(new Plan_1.Plan(results[i].id, results[i].name, results[i].timestamp, results[i].place, results[i].salary, results[i].phone_number, results[i].is_received, results[i].receive_person_id));
        }
        plans0 = plans;
        res.json(plans0.filter(function (plan) { return plan.isReceived === 0; }));
    });
});
app.get('/api/plan/:id', function (req, res) {
    res.json(plans0.find(function (plan) { return plan.id == req.params.id; }));
});
app.post('/api/plan/add', function (req, res) {
    var type = req.body['type'];
    var place = req.body['place'];
    var salary = req.body['salary'];
    var timeStamp = req.body['timeStamp'];
    var pushPerson = req.body['pushPerson'];
    var usrId = accounts0.find(function (account) { return account.username === pushPerson; }).id;
    var phoneNumber = users0.find(function (user) { return user.id === usrId; }).phoneNumber;
    var sql = 'insert into plan (name, timestamp, place, salary, phone_number, is_received) values (?, ?, ?, ?, ?, ?)';
    var sqlParams = [type, timeStamp, place, salary, phoneNumber, 0];
    conn_1.connection.query(sql, sqlParams, function (err, results) {
        if (err) {
            res.json({
                status: false
            });
        }
        else {
            res.json({
                status: true
            });
        }
    });
});
app.post('/api/plan/take', function (req, res) {
    var planId = req.body['planId'];
    var usr = req.body['usr'];
    var usrId = accounts0.find(function (account) { return account.username === usr; }).id;
    conn_1.connection.query("update plan set receive_person_id=\"" + usrId + "\", is_received=1 where id=" + planId, function (err, results) {
        if (err) {
            console.error(err.message);
            res.json({
                status: false
            });
        }
        else {
            res.json({
                status: true
            });
        }
    });
});
app.get('/api/taken-plans/:usr', function (req, res) {
    var usr = req.params.usr;
    var usrId = accounts0.find(function (account) { return account.username === usr; }).id;
    res.json(plans0.filter(function (plan) { return plan.receivePersonId === usrId; }));
});
app.get('/api/pushed-plans/:usr', function (req, res) {
    var usr = req.params.usr;
    var usrId = accounts0.find(function (account) { return account.username === usr; }).id;
    var phone = users0.find(function (user) { return user.id === usrId; }).phoneNumber;
    res.json(plans0.filter(function (plan) { return plan.phoneNumber === phone; }));
});
app.post('/api/finish-plan', function (req, res) {
    var id = req.body['id'];
    var plan = plans0.find(function (plan) { return plan.id === id; });
    var salary = plan.salary;
    console.log(plan); // ??????????????????
    var taker = users0.find(function (user) { return user.id === plan.receivePersonId; });
    var pusher = users0.find(function (user) { return user.phoneNumber === plan.phoneNumber; });
    var pusherMoney = pusher.creditValue;
    var takerMoney = taker.creditValue;
    conn_1.connection.query("update user set credit_value=" + (pusherMoney - salary) + " where id=" + pusher.id, function (err, results) {
        if (err) {
            console.error(err.message);
            res.json({
                status: false
            });
        }
    });
    conn_1.connection.query("update user set credit_value=" + (takerMoney + salary) + " where id=" + taker.id, function (err, results) {
        if (err) {
            console.error(err.message);
            res.json({
                status: false
            });
        }
    });
    conn_1.connection.query("delete from plan where id=" + id, function (err, results) {
        if (err) {
            console.error(err.message);
            res.json({
                status: false
            });
        }
    });
    res.json({
        status: true
    });
});
// user API
app.get('/api/user/:usr', function (req, res) {
    var usr = req.params.usr;
    var id = accounts0.find(function (account) { return account.username === usr; }).id;
    conn_1.connection.query('select * from user', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            var users = [];
            for (var i = 0; i < results.length; ++i) {
                users.push(new User_1.User(results[i].id, results[i].name, results[i].true_name, results[i].credit_value, results[i].domicile, results[i].phone_number, results[i].id_card));
            }
            users0 = users;
            res.json(users0.find(function (user) { return user.id === id; }));
        }
    });
});
// message API
app.get('/api/messages', function (req, res) {
    res.json(messages.filter(function (message) { return message.userId == req.query.userId; }));
});
// task API
app.get('/api/tasks', function (req, res) {
    res.json(tasks.filter(function (task) { return task.userId == req.query.userId; }));
});
app.get('/api/tasks/notices', function (req, res) {
    res.json(tasks.filter(function (task) {
        return task.userId == req.query.userId && new Date().getTime() >= task.timeStamp - 86400000;
    }));
});
// userInfo API
app.get('/api/userInfo/:usr', function (req, res) {
    var usr = req.params.usr;
    var usrId = accounts0.find(function (account) { return account.username === usr; }).id;
    conn_1.connection.query('select * from userinfo', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            var userInfos = [];
            for (var i = 0; i < results.length; ++i) {
                userInfos.push(new UserInfo_1.UserInfo(results[i].id, results[i].name, results[i].autograph, results[i].timestamp, results[i].photo_id));
            }
            userInfos0 = userInfos;
            res.json(userInfos0.find(function (usrInfo) { return usrInfo.id === usrId; }));
        }
    });
});
// activity API
app.get('/api/activities', function (req, res) {
    res.json(activities);
});
// complaint API
app.post('/api/complaint', function (req, res) {
    var content = req.body['content'];
    var phoneNumber = req.body['phoneNumber'];
    var sql = 'insert into complaints (content, phone_number) values (?, ?)';
    var params = [content, phoneNumber];
    conn_1.connection.query(sql, params, function (err, results) {
        if (err) {
            console.log(err.message);
            res.json({
                status: false
            });
        }
        else {
            res.json({
                status: true
            });
        }
    });
});
// 启动项
app.listen(3000, 'localhost', function () {
    console.log('Server Start on localhost:3000...');
});
//# sourceMappingURL=app.js.map