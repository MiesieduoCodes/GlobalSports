"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { Menu, X } from "lucide-react";

const translations = {
  en: {
    home: "Home",
    about: "About",
    roster: "Roster",
    contact: "Contact",
    cta: "Get Tickets",
    city: "Almaty · Kazakhstan"
  },
  ru: {
    home: "Главная",
    about: "О клубе",
    roster: "Состав",
    contact: "Контакт",
    cta: "Билеты",
    city: "Алматы · Казахстан"
  }
};

const Navbar = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/about" },
    { name: t.roster, path: "/squad" },
    { name: t.contact, path: "/contact" }
  ];

  return (
    <>
      <nav className={`navbar flex items-center justify-between px-6 md:px-[60px] h-[72px] fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled ? 'bg-[rgba(8,12,24,0.95)] backdrop-blur-xl border-b border-[rgba(200,168,75,0.2)]' : 'bg-[rgba(8,12,24,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]'}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 no-underline group">
          <svg width="42" height="42" viewBox="0 0 90 90" fill="none">
            <path d="M45 5 L78 18 L78 52 Q78 72 45 85 Q12 72 12 52 L12 18 Z" fill="#172038" stroke="#C8A84B" strokeWidth="2.5" />
            <path d="M45 10 L72 21 L72 50 Q72 68 45 79 Q18 68 18 50 L18 21 Z" fill="none" stroke="rgba(0,174,239,0.15)" strokeWidth="1" />
            <text x="45" y="34" fontFamily="Bebas Neue, sans-serif" fontSize="13" fill="#C8A84B" textAnchor="middle" letterSpacing="1.5">VERIA</text>
            <text x="45" y="56" fontFamily="Bebas Neue, sans-serif" fontSize="26" fill="#F0EEE8" textAnchor="middle" letterSpacing="1">FC</text>
            <line x1="30" y1="62" x2="60" y2="62" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
            <text x="45" y="74" fontFamily="Bebas Neue, sans-serif" fontSize="10" fill="#00AEEF" textAnchor="middle" letterSpacing="2">ALMATY</text>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-bebas text-[22px] text-vwhite tracking-[2px] group-hover:text-vgold transition-colors">Veria FC</span>
            <span className="font-barlow-condensed text-[10px] font-bold tracking-[3px] uppercase text-vsky">{t.city}</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-barlow-condensed text-[13px] font-bold tracking-[2px] uppercase transition-all relative py-1 hover:text-vwhite ${isActive ? 'text-vgold' : 'text-vmuted'}`}
              >
                {link.name}
                <span className={`absolute bottom-[-4px] left-0 right-0 h-[2px] bg-vgold transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
              </Link>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-vgold text-vnavy px-5 py-2.5 rounded-[6px] font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase hover:bg-vgold-light transition-colors hidden sm:block"
          >
            {t.cta}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-vwhite hover:text-vgold transition-colors p-1"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[998] bg-vnavy transition-all duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`flex flex-col items-center justify-center h-full gap-8 px-6 transition-transform duration-500 ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-10'}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-bebas text-4xl tracking-[4px] uppercase transition-all ${isActive ? 'text-vgold scale-110' : 'text-vwhite/60 hover:text-vwhite'}`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 bg-vgold text-vnavy px-10 py-4 rounded-[12px] font-barlow-condensed font-bold text-[16px] tracking-[3px] uppercase hover:bg-vgold-light transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>

      {/* Kazakh Flag Strip */}
      <div className="flag-strip">
        <div className="flex-1 bg-vsky" />
        <div className="w-[80px] bg-vgold" />
      </div>
    </>
  );
};

export default Navbar;