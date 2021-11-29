
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { TokenPayloadResp, UserPayloadResp } from "../@core/entity/token-payload-resp";
import { UsersResp } from "../@core/entity/user-resp";
import { FR } from "../config/language-fr";
import { checkToken } from "../middlewares/check-auth-token";
import User from "../model/user";
import { UserService } from "../services/user.service";

class UserController {
  static check = async (req: Request, res: Response) => {
    res.send("You're authorized!");
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      let token: string = req.params.token;
      let payloadResp = checkToken(req, res, token) as TokenPayloadResp;
      const user = (await UserService.getUser({
        email: payloadResp.email,
        firstname: payloadResp.firstname,
        lastname: payloadResp.lastname,
      })) as any as User;
      let userPayloadResp: UserPayloadResp = new UserPayloadResp(user, false, "");
      return res.status(200).send(userPayloadResp);
    } catch (error) {
      let user = {} as User;
      let userPayloadResp: UserPayloadResp = new UserPayloadResp(
        user,
        true,
        FR["token.not.valid"]
      );
      return res.status(401).send(userPayloadResp);
    }
  };

  static logOutUser = async (req: Request, res: Response) => {
    try {
      return res.status(200).send({
        error: false,
        message: FR["success.user.disconnected"],
      });
    } catch (error) {
      let user = {} as User;
      let userPayloadResp: UserPayloadResp = new UserPayloadResp(
        user,
        true,
        FR["token.not.valid"]
      );
      return res.status(401).send(userPayloadResp);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const newUser = req.body as User;
      let token: string = req.params.token;
      let payloadResp = checkToken(req, res, token) as TokenPayloadResp;
      const query = { _id: new ObjectId(payloadResp._id) };
      let result = await UserService.updateUser(query, newUser);
      return result
        ? res.status(200).send({
          error: false,
          message: FR["success.user.modified"],
        })
        : res.status(401).send({
          error: false,
          message: FR["token.not.valid"],
        });
    } catch (error) {
      let user = {} as User;
      let userPayloadResp: UserPayloadResp = new UserPayloadResp(
        user,
        true,
        FR["token.not.valid"]
      );
      return res.status(401).send(userPayloadResp);
    }
  };
  static getAllUser = async (req: Request, res: Response) => {
    try {
      const users = (await UserService.getAllUser()) as Array<any>;
      let usersResp: UsersResp = new UsersResp(users);
      return res.status(200).send(usersResp);
    } catch (error) {
      let user = {} as User;
      let userPayloadResp: UserPayloadResp = new UserPayloadResp(
        user,
        true,
        FR["token.not.valid"]
      );
      return res.status(401).send(userPayloadResp);
    }
  };
}

export default UserController;
