import { faker } from "@faker-js/faker";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import prisma from "./config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!existingUser) {
        const username = `${faker.word.adjective()}${faker.person.firstName().replace(/\W/, "")}${faker.number.int(99)}`;

        await prisma.user.create({
          data: {
            username,
            email: user.email as string,
            profilePicUrl: user.image as string,
          },
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.username = dbUser.username;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const subbedits = await prisma.userSubbedit.findMany({
          where: { userId: token.id as number },
          include: {
            Subbedit: true,
          },
        });

        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.subbedits = subbedits.map((us) => us.Subbedit);
      }
      return session;
    },
  },
});
