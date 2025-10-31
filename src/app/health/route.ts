import { NextResponse } from "next/server";
import { isDevelopment, isProduction } from "@/config/env";

export async function GET() {
  try {
    const environment = isProduction()
      ? "production"
      : isDevelopment()
        ? "development"
        : "unknown";

    const version = process.env.npm_package_version || "unknown";

    return NextResponse.json(
      {
        status: "ok",
        version,
        env: environment,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        version: "unknown",
        env: "unknown",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
