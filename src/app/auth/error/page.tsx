"use client";

import { AlertTriangle, ShieldAlert, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const t = useTranslations("auth.error");

  const getErrorIcon = () => {
    if (
      error === "AccessDenied" ||
      error === "OAuthAccountNotLinked" ||
      error === "SessionRequired"
    ) {
      return <ShieldAlert className="h-20 w-20 text-yellow-500" />;
    }

    if (
      error === "Configuration" ||
      error === "OAuthSignin" ||
      error === "OAuthCallback" ||
      error === "OAuthCreateAccount" ||
      error === "EmailCreateAccount"
    ) {
      return <XCircle className="h-20 w-20 text-red-500" />;
    }

    return <AlertTriangle className="h-20 w-20 text-orange-500" />;
  };

  const errorMessage = t(`errors.${String(error)}`, {
    defaultValue: t("errors.Default"),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50/50 via-background to-orange-50/50 dark:from-red-950/10 dark:via-background dark:to-orange-950/10">
      <div className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="mb-6 flex justify-center">{getErrorIcon()}</div>

        <h1 className="text-3xl font-bold mb-4 text-foreground">
          {t("title")}
        </h1>

        <p className="text-muted-foreground mb-2 leading-relaxed">
          {t("subtitle")}
        </p>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {errorMessage}
        </p>

        <div className="bg-muted rounded-lg p-4 mb-8">
          <p className="text-xs text-muted-foreground mb-1">
            {t("errorCode")}:
          </p>
          <code className="text-sm font-mono text-foreground font-semibold">
            {error}
          </code>
        </div>

        <div className="space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/auth/signin">{t("tryAgain")}</Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">{t("backToHome")}</Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">{t("needHelp")}</p>
          <Link
            href="/contact"
            className="text-sm text-primary hover:text-primary/80 underline font-medium"
          >
            {t("contactSupport")}
          </Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground text-center max-w-md">
        {t("troubleshoot")}
      </p>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
