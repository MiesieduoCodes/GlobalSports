"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    title: "Our Partners & Sponsors",
    subtitle: "Building Success Together",
    description: "Global Sports FC is proud to partner with leading organizations that share our vision of excellence in football. Together, we're shaping the future of the beautiful game.",
    heroText: "Join Our Partnership Network",
    heroDescription: "Partner with Global Sports FC and connect your brand with passionate football fans worldwide.",
    tiers: {
      title: "Partnership Tiers",
      platinum: {
        name: "Platinum Partners",
        description: "Our flagship partners with comprehensive branding and engagement opportunities."
      },
      gold: {
        name: "Gold Partners",
        description: "Strategic partners supporting our growth and development initiatives."
      },
      silver: {
        name: "Silver Partners",
        description: "Valued supporters contributing to our community programs."
      }
    },
    benefits: {
      title: "Partnership Benefits",
      items: [
        { icon: "🎯", title: "Brand Exposure", description: "Prominent visibility across all club channels and events" },
        { icon: "🤝", title: "Exclusive Access", description: "VIP experiences and behind-the-scenes opportunities" },
        { icon: "📈", title: "Marketing Rights", description: "Use of club assets and co-branding opportunities" },
        { icon: "🌍", title: "Global Reach", description: "Connect with our international fan base" },
        { icon: "⚽", title: "Matchday Presence", description: "Stadium branding and hospitality packages" },
        { icon: "🎓", title: "Academy Support", description: "Direct involvement in youth development programs" }
      ]
    },
    cta: {
      title: "Become a Partner",
      description: "Interested in partnering with Global Sports FC? Get in touch with our partnerships team to explore opportunities.",
      button: "Contact Us"
    },
    partners: [
      { name: "SportTech Solutions", tier: "platinum", logo: "/images/partners/partner1.png" },
      { name: "Global Athletics", tier: "platinum", logo: "/images/partners/partner2.png" },
      { name: "Elite Performance", tier: "gold", logo: "/images/partners/partner3.png" },
      { name: "FitGear Pro", tier: "gold", logo: "/images/partners/partner4.png" },
      { name: "Health First", tier: "silver", logo: "/images/partners/partner5.png" },
      { name: "Sports Media Hub", tier: "silver", logo: "/images/partners/partner6.png" }
    ]
  },
  ru: {
    title: "Наши Партнеры и Спонсоры",
    subtitle: "Строим Успех Вместе",
    description: "Global Sports FC гордится партнерством с ведущими организациями, разделяющими наше видение превосходства в футболе. Вместе мы формируем будущее прекрасной игры.",
    heroText: "Присоединяйтесь к Нашей Партнерской Сети",
    heroDescription: "Станьте партнером Global Sports FC и свяжите свой бренд со страстными футбольными болельщиками по всему миру.",
    tiers: {
      title: "Уровни Партнерства",
      platinum: {
        name: "Платиновые Партнеры",
        description: "Наши флагманские партнеры с комплексными возможностями брендинга."
      },
      gold: {
        name: "Золотые Партнеры",
        description: "Стратегические партнеры, поддерживающие наш рост и развитие."
      },
      silver: {
        name: "Серебряные Партнеры",
        description: "Ценные сторонники, вносящие вклад в наши общественные программы."
      }
    },
    benefits: {
      title: "Преимущества Партнерства",
      items: [
        { icon: "🎯", title: "Узнаваемость Бренда", description: "Видимость на всех каналах клуба и мероприятиях" },
        { icon: "🤝", title: "Эксклюзивный Доступ", description: "VIP-опыт и возможности за кулисами" },
        { icon: "📈", title: "Маркетинговые Права", description: "Использование активов клуба и совместный брендинг" },
        { icon: "🌍", title: "Глобальный Охват", description: "Связь с нашей международной базой болельщиков" },
        { icon: "⚽", title: "Присутствие на Матчах", description: "Брендинг на стадионе и пакеты гостеприимства" },
        { icon: "🎓", title: "Поддержка Академии", description: "Участие в программах развития молодежи" }
      ]
    },
    cta: {
      title: "Стать Партнером",
      description: "Заинтересованы в партнерстве с Global Sports FC? Свяжитесь с нашей командой партнерств.",
      button: "Связаться с Нами"
    },
    partners: [
      { name: "SportTech Solutions", tier: "platinum", logo: "/images/partners/partner1.png" },
      { name: "Global Athletics", tier: "platinum", logo: "/images/partners/partner2.png" },
      { name: "Elite Performance", tier: "gold", logo: "/images/partners/partner3.png" },
      { name: "FitGear Pro", tier: "gold", logo: "/images/partners/partner4.png" },
      { name: "Health First", tier: "silver", logo: "/images/partners/partner5.png" },
      { name: "Sports Media Hub", tier: "silver", logo: "/images/partners/partner6.png" }
    ]
  },
  fr: {
    title: "Nos Partenaires et Sponsors",
    subtitle: "Construire le Succès Ensemble",
    description: "Global Sports FC est fier de s'associer à des organisations leaders qui partagent notre vision d'excellence dans le football. Ensemble, nous façonnons l'avenir du beau jeu.",
    heroText: "Rejoignez Notre Réseau de Partenaires",
    heroDescription: "Associez-vous à Global Sports FC et connectez votre marque avec des fans de football passionnés du monde entier.",
    tiers: {
      title: "Niveaux de Partenariat",
      platinum: {
        name: "Partenaires Platine",
        description: "Nos partenaires phares avec des opportunités complètes de branding."
      },
      gold: {
        name: "Partenaires Or",
        description: "Partenaires stratégiques soutenant notre croissance et développement."
      },
      silver: {
        name: "Partenaires Argent",
        description: "Supporters précieux contribuant à nos programmes communautaires."
      }
    },
    benefits: {
      title: "Avantages du Partenariat",
      items: [
        { icon: "🎯", title: "Exposition de Marque", description: "Visibilité sur tous les canaux du club" },
        { icon: "🤝", title: "Accès Exclusif", description: "Expériences VIP et opportunités en coulisses" },
        { icon: "📈", title: "Droits Marketing", description: "Utilisation des actifs du club et co-branding" },
        { icon: "🌍", title: "Portée Mondiale", description: "Connexion avec notre base de fans internationale" },
        { icon: "⚽", title: "Présence Jour de Match", description: "Branding au stade et forfaits hospitalité" },
        { icon: "🎓", title: "Soutien à l'Académie", description: "Implication dans les programmes de développement" }
      ]
    },
    cta: {
      title: "Devenir Partenaire",
      description: "Intéressé par un partenariat avec Global Sports FC? Contactez notre équipe partenariats.",
      button: "Nous Contacter"
    },
    partners: [
      { name: "SportTech Solutions", tier: "platinum", logo: "/images/partners/partner1.png" },
      { name: "Global Athletics", tier: "platinum", logo: "/images/partners/partner2.png" },
      { name: "Elite Performance", tier: "gold", logo: "/images/partners/partner3.png" },
      { name: "FitGear Pro", tier: "gold", logo: "/images/partners/partner4.png" },
      { name: "Health First", tier: "silver", logo: "/images/partners/partner5.png" },
      { name: "Sports Media Hub", tier: "silver", logo: "/images/partners/partner6.png" }
    ]
  },
  es: {
    title: "Nuestros Socios y Patrocinadores",
    subtitle: "Construyendo Éxito Juntos",
    description: "Global Sports FC se enorgullece de asociarse con organizaciones líderes que comparten nuestra visión de excelencia en el fútbol. Juntos, estamos dando forma al futuro del hermoso juego.",
    heroText: "Únete a Nuestra Red de Socios",
    heroDescription: "Asóciate con Global Sports FC y conecta tu marca con apasionados fanáticos del fútbol en todo el mundo.",
    tiers: {
      title: "Niveles de Asociación",
      platinum: {
        name: "Socios Platino",
        description: "Nuestros socios insignia con oportunidades completas de marca."
      },
      gold: {
        name: "Socios Oro",
        description: "Socios estratégicos que apoyan nuestro crecimiento y desarrollo."
      },
      silver: {
        name: "Socios Plata",
        description: "Valiosos partidarios que contribuyen a nuestros programas comunitarios."
      }
    },
    benefits: {
      title: "Beneficios de la Asociación",
      items: [
        { icon: "🎯", title: "Exposición de Marca", description: "Visibilidad en todos los canales del club" },
        { icon: "🤝", title: "Acceso Exclusivo", description: "Experiencias VIP y oportunidades entre bastidores" },
        { icon: "📈", title: "Derechos de Marketing", description: "Uso de activos del club y co-branding" },
        { icon: "🌍", title: "Alcance Global", description: "Conexión con nuestra base de fans internacional" },
        { icon: "⚽", title: "Presencia en Partidos", description: "Branding en estadio y paquetes de hospitalidad" },
        { icon: "🎓", title: "Apoyo a la Academia", description: "Participación en programas de desarrollo juvenil" }
      ]
    },
    cta: {
      title: "Conviértete en Socio",
      description: "¿Interesado en asociarte con Global Sports FC? Contacta a nuestro equipo de asociaciones.",
      button: "Contáctanos"
    },
    partners: [
      { name: "SportTech Solutions", tier: "platinum", logo: "/images/partners/partner1.png" },
      { name: "Global Athletics", tier: "platinum", logo: "/images/partners/partner2.png" },
      { name: "Elite Performance", tier: "gold", logo: "/images/partners/partner3.png" },
      { name: "FitGear Pro", tier: "gold", logo: "/images/partners/partner4.png" },
      { name: "Health First", tier: "silver", logo: "/images/partners/partner5.png" },
      { name: "Sports Media Hub", tier: "silver", logo: "/images/partners/partner6.png" }
    ]
  }
};

const getTierColor = (tier) => {
  switch (tier) {
    case "platinum": return "from-gray-300 to-gray-100 border-gray-400";
    case "gold": return "from-yellow-300 to-yellow-100 border-yellow-500";
    case "silver": return "from-gray-200 to-white border-gray-300";
    default: return "from-gray-100 to-white border-gray-200";
  }
};

const getTierBadgeColor = (tier) => {
  switch (tier) {
    case "platinum": return "bg-gradient-to-r from-gray-700 to-gray-500 text-white";
    case "gold": return "bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900";
    case "silver": return "bg-gradient-to-r from-gray-400 to-gray-300 text-gray-800";
    default: return "bg-gray-200 text-gray-700";
  }
};

export default function PartnersPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".partner-card",
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
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium">{content.heroText}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              {content.subtitle}
            </p>
            
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.tiers.title}
            </h2>
          </motion.div>

          {/* Platinum Partners */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className={`inline-block px-6 py-2 rounded-full font-bold ${getTierBadgeColor("platinum")}`}>
                {content.tiers.platinum.name}
              </span>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{content.tiers.platinum.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.partners.filter(p => p.tier === "platinum").map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={`partner-card bg-gradient-to-br ${getTierColor("platinum")} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:-translate-y-1`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center h-24 mb-4">
                    <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-inner">
                      <span className="text-2xl font-bold text-gray-700">{partner.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800">{partner.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gold Partners */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className={`inline-block px-6 py-2 rounded-full font-bold ${getTierBadgeColor("gold")}`}>
                {content.tiers.gold.name}
              </span>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{content.tiers.gold.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {content.partners.filter(p => p.tier === "gold").map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={`partner-card bg-gradient-to-br ${getTierColor("gold")} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:-translate-y-1`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center h-20 mb-4">
                    <div className="w-24 h-16 bg-white rounded-lg flex items-center justify-center shadow-inner">
                      <span className="text-xl font-bold text-gray-700">{partner.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center text-gray-800">{partner.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Silver Partners */}
          <div>
            <div className="text-center mb-8">
              <span className={`inline-block px-6 py-2 rounded-full font-bold ${getTierBadgeColor("silver")}`}>
                {content.tiers.silver.name}
              </span>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{content.tiers.silver.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {content.partners.filter(p => p.tier === "silver").map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={`partner-card bg-gradient-to-br ${getTierColor("silver")} rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 border hover:-translate-y-1`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center h-16 mb-3">
                    <div className="w-16 h-12 bg-white rounded flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">{partner.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-center text-gray-700">{partner.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.benefits.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              {content.cta.description}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {content.cta.button}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
