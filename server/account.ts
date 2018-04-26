import { connection } from "./db/conn";

export class Account {
  constructor(
    public id: number,
    public username: string,
    public password: string
  ) {}
}

export function getAccounts(): Account[] {
  let accounts: Account[] = [];

  connection.query('select * from account', (err, results) => {
    if (err) {
      console.error(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        accounts.push(
          new Account(
            results[i].id,
            results[i].usr,
            results[i].psw
          )
        )
      }
    }
  });

  return accounts;
}