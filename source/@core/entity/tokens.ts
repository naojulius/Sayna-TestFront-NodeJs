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
