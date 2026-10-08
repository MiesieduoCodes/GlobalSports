"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VideoCard from "@/app/components/VideoCard";
import { loadVideos } from "@/lib/media";

const translations = {
  en: { eyebrow: "On Camera", title: "Latest videos.", cta: "All Videos" },
  ru: { eyebrow: "В кадре", title: "Последние видео.", cta: "Все видео" }
};

// Home page strip of the newest videos (managed in /admin → Videos)
export default function LatestVideos({ language, count = 3 }) {
  const t = translations[language] || translations.en;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos().then((list) => setVideos(list.slice(0, count)));
  }, [count]);

  if (!videos.length) return null;

  return (
    <section className="section">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-eyebrow">{t.eyebrow}</span>
            <h2 className="section-heading mb-0">{t.title}</h2>
          </div>
          <Link
            href="/videos"
            className="border border-vgold text-vgold font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold hover:text-vnavy transition-colors"
          >
            {t.cta}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <VideoCard video={v} language={language} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
