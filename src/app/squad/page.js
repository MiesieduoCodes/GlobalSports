"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Translations JSON
const translations = {
  en: {
    title: "Our Stars: The Heart of GSFC",
    description:
      "GSFC is home to Kazakhstan's most promising footballers, each a story of resilience and determination. They are living proof of the power of grassroots development and the embodiment of the GSFC spirit.",
    players: [
      {
        name: "Alexey Ivanov",
        position: "Forward",
        nationality: "Kazakhstan",
        strengths: "Speed, Precision, Leadership",
        story:
          "Alexey grew up in a small village in Kazakhstan. Despite limited resources, his passion for football led him to GSFC, where he has become a key player.",
        image: "https://example.com/alexey-ivanov.png", // Replace with actual image URL
      },
      {
        name: "Dmitry Petrov",
        position: "Midfielder",
        nationality: "Kazakhstan",
        strengths: "Vision, Passing, Stamina",
        story:
          "Dmitry joined GSFC at the age of 16. His ability to control the midfield has made him a vital part of the team.",
        image: "https://example.com/dmitry-petrov.png", // Replace with actual image URL
      },
      {
        name: "Sergey Smirnov",
        position: "Defender",
        nationality: "Kazakhstan",
        strengths: "Strength, Tackling, Positioning",
        story:
          "Sergey's journey from a local academy to GSFC is a testament to his hard work and dedication to the sport.",
        image: "https://example.com/sergey-smirnov.png", // Replace with actual image URL
      },
      {
        name: "Anastasia Kuznetsova",
        position: "Goalkeeper",
        nationality: "Kazakhstan",
        strengths: "Reflexes, Communication, Agility",
        story:
          "Anastasia is one of the few female players in GSFC. Her exceptional goalkeeping skills have earned her a place in the team.",
        image: "https://example.com/anastasia-kuznetsova.png", // Replace with actual image URL
      },
    ],
  },
  ru: {
    title: "Наши Звезды: Сердце GSFC",
    description:
      "GSFC — дом для самых перспективных футболистов Казахстана, каждый из которых является примером стойкости и решимости. Они — живое доказательство силы развития на местах и воплощение духа GSFC.",
    players: [
      {
        name: "Алексей Иванов",
        position: "Нападающий",
        nationality: "Казахстан",
        strengths: "Скорость, Точность, Лидерство",
        story:
          "Алексей вырос в маленькой деревне в Казахстане. Несмотря на ограниченные ресурсы, его страсть к футболу привела его в GSFC, где он стал ключевым игроком.",
        image: "https://example.com/alexey-ivanov.png", // Replace with actual image URL
      },
      {
        name: "Дмитрий Петров",
        position: "Полузащитник",
        nationality: "Казахстан",
        strengths: "Видение, Передачи, Выносливость",
        story:
          "Дмитрий присоединился к GSFC в возрасте 16 лет. Его способность контролировать середину поля сделала его важной частью команды.",
        image: "https://example.com/dmitry-petrov.png", // Replace with actual image URL
      },
      {
        name: "Сергей Смирнов",
        position: "Защитник",
        nationality: "Казахстан",
        strengths: "Сила, Отбор, Позиционирование",
        story:
          "Путь Сергея из местной академии в GSFC — это свидетельство его упорного труда и преданности спорту.",
        image: "https://example.com/sergey-smirnov.png", // Replace with actual image URL
      },
      {
        name: "Анастасия Кузнецова",
        position: "Вратарь",
        nationality: "Казахстан",
        strengths: "Рефлексы, Коммуникация, Ловкость",
        story:
          "Анастасия — одна из немногих женщин-игроков в GSFC. Ее исключительные навыки вратаря заслужили ей место в команде.",
        image: "https://example.com/anastasia-kuznetsova.png", // Replace with actual image URL
      },
    ],
  },
  fr: {
    title: "Nos Étoiles: Le Cœur de GSFC",
    description:
      "GSFC abrite les footballeurs les plus prometteurs du Kazakhstan, chacun étant une histoire de résilience et de détermination. Ils sont la preuve vivante de la puissance du développement local et de l'esprit de GSFC.",
    players: [
      {
        name: "Alexey Ivanov",
        position: "Attaquant",
        nationality: "Kazakhstan",
        strengths: "Vitesse, Précision, Leadership",
        story:
          "Alexey a grandi dans un petit village au Kazakhstan. Malgré des ressources limitées, sa passion pour le football l'a conduit à GSFC, où il est devenu un joueur clé.",
        image: "https://example.com/alexey-ivanov.png", // Replace with actual image URL
      },
      {
        name: "Dmitry Petrov",
        position: "Milieu de terrain",
        nationality: "Kazakhstan",
        strengths: "Vision, Passe, Endurance",
        story:
          "Dmitry a rejoint GSFC à l'âge de 16 ans. Sa capacité à contrôler le milieu de terrain en a fait un élément vital de l'équipe.",
        image: "https://example.com/dmitry-petrov.png", // Replace with actual image URL
      },
      {
        name: "Sergey Smirnov",
        position: "Défenseur",
        nationality: "Kazakhstan",
        strengths: "Force, Tacle, Positionnement",
        story:
          "Le parcours de Sergey, d'une académie locale à GSFC, témoigne de son travail acharné et de son dévouement au sport.",
        image: "https://example.com/sergey-smirnov.png", // Replace with actual image URL
      },
      {
        name: "Anastasia Kuznetsova",
        position: "Gardien de but",
        nationality: "Kazakhstan",
        strengths: "Réflexes, Communication, Agilité",
        story:
          "Anastasia est l'une des rares femmes joueuses de GSFC. Ses compétences exceptionnelles de gardienne de but lui ont valu une place dans l'équipe.",
        image: "https://example.com/anastasia-kuznetsova.png", // Replace with actual image URL
      },
    ],
  },
  es: {
    title: "Nuestras Estrellas: El Corazón de GSFC",
    description:
      "GSFC es el hogar de los futbolistas más prometedores de Kazajstán, cada uno con una historia de resiliencia y determinación. Son la prueba viviente del poder del desarrollo local y la encarnación del espíritu de GSFC.",
    players: [
      {
        name: "Alexey Ivanov",
        position: "Delantero",
        nationality: "Kazajstán",
        strengths: "Velocidad, Precisión, Liderazgo",
        story:
          "Alexey creció en un pequeño pueblo de Kazajstán. A pesar de los recursos limitados, su pasión por el fútbol lo llevó a GSFC, donde se ha convertido en un jugador clave.",
        image: "https://example.com/alexey-ivanov.png", // Replace with actual image URL
      },
      {
        name: "Dmitry Petrov",
        position: "Centrocampista",
        nationality: "Kazajstán",
        strengths: "Visión, Pases, Resistencia",
        story:
          "Dmitry se unió a GSFC a los 16 años. Su capacidad para controlar el mediocampo lo ha convertido en una parte vital del equipo.",
        image: "https://example.com/dmitry-petrov.png", // Replace with actual image URL
      },
      {
        name: "Sergey Smirnov",
        position: "Defensor",
        nationality: "Kazajstán",
        strengths: "Fuerza, Entradas, Posicionamiento",
        story:
          "El viaje de Sergey desde una academia local hasta GSFC es un testimonio de su arduo trabajo y dedicación al deporte.",
        image: "https://example.com/sergey-smirnov.png", // Replace with actual image URL
      },
      {
        name: "Anastasia Kuznetsova",
        position: "Portera",
        nationality: "Kazajstán",
        strengths: "Reflejos, Comunicación, Agilidad",
        story:
          "Anastasia es una de las pocas jugadoras de GSFC. Sus excepcionales habilidades como portera le han valido un lugar en el equipo.",
        image: "https://example.com/anastasia-kuznetsova.png", // Replace with actual image URL
      },
    ],
  },
};

export default function PlayersPage() {
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

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.players.map((player, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {player.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Position:</strong> {player.position}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Nationality:</strong> {player.nationality}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Strengths:</strong> {player.strengths}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <strong>Story:</strong> {player.story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}