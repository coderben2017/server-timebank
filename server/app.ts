import * as express from 'express';
import { Plan, getPlans } from "./plan";
import { User, getUser } from "./user";

// 数据池
const plans: Plan[] = getPlans();
const users: User[] = getUser();

// 服务器
const app = express();
app
  .get('/api/plans', (req, res) => {
    res.json(plans);
  })
  .get('/api/plan/:id', (req, res) => {
    res.json(plans.find(plan => plan.id == req.params.id));
  })
  .get('/api/user/:id', (req, res) => {
    res.json(users.find(user => user.id == req.params.id));
  })
  .listen(3000, 'localhost', () => {
    console.log('Node Server Start on localhost:3000...');
  });

