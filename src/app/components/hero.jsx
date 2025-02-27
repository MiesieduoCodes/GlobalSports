"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: [
    {
      title: "Exciting Logo Change Ahead",
      text: "Our club is set to unveil a new logo next week! Stay tuned for the reveal and share your thoughts.",
      buttonText: "Learn More",
    },
    {
      title: "Players Gear Up for Next Match",
      text: "Our team is in full training mode as they prepare for the upcoming match against our rivals this Saturday.",
      buttonText: "Learn More",
    },
    {
      title: "Youth Academy Shines",
      text: "Our youth academy has produced another star! Join us in celebrating the achievements of our rising talent.",
      buttonText: "Learn More",
    },
  ],
  ru: [
    {
      title: "Скоро новое изменение логотипа",
      text: "Наш клуб готовится представить новый логотип на следующей неделе! Оставайтесь с нами для раскрытия и делитесь своими мыслями.",
      buttonText: "Узнать больше",
    },
    {
      title: "Игроки готовятся к следующему матчу",
      text: "Наша команда полна сил и готовится к предстоящему матчу против соперников в эту субботу.",
      buttonText: "Узнать больше",
    },
    {
      title: "Успехи молодежной академии",
      text: "Наша молодежная академия вновь произвела звезду! Присоединяйтесь к нам, чтобы отпраздновать достижения нашего подрастающего таланта.",
      buttonText: "Узнать больше",
    },
  ],
  fr: [
    {
      title: "Changement de logo passionnant à venir",
      text: "Notre club s'apprête à dévoiler un nouveau logo la semaine prochaine ! Restez à l'écoute pour la révélation et partagez vos pensées.",
      buttonText: "En savoir plus",
    },
    {
      title: "Les joueurs se préparent pour le prochain match",
      text: "Notre équipe est en pleine préparation pour le match à venir contre nos rivaux ce samedi.",
      buttonText: "En savoir plus",
    },
    {
      title: "L'académie des jeunes brille",
      text: "Notre académie de jeunes a produit une nouvelle star ! Joignez-vous à nous pour célébrer les réalisations de notre talent en pleine émergence.",
      buttonText: "En savoir plus",
    },
  ],
  es: [
    {
      title: "Cambio de logo emocionante por delante",
      text: "¡Nuestro club está a punto de revelar un nuevo logo la próxima semana! Mantente atento para la revelación y comparte tus pensamientos.",
      buttonText: "Aprender más",
    },
    {
      title: "Los jugadores se preparan para el próximo partido",
      text: "Nuestro equipo está en plena fase de entrenamiento mientras se prepara para el próximo partido contra nuestros rivales este sábado.",
      buttonText: "Aprender más",
    },
    {
      title: "La academia juvenil brilla",
      text: "¡Nuestra academia juvenil ha producido otra estrella! Únete a nosotros para celebrar los logros de nuestro talento emergente.",
      buttonText: "Aprender más",
    },
  ],
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();
  const slides = translations[language];

  const images = [
    "/images/IMG-20250219-WA0117.jpg",
    "/images/IMG-20250219-WA0070.jpg",
    "/images/IMG-20250219-WA0124.jpg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: { x: "100%" },
    center: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentSlide]})` }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80" />
          <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-4 lg:px-16">
            <motion.div
              className="max-w-2xl w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {slides[currentSlide].title}
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].text}
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-bold text-lg md:text-xl cursor-pointer"
              >
                <button className="relative flex items-center justify-evenly w-44 h-10 uppercase tracking-wide border-none bg-transparent transition-all duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-60 hover:opacity-100 hover:tracking-wider group">
                {slides[currentSlide].buttonText}
      <span className="absolute top-0 left-1 h-full w-0 border-b-2 border-dashed border-yellow-300 opacity-70 transition-all duration-200 group-hover:w-[90%]"></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        height="15px"
        width="15px"
        className="transition-transform duration-200 group-hover:translate-x-2 animate-bounce"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          stroke="#292D32"
          d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
        ></path>
      </svg>
    </button>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-44 flex space-x-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-14 h-2 transition-colors ${
                    currentSlide === index
                      ? "bg-yellow-400"
                      : "bg-yellow-400/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;