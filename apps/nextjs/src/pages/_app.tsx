// src/pages/_app.tsx
import "../styles/globals.css";
import React from "react";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PwaMeta } from "components";
import { ThemeProvider } from "next-themes";
import { api } from "utils";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { cn } from "@acme/ui";

export const fontSans = Inter({
  variable: "--font-sans",
  adjustFontFallback: true,
  display: "optional",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  preload: true,
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <ClerkProvider {...pageProps}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <PwaMeta />
        </Head>
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          enableSystem={false}
        >
          <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
          <main className={cn(fontSans.variable, "font-sans")}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </ClerkProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
