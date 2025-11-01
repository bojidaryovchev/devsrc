import Providers from "@/components/providers";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants";
import "@/styles/index.css";
import type { Metadata } from "next";
import Script from "next/script";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <Providers>{children}</Providers>
    </>
  );
};

export default RootLayout;
