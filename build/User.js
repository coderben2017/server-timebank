"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
var User = (function () {
    function User(id, name, trueName, creditValue, domicile, phoneNumber, idCard) {
        this.id = id;
        this.name = name;
        this.trueName = trueName;
        this.creditValue = creditValue;
        this.domicile = domicile;
        this.phoneNumber = phoneNumber;
        this.idCard = idCard;
    }
    return User;
}());
exports.User = User;
function getUsers() {
    var users = [];
    conn_1.connection.query('select * from user', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                users.push(new User(results[i].id, results[i].name, results[i].true_name, results[i].credit_value, results[i].domicile, results[i].phone_number, results[i].id_card));
            }
        }
    });
    return users;
}
exports.getUsers = getUsers;
function getUser(id) {
    var users = [];
    conn_1.connection.query('select * from user where id = 2', function (err, results) {
        if (err) {
            console.log(err.message);
        }
        else {
            users.push(new User(results[0].id, results[0].name, results[0].true_name, results[0].credit_value, results[0].domicile, results[0].phone_number, results[0].id_card));
        }
    });
    console.log(users[0]);
    return users[0];
}
exports.getUser = getUser;
//# sourceMappingURL=User.js.map