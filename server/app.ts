import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';

import { Plan, getPlans, addPlan, analyzePlanText } from './Plan';
import { User, getUsers, getUser } from './User';
import { Message, getMessages } from './Message';
import { Task, getTasks } from './Task';
import { UserInfo, getUserInfos} from './UserInfo';
import { Activity, getActivities } from "./Activity";

import { connection } from "./db/conn";


/**
 * 数据池
 */
const plans: Plan[] = getPlans();
const users: User[] = getUsers();
const messages: Message[] = getMessages();
const tasks: Task[] = getTasks();
const userInfos: UserInfo[] = getUserInfos();
const activities: Activity[] = getActivities();


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
    if (err) {
      console.log(err.message);
    } else {
      for(let i = 0; i < results.length; ++i) {
        if (results[i].usr == req.body['username'] && results[i].psw == req.body['password']) {
          res.send({status: true});
          return;
        }
      }
      res.send({status: false});
    }
  });
});

// plan API
app.get('/api/plans', (req, res) => {
  res.json(plans);
});
app.get('/api/plan/:id', (req, res) => {
  res.json(plans.find(plan => plan.id == req.params.id));
});
app.post('/api/plan/add', (req, res) => {
  const text: string = req.body['text'];
  const timeStamp: number = req.body['timeStamp'];
  const newPlan: any = analyzePlanText(text);
  if (typeof newPlan === 'number') {
    res.send({
      status: false,
      message: newPlan
    });
  } else {
    const result: boolean = addPlan(newPlan, timeStamp);
    if (result) {// 解析成功
      res.send({
        status: true,
        message: 0
      });
    } else { // 解析失败
      res.send({
        status: false,
        message: 3
      });
    }
  }
});

// user API
app.get('/api/user/:id', (req, res) => {
  // res.json(getUser(req.params.id));
  res.json(users.find(user => user.id == req.params.id));
});

// message API
app.get('/api/messages', (req, res) => {
  res.json(messages.filter(message => message.userId == req.query.userId));
});

// task API
app.get('/api/tasks', (req, res) => {
  res.json(tasks.filter(task => task.userId == req.query.userId));
});
app.get('/api/tasks/notices', (req, res) => {
  res.json(tasks.filter(task => task.userId == req.query.userId && new Date().getTime() >= task.timeStamp - 86400000));
});

// userInfo API
app.get('/api/userInfo', (req, res) => {
  res.json(userInfos.find(userInfo => userInfo.id == req.query.userId));
});

// activity API
app.get('/api/activities', (req, res) => {
  res.json(activities);
});


// 启动项
const server = app.listen(3000, 'localhost', () => {
  console.log('Server Start on localhost:3000...');
});