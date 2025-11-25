"use client";

import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import Videos from "@/app/components/videos";
import { motion } from 'framer-motion';
import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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
 <motion.section 
  className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-gray-800 dark:to-gray-900"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {/* Decorative elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full mix-blend-overlay"></div>
    <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-overlay"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="text-center mb-14"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {content.subscribeTitle}
      </h2>
      <p className="text-lg md:text-xl text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto">
        {content.subscribeSubtitle || "Stay updated with our latest news and offers."}
      </p>
    </motion.div>

    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <form className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl transform group-focus-within:scale-105 transition-transform duration-300"></div>
          <input
            type="email"
            name="email"
            required
            className="relative w-full h-16 px-6 pr-16 text-lg text-white bg-indigo-500/30 dark:bg-gray-700/50 backdrop-blur-sm border border-indigo-400/30 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-indigo-200 dark:placeholder-gray-400 transition-all duration-300"
            placeholder={content.emailPlaceholder}
          />
          <EnvelopeIcon className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-indigo-200 dark:text-gray-400" />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative h-16 px-8 text-lg font-semibold text-indigo-700 dark:text-blue-900 bg-white dark:bg-yellow-400 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/95 dark:hover:bg-yellow-300 transition-all duration-300 overflow-hidden"
          type="submit"
        >
          <span className="relative z-10 flex items-center gap-2">
            {content.subscribeButton}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </motion.button>
      </form>
      
      <p className="mt-4 text-center text-sm text-indigo-200 dark:text-indigo-300">
        {content.privacyText || "We respect your privacy. Unsubscribe at any time."}
      </p>
    </motion.div>
  </div>
</motion.section>
    </div>
  );
};

export default Page;