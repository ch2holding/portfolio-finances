const http = require("node:http");

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const HEALTH_ENDPOINT = `${APP_URL}/health`;
const TIMEOUT_MS = 10000; // 10 segundos

console.log("🔍 Iniciando smoke test...\n");
console.log(`📍 URL: ${APP_URL}`);
console.log(`🏥 Health Check: ${HEALTH_ENDPOINT}\n`);

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.setTimeout(TIMEOUT_MS, () => {
      request.destroy();
      reject(new Error(`Request timeout after ${TIMEOUT_MS}ms`));
    });
  });
}

async function testHealthEndpoint() {
  console.log("✅ Testando /health endpoint...");

  try {
    const response = await httpGet(HEALTH_ENDPOINT);

    if (response.statusCode !== 200) {
      throw new Error(`Expected status 200, got ${response.statusCode}`);
    }
    console.log("   ✓ Status code: 200");

    let json;
    try {
      json = JSON.parse(response.body);
    } catch {
      throw new Error("Response is not valid JSON");
    }
    console.log("   ✓ Response is valid JSON");

    const requiredFields = ["status", "version", "env", "timestamp"];
    for (const field of requiredFields) {
      if (!Object.hasOwn(json, field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    console.log("   ✓ All required fields present");

    if (json.status !== "ok") {
      throw new Error(`Expected status "ok", got "${json.status}"`);
    }
    console.log('   ✓ Status is "ok"');

    if (!["development", "production", "unknown"].includes(json.env)) {
      throw new Error(`Invalid environment: ${json.env}`);
    }
    console.log(`   ✓ Environment: ${json.env}`);
    console.log(`   ✓ Version: ${json.version}`);

    const timestamp = new Date(json.timestamp);
    if (Number.isNaN(timestamp.getTime())) {
      throw new Error("Invalid timestamp format");
    }
    console.log("   ✓ Timestamp is valid ISO date");

    console.log("\n✅ Health check PASSED\n");
    return true;
  } catch (error) {
    console.error(`\n❌ Health check FAILED: ${error.message}\n`);
    return false;
  }
}

async function runSmokeTests() {
  const results = [];

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  results.push(await testHealthEndpoint());

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const passed = results.filter(Boolean).length;
  const total = results.length;

  if (passed === total) {
    console.log(`✅ Smoke test PASSED (${passed}/${total} tests)`);
    console.log("🎉 Application is healthy!\n");
    process.exit(0);
  } else {
    console.log(`❌ Smoke test FAILED (${passed}/${total} tests passed)`);
    console.log("⚠️  Application may not be working correctly.\n");
    process.exit(1);
  }
}

runSmokeTests().catch((error) => {
  console.error("\n❌ Smoke test crashed:", error.message);
  process.exit(1);
});
