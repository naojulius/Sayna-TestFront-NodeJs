import * as bcrypt from "bcrypt";
export const hashPass = (text: any): any => {
  const hashedPassword = bcrypt.hashSync(text, bcrypt.genSaltSync());
  return hashedPassword;
};

export const verify = (hash: any, text: any): boolean => {
  const doesPasswordMatch = bcrypt.compareSync(text, hash);
  return doesPasswordMatch;
};
