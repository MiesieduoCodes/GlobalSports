"use client";

import { Suspense, useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search, Tag, X } from "lucide-react";
import { FALLBACK_NEWS } from "@/lib/constants";

const translations = {
  en: {
    title: "CLUB NEWS",
    subtitle: "LATEST UPDATES & STORIES",
    description: "The definitive source for everything Veria FC. From match results to exclusive interviews.",
    searchPlaceholder: "Search articles...",
    all: "ALL NEWS",
    readMore: "READ FULL ARTICLE",
    noResults: "NO ARTICLES MATCH YOUR SEARCH",
    loading: "PREPARING FEED...",
    categories: ["All", "Match Report", "Transfer", "Academy", "Club News"],
    newsBadge: "NEWS"
  },
  ru: {
    title: "НОВОСТИ КЛУБА",
    subtitle: "ПОСЛЕДНИЕ ОБНОВЛЕНИЯ",
    description: "Официальный источник новостей Верия ФК. От результатов матчей до эксклюзивных интервью.",
    searchPlaceholder: "Поиск статей...",
    all: "ВСЕ НОВОСТИ",
    readMore: "ЧИТАТЬ ПОЛНОСТЬЮ",
    noResults: "СТАТЬИ НЕ НАЙДЕНЫ",
    loading: "ЗАГРУЗКА ЛЕНТЫ...",
    categories: ["Все", "Отчет о Матче", "Трансфер", "Академия", "Новости Клуба"],
    newsBadge: "НОВОСТИ"
  },
  fr: {
    title: "NOUVELLES DU CLUB",
    subtitle: "DERNIÈRES MISES À JOUR",
    description: "La source définitive pour tout sur le Veria FC.",
    searchPlaceholder: "Rechercher...",
    all: "TOUTES LES NOUVELLES",
    readMore: "LIRE L'ARTICLE",
    noResults: "AUCUN RÉSULTAT",
    loading: "CHARGEMENT...",
    categories: ["Tous", "Rapport de Match", "Transfert", "Académie", "Nouvelles du Club"],
    newsBadge: "ACTUALITÉS"
  },
  es: {
    title: "NOTICIAS DEL CLUB",
    subtitle: "ÚLTIMAS ACTUALIZACIONES",
    description: "La fuente oficial de todo lo relacionado con el Veria FC.",
    searchPlaceholder: "Buscar...",
    all: "TODAS LAS NOTICIAS",
    readMore: "LEER MÁS",
    noResults: "SIN RESULTADOS",
    loading: "CARGANDO...",
    categories: ["Todos", "Informe del Partido", "Traspaso", "Academia", "Noticias del Club"],
    newsBadge: "NOTICIAS"
  }
};

function NewsPageContent() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "news"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNews(docs);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = (item.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-vnavy min-h-screen pt-[72px]">

      {/* Search Header */}
      <section className="relative py-24 px-6 md:px-[60px] border-b border-[rgba(255,255,255,0.06)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,174,239,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-[1440px] mx-auto text-center">
          <span className="section-eyebrow">{t.subtitle}</span>
          <h1 className="section-heading mt-4">{t.title}</h1>
          <p className="font-barlow text-lg text-vmuted max-w-[600px] mx-auto mt-6">{t.description}</p>

          <div className="max-w-[700px] mx-auto mt-12 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-vmuted" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-vnavy-mid border border-[rgba(255,255,255,0.1)] rounded-[12px] py-5 pl-16 pr-6 text-vwhite font-barlow focus:border-vgold transition-all focus:outline-none placeholder:text-vmuted/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-vmuted hover:text-vwhite transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div className="sticky top-[72px] z-20 bg-vnavy/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] py-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] flex overflow-x-auto gap-3 no-scrollbar justify-center">
          {t.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === t.categories[0] ? "All" : cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-barlow-condensed font-bold text-[11px] tracking-[2px] border transition-all ${(cat === t.categories[0] && activeCategory === "All") || activeCategory === cat
                ? "bg-vgold border-vgold text-vnavy"
                : "bg-transparent border-[rgba(255,255,255,0.1)] text-vwhite hover:border-vgold/40"
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="text-vgold font-bebas text-2xl animate-pulse">{t.loading}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredNews.map((item, idx) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => window.location.href = `/news/${item.id}`}
                  >
                    <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-6 border border-[rgba(255,255,255,0.06)] shadow-xl">
                      <img src={item.image || '/images/placeholder-news.jpg'} className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-vnavy via-transparent to-transparent opacity-60" />
                      <div className="absolute top-6 left-6">
                        <span className="px-3 py-1 bg-vgold text-vnavy font-barlow-condensed font-bold text-[10px] tracking-[2px] rounded uppercase">
                          {item.category || t.newsBadge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-vmuted font-barlow-condensed text-[12px] font-bold mb-3">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {item.readTime || '3m'} READ</div>
                    </div>

                    <h2 className="font-bebas text-[28px] text-vwhite tracking-[1.5px] leading-[1.1] group-hover:text-vgold transition-colors mb-4 line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="font-barlow text-sm text-vmuted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-vsky font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.readMore} <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-20">
              <span className="text-4xl mb-4 block">🧐</span>
              <p className="font-bebas text-xl text-vmuted tracking-[2px] uppercase">{t.noResults}</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vnavy flex items-center justify-center"><div className="w-10 h-10 border-2 border-vgold border-t-transparent rounded-full animate-spin"></div></div>}>
      <NewsPageContent />
    </Suspense>
  );
}
