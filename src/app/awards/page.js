"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/app/context/LanguageContext";
import { Trophy, Star, Calendar } from "lucide-react";

// Translation data for non-award text (hero section, etc.)
const translations = {
  en: {
    hero: {
      title: "Celebrate Excellence",
      subtitle: "Trophy Cabinet",
      description:
        "Join us in honoring outstanding achievements and recognizing those who set new standards in innovation, leadership, and creativity. Our awards program celebrates excellence and inspires future success.",
    },
    awards: {
      title: "Football Awards and Achievements",
      description:
        "Here is a collection of prestigious awards and accolades won throughout our football career. These achievements reflect our dedication, skill, and contribution to the sport.",
    },
    loading: "Loading awards...",
    noAwards: "No awards data available.",
    howWon: "How it was won"
  },
  ru: {
    hero: {
      title: "Отпразднуйте превосходство",
      subtitle: "Трофейный Кабинет",
      description:
        "Присоединяйтесь к нам, чтобы почтить выдающиеся достижения и признать тех, кто устанавливает новые стандарты в инновациях, лидерстве и творчестве.",
    },
    awards: {
      title: "Футбольные награды и достижения",
      description:
        "Здесь собраны престижные награды и достижения, завоеванные на протяжении нашей футбольной карьеры.",
    },
    loading: "Загрузка наград...",
    noAwards: "Награды не найдены.",
    howWon: "Как была выиграна"
  },
  fr: {
    hero: {
      title: "Célébrez l'excellence",
      subtitle: "Vitrine des Trophées",
      description:
        "Rejoignez-nous pour honorer les réalisations exceptionnelles et reconnaître ceux qui établissent de nouvelles normes.",
    },
    awards: {
      title: "Récompenses et réalisations footballistiques",
      description:
        "Voici une collection de prix et distinctions prestigieux remportés tout au long de notre carrière footballistique.",
    },
    loading: "Chargement des prix...",
    noAwards: "Aucun prix disponible.",
    howWon: "Comment c'était gagné"
  },
  es: {
    hero: {
      title: "Celebra la excelencia",
      subtitle: "Vitrina de Trofeos",
      description:
        "Únete a nosotros para honrar logros excepcionales y reconocer a aquellos que establecen nuevos estándares.",
    },
    awards: {
      title: "Premios y logros futbolísticos",
      description:
        "Aquí hay una colección de premios y distinciones prestigiosos ganados a lo largo de nuestra carrera futbolística.",
    },
    loading: "Cargando premios...",
    noAwards: "No hay premios disponibles.",
    howWon: "Cómo se ganó"
  },
};

export default function Awards() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const awardRefs = useRef([]);

  useEffect(() => {
    async function loadAwards() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "awards"));
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAwards(docs);
        }
      } catch (error) {
        console.error("Error loading awards:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAwards();
  }, []);

  useEffect(() => {
    if (!loading && awards.length > 0) {
      gsap.from(awardRefs.current.filter(Boolean), {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [loading, awards]);

  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field.en || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/IMG-20250219-WA0115.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full mb-6 border border-yellow-400/30">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">{content.hero.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {content.hero.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {content.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.awards.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.awards.description}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">{content.loading}</p>
            </div>
          )}

          {/* Awards Grid */}
          {!loading && awards.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  ref={(el) => (awardRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      alt={getLocalizedText(award.imageAlt) || award.name}
                      src={award.imageSrc || "/images/award-placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-blue-900 text-sm font-bold rounded-full flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {award.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-5 h-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                          {getLocalizedText(award.name)}
                        </h3>
                        {award.match && (
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {getLocalizedText(award.match)}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {getLocalizedText(award.description)}
                    </p>

                    {award.howItWasWon && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {content.howWon}:
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 ml-1">
                            {getLocalizedText(award.howItWasWon)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && awards.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {content.noAwards}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
