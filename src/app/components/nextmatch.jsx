"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from "./ui/button";

const translations = {
  en: {
    title: "Next Match",
    date: "Coming Soon",
    time: "TBD",
    venue: "To be announced",
    buyTickets: "Buy Tickets",
    viewDetails: "Match Details",
    loading: "Loading next match...",
    noMatch: "No upcoming matches scheduled"
  },
  ru: {
    title: "Следующий матч",
    date: "Скоро",
    time: "Время уточняется",
    venue: "Место уточняется",
    buyTickets: "Купить билеты",
    viewDetails: "Детали матча",
    loading: "Загрузка матча...",
    noMatch: "Ближайшие матчи не запланированы"
  },
  fr: {
    title: "Prochain Match",
    date: "Bientôt",
    time: "À déterminer",
    venue: "Lieu à confirmer",
    buyTickets: "Acheter des billets",
    viewDetails: "Détails du match",
    loading: "Chargement du match...",
    noMatch: "Aucun match à venir prévu"
  }
};

export default function NextMatch() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const loadNextMatch = async () => {
      setIsLoading(true);
      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, orderBy("date", "asc"), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setMatch({
            id: doc.id,
            team1: doc.data().team1 || "Team 1",
            team1Logo: doc.data().team1Logo || "/images/team-placeholder.png",
            team2: doc.data().team2 || "Team 2",
            team2Logo: doc.data().team2Logo || "/images/team-placeholder.png",
            date: doc.data().date || t.date,
            time: doc.data().time || t.time,
            venue: doc.data().venue || t.venue,
            ticketLink: doc.data().ticketLink || "#",
            matchDetailsLink: doc.data().matchDetailsLink || "#"
          });
        } else {
          setMatch(null);
        }
      } catch (error) {
        console.error("Error loading next match:", error);
        setMatch(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadNextMatch();
  }, [t.date, t.time, t.venue]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white" ref={ref}>
        <div className="container mx-auto px-4 text-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-blue-800 rounded w-48 mx-auto"></div>
            <div className="h-6 bg-blue-800 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!match) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white" ref={ref}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg">{t.noMatch}</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={container}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center mb-2 text-yellow-400"
          >
            {t.title}
          </motion.h2>
          
          <motion.div 
            variants={item}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={container}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20"
          >
            <motion.div 
              variants={item}
              className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6"
            >
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start text-blue-100 mb-1">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-blue-100">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{match.time}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center text-blue-100">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{match.venue}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={container}
              className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8"
            >
              <motion.div 
                variants={item}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full p-2 mb-4 shadow-lg border-2 border-yellow-400/50">
                  <div className="w-full h-full bg-white rounded-full p-2 flex items-center justify-center">
                    <Image
                      src={match.team1Logo}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      alt={match.team1}
                      priority
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center">{match.team1}</h3>
              </motion.div>

              <motion.div 
                variants={item}
                className="px-6 py-2 bg-yellow-400 text-blue-900 rounded-full font-bold text-xl"
              >
                VS
              </motion.div>

              <motion.div 
                variants={item}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full p-2 mb-4 shadow-lg border-2 border-yellow-400/50">
                  <div className="w-full h-full bg-white rounded-full p-2 flex items-center justify-center">
                    <Image
                      src={match.team2Logo}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      alt={match.team2}
                      priority
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center">{match.team2}</h3>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-6 text-lg transition-all hover:scale-105"
                asChild
              >
                <a href={match.ticketLink} target="_blank" rel="noopener noreferrer">
                  {t.buyTickets}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all hover:scale-105"
                asChild
              >
                <a href={match.matchDetailsLink} target="_blank" rel="noopener noreferrer">
                  {t.viewDetails}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}