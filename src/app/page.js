"use client";

import React from "react";
import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import RecentResults from "@/app/components/recentresults";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Page() {
  const { language } = useLanguage();
  const [tickerItems, setTickerItems] = React.useState([]);

  React.useEffect(() => {
    const loadTicker = async () => {
      try {
        const { collection, getDocs, query, limit } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        const snapshot = await getDocs(query(collection(db, "matches"), limit(10)));
        const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const items = matches.map(m => {
          if (m.status === 'past') {
            return `${m.team1} ${m.homeScore ?? 0}–${m.awayScore ?? 0} ${m.team2} · FT`;
          } else {
            return `Next: ${m.team1} vs ${m.team2} · ${m.date} · ${m.time}`;
          }
        });

        setTickerItems(items);
      } catch (err) {
        console.error("Error loading ticker:", err);
      }
    };
    loadTicker();
  }, [language]);


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
      <RecentResults />
      <News />

      {/* Footer is rendered by Layout */}
    </div>
  );
}