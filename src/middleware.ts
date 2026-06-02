import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Role-based authorization check
    if (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/dashboard/doctor") && token?.role !== "doctor") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/dashboard/patient") && token?.role !== "patient") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    secret: process.env.NEXTAUTH_SECRET || "default_nextauth_secret_for_curalink_health_app_2026_prod",
  }
);

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/doctor/:path*",
    "/dashboard/patient/:path*",
  ],
};
