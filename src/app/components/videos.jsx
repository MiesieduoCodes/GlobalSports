"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Import Link
import videosdata from "@/app/components/constants/videos.json";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    highlightsTitle: "Training Sessions",
    introText:
      "Explore our training sessions where our athletes hone their skills and improve their performance. Watch the techniques and drills that prepare them for success.",
    callToAction:
      "Join us in our journey to excellence and stay tuned for more training insights!",
  },
  ru: {
    highlightsTitle: "Тренировочные Сессии",
    introText:
      "Изучите наши тренировочные сессии, где наши спортсмены оттачивают свои навыки и улучшают свои результаты. Смотрите техники и упражнения, которые готовят их к успеху.",
    callToAction:
      "Присоединяйтесь к нам в нашем стремлении к совершенству и следите за новыми тренировочными материалами!",
  },
  fr: {
    highlightsTitle: "Séances d'Entraînement",
    introText:
      "Découvrez nos séances d'entraînement où nos athlètes perfectionnent leurs compétences et améliorent leurs performances. Regardez les techniques et les exercices qui les préparent au succès.",
    callToAction:
      "Rejoignez-nous dans notre quête d'excellence et restez à l'écoute pour plus d'aperçus d'entraînement!",
  },
  es: {
    highlightsTitle: "Sesiones de Entrenamiento",
    introText:
      "Explora nuestras sesiones de entrenamiento donde nuestros atletas perfeccionan sus habilidades y mejoran su rendimiento. Mira las técnicas y ejercicios que los preparan para el éxito.",
    callToAction:
      "Únete a nosotros en nuestro viaje hacia la excelencia y mantente atento a más información sobre entrenamientos.",
  },
};

export default function VideoCarousel() {
  const [videos, setVideos] = useState([]);
  const carouselRef = useRef(null);
  const { language } = useLanguage();
  const content = translations[language] || translations.en; // Default to English

  useEffect(() => {
    setVideos(videosdata);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-12 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-yellow-400 text-center mb-6">
        {content.highlightsTitle}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8 px-4">
        {content.introText}
      </p>

      <motion.div
        ref={carouselRef}
        className="flex space-x-6 cursor-grab no-scrollbar p-4"
        drag="x"
        dragConstraints={{ right: 0, left: -800 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {videos.map((video, index) => (
          // Wrap each video in a Link that sends the video src as a query parameter.
          <Link key={index} href={`/videoplayer?src=${encodeURIComponent(video.src)}`}>
            <motion.div className="relative w-[250px] h-[350px] md:w-[300px] md:h-[400px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-900 dark:bg-gray-800">
              <div className="group relative w-full h-full">
                <div className="absolute top-0 left-0 m-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-bold">
                  {video.date}
                </div>

                <Image
                  src={video.thumbnail}
                  alt={video.title[language] || video.title.en}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-500 group-hover:opacity-0"
                />

                <video
                  src={video.src}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  loop
                  muted
                  autoPlay
                  playsInline
                />

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-blue-700 dark:from-yellow-500 via-transparent to-transparent text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="hover:underline">
                    {video.title[language] || video.title.en}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <p className="text-lg text-blue-600 dark:text-yellow-400 text-center mt-6">
        {content.callToAction}
      </p>
    </div>
  );
}
