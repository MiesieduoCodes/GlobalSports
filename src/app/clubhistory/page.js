"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrophyIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon
} from "@heroicons/react/20/solid";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Translations JSON
const translations = {
  en: {
    title: "A Legacy Forged in Grassroots Passion",
    subtitle: "Our Journey of Triumph & Transformation",
    description: "From humble beginnings to international recognition, Global Sport FC's story is one of passion, perseverance, and the power of believing in young talent. Our journey represents the ultimate underdog story in modern football.",
    timelineTitle: "Our Evolution Timeline",
    statsTitle: "By The Numbers",
    founderQuote: "We didn't just want to create a football club—we wanted to build a legacy that would transform lives and communities through the beautiful game.",
    founderName: "Veria Lawrence Ebiks",
    founderRole: "Founder & Club Director",
    features: [
      {
        icon: UserGroupIcon,
        year: "2018",
        title: "The Birth of GSFC",
        subtitle: "Grassroots Revolution",
        description: "Founded by former professional footballer Veria Lawrence Ebiks, GSFC began as a community initiative to discover overlooked talent in local neighborhoods. Our first academy started with just 12 young players.",
        achievements: ["First academy established", "12 initial players", "Community-focused model"],
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: TrophyIcon,
        year: "2020",
        title: "Professional Debut",
        subtitle: "Breaking Into Professional Football",
        description: "GSFC made its professional debut in the Kazakhstan J Liga, becoming the first grassroots-focused club to reach professional status while maintaining our commitment to local talent development.",
        achievements: ["Professional league debut", "First grassroots pro club", "Youth integration"],
        color: "from-green-500 to-green-600"
      },
      {
        icon: ChartBarIcon,
        year: "2022",
        title: "Expanding Our Reach",
        subtitle: "Strategic Growth Phase",
        description: "Securing major sponsorships enabled us to expand our academy programs nationwide. We introduced advanced training facilities and launched our elite development pathway for promising talents.",
        achievements: ["National expansion", "Advanced facilities", "Elite pathway program"],
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: GlobeAltIcon,
        year: "2024",
        title: "Global Partnerships",
        subtitle: "International Recognition",
        description: "Forging strategic international partnerships with European clubs and football organizations, creating global pathways for our players and establishing GSFC as an international talent hub.",
        achievements: ["European partnerships", "Global talent pathways", "International recognition"],
        color: "from-orange-500 to-orange-600"
      }
    ],
    stats: [
      { number: "6", label: "Years of Excellence", suffix: "+" },
      { number: "150", label: "Players Developed", suffix: "+" },
      { number: "25", label: "Professional Contracts", suffix: "+" },
      { number: "12", label: "International Players", suffix: "+" }
    ],
    currentFocus: {
      title: "Our Vision Forward",
      items: [
        "Global talent development network",
        "State-of-the-art training facilities",
        "International competitive platforms",
        "Community outreach programs"
      ]
    }
  },
  ru: {
    title: "Наследие, выкованное страстью к grassroots-футболу",
    subtitle: "Наш путь триумфа и трансформации",
    description: "От скромных начинаний до международного признания — история Global Sport FC это история страсти, perseverance и силы веры в молодые таланты. Наш путь представляет собой величайшую историю успеха аутсайдера в современном футболе.",
    timelineTitle: "Хроника нашего развития",
    statsTitle: "В цифрах",
    founderQuote: "Мы хотели не просто создать футбольный клуб — мы хотели построить наследие, которое изменит жизни и сообщества через прекрасную игру.",
    founderName: "Вериа Лоуренс Эбикс",
    founderRole: "Основатель и директор клуба",
    features: [
      {
        icon: UserGroupIcon,
        year: "2018",
        title: "Рождение GSFC",
        subtitle: "Grassroots-революция",
        description: "Основанный бывшим профессиональным футболистом Верией Лоуренсом Эбиксом, GSFC начался как общественная инициатива по поиску незамеченных талантов в местных районах. Наша первая академия началась всего с 12 юных игроков.",
        achievements: ["Первая академия основана", "12 начальных игроков", "Социально-ориентированная модель"],
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: TrophyIcon,
        year: "2020",
        title: "Профессиональный дебют",
        subtitle: "Выход в профессиональный футбол",
        description: "GSFC дебютировал в профессиональной лиге Казахстана J Лига, став первым клубом, ориентированным на grassroots, который достиг профессионального статуса, сохраняя приверженность развитию местных талантов.",
        achievements: ["Дебют в про-лиге", "Первый grassroots про-клуб", "Интеграция молодежи"],
        color: "from-green-500 to-green-600"
      },
      {
        icon: ChartBarIcon,
        year: "2022",
        title: "Расширение возможностей",
        subtitle: "Фаза стратегического роста",
        description: "Получение важных спонсорских соглашений позволило GSFC расширить программы академии по всей стране. Мы внедрили современные тренировочные facilities и запустили программу элитного развития для перспективных талантов.",
        achievements: ["Национальное расширение", "Современные facilities", "Программа элитного развития"],
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: GlobeAltIcon,
        year: "2024",
        title: "Глобальные партнерства",
        subtitle: "Международное признание",
        description: "Заключение стратегических международных партнерств с европейскими клубами и футбольными организациями, создание глобальных путей для наших игроков и установление GSFC как международного центра талантов.",
        achievements: ["Европейские партнерства", "Глобальные пути развития", "Международное признание"],
        color: "from-orange-500 to-orange-600"
      }
    ],
    stats: [
      { number: "6", label: "Лет совершенства", suffix: "+" },
      { number: "150", label: "Развитых игроков", suffix: "+" },
      { number: "25", label: "Профессиональных контрактов", suffix: "+" },
      { number: "12", label: "Международных игроков", suffix: "+" }
    ],
    currentFocus: {
      title: "Наше видение будущего",
      items: [
        "Глобальная сеть развития талантов",
        "Современные тренировочные facilities",
        "Международные competitive платформы",
        "Программы работы с сообществами"
      ]
    }
  },
  fr: {
    title: "Un héritage forgé dans la passion du football de base",
    subtitle: "Notre parcours de triomphe et de transformation",
    description: "Des débuts modestes à la reconnaissance internationale, l'histoire de Global Sport FC est celle de la passion, de la persévérance et de la puissance de croire en les jeunes talents. Notre parcours représente l'histoire ultime du outsider dans le football moderne.",
    timelineTitle: "Notre chronologie d'évolution",
    statsTitle: "En chiffres",
    founderQuote: "Nous ne voulions pas simplement créer un club de football — nous voulions bâtir un héritage qui transformerait des vies et des communautés grâce au beau jeu.",
    founderName: "Veria Lawrence Ebiks",
    founderRole: "Fondateur et Directeur du Club",
    features: [
      {
        icon: UserGroupIcon,
        year: "2018",
        title: "La naissance de GSFC",
        subtitle: "Révolution des bases",
        description: "Fondé par l'ancien footballeur professionnel Veria Lawrence Ebiks, GSFC a commencé comme une initiative communautaire pour découvrir les talents négligés dans les quartiers locaux. Notre première académie a commencé avec seulement 12 jeunes joueurs.",
        achievements: ["Première académie établie", "12 joueurs initiaux", "Modèle communautaire"],
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: TrophyIcon,
        year: "2020",
        title: "Débuts professionnels",
        subtitle: "Entrée dans le football professionnel",
        description: "GSFC a fait ses débuts professionnels dans la J Liga du Kazakhstan, devenant le premier club axé sur les bases à atteindre le statut professionnel tout en maintenant son engagement envers le développement des talents locaux.",
        achievements: ["Début en ligue pro", "Premier club pro des bases", "Intégration des jeunes"],
        color: "from-green-500 to-green-600"
      },
      {
        icon: ChartBarIcon,
        year: "2022",
        title: "Expansion de notre portée",
        subtitle: "Phase de croissance stratégique",
        description: "L'obtention de sponsorships majeurs nous a permis d'étendre nos programmes d'académie à l'échelle nationale. Nous avons introduit des installations d'entraînement avancées et lancé notre voie de développement d'élite pour les talents prometteurs.",
        achievements: ["Expansion nationale", "Installations avancées", "Programme de voie d'élite"],
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: GlobeAltIcon,
        year: "2024",
        title: "Partenariats mondiaux",
        subtitle: "Reconnaissance internationale",
        description: "Forger des partenariats internationaux stratégiques avec des clubs européens et des organisations footballistiques, créant des voies mondiales pour nos joueurs et établissant GSFC comme un hub de talents international.",
        achievements: ["Partenariats européens", "Voies de talents mondiales", "Reconnaissance internationale"],
        color: "from-orange-500 to-orange-600"
      }
    ],
    stats: [
      { number: "6", label: "Ans d'Excellence", suffix: "+" },
      { number: "150", label: "Joueurs Développés", suffix: "+" },
      { number: "25", label: "Contrats Professionnels", suffix: "+" },
      { number: "12", label: "Joueurs Internationaux", suffix: "+" }
    ],
    currentFocus: {
      title: "Notre vision vers l'avenir",
      items: [
        "Réseau mondial de développement des talents",
        "Installations d'entraînement de pointe",
        "Plateformes compétitives internationales",
        "Programmes de sensibilisation communautaire"
      ]
    }
  },
  es: {
    title: "Un legado forjado en la pasión del fútbol base",
    subtitle: "Nuestro camino de triunfo y transformación",
    description: "Desde humildes comienzos hasta el reconocimiento internacional, la historia de Global Sport FC es una de pasión, perseverancia y el poder de creer en el talento joven. Nuestro viaje representa la historia definitiva del outsider en el fútbol moderno.",
    timelineTitle: "Nuestra línea de tiempo de evolución",
    statsTitle: "En números",
    founderQuote: "No solo queríamos crear un club de fútbol — queríamos construir un legado que transformaría vidas y comunidades a través del hermoso juego.",
    founderName: "Veria Lawrence Ebiks",
    founderRole: "Fundador y Director del Club",
    features: [
      {
        icon: UserGroupIcon,
        year: "2018",
        title: "El nacimiento de GSFC",
        subtitle: "Revolución de base",
        description: "Fundado por el ex futbolista profesional Veria Lawrence Ebiks, GSFC comenzó como una iniciativa comunitaria para descubrir talentos pasados por alto en los barrios locales. Nuestra primera academia comenzó con solo 12 jóvenes jugadores.",
        achievements: ["Primera academia establecida", "12 jugadores iniciales", "Modelo comunitario"],
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: TrophyIcon,
        year: "2020",
        title: "Debut profesional",
        subtitle: "Ingreso al fútbol profesional",
        description: "GSFC hizo su debut profesional en la J Liga de Kazajstán, convirtiéndose en el primer club enfocado en las bases en alcanzar el estatus profesional mientras mantenía su compromiso con el desarrollo del talento local.",
        achievements: ["Debut en liga profesional", "Primer club profesional de base", "Integración juvenil"],
        color: "from-green-500 to-green-600"
      },
      {
        icon: ChartBarIcon,
        year: "2022",
        title: "Expansión de nuestro alcance",
        subtitle: "Fase de crecimiento estratégico",
        description: "La obtención de patrocinios importantes nos permitió expandir nuestros programas de academia a nivel nacional. Introdujimos instalaciones de entrenamiento avanzadas y lanzamos nuestro camino de desarrollo de élite para talentos prometedores.",
        achievements: ["Expansión nacional", "Instalaciones avanzadas", "Programa de camino de élite"],
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: GlobeAltIcon,
        year: "2024",
        title: "Asociaciones globales",
        subtitle: "Reconocimiento internacional",
        description: "Forjando asociaciones internacionales estratégicas con clubes europeos y organizaciones futbolísticas, creando caminos globales para nuestros jugadores y estableciendo a GSFC como un centro de talento internacional.",
        achievements: ["Asociaciones europeas", "Caminos de talento global", "Reconocimiento internacional"],
        color: "from-orange-500 to-orange-600"
      }
    ],
    stats: [
      { number: "6", label: "Años de Excelencia", suffix: "+" },
      { number: "150", label: "Jugadores Desarrollados", suffix: "+" },
      { number: "25", label: "Contratos Profesionales", suffix: "+" },
      { number: "12", label: "Jugadores Internacionales", suffix: "+" }
    ],
    currentFocus: {
      title: "Nuestra visión hacia adelante",
      items: [
        "Red global de desarrollo de talentos",
        "Instalaciones de entrenamiento de última generación",
        "Plataformas competitivas internacionales",
        "Programas de extensión comunitaria"
      ]
    }
  }
};

export default function HistorySection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const statsRef = useRef(null);
  const [activeYear, setActiveYear] = useState(0);
  const { language } = useLanguage();
  const content = translations[language] || translations.en;

  useEffect(() => {
    // Section entrance animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Timeline animation
    if (timelineRef.current) {
      gsap.fromTo(".timeline-item",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          }
        }
      );
    }

    // Stats counter animation
    if (statsRef.current) {
      gsap.fromTo(".stat-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );

      // Number counting animation
      gsap.to(".count-up", {
        innerText: function(index, target) {
          const value = parseInt(target.getAttribute("data-value"));
          return value;
        },
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
                  {content.subtitle}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                {content.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {content.description}
              </p>
            </motion.div>
          </div>

          {/* Founder Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  👤
                </div>
                <div>
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-4">
                    &quot;{content.founderQuote}&quot;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{content.founderName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{content.founderRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {content.statsTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400 mb-2">
                  <span className="count-up" data-value={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section ref={timelineRef} className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {content.timelineTitle}
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Timeline Items */}
              <div className="space-y-8">
                {content.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`timeline-item group cursor-pointer ${
                      activeYear === index ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveYear(index)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border-l-4 border-blue-500">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {feature.year}
                            </span>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                              {feature.subtitle}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {feature.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {feature.achievements.map((achievement, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visual Timeline */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeYear}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <div className={`w-20 h-20 bg-gradient-to-r ${content.features[activeYear]?.color || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6`}>
                          {content.features[activeYear]?.icon && (
                            <content.features[activeYear].icon className="w-10 h-10" />
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {content.features[activeYear]?.year || "2018"}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
                          {content.features[activeYear]?.subtitle || "Grassroots Revolution"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {content.features[activeYear]?.description || "Club history description"}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Timeline Progress */}
                    <div className="mt-8">
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>2018</span>
                        <span>2024</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(activeYear + 1) * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {content.currentFocus?.title || "Our Vision Forward"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {(content.currentFocus?.items || []).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}