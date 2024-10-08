import { DefaultSession } from "next-auth";
import { UserModel } from "./model";

declare module "next-auth" {
  interface Session {
    user: UserModel & DefaultSession["user"];
  }

  interface User extends UserModel {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserModel {}
}
