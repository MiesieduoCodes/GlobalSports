"use client";

import React from "react";
import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Page() {
  const { language } = useLanguage();

  const tickerItems = [
    language === 'ru' ? 'НОВЫЙ ДОМАШНИЙ КОМПЛЕКТ СКОРО В ПРОДАЖЕ' : 'NEW HOME KIT COMING SOON',
    language === 'ru' ? 'ВЕРИЯ ФК ВЫХОДИТ В ФИНАЛ' : 'VERIA FC REACHES THE FINAL',
    language === 'ru' ? 'БИЛЕТЫ НА ДЕРБИ РАСПРОДАНЫ' : 'DERBY TICKETS SOLD OUT',
    language === 'ru' ? 'ТРЕНИРОВОЧНЫЙ СБОР НАЧИНАЕТСЯ НА СЛЕДУЮЩЕЙ НЕДЕЛЕ' : 'TRAINING CAMP STARTS NEXT WEEK',
    language === 'ru' ? 'СЕССИЯ АВТОГРАФОВ СКАУТОВ' : 'SCOUT AUTOGRAPH SESSION'
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