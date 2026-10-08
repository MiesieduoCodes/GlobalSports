"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { formatDate, formatDuration, localized } from "@/lib/media";

// Uses the uploaded thumbnail when there is one, otherwise the video's own frame at 1s
export function VideoThumb({ video, className = "" }) {
  return video.thumbnail ? (
    <img src={video.thumbnail} alt="" loading="lazy" className={`w-full h-full object-cover ${className}`} />
  ) : (
    <video src={`${video.src}#t=1`} preload="metadata" muted playsInline className={`w-full h-full object-cover ${className}`} />
  );
}

export default function VideoCard({ video, language, compact = false }) {
  const title = localized(video.title, language);
  return (
    <Link
      href={`/videoplayer?v=${encodeURIComponent(video.id)}`}
      className="bg-vnavy-card border border-white/5 rounded-[20px] overflow-hidden group hover:border-vsky/30 transition-all flex flex-col h-full"
    >
      <div className="aspect-video bg-vnavy relative flex items-center justify-center overflow-hidden">
        <VideoThumb video={video} className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-vnavy/70 via-transparent to-transparent" />
        <div className={`${compact ? "w-11 h-11" : "w-16 h-16"} rounded-full bg-vwhite/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-vgold/30 transition-all duration-300 relative z-10`}>
          <Play className={`${compact ? "w-4 h-4" : "w-6 h-6"} text-vwhite fill-vwhite ml-0.5`} />
        </div>
        {video.duration > 0 && (
          <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-vwhite font-barlow-condensed text-[10px] font-bold px-2 py-0.5 rounded tracking-[1px]">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>
      <div className={compact ? "p-4" : "p-7"}>
        <div className="flex items-center gap-3 mb-2">
          {video.category && <span className="font-barlow-condensed font-bold text-[10px] tracking-[2px] uppercase text-vsky">{video.category}</span>}
          {video.category && video.date && <span className="text-vmuted text-[10px]">•</span>}
          {video.date && <span className="text-vmuted text-[10px]">{formatDate(video.date, language)}</span>}
        </div>
        <h3 className={`font-barlow-condensed font-bold ${compact ? "text-base" : "text-lg"} text-vwhite leading-snug group-hover:text-vgold transition-colors`}>{title}</h3>
      </div>
    </Link>
  );
}
