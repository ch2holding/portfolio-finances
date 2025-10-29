"use client";

import Cookies from "js-cookie";
import { LanguagesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { LOCALE_KEY } from "@/constants";
import type { Locale } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  items: Array<{ value: string; label: string; icon: React.ReactNode }>;
};

export default function LocaleSwitcherSelect({ items }: Props) {
  const currentLocale = Cookies.get(LOCALE_KEY) as Locale;
  const router = useRouter();

  function onChange(value: string) {
    const locale = value as Locale;
    Cookies.set(LOCALE_KEY, locale);
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`p-1 rounded-md hover:bg-muted transition focus:border-none`}
      >
        <LanguagesIcon className="text-color focus:border-none" size={24} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="bg-color focus:border-none">
        {items.map((item) => (
          <DropdownMenuItem
            onClick={() => onChange(item.value)}
            key={item.value}
            disabled={item.value === currentLocale}
          >
            {item.icon} {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
