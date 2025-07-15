"use client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.layer.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { shadcnTheme } from "@/theme/theme";
import { shadcnCssVariableResolver } from "@/theme/cssVariableResolver";
import "@/theme/style.css";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={shadcnTheme}
            cssVariablesResolver={shadcnCssVariableResolver}
            defaultColorScheme={"light"}
          >
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
