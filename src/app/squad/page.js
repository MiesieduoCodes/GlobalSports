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
        name: "Davies Wilfred McCollin",
        position: "Defender",
        nationality: "Ghana",
        strengths: "Speed, Precision, Leadership",
        story:
          "Davies joined GSFC from a local academy in Accra. His commanding presence in defense and ability to read the game have made him a fan favorite.",
        image: "https://example.com/davies-mccollin.png",
      },
      {
        name: "Panford Dennis",
        position: "Attacker",
        nationality: "Ghana",
        strengths: "Vision, Passing, Stamina",
        story:
          "Panford's explosive pace and clinical finishing earned him a spot at GSFC after impressing in regional tournaments.",
        image: "https://example.com/panford-dennis.png",
      },
      {
        name: "McCarthy Solomon Tetteh",
        position: "Attacker",
        nationality: "Ghana",
        strengths: "Strength, Tackling, Positioning",
        story:
          "McCarthy rose from street football in Kumasi to becoming a key striker for GSFC, known for his relentless work ethic.",
        image: "https://example.com/mccarthy-tetteh.png",
      },
      {
        name: "Musa Mustapha Ondaki",
        position: "Defender",
        nationality: "Nigeria",
        strengths: "Reflexes, Communication, Agility",
        story:
          "Musa, a former youth captain in Lagos, brings tactical intelligence and composure to GSFC's backline.",
        image: "https://example.com/musa-ondaki.png",
      },
      {
        name: "George Belema Favour",
        position: "Midfielder",
        nationality: "Nigeria",
        strengths: "Dribbling, Creativity, Work Rate",
        story:
          "George's flair and versatility in midfield caught GSFC's scouts' attention during a tournament in Abuja.",
        image: "https://example.com/george-favour.png",
      },
      {
        name: "Nnamdi Felix Ikechukwu",
        position: "Midfielder",
        nationality: "Nigeria",
        strengths: "Passing, Vision, Set-Pieces",
        story:
          "Nnamdi, a free-kick specialist, joined GSFC after leading his university team to a national championship.",
        image: "https://example.com/nnamdi-ikechukwu.png",
      },
    ],
  },
  ru: {
    title: "Наши Звезды: Сердце GSFC",
    description:
      "GSFC — дом для самых перспективных футболистов Казахстана, каждый из которых является примером стойкости и решимости. Они — живое доказательство силы развития на местах и воплощение духа GSFC.",
    players: [
      {
        name: "Дэвис Уилфред МакКоллин",
        position: "Защитник",
        nationality: "Гана",
        strengths: "Скорость, Точность, Лидерство",
        story:
          "Дэвис присоединился к GSFC из местной академии в Аккре. Его уверенная игра в защите и умение читать игру сделали его любимцем болельщиков.",
        image: "https://example.com/davies-mccollin.png",
      },
      {
        name: "Пэнфорд Деннис",
        position: "Нападающий",
        nationality: "Гана",
        strengths: "Видение, Передачи, Выносливость",
        story:
          "Взрывная скорость и точность ударов Пэнфорда привлекли внимание GSFC после его выступлений на региональных турнирах.",
        image: "https://example.com/panford-dennis.png",
      },
      {
        name: "МакКарти Соломон Тетте",
        position: "Нападающий",
        nationality: "Гана",
        strengths: "Сила, Отбор, Позиционирование",
        story:
          "МакКарти прошел путь от уличного футбола в Кумаси до ключевого нападающего GSFC, известного своей неутомимой работой на поле.",
        image: "https://example.com/mccarthy-tetteh.png",
      },
      {
        name: "Муса Мустафа Ондаки",
        position: "Защитник",
        nationality: "Нигерия",
        strengths: "Рефлексы, Коммуникация, Ловкость",
        story:
          "Муса, бывший капитан молодежной команды в Лагосе, привносит тактический интеллект и хладнокровие в защиту GSFC.",
        image: "https://example.com/musa-ondaki.png",
      },
      {
        name: "Джордж Белема Фэйвор",
        position: "Полузащитник",
        nationality: "Нигерия",
        strengths: "Дриблинг, Креативность, Работоспособность",
        story:
          "Талант и универсальность Джорджа в полузащите привлекли скаутов GSFC во время турнира в Абудже.",
        image: "https://example.com/george-favour.png",
      },
      {
        name: "Ннамди Феликс Икечукву",
        position: "Полузащитник",
        nationality: "Нигерия",
        strengths: "Передачи, Видение, Стандарты",
        story:
          "Ннамди, специалист по штрафным ударам, присоединился к GSFC после победы с университетской командой в национальном чемпионате.",
        image: "https://example.com/nnamdi-ikechukwu.png",
      },
    ],
  },
  fr: {
    title: "Nos Étoiles: Le Cœur de GSFC",
    description:
      "GSFC abrite les footballeurs les plus prometteurs du Kazakhstan, chacun étant une histoire de résilience et de détermination. Ils sont la preuve vivante de la puissance du développement local et de l'esprit de GSFC.",
    players: [
      {
        name: "Davies Wilfred McCollin",
        position: "Défenseur",
        nationality: "Ghana",
        strengths: "Vitesse, Précision, Leadership",
        story:
          "Davies a rejoint GSFC depuis une académie locale à Accra. Sa présence rassurante en défense et sa lecture du jeu en ont fait un favori des fans.",
        image: "https://example.com/davies-mccollin.png",
      },
      {
        name: "Panford Dennis",
        position: "Attaquant",
        nationality: "Ghana",
        strengths: "Vision, Passe, Endurance",
        story:
          "La vitesse explosive et la finition précise de Panford lui ont valu une place à GSFC après des performances remarquées en tournois régionaux.",
        image: "https://example.com/panford-dennis.png",
      },
      {
        name: "McCarthy Solomon Tetteh",
        position: "Attaquant",
        nationality: "Ghana",
        strengths: "Force, Tacle, Positionnement",
        story:
          "McCarthy est passé du football de rue à Kumasi pour devenir un attaquant clé de GSFC, connu pour son éthique de travail inébranlable.",
        image: "https://example.com/mccarthy-tetteh.png",
      },
      {
        name: "Musa Mustapha Ondaki",
        position: "Défenseur",
        nationality: "Nigeria",
        strengths: "Réflexes, Communication, Agilité",
        story:
          "Musa, ancien capitaine des jeunes à Lagos, apporte son intelligence tactique et sa sérénité à la défense de GSFC.",
        image: "https://example.com/musa-ondaki.png",
      },
      {
        name: "George Belema Favour",
        position: "Milieu de terrain",
        nationality: "Nigeria",
        strengths: "Dribble, Créativité, Rythme de travail",
        story:
          "Le talent et la polyvalence de George au milieu de terrain ont attiré l'attention des recruteurs de GSFC lors d'un tournoi à Abuja.",
        image: "https://example.com/george-favour.png",
      },
      {
        name: "Nnamdi Felix Ikechukwu",
        position: "Milieu de terrain",
        nationality: "Nigeria",
        strengths: "Passe, Vision, Coups arrêtés",
        story:
          "Nnamdi, spécialiste des coups francs, a rejoint GSFC après avoir mené son équipe universitaire à un titre national.",
        image: "https://example.com/nnamdi-ikechukwu.png",
      },
    ],
  },
  es: {
    title: "Nuestras Estrellas: El Corazón de GSFC",
    description:
      "GSFC es el hogar de los futbolistas más prometedores de Kazajstán, cada uno con una historia de resiliencia y determinación. Son la prueba viviente del poder del desarrollo local y la encarnación del espíritu de GSFC.",
    players: [
      {
        name: "Davies Wilfred McCollin",
        position: "Defensor",
        nationality: "Ghana",
        strengths: "Velocidad, Precisión, Liderazgo",
        story:
          "Davies llegó a GSFC desde una academia local en Accra. Su presencia en la defensa y su capacidad para leer el juego lo han convertido en un favorito de los aficionados.",
        image: "https://example.com/davies-mccollin.png",
      },
      {
        name: "Panford Dennis",
        position: "Delantero",
        nationality: "Ghana",
        strengths: "Visión, Pases, Resistencia",
        story:
          "El ritmo explosivo y la definición clínica de Panford le valieron un lugar en GSFC después de destacar en torneos regionales.",
        image: "https://example.com/panford-dennis.png",
      },
      {
        name: "McCarthy Solomon Tetteh",
        position: "Delantero",
        nationality: "Ghana",
        strengths: "Fuerza, Entradas, Posicionamiento",
        story:
          "McCarthy pasó del fútbol callejero en Kumasi a ser un delantero clave en GSFC, conocido por su incansable ética de trabajo.",
        image: "https://example.com/mccarthy-tetteh.png",
      },
      {
        name: "Musa Mustapha Ondaki",
        position: "Defensor",
        nationality: "Nigeria",
        strengths: "Reflejos, Comunicación, Agilidad",
        story:
          "Musa, ex capitán juvenil en Lagos, aporta inteligencia táctica y serenidad a la defensa de GSFC.",
        image: "https://example.com/musa-ondaki.png",
      },
      {
        name: "George Belema Favour",
        position: "Centrocampista",
        nationality: "Nigeria",
        strengths: "Regate, Creatividad, Ritmo de trabajo",
        story:
          "El talento y versatilidad de George en el mediocampo llamaron la atención de los ojeadores de GSFC durante un torneo en Abuja.",
        image: "https://example.com/george-favour.png",
      },
      {
        name: "Nnamdi Felix Ikechukwu",
        position: "Centrocampista",
        nationality: "Nigeria",
        strengths: "Pases, Visión, Tiros libres",
        story:
          "Nnamdi, especialista en tiros libres, se unió a GSFC después de liderar a su equipo universitario hacia un campeonato nacional.",
        image: "https://example.com/nnamdi-ikechukwu.png",
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