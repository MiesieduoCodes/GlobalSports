"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import VideoCard from "@/app/components/VideoCard";
import { formatDate, loadVideos, localized } from "@/lib/media";

const translations = {
  en: { back: "Back to Media", related: "More Videos", notFound: "This video isn't available.", loading: "Loading…" },
  ru: { back: "Назад к медиа", related: "Другие видео", notFound: "Это видео недоступно.", loading: "Загрузка…" }
};

function VideoContent() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    loadVideos().then(setVideos);
  }, []);

  const video = videos?.find((v) => v.id === videoId) || videos?.[0];
  const related = (videos || []).filter((v) => v.id !== video?.id).slice(0, 3);
  const description = video ? localized(video.description, language) : "";

  return (
    <div className="max-w-[1200px] mx-auto">
      <Link href="/videos" className="inline-flex items-center gap-2 text-vsky font-barlow-condensed font-bold tracking-[2px] uppercase text-[12px] mb-8 hover:text-vwhite transition-colors">
        <ChevronLeft className="w-4 h-4" /> {t.back}
      </Link>

      <div className="aspect-video bg-black rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">
        {video ? (
          <video
            key={video.id}
            src={video.src}
            poster={video.thumbnail || undefined}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full bg-black"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bebas text-xl text-vmuted tracking-[2px]">
            {videos ? t.notFound : t.loading}
          </div>
        )}
      </div>

      {video && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            {video.category && <span className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky">{video.category}</span>}
            {video.date && <span className="text-vmuted text-xs">{formatDate(video.date, language)}</span>}
          </div>
          <h1 className="font-bebas text-3xl md:text-4xl text-vwhite tracking-[1px]">{localized(video.title, language)}</h1>
          {description && <p className="font-barlow text-vmuted leading-relaxed mt-3 max-w-[760px]">{description}</p>}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-12 py-8 border-t border-white/5">
          <h2 className="font-bebas text-2xl text-vwhite tracking-[2px] mb-6">{t.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((v) => (
              <VideoCard key={v.id} video={v} language={language} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <main className="bg-vnavy min-h-screen pt-[120px] pb-20 px-6 md:px-[60px]">
      <Suspense fallback={<div className="text-center py-20 font-bebas text-2xl text-vgold animate-pulse">Loading...</div>}>
        <VideoContent />
      </Suspense>
    </main>
  );
}
