import { connection } from "./db/conn";

export class Activity {
  constructor(
    public id: number,
    public name: string,
    public content: string,
    public timeStamp: number
  ) {}
}

export function getActivities(): Activity[] {
  let activities: Activity[] = [];

  connection.query('select * from activity', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        activities.push(
          new Activity(
            results[i].id,
            results[i].name,
            results[i].content,
            results[i].timestamp,
          )
        );
      }
    }
  });

  return activities;
}
