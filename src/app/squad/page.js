"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FALLBACK_PLAYERS } from "@/lib/constants";

const translations = {
  en: {
    heroTitle: "First Team ",
    heroTitleAccent: "Squad",
    heroEyebrow: "2025/26 Season",
    heroSub: "Under Technical Director Otanwa Louis — a blend of Kazakh talent and international quality.",
    filters: {
      all: "All Players",
      gk: "Goalkeepers",
      def: "Defenders",
      mid: "Midfielders",
      fwd: "Forwards"
    },
    sections: {
      gk: "Goalkeepers",
      def: "Defenders",
      mid: "Midfielders",
      fwd: "Forwards"
    },
    noPlayers: "No players found in this category."
  },
  ru: {
    heroTitle: "Основной ",
    heroTitleAccent: "Состав",
    heroEyebrow: "Сезон 2025/26",
    heroSub: "Под руководством технического директора Отанва Луиса — сочетание казахстанских талантов и международного качества.",
    filters: {
      all: "Все Игроки",
      gk: "Вратари",
      def: "Защитники",
      mid: "Полузащитники",
      fwd: "Нападающие"
    },
    sections: {
      gk: "Вратари",
      def: "Защитники",
      mid: "Полузащитники",
      fwd: "Нападающие"
    },
    noPlayers: "Игроки в этой категории не найдены."
  }
};



export default function SquadPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [players, setPlayers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "players"));
        const docs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            name: data.name || "Unknown Player",
            position: data.position || "Midfielder",
            image: data.image || data.imageUrl || ""
          };
        });
        setPlayers(docs.length > 0 ? docs : FALLBACK_PLAYERS);
      } catch (err) {
        console.error("Error fetching players:", err);
        setPlayers(FALLBACK_PLAYERS);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlayers();
  }, []);

  const categorized = {
    gk: players.filter(p => {
      const pos = (p.position || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return cat === "gk" || pos.includes("gk") || pos.includes("goalkeeper");
    }),
    def: players.filter(p => {
      const pos = (p.position || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return cat === "def" || pos.includes("def") || pos.includes("cb") || pos.includes("lb") || pos.includes("rb");
    }),
    mid: players.filter(p => {
      const pos = (p.position || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return cat === "mid" || pos.includes("mid") || pos.includes("dm") || pos.includes("cm") || pos.includes("am");
    }),
    fwd: players.filter(p => {
      const pos = (p.position || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return cat === "fwd" || pos.includes("fwd") || pos.includes("st") || pos.includes("lw") || pos.includes("rw") || pos.includes("att");
    })
  };

  const sections = activeFilter === "all" ? ["gk", "def", "mid", "fwd"] : [activeFilter];

  return (
    <main className="bg-vnavy min-h-screen pb-20">

      {/* Hero */}
      <section className="relative pt-[140px] pb-[60px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden">
        <div className="kz-grid opacity-[0.025]" />
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-bebas text-[180px] text-vwhite/[0.02] tracking-[10px] pointer-events-none hidden lg:block uppercase">SQUAD</div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-3">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub mb-8">{t.heroSub}</p>

          <div className="flex flex-wrap gap-2">
            {Object.entries(t.filters).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-6 py-2.5 font-barlow-condensed font-semibold text-[12px] tracking-[1.5px] uppercase rounded-[6px] border transition-all ${activeFilter === id ? 'bg-vgold border-vgold text-vnavy' : 'bg-vnavy-card border-white/10 text-vmuted hover:border-vgold/50'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Roster Sections */}
      <section className="px-6 md:px-[60px] pt-10">
        <div className="max-w-[1440px] mx-auto">
          {sections.map(sectionId => {
            const sectionPlayers = categorized[sectionId];
            if (sectionPlayers.length === 0 && activeFilter !== "all") return <p key={sectionId} className="text-center py-20 font-bebas text-xl text-vmuted tracking-[2px]">{t.noPlayers}</p>;
            if (sectionPlayers.length === 0) return null;

            return (
              <div key={sectionId} className="mb-16 last:mb-0">
                <div className="roster-section-title">
                  {t.sections[sectionId]}
                </div>

                <div className="player-grid">
                  <AnimatePresence mode="popLayout">
                    {sectionPlayers.map((player) => {
                      return (
                        <motion.div
                          key={player.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="player-card-web group"
                        >
                          <div className={`player-card-top ${sectionId} !h-[260px]`}>
                            {/* Huge Background Number */}
                            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[180px] text-vwhite/[0.04] leading-none pointer-events-none z-0 group-hover:scale-110 group-hover:text-vwhite/[0.08] transition-all duration-700">
                              {player.jerseyNumber || "0"}
                            </div>

                            {/* Background Image */}
                            {player.image && (
                              <div className="absolute inset-0 z-0">
                                <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-vnavy-card via-vnavy-card/20 to-transparent" />
                              </div>
                            )}

                            {/* Position Badge */}
                            <div
                              className="absolute bottom-3 left-4 z-10 font-barlow-condensed font-bold text-[10px] tracking-[1.5px] uppercase px-2 py-0.5 rounded-[4px]"
                              style={{
                                background: sectionId === 'gk' ? 'var(--gold)' :
                                  sectionId === 'def' ? 'var(--sky)' :
                                    sectionId === 'mid' ? '#97C459' :
                                      '#E24B4A',
                                color: sectionId === 'mid' ? '#0A1628' :
                                  sectionId === 'gk' ? 'var(--navy)' :
                                    'white'
                              }}
                            >
                              {player.position || sectionId.toUpperCase()}
                            </div>
                          </div>
                          <div className="player-card-info">
                            <div className="player-num">#{player.jerseyNumber || "0"}</div>
                            <div className="player-web-name">{player.name}</div>
                            <div className="player-nat">{player.nationality || "Kazakhstan"}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
