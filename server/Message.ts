import * as mysql from 'mysql';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'timebank'
});

connection.connect();

// Message数据结构
export class Message {
  constructor(
    public id: number,
    public source: string,
    public timeStamp: number,
    public content: string,
    public userId: number
  ) {}
}

// 从数据库获取全部Message
export function getMessages(): Message[] {
  let messages: Message[] = [];

  connection.query('select * from message', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        messages.push(
          new Message(results[i].id, results[i].source, results[i].timestamp, results[i].content, results[i].user_id)
        );
      }
    }
  });

  return messages;
}