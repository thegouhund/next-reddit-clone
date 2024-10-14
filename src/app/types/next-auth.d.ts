import type { Subbedit, User as UserType } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user:  {
      id: string;
      username: string;
      subbedits: Subbedit[];
    } & DefaultSession["user"];
  }

  interface User extends UserType {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {
  }
}
