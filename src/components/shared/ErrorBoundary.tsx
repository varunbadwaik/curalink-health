"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Warning } from "@phosphor-icons/react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          padding: "24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "12px",
          textAlign: "center",
          gap: "16px"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--critical-glow)",
            color: "var(--critical)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Warning size={24} weight="duotone" />
          </div>
          <div>
            <h3 className="heading-sm" style={{ marginBottom: "4px" }}>Something went wrong</h3>
            <p className="text-sm text-muted">A rendering error occurred in this dashboard section.</p>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry Loading
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
