import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import AccessControl from "@/components/auth/AccessControl";
import I18nProvider from "@/components/base/i18nProvider";
import Providers from "@/components/base/Providers";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { authOptions } from "@/lib/auth";
import "@/config/validate-env";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu App com Auth",
  description: "Autenticação com Google",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <I18nProvider>
            <AccessControl session={session} />
            <Header session={session} />
            <main className="flex-1">{children}</main>
            <Footer />
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
