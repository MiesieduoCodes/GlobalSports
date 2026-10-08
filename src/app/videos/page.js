"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import VideoCard from "@/app/components/VideoCard";
import { loadVideos } from "@/lib/media";

const translations = {
  en: {
    heroEyebrow: "VE-GlobalSportFC Media",
    heroTitle: "From Almaty, ",
    heroTitleAccent: "on camera.",
    sub: "Match highlights, player interviews, and behind-the-scenes footage from a club still writing its story.",
    all: "All",
    empty: "No videos in this category yet."
  },
  ru: {
    heroEyebrow: "Медиа VE-GlobalSportFC",
    heroTitle: "Из Алматы ",
    heroTitleAccent: "в кадре.",
    sub: "Обзоры матчей, интервью с игроками и закулисный контент клуба, который всё ещё пишет свою историю.",
    all: "Все",
    empty: "В этой категории пока нет видео."
  }
};

export default function VideosPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadVideos().then(setVideos);
  }, []);

  // Filter buttons come from the categories actually used (set per video in /admin)
  const categories = [...new Set(videos.map((v) => v.category).filter(Boolean))];
  const shown = category ? videos.filter((v) => v.category === category) : videos;

  return (
    <main className="bg-vnavy min-h-screen">
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden text-center">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mt-4">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub mx-auto mb-10">{t.sub}</p>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              {["", ...categories].map((c) => (
                <button
                  key={c || "all"}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-5 py-2 rounded-full font-barlow-condensed font-bold text-[12px] tracking-[1.5px] uppercase border transition-all ${category === c ? "bg-vgold border-vgold text-vnavy" : "bg-transparent border-white/10 text-vmuted hover:text-vwhite"}`}
                >
                  {c || t.all}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
            >
              <VideoCard video={v} language={language} />
            </motion.div>
          ))}
        </div>
        {videos.length > 0 && shown.length === 0 && (
          <p className="text-center py-16 font-bebas text-xl text-vmuted tracking-[2px]">{t.empty}</p>
        )}
      </section>
    </main>
  );
}
