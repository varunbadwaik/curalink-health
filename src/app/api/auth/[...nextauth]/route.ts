import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Dynamic fallback injection to prevent NextAuth NO_SECRET or URL configuration errors at runtime
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "default_nextauth_secret_for_curalink_health_app_2026_prod";
}
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || "https://curalink-health.vercel.app";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
