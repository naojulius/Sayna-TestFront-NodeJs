import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string | undefined,
    public dateNaissance: Date,
    public sexe: string,
    public _id: ObjectId
  ) {}
}
