import * as mysql from 'mysql'

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jinben',
  database: 'db_timebank'
});

conn.connect();

export const connection = conn;