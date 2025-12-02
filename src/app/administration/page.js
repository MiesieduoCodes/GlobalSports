"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";

const translations = {
  en: {
    title: "Club Administration",
    subtitle: "Leadership & Governance",
    description: "Meet the dedicated team behind Global Sports FC. Our administration ensures the club operates with excellence, integrity, and a commitment to our community.",
    board: {
      title: "Board of Directors",
      members: [
        {
          name: "Veria Lawrence Ebiks",
          role: "Club Director & Founder",
          image: "/images/team/director.jpg",
          bio: "Former professional footballer who founded GSFC in 2018 with a vision to develop world-class talent.",
          linkedin: "#"
        },
        {
          name: "Dr. Sarah Mitchell",
          role: "Chairperson",
          image: "/images/team/chair.jpg",
          bio: "Sports management expert with 20+ years of experience in football administration.",
          linkedin: "#"
        },
        {
          name: "James Okonkwo",
          role: "Finance Director",
          image: "/images/team/finance.jpg",
          bio: "Certified accountant specializing in sports organizations financial management.",
          linkedin: "#"
        },
        {
          name: "Elena Rodriguez",
          role: "Operations Director",
          image: "/images/team/operations.jpg",
          bio: "Former sports event coordinator with expertise in club operations and logistics.",
          linkedin: "#"
        }
      ]
    },
    management: {
      title: "Management Team",
      members: [
        { name: "Michael Chen", role: "Academy Director", department: "Youth Development" },
        { name: "Grace Adeyemi", role: "Marketing Manager", department: "Communications" },
        { name: "Dmitri Volkov", role: "Facilities Manager", department: "Operations" },
        { name: "Isabella Santos", role: "Community Manager", department: "Outreach" },
        { name: "Robert Johnson", role: "HR Manager", department: "Human Resources" },
        { name: "Fatima Al-Hassan", role: "Sponsorship Manager", department: "Commercial" }
      ]
    },
    values: {
      title: "Our Governance Principles",
      items: [
        { icon: "⚖️", title: "Transparency", description: "Open and honest communication in all our dealings" },
        { icon: "🎯", title: "Accountability", description: "Taking responsibility for our decisions and actions" },
        { icon: "🤝", title: "Integrity", description: "Upholding the highest ethical standards" },
        { icon: "🌍", title: "Inclusivity", description: "Welcoming diverse perspectives and voices" }
      ]
    },
    contact: {
      title: "Contact Administration",
      description: "Have questions about our club governance or want to get involved? Reach out to our administration team.",
      button: "Contact Us"
    }
  },
  ru: {
    title: "Администрация Клуба",
    subtitle: "Руководство и Управление",
    description: "Познакомьтесь с преданной командой Global Sports FC. Наша администрация обеспечивает работу клуба с превосходством и честностью.",
    board: {
      title: "Совет Директоров",
      members: [
        {
          name: "Вериа Лоуренс Эбикс",
          role: "Директор и Основатель Клуба",
          image: "/images/team/director.jpg",
          bio: "Бывший профессиональный футболист, основавший GSFC в 2018 году.",
          linkedin: "#"
        },
        {
          name: "Др. Сара Митчелл",
          role: "Председатель",
          image: "/images/team/chair.jpg",
          bio: "Эксперт по спортивному менеджменту с 20-летним опытом.",
          linkedin: "#"
        },
        {
          name: "Джеймс Оконкво",
          role: "Финансовый Директор",
          image: "/images/team/finance.jpg",
          bio: "Сертифицированный бухгалтер, специализирующийся на спортивных организациях.",
          linkedin: "#"
        },
        {
          name: "Елена Родригес",
          role: "Операционный Директор",
          image: "/images/team/operations.jpg",
          bio: "Бывший координатор спортивных мероприятий.",
          linkedin: "#"
        }
      ]
    },
    management: {
      title: "Команда Управления",
      members: [
        { name: "Михаил Чен", role: "Директор Академии", department: "Развитие Молодежи" },
        { name: "Грейс Адейеми", role: "Менеджер по Маркетингу", department: "Коммуникации" },
        { name: "Дмитрий Волков", role: "Менеджер Объектов", department: "Операции" },
        { name: "Изабелла Сантос", role: "Менеджер Сообщества", department: "Работа с Сообществом" },
        { name: "Роберт Джонсон", role: "HR Менеджер", department: "Кадры" },
        { name: "Фатима Аль-Хассан", role: "Менеджер по Спонсорству", department: "Коммерческий" }
      ]
    },
    values: {
      title: "Принципы Управления",
      items: [
        { icon: "⚖️", title: "Прозрачность", description: "Открытое и честное общение во всех делах" },
        { icon: "🎯", title: "Ответственность", description: "Принятие ответственности за решения" },
        { icon: "🤝", title: "Честность", description: "Соблюдение высших этических стандартов" },
        { icon: "🌍", title: "Инклюзивность", description: "Приветствие разнообразных взглядов" }
      ]
    },
    contact: {
      title: "Связаться с Администрацией",
      description: "Есть вопросы об управлении клубом? Свяжитесь с нашей командой.",
      button: "Связаться"
    }
  },
  fr: {
    title: "Administration du Club",
    subtitle: "Leadership et Gouvernance",
    description: "Rencontrez l'équipe dévouée derrière Global Sports FC.",
    board: {
      title: "Conseil d'Administration",
      members: [
        {
          name: "Veria Lawrence Ebiks",
          role: "Directeur du Club & Fondateur",
          image: "/images/team/director.jpg",
          bio: "Ancien footballeur professionnel ayant fondé GSFC en 2018.",
          linkedin: "#"
        },
        {
          name: "Dr. Sarah Mitchell",
          role: "Présidente",
          image: "/images/team/chair.jpg",
          bio: "Experte en gestion sportive avec 20+ ans d'expérience.",
          linkedin: "#"
        },
        {
          name: "James Okonkwo",
          role: "Directeur Financier",
          image: "/images/team/finance.jpg",
          bio: "Comptable certifié spécialisé dans les organisations sportives.",
          linkedin: "#"
        },
        {
          name: "Elena Rodriguez",
          role: "Directrice des Opérations",
          image: "/images/team/operations.jpg",
          bio: "Ancienne coordinatrice d'événements sportifs.",
          linkedin: "#"
        }
      ]
    },
    management: {
      title: "Équipe de Direction",
      members: [
        { name: "Michael Chen", role: "Directeur de l'Académie", department: "Développement Jeunesse" },
        { name: "Grace Adeyemi", role: "Responsable Marketing", department: "Communications" },
        { name: "Dmitri Volkov", role: "Responsable des Installations", department: "Opérations" },
        { name: "Isabella Santos", role: "Responsable Communauté", department: "Sensibilisation" },
        { name: "Robert Johnson", role: "Responsable RH", department: "Ressources Humaines" },
        { name: "Fatima Al-Hassan", role: "Responsable Sponsoring", department: "Commercial" }
      ]
    },
    values: {
      title: "Nos Principes de Gouvernance",
      items: [
        { icon: "⚖️", title: "Transparence", description: "Communication ouverte et honnête" },
        { icon: "🎯", title: "Responsabilité", description: "Assumer nos décisions" },
        { icon: "🤝", title: "Intégrité", description: "Maintenir les normes éthiques les plus élevées" },
        { icon: "🌍", title: "Inclusivité", description: "Accueillir diverses perspectives" }
      ]
    },
    contact: {
      title: "Contacter l'Administration",
      description: "Des questions sur la gouvernance du club? Contactez notre équipe.",
      button: "Nous Contacter"
    }
  },
  es: {
    title: "Administración del Club",
    subtitle: "Liderazgo y Gobernanza",
    description: "Conozca al equipo dedicado detrás de Global Sports FC.",
    board: {
      title: "Junta Directiva",
      members: [
        {
          name: "Veria Lawrence Ebiks",
          role: "Director del Club y Fundador",
          image: "/images/team/director.jpg",
          bio: "Ex futbolista profesional que fundó GSFC en 2018.",
          linkedin: "#"
        },
        {
          name: "Dra. Sarah Mitchell",
          role: "Presidenta",
          image: "/images/team/chair.jpg",
          bio: "Experta en gestión deportiva con 20+ años de experiencia.",
          linkedin: "#"
        },
        {
          name: "James Okonkwo",
          role: "Director Financiero",
          image: "/images/team/finance.jpg",
          bio: "Contador certificado especializado en organizaciones deportivas.",
          linkedin: "#"
        },
        {
          name: "Elena Rodriguez",
          role: "Directora de Operaciones",
          image: "/images/team/operations.jpg",
          bio: "Ex coordinadora de eventos deportivos.",
          linkedin: "#"
        }
      ]
    },
    management: {
      title: "Equipo de Gestión",
      members: [
        { name: "Michael Chen", role: "Director de Academia", department: "Desarrollo Juvenil" },
        { name: "Grace Adeyemi", role: "Gerente de Marketing", department: "Comunicaciones" },
        { name: "Dmitri Volkov", role: "Gerente de Instalaciones", department: "Operaciones" },
        { name: "Isabella Santos", role: "Gerente Comunitario", department: "Alcance" },
        { name: "Robert Johnson", role: "Gerente de RRHH", department: "Recursos Humanos" },
        { name: "Fatima Al-Hassan", role: "Gerente de Patrocinio", department: "Comercial" }
      ]
    },
    values: {
      title: "Nuestros Principios de Gobernanza",
      items: [
        { icon: "⚖️", title: "Transparencia", description: "Comunicación abierta y honesta" },
        { icon: "🎯", title: "Responsabilidad", description: "Asumir nuestras decisiones" },
        { icon: "🤝", title: "Integridad", description: "Mantener los más altos estándares éticos" },
        { icon: "🌍", title: "Inclusividad", description: "Acoger diversas perspectivas" }
      ]
    },
    contact: {
      title: "Contactar Administración",
      description: "¿Preguntas sobre la gobernanza del club? Contacte a nuestro equipo.",
      button: "Contáctenos"
    }
  }
};

export default function AdministrationPage() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
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
              <span className="text-sm font-medium">{content.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Governance Principles */}
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
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.board.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {content.board.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
                  <div className="w-24 h-24 bg-slate-400 dark:bg-slate-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.management.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.management.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.department}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.contact.title}
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              {content.contact.description}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {content.contact.button}
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
