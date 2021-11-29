import { Schema } from "mongoose";
import { IUser } from "../Interfaces/iuser";

export const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  email: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  sexe: { type: String, required: true },
});
