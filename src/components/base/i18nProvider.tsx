import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { messagesMap } from "@/i18n/messages";

export default async function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const loadMessages = messagesMap[locale] || messagesMap["pt-BR"];
  const messages = (await loadMessages()).default;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Sao_Paulo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
