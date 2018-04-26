import { connection } from "./db/conn";

// Plan数据结构
export class Plan {
  constructor(
    public id: number,
    public name: string,
    public timeStamp: number,
    public place: string,
    public salary: number,
    public phoneNumber: number,
    public isReceived: number,
    public receivePersonId?: number
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
    }
  });

  return plans;
}