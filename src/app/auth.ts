import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { User } from "./db/model";
import { faker } from "@faker-js/faker";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await User.findOne({ where: { email: user.email } });

      if (!existingUser) {
        const username = `${faker.word.adjective()}${faker.person.firstName().replace(/\W/, "")}${faker.number.int(99)}`;

        await User.create({
          username,
          email: user.email,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ where: { email: token.email } });

        if (dbUser) {
          token.id = dbUser.id;
          token.username = dbUser.username;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;

      return session;
    },
  },
});
