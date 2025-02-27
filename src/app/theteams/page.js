"use client";

import { useContext } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

// Translation data
const translations = {
    en: {
      title: "Meet the Team",
      description: "These are the brilliant minds behind Global Sports FC's success.",
      teamMembers: [
        {
          name: "Marvin McKinney",
          role: "Head Coach",
          image: "https://pagedone.io/asset/uploads/1698649968.png",
        },
        {
          name: "Kathryn Murphy",
          role: "Assistant Coach",
          image: "https://pagedone.io/asset/uploads/1698650000.png",
        },
        {
          name: "Jerome Bell",
          role: "Fitness Trainer",
          image: "https://pagedone.io/asset/uploads/1698659360.png",
        },
        {
          name: "Wade Warren",
          role: "Tactical Analyst",
          image: "https://pagedone.io/asset/uploads/1698650109.png",
        },
        {
          name: "Leslie Alexander",
          role: "Goalkeeping Coach",
          image: "https://pagedone.io/asset/uploads/1698650146.png",
        },
        {
          name: "Guy Hawkins",
          role: "Youth Academy Manager",
          image: "https://pagedone.io/asset/uploads/1698650184.png",
        },
        {
          name: "Ronald Richards",
          role: "Scouting Director",
          image: "https://pagedone.io/asset/uploads/1698650213.png",
        },
        {
          name: "Devon Lane",
          role: "Sports Psychologist",
          image: "https://pagedone.io/asset/uploads/1698650242.png",
        },
        {
          name: "Dianne Russell",
          role: "Nutritionist",
          image: "https://pagedone.io/asset/uploads/1698650271.png",
        },
      ],
    },
    es: {
      title: "Conoce al Equipo",
      description: "Estas son las mentes brillantes detrás del éxito de Global Sports FC.",
      teamMembers: [
        {
          name: "Marvin McKinney",
          role: "Entrenador Principal",
          image: "https://pagedone.io/asset/uploads/1698649968.png",
        },
        {
          name: "Kathryn Murphy",
          role: "Entrenador Asistente",
          image: "https://pagedone.io/asset/uploads/1698650000.png",
        },
        {
          name: "Jerome Bell",
          role: "Entrenador de Fitness",
          image: "https://pagedone.io/asset/uploads/1698659360.png",
        },
        {
          name: "Wade Warren",
          role: "Analista Táctico",
          image: "https://pagedone.io/asset/uploads/1698650109.png",
        },
        {
          name: "Leslie Alexander",
          role: "Entrenador de Porteros",
          image: "https://pagedone.io/asset/uploads/1698650146.png",
        },
        {
          name: "Guy Hawkins",
          role: "Gerente de la Academia Juvenil",
          image: "https://pagedone.io/asset/uploads/1698650184.png",
        },
        {
          name: "Ronald Richards",
          role: "Director de Scouting",
          image: "https://pagedone.io/asset/uploads/1698650213.png",
        },
        {
          name: "Devon Lane",
          role: "Psicólogo Deportivo",
          image: "https://pagedone.io/asset/uploads/1698650242.png",
        },
        {
          name: "Dianne Russell",
          role: "Nutricionista",
          image: "https://pagedone.io/asset/uploads/1698650271.png",
        },
      ],
    },
    ru: {
      title: "Познакомьтесь с Командой",
      description: "Это блестящие умы, стоящие за успехом Global Sports FC.",
      teamMembers: [
        {
          name: "Марвин Макинни",
          role: "Главный тренер",
          image: "https://pagedone.io/asset/uploads/1698649968.png",
        },
        {
          name: "Кэтрин Мерфи",
          role: "Ассистент тренера",
          image: "https://pagedone.io/asset/uploads/1698650000.png",
        },
        {
          name: "Жером Белл",
          role: "Тренер по фитнесу",
          image: "https://pagedone.io/asset/uploads/1698659360.png",
        },
        {
          name: "Уэйд Уоррен",
          role: "Тактический аналитик",
          image: "https://pagedone.io/asset/uploads/1698650109.png",
        },
        {
          name: "Лесли Александер",
          role: "Тренер вратарей",
          image: "https://pagedone.io/asset/uploads/1698650146.png",
        },
        {
          name: "Гай Хокинс",
          role: "Менеджер молодежной академии",
          image: "https://pagedone.io/asset/uploads/1698650184.png",
        },
        {
          name: "Рональд Ричардс",
          role: "Директор по скаутингу",
          image: "https://pagedone.io/asset/uploads/1698650213.png",
        },
        {
          name: "Девон Лейн",
          role: "Спортивный психолог",
          image: "https://pagedone.io/asset/uploads/1698650242.png",
        },
        {
          name: "Дианна Рассел",
          role: "Диетолог",
          image: "https://pagedone.io/asset/uploads/1698650271.png",
        },
      ],
    },
    fr: {
      title: "Rencontrez l'Équipe",
      description: "Voici les esprits brillants derrière le succès de Global Sports FC.",
      teamMembers: [
        {
          name: "Marvin McKinney",
          role: "Entraîneur Principal",
          image: "https://pagedone.io/asset/uploads/1698649968.png",
        },
        {
          name: "Kathryn Murphy",
          role: "Entraîneur Adjoint",
          image: "https://pagedone.io/asset/uploads/1698650000.png",
        },
        {
          name: "Jerome Bell",
          role: "Entraîneur de Fitness",
          image: "https://pagedone.io/asset/uploads/1698659360.png",
        },
        {
          name: "Wade Warren",
          role: "Analyste Tactique",
          image: "https://pagedone.io/asset/uploads/1698650109.png",
        },
        {
          name: "Leslie Alexander",
          role: "Entraîneur des Gardiens",
          image: "https://pagedone.io/asset/uploads/1698650146.png",
        },
        {
          name: "Guy Hawkins",
          role: "Responsable de l'Académie de Jeunes",
          image: "https://pagedone.io/asset/uploads/1698650184.png",
        },
        {
          name: "Ronald Richards",
          role: "Directeur de Scouting",
          image: "https://pagedone.io/asset/uploads/1698650213.png",
        },
        {
          name: "Devon Lane",
          role: "Psychologue du Sport",
          image: "https://pagedone.io/asset/uploads/1698650242.png",
        },
        {
          name: "Dianne Russell",
          role: "Nutritionniste",
          image: "https://pagedone.io/asset/uploads/1698650271.png",
        },
      ],
    },
  };

export default function TeamSection() {
    const { language } = useLanguage(); // Get the current language from context

    const { title, description, teamMembers } = translations[language] || translations.en; // Default to English if language not found
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="mb-12">
          <h2 className="text-5xl text-center font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
            {description}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group block text-center"
            >
              <div className="relative mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"
                />
              </div>
              <h4 className="text-xl text-gray-900 dark:text-white font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                {member.name}
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}