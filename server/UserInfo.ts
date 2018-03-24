import { connection } from "./db/conn";

export class UserInfo {
  constructor(
    public id: number,
    public name: string,
    public autograph: string,
    public timeStamp: number,
    public photoId: number
  ) {}
}

export function getUserInfos(): UserInfo[] {
  let userInfos: UserInfo[] = [];

  connection.query('select * from userinfo', (err, results) => {
    if (err) {
      console.log(err.message);
    } else {
      for (let i = 0; i < results.length; ++i) {
        userInfos.push(
          new UserInfo(
            results[i].id,
            results[i].name,
            results[i].autograph,
            results[i].timestamp,
            results[i].photo_id
          )
        );
      }
    }
  });

  return userInfos;
}