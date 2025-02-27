"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import awardsData from "@/app/components/constants/awards.json"; // Ensure this path is correct

// Translation data for non-award text (hero section, etc.)
const translations = {
  en: {
    hero: {
      title: "Celebrate Excellence",
      description:
        "Join us in honoring outstanding achievements and recognizing those who set new standards in innovation, leadership, and creativity. Our awards program celebrates excellence and inspires future success.",
    },
    awards: {
      title: "Football Awards and Achievements",
      description:
        "Here is a collection of prestigious awards and accolades won throughout our football career. These achievements reflect our dedication, skill, and contribution to the sport.",
    },
  },
  ru: {
    hero: {
      title: "Отпразднуйте превосходство",
      description:
        "Присоединяйтесь к нам, чтобы почтить выдающиеся достижения и признать тех, кто устанавливает новые стандарты в инновациях, лидерстве и творчестве. Наша программа наград отмечает превосходство и вдохновляет на будущие успехи.",
    },
    awards: {
      title: "Футбольные награды и достижения",
      description:
        "Здесь собраны престижные награды и достижения, завоеванные на протяжении нашей футбольной карьеры. Эти достижения отражают нашу преданность, мастерство и вклад в спорт.",
    },
  },
  fr: {
    hero: {
      title: "Célébrez l'excellence",
      description:
        "Rejoignez-nous pour honorer les réalisations exceptionnelles et reconnaître ceux qui établissent de nouvelles normes en matière d'innovation, de leadership et de créativité. Notre programme de récompenses célèbre l'excellence et inspire le succès futur.",
    },
    awards: {
      title: "Récompenses et réalisations footballistiques",
      description:
        "Voici une collection de prix et distinctions prestigieux remportés tout au long de notre carrière footballistique. Ces réalisations reflètent notre dévouement, notre compétence et notre contribution au sport.",
    },
  },
  es: {
    hero: {
      title: "Celebra la excelencia",
      description:
        "Únete a nosotros para honrar logros excepcionales y reconocer a aquellos que establecen nuevos estándares en innovación, liderazgo y creatividad. Nuestro programa de premios celebra la excelencia e inspira el éxito futuro.",
    },
    awards: {
      title: "Premios y logros futbolísticos",
      description:
        "Aquí hay una colección de premios y distinciones prestigiosos ganados a lo largo de nuestra carrera futbolística. Estos logros reflejan nuestra dedicación, habilidad y contribución al deporte.",
    },
  },
};

export default function Awards() {
  const [awards, setAwards] = useState([]); // Initialize as an empty array
  const awardRefs = useRef([]);
  const selectedLanguage = "en"; // Change this to "ru", "fr", or "es" as needed

  useEffect(() => {
    // Ensure awardsData is defined and is an array
    if (awardsData && Array.isArray(awardsData)) {
      setAwards(awardsData);
    } else {
      console.error("awardsData is not defined or is not an array");
    }

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
      {/* Hero Section */}
      <div
  className="hero min-h-[60vh] relative"
  style={{
    backgroundImage: "url(/images/IMG-20250219-WA0124.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay to darken the image */}
  <div className="hero-overlay absolute inset-0 bg-black bg-opacity-70"></div>

  {/* Centered content */}
  <div className="hero-content text-center justify-center items-center text-neutral-content relative z-10">
    <div className="max-w-2xl justify-center items-center ">
      <h1 className="mb-6 text-5xl justify-center items-center font-bold text-white">
        {translations[selectedLanguage].hero.title}
      </h1>
      <p className="mb-6 text-lg justify-center items-center text-white">
        {translations[selectedLanguage].hero.description}
      </p>
    </div>
  </div>
</div>

      {/* Awards Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {translations[selectedLanguage].awards.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {translations[selectedLanguage].awards.description}
          </p>
        </div>

        {/* Awards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(awards) && awards.length > 0 ? (
            awards.map((award, index) => (
              <div
                key={award.id}
                ref={(el) => (awardRefs.current[index] = el)}
                className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  alt={award.imageAlt[selectedLanguage]}
                  src={award.imageSrc}
                  className="aspect-video w-full rounded-md object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {award.name[selectedLanguage]}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{award.year}</p>
                  <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-300">
                    <strong>Match:</strong> {award.match[selectedLanguage]}
                  </p>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                    {award.description[selectedLanguage]}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    How it was won: {award.howItWasWon[selectedLanguage]}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No awards data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}