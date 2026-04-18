import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curalink — Unified Healthcare Experience",
  description: "AI-powered healthcare SaaS platform connecting patients, doctors, and healthcare organizations into one digital ecosystem.",
  keywords: ["healthcare", "SaaS", "AI", "medical", "patient portal", "care coordination"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
