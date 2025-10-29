"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const currentTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "light";

  return (
    <>
      {mounted && (
        <button
          type="button"
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          className="p-1"
        >
          {currentTheme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      )}
    </>
  );
}
