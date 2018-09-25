"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
var Activity = /** @class */ (function () {
    function Activity(id, name, content, timeStamp) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.timeStamp = timeStamp;
    }
    return Activity;
}());
exports.Activity = Activity;
function getActivities() {
    var activities = [];
    conn_1.connection.query('select * from activity', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                activities.push(new Activity(results[i].id, results[i].name, results[i].content, results[i].timestamp));
            }
        }
    });
    return activities;
}
exports.getActivities = getActivities;
//# sourceMappingURL=Activity.js.map