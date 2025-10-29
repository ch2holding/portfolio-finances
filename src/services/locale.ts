import { cookies } from "next/headers";
import { LOCALE_KEY } from "@/constants";
import { defaultLocale, type Locale } from "@/i18n/config";

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_KEY)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_KEY, locale);
}
