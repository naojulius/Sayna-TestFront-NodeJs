import { ObjectId } from "mongodb";
import { EUser } from "./euser";

export class TokenPayloadResp {
  email!: string;
  firstname!: string;
  lastname!: string;
  iat!: number;
  exp!: number;
  _id!: ObjectId;
}

export class UserPayloadResp {
  error: boolean;
  user!: EUser | undefined;
  message!: string | undefined;
  constructor(user: EUser, error: boolean, message: string) {
    this.error = error;
    if (!error) {
      this.user = user;
      delete this.user.password;
      delete this.message;
    } else {
      delete this.user;
      this.message = message;
    }
  }
}
