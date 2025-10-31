import { Bot, Shield } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { authOptions } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("auth.signIn");

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-8 w-8" />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="mb-6">
            <GoogleSignInButton />
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("noAccount")} </span>
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:underline"
            >
              {t("createAccount")}
            </Link>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>
              {t("terms")}{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                {t("termsLink")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                {t("privacyLink")}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>{t("secure")}</span>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
