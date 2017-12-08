"use strict";
exports.__esModule = true;
var express = require("express");
var plan_1 = require("./plan");
var user_1 = require("./user");
// 数据池
var plans = plan_1.getPlans();
var users = user_1.getUser();
// 服务器
var app = express();
app
    .get('/api/plans', function (req, res) {
    res.json(plans);
})
    .get('/api/plan/:id', function (req, res) {
    res.json(plans.find(function (plan) { return plan.id === req.params.id; }));
})
    .get('/api/user/:id', function (req, res) {
    res.json(users.find(function (user) { return user.id === req.params.id; }));
})
    .listen(3000, 'localhost', function () {
    console.log('server start on localhost:3000.');
});
