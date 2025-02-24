"use client";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { useLanguage } from "@/app/context/LanguageContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import the news data
import newsData from "@/app/components/constants/news.json" with { type: "json" };



// Translations for the News section
const translations = {
  en: {
    newsSection: {
      title: [
        { text: "Latest ", style: "" },
        { text: "Football News", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Stay updated with the most exciting news from our club. From match highlights to transfer buzz – we’ve got you covered. Plus, dive into exclusive interviews, behind-the-scenes stories, and previews of upcoming events to truly feel the pulse of our community.",
      viewAll: "View All",
      readMore: "Read more",
    },
  },
  es: {
    newsSection: {
      title: [
        { text: "Últimas ", style: "" },
        { text: "Noticias de Fútbol", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Mantente actualizado con las noticias más emocionantes de nuestro club. Desde los momentos destacados de los partidos hasta los rumores de traspasos, te tenemos cubierto. Además, descubre entrevistas exclusivas, historias entre bastidores y avances de los próximos eventos para sentir realmente el pulso de nuestra comunidad.",
      viewAll: "Ver Todo",
      readMore: "Leer más",
    },
  },
  ru: {
    newsSection: {
      title: [
        { text: "Последние ", style: "" },
        { text: "Футбольные Новости", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Будьте в курсе самых захватывающих новостей нашего клуба. От ярких моментов матчей до слухов о трансферах — мы предоставляем всю информацию. А также окунитесь в эксклюзивные интервью, закулисные истории и анонсы предстоящих мероприятий, чтобы ощутить пульс нашего сообщества.",
      viewAll: "Посмотреть все",
      readMore: "Читать далее",
    },
  },
  fr: {
    newsSection: {
      title: [
        { text: "Dernières ", style: "" },
        { text: "Nouvelles du Football", style: "text-blue-600 dark:text-yellow-400" },
      ],
      description:
        "Restez informé des actualités les plus passionnantes de notre club. Des temps forts des matchs aux rumeurs de transferts, nous avons tout ce qu'il vous faut. De plus, plongez dans des interviews exclusives, des coulisses captivantes et des aperçus d'événements à venir pour ressentir véritablement le dynamisme de notre communauté.",
      viewAll: "Voir Tout",
      readMore: "Lire la suite",
    },
  },
};

export default function News() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const sectionRef = useRef(null);
  const { language } = useLanguage();
  const content = translations[language] || translations.en;

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap lg:justify-between gap-8">
          {/* Left Side – Section Header and Navigation Buttons */}
          <div className="w-full flex flex-col justify-between lg:w-2/5">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold leading-[3.25rem] mb-5 text-black dark:text-white">
                {content.newsSection.title.map((part, index) => (
                  <span key={index} className={part.style}>
                    {part.text}
                  </span>
                ))}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                {content.newsSection.description}
              </p>
              <a
                href="/news"
                className="cursor-pointer border border-gray-700 dark:border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-700 dark:text-white font-semibold transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                {content.newsSection.viewAll}
              </a>
            </div>
          </div>

          {/* Right Side – Swiper Slider */}
          <div className="w-full lg:w-3/5">
            <Swiper
              slidesPerView={2}
              spaceBetween={28}
              loop={true}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // Assign refs to navigation before initialization.
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                568: { slidesPerView: 2, spaceBetween: 28 },
                768: { slidesPerView: 2, spaceBetween: 28 },
                1024: { slidesPerView: 2, spaceBetween: 32 },
              }}
              className="mySwiper"
            >
              {newsData.news.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full max-lg:max-w-xl lg:w-1/2 group"
                >
                  <div className="flex items-center mb-9">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl text-black dark:text-white font-medium leading-8 mb-4 group-hover:text-blue-600 dark:group-hover:text-yellow-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-6 transition-all duration-500 mb-8">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    className="cursor-pointer flex items-center gap-2 text-lg text-blue-700 dark:text-yellow-400 font-semibold"
                  >
                    {content.newsSection.readMore}
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
