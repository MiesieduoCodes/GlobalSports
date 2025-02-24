"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/app/utils/animations";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      {/* Banners with updated colors and gradients */}
      <div
        id="banner-1"
        className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 z-50 fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 z-50 fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-gradient-to-b from-indigo-700 to-blue-800 z-50 fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-gradient-to-b from-blue-800 to-teal-600 z-50 fixed top-0 left-3/4 w-1/4"
      />

      {/* Children (page content) */}
      {children}
    </div>
  );
}