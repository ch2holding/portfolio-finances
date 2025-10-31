import {
  ArrowRight,
  BarChart3,
  Bot,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export const revalidate = 3600; // ISR: 1 hora

export default async function HomePage() {
  const t = await getTranslations();

  const features = [
    {
      icon: CreditCard,
      title: t("features.accounts.title"),
      description: t("features.accounts.description"),
    },
    {
      icon: BarChart3,
      title: t("features.transactions.title"),
      description: t("features.transactions.description"),
    },
    {
      icon: PiggyBank,
      title: t("features.budgets.title"),
      description: t("features.budgets.description"),
    },
    {
      icon: TrendingUp,
      title: t("features.investments.title"),
      description: t("features.investments.description"),
    },
    {
      icon: Bot,
      title: t("features.ai.title"),
      description: t("features.ai.description"),
    },
    {
      icon: Trophy,
      title: t("features.gamification.title"),
      description: t("features.gamification.description"),
    },
  ];

  const stats = [
    { value: "10k+", label: t("hero.stats.users") },
    { value: "1M+", label: t("hero.stats.transactions") },
    { value: "30%", label: t("hero.stats.savings") },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Bot className="h-4 w-4" />
              {t("hero.subtitle")}
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/auth/signin">
                  {t("hero.cta.primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="#features">{t("hero.cta.secondary")}</Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      <section id="features" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("hero.cta.ready")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            {t("hero.cta.readyDescription")}
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/auth/signin">
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
