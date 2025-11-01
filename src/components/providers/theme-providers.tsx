import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";

const ThemeProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </>
  );
};

export default ThemeProviders;
