import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import config from "../../config";
import { random } from "../../utils/random";
import { EUser } from "../entities/euser";

export const checkToken = (req: Request, res: Response, token: string): any => {
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    return jwtPayload;
  } catch (error) {
    return;
  }
};

export class TokenHelper{
  public static refTokens = new Array<{
    email: string;
    firstname?: string;
    lastname?: string;
    refreshToken: string;
    _id?: ObjectId;
  }>();

  public  static issueToken = async (
    email: string,
    firstname?: string, 
    lastname?: string,
    _id?: ObjectId
  ) => {
    const userToken = {
      email,
      firstname,
      lastname,
      _id,
    };
    //generation du nouveau access token
    const token = jwt.sign(userToken, config.jwtSecret, {
      expiresIn: config.jwtExpirationSeconds,
    });
    // generating refresh token
    // we should store it in database, I'm just putting it in a list
    const refreshToken = random(64);
    TokenHelper.refTokens.push({
      email: email,
      firstname: firstname,
      lastname: lastname,
      refreshToken: refreshToken,
      _id: _id,
    });
    return { accessToken: token, refreshToken: refreshToken };
  };
}



