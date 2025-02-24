"use client";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import ThemeWrapper from "@/app/components/ThemeWrapper";
import { ThemeProvider } from "@/app/components/theme-provider";
import { LanguageProvider, useLanguage } from "@/app/context/LanguageContext";
import React from "react";
import { metadata } from "./metadata";

function LayoutWrapper({ children }) {
  const { language } = useLanguage(); // Get current language

  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen pt-24">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
          <ThemeWrapper>
          {children}
          </ThemeWrapper>
            </main>
          <Footer />
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
