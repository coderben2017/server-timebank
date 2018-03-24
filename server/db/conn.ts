import * as mysql from 'mysql'

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timebank'
});

conn.connect();

export const connection = conn;