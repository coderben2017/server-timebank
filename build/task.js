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
// Task数据结构
var Task = /** @class */ (function () {
    function Task(id, content, timeStamp, completeDegree, userId) {
        this.id = id;
        this.content = content;
        this.timeStamp = timeStamp;
        this.completeDegree = completeDegree;
        this.userId = userId;
    }
    return Task;
}());
exports.Task = Task;
// 从数据库获取全部Task
function getTasks() {
    var tasks = [];
    connection.query('select * from task', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                tasks.push(new Task(results[i].id, results[i].content, results[i].timestamp, results[i].complete_degree, results[i].user_id));
            }
        }
    });
    return tasks;
}
exports.getTasks = getTasks;
//# sourceMappingURL=Task.js.map