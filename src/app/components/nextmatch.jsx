"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const translations = {
  en: {
    eyebrow: "Upcoming Fixture",
    title: "Next ",
    titleAccent: "Match",
    label: "KPL · Matchday 22 · Kazakhstan Premier League",
    kickoff: "Kick-off time (ALMT)",
    venue: "Центральный Стадион (Central Stadium) · Almaty · Cap. 22,000",
    buyTickets: "Buy Tickets / Билет"
  },
  ru: {
    eyebrow: "Предстоящий матч",
    title: "Следующая ",
    titleAccent: "Игра",
    label: "КПЛ · Тур 22 · Премьер-лига Казахстана",
    kickoff: "Время начала (ALMT)",
    venue: "Центральный Стадион · Алматы · Вместимость 22,000",
    buyTickets: "Купить билеты / Билет"
  }
};

export default function NextMatch() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const loadNextMatch = async () => {
      try {
        const q = query(collection(db, "matches"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const today = new Date().toISOString().split('T')[0];
          const upcoming = matches
            .filter(m => m.date && m.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date))[0];

          if (upcoming) {
            setMatch({
              ...upcoming,
              dateStr: new Date(upcoming.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            });
          }
        }
      } catch (err) {
        console.error("Error fetching next match:", err);
      }
    };
    loadNextMatch();
  }, []);

  const displayMatch = match ? {
    date: match.dateStr || match.date,
    time: match.time || "17:00",
    team1: match.team1 || "VE-GLOBALSPORTS FC",
    team1Abbr: match.team1?.substring(0, 3).toUpperCase() || "VEG",
    team2: match.team2 || "Opponent",
    team2Abbr: match.team2?.substring(0, 3).toUpperCase() || "OPP",
    venue: match.venue || t.venue
  } : {
    date: "Saturday, 22 March 2026",
    time: "17:00",
    team1: "VE-GLOBALSPORTS FC",
    team1Abbr: "VEG",
    team2: "FC Tobol",
    team2Abbr: "TOB",
    venue: t.venue
  };

  return (
    <section className="section bg-vnavy">
      <div className="max-w-[1440px] mx-auto">
        <div className="section-eyebrow">{t.eyebrow}</div>
        <div className="section-heading">{t.title}<span className="text-vgold">{t.titleAccent}</span></div>

        <div className="mt-12 bg-vnavy-light rounded-[20px] border border-vsky/10 overflow-hidden shadow-2xl">
          <div className="bg-vsky/[0.07] px-9 py-5 flex items-center justify-between border-b border-vsky/10">
            <span className="font-barlow-condensed font-bold text-[11px] tracking-[2.5px] uppercase text-vsky">{t.label}</span>
            <span className="font-barlow-condensed font-semibold text-[13px] text-vmuted">{displayMatch.date}</span>
          </div>

          <div className="px-9 py-12 flex flex-col md:flex-row items-center gap-8 md:gap-0">
            <div className="flex-1 flex flex-col items-center gap-3.5">
              <div className="w-20 h-20 rounded-full bg-vsky/10 border-2 border-vsky/30 text-vsky flex items-center justify-center font-bebas text-[22px] tracking-[1px]">
                {displayMatch.team1Abbr}
              </div>
              <div className="font-bebas text-[22px] text-vwhite tracking-[1px]">{displayMatch.team1}</div>
              <div className="font-barlow-condensed text-[12px] text-vmuted">Almaty · Home</div>
            </div>

            <div className="flex flex-col items-center gap-2 px-10">
              <div className="font-bebas text-[52px] text-vmuted leading-none">VS</div>
              <div className="font-barlow-condensed font-bold text-[22px] text-vgold">{displayMatch.time}</div>
              <div className="font-barlow-condensed text-[11px] text-vmuted tracking-[1px] whitespace-nowrap">{t.kickoff}</div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-3.5">
              <div className="w-20 h-20 rounded-full bg-vgold/10 border-2 border-vgold/25 text-vgold flex items-center justify-center font-bebas text-[22px] tracking-[1px]">
                {displayMatch.team2Abbr}
              </div>
              <div className="font-bebas text-[22px] text-vwhite tracking-[1px]">{displayMatch.team2}</div>
              <div className="font-barlow-condensed text-[12px] text-vmuted">Kostanay · Away</div>
            </div>
          </div>

          <div className="px-9 py-5 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(0,174,239,0.7)" />
              </svg>
              <span className="font-barlow-condensed text-[13px] text-vmuted">{displayMatch.venue || t.venue}</span>
            </div>
            <button className="bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-6 py-2.5 rounded-[6px] hover:bg-vgold-light transition-colors whitespace-nowrap">
              {t.buyTickets}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}