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
function getPlans() {
    var plans = [];
    connection.query('select * from plan', function (err, results) {
        if (err) {
            throw err;
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
//# sourceMappingURL=plan.js.map