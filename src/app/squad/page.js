"use client";

import { useState,useContext  } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

// Translation data
const translations = {
  en: {
    title: "Meet the Players",
    description: "These are the stars of Global Sports FC.",
    players: [
      {
        name: "Lionel Messi",
        number: 10,
        position: "Forward",
        image: "https://pagedone.io/asset/uploads/1698649968.png",
      },
      {
        name: "Cristiano Ronaldo",
        number: 7,
        position: "Forward",
        image: "https://pagedone.io/asset/uploads/1698650000.png",
      },
      {
        name: "Neymar Jr",
        number: 11,
        position: "Forward",
        image: "https://pagedone.io/asset/uploads/1698659360.png",
      },
      {
        name: "Kevin De Bruyne",
        number: 17,
        position: "Midfielder",
        image: "https://pagedone.io/asset/uploads/1698650109.png",
      },
      {
        name: "Virgil van Dijk",
        number: 4,
        position: "Defender",
        image: "https://pagedone.io/asset/uploads/1698650146.png",
      },
      {
        name: "Manuel Neuer",
        number: 1,
        position: "Goalkeeper",
        image: "https://pagedone.io/asset/uploads/1698650184.png",
      },
      {
        name: "Kylian Mbappé",
        number: 7,
        position: "Forward",
        image: "https://pagedone.io/asset/uploads/1698650213.png",
      },
      {
        name: "Sergio Ramos",
        number: 4,
        position: "Defender",
        image: "https://pagedone.io/asset/uploads/1698650242.png",
      },
      {
        name: "Luka Modrić",
        number: 10,
        position: "Midfielder",
        image: "https://pagedone.io/asset/uploads/1698650271.png",
      },
    ],
  },
  es: {
    title: "Conoce a los Jugadores",
    description: "Estas son las estrellas de Global Sports FC.",
    players: [
      {
        name: "Lionel Messi",
        number: 10,
        position: "Delantero",
        image: "https://pagedone.io/asset/uploads/1698649968.png",
      },
      {
        name: "Cristiano Ronaldo",
        number: 7,
        position: "Delantero",
        image: "https://pagedone.io/asset/uploads/1698650000.png",
      },
      {
        name: "Neymar Jr",
        number: 11,
        position: "Delantero",
        image: "https://pagedone.io/asset/uploads/1698659360.png",
      },
      {
        name: "Kevin De Bruyne",
        number: 17,
        position: "Centrocampista",
        image: "https://pagedone.io/asset/uploads/1698650109.png",
      },
      {
        name: "Virgil van Dijk",
        number: 4,
        position: "Defensor",
        image: "https://pagedone.io/asset/uploads/1698650146.png",
      },
      {
        name: "Manuel Neuer",
        number: 1,
        position: "Portero",
        image: "https://pagedone.io/asset/uploads/1698650184.png",
      },
      {
        name: "Kylian Mbappé",
        number: 7,
        position: "Delantero",
        image: "https://pagedone.io/asset/uploads/1698650213.png",
      },
      {
        name: "Sergio Ramos",
        number: 4,
        position: "Defensor",
        image: "https://pagedone.io/asset/uploads/1698650242.png",
      },
      {
        name: "Luka Modrić",
        number: 10,
        position: "Centrocampista",
        image: "https://pagedone.io/asset/uploads/1698650271.png",
      },
    ],
  },
  ru: {
    title: "Познакомьтесь с игроками",
    description: "Это звезды Global Sports FC.",
    players: [
      {
        name: "Лионель Месси",
        number: 10,
        position: "Нападающий",
        image: "https://pagedone.io/asset/uploads/1698649968.png",
      },
      {
        name: "Криштиану Роналду",
        number: 7,
        position: "Нападающий",
        image: "https://pagedone.io/asset/uploads/1698650000.png",
      },
      {
        name: "Неймар Жуниор",
        number: 11,
        position: "Нападающий",
        image: "https://pagedone.io/asset/uploads/1698659360.png",
      },
      {
        name: "Кевин Де Брейне",
        number: 17,
        position: "Полузащитник",
        image: "https://pagedone.io/asset/uploads/1698650109.png",
      },
      {
        name: "Вирджил ван Дейк",
        number: 4,
        position: "Защитник",
        image: "https://pagedone.io/asset/uploads/1698650146.png",
      },
      {
        name: "Мануэль Нойер",
        number: 1,
        position: "Вратарь",
        image: "https://pagedone.io/asset/uploads/1698650184.png",
      },
      {
        name: "Килиан Мбаппе",
        number: 7,
        position: "Нападающий",
        image: "https://pagedone.io/asset/uploads/1698650213.png",
      },
      {
        name: "Серхио Рамос",
        number: 4,
        position: "Защитник",
        image: "https://pagedone.io/asset/uploads/1698650242.png",
      },
      {
        name: "Лука Модрич",
        number: 10,
        position: "Полузащитник",
        image: "https://pagedone.io/asset/uploads/1698650271.png",
      },
    ],
  },
  fr: {
    title: "Rencontrez les Joueurs",
    description: "Voici les stars de Global Sports FC.",
    players: [
      {
        name: "Lionel Messi",
        number: 10,
        position: "Attaquant",
        image: "https://pagedone.io/asset/uploads/1698649968.png",
      },
      {
        name: "Cristiano Ronaldo",
        number: 7,
        position: "Attaquant",
        image: "https://pagedone.io/asset/uploads/1698650000.png",
      },
      {
        name: "Neymar Jr",
        number: 11,
        position: "Attaquant",
        image: "https://pagedone.io/asset/uploads/1698659360.png",
      },
      {
        name: "Kevin De Bruyne",
        number: 17,
        position: "Milieu de terrain",
        image: "https://pagedone.io/asset/uploads/1698650109.png",
      },
      {
        name: "Virgil van Dijk",
        number: 4,
        position: "Défenseur",
        image: "https://pagedone.io/asset/uploads/1698650146.png",
      },
      {
        name: "Manuel Neuer",
        number: 1,
        position: "Gardien de but",
        image: "https://pagedone.io/asset/uploads/1698650184.png",
      },
      {
        name: "Kylian Mbappé",
        number: 7,
        position: "Attaquant",
        image: "https://pagedone.io/asset/uploads/1698650213.png",
      },
      {
        name: "Sergio Ramos",
        number: 4,
        position: "Défenseur",
        image: "https://pagedone.io/asset/uploads/1698650242.png",
      },
      {
        name: "Luka Modrić",
        number: 10,
        position: "Milieu de terrain",
        image: "https://pagedone.io/asset/uploads/1698650271.png",
      },
    ],
  },
};

export default function PlayersPage() {
    const { language } = useLanguage(); // Get the current language from context

    const { title, description, players } = translations[language] || translations.en;  // Default to English if language not found

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

    {/* Players Grid */}
    <div className="grid grid-cols-2 gap-9 sm:grid-cols-3 lg:grid-cols-5">
      {players.map((player, index) => (
        <div
          key={index}
          className="group block text-center"
        >
          <div className="relative mb-5">
            {/* Player Number (Opaque Background) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-gray-700 dark:text-gray-200 opacity-30 -top-14 relative z-0">
                {player.number}
              </span>
            </div>
            {/* Player Image */}
            <img
              src={player.image}
              alt={player.name}
              className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600 relative z-10"
            />
          </div>
          {/* Player Name and Position */}
          <h4 className="text-xl text-gray-900 dark:text-white font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
            {player.name}
          </h4>
          <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">
            {player.position}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}