import { z } from "zod";

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").optional().or(z.literal("")),
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL").optional().or(z.literal("")),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

// Run validation
const getEnv = () => {
  const defaultSecret = "default_nextauth_secret_for_curalink_health_app_2026_prod";
  const defaultUrl = "https://curalink-health.vercel.app";

  const rawEnv = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || defaultSecret,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.VERCEL_URL || defaultUrl,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || defaultUrl,
    NODE_ENV: process.env.NODE_ENV || "development",
  };

  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.warn("⚠️ Non-critical warning: Invalid environment variables:", parsed.error.format());
    return rawEnv;
  }

  return parsed.data;
};

export const env = getEnv();
export default env;
