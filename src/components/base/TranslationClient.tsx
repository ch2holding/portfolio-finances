"use client";

import { useTranslations } from "next-intl";
import { capitalizeWord } from "@/utils/string";

interface TranslationClientProps {
  namespace: string;
  keyPath: string;
  values?: Record<string, string | number>;
  captilize?: "none" | "first" | "all";
  raw?: boolean;
}

export default function TranslationClient({
  namespace,
  keyPath,
  values,
  captilize = "none",
  raw = false,
}: TranslationClientProps) {
  const t = useTranslations(namespace);

  if (raw) {
    return t.raw(keyPath);
  }
  return captilize === "none"
    ? t(keyPath, values)
    : captilize === "first"
      ? capitalizeWord(t(keyPath, values))
      : t(keyPath, values).toUpperCase();
}
