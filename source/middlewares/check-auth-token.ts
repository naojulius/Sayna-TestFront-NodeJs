import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import User from "../model/user";
export const checkToken = (req: Request, res: Response, token: string): any => {
  let user = {} as User;
  let jwtPayload;
  try {
    // check if access token is valid
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    return jwtPayload;
  } catch (error) {
    return;
  }
};
