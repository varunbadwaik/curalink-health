"use client";

import Link from "next/link";
import { Warning } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "24px",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      textAlign: "center"
    }}>
      <div className="animate-fade-in" style={{
        maxWidth: "400px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        padding: "40px 32px",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px"
      }}>
        <div style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "var(--warning-glow)",
          color: "var(--warning)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Warning size={32} weight="duotone" />
        </div>
        <div>
          <h1 className="heading-lg" style={{ marginBottom: "8px" }}>Page Not Found</h1>
          <p className="text-sm text-muted">
            The page you are looking for doesn&apos;t exist or has been moved to a new destination.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <Link href="/" className="btn btn-primary" style={{ flex: 1, textDecoration: "none" }}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
