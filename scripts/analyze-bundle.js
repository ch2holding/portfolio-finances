const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

// Cores para output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(2)}KB`;
}

const THRESHOLDS = {
  clientBundle: 200 * 1024, // 200KB
  chunk: 100 * 1024, // 100KB
  initial: 300 * 1024, // 300KB
};

async function analyzeBundle() {
  log("\n📊 Iniciando análise de bundle...\n", "cyan");

  try {
    log("🔨 Building production bundle...", "blue");
    execSync("set ANALYZE=true && pnpm build", { stdio: "inherit" });

    const statsPath = path.join(process.cwd(), ".next/analyze/stats.json");

    if (!fs.existsSync(statsPath)) {
      log(
        "\n⚠️  stats.json não encontrado. Análise visual gerada apenas.\n",
        "yellow",
      );
      return;
    }

    const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));

    log("\n📦 Análise de Assets:\n", "cyan");

    const assets = stats.assets || [];
    let totalSize = 0;
    let clientSize = 0;
    const largeAssets = [];

    assets.forEach((asset) => {
      totalSize += asset.size;

      if (asset.name.includes("/client/")) {
        clientSize += asset.size;
      }

      if (asset.size > THRESHOLDS.chunk) {
        largeAssets.push(asset);
      }
    });

    log(`Total de assets: ${assets.length}`, "blue");
    log(`Tamanho total: ${formatBytes(totalSize)}`, "blue");
    log(`Client bundle: ${formatBytes(clientSize)}`, "blue");

    log("\n✅ Validações:\n", "cyan");

    if (clientSize > THRESHOLDS.clientBundle) {
      log(
        `❌ Client bundle MUITO GRANDE: ${formatBytes(clientSize)} (max: ${formatBytes(
          THRESHOLDS.clientBundle,
        )})`,
        "red",
      );
    } else {
      log(`✅ Client bundle OK: ${formatBytes(clientSize)}`, "green");
    }

    if (largeAssets.length > 0) {
      log(
        `\n⚠️  Assets grandes (> ${formatBytes(THRESHOLDS.chunk)}):\n`,
        "yellow",
      );
      largeAssets.forEach((asset) => {
        log(`  - ${asset.name}: ${formatBytes(asset.size)}`, "yellow");
      });
    }

    log("\n💡 Recomendações:\n", "cyan");

    if (clientSize > THRESHOLDS.clientBundle * 0.8) {
      log("  • Considere code splitting adicional", "yellow");
      log("  • Verifique imports desnecessários", "yellow");
      log("  • Use dynamic imports para componentes pesados", "yellow");
    }

    if (largeAssets.length > 0) {
      log("  • Assets grandes encontrados - considere:", "yellow");
      log("    - Dynamic imports", "yellow");
      log("    - Tree shaking", "yellow");
      log("    - Bibliotecas mais leves", "yellow");
    }

    if (stats.modules) {
      const heavyModules = stats.modules
        .filter((m) => m.size > 50 * 1024)
        .sort((a, b) => b.size - a.size)
        .slice(0, 10);

      if (heavyModules.length > 0) {
        log("\n📚 Top 10 Módulos Pesados:\n", "cyan");
        heavyModules.forEach((module, i) => {
          log(
            `  ${i + 1}. ${module.name}: ${formatBytes(module.size)}`,
            "blue",
          );
        });
      }
    }

    log("\n✅ Análise completa!\n", "green");
    log(
      "📊 Abra .next/analyze/client.html para visualização detalhada\n",
      "cyan",
    );
  } catch (error) {
    log("\n❌ Erro durante análise:", "red");
    console.error(error);
    process.exit(1);
  }
}

analyzeBundle().catch((error) => {
  console.error(error);
  process.exit(1);
});
