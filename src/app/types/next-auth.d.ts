import type { User as UserType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }

  interface User extends UserType {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}
