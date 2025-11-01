import AuthProviders from "@/components/providers/auth-providers";
import HtmlProviders from "@/components/providers/html-providers";
import SafeThemeProviders from "@/components/providers/safe-theme-providers";
import ThemeProviders from "@/components/providers/theme-providers";
import ToasterProviders from "@/components/providers/toaster-providers";
import React, { PropsWithChildren } from "react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HtmlProviders>
        <AuthProviders>
          <ThemeProviders>
            <SafeThemeProviders>
              <ToasterProviders>{children}</ToasterProviders>
            </SafeThemeProviders>
          </ThemeProviders>
        </AuthProviders>
      </HtmlProviders>
    </>
  );
};

export default Providers;
