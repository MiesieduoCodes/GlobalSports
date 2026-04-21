"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    brandName: "VE-GLOBALSPORTS FC · Almaty",
    tagline: <>Kazakhstan Premier League · Центральный Стадион<br />Founded by Veria Lawrence Ebiks<br />Almaty, Kazakhstan</>,
    col1Title: "Navigate",
    col1Links: [
      { name: "Home", href: "/" },
      { name: "About The Club", href: "/about" },
      { name: "First Team Roster", href: "/squad" },
      { name: "Contact & Address", href: "/contact" }
    ],
    col2Title: "The Club",
    col2Links: [
      { name: "KPL Fixtures", href: "/matches" },
      { name: "Match Tickets", href: "/contact" },
      { name: "Club Shop", href: "#" },
      { name: "Media", href: "/videos" }
    ],
    col3Title: "Academy",
    col3Links: [
      { name: "VE-GLOBALSPORTS Academy", href: "/kidscamp" },
      { name: "Youth Fixtures", href: "#" },
      { name: "Enroll Your Child", href: "/kidscamp" },
      { name: "Coaching Staff", href: "/coaches" }
    ],
    copy: "© 2026 VE-GLOBALSPORTS FC · Almaty, Kazakhstan. All rights reserved.",
    subscribe: "Subscribe to Newsletter"
  },
  ru: {
    brandName: "ВЕ-ГЛОБАЛСПОРТС ФК · Алматы",
    tagline: <>Премьер-лига Казахстана · Центральный Стадион<br />Основано Верией Лоуренсом Эбиксом<br />Алматы, Казахстан</>,
    col1Title: "Навигация",
    col1Links: [
      { name: "Главная", href: "/" },
      { name: "О клубе", href: "/about" },
      { name: "Состав команды", href: "/squad" },
      { name: "Контактная информация", href: "/contact" }
    ],
    col2Title: "Клуб",
    col2Links: [
      { name: "Матчи КПЛ", href: "/matches" },
      { name: "Билеты", href: "/contact" },
      { name: "Магазин", href: "#" },
      { name: "Медиа", href: "/videos" }
    ],
    col3Title: "Академия",
    col3Links: [
      { name: "Академия VE-GLOBALSPORTS", href: "/kidscamp" },
      { name: "Новости молодежи", href: "#" },
      { name: "Записать ребенка", href: "/kidscamp" },
      { name: "Тренерский штаб", href: "/coaches" }
    ],
    copy: "© 2026 ВЕ-ГЛОБАЛСПОРТС ФК · Алматы, Казахстан. Все права защищены.",
    subscribe: "Подписаться на рассылку"
  }
};

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        { user_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ""
      );
      setEmail("");
      alert("Success!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-vnavy border-t border-white/5 px-6 md:px-[60px] pt-[50px] pb-[30px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-10">

          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 90 90" fill="none">
                <path d="M45 5 L78 18 L78 52 Q78 72 45 85 Q12 72 12 52 L12 18 Z" fill="#172038" stroke="#C8A84B" strokeWidth="2.5" />
                <path d="M45 10 L72 21 L72 50 Q72 68 45 79 Q18 68 18 50 L18 21 Z" fill="none" stroke="rgba(0,174,239,0.15)" strokeWidth="1" />
                <text x="45" y="34" fontFamily="Bebas Neue, sans-serif" fontSize="7.5" fill="#C8A84B" textAnchor="middle" letterSpacing="0.5">VE-GLOBALSPORTS</text>
                <text x="45" y="56" fontFamily="Bebas Neue, sans-serif" fontSize="26" fill="#F0EEE8" textAnchor="middle" letterSpacing="1">FC</text>
                <line x1="30" y1="62" x2="60" y2="62" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
                <text x="45" y="74" fontFamily="Bebas Neue, sans-serif" fontSize="10" fill="#00AEEF" textAnchor="middle" letterSpacing="2">ALMATY</text>
              </svg>
            </Link>
            <div className="font-bebas text-[28px] text-vwhite tracking-[2px]">{t.brandName}</div>
            <div className="text-[12px] text-vmuted leading-relaxed max-w-[280px]">
              {t.tagline}
            </div>
            <div className="flex h-[3px] mt-4 rounded-full overflow-hidden w-20">
              <div className="flex-1 bg-vsky" />
              <div className="w-5 bg-vgold" />
            </div>

            {/* Inline Newsletter for "Exact" feel but keeping logic */}
            <form onSubmit={handleSubscribe} className="mt-4 flex max-w-[280px]">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-vnavy-card border border-white/10 rounded-l-[4px] px-3 py-2 text-[12px] text-vwhite outline-none focus:border-vgold/50"
              />
              <button className="bg-vgold text-vnavy px-3 py-2 rounded-r-[4px] font-barlow-condensed font-bold text-[10px] tracking-[1px] uppercase hover:bg-vgold-light">
                {isSubmitting ? "..." : "OK"}
              </button>
            </form>
          </div>

          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vgold mb-4">{t.col1Title}</div>
            <div className="flex flex-col gap-2">
              {t.col1Links.map((l, i) => (
                <Link key={i} href={l.href} className="font-barlow-condensed text-sm text-vmuted hover:text-vwhite transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vgold mb-4">{t.col2Title}</div>
            <div className="flex flex-col gap-2">
              {t.col2Links.map((l, i) => (
                <Link key={i} href={l.href} className="font-barlow-condensed text-sm text-vmuted hover:text-vwhite transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vgold mb-4">{t.col3Title}</div>
            <div className="flex flex-col gap-2">
              {t.col3Links.map((l, i) => (
                <Link key={i} href={l.href} className="font-barlow-condensed text-sm text-vmuted hover:text-vwhite transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[12px] text-vmuted">{t.copy}</div>
          <div className="flex gap-1.5 items-center">
            <div className="w-[30px] h-[16px] bg-vsky rounded-[3px]" />
            <div className="w-[10px] h-[16px] bg-vgold rounded-[3px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}