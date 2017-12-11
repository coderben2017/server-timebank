import * as mysql from 'mysql';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'timebank'
});

connection.connect();


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

export function getPlans(): Plan[] {
  let plans: Plan[] = [];

  connection.query('select * from plan', (err, results) => {
    if (err) {
      throw err;
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