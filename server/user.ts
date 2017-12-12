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

export function getUsers(): User[] {
  let users: User[] = [];

  connection.query('select * from user', (err, results) => {
    if (err) {
      console.log(err.message);
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

export function getUser(id: number): User {
  let users: User[] = [];

  connection.query('select * from user where id = 2', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      users.push(
        new User(results[0].id,
                  results[0].name,
                  results[0].true_name,
                  results[0].credit_value,
                  results[0].domicile,
                  results[0].phone_number,
                  results[0].id_card)
      );
    }
  });

  console.log(users[0]);
  return users[0];
}