"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./db/conn");
var Account = /** @class */ (function () {
    function Account(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    return Account;
}());
exports.Account = Account;
function getAccounts() {
    var accounts = [];
    conn_1.connection.query('select * from account', function (err, results) {
        if (err) {
            console.error(err.message);
        }
        else {
            for (var i = 0; i < results.length; ++i) {
                accounts.push(new Account(results[i].id, results[i].usr, results[i].psw));
            }
        }
    });
    return accounts;
}
exports.getAccounts = getAccounts;
//# sourceMappingURL=account.js.map