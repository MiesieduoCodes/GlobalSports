"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext"; // Assuming you have a LanguageContext

gsap.registerPlugin(ScrollTrigger);

// Translations JSON
const translations = {
  en: {
    title: "Ignite Your Passion",
    subtitle: "Welcome to Global Sport Football Club (GSFC) – Where Dreams Take Flight!",
    description:
      "At GSFC, we don't just play football; we ignite dreams. Founded in 2018, we are a movement dedicated to transforming lives, one kick at a time. We're more than a club; we're a family, a beacon of hope for young talents, especially those from underserved communities, giving them the wings to soar on the global stage.",
    mission: {
      title: "Our Mission",
      content:
        "To cultivate a professional and nurturing environment that unearths raw talent, particularly from marginalized communities, and empowers them to excel.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To be the global powerhouse that molds elite players from the grassroots, propelling them to the pinnacles of football.",
    },
    values: {
      title: "Our Values",
      items: ["Discipline", "Teamwork", "Integrity", "Excellence", "Opportunity"],
    },
    cta: "Join Us",
  },
  ru: {
    title: "Зажги свою страсть",
    subtitle: "Добро пожаловать в Global Sport Football Club (GSFC) – где мечты обретают крылья!",
    description:
      "В GSFC мы не просто играем в футбол; мы зажигаем мечты. Основанный в 2018 году, мы — движение, посвященное преобразованию жизней, один удар за раз. Мы больше, чем клуб; мы семья, маяк надежды для молодых талантов, особенно из малообеспеченных сообществ, давая им крылья, чтобы парить на мировой арене.",
    mission: {
      title: "Наша Миссия",
      content:
        "Создать профессиональную и заботливую среду, которая раскрывает природные таланты, особенно из маргинализированных сообществ, и помогает им преуспеть.",
    },
    vision: {
      title: "Наше Видение",
      content:
        "Стать мировой силой, которая формирует элитных игроков с самого начала, продвигая их к вершинам футбола.",
    },
    values: {
      title: "Наши Ценности",
      items: ["Дисциплина", "Командная работа", "Честность", "Совершенство", "Возможности"],
    },
    cta: "Присоединяйтесь",
  },
  fr: {
    title: "Allumez votre passion",
    subtitle: "Bienvenue au Global Sport Football Club (GSFC) – où les rêves prennent leur envol !",
    description:
      "Chez GSFC, nous ne faisons pas que jouer au football; nous enflammons les rêves. Fondé en 2018, nous sommes un mouvement dédié à transformer des vies, un coup de pied à la fois. Nous sommes plus qu'un club; nous sommes une famille, un phare d'espoir pour les jeunes talents, en particulier ceux des communautés défavorisées, leur donnant des ailes pour s'envoler sur la scène mondiale.",
    mission: {
      title: "Notre Mission",
      content:
        "Cultiver un environnement professionnel et bienveillant qui découvre des talents bruts, en particulier dans les communautés marginalisées, et les habilite à exceller.",
    },
    vision: {
      title: "Notre Vision",
      content:
        "Devenir une puissance mondiale qui façonne des joueurs d'élite dès la base, les propulsant aux sommets du football.",
    },
    values: {
      title: "Nos Valeurs",
      items: ["Discipline", "Travail d'équipe", "Intégrité", "Excellence", "Opportunité"],
    },
    cta: "Rejoignez-nous",
  },
  es: {
    title: "Enciende tu pasión",
    subtitle: "Bienvenido a Global Sport Football Club (GSFC) – ¡Donde los sueños despegan!",
    description:
      "En GSFC, no solo jugamos fútbol; encendemos sueños. Fundado en 2018, somos un movimiento dedicado a transformar vidas, un golpe a la vez. Somos más que un club; somos una familia, un faro de esperanza para jóvenes talentos, especialmente de comunidades desatendidas, dándoles alas para volar en el escenario global.",
    mission: {
      title: "Nuestra Misión",
      content:
        "Cultivar un ambiente profesional y enriquecedor que descubra talentos en bruto, particularmente de comunidades marginadas, y los empodere para sobresalir.",
    },
    vision: {
      title: "Nuestra Visión",
      content:
        "Ser la potencia global que moldea jugadores de élite desde las bases, impulsándolos a las cumbres del fútbol.",
    },
    values: {
      title: "Nuestros Valores",
      items: ["Disciplina", "Trabajo en equipo", "Integridad", "Excelencia", "Oportunidad"],
    },
    cta: "Únete a nosotros",
  },
};

export default function HomePage() {
  const { language } = useLanguage(); // Get current language from context
  const content = translations[language] || translations.en; // Default to English
  const sectionRefs = useRef([]);

  // GSAP Scroll Animations
  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [language]); // Re-run animations when language changes

  return (
    <div className=" transition-colors duration-300">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl mb-8">{content.subtitle}</p>
          <p className="text-lg max-w-2xl mx-auto">{content.description}</p>
          <button className="mt-8 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all">
            {content.cta}
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">{content.mission.title}</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">{content.mission.content}</p>
        </div>
      </section>

      {/* Vision Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-20 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">{content.vision.title}</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">{content.vision.content}</p>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">{content.values.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {content.values.items.map((value, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}