"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, Calendar as CalendarIcon, Clock as ClockIcon, ArrowRight } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    highlightsTitle: "Training Sessions",
    introText: "Explore our training sessions where our athletes hone their skills and improve their performance.",
    viewAll: "View All Videos",
    watchNow: "Watch Now",
    duration: "Duration",
    minutes: "min",
    noVideos: "No videos available at the moment. Check back soon!",
    categories: {
      all: "All",
      training: "Training",
      match: "Match Highlights",
      behindScenes: "Behind the Scenes"
    }
  },
  // ... other language translations
};

export default function VideoCarousel() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const carouselRef = useRef(null);

  const loadVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "videos"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          duration: doc.data().duration || "2:30" // Default duration if not set
        }));
        setVideos(docs);
        setFilteredVideos(docs);
      }
    } catch (error) {
      console.error("Failed to load videos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const filterVideos = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.category === category));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language, options);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.highlightsTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.introText}
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(t.categories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => filterVideos(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === key
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/videos/${video.id}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title?.[language] || video.title?.en || "Video"}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <div className="flex items-center mr-4">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>{formatDate(video.date)}</span>
                        </div>
                        {video.duration && (
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <span>{video.duration} {t.minutes}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {video.title?.[language] || video.title?.en || "Untitled Video"}
                      </h3>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                        <span>{t.watchNow}</span>
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t.noVideos}</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/videos"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}