"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Clock, ArrowLeft, Share2, Ticket } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const translations = {
  en: {
    back: "Back to Matches",
    matchCentre: "Match Centre",
    ticketInfo: "Ticket Information",
    venueInfo: "Venue Information",
    buyTickets: "Purchase Tickets",
    matchStats: "Match Stats",
    loading: "Loading Match Details...",
    notFound: "Match Not Found",
    upcoming: "Upcoming Match",
    final: "Full Time"
  },
  ru: {
    back: "К матчам",
    matchCentre: "Матч-центр",
    ticketInfo: "Информация о билетах",
    venueInfo: "Информация о стадионе",
    buyTickets: "Купить билеты",
    matchStats: "Статистика матча",
    loading: "Загрузка данных...",
    notFound: "Матч не найден",
    upcoming: "Предстоящий матч",
    final: "Финальный свисток"
  }
};

export default function MatchDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const docRef = doc(db, "matches", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMatch({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching match:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-vnavy min-h-screen flex items-center justify-center">
        <div className="text-vgold font-bebas text-3xl animate-pulse">{t.loading}</div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="bg-vnavy min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-bebas text-5xl text-vwhite mb-4">{t.notFound}</h1>
        <Link href="/matches" className="text-vgold hover:underline font-barlow-condensed font-bold tracking-[2px] uppercase">
          {t.back}
        </Link>
      </div>
    );
  }

  const isPast = match.status === 'past' || (new Date(match.date) < new Date());

  return (
    <main className="bg-vnavy min-h-screen">
      <Navbar />
      
      {/* Hero / Scoreboard Section */}
      <section className="relative pt-[120px] pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-vnavy-mid opacity-50" />
        <div className="kz-grid opacity-[0.03]" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <Link href="/matches" className="inline-flex items-center gap-2 text-vmuted hover:text-vwhite mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase">{t.back}</span>
          </Link>

          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-3 bg-vsky/10 border border-vsky/20 rounded-full px-6 py-2 mb-12">
              <span className={`w-2 h-2 rounded-full ${isPast ? 'bg-vmuted' : 'bg-vgold animate-pulse'}`} />
              <span className="font-barlow-condensed font-bold text-[11px] tracking-[3px] uppercase text-vsky">
                {match.competition || "PREMIER LEAGUE"} · {isPast ? t.final : t.upcoming}
              </span>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
              {/* Home Team */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col items-center gap-6"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-vnavy-mid border-2 border-white/5 p-8 flex items-center justify-center shadow-2xl relative group">
                   <div className="absolute inset-0 rounded-full bg-vgold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img src={match.team1Logo || "/images/team-placeholder.png"} alt={match.team1} className="w-full h-full object-contain relative z-10" />
                </div>
                <h2 className="font-bebas text-3xl md:text-5xl text-vwhite text-center tracking-[1px]">{match.team1}</h2>
              </motion.div>

              {/* Score / VS */}
              <div className="flex flex-col items-center gap-4">
                {isPast ? (
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="font-bebas text-7xl md:text-9xl text-vgold">{match.homeScore ?? 0}</span>
                    <span className="font-bebas text-4xl md:text-6xl text-vwhite/10">:</span>
                    <span className="font-bebas text-7xl md:text-9xl text-vwhite">{match.awayScore ?? 0}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="font-bebas text-5xl md:text-7xl text-vwhite/10 mb-4">VS</span>
                    <div className="bg-vgold text-vnavy px-8 py-3 rounded-xl font-bebas text-3xl tracking-[2px]">
                      {match.time}
                    </div>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col items-center gap-6"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-vnavy-mid border-2 border-white/5 p-8 flex items-center justify-center shadow-2xl relative group">
                   <div className="absolute inset-0 rounded-full bg-vgold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img src={match.team2Logo || "/images/team-placeholder.png"} alt={match.team2} className="w-full h-full object-contain relative z-10" />
                </div>
                <h2 className="font-bebas text-3xl md:text-5xl text-vwhite text-center tracking-[1px]">{match.team2}</h2>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
          {/* Match Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-vnavy-mid border border-white/5 rounded-2xl p-8">
              <h3 className="font-bebas text-2xl text-vwhite mb-8 border-b border-white/5 pb-4">{t.matchCentre}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-vsky/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-vsky" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-vmuted uppercase tracking-[1.5px] mb-1">Date</div>
                    <div className="text-vwhite font-barlow font-semibold">{match.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-vgold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-vgold" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-vmuted uppercase tracking-[1.5px] mb-1">Time</div>
                    <div className="text-vwhite font-barlow font-semibold">{match.time} (ALMT)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-vsky/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-vsky" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-vmuted uppercase tracking-[1.5px] mb-1">Venue</div>
                    <div className="text-vwhite font-barlow font-semibold">{match.venue || "Central Stadium, Almaty"}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-vgold/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-vgold" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-vmuted uppercase tracking-[1.5px] mb-1">Competition</div>
                    <div className="text-vwhite font-barlow font-semibold">{match.competition}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for Match Report / Timeline */}
            <div className="bg-vnavy-mid border border-white/5 rounded-2xl p-8 opacity-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bebas text-2xl text-vwhite">{t.matchStats}</h3>
                <span className="text-[10px] font-bold text-vsky uppercase tracking-[2px]">Coming Soon</span>
              </div>
              <div className="space-y-4">
                 <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                 <div className="h-4 bg-white/5 rounded w-[80%] animate-pulse" />
                 <div className="h-4 bg-white/5 rounded w-[60%] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             {!isPast && (
               <div className="bg-gradient-to-br from-vgold to-vgold-light rounded-2xl p-8 text-vnavy relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Ticket className="w-32 h-32" />
                  </div>
                  <h4 className="font-bebas text-2xl mb-2">{t.buyTickets}</h4>
                  <p className="font-barlow text-sm font-medium mb-6 opacity-80">Secure your seat for this blockbuster fixture at the Central Stadium.</p>
                  <button className="w-full bg-vnavy text-vwhite font-barlow-condensed font-bold py-3 rounded-lg tracking-[2px] uppercase hover:bg-vnavy/90 transition-colors">
                    {t.buyTickets}
                  </button>
               </div>
             )}
             
             <div className="bg-vnavy-mid border border-white/5 rounded-2xl p-8 text-center">
                <Share2 className="w-8 h-8 text-vsky mx-auto mb-4" />
                <h4 className="font-bebas text-xl text-vwhite mb-2">Share this Match</h4>
                <p className="font-barlow text-xs text-vmuted mb-6">Invite your friends to join the action.</p>
                <div className="flex justify-center gap-3">
                   {["TW", "FB", "WA"].map(p => (
                     <button key={p} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-vwhite font-bold text-[10px] hover:bg-vsky/20 transition-colors">
                        {p}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
