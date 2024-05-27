import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1234567899",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      //TODO: User credentials type from next-auth
      async authorize(credentials: any) {
        //TODO: Add Zod validation can add otp validation

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }
        try {
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
          };
        } catch (err) {
          console.error(err);
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "mysecret",

  callbacks: {
    async session({ token, session }: any) {
      if (session && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
