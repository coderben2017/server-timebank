import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';
import * as mysql from 'mysql';

import { Plan, getPlans } from "./plan";
import { User, getUser } from "./user";


// 数据池
const plans: Plan[] = getPlans();
const users: User[] = getUser();


// 服务器
const app = express();

app.use('/', connectHistoryApiFallback()); // 使用浏览器路由
app.use('/', express.static(path.join(__dirname, '..', 'client')));

// body-parser for POST (see https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// login API
app.post('/api/login', (req, res) => {
  if (req.body['username'] == 'admin' && req.body['password'] == 'admin') {
    res.send(true);
  } else {
    res.send(false);
  }
});

// plan API
app
  .get('/api/plans', (req, res) => {
    res.json(plans);
  })
  .get('/api/plan/:id', (req, res) => {
    res.json(plans.find(plan => plan.id == req.params.id));
  });

// user API
app.get('/api/user/:id', (req, res) => {
  res.json(users.find(user => user.id == req.params.id));
});

// server
const server = app.listen(3000, 'localhost', () => {
  console.log('Node Server Start on localhost:3000...');
});



// 数据库
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'test'
// });
//
// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
//   if (err) {
//     throw err;
//   }
//   console.log(`the solution is: ${results[0].solution}`);
// });