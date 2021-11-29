import User from "../model/user";

export const validateUser = (user: User): boolean => {
  let newInstanceOfUser = {
    firstname: "",
    lastname: "",
    dateNaissance: new Date(),
    email: "",
    password: "",
    sexe: "",
  } as User;

  let attributes = Object.keys(newInstanceOfUser);
  for (let index = 0; index < attributes.length; index++) {
    const element = attributes[index];
    if (!user.hasOwnProperty(element)) {
      return false;
    }
  }
  return true;
};

export const validateUserField = (user: User): boolean => {
  let attributes = Object.keys(user);
  for (let index = 0; index < attributes.length; index++) {
    if (Object.values(user).indexOf("".trim()) > -1) {
      return false;
    }
  }
  return true;
};
