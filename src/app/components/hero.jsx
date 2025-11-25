"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const translations = {
  en: [
    {
      id: 1,
      title: "Exciting Logo Change Ahead",
      text: "Our club is set to unveil a new logo next week! Stay tuned for the reveal and share your thoughts.",
      buttonText: "Learn More"
    },
    {
      id: 2,
      title: "Players Gear Up for Next Match",
      text: "Our team is in full training mode as they prepare for the upcoming match against our rivals this Saturday.",
      buttonText: "Learn More"
    },
    {
      id: 3,
      title: "Youth Academy Shines",
      text: "Our youth academy has produced another star! Join us in celebrating the achievements of our rising talent.",
      buttonText: "Learn More"
    }
  ],
  ru: [
    {
      id: 1,
      title: "Скоро новое изменение логотипа",
      text: "Наш клуб готовится представить новый логотип на следующей неделе! Оставайтесь с нами для раскрытия и делитесь своими мыслями.",
      buttonText: "Узнать больше"
    },
    {
      id: 2,
      title: "Игроки готовятся к следующему матчу",
      text: "Наша команда полна сил и готовится к предстоящему матчу против соперников в эту субботу.",
      buttonText: "Узнать больше"
    },
    {
      id: 3,
      title: "Успехи молодежной академии",
      text: "Наша молодежная академия вновь произвела звезду! Присоединяйтесь к нам, чтобы отпраздновать достижения нашего подрастающего таланта.",
      buttonText: "Узнать больше"
    }
  ],
  fr: [
    {
      id: 1,
      title: "Changement de logo passionnant à venir",
      text: "Notre club s'apprête à dévoiler un nouveau logo la semaine prochaine ! Restez à l'écoute pour la révélation et partagez vos pensées.",
      buttonText: "En savoir plus"
    },
    {
      id: 2,
      title: "Les joueurs se préparent pour le prochain match",
      text: "Notre équipe est en pleine préparation pour le match à venir contre nos rivaux ce samedi.",
      buttonText: "En savoir plus"
    },
    {
      id: 3,
      title: "L'académie des jeunes brille",
      text: "Notre académie de jeunes a produit une nouvelle star ! Joignez-vous à nous pour célébrer les réalisations de notre talent en pleine émergence.",
      buttonText: "En savoir plus"
    }
  ],
  es: [
    {
      id: 1,
      title: "Cambio de logo emocionante por delante",
      text: "¡Nuestro club está a punto de revelar un nuevo logo la próxima semana! Mantente atento para la revelación y comparte tus pensamientos.",
      buttonText: "Aprender más"
    },
    {
      id: 2,
      title: "Los jugadores se preparan para el próximo partido",
      text: "Nuestro equipo está en plena fase de entrenamiento mientras se prepara para el próximo partido contra nuestros rivales este sábado.",
      buttonText: "Aprender más"
    },
    {
      id: 3,
      title: "La academia juvenil brilla",
      text: "¡Nuestra academia juvenil ha producido otra estrella! Únete a nosotros para celebrar los logros de nuestro talento emergente.",
      buttonText: "Aprender más"
    }
  ]
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const slides = translations[language] || translations.en;
  
  // Original hero images
  const heroImages = [
    "/images/IMG-20250219-WA0123.jpg",
    "/images/IMG-20250219-WA0127.jpg",
    "/images/IMG-20250219-WA0107.jpg"
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section 
      className="relative w-full h-screen max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />
      
      <AnimatePresence mode="wait" initial={false} custom={currentSlide}>
        {slides.map((slide, index) => 
          index === currentSlide && (
            <motion.div
              key={slide.id}
              custom={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${heroImages[index % heroImages.length]})`,
                  filter: 'brightness(0.7)'
                }} 
              />
              
              <div className="relative z-10 max-w-6xl w-full mx-auto text-center px-4">
                <motion.div 
                  className="inline-block mb-4 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full"
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {language === 'en' ? 'Latest News' : language === 'ru' ? 'Последние новости' : 'Dernières nouvelles'}
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {slide.title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed"
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {slide.text}
                </motion.p>
                
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  <Link href="/news">
                    <Button size="lg" className="group">
                      {slide.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-sm z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="mb-2">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Add missing import for ChevronDown
const ChevronDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default Hero;