import LoginButton from "@/components/auth/LoginButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="bg-card border border-border p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-primary-foreground"
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Bem-vindo!
          </h1>
          <p className="text-muted-foreground mb-8">
            Faça login com sua conta Google para acessar o sistema
          </p>
        </div>

        <LoginButton />

        <p className="text-sm text-muted-foreground mt-6">
          Ao fazer login, você concorda com nossos termos de uso
        </p>
      </div>
    </main>
  );
}
