"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Stethoscope, GearSix, CircleNotch } from "@phosphor-icons/react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["patient", "doctor", "admin"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  initialRole?: string;
}

export default function LoginForm({ onSuccess, initialRole = "patient" }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: initialRole === "patient" ? "patient@curalink.health" : initialRole === "doctor" ? "doctor@curalink.health" : "admin@curalink.health",
      password: "password",
      role: initialRole as "patient" | "doctor" | "admin",
    },
  });

  const selectedRole = watch("role");

  const handleRoleChange = (role: "patient" | "doctor" | "admin") => {
    setValue("role", role);
    // Update default email for easier demo logging
    setValue("email", `${role}@curalink.health`);
  };

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: data.role,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Invalid credentials. Try using correct email & password combinations.");
      } else {
        if (onSuccess) onSuccess();
        router.push(`/dashboard/${data.role}`);
        router.refresh();
      }
    } catch (err) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Role Selector */}
      <div style={{ display: "flex", gap: 8, padding: 2, background: "var(--bg-tertiary)", borderRadius: 8 }}>
        {(["patient", "doctor", "admin"] as const).map((role) => {
          const isActive = selectedRole === role;
          return (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleChange(role)}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 12px",
                border: "none",
                borderRadius: 6,
                background: isActive ? "var(--bg-card)" : "transparent",
                color: isActive ? `var(--${role === "patient" ? "primary" : role === "doctor" ? "accent" : "purple"})` : "var(--text-muted)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                boxShadow: isActive ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s",
              }}
            >
              {role === "patient" ? (
                <User size={16} weight={isActive ? "fill" : "duotone"} />
              ) : role === "doctor" ? (
                <Stethoscope size={16} weight={isActive ? "fill" : "duotone"} />
              ) : (
                <GearSix size={16} weight={isActive ? "fill" : "duotone"} />
              )}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          );
        })}
      </div>

      {authError && (
        <div style={{ padding: 12, background: "var(--critical-glow)", color: "var(--critical)", borderRadius: 6, fontSize: "0.8125rem", border: "1px solid var(--critical-border)" }}>
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Email</label>
          <input
            {...register("email")}
            type="email"
            className="input"
            placeholder="name@company.com"
            style={{ width: "100%", borderColor: errors.email ? "var(--critical)" : "" }}
          />
          {errors.email && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem", marginTop: 2 }}>{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Password</label>
          <input
            {...register("password")}
            type="password"
            className="input"
            placeholder="••••••••"
            style={{ width: "100%", borderColor: errors.password ? "var(--critical)" : "" }}
          />
          {errors.password && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem", marginTop: 2 }}>{errors.password.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: "100%", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {loading ? (
            <>
              <CircleNotch size={18} className="animate-spin" />
              Signing In...
            </>
          ) : (
            `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`
          )}
        </button>

        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>
          Demo Credentials: Use password <strong>password</strong>
        </div>
      </form>
    </div>
  );
}
