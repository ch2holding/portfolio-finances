const formats = {
  en: "MM/dd/yyyy",
  es: "dd/MM/yyyy",
  "pt-BR": "dd/MM/yyyy",
};

export const getLocaleDateString = (locale: string | null): string => {
  return typeof locale === "string" && locale in formats
    ? formats[locale as keyof typeof formats]
    : formats["pt-BR"];
};

export const formatHour = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const formatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formatted;
};
