import { getClientEnv, getServerEnv } from "./env";

export function validateEnvOnStartup() {
  const aiEnabled = process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES === "true";

  const isBuildTime = process.env.SKIP_ENV_VALIDATION === "true";

  console.log("🔍 Validando variáveis de ambiente...");

  try {
    const clientEnv = getClientEnv();
    console.log("✅ Variáveis CLIENT validadas com sucesso");

    if (typeof window === "undefined" && !isBuildTime) {
      const serverEnv = getServerEnv();
      console.log("✅ Variáveis SERVER validadas com sucesso");

      if (aiEnabled && !serverEnv?.OPENAI_API_KEY) {
        console.warn(
          "⚠️  OPENAI_API_KEY não configurada - Features de IA estarão desabilitadas",
        );
      }

      if (serverEnv.NODE_ENV === "production") {
        if (serverEnv.NEXTAUTH_DEBUG === "true") {
          console.warn("⚠️  NEXTAUTH_DEBUG está ativado em PRODUÇÃO!");
        }

        if (clientEnv.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
          console.error("❌ Firebase Emulator NÃO deve ser usado em PRODUÇÃO!");
          throw new Error("Configuração inválida para produção");
        }
      }
    } else if (isBuildTime) {
      console.log("⏭️  Validação SERVER pulada (build time)");
    }

    console.log("✅ Todas as validações passaram!\n");
    return true;
  } catch (error) {
    console.error(
      "\n❌ ERRO CRÍTICO: Falha na validação de variáveis de ambiente\n",
    );

    if (error instanceof Error) {
      console.error(error.message);
    }

    console.error("\n📖 Consulte CONFIGURATION.md para instruções de setup\n");

    if (process.env.NODE_ENV === "production" && !isBuildTime) {
      process.exit(1);
    }

    if (isBuildTime) {
      console.warn(
        "⚠️  Build continuará. Certifique-se de configurar env vars no runtime!",
      );
      return false;
    }

    throw error;
  }
}

if (process.env.SKIP_ENV_VALIDATION !== "true") {
  validateEnvOnStartup();
}
