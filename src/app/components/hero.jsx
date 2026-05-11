"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { Goal, Trophy, Target, Users, Circle, Zap, Star, Heart, Hexagon, Triangle, Square, Diamond } from "lucide-react";

const translations = {
  en: {
    badge: "Almaty League A, Kazakhstan · Season 2025/26",
    title: "VE-GLOBALSPORTS FC",
    subtitle: "One club. One city. One ambition.",
    btnPrimary: "VIEW MATCHES",
    liveLabel: "LAST MATCH",
    liveMeta: "KPL MATCHDAY 21 · CENTRAL STADIUM, ALMATY",
    stats: [
      { label: "WINS", val: "14" },
      { label: "DRAWS", val: "5" },
      { label: "LOSSES", val: "3" },
      { label: "POSITION", val: "2ND", color: "text-vsky" },
      { label: "POINTS", val: "47" }
    ]
  },
  ru: {
    badge: "Алматинская лига A, Казахстан · Сезон 2025/26",
    title: "ВЕ-ГЛОБАЛСПОРТС ФК",
    subtitle: "Один клуб. Один город. Одна цель.",
    btnPrimary: "СМОТРЕТЬ МАТЧИ",
    liveLabel: "ПОСЛЕДНИЙ МАТЧ",
    liveMeta: "АЛМАТИНСКАЯ ЛИГА A ТУР 21 · ЦЕНТРАЛЬНЫЙ СТАДИОН, АЛМАТЫ",
    stats: [
      { label: "ПОБЕДЫ", val: "14" },
      { label: "НИЧЬИ", val: "5" },
      { label: "ПОРАЖЕНИЯ", val: "3" },
      { label: "ПОЗИЦИЯ", val: "2", color: "text-vsky" },
      { label: "ОЧКИ", val: "47" }
    ]
  }
};

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [lastMatch, setLastMatch] = React.useState(null);
  const [stats, setStats] = React.useState(t.stats);

  React.useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { collection, getDocs, query, where, orderBy, limit } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        // Fetch last match
        const qMatch = query(collection(db, "matches"), where("status", "==", "past"), orderBy("date", "desc"), limit(1));
        const snapMatch = await getDocs(qMatch);
        if (!snapMatch.empty) {
          setLastMatch({ id: snapMatch.docs[0].id, ...snapMatch.docs[0].data() });
        }

        // Potential: Fetch stats from a 'clubStats' doc if it exists
        // For now, we keep the translation stats but we could make them dynamic
      } catch (err) {
        console.error("Error loading hero data:", err);
      }
    };
    loadHeroData();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-[60px] pt-[72px] pb-[80px] overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0">
        <div className="hero-bg-image" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
      </div>

      {/* Football Doodles - Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <motion.div 
          className="absolute top-20 left-10 text-vgold/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Goal className="w-16 h-16" />
        </motion.div>
        
        {/* Top Right Corner */}
        <motion.div 
          className="absolute top-32 right-16 text-vsky/15"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12" />
        </motion.div>
        
        {/* Bottom Left Corner */}
        <motion.div 
          className="absolute bottom-40 left-20 text-vgold/10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Circle className="w-20 h-20" />
        </motion.div>
        
        {/* Bottom Right Corner */}
        <motion.div 
          className="absolute bottom-32 right-12 text-vsky/10"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <Goal className="w-14 h-14" />
        </motion.div>
        
        {/* Floating Stars */}
        <motion.div 
          className="absolute top-1/4 left-1/4 text-vgold/15"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-8 h-8" />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/3 text-vsky/15"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Star className="w-6 h-6" />
        </motion.div>
        
        {/* Small Football Elements */}
        <motion.div 
          className="absolute top-1/2 left-16 text-vgold/10"
          animate={{ 
            x: [0, 5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Circle className="w-10 h-10" />
        </motion.div>
        
        <motion.div 
          className="absolute top-2/3 right-20 text-vsky/10"
          animate={{ 
            x: [0, -5, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Circle className="w-8 h-8" />
        </motion.div>
        
        {/* Energy/Zap Elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 text-vgold/20"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-12 h-12" />
        </motion.div>
        
        {/* Heart Elements */}
        <motion.div 
          className="absolute bottom-1/4 left-1/3 text-vgold/15"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Heart className="w-10 h-10" />
        </motion.div>
        
        {/* Additional Doodles - Mid Section */}
        <motion.div 
          className="absolute top-1/2 left-1/4 text-vgold/12"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/4 text-vsky/12"
          animate={{ 
            rotate: [360, 180, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Triangle className="w-12 h-12" />
        </motion.div>
        
        {/* Small decorative elements */}
        <motion.div 
          className="absolute top-1/6 left-1/2 text-vgold/10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Square className="w-6 h-6" />
        </motion.div>
        
        <motion.div 
          className="absolute top-5/6 left-1/6 text-vsky/10"
          animate={{ 
            y: [0, 10, 0],
            rotate: [180, 270, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Diamond className="w-8 h-8" />
        </motion.div>
        
        {/* More floating elements */}
        <motion.div 
          className="absolute top-2/5 right-1/6 text-vgold/8"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -8, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-7 h-7" />
        </motion.div>
        
        <motion.div 
          className="absolute top-3/5 left-1/5 text-vsky/8"
          animate={{ 
            x: [0, -8, 0],
            y: [0, 8, 0],
            rotate: [360, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Circle className="w-6 h-6" />
        </motion.div>
        
        {/* Corner accents */}
        <motion.div 
          className="absolute top-12 right-32 text-vgold/15"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-9 h-9" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-28 text-vsky/15"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Trophy className="w-8 h-8" />
        </motion.div>
        
        {/* Tiny scattered elements */}
        <motion.div 
          className="absolute top-1/4 left-1/6 text-vgold/6"
          animate={{ 
            rotate: [0, 720],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-4 h-4" />
        </motion.div>
        
        <motion.div 
          className="absolute top-3/4 right-1/5 text-vsky/6"
          animate={{ 
            rotate: [720, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }}
        >
          <Circle className="w-3 h-3" />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 right-1/3 text-vgold/5"
          animate={{ 
            y: [0, -5, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Hexagon className="w-5 h-5" />
        </motion.div>
        
        <motion.div 
          className="absolute top-2/3 left-2/5 text-vsky/5"
          animate={{ 
            y: [0, 5, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Triangle className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div 
              className="hero-badge inline-flex items-center gap-2 bg-vgold/20 backdrop-blur-sm border border-vgold/40 rounded-full px-6 py-3 font-barlow-condensed font-bold text-[12px] tracking-[3px] uppercase text-vgold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="w-4 h-4" />
              </motion.div>
              {t.badge}
            </motion.div>

            <motion.div 
              className="font-bebas text-[clamp(48px,8vw,96px)] leading-[0.85] text-white tracking-[2px] uppercase mb-4 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Doodles around title */}
              <motion.div 
                className="absolute -top-4 -left-8 text-vgold/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6" />
              </motion.div>
              <motion.div 
                className="absolute -top-2 -right-6 text-vsky/30"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Circle className="w-5 h-5" />
              </motion.div>
              {t.title}
            </motion.div>

            <motion.div 
              className="font-barlow-condensed text-xl lg:text-2xl font-light text-white/90 max-w-[500px] mb-8 leading-relaxed relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Subtitle decorations */}
              <motion.div 
                className="absolute -top-2 left-0 text-vgold/25"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-4 h-4" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 right-0 text-vsky/25"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Circle className="w-3 h-3" />
              </motion.div>
              {t.subtitle}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              {/* Button decorations */}
              <motion.div 
                className="absolute -top-3 -left-3 text-vgold/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-2 -right-2 text-vsky/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Star className="w-4 h-4" />
              </motion.div>
              <button className="bg-vgold text-vnavy font-barlow-condensed font-bold text-[14px] tracking-[2px] uppercase px-12 py-4 rounded-[8px] hover:bg-vgold-light transition-all transform hover:-translate-y-1 shadow-xl shadow-vgold/30">
                {t.btnPrimary}
              </button>
            </motion.div>
          </div>

          {/* Right Content - Match Score */}
          {lastMatch && (
            <motion.div 
              className="flex justify-center lg:justify-end relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Match card decorations */}
              <motion.div 
                className="absolute top-0 right-0 text-vgold/30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="w-8 h-8" />
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 text-vgold/30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Goal className="w-7 h-7" />
              </motion.div>
              
              <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-[24px] p-8 max-w-[400px] w-full relative">
                <motion.div 
                  className="absolute -top-2 -right-2 text-vgold/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-5 h-5" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -left-2 text-vsky/20"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Circle className="w-4 h-4" />
                </motion.div>
                <div className="flex items-center justify-center gap-3 font-barlow-condensed text-[10px] font-bold tracking-[2px] uppercase text-vgold mb-6">
                  <div className="w-[8px] h-[8px] bg-vgold rounded-full live-dot-pulse" />
                  {t.liveLabel}
                </div>
                
                {/* Score Display */}
                <div className="flex items-center justify-between gap-6 mb-6">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                      {lastMatch.team1Logo ? (
                        <img src={lastMatch.team1Logo} alt="" className="w-[60px] h-[60px]" />
                      ) : (
                        <span className="font-bebas text-2xl text-white">VS</span>
                      )}
                    </div>
                    <div className="font-barlow-condensed font-bold text-xs text-white text-center line-clamp-1">{lastMatch.team1}</div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bebas text-5xl text-vgold leading-none">{lastMatch.homeScore ?? 0}</div>
                    </div>
                    <div className="font-bebas text-2xl text-white/60">:</div>
                    <div className="text-center">
                      <div className="font-bebas text-5xl text-vgold leading-none">{lastMatch.awayScore ?? 0}</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                      {lastMatch.team2Logo ? (
                        <img src={lastMatch.team2Logo} alt="" className="w-[60px] h-[60px]" />
                      ) : (
                        <span className="font-bebas text-2xl text-white">FC</span>
                      )}
                    </div>
                    <div className="font-barlow-condensed font-bold text-xs text-white text-center line-clamp-1">{lastMatch.team2}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10 font-barlow-condensed text-[10px] text-white/60 text-center tracking-[1px] relative">
                  <motion.div 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-vgold/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="w-3 h-3" />
                  </motion.div>
                  {lastMatch.competition || t.liveMeta} · {lastMatch.date}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>


      {/* Enhanced Football Stats */}
      <motion.div 
        className="absolute bottom-[40px] left-6 right-6 md:left-[60px] md:right-[60px] z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-[16px] overflow-hidden">
          {t.stats.map((s, idx) => (
            <motion.div
              key={idx}
              className={`p-6 border-r border-white/10 last:border-r-0 border-t md:border-t-0 border-white/10 first:border-t-2 first:border-vgold hover:bg-white/5 transition-all group cursor-pointer ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`block font-bebas text-[38px] leading-none mb-2 transition-colors ${s.color || 'text-vgold'} group-hover:text-white`}>{s.val}</span>
              <span className="block font-barlow-condensed font-semibold text-[9px] tracking-[2px] uppercase text-white/60 group-hover:text-vgold transition-colors">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;