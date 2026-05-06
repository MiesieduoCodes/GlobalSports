"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";

const translations = {
  en: {
    title: "Recent ",
    titleAccent: "Results",
    viewAll: "View All Matches",
  },
  ru: {
    title: "Последние ",
    titleAccent: "Результаты",
    viewAll: "Все матчи",
  }
};

export default function RecentResults() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const q = query(collection(db, "matches"));
        const snapshot = await getDocs(q);
        const allMatches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const today = new Date().toISOString().split('T')[0];
        const pastMatches = allMatches
          .filter(m => {
            const status = m.status || (m.date && m.date < today ? 'past' : 'upcoming');
            return status === 'past';
          })
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
          .slice(0, 3);

        setResults(pastMatches);
      } catch (err) {
        console.error("Error fetching recent results:", err);
      }
    };
    loadResults();
  }, []);

  if (results.length === 0) return null;

  return (
    <section className="py-12 bg-vnavy-mid">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-barlow-condensed font-bold text-[11px] tracking-[3px] uppercase text-vsky mb-2">Match Centre</div>
            <h2 className="font-bebas text-4xl text-vwhite tracking-[1px]">
              {t.title}<span className="text-vgold">{t.titleAccent}</span>
            </h2>
          </div>
          <Link href="/matches" className="hidden sm:flex items-center gap-2 text-vmuted hover:text-vgold font-barlow-condensed font-bold text-[12px] tracking-[1.5px] uppercase transition-colors">
            {t.viewAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((match) => (
            <div key={match.id} className="bg-vnavy border border-white/5 rounded-xl p-6 hover:border-vgold/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-barlow-condensed font-bold text-[10px] tracking-[1px] text-vsky uppercase flex items-center gap-1.5">
                  <Trophy className="w-3 h-3" /> {match.competition || "League"}
                </span>
                <span className="font-barlow-condensed font-semibold text-[11px] text-vmuted">{match.date}</span>
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold tracking-[1px] text-vmuted uppercase">Final</span>
              </div>
              
              <div className="flex items-center justify-between gap-4 py-2">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <img src={match.team1Logo || '/images/team-placeholder.png'} className="w-10 h-10 object-contain" alt="" />
                  <span className="font-bebas text-sm text-vwhite text-center line-clamp-1">{match.team1}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="font-bebas text-2xl text-vgold flex items-center gap-2">
                    <span>{match.homeScore ?? 0}</span>
                    <span className="text-vwhite/10">:</span>
                    <span>{match.awayScore ?? 0}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 flex-1">
                  <img src={match.team2Logo || '/images/team-placeholder.png'} className="w-10 h-10 object-contain" alt="" />
                  <span className="font-bebas text-sm text-vwhite text-center line-clamp-1">{match.team2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/matches" className="inline-flex items-center gap-2 text-vmuted hover:text-vgold font-barlow-condensed font-bold text-[12px] tracking-[1.5px] uppercase transition-colors">
            {t.viewAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
