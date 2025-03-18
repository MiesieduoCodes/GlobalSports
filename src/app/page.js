"use client";

import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import Videos from "@/app/components/videos";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    subscribeTitle: "Subscribe To Our Newsletter",
    emailPlaceholder: "Your mail id..",
    subscribeButton: "Subscribe",
  },
  ru: {
    subscribeTitle: "Подпишитесь на нашу рассылку",
    emailPlaceholder: "Ваш адрес электронной почты..",
    subscribeButton: "Подписаться",
  },
  fr: {
    subscribeTitle: "Abonnez-vous à notre newsletter",
    emailPlaceholder: "Votre adresse e-mail..",
    subscribeButton: "S'abonner",
  },
  es: {
    subscribeTitle: "Suscríbete a nuestro boletín",
    emailPlaceholder: "Tu correo electrónico..",
    subscribeButton: "Suscribirse",
  },
};

const Page = () => {
  const { language } = useLanguage();
  const content = translations[language] || translations.en; // Default to English

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
      <Hero />
      <NextMatch />
      <Videos />
      <News />
      <section className="py-16 bg-indigo-600 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-5xl text-white text-center font-bold mb-14">
            {content.subscribeTitle}
          </h2>
          <div className="flex items-center justify-center flex-col gap-4 sm:flex-row">
            <input
              type="text"
              name="email"
              className="py-2.5 px-5 h-14 w-full md:max-w-md border border-gray-300 bg-indigo-500 dark:bg-gray-700 shadow-sm rounded-full text-lg text-white focus:outline-none outline-none placeholder:text-indigo-200 dark:placeholder-gray-400"
              placeholder={content.emailPlaceholder}
            />
            <button className="h-14 py-3.5 px-7 text-xl bg-white shadow-sm rounded-full text-indigo-600 font-bold dark:bg-yellow-400 dark:text-blue-600">
              {content.subscribeButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;