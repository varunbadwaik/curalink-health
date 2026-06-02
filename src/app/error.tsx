"use client";

import { useEffect } from "react";
import { Warning } from "@phosphor-icons/react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js runtime application error:", error);
  }, [error]);

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
          background: "var(--critical-glow)",
          color: "var(--critical)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Warning size={32} weight="duotone" />
        </div>
        <div>
          <h1 className="heading-lg" style={{ marginBottom: "8px" }}>System Error</h1>
          <p className="text-sm text-muted">
            An unexpected error occurred. Our engineering team has been notified.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <button onClick={() => reset()} className="btn btn-primary" style={{ flex: 1 }}>
            Retry
          </button>
          <a href="/" className="btn btn-ghost" style={{ flex: 1, textDecoration: "none" }}>
            Exit Portal
          </a>
        </div>
      </div>
    </div>
  );
}
