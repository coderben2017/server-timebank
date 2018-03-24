"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
var UserInfo = (function () {
    function UserInfo(id, name, autograph, timeStamp, photoId) {
        this.id = id;
        this.name = name;
        this.autograph = autograph;
        this.timeStamp = timeStamp;
        this.photoId = photoId;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
function getUserInfos() {
    var userInfos = [];
    conn_1.connection.query('select * from userinfo', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                userInfos.push(new UserInfo(results[i].id, results[i].name, results[i].autograph, results[i].timestamp, results[i].photo_id));
            }
        }
    });
    return userInfos;
}
exports.getUserInfos = getUserInfos;
//# sourceMappingURL=UserInfo.js.map