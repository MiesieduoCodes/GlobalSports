"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Play, Clock, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Veria Media",
    heroTitle: "Premium ",
    heroTitleAccent: "Video",
    sub: "Exclusive match highlights, player interviews, and behind-the-scenes content.",
    categories: ["All", "Highlights", "Interviews", "Academy"],
    watch: "Watch Now"
  },
  ru: {
    heroEyebrow: "Медиа ВЕ-ГЛОБАЛСПОРТС",
    heroTitle: "Премиум ",
    heroTitleAccent: "Видео",
    sub: "Эксклюзивные обзоры матчей, интервью с игроками и закулисный контент.",
    categories: ["Все", "Обзоры", "Интервью", "Академия"],
    watch: "Смотреть"
  }
};

const mockVideos = [
  { id: "1", title: "Highlights: VE-GLOBALSPORTS FC 3–0 FC Kairat", category: "Highlights", date: "Mar 18, 2026", duration: "8:45" },
  { id: "2", title: "Interview: K. Nurlan on joining the club", category: "Interviews", date: "Mar 16, 2026", duration: "12:20" },
  { id: "3", title: "Academy Spotlight: U17 Champions", category: "Academy", date: "Mar 14, 2026", duration: "15:10" }
];

export default function VideosPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden text-center">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mt-4">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub mx-auto mb-10">{t.sub}</p>

          <div className="flex justify-center gap-2">
            {t.categories.map((c, i) => (
              <button key={i} className={`px-5 py-2 rounded-full font-barlow-condensed font-bold text-[12px] tracking-[1.5px] uppercase border transition-all ${i === 0 ? 'bg-vgold border-vgold text-vnavy' : 'bg-transparent border-white/10 text-vmuted hover:text-vwhite'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockVideos.map((v, i) => (
            <Link key={i} href={`/videoplayer?v=${v.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-vnavy-card border border-white/5 rounded-[20px] overflow-hidden group hover:border-vsky/30 transition-all flex flex-col h-full"
              >
                <div className="aspect-video bg-vnavy relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-vsky/20 to-transparent opacity-30" />
                  <div className="w-16 h-16 rounded-full bg-vwhite/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 relative z-20">
                    <Play className="w-6 h-6 text-vwhite fill-vwhite ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-vwhite font-barlow-condensed text-[10px] font-bold px-2 py-0.5 rounded tracking-[1px]">{v.duration}</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="font-barlow-condensed font-bold text-[10px] tracking-[2px] uppercase text-vsky">{v.category}</span>
                    <span className="text-vmuted text-[10px]">•</span>
                    <span className="text-vmuted text-[10px]">{v.date}</span>
                  </div>
                  <h3 className="font-barlow-condensed font-bold text-lg text-vwhite leading-snug group-hover:text-vgold transition-colors">{v.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
