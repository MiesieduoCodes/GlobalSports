"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Link from "next/link";
import { FALLBACK_NEWS } from "@/lib/constants";

const translations = {
  en: {
    eyebrow: "Club News",
    title: "Latest ",
    titleAccent: "Updates",
    featuredTag: "Match Report",
    loading: "Loading news...",
  },
  ru: {
    eyebrow: "Новости Клуба",
    title: "Последние ",
    titleAccent: "Обновления",
    featuredTag: "Отчет о матче",
    loading: "Загрузка новостей...",
  }
};

export default function News() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const q = query(collection(db, "news"), limit(4));
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

        if (newsData.length > 0) {
          setNews(newsData);
        } else {
          // Map constants to rendered fields
          const base = FALLBACK_NEWS[language] || FALLBACK_NEWS.en;
          setNews(base.map(n => ({
            ...n,
            imageUrl: n.image,
            renderedTitle: n.title,
            renderedDesc: n.description
          })));
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        const base = FALLBACK_NEWS[language] || FALLBACK_NEWS.en;
        setNews(base.map(n => ({
          ...n,
          imageUrl: n.image,
          renderedTitle: n.title,
          renderedDesc: n.description
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [language]);

  if (loading) {
    return (
      <section className="section">
        <div className="max-w-[1440px] mx-auto text-center font-bebas text-2xl text-vgold animate-pulse">
          {t.loading}
        </div>
      </section>
    );
  }

  const featured = news[0];
  const list = news.slice(1);

  return (
    <section className="section">
      <div className="max-w-[1440px] mx-auto">
        <div className="section-eyebrow">{t.eyebrow}</div>
        <div className="section-heading">{t.title}<span className="text-vgold">{t.titleAccent}</span></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 mt-12">

          {/* Featured News */}
          {featured && (
            <Link href={`/news/${featured.id}`} className="bg-vnavy-mid border border-white/5 rounded-[16px] overflow-hidden group cursor-pointer hover:border-vsky/20 hover:-translate-y-1 transition-all flex flex-col">
              <div className="h-[320px] bg-vnavy-light relative overflow-hidden shrink-0">
                {featured.imageUrl ? (
                  <img src={featured.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bebas text-3xl text-white/5">NEWS</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-vnavy via-transparent to-transparent z-10" />
              </div>
              <div className="p-6 md:p-8 relative z-20 flex-1 flex flex-col justify-end">
                <span className="inline-block self-start px-2.5 py-1 bg-vsky text-vnavy rounded font-barlow-condensed font-bold text-[10px] tracking-[1.5px] uppercase mb-4">
                  {featured.category || t.featuredTag}
                </span>
                <h3 className="font-bebas text-[38px] leading-[0.92] text-vwhite tracking-[1.5px] mb-4 group-hover:text-vgold transition-colors">
                  {featured.renderedTitle}
                </h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed mb-4 line-clamp-2">
                  {featured.renderedDesc}
                </p>
                <div className="font-barlow-condensed text-[11px] text-vmuted uppercase tracking-[1px]">
                  {featured.date || "March 2026"}
                </div>
              </div>
            </Link>
          )}

          {/* News List */}
          <div className="flex flex-col gap-4">
            {list.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="bg-vnavy-card border border-white/5 rounded-[12px] overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:border-vgold/20 hover:translate-x-1 transition-all">
                <div className="w-full sm:w-[120px] aspect-video sm:aspect-square bg-vnavy-mid shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bebas text-lg text-white/5">NEWS</div>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <span className="inline-block self-start px-2 py-0.5 bg-vnavy-light border border-white/10 rounded text-vsky font-barlow-condensed font-bold text-[9px] tracking-[1px] uppercase mb-2">
                    {item.category || "Club News"}
                  </span>
                  <h4 className="font-bebas text-xl text-vwhite leading-snug group-hover:text-vgold transition-colors">
                    {item.renderedTitle}
                  </h4>
                  <span className="text-[10px] text-vmuted mt-1 font-barlow uppercase tracking-[1px]">{item.date || "Mar 2026"}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
