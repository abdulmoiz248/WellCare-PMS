// import { NextAuthOptions } from "next-auth";
 import CredentialsProvider from "next-auth/providers/credentials";
 import bcrypt from 'bcryptjs';
// import connect from "@/dbConfig/dbConfig";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import connect from "@/dbConfig/dbConfig";
import PatientModel from "@/Model/Patient";

// export const authOption: NextAuthOptions = {
//   providers: [
//     // Google Provider
//    
//     // Credentials Provider for username/password
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connect(); 

//         console.log(credentials)
//         return null;

//            },
//     }),
//   ],
//   session: {
//  C   strategy: "jwt", // Use JWT strategy for session
//   },
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page
//     error: "/auth/error",   // Custom error page
//   },
//   // callbacks: {
//   //   async jwt({ token, user }) {
//   //     if (user) {
//   //       token.id = user._id;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }) {
//   //     if (token) {
//   //       session.user.id = token.id;
//   //     }
//   //     return session;
//   //   },
//   // },
//   secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in your environment variables
// };


export const authOption:AuthOptions={
  providers:[
    GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    CredentialsProvider({
      name:'Credentials',
      credentials:{
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
       
        if (!credentials || !credentials.email) {
          throw new Error(`Credentials missing`);
        }
      
        try {
       
          await connect();
      
         
          const patient = await PatientModel.findOne({ email: credentials.email });
      
         
          if (!patient) {
          
            throw new Error('Patient not found');
          }
          let isValid =await bcrypt.compare(patient.password, credentials.password);
          if(!isValid){
            throw new Error('Incorrect password');
          }

          return patient;
          
        } catch (error: any) {
         
          throw new Error(error);
        }
      }
      

    })
      
  ],
  callbacks: {
        async jwt({ token, user }) {
          // if (user) {
          //   token.id = user._id;
          // }
          return token;
        },
        async session({ session, token }) {
          // if (token) {
          //   session.user.id = token.id;
          // }
          return session;
        },
      },
  pages: {
    signIn: "/patient/login"  
  },
  secret:process.env.nextAuth!
}