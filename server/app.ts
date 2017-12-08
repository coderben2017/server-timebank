import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import { Plan, getPlans } from "./plan";
import { User, getUser } from "./user";


// 数据池
const plans: Plan[] = getPlans();
const users: User[] = getUser();


// 服务器
const app = express();

// app.use('/', express.static(path.join(__dirname, '..', 'client')))

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

