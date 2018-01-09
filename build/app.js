"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var connectHistoryApiFallback = require("connect-history-api-fallback");
var mysql = require("mysql");
var Plan_1 = require("./Plan");
var User_1 = require("./User");
var Message_1 = require("./Message");
var Task_1 = require("./Task");
var UserInfo_1 = require("./UserInfo");
var Activity_1 = require("./Activity");
/**
 * 数据池
 */
var plans = Plan_1.getPlans();
var users = User_1.getUsers();
var messages = Message_1.getMessages();
var tasks = Task_1.getTasks();
var userInfos = UserInfo_1.getUserInfos();
var activities = Activity_1.getActivities();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'timebank'
});
connection.connect();
/**
 * 服务器
 */
var app = express();
// 初始化配置
app.use('/', connectHistoryApiFallback()); // 使用浏览器路由
app.use('/', express.static(path.join(__dirname, '..', 'client'))); // 引用静态资源
app.use(bodyParser.urlencoded({ extended: false })); // post请求的body解析器（https://github.com/expressjs/body-parser）
app.use(bodyParser.json());
// login API
app.post('/api/login', function (req, res) {
    connection.query('select * from account', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                if (results[i].usr == req.body['username'] && results[i].psw == req.body['password']) {
                    res.send({ status: true });
                    return;
                }
            }
            res.send({ status: false });
        }
    });
});
// plan API
app.get('/api/plans', function (req, res) {
    res.json(plans);
});
app.get('/api/plan/:id', function (req, res) {
    res.json(plans.find(function (plan) { return plan.id == req.params.id; }));
});
app.post('/api/plan/add', function (req, res) {
    var text = req.body['text'];
    var timeStamp = req.body['timeStamp'];
    var newPlan = Plan_1.analyzePlanText(text);
    if (typeof newPlan === 'number') {
        res.send({
            status: false,
            message: newPlan
        });
    }
    else {
        var result = Plan_1.addPlan(newPlan, timeStamp);
        if (result) {
            res.send({
                status: true,
                message: 0
            });
        }
        else {
            res.send({
                status: false,
                message: 3
            });
        }
    }
});
// user API
app.get('/api/user/:id', function (req, res) {
    // res.json(getUser(req.params.id));
    res.json(users.find(function (user) { return user.id == req.params.id; }));
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
    res.json(tasks.filter(function (task) { return task.userId == req.query.userId && new Date().getTime() >= task.timeStamp - 86400000; }));
});
// userInfo API
app.get('/api/userInfo', function (req, res) {
    res.json(userInfos.find(function (userInfo) { return userInfo.id == req.query.userId; }));
});
// activity API
app.get('/api/activities', function (req, res) {
    res.json(activities);
});
// 启动项
var server = app.listen(3000, 'localhost', function () {
    console.log('Node Server Start on localhost:3000...');
});
//# sourceMappingURL=app.js.map