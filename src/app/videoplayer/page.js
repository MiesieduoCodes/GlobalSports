"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronLeft, Play, Share2, Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const translations = {
  en: { back: "Back to Media", related: "Related Videos" },
  ru: { back: "Назад к медиа", related: "Похожие видео" }
};

function VideoContent() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v") || "1";

  // Mock for now, in a real app this would fetch based on videoId
  const video = { title: videoId === "1" ? "Highlights: Veria FC 3–0 FC Kairat" : "Veria FC Premium Content", category: "Match Report", duration: "8:45" };

  return (
    <div className="max-w-[1200px] mx-auto">
      <Link href="/videos" className="inline-flex items-center gap-2 text-vsky font-barlow-condensed font-bold tracking-[2px] uppercase text-[12px] mb-8 hover:text-vwhite transition-colors">
        <ChevronLeft className="w-4 h-4" /> {t.back}
      </Link>

      <div className="aspect-video bg-black rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative group">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-vnavy/40 to-transparent">
          <div className="w-20 h-20 rounded-full bg-vgold/20 backdrop-blur-md border border-vgold/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-vgold fill-vgold ml-1" />
          </div>
        </div>
        <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between z-20">
          <div className="font-bebas text-2xl text-vwhite tracking-[1px]">{video.title}</div>
          <div className="flex gap-4">
            <Share2 className="w-5 h-5 text-vmuted hover:text-vsky cursor-pointer" />
            <Info className="w-5 h-5 text-vmuted hover:text-vsky cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-12 py-8 border-t border-white/5">
        <h2 className="font-bebas text-2xl text-vwhite tracking-[2px] mb-6">{t.related}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-video bg-vnavy-card border border-white/5 rounded-[12px] animate-pulse" />
          ))}
        </div>
      </div>
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