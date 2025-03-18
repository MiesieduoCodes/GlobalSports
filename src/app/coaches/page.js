"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Translations JSON
const translations = {
  en: {
    title: "Our Guiding Force: The Coaching Staff",
    description:
      "Behind our team’s success is a dedicated coaching unit committed to unlocking the full potential of every player.",
    coaches: [
      {
        name: "John Doe",
        title: "Head Coach",
        description:
          "John leads the team with a wealth of knowledge and experience in football strategy.",
        avatar: "https://example.com/john-doe.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Jane Smith",
        title: "Assistant Coach",
        description:
          "Jane specializes in player development and brings a collaborative spirit to the team.",
        avatar: "https://example.com/jane-smith.png", // Replace with actual image URL
        socialLinks: [
          { name: "LinkedIn", url: "#", icon: faLinkedin },
          { name: "Instagram", url: "#", icon: faInstagram },
        ],
      },
      {
        name: "Mike Johnson",
        title: "Goalkeeping Coach",
        description:
          "Mike focuses on developing top-tier goalkeeping skills in our players.",
        avatar: "https://example.com/mike-johnson.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Sara Lee",
        title: "Fitness Coach",
        description:
          "Sara enhances the physical preparedness of our athletes for peak performance.",
        avatar: "https://example.com/sara-lee.png", // Replace with actual image URL
        socialLinks: [
          { name: "Instagram", url: "#", icon: faInstagram },
          { name: "LinkedIn", url: "#", icon: faLinkedin },
        ],
      },
    ],
  },
  ru: {
    title: "Наша Руководящая Сила: Тренерский Штаб",
    description:
      "За успехом нашей команды стоит преданный тренерский состав, стремящийся раскрыть потенциал каждого игрока.",
    coaches: [
      {
        name: "Джон Доу",
        title: "Главный Тренер",
        description:
          "Джон руководит командой с огромным опытом и знаниями в футбольной стратегии.",
        avatar: "https://example.com/john-doe.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Джейн Смит",
        title: "Ассистент Тренера",
        description:
          "Джейн специализируется на развитии игроков и привносит в команду дух сотрудничества.",
        avatar: "https://example.com/jane-smith.png", // Replace with actual image URL
        socialLinks: [
          { name: "LinkedIn", url: "#", icon: faLinkedin },
          { name: "Instagram", url: "#", icon: faInstagram },
        ],
      },
      {
        name: "Майк Джонсон",
        title: "Тренер Вратарей",
        description:
          "Майк сосредоточен на развитии навыков вратарей высшего уровня.",
        avatar: "https://example.com/mike-johnson.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Сара Ли",
        title: "Тренер по Фитнесу",
        description:
          "Сара улучшает физическую подготовку наших спортсменов для достижения пиковой формы.",
        avatar: "https://example.com/sara-lee.png", // Replace with actual image URL
        socialLinks: [
          { name: "Instagram", url: "#", icon: faInstagram },
          { name: "LinkedIn", url: "#", icon: faLinkedin },
        ],
      },
    ],
  },
  fr: {
    title: "Notre Force Directrice: Le Staff d'Entraîneurs",
    description:
      "Derrière le succès de notre équipe se trouve une unité d'entraîneurs dévouée, engagée à libérer le plein potentiel de chaque joueur.",
    coaches: [
      {
        name: "John Doe",
        title: "Entraîneur Principal",
        description:
          "John dirige l'équipe avec une grande connaissance et expérience en stratégie de football.",
        avatar: "https://example.com/john-doe.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Jane Smith",
        title: "Entraîneur Adjoint",
        description:
          "Jane se spécialise dans le développement des joueurs et apporte un esprit collaboratif à l'équipe.",
        avatar: "https://example.com/jane-smith.png", // Replace with actual image URL
        socialLinks: [
          { name: "LinkedIn", url: "#", icon: faLinkedin },
          { name: "Instagram", url: "#", icon: faInstagram },
        ],
      },
      {
        name: "Mike Johnson",
        title: "Entraîneur des Gardiens",
        description:
          "Mike se concentre sur le développement des compétences de haut niveau pour nos gardiens.",
        avatar: "https://example.com/mike-johnson.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Sara Lee",
        title: "Entraîneur de Fitness",
        description:
          "Sara améliore la préparation physique de nos athlètes pour une performance optimale.",
        avatar: "https://example.com/sara-lee.png", // Replace with actual image URL
        socialLinks: [
          { name: "Instagram", url: "#", icon: faInstagram },
          { name: "LinkedIn", url: "#", icon: faLinkedin },
        ],
      },
    ],
  },
  es: {
    title: "Nuestra Fuerza Guía: El Cuerpo Técnico",
    description:
      "Detrás del éxito de nuestro equipo hay un grupo de entrenadores dedicados, comprometidos a desbloquear el potencial de cada jugador.",
    coaches: [
      {
        name: "John Doe",
        title: "Entrenador Principal",
        description:
          "John lidera el equipo con una gran experiencia y conocimiento en estrategia de fútbol.",
        avatar: "https://example.com/john-doe.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Jane Smith",
        title: "Entrenador Asistente",
        description:
          "Jane se especializa en el desarrollo de jugadores y aporta un espíritu colaborativo al equipo.",
        avatar: "https://example.com/jane-smith.png", // Replace with actual image URL
        socialLinks: [
          { name: "LinkedIn", url: "#", icon: faLinkedin },
          { name: "Instagram", url: "#", icon: faInstagram },
        ],
      },
      {
        name: "Mike Johnson",
        title: "Entrenador de Porteros",
        description:
          "Mike se enfoca en desarrollar habilidades de élite para nuestros porteros.",
        avatar: "https://example.com/mike-johnson.png", // Replace with actual image URL
        socialLinks: [
          { name: "Facebook", url: "#", icon: faFacebook },
          { name: "Twitter", url: "#", icon: faTwitter },
        ],
      },
      {
        name: "Sara Lee",
        title: "Entrenador de Fitness",
        description:
          "Sara mejora la preparación física de nuestros atletas para un rendimiento óptimo.",
        avatar: "https://example.com/sara-lee.png", // Replace with actual image URL
        socialLinks: [
          { name: "Instagram", url: "#", icon: faInstagram },
          { name: "LinkedIn", url: "#", icon: faLinkedin },
        ],
      },
    ],
  },
};

export default function OurTeam() {
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
      className="bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {content.title}
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 mb-6 lg:mb-16">
          {content.coaches.map((coach) => (
            <div
              key={coach.name}
              className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={coach.avatar}
                  alt={`${coach.name} Avatar`}
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{coach.name}</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">{coach.title}</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  {coach.description}
                </p>
                <ul className="flex space-x-4 sm:mt-0">
                  {coach.socialLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      >
                        <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}