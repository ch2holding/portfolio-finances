import { z } from "zod";

// ==================== CLIENT ENV (públicas) ====================
const clientEnvSchema = z.object({
  // Firebase Client
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string()
    .min(1, "Firebase API Key é obrigatória"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase Auth Domain é obrigatório"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "Firebase Project ID é obrigatório"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),

  // App Config
  NEXT_PUBLIC_APP_URL: z.string().url("URL da aplicação deve ser válida"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "preview", "production"])
    .default("development"),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_AI_FEATURES: z.string().optional().default("true"),
  NEXT_PUBLIC_USE_FIREBASE_EMULATOR: z.string().optional().default("false"),
});

// ==================== SERVER ENV (privadas) ====================
const serverEnvSchema = z.object({
  // Firebase Admin
  FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "Firebase Project ID (server) é obrigatório"),
  FIREBASE_CLIENT_EMAIL: z
    .string()
    .email("Firebase Client Email deve ser válido"),
  FIREBASE_PRIVATE_KEY: z.string().min(1, "Firebase Private Key é obrigatória"),

  // NextAuth
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NextAuth Secret deve ter pelo menos 32 caracteres"),
  NEXTAUTH_URL: z.string().url("NextAuth URL deve ser válida"),
  NEXTAUTH_DEBUG: z.string().optional().default("false"),

  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID é obrigatório"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "Google Client Secret é obrigatório"),

  // AI / LLM
  OPENAI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().optional().default("gpt-4o-mini"),

  // Outras configs
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

// ==================== VALIDAÇÃO E EXPORT ====================

export function getClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_ENABLE_AI_FEATURES: process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES,
    NEXT_PUBLIC_USE_FIREBASE_EMULATOR:
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
  });

  if (!parsed.success) {
    console.error("❌ Erro na validação de variáveis de ambiente (CLIENT):");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Variáveis de ambiente inválidas (CLIENT)");
  }

  return parsed.data;
}

export function getServerEnv() {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() não pode ser chamado no browser!");
  }

  const parsed = serverEnvSchema.safeParse({
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_DEBUG: process.env.NEXTAUTH_DEBUG,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AI_MODEL: process.env.AI_MODEL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    console.error("❌ Erro na validação de variáveis de ambiente (SERVER):");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Variáveis de ambiente inválidas (SERVER)");
  }

  return parsed.data;
}

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

export function isFeatureEnabled(feature: keyof ClientEnv) {
  const env = getClientEnv();
  return env[feature] === "true";
}
