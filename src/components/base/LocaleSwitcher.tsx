import { BR, US } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");

  return (
    <LocaleSwitcherSelect
      items={[
        {
          value: "en",
          label: t("en"),
          icon: <US />,
        },
        {
          value: "pt-BR",
          label: t("pt-BR"),
          icon: <BR />,
        },
      ]}
    />
  );
}
