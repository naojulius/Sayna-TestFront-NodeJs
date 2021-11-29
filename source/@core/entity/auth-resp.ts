import { ObjectId } from "mongodb";
import { Tokens } from "./tokens";

export class AuthResponse {
  error?: boolean;
  message?: string;
  tokens?: Tokens;

  constructor(message: string) {
    this.message = message;
  }
}
