import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import { Adapter } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "./auth/actions/auth-actions"


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    //2 Proveedores de Autentificacion
    Google,
    GitHub,
    //Configurar las Credenciales
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const user = await signInEmailPassword(credentials.email as string, credentials.password as string)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return user
      },
    }),

  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user });
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // console.log({ token });
      const dbUser = await prisma.user.findUnique(
        {
          where:
            { email: token.email ?? 'no-email' }
        }
      );

      if (dbUser?.isActive === false) {
        throw Error('Usuario no esta Activo')

      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token;

    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles as string[];
        session.user.id = token.id as string;

      }
      console.log({ token });
      return session;
    }

  }
})