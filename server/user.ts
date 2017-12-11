import * as mysql from 'mysql';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'timebank'
});

connection.connect();


export class User {
  constructor(
    public id: number,
    public name: string,
    public trueName: string,
    public creditValue: number,
    public domicile: string,
    public phoneNumber: number,
    public idCard: any
  ) {}
}

export function getUser(): User[] {
  let users: User[] = [];

  connection.query('select * from user', (err, results) => {
    if (err) {
      throw err;
    } else {
      for (let i = 0; i < results.length; ++i) {
        users.push(
          new User(results[i].id,
            results[i].name,
            results[i].true_name,
            results[i].credit_value,
            results[i].domicile,
            results[i].phone_number,
            results[i].id_card)
        );
      }
    }
  });

  return users;
}