// "use client";
// import { useEffect } from "react";
// import Image from "next/image";
// import { useLanguage } from "@/app/context/LanguageContext"; // Import your language context

// const translations = {
//   en: {
//     title: "Join Our Team",
//     description: "Football is more than just a game—it’s a passion, a legacy, and a way of life. Join us and become part of something great!",
//     links: [
//       { name: "Academy Trials", href: "#" },
//       { name: "Season Tickets", href: "#" },
//       { name: "Our Club History", href: "/clubhistory" },
//       { name: "Meet Our Management", href: "/administration" },
//     ],
//     stats: [
//       { name: "League Titles", value: "15" },
//       { name: "First Team Players", value: "25" },
//       { name: "Training Hours Per Week", value: "30+" },
//       { name: "Global Fanbase", value: "10M+" },
//     ],
//     testimonials: [
//       {
//         text: "City FC has transformed my career. The team's professionalism and support are unmatched in the league.",
//         name: "Lionel Torres",
//         role: "Striker",
//         img: "https://placehold.co/100x100?text=LT",
//       },
//       {
//         text: "The atmosphere at our home stadium is electric. Our fans are truly the 12th player on the pitch!",
//         name: "Marcus Kane",
//         role: "Midfielder",
//         img: "https://placehold.co/100x100?text=MK",
//       },
//       {
//         text: "Training with world-class facilities and coaches has taken my game to the next level. Glory to City FC!",
//         name: "Andre Silva",
//         role: "Defender",
//         img: "https://placehold.co/100x100?text=AS",
//       },
//       {
//         text: "Wearing the City FC badge is an honor. The club's history and values inspire us to push harder every match.",
//         name: "Coach Eriksson",
//         role: "Manager",
//         img: "https://placehold.co/100x100?text=CE",
//       },
//     ],
//     legends: [
//       { name: "David Hunter", role: "Legendary Captain", img: "https://placehold.co/100x100?text=DH" },
//       { name: "Michael Rios", role: "All-Time Top Scorer", img: "https://placehold.co/100x100?text=MR" },
//       { name: "Carlos Mendes", role: "Iconic Goalkeeper", img: "https://placehold.co/100x100?text=CM" },
//     ],
//     legendsSectionTitle: "Meet Our Legends",
//   },
//   ru: {
//     title: "Присоединяйтесь к нашей команде",
//     description: "Футбол — это больше, чем просто игра; это страсть, наследие и образ жизни. Присоединяйтесь к нам и станьте частью чего-то великого!",
//     links: [
//       { name: "Тренировочные сборы", href: "#" },
//       { name: "Сезонные билеты", href: "#" },
//       { name: "История нашего клуба", href: "/clubhistory" },
//       { name: "Познакомьтесь с нашим руководством", href: "/administration" },
//     ],
//     stats: [
//       { name: "Лиговые титулы", value: "15" },
//       { name: "Игроки первой команды", value: "25" },
//       { name: "Часы тренировок в неделю", value: "30+" },
//       { name: "Глобальная фан-база", value: "10M+" },
//     ],
//     testimonials: [
//       {
//         text: "City FC изменила мою карьеру. Профессионализм и поддержка команды не имеют аналогов в лиге.",
//         name: "Лионель Торрес",
//         role: "Нападающий",
//         img: "https://placehold.co/100x100?text=LT",
//       },
//       {
//         text: "Атмосфера на нашем стадионе электрическая. Наши фанаты — это действительно 12-й игрок на поле!",
//         name: "Маркус Кейн",
//         role: "Полузащитник",
//         img: "https://placehold.co/100x100?text=MK",
//       },
//       {
//         text: "Тренировки с мировыми условиями и тренерами подняли мою игру на новый уровень. Слава City FC!",
//         name: "Андре Силва",
//         role: "Защитник",
//         img: "https://placehold.co/100x100?text=AS",
//       },
//       {
//         text: "Носить эмблему City FC — это честь. История и ценности клуба вдохновляют нас стараться больше на каждом матче.",
//         name: "Тренер Эрикссон",
//         role: "Менеджер",
//         img: "https://placehold.co/100x100?text=CE",
//       },
//     ],
//     legends: [
//       { name: "Дэвид Хантер", role: "Легендарный капитан", img: "https://placehold.co/100x100?text=DH" },
//       { name: "Майкл Риос", role: "Лучший бомбардир всех времен", img: "https://placehold.co/100x100?text=MR" },
//       { name: "Карлос Мендес", role: "Иконический вратарь", img: "https://placehold.co/100x100?text=CM" },
//     ],
//     legendsSectionTitle: "Познакомьтесь с нашими легендами",
//   },
//   fr: {
//     title: "Rejoignez notre équipe",
//     description: "Le football est plus qu'un simple jeu : c'est une passion, un héritage et un mode de vie. Rejoignez-nous et devenez partie intégrante de quelque chose de grand !",
//     links: [
//       { name: "Essais de l'académie", href: "#" },
//       { name: "Billets de saison", href: "#" },
//       { name: "Notre histoire de club", href: "/clubhistory" },
//       { name: "Rencontrez notre direction", href: "/administration" },
//     ],
//     stats: [
//       { name: "Titres de Ligue", value: "15" },
//       { name: "Joueurs de l'équipe première", value: "25" },
//       { name: "Heures d'entraînement par semaine", value: "30+" },
//       { name: "Base de fans mondiale", value: "10M+" },
//     ],
//     testimonials: [
//       {
//         text: "City FC a transformé ma carrière. Le professionnalisme et le soutien de l'équipe sont incomparables dans la ligue.",
//         name: "Lionel Torres",
//         role: "Attaquant",
//         img: "https://placehold.co/100x100?text=LT",
//       },
//       {
//         text: "L'atmosphère dans notre stade est électrique. Nos fans sont vraiment le 12ème joueur sur le terrain !",
//         name: "Marcus Kane",
//         role: "Milieu de terrain",
//         img: "https://placehold.co/100x100?text=MK",
//       },
//       {
//         text: "S'entraîner avec des installations et des entraîneurs de classe mondiale a fait passer mon jeu au niveau supérieur. Gloire à City FC !",
//         name: "Andre Silva",
//         role: "Défenseur",
//         img: "https://placehold.co/100x100?text=AS",
//       },
//       {
//         text: "Porter le badge de City FC est un honneur. L'histoire et les valeurs du club nous inspirent à nous battre plus fort à chaque match.",
//         name: "Coach Eriksson",
//         role: "Manager",
//         img: "https://placehold.co/100x100?text=CE",
//       },
//     ],
//     legends: [
//       { name: "David Hunter", role: "Capitaine légendaire", img: "https://placehold.co/100x100?text=DH" },
//       { name: "Michael Rios", role: "Meilleur buteur de tous les temps", img: "https://placehold.co/100x100?text=MR" },
//       { name: "Carlos Mendes", role: "Gardien de but emblématique", img: "https://placehold.co/100x100?text=CM" },
//     ],
//     legendsSectionTitle: "Rencontrez nos légendes",
//   },
//   es: {
//     title: "Únete a Nuestro Equipo",
//     description: "El fútbol es más que un juego; es una pasión, un legado y una forma de vida. ¡Únete a nosotros y sé parte de algo grande!",
//     links: [
//       { name: "Pruebas de Academia", href: "#" },
//       { name: "Entradas de Temporada", href: "#" },
//       { name: "Nuestra Historia de Club", href: "/clubhistory" },
//       { name: "Conoce a Nuestra Dirección", href: "/administration" },
//     ],
//     stats: [
//       { name: "Títulos de Liga", value: "15" },
//       { name: "Jugadores del Primer Equipo", value: "25" },
//       { name: "Horas de Entrenamiento por Semana", value: "30+" },
//       { name: "Base de Fans Global", value: "10M+" },
//     ],
//     testimonials: [
//       {
//         text: "City FC ha transformado mi carrera. El profesionalismo y apoyo del equipo son incomparables en la liga.",
//         name: "Lionel Torres",
//         role: "Delantero",
//         img: "https://placehold.co/100x100?text=LT",
//       },
//       {
//         text: "¡La atmósfera en nuestro estadio es eléctrica! ¡Nuestros fans son verdaderamente el 12º jugador en el campo!",
//         name: "Marcus Kane",
//         role: "Centrocampista",
//         img: "https://placehold.co/100x100?text=MK",
//       },
//       {
//         text: "Entrenar con instalaciones y entrenadores de clase mundial ha llevado mi juego al siguiente nivel. ¡Gloria a City FC!",
//         name: "Andre Silva",
//         role: "Defensor",
//         img: "https://placehold.co/100x100?text=AS",
//       },
//       {
//         text: "Llevar la insignia de City FC es un honor. La historia y los valores del club nos inspiran a esforzarnos más en cada partido.",
//         name: "Entrenador Eriksson",
//         role: "Manager",
//         img: "https://placehold.co/100x100?text=CE",
//       },
//     ],
//     legends: [
//       { name: "David Hunter", role: "Capitán Legendario", img: "https://placehold.co/100x100?text=DH" },
//       { name: "Michael Rios", role: "Máximo Goleador de Todos los Tiempos", img: "https://placehold.co/100x100?text=MR" },
//       { name: "Carlos Mendes", role: "Portero Icónico", img: "https://placehold.co/100x100?text=CM" },
//     ],
//     legendsSectionTitle: "Conoce a Nuestras Leyendas",
//   },
// };

// export default function JoinOurTeam() {
//   const { language } = useLanguage(); // Get the current language from context
//   const content = translations[language] || translations.en; // Default to English

//   useEffect(() => {
//     const initializeSwiper = async () => {
//       const Swiper = (await import("swiper")).default;
  
//       new Swiper(".mySwiper", {
//         slidesPerView: 3,
//         spaceBetween: 28,
//         centeredSlides: true,
//         loop: true,
//         navigation: {
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         },
//         breakpoints: {
//           0: { slidesPerView: 1, centeredSlides: false },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         },
//       });
//     };
  
//     initializeSwiper();
//   }, []);

//   return (
//     <div className="relative isolate overflow-hidden bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
//       {/* Hero Section with Background Image */}
//       <div className="relative py-24 sm:py-32">
//         <div className="absolute inset-0 -z-10">
//           <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 opacity-70 transition-colors duration-300"></div>
//           <Image
//             alt="Football stadium background"
//             src="/images/hero-background.jpg" // Update with your image path
//             fill
//             priority
//             className="object-cover"
//           />
//         </div>

//         <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
//           <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
//             {content.title}
//           </h1>
//           <p className="mt-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
//             {content.description}
//           </p>

//           {/* Call-to-Action Buttons */}
//           <div className="mt-10 flex flex-wrap justify-center gap-6">
//             {content.links.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="text-lg font-semibold text-white dark:text-black bg-blue-600 dark:bg-yellow-400 px-6 py-3 rounded-lg hover:bg-blue-500 dark:hover:bg-yellow-300 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 aria-label={`Go to ${link.name}`}
//               >
//                 {link.name} →
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
//         <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8">
//           {content.stats.map((stat) => (
//             <div key={stat.name} className="text-center">
//               <dd className="text-4xl font-bold text-black dark:text-white">{stat.value}</dd>
//               <dt className="text-gray-600 dark:text-gray-300">{stat.name}</dt>
//             </div>
//           ))}
//         </dl>
//       </div>

//       {/* Legends Section */}
//       <section className="py-20">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-bold">{content.legendsSectionTitle}</h2>
//           <div className="flex flex-wrap justify-center gap-10 mt-10">
//             {content.legends.map((legend) => (
//               <div key={legend.name} className="text-center">
//                 <img
//                   className="w-24 h-24 rounded-full mx-auto"
//                   src={legend.img}
//                   alt={legend.name}
//                   loading="lazy"
//                 />
//                 <h4 className="mt-4 font-semibold">{legend.name}</h4>
//                 <p className="text-gray-600 dark:text-gray-400">{legend.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="bg-gray-100 dark:bg-gray-900 py-20">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <h2 className="text-center text-4xl font-bold mb-10">Fan & Player Testimonials</h2>
//           <div className="swiper mySwiper">
//             <div className="swiper-wrapper">
//               {content.testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="swiper-slide bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300"
//                 >
//                   <p className="mb-6 text-lg">&quot;{testimonial.text}&quot;</p>
//                   <div className="flex items-center gap-4">
//                     <img
//                       className="w-14 h-14 rounded-full"
//                       src={testimonial.img}
//                       alt={testimonial.name}
//                       loading="lazy"
//                     />
//                     <div>
//                       <h5 className="font-semibold">{testimonial.name}</h5>
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from 'react';

const ComponentName = () => {
  return (
    <div>
  Illwork on the about page 
    </div>
  );
};

export default ComponentName;