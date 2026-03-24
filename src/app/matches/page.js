"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar, MapPin, Ticket, ChevronRight, Trophy, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  en: {
    eyebrow: "Fixtures & Results",
    title: "Match ",
    titleAccent: "Centre",
    upcoming: "Upcoming",
    results: "Results",
    loading: "Preparing Match Centre...",
    noMatches: "No matches scheduled.",
    tickets: "Buy Tickets",
    details: "Details"
  },
  ru: {
    eyebrow: "Расписание и результаты",
    title: "Матч-",
    titleAccent: "Центр",
    upcoming: "Предстоящие",
    results: "Результаты",
    loading: "Загрузка...",
    noMatches: "Матчей не запланировано.",
    tickets: "Купить билеты",
    details: "Детали"
  }
};

export default function MatchesPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        // Removed orderBy("date") to ensure compatibility with existing docs
        const q = query(collection(db, "matches"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Robust mapping
            team1Logo: data.team1Logo || data.logo1 || "/images/team-placeholder.png",
            team2Logo: data.team2Logo || data.logo2 || "/images/team-placeholder.png",
            date: data.date || "TBD",
            time: data.time || "00:00"
          };
        });
        setMatches(docs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMatches();
  }, []);

  const filteredMatches = matches.filter(m => {
    const matchDate = new Date(`${m.date}T${m.time || "00:00"}`);
    const isPast = matchDate < new Date();
    return activeTab === "upcoming" ? !isPast : isPast;
  });

  return (
    <main className="bg-vnavy min-h-screen">

      {/* Header */}
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden text-center">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h1 className="section-heading mt-4">{t.title}<span className="text-vgold">{t.titleAccent}</span></h1>

          <div className="flex justify-center mt-12">
            <div className="bg-vnavy flex p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-8 py-2.5 rounded-md font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase transition-all ${activeTab === 'upcoming' ? 'bg-vgold text-vnavy' : 'text-vmuted hover:text-vwhite'}`}
              >
                {t.upcoming}
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`px-8 py-2.5 rounded-md font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase transition-all ${activeTab === 'results' ? 'bg-vgold text-vnavy' : 'text-vmuted hover:text-vwhite'}`}
              >
                {t.results}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          {isLoading ? (
            <div className="text-center py-20 font-bebas text-2xl text-vgold animate-pulse">{t.loading}</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-vnavy-mid border border-white/5 rounded-[20px] overflow-hidden hover:border-vgold/30 transition-all group"
                  >
                    <div className="px-7 py-4 bg-vsky/[0.04] border-b border-white/5 flex items-center justify-between">
                      <span className="font-barlow-condensed font-bold text-[10px] tracking-[2px] uppercase text-vsky flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5" /> {match.competition || "PREMIER LEAGUE"}
                      </span>
                      <span className="font-barlow-condensed font-semibold text-[11px] text-vmuted flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> {match.date}
                      </span>
                    </div>

                    <div className="p-8 md:p-10 flex items-center justify-between gap-4">
                      <div className="flex-1 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-vnavy rounded-full border border-white/5 p-4 group-hover:scale-110 transition-all duration-500">
                          <img src={match.team1Logo || '/images/team-placeholder.png'} className="w-full h-full object-contain" alt="" />
                        </div>
                        <span className="font-bebas text-xl md:text-2xl text-vwhite text-center">{match.team1 || "VERIA FC"}</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        {activeTab === 'results' ? (
                          <div className="font-bebas text-4xl md:text-5xl text-vgold flex items-center gap-3">
                            <span>{match.homeScore ?? 0}</span>
                            <span className="text-vwhite/10">:</span>
                            <span>{match.awayScore ?? 0}</span>
                          </div>
                        ) : (
                          <>
                            <span className="font-bebas text-2xl text-vwhite/20">VS</span>
                            <div className="font-barlow-condensed font-bold text-[18px] text-vgold flex items-center gap-2">
                              <Clock className="w-4 h-4" /> {match.time || "00:00"}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-vnavy rounded-full border border-white/5 p-4 group-hover:scale-110 transition-all duration-500">
                          <img src={match.team2Logo || '/images/team-placeholder.png'} className="w-full h-full object-contain" alt="" />
                        </div>
                        <span className="font-bebas text-xl md:text-2xl text-vwhite text-center">{match.team2 || "OPPONENT"}</span>
                      </div>
                    </div>

                    <div className="px-7 py-4 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-vmuted font-barlow text-sm">
                        <MapPin className="w-4 h-4 text-vsky" /> {match.venue || "Central Stadium"}
                      </div>
                      <button className={`px-6 py-2 rounded-[6px] font-barlow-condensed font-bold text-[12px] tracking-[1.5px] uppercase transition-all ${activeTab === 'results' ? 'border border-white/20 text-vwhite hover:border-vgold hover:text-vgold' : 'bg-vgold text-vnavy hover:bg-vgold-light'}`}>
                        {activeTab === 'results' ? t.details : t.tickets}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          {!isLoading && filteredMatches.length === 0 && (
            <p className="text-center py-20 font-bebas text-xl text-vmuted tracking-[2px]">{t.noMatches}</p>
          )}
        </div>
      </section>

    </main>
  );
}
