import { ObjectId } from "mongodb";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  dateNaissance: Date;
  sexe: string;
}
