"use client";

import Ripple from "@/components/ripple";
import { useSafeThemeContext } from "@/contexts/safe-theme-context";
import { Theme } from "@/types/theme.enum";
import { setCookie } from "cookies-next";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitcher: React.FC = () => {
  const { theme } = useSafeThemeContext();
  const { setTheme } = useTheme();

  const clickHandler = () => {
    const otherTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(otherTheme);
    setCookie("theme", otherTheme, { path: "/" });
  };

  return (
    <>
      <button
        type="button"
        data-active={theme === Theme.LIGHT}
        onClick={clickHandler}
        className={
          "group relative rounded-md p-2 ring-[#ff6913] focus-visible:ring-2 focus-visible:outline-none dark:text-zinc-300"
        }
      >
        <Sun className={`group-data-[active="true"]:hidden`} />
        <Moon className={`hidden group-data-[active="true"]:block`} />
        <Ripple className="rounded-md" />
      </button>
    </>
  );
};

export default ThemeSwitcher;
