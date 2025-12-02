"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Play, Calendar, Clock, Filter, Search, Grid, List } from "lucide-react";
import Image from "next/image";

const translations = {
  en: {
    title: "Video Gallery",
    subtitle: "Watch Our Best Moments",
    description: "Explore training sessions, match highlights, behind-the-scenes content, and exclusive interviews from Global Sports FC.",
    searchPlaceholder: "Search videos...",
    allCategories: "All Videos",
    categories: {
      all: "All",
      training: "Training",
      highlights: "Highlights",
      interviews: "Interviews",
      behindScenes: "Behind the Scenes"
    },
    watchNow: "Watch Now",
    duration: "Duration",
    noVideos: "No videos available at the moment. Check back soon!",
    loading: "Loading videos...",
    latest: "Latest"
  },
  ru: {
    title: "Видеогалерея",
    subtitle: "Смотрите Наши Лучшие Моменты",
    description: "Исследуйте тренировки, лучшие моменты матчей и эксклюзивные интервью от Global Sports FC.",
    searchPlaceholder: "Поиск видео...",
    allCategories: "Все Видео",
    categories: {
      all: "Все",
      training: "Тренировки",
      highlights: "Лучшие Моменты",
      interviews: "Интервью",
      behindScenes: "За Кулисами"
    },
    watchNow: "Смотреть",
    duration: "Продолжительность",
    noVideos: "Видео пока нет. Загляните позже!",
    loading: "Загрузка видео...",
    latest: "Новые"
  },
  fr: {
    title: "Galerie Vidéo",
    subtitle: "Regardez Nos Meilleurs Moments",
    description: "Explorez les sessions d'entraînement, les temps forts des matchs et les interviews exclusives de Global Sports FC.",
    searchPlaceholder: "Rechercher des vidéos...",
    allCategories: "Toutes les Vidéos",
    categories: {
      all: "Tous",
      training: "Entraînement",
      highlights: "Temps Forts",
      interviews: "Interviews",
      behindScenes: "Coulisses"
    },
    watchNow: "Regarder",
    duration: "Durée",
    noVideos: "Aucune vidéo disponible pour le moment. Revenez bientôt!",
    loading: "Chargement...",
    latest: "Récent"
  },
  es: {
    title: "Galería de Videos",
    subtitle: "Mira Nuestros Mejores Momentos",
    description: "Explora sesiones de entrenamiento, momentos destacados y entrevistas exclusivas de Global Sports FC.",
    searchPlaceholder: "Buscar videos...",
    allCategories: "Todos los Videos",
    categories: {
      all: "Todos",
      training: "Entrenamiento",
      highlights: "Destacados",
      interviews: "Entrevistas",
      behindScenes: "Detrás de Cámaras"
    },
    watchNow: "Ver Ahora",
    duration: "Duración",
    noVideos: "No hay videos disponibles. ¡Vuelve pronto!",
    loading: "Cargando...",
    latest: "Reciente"
  }
};

export default function VideosPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      try {
        const q = query(collection(db, "videos"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            duration: doc.data().duration || "2:30"
          }));
          setVideos(docs);
        }
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    const title = video.title?.[language] || video.title?.en || "";
    const description = video.description?.[language] || video.description?.en || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(language, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
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
              <Play className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{content.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & View Toggle */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(content.categories).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeCategory === key
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white dark:bg-gray-600 shadow" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">{content.loading}</p>
            </div>
          ) : filteredVideos.length > 0 ? (
            <motion.div 
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedVideo(video)}
                    className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-video"}`}>
                      <Image
                        src={video.thumbnail || "/images/video-placeholder.jpg"}
                        alt={video.title?.[language] || video.title?.en || "Video"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                      {index < 3 && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded">
                          {content.latest}
                        </span>
                      )}
                    </div>

                    <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(video.date)}</span>
                        {video.duration && (
                          <>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{video.duration}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {video.title?.[language] || video.title?.en || "Untitled Video"}
                      </h3>
                      {viewMode === "list" && (
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {video.description?.[language] || video.description?.en || ""}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {content.noVideos}
              </h3>
              <button
                onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                {selectedVideo.src ? (
                  <video
                    src={selectedVideo.src}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Video source not available</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedVideo.title?.[language] || selectedVideo.title?.en || "Video"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedVideo.description?.[language] || selectedVideo.description?.en || ""}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(selectedVideo.date)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



