"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Translations JSON
const translations = {
  en: {
    title: "Our Dedicated Leadership",
    description: "Meet the heart and soul of GSFC:",
    leadership: [
      {
        name: "Veria Lawrence Ebiks",
        role: "Club Director",
        image: "https://example.com/veria-ebiks.png", // Replace with actual image URL
      },
      {
        name: "[Name Placeholder]",
        role: "Head Coach",
        image: "https://example.com/head-coach.png", // Replace with actual image URL
      },
      {
        name: "[Name Placeholder]",
        role: "Technical Director",
        image: "https://example.com/technical-director.png", // Replace with actual image URL
      },
      {
        name: "Audu Kaz Emmanuel",
        role: "Management & Support Staff",
        image: "https://example.com/audu-kaz.png", // Replace with actual image URL
      },
      {
        name: "Otanwa Otanwa Luise",
        role: "Management & Support Staff",
        image: "https://example.com/otanwa-luise.png", // Replace with actual image URL
      },
      {
        name: "Abubakar Aliyu Audu",
        role: "Management & Support Staff",
        image: "https://example.com/abubakar-audu.png", // Replace with actual image URL
      },
      {
        name: "Sanusi Adekunle Bariy",
        role: "Management & Support Staff",
        image: "https://example.com/sanusi-bariy.png", // Replace with actual image URL
      },
    ],
  },
  ru: {
    title: "Наше Преданное Руководство",
    description: "Познакомьтесь с сердцем и душой GSFC:",
    leadership: [
      {
        name: "Вериа Лоуренс Эбикс",
        role: "Директор клуба",
        image: "https://example.com/veria-ebiks.png", // Replace with actual image URL
      },
      {
        name: "[Имя Заполнитель]",
        role: "Главный тренер",
        image: "https://example.com/head-coach.png", // Replace with actual image URL
      },
      {
        name: "[Имя Заполнитель]",
        role: "Технический директор",
        image: "https://example.com/technical-director.png", // Replace with actual image URL
      },
      {
        name: "Ауду Каз Эммануэль",
        role: "Управление и вспомогательный персонал",
        image: "https://example.com/audu-kaz.png", // Replace with actual image URL
      },
      {
        name: "Отанва Отанва Луиза",
        role: "Управление и вспомогательный персонал",
        image: "https://example.com/otanwa-luise.png", // Replace with actual image URL
      },
      {
        name: "Абубакар Алию Ауду",
        role: "Управление и вспомогательный персонал",
        image: "https://example.com/abubakar-audu.png", // Replace with actual image URL
      },
      {
        name: "Сануси Адекунле Барий",
        role: "Управление и вспомогательный персонал",
        image: "https://example.com/sanusi-bariy.png", // Replace with actual image URL
      },
    ],
  },
  fr: {
    title: "Notre Leadership Dévoué",
    description: "Rencontrez le cœur et l'âme de GSFC :",
    leadership: [
      {
        name: "Veria Lawrence Ebiks",
        role: "Directeur du Club",
        image: "https://example.com/veria-ebiks.png", // Replace with actual image URL
      },
      {
        name: "[Nom Placeholder]",
        role: "Entraîneur Principal",
        image: "https://example.com/head-coach.png", // Replace with actual image URL
      },
      {
        name: "[Nom Placeholder]",
        role: "Directeur Technique",
        image: "https://example.com/technical-director.png", // Replace with actual image URL
      },
      {
        name: "Audu Kaz Emmanuel",
        role: "Gestion et Personnel de Soutien",
        image: "https://example.com/audu-kaz.png", // Replace with actual image URL
      },
      {
        name: "Otanwa Otanwa Luise",
        role: "Gestion et Personnel de Soutien",
        image: "https://example.com/otanwa-luise.png", // Replace with actual image URL
      },
      {
        name: "Abubakar Aliyu Audu",
        role: "Gestion et Personnel de Soutien",
        image: "https://example.com/abubakar-audu.png", // Replace with actual image URL
      },
      {
        name: "Sanusi Adekunle Bariy",
        role: "Gestion et Personnel de Soutien",
        image: "https://example.com/sanusi-bariy.png", // Replace with actual image URL
      },
    ],
  },
  es: {
    title: "Nuestro Liderazgo Dedicado",
    description: "Conoce el corazón y el alma de GSFC:",
    leadership: [
      {
        name: "Veria Lawrence Ebiks",
        role: "Director del Club",
        image: "https://example.com/veria-ebiks.png", // Replace with actual image URL
      },
      {
        name: "[Nombre Placeholder]",
        role: "Entrenador Principal",
        image: "https://example.com/head-coach.png", // Replace with actual image URL
      },
      {
        name: "[Nombre Placeholder]",
        role: "Director Técnico",
        image: "https://example.com/technical-director.png", // Replace with actual image URL
      },
      {
        name: "Audu Kaz Emmanuel",
        role: "Gestión y Personal de Apoyo",
        image: "https://example.com/audu-kaz.png", // Replace with actual image URL
      },
      {
        name: "Otanwa Otanwa Luise",
        role: "Gestión y Personal de Apoyo",
        image: "https://example.com/otanwa-luise.png", // Replace with actual image URL
      },
      {
        name: "Abubakar Aliyu Audu",
        role: "Gestión y Personal de Apoyo",
        image: "https://example.com/abubakar-audu.png", // Replace with actual image URL
      },
      {
        name: "Sanusi Adekunle Bariy",
        role: "Gestión y Personal de Apoyo",
        image: "https://example.com/sanusi-bariy.png", // Replace with actual image URL
      },
    ],
  },
};

export default function TeamSection() {
  const { language } = useLanguage(); // Get current language from context
  const content = translations[language] || translations.en; // Default to English
  const sectionRef = useRef(null);

  // GSAP Scroll Animations
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [language]); // Re-run animations when language changes

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-white dark:bg-gray-900 transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="mb-12">
          <h2 className="text-5xl text-center font-bold text-gray-900 dark:text-white mb-6">
            {content.title}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
            {content.description}
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.leadership.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                <strong>Role:</strong> {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}