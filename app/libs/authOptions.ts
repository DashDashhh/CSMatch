import bcrypt from "bcrypt"
import {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"


import prisma from "@/app/libs/prismadb"

// Login

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('error1')
          throw new Error('Invalid credentials');
        }

        console.log(credentials.email)
        console.log(credentials.password)

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });


        if (!user) {
          console.log('User not found')
          throw new Error('Invalid User');
        }

        if (!user?.hashedPassword) {
          console.log('Password not found')
          throw new Error("Invalid Password")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          console.log('Password Is Incorrect')
          throw new Error("Incorrect Password")
        }
        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

