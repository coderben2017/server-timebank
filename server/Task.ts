import { connection } from "./db/conn";

// Task数据结构
export class Task {
  constructor(
    public id: number,
    public content: string,
    public timeStamp: number,
    public completeDegree: number,
    public userId: number
  ) {}
}

// 从数据库获取全部Task
export function getTasks(): Task[] {
  let tasks: Task[] = [];

  connection.query('select * from task', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        tasks.push(
          new Task(results[i].id, results[i].content, results[i].timestamp, results[i].complete_degree, results[i].user_id)
        );
      }
    }
  });

  return tasks;
}