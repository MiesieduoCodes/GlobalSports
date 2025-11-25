"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Translations JSON
const translations = {
  en: {
    title: "Ignite Your Passion For Football",
    subtitle: "Welcome to Global Sport Football Club – Where Dreams Become Legacy",
    description:
      "At GSFC, we don't just play football; we build champions. Founded in 2018, we are a premier football institution dedicated to transforming raw talent into world-class athletes through professional training, academic excellence, and character development.",
    mission: {
      title: "Our Mission",
      content:
        "To cultivate elite football talent through professional coaching, state-of-the-art facilities, and comprehensive development programs that empower athletes to reach their highest potential both on and off the pitch.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become the world's leading football academy, recognized for producing exceptional talent, fostering sportsmanship, and creating global opportunities for aspiring football professionals.",
    },
    values: {
      title: "Our Core Values",
      items: [
        { name: "Excellence", description: "Striving for the highest standards in every aspect" },
        { name: "Discipline", description: "Commitment to rigorous training and personal growth" },
        { name: "Teamwork", description: "Unity and collaboration as the foundation of success" },
        { name: "Integrity", description: "Upholding strong moral principles and sportsmanship" },
        { name: "Innovation", description: "Embracing modern techniques and methodologies" },
      ],
    },
    stats: {
      players: "300+",
      playersLabel: "Trained Players",
      matches: "150+",
      matchesLabel: "Competitive Matches",
      success: "95%",
      successLabel: "Success Rate",
      partners: "25+",
      partnersLabel: "Global Partners",
    },
    cta: "Join Our Academy",
    secondaryCta: "Schedule Trial",
    explore: "Explore Programs",
  },
  ru: {
    title: "Зажги свою страсть к футболу",
    subtitle: "Добро пожаловать в Global Sport Football Club – где мечты становятся наследием",
    description:
      "В GSFC мы не просто играем в футбол; мы воспитываем чемпионов. Основанный в 2018 году, мы являемся ведущим футбольным учреждением, посвященным преобразованию природного таланта в спортсменов мирового класса через профессиональное обучение, академическое превосходство и развитие характера.",
    mission: {
      title: "Наша Миссия",
      content:
        "Развивать элитный футбольный талант через профессиональное coaching, современные facilities и комплексные программы развития, которые позволяют спортсменам достигать своего высшего потенциала как на поле, так и за его пределами.",
    },
    vision: {
      title: "Наше Видение",
      content:
        "Стать ведущей футбольной академией мира, признанной за подготовку исключительных талантов, воспитание спортивного мастерства и создание глобальных возможностей для aspiring футбольных профессионалов.",
    },
    values: {
      title: "Наши Основные Ценности",
      items: [
        { name: "Совершенство", description: "Стремление к высшим стандартам во всех аспектах" },
        { name: "Дисциплина", description: "Приверженность rigorous тренировкам и личностному росту" },
        { name: "Командная работа", description: "Единство и collaboration как основа успеха" },
        { name: "Честность", description: "Соблюдение сильных моральных принципов и спортивного мастерства" },
        { name: "Инновации", description: "Принятие современных techniques и methodologies" },
      ],
    },
    stats: {
      players: "300+",
      playersLabel: "Обученных игроков",
      matches: "150+",
      matchesLabel: "Соревновательных матчей",
      success: "95%",
      successLabel: "Успешность",
      partners: "25+",
      partnersLabel: "Глобальных партнеров",
    },
    cta: "Присоединиться к Академии",
    secondaryCta: "Записаться на пробную",
    explore: "Изучить программы",
  },
  fr: {
    title: "Allumez votre passion pour le football",
    subtitle: "Bienvenue au Global Sport Football Club – où les rêves deviennent héritage",
    description:
      "Chez GSFC, nous ne faisons pas que jouer au football; nous formons des champions. Fondé en 2018, nous sommes une institution footballistique de premier plan dédiée à transformer les talents bruts en athlètes de classe mondiale grâce à un entraînement professionnel, l'excellence académique et le développement du caractère.",
    mission: {
      title: "Notre Mission",
      content:
        "Cultiver des talents footballistiques d'élite grâce à un coaching professionnel, des installations de pointe et des programmes de développement complets qui permettent aux athlètes d'atteindre leur plus haut potentiel sur et en dehors du terrain.",
    },
    vision: {
      title: "Notre Vision",
      content:
        "Devenir la principale académie de football au monde, reconnue pour produire des talents exceptionnels, favoriser l'esprit sportif et créer des opportunités mondiales pour les futurs professionnels du football.",
    },
    values: {
      title: "Nos Valeurs Fondamentales",
      items: [
        { name: "Excellence", description: "Visiter les normes les plus élevées dans tous les aspects" },
        { name: "Discipline", description: "Engagement envers un entraînement rigoureux et une croissance personnelle" },
        { name: "Travail d'équipe", description: "Unité et collaboration comme fondement du succès" },
        { name: "Intégrité", description: "Maintenir des principes moraux forts et l'esprit sportif" },
        { name: "Innovation", description: "Adopter des techniques et méthodologies modernes" },
      ],
    },
    stats: {
      players: "300+",
      playersLabel: "Joueurs Formés",
      matches: "150+",
      matchesLabel: "Matchs Compétitifs",
      success: "95%",
      successLabel: "Taux de Réussite",
      partners: "25+",
      partnersLabel: "Partenaires Mondiaux",
    },
    cta: "Rejoindre Notre Académie",
    secondaryCta: "Programmer un Essai",
    explore: "Explorer les Programmes",
  },
  es: {
    title: "Enciende tu pasión por el fútbol",
    subtitle: "Bienvenido a Global Sport Football Club – donde los sueños se convierten en legado",
    description:
      "En GSFC, no solo jugamos fútbol; formamos campeones. Fundado en 2018, somos una institución futbolística premier dedicada a transformar talento en bruto en atletas de clase mundial a través de entrenamiento profesional, excelencia académica y desarrollo del carácter.",
    mission: {
      title: "Nuestra Misión",
      content:
        "Cultivar talento futbolístico de élite mediante coaching profesional, instalaciones de última generación y programas de desarrollo integral que empoderan a los atletas para alcanzar su máximo potencial dentro y fuera del campo.",
    },
    vision: {
      title: "Nuestra Visión",
      content:
        "Convertirnos en la academia de fútbol líder mundial, reconocida por producir talento excepcional, fomentar el espíritu deportivo y crear oportunidades globales para aspirantes a profesionales del fútbol.",
    },
    values: {
      title: "Nuestros Valores Fundamentales",
      items: [
        { name: "Excelencia", description: "Buscando los más altos estándares en cada aspecto" },
        { name: "Disciplina", description: "Compromiso con entrenamiento riguroso y crecimiento personal" },
        { name: "Trabajo en equipo", description: "Unidad y colaboración como base del éxito" },
        { name: "Integridad", description: "Mantener fuertes principios morales y espíritu deportivo" },
        { name: "Innovación", description: "Adoptando técnicas y metodologías modernas" },
      ],
    },
    stats: {
      players: "300+",
      playersLabel: "Jugadores Entrenados",
      matches: "150+",
      matchesLabel: "Partidos Competitivos",
      success: "95%",
      successLabel: "Tasa de Éxito",
      partners: "25+",
      partnersLabel: "Socios Globales",
    },
    cta: "Unirse a Nuestra Academia",
    secondaryCta: "Programar Prueba",
    explore: "Explorar Programas",
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Enhanced GSAP Animations
  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Section animations
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Stats counter animation
    if (statsRef.current) {
      gsap.fromTo(statsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Background pattern animation
    gsap.to(".floating-shape", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, [language]);

  return (
    <div className="transition-colors duration-300 overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="floating-shape absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
          <div className="floating-shape absolute top-40 right-20 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="floating-shape absolute bottom-32 left-20 w-24 h-24 bg-green-400/10 rounded-full blur-xl"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium">Elite Football Academy Since 2018</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
          
          <p className="text-lg mb-12 text-blue-200/90 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25">
              {content.cta}
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              {content.secondaryCta}
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(content.stats).map(([key, value], index) => {
              if (key.includes('Label')) return null;
              const labelKey = `${key}Label`;
              return (
                <div key={key} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-2">
                    {value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {content.stats[labelKey]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              {content.mission.title}
            </div>
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
              {content.mission.content}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {content.vision.title}
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
              <p className="text-xl md:text-2xl leading-relaxed font-light">
                {content.vision.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.values.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide our journey to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.values.items.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join hundreds of successful athletes who started their professional journey with GSFC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300">
              {content.cta}
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300">
              {content.explore}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}