"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'timebank'
});
connection.connect();
// Plan数据结构
var Plan = /** @class */ (function () {
    function Plan(id, name, timeStamp, place, salary, detail) {
        this.id = id;
        this.name = name;
        this.timeStamp = timeStamp;
        this.place = place;
        this.salary = salary;
        this.detail = detail;
    }
    return Plan;
}());
exports.Plan = Plan;
// 从数据库获取全部Plan
function getPlans() {
    var plans = [];
    connection.query('select * from plan', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                plans.push(new Plan(results[i].id, results[i].name, results[i].timestamp, results[i].place, results[i].salary, results[i].detail));
            }
        }
    });
    return plans;
}
exports.getPlans = getPlans;
// 向数据库添加Plan
function addPlan(newPlan, timeStamp) {
    var res = [];
    var sql = 'insert into plan (name, timestamp, place, salary, detail) values (?, ?, ?, ?, ?)';
    var sqlParams = [newPlan.name, timeStamp, newPlan.place, newPlan.salary, newPlan.detail];
    connection.query(sql, sqlParams, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            res.push(true);
            console.log(results);
        }
    });
    return res[0];
}
exports.addPlan = addPlan;
// 将前端传来的文本解析为Plan对象
function analyzePlanText(text) {
    var paramArr = text.split(' ');
    return new Plan(null, //id（传空，由数据库控制）
    paramArr[0], // name
    0, // timestamp（不使用）
    paramArr[1], // place
    parseInt(paramArr[2].replace(/^0-9/ig, '')), // salary
    paramArr[3] // detail
    );
}
exports.analyzePlanText = analyzePlanText;
//# sourceMappingURL=plan.js.map