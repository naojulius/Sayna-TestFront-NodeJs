import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { random } from "../utils/random";
import config from "../config";
import { AuthResponse } from "../@core/entity/auth-resp";
import { Tokens } from "../@core/entity/tokens";
import User from "../model/user";
import { UserLoginRequest } from "../@core/entity/user-login-req";
import { UserService } from "../services/user.service";
import * as EmailValidator from "email-validator";
import { validateUser, validateUserField } from "../utils/user-validator";
import { ObjectId } from "mongodb";
import { FR } from "../config/language-fr";

class AuthController {
  public static refTokens = new Array<{
    email: string;
    firstname: string;
    lastname: string;
    refreshToken: string;
    _id: ObjectId;
  }>();
  private static issueToken = async (
    email: string,
    firstname: string,
    lastname: string,
    _id: ObjectId
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
    AuthController.refTokens.push({
      email: email,
      firstname: firstname,
      lastname: lastname,
      refreshToken: refreshToken,
      _id: _id,
    });
    return { accessToken: token, refreshToken: refreshToken };
  };
  static login = async (req: Request, res: Response) => {
    const userLoginRequest: UserLoginRequest = new UserLoginRequest();
    userLoginRequest.email = req.body.email;
    userLoginRequest.password = req.body.password;

    const user = (await UserService.authenticate(
      userLoginRequest
    )) as any as User;

    if (!user) {
      let authResponse: AuthResponse = new AuthResponse(
        FR["wrong.mail.password"]
      );
      authResponse.error = true;
      authResponse.tokens = new Tokens(null);
      return res.status(401).json(authResponse);
    }

    let newToken = await AuthController.issueToken(
      userLoginRequest.email,
      user.firstname,
      user.lastname,
      user._id
    );
    let accessedToken: Tokens = new Tokens(newToken);
    let authResponse: AuthResponse = new AuthResponse(
      FR["success.user.connected"]
    );
    authResponse.error = false;
    authResponse.tokens = accessedToken;
    res.status(200).json(authResponse);
  };
  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    var foundedRefToken = AuthController.refTokens.find(
      (x) => x.refreshToken == refreshToken
    );
    if (foundedRefToken) {
      const token = await AuthController.issueToken(
        foundedRefToken.email,
        foundedRefToken.firstname,
        foundedRefToken.lastname,
        foundedRefToken._id
      );
      res.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } else {
      res.sendStatus(401);
    }
  };

  static register = async (req: Request, res: Response) => {
    const user = req.body as User;
    if (!validateUser(user)) {
      let authResponse: AuthResponse = new AuthResponse(FR["data.not.valid"]);
      authResponse.error = true;
      return res.status(401).send(authResponse);
    }
    if (!validateUserField(user)) {
      let authResponse: AuthResponse = new AuthResponse(
        FR["data.not.complete"]
      );
      authResponse.error = true;
      return res.status(401).send(authResponse);
    }
    if (!EmailValidator.validate(user.email)) {
      let authResponse: AuthResponse = new AuthResponse(FR["email.not.valid"]);
      authResponse.error = true;
      return res.status(401).send(authResponse);
    }
    const result = (await UserService.registration(user)) as any;
    return result ? this.resp(res, true) : this.resp(res, false);
  };

  static resp(res: any, status: boolean) {
    if (status) {
      let authResponse: AuthResponse = new AuthResponse(
        FR["success.user.saved"]
      );
      authResponse.error = false;
      return res.status(201).send(authResponse);
    } else {
      let authResponse: AuthResponse = new AuthResponse(FR["error.user.saved"]);
      authResponse.error = true;
      return res.status(401).send(authResponse);
    }
  }
}

export default AuthController;
