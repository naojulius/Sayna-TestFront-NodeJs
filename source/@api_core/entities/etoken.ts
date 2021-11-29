import { ObjectId } from "mongodb";

export class Etoken {
  public static refTokens = new Array<{
    email: string;
    firstname: string;
    lastname: string;
    refreshToken: string;
    _id: ObjectId;
  }>();
}
export class Tokens {
  token?: string;
  refreshToken?: string;
  cratedAd?: Date;
  constructor(newToken: any) {
    this.cratedAd = new Date();
    this.refreshToken = newToken?.refreshToken;
    this.token = newToken?.accessToken;
  }
}
