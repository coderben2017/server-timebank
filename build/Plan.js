"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
// Plan数据结构
var Plan = (function () {
    function Plan(id, name, timeStamp, place, salary, phoneNumber, isReceived, receivePersonId) {
        this.id = id;
        this.name = name;
        this.timeStamp = timeStamp;
        this.place = place;
        this.salary = salary;
        this.phoneNumber = phoneNumber;
        this.isReceived = isReceived;
        this.receivePersonId = receivePersonId;
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
                plans.push(new Plan(results[i].id, results[i].name, results[i].timestamp, results[i].place, results[i].salary, results[i].phone_number, results[i].is_received, results[i].receive_person_id));
            }
        }
    });
    return plans;
}
exports.getPlans = getPlans;
//# sourceMappingURL=Plan.js.map