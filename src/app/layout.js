"use client";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import ThemeWrapper from "@/app/components/ThemeWrapper";
import { ThemeProvider } from "@/app/components/theme-provider";
import { LanguageProvider, useLanguage } from "@/app/context/LanguageContext";
import { usePathname } from "next/navigation";
import React from "react";
import { metadata } from "./metadata";

function LayoutWrapper({ children }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* Google Fonts — loaded directly in head for guaranteed rendering */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Barlow:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme={isAdmin ? undefined : "dark"}
          enableSystem={false}
          disableTransitionOnChange
        >
          {!isAdmin && <Navbar />}
          <main className="flex-1">
            <ThemeWrapper>
              {children}
            </ThemeWrapper>
          </main>
          {!isAdmin && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </LanguageProvider>
  );
}
