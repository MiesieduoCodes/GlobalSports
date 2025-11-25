"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    teamTitle: "Elite Football Excellence",
    teamSubtitle: "Meet Our Professional Squad",
    teamDescription: "A dynamic blend of seasoned veterans and emerging talents, united by a shared passion for football excellence and a commitment to pushing the boundaries of the beautiful game.",
    joinButton: "Join Our Legacy",
    coachingTitle: "Master Coaching Team",
    coachingSubtitle: "Strategic Leadership & Technical Excellence",
    coachingDescription: "Our world-class coaching staff brings decades of combined experience in professional football, player development, and tactical innovation to nurture the next generation of football stars.",
    legacyTitle: "Club Heritage & Vision",
    legacySubtitle: "Building on a Foundation of Excellence",
    legacyDescription: "For over 9 years, Global Sports FC has been at the forefront of football development, transforming from a community initiative into a professional powerhouse that continues to shape the future of the sport.",
    legacyPromise: "Our journey is marked by unforgettable victories, legendary players, and an unwavering commitment to excellence. We're not just building a team—we're crafting a legacy that inspires generations to come.",
    stats: {
      years: "9+",
      yearsLabel: "Years of Excellence",
      players: "150+",
      playersLabel: "Players Developed",
      trophies: "25+",
      trophiesLabel: "Trophies Won",
      coaches: "15+",
      coachesLabel: "Expert Coaches"
    },
    people: [
      {
        name: "Lawrence Veria",
        role: "Head Coach & Technical Director",
        bio: "UEFA Pro License holder with 20+ years in international football. Former professional player turned master tactician, known for developing world-class talent and implementing innovative training methodologies.",
        experience: "20+ Years",
        specialties: ["Tactical Analysis", "Player Development", "Team Strategy"],
        achievements: ["3x League Champion", "Youth Development Expert", "UEFA Pro License"]
      },
      {
        name: "David Smith",
        role: "Assistant Coach & Performance Analyst",
        bio: "Sports science graduate with 12 years of coaching experience. Specializes in data-driven performance optimization and modern training techniques that maximize player potential.",
        experience: "12+ Years",
        specialties: ["Performance Analysis", "Sports Science", "Technical Training"],
        achievements: ["FA Advanced License", "Performance Innovation Award", "Data Analytics Expert"]
      },
      {
        name: "Michael Brown",
        role: "Team Captain & Senior Player",
        bio: "Inspiring leader with 8 seasons of captaincy experience. Embodies the club's values both on and off the pitch, mentoring younger players while maintaining elite performance standards.",
        experience: "10+ Years",
        specialties: ["Leadership", "Mentoring", "Game Management"],
        achievements: ["Club Captain", "Player of the Season", "Community Ambassador"]
      },
    ],
    viewProfile: "View Full Profile",
    contactCoach: "Contact Coach",
    playerSpotlight: "Player Spotlight",
    trainingPhilosophy: "Training Philosophy",
    clubValues: "Club Values"
  },
  ru: {
    teamTitle: "Элитное футбольное мастерство",
    teamSubtitle: "Знакомьтесь с нашей профессиональной командой",
    teamDescription: "Динамичное сочетание опытных ветеранов и восходящих талантов, объединенных общей страстью к футбольному мастерству и стремлением раздвигать границы прекрасной игры.",
    joinButton: "Присоединиться к наследию",
    coachingTitle: "Команда мастеров-тренеров",
    coachingSubtitle: "Стратегическое лидерство и техническое совершенство",
    coachingDescription: "Наш тренерский штаб мирового класса приносит десятилетия совокупного опыта в профессиональном футболе, развитии игроков и тактических инновациях для воспитания следующего поколения футбольных звезд.",
    legacyTitle: "Наследие и видение клуба",
    legacySubtitle: "Строим на основе совершенства",
    legacyDescription: "Более 9 лет Global Sports FC находится на передовой футбольного развития, превратившись из общественной инициативы в профессиональную силу, которая продолжает формировать будущее спорта.",
    legacyPromise: "Наш путь отмечен незабываемыми победами, легендарными игроками и непоколебимой приверженностью совершенству. Мы не просто строим команду — мы создаем наследие, которое вдохновляет грядущие поколения.",
    stats: {
      years: "9+",
      yearsLabel: "Лет совершенства",
      players: "150+",
      playersLabel: "Развитых игроков",
      trophies: "25+",
      trophiesLabel: "Выигранных трофеев",
      coaches: "15+",
      coachesLabel: "Экспертных тренеров"
    },
    people: [
      {
        name: "Лоренс Верия",
        role: "Главный тренер и технический директор",
        bio: "Обладатель лицензии UEFA Pro с 20+ годами опыта в международном футболе. Бывший профессиональный игрок, ставший мастером тактики, известен развитием талантов мирового класса и внедрением инновационных методик тренировок.",
        experience: "20+ Лет",
        specialties: ["Тактический анализ", "Развитие игроков", "Командная стратегия"],
        achievements: ["3-кратный чемпион лиги", "Эксперт по развитию молодежи", "Лицензия UEFA Pro"]
      },
      // ... other Russian translations
    ],
    viewProfile: "Посмотреть профиль",
    contactCoach: "Связаться с тренером",
    playerSpotlight: "Игрок в центре внимания",
    trainingPhilosophy: "Философия тренировок",
    clubValues: "Ценности клуба"
  },
  fr: {
    teamTitle: "Excellence Footballistique d'Élite",
    teamSubtitle: "Rencontrez Notre Équipe Professionnelle",
    teamDescription: "Un mélange dynamique de vétérans expérimentés et de talents émergents, unis par une passion partagée pour l'excellence footballistique et un engagement à repousser les limites du beau jeu.",
    joinButton: "Rejoignez Notre Héritage",
    coachingTitle: "Équipe d'Entraîneurs Experts",
    coachingSubtitle: "Leadership Stratégique et Excellence Technique",
    coachingDescription: "Notre staff d'entraîneurs de classe mondiale apporte des décennies d'expérience combinée dans le football professionnel, le développement des joueurs et l'innovation tactique pour former la prochaine génération de stars du football.",
    legacyTitle: "Héritage et Vision du Club",
    legacySubtitle: "Bâtir sur une Fondation d'Excellence",
    legacyDescription: "Depuis plus de 9 ans, Global Sports FC est à l'avant-garde du développement footballistique, passant d'une initiative communautaire à une puissance professionnelle qui continue de façonner l'avenir du sport.",
    legacyPromise: "Notre parcours est marqué par des victoires inoubliables, des joueurs légendaires et un engagement indéfectible envers l'excellence. Nous ne construisons pas seulement une équipe — nous forgeons un héritage qui inspire les générations futures.",
    stats: {
      years: "9+",
      yearsLabel: "Ans d'Excellence",
      players: "150+",
      playersLabel: "Joueurs Développés",
      trophies: "25+",
      trophiesLabel: "Trophées Remportés",
      coaches: "15+",
      coachesLabel: "Entraîneurs Experts"
    },
    people: [
      // ... French translations
    ],
    viewProfile: "Voir le Profil",
    contactCoach: "Contacter l'Entraîneur",
    playerSpotlight: "Joueur à l'Honneur",
    trainingPhilosophy: "Philosophie d'Entraînement",
    clubValues: "Valeurs du Club"
  },
  es: {
    teamTitle: "Excelencia Futbolística de Élite",
    teamSubtitle: "Conoce Nuestro Equipo Profesional",
    teamDescription: "Una mezcla dinámica de veteranos experimentados y talentos emergentes, unidos por una pasión compartida por la excelencia futbolística y un compromiso para superar los límites del juego bonito.",
    joinButton: "Únete a Nuestro Legado",
    coachingTitle: "Equipo de Entrenadores Maestros",
    coachingSubtitle: "Liderazgo Estratégico y Excelencia Técnica",
    coachingDescription: "Nuestro cuerpo técnico de clase mundial aporta décadas de experiencia combinada en fútbol profesional, desarrollo de jugadores e innovación táctica para formar a la próxima generación de estrellas del fútbol.",
    legacyTitle: "Herencia y Visión del Club",
    legacySubtitle: "Construyendo sobre una Base de Excelencia",
    legacyDescription: "Durante más de 9 años, Global Sports FC ha estado a la vanguardia del desarrollo futbolístico, transformándose de una iniciativa comunitaria en una potencia profesional que continúa moldeando el futuro del deporte.",
    legacyPromise: "Nuestro camino está marcado por victorias inolvidables, jugadores legendarios y un compromiso inquebrantable con la excelencia. No solo estamos construyendo un equipo — estamos forjando un legado que inspira a las generaciones venideras.",
    stats: {
      years: "9+",
      yearsLabel: "Años de Excelencia",
      players: "150+",
      playersLabel: "Jugadores Desarrollados",
      trophies: "25+",
      trophiesLabel: "Trofeos Ganados",
      coaches: "15+",
      coachesLabel: "Entrenadores Expertos"
    },
    people: [
      // ... Spanish translations
    ],
    viewProfile: "Ver Perfil Completo",
    contactCoach: "Contactar Entrenador",
    playerSpotlight: "Jugador Destacado",
    trainingPhilosophy: "Filosofía de Entrenamiento",
    clubValues: "Valores del Club"
  },
};

const TeamPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [activeProfile, setActiveProfile] = useState(null);
  
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
    // Hero animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        ease: "power3.out"
      }
    );

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
            start: "top 80%",
          }
        }
      );
    }

    // Team member cards animation
    gsap.fromTo(".team-member-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".team-member-card",
          start: "top 85%",
        }
      }
    );
  }, []);

  const getImageSrc = (personName) => 
    localImageMap[personName] || "/images/default-avatar.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section ref={sectionRef} className="relative min-h-screen pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-800/80 dark:from-blue-900/95 dark:to-indigo-900/90 z-10"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center min-h-[80vh] z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full mb-8 border border-yellow-400/30">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-yellow-300 font-semibold text-sm">Elite Professional Team</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {trans.teamTitle}
              </h1>
              
              <p className="text-2xl text-yellow-300 mb-4 font-light">
                {trans.teamSubtitle}
              </p>
              
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {trans.teamDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {trans.joinButton}
                  <span className="ml-2">→</span>
                </motion.a>
                <motion.a 
                  href="#coaching"
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {trans.viewProfile}
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {teamImages.map((src, index) => (
                  <motion.div 
                    key={`player-${index}`}
                    className={`relative group ${index % 2 === 0 ? "md:mt-8" : ""}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl group-hover:from-blue-600/40 transition-all duration-300 z-10"></div>
                    <Image
                      src={src}
                      alt={`Professional Player ${index + 1}`}
                      width={200}
                      height={250}
                      className="w-full h-48 md:h-56 rounded-2xl object-cover shadow-2xl"
                      onError={(e) => {
                        e.target.src = '/images/default-player.jpg';
                      }}
                    />
                    {index === 2 && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Captain
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {Object.entries(trans.stats).map(([key, value], index) => {
              if (key.includes('Label')) return null;
              const labelKey = `${key}Label`;
              return (
                <motion.div 
                  key={key}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-2">
                    {value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                    {trans.stats[labelKey]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Coaching Section */}
      <section id="coaching" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {trans.coachingTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {trans.coachingSubtitle}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              {trans.coachingDescription}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {safePeople.map((person, index) => (
              <motion.div
                key={`${person.name}-${index}`}
                className="team-member-card group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getImageSrc(person.name)}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/images/default-avatar.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold mb-2">
                      {person.experience}
                    </div>
                    <h3 className="text-xl font-bold">{person.name}</h3>
                    <p className="text-blue-200">{person.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {person.bio}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Areas of Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {person.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setActiveProfile(person)}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      {trans.viewProfile}
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                      {trans.contactCoach}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Legacy Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full mb-8 border border-gray-200 dark:border-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                Club Heritage
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {trans.legacyTitle}
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {trans.legacyDescription}
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{trans.legacyPromise}"
              </p>
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              {['🏆', '⭐', '👥', '⚽'].map((icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {activeProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeProfile.name}
                  </h3>
                  <button
                    onClick={() => setActiveProfile(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
                {/* Add detailed profile content here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamPage;