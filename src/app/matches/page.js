"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar, Clock, MapPin, Filter, Ticket, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const translations = {
  en: {
    title: "Match Centre",
    subtitle: "All Fixtures & Results",
    description: "Stay up to date with all Global Sports FC fixtures, results, and match information.",
    previousMatches: "Past Results",
    nextMatches: "Upcoming Fixtures",
    filterBy: "Filter",
    all: "All Competitions",
    league: "League",
    cup: "Cup",
    friendly: "Friendly",
    timeRemaining: "Kicks off in",
    buyTickets: "Buy Tickets",
    matchDetails: "View Details",
    venue: "Venue",
    noMatches: "No matches found",
    loading: "Loading matches...",
    days: "days",
    hours: "hours",
    mins: "mins"
  },
  ru: {
    title: "Матч-Центр",
    subtitle: "Все Матчи и Результаты",
    description: "Следите за всеми матчами, результатами и информацией Global Sports FC.",
    previousMatches: "Прошедшие Матчи",
    nextMatches: "Предстоящие Матчи",
    filterBy: "Фильтр",
    all: "Все Соревнования",
    league: "Лига",
    cup: "Кубок",
    friendly: "Товарищеский",
    timeRemaining: "До начала",
    buyTickets: "Купить Билеты",
    matchDetails: "Подробнее",
    venue: "Место",
    noMatches: "Матчи не найдены",
    loading: "Загрузка матчей...",
    days: "дней",
    hours: "часов",
    mins: "мин"
  },
  fr: {
    title: "Centre des Matchs",
    subtitle: "Tous les Matchs et Résultats",
    description: "Restez informé de tous les matchs et résultats de Global Sports FC.",
    previousMatches: "Résultats Passés",
    nextMatches: "Matchs à Venir",
    filterBy: "Filtrer",
    all: "Toutes Compétitions",
    league: "Ligue",
    cup: "Coupe",
    friendly: "Amical",
    timeRemaining: "Coup d'envoi dans",
    buyTickets: "Acheter Billets",
    matchDetails: "Voir Détails",
    venue: "Lieu",
    noMatches: "Aucun match trouvé",
    loading: "Chargement...",
    days: "jours",
    hours: "heures",
    mins: "min"
  },
  es: {
    title: "Centro de Partidos",
    subtitle: "Todos los Partidos y Resultados",
    description: "Mantente al día con todos los partidos y resultados de Global Sports FC.",
    previousMatches: "Resultados Pasados",
    nextMatches: "Próximos Partidos",
    filterBy: "Filtrar",
    all: "Todas las Competiciones",
    league: "Liga",
    cup: "Copa",
    friendly: "Amistoso",
    timeRemaining: "Comienza en",
    buyTickets: "Comprar Entradas",
    matchDetails: "Ver Detalles",
    venue: "Lugar",
    noMatches: "No se encontraron partidos",
    loading: "Cargando...",
    days: "días",
    hours: "horas",
    mins: "min"
  }
};

const MatchesPage = () => {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, orderBy("date", "asc"));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            homeTeam: doc.data().team1 || "Global Sports FC",
            awayTeam: doc.data().team2 || "Opponent",
            homeLogo: doc.data().team1Logo || "/images/logo.png",
            awayLogo: doc.data().team2Logo || "/images/opponent.png",
            homeScore: doc.data().homeScore ?? null,
            awayScore: doc.data().awayScore ?? null,
            date: doc.data().date || new Date().toISOString().split('T')[0],
            time: doc.data().time || "19:00",
            venue: doc.data().venue || "Global Sports Arena",
            competition: doc.data().competition || "league",
            status: new Date(`${doc.data().date}T${doc.data().time || "19:00"}`) > new Date() ? "upcoming" : "completed"
          }));
          setMatches(docs);
        } else {
          // Sample data if no matches in Firestore
          setMatches([
            {
              id: 1,
              homeTeam: 'Global Sports FC',
              awayTeam: 'FC United',
              homeLogo: '/images/logo.png',
              awayLogo: '/images/opponent.png',
              homeScore: null,
              awayScore: null,
              date: '2025-12-15',
              time: '19:45',
              competition: 'league',
              venue: 'Global Arena, Almaty',
              status: 'upcoming'
            },
            {
              id: 2,
              homeTeam: 'Dynamo FC',
              awayTeam: 'Global Sports FC',
              homeLogo: '/images/opponent.png',
              awayLogo: '/images/logo.png',
              homeScore: null,
              awayScore: null,
              date: '2025-12-20',
              time: '18:00',
              competition: 'cup',
              venue: 'Dynamo Stadium',
              status: 'upcoming'
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading matches:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  const filteredMatches = matches
    .filter(match => 
      (filter === 'all' || match.competition === filter) &&
      (activeTab === 'upcoming' ? match.status === 'upcoming' : match.status === 'completed')
    )
    .sort((a, b) => activeTab === 'upcoming' 
      ? new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
      : new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`)
    );

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(language, { 
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const CountdownTimer = ({ date, time }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
      const difference = new Date(`${date}T${time}`) - new Date();
      if (difference <= 0) return null;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 60000); // Update every minute
      return () => clearInterval(timer);
    }, [date, time]);

    if (!timeLeft) return null;

    return (
      <div className="flex items-center gap-4 text-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-3 py-2">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft.days}</div>
          <div className="text-xs text-gray-500">{content.days}</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-3 py-2">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft.hours}</div>
          <div className="text-xs text-gray-500">{content.hours}</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-3 py-2">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-500">{content.mins}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{content.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {content.nextMatches}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {content.previousMatches}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              <Filter className="w-5 h-5" />
              <span>{content.filterBy}</span>
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {['all', 'league', 'cup', 'friendly'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilter(type);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium ${
                        filter === type
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {content[type] || type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">{content.loading}</p>
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  {/* Match Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                      {content[match.competition] || match.competition}
                    </span>
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(match.date)}
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                          {match.homeLogo ? (
                            <img src={match.homeLogo} alt={match.homeTeam} className="w-16 h-16 object-contain" />
                          ) : (
                            <span className="text-2xl font-bold text-gray-400">{match.homeTeam.slice(0, 2)}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{match.homeTeam}</h3>
                        {match.homeScore !== null && (
                          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{match.homeScore}</span>
                        )}
                      </div>
                      
                      <div className="px-6">
                        {match.status === 'completed' && match.homeScore !== null ? (
                          <div className="text-4xl font-bold text-gray-300 dark:text-gray-600">-</div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-gray-400">VS</span>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {match.time}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                          {match.awayLogo ? (
                            <img src={match.awayLogo} alt={match.awayTeam} className="w-16 h-16 object-contain" />
                          ) : (
                            <span className="text-2xl font-bold text-gray-400">{match.awayTeam.slice(0, 2)}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{match.awayTeam}</h3>
                        {match.awayScore !== null && (
                          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{match.awayScore}</span>
                        )}
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.venue}
                    </div>

                    {/* Countdown or Action */}
                    {match.status === 'upcoming' && (
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-gray-500 mb-2">{content.timeRemaining}</span>
                          <CountdownTimer date={match.date} time={match.time} />
                          <button className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center">
                            <Ticket className="w-5 h-5 mr-2" />
                            {content.buyTickets}
                          </button>
                        </div>
                      </div>
                    )}

                    {match.status === 'completed' && (
                      <button className="w-full border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center">
                        {content.matchDetails}
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚽</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {content.noMatches}
            </h3>
            <button
              onClick={() => { setFilter('all'); setActiveTab('upcoming'); }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
