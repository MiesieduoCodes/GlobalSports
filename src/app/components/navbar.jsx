"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";  
import { useLanguage } from "@/app/context/LanguageContext";
import { ModeToggle } from "@/app/components/mode-toggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Language translations
const translations = {
  en: {
    about: "About",
    ourClub: "Our Club",
    ourTeam: "Our Team",
    news: "News",
    contact: "Contact Us",
    administration: "Administration",
    clubHistory: "Club History",
    awards: "Awards",
    kidsClub: "Kids Club",
    globalSports: "Global Sports For All",
    partners: "Partners",
    theTeam: "The Team",
    squad: "Squad",
    coaches: "Coaches",
    matches: "Matches"
  },
  ru: {
    about: "О нас",
    ourClub: "Наш клуб",
    ourTeam: "Наша команда",
    news: "Новости",
    contact: "Связаться с нами",
    administration: "Администрация",
    clubHistory: "История клуба",
    awards: "Награды",
    kidsClub: "Детский клуб",
    globalSports: "Глобальные виды спорта для всех",
    partners: "Партнеры",
    theTeam: "Команда",
    squad: "Состав",
    coaches: "Тренеры",
    matches: "Матчи"
  },
  fr: {
    about: "À propos",
    ourClub: "Notre club",
    ourTeam: "Notre équipe",
    news: "Nouvelles",
    contact: "Contactez-nous",
    administration: "Administration",
    clubHistory: "Histoire du club",
    awards: "Récompenses",
    kidsClub: "Club des enfants",
    globalSports: "Sports mondiaux pour tous",
    partners: "Partenaires",
    theTeam: "L'équipe",
    squad: "Équipe",
    coaches: "Entraîneurs",
    matches: "Matchs"
  },
  es: {
    about: "Acerca de",
    ourClub: "Nuestro club",
    ourTeam: "Nuestro equipo",
    news: "Noticias",
    contact: "Contáctenos",
    administration: "Administración",
    clubHistory: "Historia del club",
    awards: "Premios",
    kidsClub: "Club de niños",
    globalSports: "Deportes globales para todos",
    partners: "Socios",
    theTeam: "El equipo",
    squad: "Plantilla",
    coaches: "Entrenadores",
    matches: "Partidos"
  }
};

// Navigation data
const Navdata = {
  navMain: [
    { titleKey: "about", url: "/about" },
    {
      titleKey: "ourClub",
      url: "#",
      items: [
        { titleKey: "administration", url: "/administration" },
        { titleKey: "clubHistory", url: "/clubhistory" },
        { titleKey: "awards", url: "/awards" },
        { titleKey: "kidsClub", url: "/kidscamp" },
        { titleKey: "globalSports", url: "/forall" },
        { titleKey: "partners", url: "/partners" },
      ],
    },
    {
      titleKey: "ourTeam",
      url: "#",
      items: [
        { titleKey: "theTeam", url: "/theteams" },
        { titleKey: "squad", url: "/squad" },
        { titleKey: "coaches", url: "/coaches" },
        { titleKey: "matches", url: "/matches" },
      ],
    },
    { titleKey: "news", url: "/news" },
    { titleKey: "contact", url: "/contact" },
  ],
};

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <nav className="fixed p-4 top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={closeMobileMenu}
        >
          <Image
            src="/images/LOGO-photoaidcom-cropped.jpg"
            alt="Global Sports FC Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Global Sports FC
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          {Navdata.navMain.map((item, index) => (
            <div key={index} className="relative group">
              {item.items ? (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        index === activeDropdown ? null : index
                      )
                    }
                    className="flex items-center px-4 py-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {translations[language][item.titleKey]}{" "}
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 min-w-[200px] z-50"
                      >
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.url}
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            {translations[language][subItem.titleKey]}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.url}
                  onClick={closeMobileMenu}
                  className="px-4 py-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {translations[language][item.titleKey]}
                </Link>
              )}
            </div>
          ))}
          <ModeToggle />
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="ml-4 p-2 border-none rounded"
          >
            <option value="en">English</option>
            <option value="ru">Pycckий</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {Navdata.navMain.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.items ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            index === activeDropdown ? null : index
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                      >
                        {translations[language][item.titleKey]}{" "}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4"
                        >
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.url}
                              onClick={closeMobileMenu}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                            >
                              {translations[language][subItem.titleKey]}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.url}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      {translations[language][item.titleKey]}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 py-2">
                <ModeToggle />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="ml-4 p-2 border rounded"
                >
                  <option value="en">English</option>
                  <option value="ru">Pycckий</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;