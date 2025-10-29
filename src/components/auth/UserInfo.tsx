"use client";

import Image from "next/image";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserInfoProps {
  session: Session;
}

export default function UserInfo({ session }: UserInfoProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-md p-6">
      <div className="text-center">
        {/* Foto de Perfil */}
        <div className="mb-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "Foto de perfil"}
              width={100}
              height={100}
              className="rounded-full mx-auto border-4 border-primary/20"
              priority
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary mx-auto flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Informações do Usuário */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {session.user?.name || "Usuário"}
          </h2>
          <p className="text-sm text-muted-foreground break-all">
            {session.user?.email}
          </p>
        </div>

        {/* Badge de Status */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Online
          </span>
        </div>

        {/* Informações Adicionais */}
        <div className="mb-6 space-y-2 text-left bg-muted rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Membro desde:</span>
            <span className="font-medium text-foreground">
              {new Date().toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Último acesso:</span>
            <span className="font-medium text-foreground">Agora</span>
          </div>
        </div>

        {/* Botão de Logout */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sair da Conta
        </button>

        {/* Nota de Segurança */}
        <p className="text-xs text-muted-foreground mt-4">
          Sua sessão está protegida e criptografada
        </p>
      </div>
    </div>
  );
}
