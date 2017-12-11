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
var User = /** @class */ (function () {
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
function getUser() {
    var users = [];
    connection.query('select * from user', function (err, results) {
        if (err) {
            throw err;
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                users.push(new User(results[i].id, results[i].name, results[i].true_name, results[i].credit_value, results[i].domicile, results[i].phone_number, results[i].id_card));
            }
        }
    });
    return users;
}
exports.getUser = getUser;
//# sourceMappingURL=user.js.map