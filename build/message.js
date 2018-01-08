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
// Message数据结构
var Message = /** @class */ (function () {
    function Message(id, source, timeStamp, content, userId) {
        this.id = id;
        this.source = source;
        this.timeStamp = timeStamp;
        this.content = content;
        this.userId = userId;
    }
    return Message;
}());
exports.Message = Message;
// 从数据库获取全部Message
function getMessages() {
    var messages = [];
    connection.query('select * from message', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                messages.push(new Message(results[i].id, results[i].source, results[i].timestamp, results[i].content, results[i].user_id));
            }
        }
    });
    return messages;
}
exports.getMessages = getMessages;
//# sourceMappingURL=Message.js.map