"use client";

import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("errors.404");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          {t("title")}
        </h2>
        <p className="mb-8 text-muted-foreground">{t("description")}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            {t("actions.home")}
          </Link>

          <Button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 py-3 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("actions.back")}
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            Se você acredita que isso é um erro,{" "}
            <Link href="/contact" className="underline hover:text-foreground">
              {t("actions.support")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
