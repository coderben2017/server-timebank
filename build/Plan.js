"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
// Plan数据结构
var Plan = (function () {
    function Plan(id, name, timeStamp, place, salary, phoneNumber) {
        this.id = id;
        this.name = name;
        this.timeStamp = timeStamp;
        this.place = place;
        this.salary = salary;
        this.phoneNumber = phoneNumber;
    }
    return Plan;
}());
exports.Plan = Plan;
// 从数据库获取全部Plan
function getPlans() {
    var plans = [];
    conn_1.connection.query('select * from plan', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                plans.push(new Plan(results[i].id, results[i].name, results[i].timestamp, results[i].place, results[i].salary, results[i].phone_number));
            }
        }
    });
    return plans;
}
exports.getPlans = getPlans;
// 向数据库添加Plan
function addPlan(newPlan, timeStamp) {
    var res = true;
    var sql = 'insert into plan (name, timestamp, place, salary, phone_number) values (?, ?, ?, ?, ?)';
    var sqlParams = [newPlan.name, timeStamp, newPlan.place, newPlan.salary, newPlan.phoneNumber];
    conn_1.connection.query(sql, sqlParams, function (err, results) {
        if (err) {
            console.log(err.message);
            res = false;
        }
        else {
            console.log(results);
        }
    });
    return res;
}
exports.addPlan = addPlan;
// 将前端传来的文本解析为Plan对象
function analyzePlanText(text) {
    var paramArr = text.split(' ');
    // 酬劳字段检查
    if (!parseInt(paramArr[2].replace(/^0-9/ig, ''))) {
        return 1;
    }
    // 手机号字段检查
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(paramArr[3]))) {
        return 2;
    }
    return new Plan(null, //id（传空，由数据库控制）
    paramArr[0], // name
    0, // timestamp（不使用）
    paramArr[1], // place
    parseInt(paramArr[2].replace(/^0-9/ig, '')), // salary
    Number(paramArr[3]) // phonenumber
    );
}
exports.analyzePlanText = analyzePlanText;
//# sourceMappingURL=Plan.js.map