"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Calendar, ArrowUpRight } from "lucide-react";

const translations = {
  en: {
    eyebrow: "Club News",
    title: "Latest ",
    titleAccent: "Updates",
    viewAll: "Explore All News",
    loading: "Preparing News Center...",
  },
  ru: {
    eyebrow: "Новости Клуба",
    title: "Последние ",
    titleAccent: "Обновления",
    viewAll: "Все новости",
    loading: "Загрузка новостей...",
  }
};

export default function News() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const q = query(collection(db, "news"), orderBy("date", "desc"), limit(6));
        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            imageUrl: data.image || data.imageUrl || "",
            renderedTitle: data.translations?.[language]?.title || data.title || "",
            renderedDesc: data.translations?.[language]?.description || data.description || ""
          };
        });

        setNews(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [language]);

  if (loading) {
    return (
      <section className="section bg-vnavy">
        <div className="max-w-[1440px] mx-auto text-center font-bebas text-2xl text-vgold animate-pulse">
          {t.loading}
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="section bg-vnavy overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vsky/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              {t.eyebrow}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading"
            >
              {t.title}<span className="text-vgold">{t.titleAccent}</span>
            </motion.h2>
          </div>
          
          <Link href="/news" className="group flex items-center gap-2 text-vmuted hover:text-vgold font-barlow-condensed font-bold text-[14px] tracking-[2px] uppercase transition-all">
            {t.viewAll}
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-vgold/40 group-hover:bg-vgold/10 transition-all">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Movie Slider Container */}
        <div className="relative group/slider">
          <div className="flex gap-5 overflow-x-auto pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative flex-none w-[280px] md:w-[360px] aspect-[16/22] snap-start"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/news/${item.link || item.id}`} className="block h-full w-full">
                  <motion.div 
                    className="relative h-full w-full rounded-2xl overflow-hidden border border-white/5 bg-vnavy-mid shadow-2xl transition-all"
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      borderColor: "rgba(200, 168, 75, 0.4)",
                      zIndex: 50 
                    }}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          className="w-full h-full object-cover" 
                          alt="" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-vnavy-light font-bebas text-4xl text-white/5">NEWS</div>
                      )}
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-vnavy via-vnavy/40 to-transparent" />
                      <div className="absolute inset-0 bg-vnavy/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end min-h-[50%]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-vgold text-vnavy rounded-[4px] font-barlow-condensed font-bold text-[10px] tracking-[1px] uppercase">
                          {item.category || "Club"}
                        </span>
                        <div className="flex items-center gap-1.5 text-vwhite/50 font-barlow text-[11px] uppercase tracking-[1px]">
                          <Calendar className="w-3 h-3" />
                          {item.date || "Mar 2026"}
                        </div>
                      </div>
                      
                      <h3 className="font-bebas text-2xl md:text-3xl text-vwhite leading-tight tracking-[1px] mb-3 line-clamp-2 group-hover:text-vgold transition-colors">
                        {item.renderedTitle}
                      </h3>

                      {/* Hidden details that appear on hover */}
                      <AnimatePresence>
                        {hoveredId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="font-barlow text-vmuted text-xs leading-relaxed mb-4 line-clamp-3">
                              {item.renderedDesc}
                            </p>
                            <div className="flex items-center gap-2 text-vgold font-barlow-condensed font-bold text-[12px] uppercase tracking-[1px]">
                              Read Full Story <ArrowUpRight className="w-3 h-3" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Fade Effects */}
          <div className="absolute top-0 left-0 bottom-12 w-24 bg-gradient-to-r from-vnavy to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 bottom-12 w-24 bg-gradient-to-l from-vnavy to-transparent pointer-events-none z-20" />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
