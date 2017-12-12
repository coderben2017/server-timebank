"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var plan_1 = require("./plan");
var user_1 = require("./user");
/**
 * 数据池
 */
var plans = plan_1.getPlans();
var users = user_1.getUsers();
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
// app.use('/', connectHistoryApiFallback()); // 使用浏览器路由
// app.use('/', express.static(path.join(__dirname, '..', 'client'))); // 引用静态资源
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
                    res.send(true);
                    return;
                }
            }
            res.send(false);
        }
    });
});
// plan API
app
    .get('/api/plans', function (req, res) {
    res.json(plans);
})
    .get('/api/plan/:id', function (req, res) {
    res.json(plans.find(function (plan) { return plan.id == req.params.id; }));
})
    .post('/api/plan/add', function (req, res) {
    var text = req.body['text'];
    var timeStamp = req.body['timeStamp'];
    var newPlan = plan_1.analyzePlanText(text);
    var result = plan_1.addPlan(newPlan, timeStamp);
    res.send(result);
});
// user API
app.get('/api/user/:id', function (req, res) {
    // res.json(getUser(req.params.id));
    res.json(users.find(function (user) { return user.id == req.params.id; }));
});
// 启动项
var server = app.listen(3000, 'localhost', function () {
    console.log('Node Server Start on localhost:3000...');
});
//# sourceMappingURL=app.js.map