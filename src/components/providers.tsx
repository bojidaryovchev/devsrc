import AuthProviders from "@/components/auth-providers";
import HtmlProviders from "@/components/html-providers";
import SafeThemeProviders from "@/components/safe-theme-providers";
import ThemeProviders from "@/components/theme-providers";
import ToasterProviders from "@/components/toaster-providers";
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
