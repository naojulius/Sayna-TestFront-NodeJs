import { ObjectId } from "mongodb";

export class EUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  dateNaissance?: Date;
  sexe?: string;
  _id?: ObjectId;
}
