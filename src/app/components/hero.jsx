"use client";

/* global setInterval, clearInterval */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import awardsData from "@/app/components/constants/awards.json";

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const awardRefs = useRef([]);
  const selectedLanguage = "en"; // Change this to "ru", "es", or "fr" as needed

  useEffect(() => {
    setAwards(awardsData);

    gsap.from(awardRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(/images/IMG-20250219-WA0124.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-white font-bold">Celebrate Excellence</h1>
            <p className="mb-5 text-white">
              Join us in honoring outstanding achievements and recognizing those who set new standards in innovation, leadership, and creativity. Our awards program celebrates excellence and inspires future success.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Football Awards and Achievements
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Here is a collection of prestigious awards and accolades won throughout our football career. These achievements reflect our dedication, skill, and contribution to the sport. Each award represents a significant milestone that motivates us to strive for excellence.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              ref={(el) => (awardRefs.current[index] = el)}
              className="group relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                alt={award.imageAlt[selectedLanguage]} // Select language here
                src={award.imageSrc}
                className="aspect-video w-full rounded-md object-cover group-hover:opacity-75"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {award.name[selectedLanguage]} {/* Select language here */}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{award.year}</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-300">
                  <strong>Match:</strong> {award.match[selectedLanguage]} {/* Select language here */}
                </p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{award.description[selectedLanguage]}</p> {/* Select language here */}
                <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  How it was won: {award.howItWasWon[selectedLanguage]} {/* Select language here */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();
  const slides = translations[language];

  // Dynamic images from your storage
  const images = [
    "/images/IMG-20250219-WA0123.jpg",
    "/images/IMG-20250219-WA0127.jpg",
    "/images/IMG-20250219-WA0107.jpg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
    

  }, [nextSlide]);

  // Variants for sliding animation
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <motion.div
              className="max-w-4xl w-full px-4 lg:px-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {slides[currentSlide].title}
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].text}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg md:text-xl font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                {slides[currentSlide].buttonText}
              </motion.button>
            </motion.div>

            {/* Slide Indicators */}
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