import User from "../../model/user";

export class UsersResp {
  error!: boolean;
  users!: Array<User>;

  constructor(users: Array<User>) {
    users.forEach((element) => {
      delete element.password;
    });
    this.users = users;
    this.error = false;
  }
}
