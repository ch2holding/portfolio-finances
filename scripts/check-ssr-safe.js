#!/usr/bin/env node

/**
 * Script customizado para validar SSR Safe no domain layer
 * Bloqueia uso de APIs do browser (window, document, localStorage) em src/domain/
 */

const fs = require("node:fs");
const path = require("node:path");

const RESTRICTED_GLOBALS = [
  "window",
  "document",
  "localStorage",
  "sessionStorage",
];
const DOMAIN_PATH = path.join(process.cwd(), "src/domain");

let hasErrors = false;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    RESTRICTED_GLOBALS.forEach((global) => {
      // Regex para detectar uso do global (não em strings ou comentários)
      const regex = new RegExp(`\\b${global}\\b(?!['":])`);

      if (
        regex.test(line) &&
        !line.trim().startsWith("//") &&
        !line.trim().startsWith("*")
      ) {
        console.error(`\n❌ SSR Safety Error in ${filePath}:${index + 1}`);
        console.error(`   Line: ${line.trim()}`);
        console.error(
          `   Error: Domain layer must be SSR safe. Do not use '${global}'.`,
        );
        console.error(
          `   Fix: Move browser-dependent code to UI components or use typeof ${global} !== 'undefined' checks.\n`,
        );
        hasErrors = true;
      }
    });
  });
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      checkFile(filePath);
    }
  });
}

console.log("🔍 Checking SSR safety in domain layer...\n");

if (fs.existsSync(DOMAIN_PATH)) {
  walkDirectory(DOMAIN_PATH);
}

if (hasErrors) {
  console.error("❌ SSR safety check failed!\n");
  process.exit(1);
} else {
  console.log("✅ All domain files are SSR safe!\n");
  process.exit(0);
}
