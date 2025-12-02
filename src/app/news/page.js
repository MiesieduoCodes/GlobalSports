"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Tag, Clock, Search } from "lucide-react";

const translations = {
  en: {
    title: "Latest News",
    subtitle: "Stay Updated with GSFC",
    description: "Get the latest updates, match reports, transfer news, and behind-the-scenes stories from Global Sports FC.",
    searchPlaceholder: "Search news...",
    allCategories: "All Categories",
    readMore: "Read More",
    noResults: "No news articles found matching your criteria.",
    loading: "Loading news...",
    categories: ["All", "Match Report", "Transfer", "Academy", "Community", "Club News"],
    readTime: "min read"
  },
  ru: {
    title: "Последние Новости",
    subtitle: "Будьте в Курсе с GSFC",
    description: "Получайте последние обновления, отчеты о матчах, новости трансферов от Global Sports FC.",
    searchPlaceholder: "Поиск новостей...",
    allCategories: "Все Категории",
    readMore: "Читать Далее",
    noResults: "Новости не найдены.",
    loading: "Загрузка новостей...",
    categories: ["Все", "Отчет о Матче", "Трансфер", "Академия", "Сообщество", "Новости Клуба"],
    readTime: "мин чтения"
  },
  fr: {
    title: "Dernières Nouvelles",
    subtitle: "Restez Informé avec GSFC",
    description: "Obtenez les dernières mises à jour, rapports de match et nouvelles de transferts de Global Sports FC.",
    searchPlaceholder: "Rechercher...",
    allCategories: "Toutes les Catégories",
    readMore: "Lire Plus",
    noResults: "Aucun article trouvé.",
    loading: "Chargement...",
    categories: ["Tous", "Rapport de Match", "Transfert", "Académie", "Communauté", "Nouvelles du Club"],
    readTime: "min de lecture"
  },
  es: {
    title: "Últimas Noticias",
    subtitle: "Mantente Actualizado con GSFC",
    description: "Obtén las últimas actualizaciones, informes de partidos y noticias de traspasos de Global Sports FC.",
    searchPlaceholder: "Buscar noticias...",
    allCategories: "Todas las Categorías",
    readMore: "Leer Más",
    noResults: "No se encontraron artículos.",
    loading: "Cargando...",
    categories: ["Todos", "Informe del Partido", "Traspaso", "Academia", "Comunidad", "Noticias del Club"],
    readTime: "min de lectura"
  }
};

function NewsPageContent() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "news"));
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNews(docs);
        } else {
          // No data in Firestore
          setNews([]);
        }
      } catch (error) {
        console.error("Error loading news:", error);
        // On error, set empty array
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = (item.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                          (item.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(language, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
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
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">{content.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {content.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category === content.categories[0] ? "All" : category)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  (category === content.categories[0] && selectedCategory === "All") || selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">{content.loading}</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredNews.map((item, index) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image || item.images?.[0] || "/images/news-placeholder.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full">
                        {item.category || "News"}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(item.date)}
                        </span>
                        {item.readTime && (
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {item.readTime} {content.readTime}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title || item.translations?.[language]?.title || "News Article"}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                        {item.description || item.translations?.[language]?.content || ""}
                      </p>

                      <Link
                        href={`/news?id=${item.id}`}
                        className="inline-flex items-center text-blue-600 dark:text-yellow-400 font-semibold hover:gap-2 transition-all"
                      >
                        {content.readMore}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {content.noResults}
              </h3>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <NewsPageContent />
    </Suspense>
  );
}
