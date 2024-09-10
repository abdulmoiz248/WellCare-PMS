import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connect from "@/dbConfig/dbConfig";
import GoogleProvider from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider for username/password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect(); 

        console.log(credentials)
        return null;

           },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy for session
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",   // Custom error page
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user._id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id;
  //     }
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in your environment variables
};
