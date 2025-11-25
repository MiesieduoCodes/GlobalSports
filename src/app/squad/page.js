"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Translations JSON
const translations = {
  en: {
    title: "Meet Our Elite Squad",
    subtitle: "The Heartbeat of Global Sport FC",
    description:
      "Discover the exceptional talents driving GSFC's success. Each player represents a unique journey of dedication, skill, and triumph - embodying the spirit of excellence that defines our club.",
    filterAll: "All Players",
    filterDefenders: "Defenders",
    filterMidfielders: "Midfielders",
    filterAttackers: "Attackers",
    viewProfile: "View Profile",
    viewStats: "Performance Stats",
    achievements: "Key Achievements",
    joinDate: "Joined GSFC",
    stats: {
      appearances: "Appearances",
      goals: "Goals",
      assists: "Assists",
      cleanSheets: "Clean Sheets"
    },
    players: [
      {
        id: 1,
        name: "Davies Wilfred McCollin",
        position: "Defender",
        nationality: "Ghana",
        strengths: "Speed, Precision, Leadership",
        story:
          "Davies joined GSFC from a local academy in Accra. His commanding presence in defense and ability to read the game have made him a fan favorite and team captain.",
        image: "/images/players/davies-mccollin.jpg",
        joinYear: "2020",
        appearances: 45,
        goals: 3,
        assists: 8,
        cleanSheets: 18,
        achievements: ["Team Captain 2023", "Best Defender Award 2022", "Players' Player 2021"],
        jerseyNumber: 4
      },
      {
        id: 2,
        name: "Panford Dennis",
        position: "Attacker",
        nationality: "Ghana",
        strengths: "Vision, Passing, Stamina",
        story:
          "Panford's explosive pace and clinical finishing earned him a spot at GSFC after impressing in regional tournaments. Known for his incredible work rate.",
        image: "/images/players/panford-dennis.jpg",
        joinYear: "2021",
        appearances: 38,
        goals: 22,
        assists: 15,
        cleanSheets: 0,
        achievements: ["Top Scorer 2023", "Young Player of the Year 2022", "Goal of the Season"],
        jerseyNumber: 9
      },
      {
        id: 3,
        name: "McCarthy Solomon Tetteh",
        position: "Attacker",
        nationality: "Ghana",
        strengths: "Strength, Tackling, Positioning",
        story:
          "McCarthy rose from street football in Kumasi to becoming a key striker for GSFC, known for his relentless work ethic and aerial dominance.",
        image: "/images/players/mccarthy-tetteh.jpg",
        joinYear: "2019",
        appearances: 52,
        goals: 28,
        assists: 12,
        cleanSheets: 0,
        achievements: ["Golden Boot 2022", "Player of the Month x3", "Club Legend"],
        jerseyNumber: 11
      },
      {
        id: 4,
        name: "Musa Mustapha Ondaki",
        position: "Defender",
        nationality: "Nigeria",
        strengths: "Reflexes, Communication, Agility",
        story:
          "Musa, a former youth captain in Lagos, brings tactical intelligence and composure to GSFC's backline. A natural leader on and off the pitch.",
        image: "/images/players/musa-ondaki.jpg",
        joinYear: "2020",
        appearances: 41,
        goals: 2,
        assists: 6,
        cleanSheets: 21,
        achievements: ["Defensive Rock Award", "Community Champion", "Most Improved 2021"],
        jerseyNumber: 5
      },
      {
        id: 5,
        name: "George Belema Favour",
        position: "Midfielder",
        nationality: "Nigeria",
        strengths: "Dribbling, Creativity, Work Rate",
        story:
          "George's flair and versatility in midfield caught GSFC's scouts' attention during a tournament in Abuja. The engine of our midfield.",
        image: "/images/players/george-favour.jpg",
        joinYear: "2022",
        appearances: 29,
        goals: 7,
        assists: 18,
        cleanSheets: 0,
        achievements: ["Assist Leader 2023", "Midfield Maestro", "Fan Favorite"],
        jerseyNumber: 8
      },
      {
        id: 6,
        name: "Nnamdi Felix Ikechukwu",
        position: "Midfielder",
        nationality: "Nigeria",
        strengths: "Passing, Vision, Set-Pieces",
        story:
          "Nnamdi, a free-kick specialist, joined GSFC after leading his university team to a national championship. Our set-piece maestro.",
        image: "/images/players/nnamdi-ikechukwu.jpg",
        joinYear: "2021",
        appearances: 35,
        goals: 9,
        assists: 14,
        cleanSheets: 0,
        achievements: ["Set-piece Specialist", "Academic Excellence", "Team Player Award"],
        jerseyNumber: 10
      },
    ],
  },
  ru: {
    title: "Знакомьтесь с нашей элитной командой",
    subtitle: "Сердцебиение Global Sport FC",
    description: "Откройте для себя исключительные таланты, движущие успехом GSFC. Каждый игрок представляет уникальный путь преданности, мастерства и триумфа.",
    filterAll: "Все игроки",
    filterDefenders: "Защитники",
    filterMidfielders: "Полузащитники",
    filterAttackers: "Нападающие",
    viewProfile: "Профиль",
    viewStats: "Статистика",
    achievements: "Достижения",
    joinDate: "В клубе с",
    stats: {
      appearances: "Матчи",
      goals: "Голы",
      assists: "Передачи",
      cleanSheets: "Сухие матчи"
    },
    players: [
      // Russian translations for players array would go here
      // Maintaining the same structure as English version
    ],
  },
  fr: {
    title: "Rencontrez Notre Équipe d'Élite",
    subtitle: "Le Cœur Battant du Global Sport FC",
    description: "Découvrez les talents exceptionnels qui font le succès du GSFC. Chaque joueur représente un parcours unique de dévouement, de compétence et de triomphe.",
    filterAll: "Tous les Joueurs",
    filterDefenders: "Défenseurs",
    filterMidfielders: "Milieux",
    filterAttackers: "Attaquants",
    viewProfile: "Voir Profil",
    viewStats: "Statistiques",
    achievements: "Réalisations",
    joinDate: "Arrivé en",
    stats: {
      appearances: "Matchs",
      goals: "Buts",
      assists: "Passes",
      cleanSheets: "Clean Sheets"
    },
    players: [
      // French translations for players array would go here
    ],
  },
  es: {
    title: "Conoce a Nuestro Equipo de Élite",
    subtitle: "El Latido del Global Sport FC",
    description: "Descubre los talentos excepcionales que impulsan el éxito del GSFC. Cada jugador representa un viaje único de dedicación, habilidad y triunfo.",
    filterAll: "Todos los Jugadores",
    filterDefenders: "Defensores",
    filterMidfielders: "Mediocampistas",
    filterAttackers: "Atacantes",
    viewProfile: "Ver Perfil",
    viewStats: "Estadísticas",
    achievements: "Logros",
    joinDate: "Se unió en",
    stats: {
      appearances: "Partidos",
      goals: "Goles",
      assists: "Asistencias",
      cleanSheets: "Porterías a cero"
    },
    players: [
      // Spanish translations for players array would go here
    ],
  },
};

export default function PlayersPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);
  const playerCardsRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Filter players by position
  const filteredPlayers = content.players.filter(player => 
    activeFilter === "all" || player.position.toLowerCase().includes(activeFilter.toLowerCase())
  );

  // Enhanced GSAP Animations
  useEffect(() => {
    // Section entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Staggered player card animations
    playerCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [language, activeFilter]);

  const getPositionColor = (position) => {
    const colors = {
      Defender: "from-blue-500 to-blue-700",
      Midfielder: "from-green-500 to-green-700",
      Attacker: "from-red-500 to-red-700",
    };
    return colors[position] || "from-gray-500 to-gray-700";
  };

  const getFlagEmoji = (nationality) => {
    const flags = {
      Ghana: "🇬🇭",
      Nigeria: "🇳🇬",
    };
    return flags[nationality] || "🏴";
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
              Elite Football Talent
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            {content.subtitle}
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "defenders", "midfielders", "attackers"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {content[`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`]}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlayers.map((player, index) => (
            <div
              key={player.id}
              ref={(el) => (playerCardsRef.current[index] = el)}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* Player Image with Overlay */}
              <div className="relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg shadow-lg">
                    {player.jerseyNumber}
                  </div>
                </div>
                
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 relative">
                  {/* Placeholder for player image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">⚽</span>
                      </div>
                      <p className="text-sm">Player Image</p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <button 
                        onClick={() => setSelectedPlayer(player)}
                        className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                      >
                        {content.viewProfile}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getPositionColor(player.position)} text-white`}>
                        {player.position}
                      </span>
                      <span className="text-lg">{getFlagEmoji(player.nationality)}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {player.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {player.story}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{content.stats.appearances}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{player.appearances}</span>
                  </div>
                  {player.position !== "Defender" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{content.stats.goals}:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{player.goals}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{content.stats.assists}:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{player.assists}</span>
                  </div>
                  {player.position === "Defender" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{content.stats.cleanSheets}:</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{player.cleanSheets}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{content.joinDate}: {player.joinYear}</span>
                  <button 
                    onClick={() => setSelectedPlayer(player)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                  >
                    {content.viewStats} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No players found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try selecting a different filter to see more players.
            </p>
          </div>
        )}
      </div>

      {/* Player Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal content would go here */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPlayer.name}
                </h2>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              {/* Add detailed player information here */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}