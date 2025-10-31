"use client";

import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error("Dashboard error caught by boundary", error, {
      component: "DashboardErrorBoundary",
      digest: error.digest,
    });
  }, [error]);

  const getErrorMessage = (error: Error): string => {
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.";
    }

    if (
      error.message.includes("auth") ||
      error.message.includes("unauthorized")
    ) {
      return "Sua sessão expirou. Por favor, faça login novamente.";
    }

    if (error.message.includes("validation")) {
      return "Alguns dados estão inválidos. Por favor, verifique e tente novamente.";
    }

    return "Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.";
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Algo deu errado</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <details className="rounded-md border border-border bg-muted p-4">
              <summary className="cursor-pointer font-medium text-sm">
                Detalhes técnicos (apenas em desenvolvimento)
              </summary>
              <pre className="mt-2 overflow-auto text-xs">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="rounded-md border border-border bg-muted p-4 text-sm">
            <p className="font-medium">O que você pode fazer:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
              <li>Tente recarregar a página</li>
              <li>Verifique sua conexão com a internet</li>
              <li>Limpe o cache do navegador</li>
              <li>Entre em contato com o suporte se o problema persistir</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={reset} variant="default" className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="flex-1"
          >
            <Home className="mr-2 h-4 w-4" />
            Ir para início
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
