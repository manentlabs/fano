import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          console.log("=== LOGIN ATTEMPT ===");
          console.log("Credentials:", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("Email atau password kosong");
            return null;
          }

          const [rows] = await pool.execute(
            `
            SELECT
              id,
              email,
              password,
              name,
              role
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [credentials.email]
          );

          const users = rows as any[];

          console.log("Rows Found:", users.length);

          if (users.length === 0) {
            console.log("User tidak ditemukan");
            return null;
          }

          const user = users[0];

          console.log("User Found:", {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          });

          console.log("Password Hash:", user.password);

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Password Valid:", isValid);

          if (!isValid) {
            console.log("Password tidak cocok");
            return null;
          }

          console.log("Login berhasil");

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("AUTH ERROR:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };