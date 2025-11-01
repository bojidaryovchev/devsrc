import { useTheme } from "next-themes";

export const useSafeTheme = (initialTheme: string) => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme ?? initialTheme;
};
