import { EUser } from "../entities/euser";
import * as EmailValidator from "email-validator";

export class UserHelper {
  static validateUser(user: EUser): boolean {
    let newUserInstance: EUser = new EUser();
    let attributes = Object.keys(newUserInstance);
    for (let index = 0; index < attributes.length; index++) {
      const element = attributes[index];
      if (!user.hasOwnProperty(element)) {
        return false;
      }
    }
    return true;
  }
  static validateUserField(user: EUser): boolean {
    let attributes = Object.keys(user);
    for (let index = 0; index < attributes.length; index++) {
      if (Object.values(user).indexOf("".trim()) > -1) {
        return false;
      }
    }
    return true;
  }

  static validateUserEmail(email?: string): boolean{
    if (!EmailValidator.validate(email!)) {
      return false;
    }
    return true;
  }
}

// export const validateUser = (user: User): boolean => {
//   let newInstanceOfUser = {
//     firstname: "",
//     lastname: "",
//     dateNaissance: new Date(),
//     email: "",
//     password: "",
//     sexe: "",
//   } as User;

//   let attributes = Object.keys(newInstanceOfUser);
//   for (let index = 0; index < attributes.length; index++) {
//     const element = attributes[index];
//     if (!user.hasOwnProperty(element)) {
//       return false;
//     }
//   }
//   return true;
// };

// export const validateUserField = (user: User): boolean => {
//   let attributes = Object.keys(user);
//   for (let index = 0; index < attributes.length; index++) {
//     if (Object.values(user).indexOf("".trim()) > -1) {
//       return false;
//     }
//   }
//   return true;
// };
