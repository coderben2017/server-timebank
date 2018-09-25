"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jinben',
    database: 'db_timebank'
});
conn.connect();
exports.connection = conn;
//# sourceMappingURL=conn.js.map