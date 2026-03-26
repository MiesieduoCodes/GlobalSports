"use client";
import { ThemeProvider } from "@/app/components/theme-provider";

export default function AdminLayout({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
