import * as mysql from 'mysql';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'timebank'
});

connection.connect();

// Plan数据结构
export class Plan {
  constructor(
    public id: number,
    public name: string,
    public timeStamp: number,
    public place: string,
    public salary: number,
    public detail: string
  ) {}
}

// 从数据库获取全部Plan
export function getPlans(): Plan[] {
  let plans: Plan[] = [];

  connection.query('select * from plan', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        plans.push(
          new Plan(results[i].id,
                    results[i].name,
                    results[i].timestamp,
                    results[i].place,
                    results[i].salary,
                    results[i].detail)
        );
      }
    }
  });

  return plans;
}

// 向数据库添加Plan
export function addPlan(newPlan: Plan, timeStamp: number): boolean {
  let res: boolean = true;

  const sql = 'insert into plan (name, timestamp, place, salary, detail) values (?, ?, ?, ?, ?)';
  const sqlParams = [newPlan.name, timeStamp, newPlan.place, newPlan.salary, newPlan.detail];
  connection.query(sql,sqlParams, (err, results) => {
    if (err) {
      console.log(err.message);
      res = false;
    } else {
      console.log(results);
    }
  });

  return res;
}

// 将前端传来的文本解析为Plan对象
export function analyzePlanText(text: string): Plan {
  const paramArr = text.split(' ');
  return new Plan(null, //id（传空，由数据库控制）
                      paramArr[0], // name
                      0, // timestamp（不使用）
                      paramArr[1], // place
                      parseInt(paramArr[2].replace(/^0-9/ig, '')), // salary
                      paramArr[3] // detail
  );
}