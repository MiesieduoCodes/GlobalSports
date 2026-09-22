"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: {
    brandName: "VE-GLOBALSPORTS FC · Almaty",
    tagline: <>Almaty, Kazakhstan · Founded 2017<br />Founded by Veria Lawrence Ebiks<br />One Club. One City. One Ambition.</>,
    col1Title: "Club",
    col1Links: [
      { name: "About", href: "/about" },
      { name: "First Team", href: "/squad" },
      { name: "Academy", href: "/academy" },
      { name: "Management", href: "/management" },
      { name: "Club History", href: "/clubhistory" }
    ],
    col2Title: "Matches",
    col2Links: [
      { name: "Fixtures", href: "/matches" },
      { name: "Results", href: "/matches" },
      { name: "League Table", href: "/matches" }
    ],
    col3Title: "Media",
    col3Links: [
      { name: "News", href: "/news" },
      { name: "Videos", href: "/videos" },
      { name: "Awards", href: "/awards" }
    ],
    col4Title: "Join",
    col4Links: [
      { name: "Members", href: "/members" },
      { name: "Business Club", href: "/business-club" },
      { name: "Press & Accreditation", href: "/business-club#press" },
      { name: "Partners", href: "/partners" },
      { name: "VE-GlobalSportFC For All", href: "/forall" }
    ],
    col5Title: "Follow",
    col5Links: [
      { name: "Instagram", href: "#" },
      { name: "Facebook", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "YouTube", href: "#" }
    ],
    copy: "© 2026 VE-GlobalSportFC. All Rights Reserved.",
    subscribe: "Subscribe to Newsletter"
  },
  ru: {
    brandName: "ВЕ-ГЛОБАЛСПОРТС ФК · Алматы",
    tagline: <>Алматы, Казахстан · Основан в 2017<br />Основано Верией Лоуренсом Эбиксом<br />Один клуб. Один город. Одна цель.</>,
    col1Title: "Клуб",
    col1Links: [
      { name: "О клубе", href: "/about" },
      { name: "Первая команда", href: "/squad" },
      { name: "Академия", href: "/academy" },
      { name: "Руководство", href: "/management" },
      { name: "История клуба", href: "/clubhistory" }
    ],
    col2Title: "Матчи",
    col2Links: [
      { name: "Расписание", href: "/matches" },
      { name: "Результаты", href: "/matches" },
      { name: "Таблица лиги", href: "/matches" }
    ],
    col3Title: "Медиа",
    col3Links: [
      { name: "Новости", href: "/news" },
      { name: "Видео", href: "/videos" },
      { name: "Награды", href: "/awards" }
    ],
    col4Title: "Присоединиться",
    col4Links: [
      { name: "Участники", href: "/members" },
      { name: "Бизнес-клуб", href: "/business-club" },
      { name: "Аккредитация прессы", href: "/business-club#press" },
      { name: "Партнеры", href: "/partners" },
      { name: "VE-GlobalSportFC для всех", href: "/forall" }
    ],
    col5Title: "Мы в соцсетях",
    col5Links: [
      { name: "Instagram", href: "#" },
      { name: "Facebook", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "YouTube", href: "#" }
    ],
    copy: "© 2026 ВЕ-ГЛОБАЛСПОРТС ФК. Все права защищены.",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1fr_0.8fr] gap-x-8 gap-y-10 mb-10">

          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="VE-GLOBALSPORTS" width={60} height={60} />
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

          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vgold mb-4">{t.col4Title}</div>
            <div className="flex flex-col gap-2">
              {t.col4Links.map((l, i) => (
                <Link key={i} href={l.href} className="font-barlow-condensed text-sm text-vmuted hover:text-vwhite transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vgold mb-4">{t.col5Title}</div>
            <div className="flex flex-col gap-2">
              {t.col5Links.map((l, i) => (
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