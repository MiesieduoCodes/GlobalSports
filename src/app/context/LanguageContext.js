"use client";

/* global localStorage */

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => useContext(LanguageContext);