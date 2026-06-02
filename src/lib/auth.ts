import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("DEBUG: auth.ts module loaded. NEXTAUTH_SECRET presence:", !!process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        console.log("Credentials received in authorize:", credentials);
        if (!credentials) return null;
        const { email, password, role } = credentials;

        // In production, you would authenticate with a real backend.
        // For this upgraded production dashboard, we provide robust mock authentication.
        if (password === "password" || password === "admin" || password === "doctor" || password === "patient") {
          if (email === "admin@curalink.health" && role === "admin") {
            return { id: "adm-1", name: "Admin User", email: "admin@curalink.health", role: "admin" };
          }
          if (email === "doctor@curalink.health" && role === "doctor") {
            return { id: "doc-1", name: "Dr. Sarah Chen", email: "doctor@curalink.health", role: "doctor" };
          }
          if (email === "patient@curalink.health" && role === "patient") {
            return { id: "pat-1", name: "John Smith", email: "patient@curalink.health", role: "patient" };
          }
        }
        console.log("Authentication failed for credentials:", email, role);
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "default_nextauth_secret_for_curalink_health_app_2026_prod",
};
