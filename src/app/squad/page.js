"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Translations
const translations = {
  en: {
    title: "Meet Our Elite Squad",
    subtitle: "The Heartbeat of Global Sport FC",
    description: "Discover the exceptional talents driving GSFC's success. Each player represents a unique journey of dedication, skill, and triumph.",
    filterAll: "All Players",
    filterGoalkeepers: "Goalkeepers",
    filterDefenders: "Defenders",
    filterMidfielders: "Midfielders",
    filterAttackers: "Attackers",
    viewProfile: "View Profile",
    stats: {
      appearances: "Apps",
      goals: "Goals",
      assists: "Assists",
      cleanSheets: "Clean Sheets"
    },
    joinDate: "Joined",
    noPlayers: "No players found. Add players through the admin dashboard.",
    loading: "Loading squad..."
  },
  ru: {
    title: "Знакомьтесь с нашей элитной командой",
    subtitle: "Сердцебиение Global Sport FC",
    description: "Откройте для себя исключительные таланты, движущие успехом GSFC.",
    filterAll: "Все игроки",
    filterGoalkeepers: "Вратари",
    filterDefenders: "Защитники",
    filterMidfielders: "Полузащитники",
    filterAttackers: "Нападающие",
    viewProfile: "Профиль",
    stats: {
      appearances: "Матчи",
      goals: "Голы",
      assists: "Передачи",
      cleanSheets: "Сухие матчи"
    },
    joinDate: "В клубе с",
    noPlayers: "Игроки не найдены. Добавьте игроков через панель администратора.",
    loading: "Загрузка состава..."
  },
  fr: {
    title: "Rencontrez Notre Équipe d'Élite",
    subtitle: "Le Cœur Battant du Global Sport FC",
    description: "Découvrez les talents exceptionnels qui font le succès du GSFC.",
    filterAll: "Tous les Joueurs",
    filterGoalkeepers: "Gardiens",
    filterDefenders: "Défenseurs",
    filterMidfielders: "Milieux",
    filterAttackers: "Attaquants",
    viewProfile: "Voir Profil",
    stats: {
      appearances: "Matchs",
      goals: "Buts",
      assists: "Passes",
      cleanSheets: "Clean Sheets"
    },
    joinDate: "Arrivé en",
    noPlayers: "Aucun joueur trouvé. Ajoutez des joueurs via le tableau de bord.",
    loading: "Chargement de l'équipe..."
  },
  es: {
    title: "Conoce a Nuestro Equipo de Élite",
    subtitle: "El Latido del Global Sport FC",
    description: "Descubre los talentos excepcionales que impulsan el éxito del GSFC.",
    filterAll: "Todos los Jugadores",
    filterGoalkeepers: "Porteros",
    filterDefenders: "Defensores",
    filterMidfielders: "Mediocampistas",
    filterAttackers: "Atacantes",
    viewProfile: "Ver Perfil",
    stats: {
      appearances: "Partidos",
      goals: "Goles",
      assists: "Asistencias",
      cleanSheets: "Porterías a cero"
    },
    joinDate: "Se unió en",
    noPlayers: "No se encontraron jugadores. Agregue jugadores a través del panel de administración.",
    loading: "Cargando plantilla..."
  },
};

export default function PlayersPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load players from Firestore
  useEffect(() => {
    async function loadPlayers() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "players"));
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(docs);
      } catch (error) {
        console.error("Error loading players:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPlayers();
  }, []);

  // Filter players by position
  const filteredPlayers = players.filter(player => {
    if (activeFilter === "all") return true;
    const position = player.position?.toLowerCase() || "";
    if (activeFilter === "goalkeepers") return position.includes("goalkeeper");
    if (activeFilter === "defenders") return position.includes("defender");
    if (activeFilter === "midfielders") return position.includes("midfielder");
    if (activeFilter === "attackers") return position.includes("attacker") || position.includes("forward") || position.includes("striker");
    return true;
  });

  // GSAP Animations
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const getPositionColor = (position) => {
    const pos = position?.toLowerCase() || "";
    if (pos.includes("goalkeeper")) return "from-yellow-500 to-orange-600";
    if (pos.includes("defender")) return "from-blue-500 to-blue-700";
    if (pos.includes("midfielder")) return "from-green-500 to-green-700";
    if (pos.includes("attacker") || pos.includes("forward") || pos.includes("striker")) return "from-red-500 to-red-700";
    return "from-gray-500 to-gray-700";
  };

  const getFlagEmoji = (nationality) => {
    const flags = {
      Ghana: "🇬🇭",
      Nigeria: "🇳🇬",
      Kazakhstan: "🇰🇿",
      Russia: "🇷🇺",
      USA: "🇺🇸",
      UK: "🇬🇧",
      France: "🇫🇷",
      Spain: "🇪🇸",
      Germany: "🇩🇪",
      Brazil: "🇧🇷",
      Argentina: "🇦🇷",
    };
    return flags[nationality] || "🏴";
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
              Elite Football Talent
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            {content.subtitle}
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["all", "goalkeepers", "defenders", "midfielders", "attackers"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {content[`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`]}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">{content.loading}</p>
          </div>
        )}

        {/* Players Grid */}
        {!loading && filteredPlayers.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* Player Image/Header */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    {/* Jersey Number Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg shadow-lg">
                        {player.jerseyNumber || "?"}
                      </div>
                    </div>
                    
                    {/* Player Image or Placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-3xl">⚽</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Player Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {player.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getPositionColor(player.position)} text-white`}>
                          {player.position}
                        </span>
                        {player.nationality && (
                          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span className="mr-1">{getFlagEmoji(player.nationality)}</span>
                            {player.nationality}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                        <div className="font-bold text-gray-900 dark:text-white">{player.appearances || 0}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{content.stats.appearances}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                        <div className="font-bold text-green-600">{player.goals || 0}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{content.stats.goals}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                        <div className="font-bold text-blue-600">{player.assists || 0}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{content.stats.assists}</div>
                      </div>
                    </div>

                    {/* Strengths */}
                    {player.strengths && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                        <span className="font-medium">Strengths:</span> {player.strengths}
                      </p>
                    )}

                    {/* Join Year & Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {content.joinDate}: {player.joinYear || "N/A"}
                      </span>
                      <button 
                        onClick={() => setSelectedPlayer(player)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        {content.viewProfile} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredPlayers.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {activeFilter === "all" ? "No Players Yet" : "No Players in This Position"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {content.noPlayers}
            </p>
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                View All Players
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-t-2xl overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedPlayer(null)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-end gap-4">
                    <div className="w-20 h-20 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-900 font-bold text-2xl shadow-lg">
                      {selectedPlayer.jerseyNumber || "?"}
                    </div>
                    <div className="text-white">
                      <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                      <p className="text-blue-200">{selectedPlayer.position}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPlayer.appearances || 0}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{content.stats.appearances}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedPlayer.goals || 0}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{content.stats.goals}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedPlayer.assists || 0}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{content.stats.assists}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedPlayer.cleanSheets || 0}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{content.stats.cleanSheets}</div>
                  </div>
                </div>

                {/* Player Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFlagEmoji(selectedPlayer.nationality)}</span>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Nationality</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedPlayer.nationality || "N/A"}</div>
                    </div>
                  </div>

                  {selectedPlayer.strengths && (
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Strengths</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlayer.strengths.split(",").map((strength, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
                          >
                            {strength.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPlayer.story && (
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Biography</div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedPlayer.story}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {content.joinDate}: {selectedPlayer.joinYear || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
