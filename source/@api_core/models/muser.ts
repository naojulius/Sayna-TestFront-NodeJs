import { model } from "mongoose";
import { IUser } from "../Interfaces/iuser";
import { userSchema } from "../scemas/suser";

export const UserModel = model<IUser>("User", userSchema);
