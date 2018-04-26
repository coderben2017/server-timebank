import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';

import { Account, getAccounts } from "./account";
import { Plan, getPlans } from './Plan';
import { User, getUsers, getUser } from './User';
import { Message, getMessages } from './Message';
import { Task, getTasks } from './Task';
import { UserInfo, getUserInfos} from './UserInfo';
import { Activity, getActivities } from "./Activity";

import { connection } from "./db/conn";

/**
 * 数据缓存池
 */
let accounts0: Account[] = getAccounts();
let plans0: Plan[] = getPlans();
let users0: User[] = getUsers();
let userInfos0: UserInfo[] = getUserInfos();
const messages: Message[] = getMessages();
const tasks: Task[] = getTasks();
const activities: Activity[] = getActivities();


/**
 * 服务器
 */
const app = express();

// 使用浏览器路由
app.use('/', connectHistoryApiFallback());

// 引用静态资源
app.use('/', express.static(path.join(__dirname, '..', 'client')));

// post请求的body解析器（https://github.com/expressjs/body-parser）
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/**
 * 接口
 */
// login API
app.post('/api/login', (req, res) => {
  const usr: string = req.body['username'];
  const psw: string = req.body['password'];
  connection.query('select * from account', (err, results) => {
    if (err) {
      console.error(err.message);
    } else {
      let accounts: Account[] = [];
      for (let i = 0; i < results.length; ++i) {
        accounts.push(
          new Account(
            results[i].id,
            results[i].usr,
            results[i].psw
          )
        )
      }
      accounts0 = accounts;
      if (accounts0.find(account => account.username === usr && account.password === psw)) {
        res.json({
          status: true
        });
      } else {
        res.json({
          status: false
        })
      }
    }
  });
});

// plan API
app.get('/api/plans', (req, res) => {
  connection.query('select * from plan', (err, results) => {
    let plans: Plan[] = [];
    for (let i = 0; i < results.length; ++i) {
      plans.push(
        new Plan(
          results[i].id,
          results[i].name,
          results[i].timestamp,
          results[i].place,
          results[i].salary,
          results[i].phone_number,
          results[i].is_received,
          results[i].receive_person_id
        )
      );
    }
    plans0 = plans;
    res.json(plans0.filter(plan => plan.isReceived === 0));
  });
});

app.get('/api/plan/:id', (req, res) => {
  res.json(plans0.find(plan => plan.id == req.params.id));
});

app.post('/api/plan/add', (req, res) => {
  const type: string = req.body['type'];
  const place: string = req.body['place'];
  const salary: number = req.body['salary'];
  const timeStamp: number = req.body['timeStamp'];
  const pushPerson: string = req.body['pushPerson'];
  const usrId: number = accounts0.find(account => account.username === pushPerson).id;
  const phoneNumber: number = users0.find(user => user.id === usrId).phoneNumber;
  const sql = 'insert into plan (name, timestamp, place, salary, phone_number, is_received) values (?, ?, ?, ?, ?, ?)';
  const sqlParams = [type, timeStamp, place, salary, phoneNumber, 0];
  connection.query(sql, sqlParams, (err, results) => {
    if (err) {
      res.json({
        status: false
      });
    } else {
      res.json({
        status: true
      });
    }
  });
});

app.post('/api/plan/take', (req, res) => {
  const planId: number = req.body['planId'];
  const usr: string = req.body['usr'];
  const usrId: number = accounts0.find(account => account.username === usr).id;
  connection.query(`update plan set receive_person_id="${usrId}", is_received=1 where id=${planId}`, (err, results) => {
    if (err) {
      console.error(err.message);
      res.json({
        status: false
      });
    } else {
      res.json({
        status: true
      })
    }
  })
});

app.get('/api/taken-plans/:usr', (req, res) => {
  const usr: string = req.params.usr;
  const usrId: number = accounts0.find(account => account.username === usr).id;
  res.json(plans0.filter(plan => plan.receivePersonId === usrId));
});

app.get('/api/pushed-plans/:usr', (req, res) => {
  const usr: string = req.params.usr;
  const usrId: number = accounts0.find(account => account.username === usr).id;
  const phone:number = users0.find(user => user.id === usrId).phoneNumber;
  res.json(plans0.filter(plan => plan.phoneNumber === phone));
});

app.post('/api/finish-plan', (req, res) => {
  const id: number = req.body['id'];
  const plan: Plan = plans0.find(plan => plan.id === id);
  const salary: number = plan.salary;
  console.log(plan); // ??????????????????
  const taker: User = users0.find(user => user.id === plan.receivePersonId);
  const pusher: User = users0.find(user => user.phoneNumber === plan.phoneNumber);
  const pusherMoney: number = pusher.creditValue;
  const takerMoney: number = taker.creditValue;
  connection.query(`update user set credit_value=${pusherMoney - salary} where id=${pusher.id}`, (err, results) => {
    if (err) {
      console.error(err.message);
      res.json({
        status: false
      });
    }
  });
  connection.query(`update user set credit_value=${takerMoney + salary} where id=${taker.id}`, (err, results) => {
    if (err) {
      console.error(err.message);
      res.json({
        status: false
      });
    }
  });
  connection.query(`delete from plan where id=${id}`, (err, results) => {
    if (err) {
      console.error(err.message);
      res.json({
        status:false
      });
    }
  });
  res.json({
    status: true
  });
});

// user API
app.get('/api/user/:usr', (req, res) => {
  const usr: string = req.params.usr;
  const id: number = accounts0.find(account => account.username === usr).id;
  connection.query('select * from user', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      let users: User[] = [];
      for (let i = 0; i < results.length; ++i) {
        users.push(
          new User(
            results[i].id,
            results[i].name,
            results[i].true_name,
            results[i].credit_value,
            results[i].domicile,
            results[i].phone_number,
            results[i].id_card
          )
        );
      }
      users0 = users;
      res.json(users0.find(user => user.id === id));
    }
  });
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
  res.json(tasks.filter(task =>
    task.userId == req.query.userId && new Date().getTime() >= task.timeStamp - 86400000));
});

// userInfo API
app.get('/api/userInfo/:usr', (req, res) => {
  const usr: string = req.params.usr;
  const usrId: number = accounts0.find(account => account.username === usr).id;

  connection.query('select * from userinfo', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      let userInfos: UserInfo[] = [];
      for (let i = 0; i < results.length; ++i) {
        userInfos.push(
          new UserInfo(
            results[i].id,
            results[i].name,
            results[i].autograph,
            results[i].timestamp,
            results[i].photo_id
          )
        );
      }
      userInfos0 = userInfos;
      res.json(userInfos0.find(usrInfo => usrInfo.id === usrId));
    }
  });
});

// activity API
app.get('/api/activities', (req, res) => {
  res.json(activities);
});


// complaint API
app.post('/api/complaint', (req, res) => {
  const content: string = req.body['content'];
  const phoneNumber: number = req.body['phoneNumber'];
  const sql = 'insert into complaints (content, phone_number) values (?, ?)';
  const params = [content, phoneNumber];
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.log(err.message);
      res.json({
        status: false
      });
    } else {
      res.json({
        status: true
      });
    }
  });
});


// 启动项
app.listen(3000, 'localhost', () => {
  console.log('Server Start on localhost:3000...');
});