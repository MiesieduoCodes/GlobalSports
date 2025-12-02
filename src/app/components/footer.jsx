"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    aboutTitle: "About Global Sport International",
    aboutDescription: "Leading football club dedicated to excellence, community, and international sports development.",
    aboutLinks: [
      { name: "Our Story", href: "/clubhistory" },
      { name: "Football News", href: "/news" },
      { name: "Player Highlights", href: "/players" },
      { name: "Upcoming Matches", href: "/matches" },
    ],
    followUsTitle: "Connect With Us",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Twitter", href: "https://twitter.com/globalsport247" },
      { name: "YouTube", href: "https://youtube.com/globalsport247" },
    ],
    legalTitle: "Legal & Policies",
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Licensing", href: "/license" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Code of Conduct", href: "/conduct" },
    ],
    contactTitle: "Contact Information",
    contactInfo: [
      { type: "address", value: "123 Sports Avenue, City, Country" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "email", value: "info@globalsport.com" },
    ],
    stayUpdatedTitle: "Stay Updated",
    stayUpdatedMessage: "Subscribe to our newsletter for exclusive updates, match insights, and special offers.",
    subscribeButton: "Subscribe Now",
    subscriptionSuccess: "Thank you for subscribing!",
    subscriptionError: "Subscription failed. Please try again.",
    placeholderEmail: "Enter your email address",
    footerCopyright: "© {year} Global Sport International. All Rights Reserved.",
    rightsReserved: "All rights reserved.",
  },
  ru: {
    aboutTitle: "О Global Sport International",
    aboutDescription: "Ведущий футбольный клуб, стремящийся к совершенству, развитию сообщества и международного спорта.",
    aboutLinks: [
      { name: "Наша История", href: "/clubhistory" },
      { name: "Новости Футбола", href: "/news" },
      { name: "Лучшие Игроки", href: "/players" },
      { name: "Предстоящие Матчи", href: "/matches" },
    ],
    followUsTitle: "Мы в Соцсетях",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Twitter", href: "https://twitter.com/globalsport247" },
      { name: "YouTube", href: "https://youtube.com/globalsport247" },
    ],
    legalTitle: "Правовая информация",
    legalLinks: [
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Лицензирование", href: "/license" },
      { name: "Условия и Положения", href: "/terms" },
      { name: "Кодекс поведения", href: "/conduct" },
    ],
    contactTitle: "Контактная информация",
    contactInfo: [
      { type: "address", value: "123 Спортивный проспект, Город, Страна" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "email", value: "info@globalsport.com" },
    ],
    stayUpdatedTitle: "Будьте в курсе",
    stayUpdatedMessage: "Подпишитесь на рассылку для получения эксклюзивных обновлений, аналитики матчей и специальных предложений.",
    subscribeButton: "Подписаться",
    subscriptionSuccess: "Спасибо за подписку!",
    subscriptionError: "Ошибка подписки. Попробуйте позже.",
    placeholderEmail: "Введите ваш email",
    footerCopyright: "© {year} Global Sport International. Все права защищены.",
    rightsReserved: "Все права защищены.",
  },
  fr: {
    aboutTitle: "À propos de Global Sport International",
    aboutDescription: "Club de football leader dédié à l'excellence, à la communauté et au développement sportif international.",
    aboutLinks: [
      { name: "Notre Histoire", href: "/clubhistory" },
      { name: "Actualités Football", href: "/news" },
      { name: "Moments Forts des Joueurs", href: "/players" },
      { name: "Matchs à Venir", href: "/matches" },
    ],
    followUsTitle: "Suivez-nous",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Twitter", href: "https://twitter.com/globalsport247" },
      { name: "YouTube", href: "https://youtube.com/globalsport247" },
    ],
    legalTitle: "Légal et Politiques",
    legalLinks: [
      { name: "Politique de Confidentialité", href: "/privacy" },
      { name: "Licences", href: "/license" },
      { name: "Conditions Générales", href: "/terms" },
      { name: "Code de Conduite", href: "/conduct" },
    ],
    contactTitle: "Informations de Contact",
    contactInfo: [
      { type: "address", value: "123 Avenue du Sport, Ville, Pays" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "email", value: "info@globalsport.com" },
    ],
    stayUpdatedTitle: "Restez Informé",
    stayUpdatedMessage: "Abonnez-vous à notre newsletter pour des mises à jour exclusives, des analyses de match et des offres spéciales.",
    subscribeButton: "S'abonner",
    subscriptionSuccess: "Merci pour votre abonnement !",
    subscriptionError: "Échec de l'abonnement. Veuillez réessayer.",
    placeholderEmail: "Entrez votre adresse email",
    footerCopyright: "© {year} Global Sport International. Tous droits réservés.",
    rightsReserved: "Tous droits réservés.",
  },
  es: {
    aboutTitle: "Sobre Global Sport International",
    aboutDescription: "Club de fútbol líder dedicado a la excelencia, la comunidad y el desarrollo deportivo internacional.",
    aboutLinks: [
      { name: "Nuestra Historia", href: "/clubhistory" },
      { name: "Noticias de Fútbol", href: "/news" },
      { name: "Destacados de Jugadores", href: "/players" },
      { name: "Próximos Partidos", href: "/matches" },
    ],
    followUsTitle: "Conéctate Con Nosotros",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Twitter", href: "https://twitter.com/globalsport247" },
      { name: "YouTube", href: "https://youtube.com/globalsport247" },
    ],
    legalTitle: "Legal y Políticas",
    legalLinks: [
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Licenciamiento", href: "/license" },
      { name: "Términos y Condiciones", href: "/terms" },
      { name: "Código de Conducta", href: "/conduct" },
    ],
    contactTitle: "Información de Contacto",
    contactInfo: [
      { type: "address", value: "123 Avenida Deportiva, Ciudad, País" },
      { type: "phone", value: "+1 (555) 123-4567" },
      { type: "email", value: "info@globalsport.com" },
    ],
    stayUpdatedTitle: "Mantente Informado",
    stayUpdatedMessage: "Suscríbete a nuestro boletín para recibir actualizaciones exclusivas, análisis de partidos y ofertas especiales.",
    subscribeButton: "Suscribirse",
    subscriptionSuccess: "¡Gracias por suscribirte!",
    subscriptionError: "Error en la suscripción. Por favor, inténtalo de nuevo.",
    placeholderEmail: "Ingresa tu correo electrónico",
    footerCopyright: "© {year} Global Sport International. Todos los derechos reservados.",
    rightsReserved: "Todos los derechos reservados.",
  },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();
  const content = translations[language] || translations.en;

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".footer-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({ 
        type: "error", 
        message: language === 'en' ? "Please enter a valid email address." 
                : language === 'ru' ? "Пожалуйста, введите корректный email адрес."
                : language === 'fr' ? "Veuillez entrer une adresse email valide."
                : "Por favor, ingresa una dirección de correo válida."
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        { user_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ""
      );

      if (response.status === 200) {
        setStatus({ type: "success", message: content.subscriptionSuccess });
        setEmail("");
      }
    } catch (error) {
      setStatus({ type: "error", message: content.subscriptionError });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconForLink = (linkName) => {
    const icons = {
      Instagram: "📷",
      Facebook: "📘",
      Twitter: "🐦",
      YouTube: "📺",
    };
    return icons[linkName] || "🔗";
  };

  const getContactIcon = (type) => {
    const icons = {
      address: "📍",
      phone: "📞",
      email: "✉️",
    };
    return icons[type] || "●";
  };

  return (
    <footer className="w-full bg-gradient-to-br from-blue-900 to-blue-800 text-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 font-montserrat border-t border-blue-700 dark:border-gray-700">
      <div className="mx-auto w-full max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-6 py-12 lg:py-16">
          {/* Brand & About Section */}
          <div className="footer-section lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-900 font-bold text-lg">GS</span>
              </div>
              <h3 className="text-xl font-bold text-white">Global Sport</h3>
            </div>
            <p className="text-blue-100 dark:text-gray-300 mb-6 leading-relaxed text-sm">
              {content.aboutDescription}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {content.aboutLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-blue-100 hover:text-yellow-300 transition-colors duration-200 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-yellow-300 mb-6 pb-2 border-b border-yellow-400/30">
              {content.followUsTitle}
            </h3>
            <div className="space-y-3">
              {content.followUsLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-100 hover:text-white transition-all duration-200 group text-sm"
                >
                  <span className="mr-3 text-base">{getIconForLink(link.name)}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Legal Section */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-yellow-300 mb-6 pb-2 border-b border-yellow-400/30">
              {content.contactTitle}
            </h3>
            <div className="space-y-3 mb-6">
              {content.contactInfo.map((info, index) => (
                <div key={index} className="flex items-start text-sm">
                  <span className="mr-3 mt-0.5 text-yellow-400">
                    {getContactIcon(info.type)}
                  </span>
                  <span className="text-blue-100">{info.value}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-yellow-300 mb-4 pb-2 border-b border-yellow-400/30">
              {content.legalTitle}
            </h3>
            <div className="space-y-2">
              {content.legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-blue-100 hover:text-yellow-300 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold text-yellow-300 mb-6 pb-2 border-b border-yellow-400/30">
              {content.stayUpdatedTitle}
            </h3>
            <p className="text-blue-100 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              {content.stayUpdatedMessage}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder={content.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-semibold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    {language === 'en' ? 'Subscribing...' 
                     : language === 'ru' ? 'Подписка...'
                     : language === 'fr' ? 'Abonnement...'
                     : 'Suscribiendo...'}
                  </span>
                ) : (
                  content.subscribeButton
                )}
              </button>
            </form>
            {status && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                } transition-all duration-300`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-700 dark:border-gray-700">
          <div className="px-6 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 dark:text-gray-400 text-sm text-center md:text-left">
              {content.footerCopyright.replace(
                "{year}",
                new Date().getFullYear()
              )}
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-blue-200 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="/terms" className="text-blue-200 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a href="/contact" className="text-blue-200 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;