import { Request, Response } from "express";
import { UserLoginRequest } from "../@api_core/entities/euser-login-req";
import { FR } from "../config/language-fr";
import { UserHelper } from "../@api_core/helpers/user-helper";
import { UserRepository } from "../@api_core/repositories/user-repository.service";
import { HttpHelper } from "../@api_core/helpers/http-helper";
import { TokenHelper } from "../@api_core/helpers/token-helper";
import { hashPass, verifyPass } from "../utils/hash";
import { Tokens } from "../@api_core/entities/etoken";
import { EUser } from "../@api_core/entities/euser";

class AuthController {
  
  static login = async (req: Request, res: Response) => {
    const userLoginRequest: UserLoginRequest = new UserLoginRequest();
    userLoginRequest.email = req.body.email;
    userLoginRequest.password = req.body.password;

    const user = (await UserRepository.findOneAsync(
      {email: userLoginRequest.email}
    )) as any as EUser;
     
    if (!user) {
      return HttpHelper.UNAUTHORIZED(req, res, FR["wrong.mail.password"]);
    }
    if(!verifyPass(user.password, userLoginRequest.password)){
      return HttpHelper.UNAUTHORIZED(req, res, FR["wrong.mail.password"]);
    } 
    
    let newToken = await TokenHelper.issueToken(
      userLoginRequest.email,
      user.firstname,
      user.lastname,
      user._id
    );
    let accessedToken: Tokens = new Tokens(newToken);
    return HttpHelper.OK_TOKEN(req, res, FR["success.user.connected"], {
      createdAt: new Date(),
      refreshToken: accessedToken.refreshToken,
      token: accessedToken.token,
    });
  };


  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    var foundedRefToken = TokenHelper.refTokens.find(
      (x) => x.refreshToken == refreshToken
    );
    if (foundedRefToken) {
      const token = await TokenHelper.issueToken(
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
      return await HttpHelper.UNAUTHORIZED(req, res, '');
    }
  };

  static register = async (req: Request, res: Response) => {
    const user = req.body as EUser;
    if (!UserHelper.validateUser(user)) {
      return await HttpHelper.UNAUTHORIZED(req, res, FR["data.not.valid"]);
    }
    if (!UserHelper.validateUserField(user)) {
      return await HttpHelper.UNAUTHORIZED(req, res, FR["data.not.complete"]);
    }
    if (!UserHelper.validateUserEmail(user.email)) {
      return await HttpHelper.UNAUTHORIZED(req, res, FR["email.not.valid"]);
    }
    user.password = await hashPass(user.password);
    const result = (await UserRepository.saveAsync(user)) as any;
    return result
      ? await HttpHelper.OK(req, res, FR["success.user.saved"])
      : await HttpHelper.UNAUTHORIZED(req, res, FR["error.user.saved"]);
  };
}

export default AuthController;
