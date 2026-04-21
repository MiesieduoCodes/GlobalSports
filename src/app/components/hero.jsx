"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    badge: "Kazakhstan Premier League · Season 2025/26",
    title1: "VE-GLOBALSPORTS",
    title2: "FC",
    city: "ALMATY",
    tagline: <>One club. One city. One <em className="text-vgold not-italic">ambition</em>.<br />Built from the steppe up — forged in gold and sky.</>,
    btnPrimary: "Meet The Squad",
    btnSecondary: "Our Story",
    liveLabel: "Last Result",
    liveMeta: "KPL Matchday 21 · Central Stadium, Almaty",
    stats: [
      { label: "Wins", val: "14" },
      { label: "Draws", val: "5" },
      { label: "Losses", val: "3" },
      { label: "KPL Position", val: "2nd", color: "text-vsky" },
      { label: "Points", val: "47" }
    ]
  },
  ru: {
    badge: "Премьер-лига Казахстана · Сезон 2025/26",
    title1: "ВЕ-ГЛОБАЛСПОРТС",
    title2: "ФК",
    city: "АЛМАТЫ",
    tagline: <>Один клуб. Один город. Одна <em className="text-vgold not-italic">цель</em>.<br />Создано в степи — выковано в золоте и небе.</>,
    btnPrimary: "Встречайте Состав",
    btnSecondary: "Наша История",
    liveLabel: "Последний Результат",
    liveMeta: "КПЛ Тур 21 · Центральный Стадион, Алматы",
    stats: [
      { label: "Победы", val: "14" },
      { label: "Ничьи", val: "5" },
      { label: "Поражения", val: "3" },
      { label: "Позиция в КПЛ", val: "2", color: "text-vsky" },
      { label: "Очки", val: "47" }
    ]
  }
};

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-[60px] pt-[72px] pb-[80px] overflow-hidden bg-vnavy">
      <div className="absolute inset-0 bg-[linear-gradient(175deg,rgba(8,12,24,0.1)_0%,rgba(8,12,24,0.6)_50%,rgba(8,12,24,1)_100%),linear-gradient(135deg,#080E20_0%,#0C1A32_35%,#102240_65%,#080E20_100%)]" />
      <div className="kz-grid" />
      <div className="hero-glow" />
      <div className="hero-glow-gold" />

      <div className="relative z-10 max-w-[720px]">
        <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(0,174,239,0.1)] border border-[rgba(0,174,239,0.3)] rounded-full px-4 py-1.5 font-barlow-condensed font-semibold text-[11px] tracking-[2px] uppercase text-vsky mb-5 hero-animate-up">
          <div className="w-[6px] h-[6px] bg-vsky rounded-full live-dot-pulse" />
          {t.badge}
        </div>

        <h1 className="font-bebas text-[clamp(36px,5.5vw,72px)] leading-[0.88] text-vwhite tracking-[1px] uppercase hero-animate-up" style={{ animationDelay: '0.1s' }}>
          {t.title1}<span className="text-vgold">{t.title2}</span>
          <span className="block font-bebas text-[clamp(24px,3.5vw,40px)] text-vsky tracking-[6px] mt-2">{t.city}</span>
        </h1>

        <p className="font-barlow-condensed text-base lg:text-lg font-light text-vmuted max-w-[480px] mt-5 leading-relaxed hero-animate-up" style={{ animationDelay: '0.2s' }}>
          {t.tagline}
        </p>

        <div className="flex flex-wrap gap-4 mt-8 hero-animate-up" style={{ animationDelay: '0.3s' }}>
          <button className="bg-vgold text-vnavy font-barlow-condensed font-bold text-[13px] tracking-[2px] uppercase px-8 py-3.5 rounded-[8px] hover:bg-vgold-light transition-all transform hover:-translate-y-0.5 shadow-lg shadow-vgold/10">
            {t.btnPrimary}
          </button>
          <button className="bg-[rgba(0,174,239,0.12)] border border-[rgba(0,174,239,0.4)] text-vsky font-barlow-condensed font-bold text-[13px] tracking-[2px] uppercase px-8 py-3.5 rounded-[8px] hover:bg-[rgba(0,174,239,0.2)] transition-all">
            {t.btnSecondary}
          </button>
        </div>

        {/* Live Result Card (Mobile/Tablet) */}
        <div className="mt-12 lg:hidden hero-animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-[rgba(23,32,56,0.95)] border border-[rgba(0,174,239,0.2)] backdrop-blur-xl rounded-[16px] p-6 shadow-2xl">
            <div className="flex items-center gap-2 font-barlow-condensed text-[10px] font-bold tracking-[2px] uppercase text-vsky mb-4">
              <div className="w-[8px] h-[8px] bg-red-500 rounded-full live-dot-pulse" />
              {t.liveLabel}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-barlow-condensed font-bold text-xs text-vwhite text-center flex-1 line-clamp-1">VE-GLOBALSPORTS FC</span>
              <div className="flex items-center gap-2 scale-90">
                <span className="font-bebas text-4xl text-vgold leading-none">3</span>
                <span className="font-bebas text-xl text-vmuted">—</span>
                <span className="font-bebas text-4xl text-vgold leading-none">0</span>
              </div>
              <span className="font-barlow-condensed font-bold text-xs text-vwhite text-center flex-1 line-clamp-1">FC Kairat</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] font-barlow-condensed text-[10px] text-vmuted text-center tracking-[1px]">
              {t.liveMeta}
            </div>
          </div>
        </div>
      </div>

      {/* Live Result Card (Desktop Hover) */}
      <div className="absolute right-6 md:right-[60px] top-[40%] -translate-y-1/2 z-10 hidden lg:block hero-animate-in" style={{ animationDelay: '0.5s' }}>
        <div className="bg-[rgba(23,32,56,0.95)] border border-[rgba(0,174,239,0.2)] backdrop-blur-xl rounded-[16px] p-7 min-w-[340px] shadow-2xl">
          <div className="flex items-center gap-2 font-barlow-condensed text-[10px] font-bold tracking-[2px] uppercase text-vsky mb-4">
            <div className="w-[8px] h-[8px] bg-red-500 rounded-full live-dot-pulse" />
            {t.liveLabel}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-barlow-condensed font-bold text-sm text-vwhite text-center flex-1">VE-GLOBALSPORTS FC</span>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-5xl text-vgold leading-none">3</span>
              <span className="font-bebas text-2xl text-vmuted">—</span>
              <span className="font-bebas text-5xl text-vgold leading-none">0</span>
            </div>
            <span className="font-barlow-condensed font-bold text-sm text-vwhite text-center flex-1">FC Kairat</span>
          </div>
          <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] font-barlow-condensed text-[11px] text-vmuted text-center tracking-[1px]">
            {t.liveMeta}
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-[40px] left-6 right-6 md:left-[60px] md:right-[60px] z-10 flex border-t border-transparent hero-animate-up" style={{ animationDelay: '0.6s' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 w-full bg-[rgba(15,21,37,0.85)] border border-white/5 backdrop-blur-md rounded-[12px] overflow-hidden shadow-2xl translate-y-[-20px]">
          {t.stats.map((s, idx) => (
            <div
              key={idx}
              className={`p-5 border-r border-[rgba(255,255,255,0.06)] last:border-r-0 border-t md:border-t-0 border-[rgba(255,255,255,0.06)] first:border-t-2 first:border-vgold hover:border-l-2 hover:border-vsky transition-all group cursor-default ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <span className={`block font-bebas text-[34px] leading-none mb-1 transition-colors ${s.color || 'text-vgold'} group-hover:text-vwhite`}>{s.val}</span>
              <span className="block font-barlow-condensed font-semibold text-[9px] tracking-[2px] uppercase text-vmuted group-hover:text-vsky transition-colors">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;