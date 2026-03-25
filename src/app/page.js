"use client";

import React from "react";
import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Page() {
  const { language } = useLanguage();

  const tickerItems = language === 'ru' ? [
    'Верия ФК 3–0 ФК Кайрат · Финал',
    'Астана ФК 1–1 Шахтер · Финал',
    'След: Верия ФК vs ФК Тобол · Сб 22 Мар · 17:00',
    'Трансфер: К. Нурлан переходит в Верию ФК · Подтверждено',
    'Таблица КПЛ: Верия ФК — 2-е место · 47 очков'
  ] : [
    'Veria FC 3–0 FC Kairat · FT',
    'Astana FC 1–1 Shakhter · FT',
    'Next: Veria FC vs FC Tobol · Sat 22 Mar · 17:00',
    'Transfer: K. Nurlan joins Veria FC · Confirmed',
    'KPL Table: Veria FC — 2nd Place · 47 pts'
  ];


  return (
    <div className="bg-vnavy">
      <Hero />

      {/* Ticker Bar */}
      <div className="ticker-bar">
        <div className="ticker-label">
          {language === 'ru' ? 'ПОСЛЕДНИЕ НОВОСТИ' : 'BREAKING NEWS'}
        </div>
        <div className="ticker-track">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {tickerItems.map((item, idx) => (
                <div key={`${i}-${idx}`} className="ticker-item">
                  <span className="ticker-sep">///</span>
                  {item}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <NextMatch />
      <News />

      {/* Footer is rendered by Layout */}
    </div>
  );
}