import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';
import * as mysql from 'mysql';

import { Plan, getPlans } from "./plan";
import { User, getUser } from "./user";



/**
 * 数据池
 */

const plans: Plan[] = getPlans();
const users: User[] = getUser();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'timebank'
});

connection.connect();



/**
 * 服务器
 */

const app = express();

// 初始化配置
app.use('/', connectHistoryApiFallback()); // 使用浏览器路由
app.use('/', express.static(path.join(__dirname, '..', 'client'))); // 引用静态资源
app.use(bodyParser.urlencoded({extended: false})); // post请求的body解析器（https://github.com/expressjs/body-parser）
app.use(bodyParser.json());

// login API
app.post('/api/login', (req, res) => {
  connection.query('select * from account', (err, results) => {
    for(let i = 0; i < results.length; ++i) {
      if (results[i].usr == req.body['username'] && results[i].psw == req.body['password']) {
        res.send(true);
        return;
      }
    }
    res.send(false);
  });
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

// 启动项
const server = app.listen(3000, 'localhost', () => {
  console.log('Node Server Start on localhost:3000...');
});