"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Tipos de erro do NextAuth
const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: "Erro de Configuração",
    description:
      "Há um problema na configuração do servidor. Entre em contato com o suporte.",
  },
  AccessDenied: {
    title: "Acesso Negado",
    description:
      "Você não tem permissão para acessar este recurso. Verifique suas credenciais.",
  },
  Verification: {
    title: "Erro de Verificação",
    description:
      "O token de verificação expirou ou já foi usado. Solicite um novo link.",
  },
  OAuthSignin: {
    title: "Erro ao Iniciar Login OAuth",
    description:
      "Não foi possível iniciar o processo de autenticação com o provedor. Tente novamente.",
  },
  OAuthCallback: {
    title: "Erro no Callback OAuth",
    description:
      "Ocorreu um erro ao processar a resposta do provedor de autenticação.",
  },
  OAuthCreateAccount: {
    title: "Erro ao Criar Conta OAuth",
    description:
      "Não foi possível criar uma conta com este provedor. Tente usar outro método.",
  },
  EmailCreateAccount: {
    title: "Erro ao Criar Conta",
    description:
      "Não foi possível criar uma conta com este email. Ele pode já estar em uso.",
  },
  Callback: {
    title: "Erro no Callback",
    description:
      "Ocorreu um erro durante o processo de autenticação. Tente novamente.",
  },
  OAuthAccountNotLinked: {
    title: "Conta não Vinculada",
    description:
      "Este email já está associado a outra conta. Use o método de login original.",
  },
  EmailSignin: {
    title: "Erro ao Enviar Email",
    description:
      "Não foi possível enviar o email de verificação. Verifique seu endereço de email.",
  },
  CredentialsSignin: {
    title: "Credenciais Inválidas",
    description:
      "Email ou senha incorretos. Verifique suas credenciais e tente novamente.",
  },
  SessionRequired: {
    title: "Sessão Necessária",
    description:
      "Você precisa estar autenticado para acessar esta página. Faça login primeiro.",
  },
  Default: {
    title: "Erro de Autenticação",
    description:
      "Ocorreu um erro inesperado durante a autenticação. Tente novamente mais tarde.",
  },
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";

  const errorInfo = errorMessages[error] || errorMessages.Default;

  // Ícone baseado no tipo de erro
  const getErrorIcon = () => {
    if (error === "AccessDenied" || error === "OAuthAccountNotLinked") {
      return (
        <svg
          className="w-20 h-20 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    }

    if (
      error === "Configuration" ||
      error === "OAuthSignin" ||
      error === "OAuthCallback"
    ) {
      return (
        <svg
          className="w-20 h-20 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-20 h-20 text-orange-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50 to-orange-100">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        {/* Ícone de Erro */}
        <div className="mb-6 flex justify-center">{getErrorIcon()}</div>

        {/* Título do Erro */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {errorInfo.title}
        </h1>

        {/* Descrição do Erro */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          {errorInfo.description}
        </p>

        {/* Código do Erro (para desenvolvedores) */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <p className="text-xs text-gray-500 mb-1">Código do erro:</p>
          <code className="text-sm font-mono text-gray-800 font-semibold">
            {error}
          </code>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Tentar Novamente
          </Link>

          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Voltar para Home
          </Link>
        </div>

        {/* Ajuda Adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Precisa de ajuda?</p>
          <a
            href="mailto:suporte@exemplo.com"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Contate o suporte
          </a>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-600">
        Se o problema persistir, limpe o cache do navegador e tente novamente
      </p>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </main>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
