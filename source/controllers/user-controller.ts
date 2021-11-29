import { Request, Response } from "express";
import { TokenPayloadResp } from "../@api_core/entities/etoken-payload-resp";
import { EUser } from "../@api_core/entities/euser";
import { HttpHelper } from "../@api_core/helpers/http-helper";
import { checkToken } from "../@api_core/helpers/token-helper";
import { UserRepository } from "../@api_core/repositories/user-repository.service";
import { FR } from "../config/language-fr";

class UserController {
  static check = async (req: Request, res: Response) => {
    res.send("You're authorized!");
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      let token: string = req.params.token;
      let payloadResp = checkToken(req, res, token) as TokenPayloadResp;
      let user = (await UserRepository.findOneAsync({
        email: payloadResp.email,
        firstname: payloadResp.firstname,
        lastname: payloadResp.lastname,
      })) as EUser;
      user.password = undefined;
      return await HttpHelper.OK(req, res, null, user);
    } catch (error) {
      return await HttpHelper.UNAUTHORIZED(req, res, FR["token.not.valid"]);
    }
  };

  static logOutUser = async (req: Request, res: Response) => {
    try {
      return await HttpHelper.OK(req, res, FR["success.user.disconnected"]);
    } catch (error) {
      return await HttpHelper.UNAUTHORIZED(req, res, FR["token.not.valid"]);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const newUser = req.body as EUser;
      let token: string = req.params.token;
      let payloadResp = checkToken(req, res, token) as TokenPayloadResp;
      let result = await UserRepository.UpdateAsync(payloadResp._id, newUser);
      return result
        ? await HttpHelper.OK(req, res, FR["success.user.modified"])
        : await HttpHelper.UNAUTHORIZED(req, res, FR["token.not.valid"]);
    } catch (error) {
      await HttpHelper.UNAUTHORIZED(req, res, FR["token.not.valid"]);
    }
  };
  static getAllUser = async (req: Request, res: Response) => {
    try {
      const users = (await UserRepository.findAllAsync()) as Array<any>;
      users.forEach((element) => {
        element.password = undefined;
      });
      await HttpHelper.OK(req, res, null, users);
    } catch (error) {
      await HttpHelper.UNAUTHORIZED(req, res, FR["token.not.valid"]);
    }
  };
}

export default UserController;
