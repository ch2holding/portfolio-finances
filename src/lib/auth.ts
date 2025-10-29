import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * Augment NextAuth types to include `id` on the user object inside Session and User,
 * and to allow storing `id` on the JWT token.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Habilitar debug em desenvolvimento
  debug: process.env.NEXTAUTH_DEBUG === "true",

  pages: {
    signIn: "/",
    error: "/auth/error",
  },

  callbacks: {
    // Callback executado quando o usuário tenta fazer login
    async signIn({ user, account, profile, email, credentials }) {
      if (process.env.NEXTAUTH_DEBUG === "true") {
        console.log("========== SIGNIN CALLBACK ==========");
        console.log("User:", user);
        console.log("Email:", email);
        console.log("Credentials:", credentials);
        console.log("Account:", account);
        console.log("Profile:", profile);
        console.log("=====================================");
      }

      // IMPORTANTE: Retornar true permite o login
      // Retornar false ou string redireciona para erro
      return true;
    },

    // Callback do JWT
    async jwt({ token, user, account, profile }) {
      if (process.env.NEXTAUTH_DEBUG === "true") {
        console.log("========== JWT CALLBACK ==========");
        console.log("Token:", token);
        console.log("User:", user);
        console.log("Account:", account);
        console.log("Profile:", profile);
        console.log("==================================");
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // Callback da sessão
    async session({ session, token }) {
      if (process.env.NEXTAUTH_DEBUG === "true") {
        console.log("========== SESSION CALLBACK ==========");
        console.log("Session:", session);
        console.log("Token:", token);
        console.log("======================================");
      }

      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  // Configurações adicionais
  session: {
    strategy: "jwt",
  },
};
