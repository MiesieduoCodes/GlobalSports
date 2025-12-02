"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from "@/app/context/LanguageContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";



// Translations for the News section
const translations = {
  en: {
    newsSection: {
      title: [
        { text: "Latest ", style: "" },
        { text: "Football News", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Stay updated with the most exciting news from our club. From match highlights to transfer buzz – we’ve got you covered. Plus, dive into exclusive interviews, behind-the-scenes stories, and previews of upcoming events to truly feel the pulse of our community.",
      viewAll: "View All",
      readMore: "Read more",
    },
  },
  es: {
    newsSection: {
      title: [
        { text: "Últimas ", style: "" },
        { text: "Noticias de Fútbol", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Mantente actualizado con las noticias más emocionantes de nuestro club. Desde los momentos destacados de los partidos hasta los rumores de traspasos, te tenemos cubierto. Además, descubre entrevistas exclusivas, historias entre bastidores y avances de los próximos eventos para sentir realmente el pulso de nuestra comunidad.",
      viewAll: "Ver Todo",
      readMore: "Leer más",
    },
  },
  ru: {
    newsSection: {
      title: [
        { text: "Последние ", style: "" },
        { text: "Футбольные Новости", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Будьте в курсе самых захватывающих новостей нашего клуба. От ярких моментов матчей до слухов о трансферах — мы предоставляем всю информацию. А также окунитесь в эксклюзивные интервью, закулисные истории и анонсы предстоящих мероприятий, чтобы ощутить пульс нашего сообщества.",
      viewAll: "Посмотреть все",
      readMore: "Читать далее",
    },
  },
  fr: {
    newsSection: {
      title: [
        { text: "Dernières ", style: "" },
        { text: "Nouvelles du Football", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Restez informé des actualités les plus passionnantes de notre club. Des temps forts des matchs aux rumeurs de transferts, nous avons tout ce qu'il vous faut. De plus, plongez dans des interviews exclusives, des coulisses captivantes et des aperçus d'événements à venir pour ressentir véritablement le dynamisme de notre communauté.",
      viewAll: "Voir Tout",
      readMore: "Lire la suite",
    },
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function News() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { language } = useLanguage();
  const content = translations[language] || translations.en;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        const snapshot = await getDocs(collection(db, "news"));
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (isMounted) {
            setItems(docs);
          }
        }
      } catch (error) {
        console.error("Failed to load news from Firestore", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Side – Section Header */}
          <motion.div 
            className="w-full lg:w-1/3"
            variants={itemVariants}
          >
            <div className="sticky top-24">
              <motion.div 
                className="inline-block mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {language === 'en' ? 'Latest Updates' : language === 'ru' ? 'Последние обновления' : 'Dernières mises à jour'}
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
                variants={itemVariants}
              >
                {content.newsSection.title.map((part, index) => (
                  <span key={index} className={part.style}>
                    {part.text}
                  </span>
                ))}
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                {content.newsSection.description}
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <Button 
                  asChild 
                  variant="outline" 
                  className="group border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-yellow-400 transition-all duration-300"
                >
                  <a href="/news" className="text-lg">
                    {content.newsSection.viewAll}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
              
              {/* Navigation Arrows */}
              <motion.div 
                className="flex gap-3 mt-8"
                variants={itemVariants}
              >
                <button 
                  ref={prevRef}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Previous news"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button 
                  ref={nextRef}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Next news"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side – News Grid */}
          <motion.div 
            className="w-full lg:w-2/3"
            variants={containerVariants}
          >
            {isLoading ? (
              <div className="grid gap-8 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={false}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                loop={true}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={{
                  0: { 
                    slidesPerView: 1,
                    spaceBetween: 24,
                    effect: 'slide'
                  },
                  768: { 
                    slidesPerView: 2,
                    spaceBetween: 24,
                    effect: 'coverflow'
                  },
                  1024: { 
                    slidesPerView: 2,
                    spaceBetween: 32,
                    effect: 'coverflow'
                  },
                }}
                className="news-swiper"
              >
                {items.map((item, index) => (
                  <SwiperSlide key={item.id || index} className="w-full sm:w-96">
                    <motion.div 
                      className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      whileHover={{ scale: 1.02 }}
                      variants={itemVariants}
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={item.image || '/images/placeholder-news.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="text-white text-sm font-medium bg-blue-600 dark:bg-yellow-500 px-3 py-1 rounded-full">
                            {item.category || 'News'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            <span>{new Date(item.date || new Date()).toLocaleDateString(language, { day: 'numeric', month: 'short' })}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5" />
                            <span>{item.readTime || '3 min read'}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                          {item.description}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <a 
                            href={item.link || '#'} 
                            className="inline-flex items-center text-blue-600 dark:text-yellow-400 font-medium group-hover:underline"
                          >
                            {content.newsSection.readMore}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
