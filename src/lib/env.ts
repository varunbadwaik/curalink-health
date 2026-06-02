import { z } from "zod";

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").optional().or(z.literal("")),
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL").optional().or(z.literal("")),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

// Run validation
const getEnv = () => {
  // Allow fallbacks in development/test environments
  const isDevOrTest = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
  
  const rawEnv = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || (isDevOrTest ? "mock-secret-key-12345-for-local-testing" : ""),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || (isDevOrTest ? "http://localhost:3000" : ""),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || (isDevOrTest ? "http://localhost:3000" : ""),
    NODE_ENV: process.env.NODE_ENV,
  };

  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables. Build stopped.");
    }
    return rawEnv;
  }

  return parsed.data;
};

export const env = getEnv();
export default env;
