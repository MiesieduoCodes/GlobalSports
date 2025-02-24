"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    teamTitle: "Meet Our Football Stars",
    teamDescription: "Our players embody passion, skill, and determination on the pitch. With every match, they push the boundaries of excellence and inspire fans around the world.",
    joinButton: "Join the Squad",
    coachingTitle: "Coaching & Leadership",
    coachingDescription: "Our experienced coaching staff and leadership team ensure the success and growth of our football club.",
    legacyTitle: "Our Legacy",
    legacyDescription: "Founded over 9 years ago, Global Sports FC began as a humble community initiative. Over the decades, the club evolved into a powerhouse of passion and performance, inspiring generations of football enthusiasts.",
    legacyPromise: "With unforgettable victories, legendary players, and a commitment to nurturing new talent, our history is not just about the past—it’s a promise of excellence for the future.",
    people: [
      {
        name: "Lawrence Veria",
        role: "Head Coach",
        bio: "With over 20 years of experience in international football, Lawrence has led teams to victory and inspired a new generation of talent.",
      },
      {
        name: "David Smith",
        role: "Assistant Coach",
        bio: "David's innovative training methods and strategic mindset have been pivotal in fostering a culture of excellence and continuous improvement.",
      },
      {
        name: "Michael Brown",
        role: "Team Captain",
        bio: "Michael leads by example both on and off the field, embodying the spirit and determination that drive our club's success.",
      },
    ],
  },
  ru: {
    teamTitle: "Познакомьтесь с нашими футбольными звездами",
    teamDescription: "Наши игроки воплощают страсть, мастерство и решимость на поле. С каждым матчем они раздвигают границы мастерства и вдохновляют фанатов по всему миру.",
    joinButton: "Присоединяйтесь к команде",
    coachingTitle: "Тренерский состав и лидерство",
    coachingDescription: "Наши опытные тренеры и команда руководства обеспечивают успех и рост нашего футбольного клуба.",
    legacyTitle: "Наше наследие",
    legacyDescription: "Основанный более 9 лет назад, Global Sports FC начался как скромная общественная инициатива. За десятилетия клуб стал центром страсти и мастерства, вдохновляя поколения футбольных энтузиастов.",
    legacyPromise: "С незабываемыми победами, легендарными игроками и обязательством воспитывать новые таланты, наша история — это не только о прошлом, но и обещание выдающихся успехов в будущем.",
    people: [
      {
        name: "Лоренс Верия",
        role: "Главный тренер",
        bio: "С более чем 20-летним опытом в международном футболе Лоренс привел команды к победам и вдохновил новое поколение талантов.",
      },
      {
        name: "Дэвид Смит",
        role: "Ассистент тренера",
        bio: "Инновационные методы тренировки Дэвида и стратегический подход сыграли ключевую роль в формировании культуры совершенства и постоянного улучшения.",
      },
      {
        name: "Майкл Браун",
        role: "Капитан команды",
        bio: "Майкл является примером как на поле, так и вне его, воплощая дух и решимость, которые движут успехом нашего клуба.",
      },
    ],
  },
  fr: {
    teamTitle: "Rencontrez nos stars du football",
    teamDescription: "Nos joueurs incarnent la passion, l'habileté et la détermination sur le terrain. À chaque match, ils repoussent les limites de l'excellence et inspirent des fans à travers le monde.",
    joinButton: "Rejoignez l'équipe",
    coachingTitle: "Coaching et leadership",
    coachingDescription: "Notre équipe d'entraîneurs expérimentés et notre équipe de direction garantissent le succès et la croissance de notre club de football.",
    legacyTitle: "Notre héritage",
    legacyDescription: "Fondé il y a plus de 9 ans, Global Sports FC a commencé comme une humble initiative communautaire. Au fil des décennies, le club est devenu un centre de passion et de performance, inspirant des générations d'enthousiastes du football.",
    legacyPromise: "Avec des victoires inoubliables, des joueurs légendaires et un engagement à former de nouveaux talents, notre histoire n'est pas seulement un regard sur le passé, mais une promesse d'excellence pour l'avenir.",
    people: [
      {
        name: "Lawrence Veria",
        role: "Entraîneur Principal",
        bio: "Avec plus de 20 ans d'expérience dans le football international, Lawrence a mené des équipes à la victoire et inspiré une nouvelle génération de talents.",
      },
      {
        name: "David Smith",
        role: "Entraîneur Adjoint",
        bio: "Les méthodes d'entraînement innovantes de David et son esprit stratégique ont été essentiels pour favoriser une culture d'excellence et d'amélioration continue.",
      },
      {
        name: "Michael Brown",
        role: "Capitaine de l'équipe",
        bio: "Michael montre l'exemple sur et en dehors du terrain, incarnant l'esprit et la détermination qui mènent au succès de notre club.",
      },
    ],
  },
  es: {
    teamTitle: "Conoce a nuestras estrellas del fútbol",
    teamDescription: "Nuestros jugadores encarnan la pasión, habilidad y determinación en el campo. Con cada partido, empujan los límites de la excelencia e inspiran a aficionados de todo el mundo.",
    joinButton: "Únete al equipo",
    coachingTitle: "Entrenamiento y liderazgo",
    coachingDescription: "Nuestro experimentado equipo de entrenadores y liderazgo asegura el éxito y crecimiento de nuestro club de fútbol.",
    legacyTitle: "Nuestro legado",
    legacyDescription: "Fundado hace más de 9 años, Global Sports FC comenzó como una humilde iniciativa comunitaria. A lo largo de las décadas, el club se ha convertido en un centro de pasión y rendimiento, inspirando a generaciones de entusiastas del fútbol.",
    legacyPromise: "Con victorias inolvidables, jugadores legendarios y un compromiso de fomentar nuevos talentos, nuestra historia no se trata solo del pasado, sino de una promesa de excelencia para el futuro.",
    people: [
      {
        name: "Lawrence Veria",
        role: "Entrenador Principal",
        bio: "Con más de 20 años de experiencia en el fútbol internacional, Lawrence ha llevado a equipos a la victoria e inspirado a una nueva generación de talentos.",
      },
      {
        name: "David Smith",
        role: "Entrenador Asistente",
        bio: "Los métodos de entrenamiento innovadores de David y su mentalidad estratégica han sido fundamentales para fomentar una cultura de excelencia y mejora continua.",
      },
      {
        name: "Michael Brown",
        role: "Capitán del equipo",
        bio: "Michael lidera con el ejemplo tanto dentro como fuera del campo, encarnando el espíritu y la determinación que impulsan el éxito de nuestro club.",
      },
    ],
  },
};

const TeamPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  
  const trans = translations[language] || translations.en;
  const safePeople = trans.people || [];

  const teamImages = [
    "/images/PlayerOne.jpg",
    "/images/FREEIMAGE.jpg",
    "/images/kneelingimage.jpg",
    "/images/Immages.jpg",
    "/images/Handsake.jpg",
    "/images/IMG-20250219-WA0125.jpg",
  ];

  const localImageMap = {
    "Lawrence Veria": "/images/IMG-20250211-WA0166.jpg",
    "David Smith": "/images/assistant_coach.jpg",
    "Michael Brown": "/images/captain.jpg",
    "Лоренс Верия": "/images/IMG-20250211-WA0166.jpg",
    "Дэвид Смит": "/images/assistant_coach.jpg",
    "Майкл Браун": "/images/captain.jpg",
  };

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const getImageSrc = (personName) => 
    localImageMap[personName] || "/images/default-avatar.jpg";

  return (
    <div className={theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}>
      <section ref={sectionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:mt-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {trans.teamTitle || "Our Team"}
              </h2>
              <p className="text-base sm:text-lg mb-8">
                {trans.teamDescription || "Meet our dedicated team members"}
              </p>
              <a 
                href="/contact"
                className="inline-block py-3 px-6 sm:px-8 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 mx-auto lg:mx-0"
              >
                {trans.joinButton || "Join Us"}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 mt-16 md:mt-12 max-w-lg mx-auto"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
                {teamImages.map((src, index) => (
                  <div key={`player-${index}`} className={`mx-auto ${index % 2 === 0 ? "sm:mt-10" : ""}`}>
                    <Image
                      src={src}
                      alt={`Player ${index + 1}`}
                      width={224}
                      height={100}
                      className="w-32 sm:w-44 sm:h-56 rounded-2xl object-cover"
                      onError={(e) => {
                        e.target.src = '/images/default-player.jpg';
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {trans.coachingTitle || "Leadership Team"}
            </h2>
            <p className="mt-6 text-lg">
              {trans.coachingDescription || "Our experienced leadership team"}
            </p>
          </div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            role="list"
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {safePeople.map((person, index) => (
              <li 
                key={`${person.name}-${index}`}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-x-4 mb-4">
                  <Image
                    src={getImageSrc(person.name)}
                    alt={person.name || "Team member"}
                    width={64}
                    height={64}
                    className="rounded-full"
                    onError={(e) => {
                      e.target.src = '/images/default-avatar.jpg';
                    }}
                  />
                  <div>
                    <h3 className="text-base font-semibold">
                      {person.name || "Team Member"}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600">
                      {person.role || "Position"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {person.bio || "Bio information not available"}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-800 text-black dark:text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">
              {trans.legacyTitle || "Our History"}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {trans.legacyDescription || "Club history information"}
            </p>
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
              {trans.legacyPromise || "Our commitment to excellence"}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;