"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { FiCalendar, FiClock, FiFilter, FiX } from 'react-icons/fi';

const translations = {
  en: {
    title: "Upcoming Matches",
    previousMatches: "Previous Matches",
    nextMatches: "Upcoming Matches",
    filterBy: "Filter by",
    all: "All",
    league: "League",
    cup: "Cup",
    friendly: "Friendly",
    timeRemaining: "Starts in",
    buyTickets: "Buy Tickets",
    matchDetails: "Match Details",
    venue: "Venue",
    noMatches: "No matches found"
  },
  ru: {
    title: "Предстоящие матчи",
    previousMatches: "Прошедшие матчи",
    nextMatches: "Будущие матчи",
    filterBy: "Фильтр по",
    all: "Все",
    league: "Лига",
    cup: "Кубок",
    friendly: "Товарищеский",
    timeRemaining: "До начала",
    buyTickets: "Купить билеты",
    matchDetails: "Детали матча",
    venue: "Место проведения",
    noMatches: "Матчи не найдены"
  }
};

const MatchesPage = () => {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample match data - replace with your actual data source
  const [matches, setMatches] = useState([
    {
      id: 1,
      homeTeam: 'FC Global',
      awayTeam: 'FC United',
      homeScore: null,
      awayScore: null,
      date: '2025-12-15T19:45:00',
      competition: 'league',
      venue: 'Global Arena',
      status: 'upcoming'
    },
    // Add more matches...
  ]);

  const filteredMatches = matches
    .filter(match => 
      (filter === 'all' || match.competition === filter) &&
      (activeTab === 'upcoming' ? match.status === 'upcoming' : match.status === 'completed')
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', options);
  };

  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
      const difference = new Date(targetDate) - new Date();
      
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return (
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
        <FiClock className="mr-1" />
        <span className="font-medium">{content.timeRemaining}:</span>
        <span className="font-mono">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours.toString().padStart(2, '0')}h {timeLeft.minutes.toString().padStart(2, '0')}m
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {content.nextMatches}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {content.previousMatches}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="w-5 h-5" />
              <span>{content.filterBy}</span>
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {['all', 'league', 'cup', 'friendly'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilter(type);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        filter === type
                          ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400'
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMatches.length > 0 ? (
            <AnimatePresence>
              {filteredMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full">
                        {content[match.competition] || match.competition}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-1" />
                        {formatDate(match.date).split(',')[0]}
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
                        <span className="font-medium text-gray-900 dark:text-white">{match.homeTeam}</span>
                        {match.homeScore !== null && (
                          <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">{match.homeScore}</span>
                        )}
                      </div>
                      
                      <div className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                        VS
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
                        <span className="font-medium text-gray-900 dark:text-white">{match.awayTeam}</span>
                        {match.awayScore !== null && (
                          <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">{match.awayScore}</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-500 dark:text-gray-400">
                          <FiCalendar className="inline mr-1" />
                          {formatDate(match.date)}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          <FiClock className="inline mr-1" />
                          {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{content.venue}:</span> {match.venue}
                      </div>
                      
                      {match.status === 'upcoming' ? (
                        <div className="mt-4">
                          <CountdownTimer targetDate={match.date} />
                          <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                            {content.buyTickets}
                          </button>
                        </div>
                      ) : (
                        <button className="w-full mt-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 font-medium py-2 px-4 rounded-lg transition-colors">
                          {content.matchDetails}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">{content.noMatches}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;