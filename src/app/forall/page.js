"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    hero: {
      title: "Football For All",
      subtitle: "Inclusive. Accessible. Empowering.",
      description: "At Global Sports FC, we believe football belongs to everyone. Our 'For All' initiative breaks down barriers and creates opportunities for players of all backgrounds, abilities, and ages."
    },
    programs: {
      title: "Our Inclusive Programs",
      items: [
        {
          icon: "♿",
          title: "Adaptive Football",
          description: "Specialized programs for players with physical disabilities, featuring modified rules and equipment to ensure everyone can participate in the beautiful game.",
          features: ["Wheelchair football", "Amputee programs", "Visual impairment sessions"]
        },
        {
          icon: "🧠",
          title: "Special Abilities Program",
          description: "Tailored training sessions for players with learning disabilities and autism, focusing on fun, skill development, and social integration.",
          features: ["Sensory-friendly environment", "Small group sessions", "Patient certified coaches"]
        },
        {
          icon: "👵",
          title: "Walking Football",
          description: "A slower-paced version of the game designed for seniors and those returning from injury, promoting fitness and social connection.",
          features: ["No running allowed", "Low impact exercise", "Social community"]
        },
        {
          icon: "👩",
          title: "Women's Development",
          description: "Dedicated programs empowering women and girls in football, from grassroots to competitive levels.",
          features: ["All-female coaching", "Flexible schedules", "Scholarship opportunities"]
        },
        {
          icon: "🌍",
          title: "Refugee Integration",
          description: "Using football as a tool for integration, helping refugees and asylum seekers build community connections.",
          features: ["Language support", "Cultural awareness", "Community building"]
        },
        {
          icon: "💰",
          title: "Financial Accessibility",
          description: "No one should miss out on football due to cost. We offer scholarships and subsidized programs.",
          features: ["Free equipment loans", "Sliding scale fees", "Full scholarships available"]
        }
      ]
    },
    impact: {
      title: "Our Impact",
      stats: [
        { number: "500+", label: "Participants in inclusive programs" },
        { number: "12", label: "Partner organizations" },
        { number: "95%", label: "Participant satisfaction rate" },
        { number: "50+", label: "Certified inclusive coaches" }
      ]
    },
    testimonials: {
      title: "Stories of Inclusion",
      items: [
        {
          quote: "GSFC's adaptive program gave my son the chance to play football for the first time. The joy on his face is priceless.",
          author: "Maria K.",
          role: "Parent"
        },
        {
          quote: "Walking football has transformed my retirement. I've made incredible friends and feel healthier than ever.",
          author: "James O.",
          role: "Walking Football Player"
        },
        {
          quote: "As a refugee, football at GSFC helped me feel like I belonged somewhere. It's more than a sport – it's a family.",
          author: "Ahmed S.",
          role: "Program Participant"
        }
      ]
    },
    volunteer: {
      title: "Get Involved",
      description: "Whether you want to volunteer, donate, or participate, there's a place for you in our Football For All initiative.",
      buttons: {
        volunteer: "Volunteer With Us",
        donate: "Support Our Programs",
        participate: "Join a Program"
      }
    },
    values: {
      title: "Our Commitment",
      items: [
        { title: "Zero Discrimination", description: "We welcome everyone regardless of ability, background, or circumstance" },
        { title: "Safe Spaces", description: "All our sessions are safeguarded environments with trained staff" },
        { title: "Professional Support", description: "Qualified coaches with specialized training in inclusive sports" },
        { title: "Community Focus", description: "Building lasting connections that extend beyond the pitch" }
      ]
    }
  },
  ru: {
    hero: {
      title: "Футбол для Всех",
      subtitle: "Инклюзивный. Доступный. Вдохновляющий.",
      description: "В Global Sports FC мы верим, что футбол принадлежит каждому. Наша инициатива 'Для Всех' устраняет барьеры и создает возможности для игроков всех возможностей и возрастов."
    },
    programs: {
      title: "Наши Инклюзивные Программы",
      items: [
        {
          icon: "♿",
          title: "Адаптивный Футбол",
          description: "Специализированные программы для игроков с физическими ограничениями.",
          features: ["Футбол на колясках", "Программы для ампутантов", "Сессии для слабовидящих"]
        },
        {
          icon: "🧠",
          title: "Программа Особых Способностей",
          description: "Адаптированные тренировки для игроков с особенностями развития.",
          features: ["Сенсорно-дружественная среда", "Малые группы", "Терпеливые тренеры"]
        },
        {
          icon: "👵",
          title: "Ходячий Футбол",
          description: "Медленная версия игры для пожилых людей и тех, кто восстанавливается после травм.",
          features: ["Без бега", "Низкая нагрузка", "Социальное сообщество"]
        },
        {
          icon: "👩",
          title: "Развитие Женского Футбола",
          description: "Программы для женщин и девочек на всех уровнях.",
          features: ["Женские тренеры", "Гибкий график", "Стипендии"]
        },
        {
          icon: "🌍",
          title: "Интеграция Беженцев",
          description: "Использование футбола как инструмента интеграции.",
          features: ["Языковая поддержка", "Культурная осведомленность", "Построение сообщества"]
        },
        {
          icon: "💰",
          title: "Финансовая Доступность",
          description: "Никто не должен пропускать футбол из-за стоимости.",
          features: ["Бесплатный прокат оборудования", "Скользящая шкала оплаты", "Полные стипендии"]
        }
      ]
    },
    impact: {
      title: "Наше Влияние",
      stats: [
        { number: "500+", label: "Участников инклюзивных программ" },
        { number: "12", label: "Организаций-партнеров" },
        { number: "95%", label: "Удовлетворенность участников" },
        { number: "50+", label: "Сертифицированных инклюзивных тренеров" }
      ]
    },
    testimonials: {
      title: "Истории Инклюзии",
      items: [
        {
          quote: "Адаптивная программа GSFC дала моему сыну шанс впервые играть в футбол.",
          author: "Мария К.",
          role: "Родитель"
        },
        {
          quote: "Ходячий футбол преобразил мою пенсию. Я завел невероятных друзей.",
          author: "Джеймс О.",
          role: "Игрок ходячего футбола"
        },
        {
          quote: "Как беженец, футбол в GSFC помог мне почувствовать, что я принадлежу.",
          author: "Ахмед С.",
          role: "Участник программы"
        }
      ]
    },
    volunteer: {
      title: "Примите Участие",
      description: "Хотите волонтерить, пожертвовать или участвовать? Здесь есть место для вас.",
      buttons: {
        volunteer: "Стать Волонтером",
        donate: "Поддержать Программы",
        participate: "Присоединиться"
      }
    },
    values: {
      title: "Наши Обязательства",
      items: [
        { title: "Нулевая Дискриминация", description: "Мы принимаем всех независимо от способностей или обстоятельств" },
        { title: "Безопасная Среда", description: "Все сессии проходят под наблюдением обученного персонала" },
        { title: "Профессиональная Поддержка", description: "Квалифицированные тренеры со специальной подготовкой" },
        { title: "Фокус на Сообществе", description: "Построение связей, выходящих за пределы поля" }
      ]
    }
  },
  fr: {
    hero: {
      title: "Football Pour Tous",
      subtitle: "Inclusif. Accessible. Inspirant.",
      description: "Chez Global Sports FC, nous croyons que le football appartient à tous. Notre initiative 'Pour Tous' brise les barrières et crée des opportunités."
    },
    programs: {
      title: "Nos Programmes Inclusifs",
      items: [
        {
          icon: "♿",
          title: "Football Adapté",
          description: "Programmes spécialisés pour joueurs avec handicaps physiques.",
          features: ["Football en fauteuil", "Programmes amputés", "Sessions malvoyants"]
        },
        {
          icon: "🧠",
          title: "Programme Capacités Spéciales",
          description: "Entraînements adaptés pour joueurs avec troubles d'apprentissage.",
          features: ["Environnement sensoriel adapté", "Petits groupes", "Coachs patients"]
        },
        {
          icon: "👵",
          title: "Football Marchant",
          description: "Version plus lente du jeu pour seniors et personnes en récupération.",
          features: ["Sans course", "Faible impact", "Communauté sociale"]
        },
        {
          icon: "👩",
          title: "Développement Féminin",
          description: "Programmes dédiés aux femmes et filles dans le football.",
          features: ["Coaching féminin", "Horaires flexibles", "Bourses disponibles"]
        },
        {
          icon: "🌍",
          title: "Intégration des Réfugiés",
          description: "Le football comme outil d'intégration.",
          features: ["Support linguistique", "Sensibilisation culturelle", "Construction communautaire"]
        },
        {
          icon: "💰",
          title: "Accessibilité Financière",
          description: "Personne ne devrait manquer le football à cause du coût.",
          features: ["Prêt d'équipement gratuit", "Tarifs dégressifs", "Bourses complètes"]
        }
      ]
    },
    impact: {
      title: "Notre Impact",
      stats: [
        { number: "500+", label: "Participants aux programmes inclusifs" },
        { number: "12", label: "Organisations partenaires" },
        { number: "95%", label: "Taux de satisfaction" },
        { number: "50+", label: "Coachs inclusifs certifiés" }
      ]
    },
    testimonials: {
      title: "Histoires d'Inclusion",
      items: [
        {
          quote: "Le programme adapté de GSFC a donné à mon fils la chance de jouer au football.",
          author: "Maria K.",
          role: "Parent"
        },
        {
          quote: "Le football marchant a transformé ma retraite.",
          author: "James O.",
          role: "Joueur de football marchant"
        },
        {
          quote: "En tant que réfugié, le football à GSFC m'a aidé à me sentir chez moi.",
          author: "Ahmed S.",
          role: "Participant au programme"
        }
      ]
    },
    volunteer: {
      title: "Impliquez-vous",
      description: "Que vous souhaitiez faire du bénévolat, donner ou participer, il y a une place pour vous.",
      buttons: {
        volunteer: "Devenir Bénévole",
        donate: "Soutenir Nos Programmes",
        participate: "Rejoindre un Programme"
      }
    },
    values: {
      title: "Notre Engagement",
      items: [
        { title: "Zéro Discrimination", description: "Nous accueillons tous sans distinction" },
        { title: "Espaces Sécurisés", description: "Sessions supervisées par du personnel formé" },
        { title: "Soutien Professionnel", description: "Coachs qualifiés en sports inclusifs" },
        { title: "Focus Communauté", description: "Construire des liens au-delà du terrain" }
      ]
    }
  },
  es: {
    hero: {
      title: "Fútbol Para Todos",
      subtitle: "Inclusivo. Accesible. Empoderador.",
      description: "En Global Sports FC, creemos que el fútbol pertenece a todos. Nuestra iniciativa 'Para Todos' elimina barreras y crea oportunidades."
    },
    programs: {
      title: "Nuestros Programas Inclusivos",
      items: [
        {
          icon: "♿",
          title: "Fútbol Adaptado",
          description: "Programas especializados para jugadores con discapacidades físicas.",
          features: ["Fútbol en silla de ruedas", "Programas para amputados", "Sesiones para discapacitados visuales"]
        },
        {
          icon: "🧠",
          title: "Programa de Habilidades Especiales",
          description: "Entrenamientos adaptados para jugadores con discapacidades de aprendizaje.",
          features: ["Ambiente sensorial adaptado", "Grupos pequeños", "Entrenadores pacientes"]
        },
        {
          icon: "👵",
          title: "Fútbol Caminando",
          description: "Versión más lenta del juego para mayores y personas en recuperación.",
          features: ["Sin correr", "Bajo impacto", "Comunidad social"]
        },
        {
          icon: "👩",
          title: "Desarrollo Femenino",
          description: "Programas dedicados a mujeres y niñas en el fútbol.",
          features: ["Entrenadoras mujeres", "Horarios flexibles", "Becas disponibles"]
        },
        {
          icon: "🌍",
          title: "Integración de Refugiados",
          description: "El fútbol como herramienta de integración.",
          features: ["Apoyo lingüístico", "Sensibilización cultural", "Construcción comunitaria"]
        },
        {
          icon: "💰",
          title: "Accesibilidad Financiera",
          description: "Nadie debería perderse el fútbol por costo.",
          features: ["Préstamo de equipo gratis", "Tarifas escalonadas", "Becas completas"]
        }
      ]
    },
    impact: {
      title: "Nuestro Impacto",
      stats: [
        { number: "500+", label: "Participantes en programas inclusivos" },
        { number: "12", label: "Organizaciones socias" },
        { number: "95%", label: "Tasa de satisfacción" },
        { number: "50+", label: "Entrenadores inclusivos certificados" }
      ]
    },
    testimonials: {
      title: "Historias de Inclusión",
      items: [
        {
          quote: "El programa adaptado de GSFC le dio a mi hijo la oportunidad de jugar fútbol.",
          author: "Maria K.",
          role: "Madre"
        },
        {
          quote: "El fútbol caminando transformó mi jubilación.",
          author: "James O.",
          role: "Jugador de fútbol caminando"
        },
        {
          quote: "Como refugiado, el fútbol en GSFC me ayudó a sentir que pertenecía.",
          author: "Ahmed S.",
          role: "Participante del programa"
        }
      ]
    },
    volunteer: {
      title: "Involúcrate",
      description: "Ya sea que quieras ser voluntario, donar o participar, hay un lugar para ti.",
      buttons: {
        volunteer: "Ser Voluntario",
        donate: "Apoyar Programas",
        participate: "Unirse a un Programa"
      }
    },
    values: {
      title: "Nuestro Compromiso",
      items: [
        { title: "Cero Discriminación", description: "Damos la bienvenida a todos sin importar sus circunstancias" },
        { title: "Espacios Seguros", description: "Sesiones supervisadas por personal capacitado" },
        { title: "Apoyo Profesional", description: "Entrenadores calificados en deportes inclusivos" },
        { title: "Enfoque Comunitario", description: "Construyendo conexiones más allá del campo" }
      ]
    }
  }
};

export default function ForAllPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".program-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Community Initiative</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.hero.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 mb-4 font-light">
              {content.hero.subtitle}
            </p>
            
            <p className="text-lg text-green-100/80 max-w-3xl mx-auto leading-relaxed">
              {content.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {content.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.programs.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {content.programs.items.map((program, index) => (
              <motion.div
                key={index}
                className="program-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{content.impact.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {content.impact.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {content.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl text-green-500 mb-4">"</div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.volunteer.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {content.volunteer.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {content.volunteer.buttons.volunteer}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {content.volunteer.buttons.donate}
              </Link>
              <Link
                href="/kidscamp"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-green-500 transform hover:scale-105 transition-all duration-300"
              >
                {content.volunteer.buttons.participate}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
