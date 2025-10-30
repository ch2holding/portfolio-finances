import { getClientEnv, getServerEnv } from "./env";

export function validateEnvOnStartup() {
  console.log("🔍 Validando variáveis de ambiente...");

  try {
    const clientEnv = getClientEnv();
    console.log("✅ Variáveis CLIENT validadas com sucesso");

    if (typeof window === "undefined") {
      const serverEnv = getServerEnv();
      console.log("✅ Variáveis SERVER validadas com sucesso");

      if (!serverEnv.OPENAI_API_KEY) {
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

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }

    throw error;
  }
}

if (process.env.SKIP_ENV_VALIDATION !== "true") {
  validateEnvOnStartup();
}
