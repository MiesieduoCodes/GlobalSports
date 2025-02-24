"use client";

/* global setTimeout, clearTimeout */

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeWrapper({ children }) {
  const { theme } = useTheme();
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);

    // Cleanup function to clear timeout
    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div className={`transition-opacity duration-300 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}