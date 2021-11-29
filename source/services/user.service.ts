import { UserLoginRequest } from "../@core/entity/user-login-req";
import { collections } from "../services/database.service";
import User from "../model/user";
import { hashPass, verify } from "../utils/hash";
export class UserService {
  static async authenticate(userLoginRequest: UserLoginRequest) {
    try {
      const user = (await collections.users?.findOne({
        email: userLoginRequest.email,
      })) as any as User;

      if (!user._id) {
        return null;
      }
      if (!verify(user.password, userLoginRequest.password)) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  static async registration(user: User) {
    try {
      user.password = hashPass(user.password);
      const result = await collections.users?.insertOne(user);
      return result;
    } catch (error) {
      return error;
    }
  }
  static async getUser(params: any) {
    try {
      const user = (await collections.users?.findOne(params)) as any as User;
      return user;
    } catch (error) {
      return null;
    }
  }

  static async getAllUser() {
    try {
      const users = (await collections.users?.find({}).toArray()) as Array<any>;
      return users;
    } catch (error) {
      return null;
    }
  }

  static async updateUser(query: any, newUser: any) {
    try {
      const result = await collections.users?.updateOne(query, {
        $set: newUser,
      });
      return result;
    } catch (error) {
      return null;
    }
  }
}
