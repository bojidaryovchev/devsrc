"use client";

import { DEFAULT_THEME } from "@/constants";
import { useSafeTheme } from "@/hooks/use-safe-theme";
import { Theme } from "@/types/theme.enum";

export interface CalendlyThemeColors {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
}

/**
 * Hook to get Calendly theme colors based on current app theme
 * Returns hex colors without the # prefix (as Calendly expects)
 */
export const useCalendlyTheme = (): CalendlyThemeColors => {
  const theme = useSafeTheme(DEFAULT_THEME);

  if (theme === Theme.DARK) {
    return {
      backgroundColor: "1a1a1a", // Dark background
      textColor: "e5e5e5", // Light text
      primaryColor: "6366f1", // Indigo primary
    };
  }

  // Light theme
  return {
    backgroundColor: "ffffff", // White background
    textColor: "4d5055", // Dark text
    primaryColor: "0069ff", // Blue primary
  };
};
