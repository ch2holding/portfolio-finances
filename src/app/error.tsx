"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { logSafeError } from "@/lib/safe-error";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("errors.serverError");

  useEffect(() => {
    logSafeError(error, "GlobalErrorBoundary");
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">
          {t("title")}
        </h1>

        <p className="mb-2 text-muted-foreground">{t("description")}</p>

        {isDevelopment && (
          <div className="my-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-destructive">
              {t("devMode.label")}
            </p>
            <p className="text-xs font-mono text-muted-foreground break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            {t("actions.tryAgain")}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 py-3 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            {t("actions.goHome")}
          </Link>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            {t("supportText.prefix")}{" "}
            <Link href="/support" className="underline hover:text-foreground">
              {t("supportText.link")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
