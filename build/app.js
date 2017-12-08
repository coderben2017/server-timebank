"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var plan_1 = require("./plan");
var user_1 = require("./user");
// 数据池
var plans = plan_1.getPlans();
var users = user_1.getUser();
// 服务器
var app = express();
// app.use('/', express.static(path.join(__dirname, '..', 'client')))
// body-parser for POST (see https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// login API
app.post('/api/login', function (req, res) {
    if (req.body['username'] == 'admin' && req.body['password'] == 'admin') {
        res.send(true);
    }
    else {
        res.send(false);
    }
});
// plan API
app
    .get('/api/plans', function (req, res) {
    res.json(plans);
})
    .get('/api/plan/:id', function (req, res) {
    res.json(plans.find(function (plan) { return plan.id == req.params.id; }));
});
// user API
app.get('/api/user/:id', function (req, res) {
    res.json(users.find(function (user) { return user.id == req.params.id; }));
});
// server
var server = app.listen(3000, 'localhost', function () {
    console.log('Node Server Start on localhost:3000...');
});
//# sourceMappingURL=app.js.map