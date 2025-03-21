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
    aboutLinks: [
      { name: "Our Story", href: "/clubhistory" },
      { name: "Football News", href: "/news" },
      { name: "Player Highlights", href: "/players" },
      { name: "Upcoming Matches", href: "/matches" },
    ],
    followUsTitle: "Follow Us",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Contact Us", href: "/contact" },
    ],
    legalTitle: "Legal",
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Licensing", href: "/license" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
    stayUpdatedTitle: "Stay Updated",
    stayUpdatedMessage:
      "Subscribe for the latest football news, match updates, and exclusive content.",
    subscribeButton: "Subscribe",
    subscriptionSuccess: "Subscription successful!",
    subscriptionError: "Subscription failed. Try again later.",
    footerCopyright:
      "© {year} Global Sport Football Club. All Rights Reserved.",
  },
  ru: {
    aboutTitle: "О Global Sport International",
    aboutLinks: [
      { name: "Наша История", href: "/clubhistory" },
      { name: "Новости Футбола", href: "/news" },
      { name: "Лучшие Игроки", href: "/players" },
      { name: "Предстоящие Матчи", href: "/matches" },
    ],
    followUsTitle: "Следите за нами",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Свяжитесь с нами", href: "/contact" },
    ],
    legalTitle: "Юридическая информация",
    legalLinks: [
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Лицензирование", href: "/license" },
      { name: "Условия и Положения", href: "/terms" },
    ],
    stayUpdatedTitle: "Будьте в курсе",
    stayUpdatedMessage:
      "Подпишитесь на последние новости футбола, обновления матчей и эксклюзивный контент.",
    subscribeButton: "Подписаться",
    subscriptionSuccess: "Подписка успешна!",
    subscriptionError: "Ошибка подписки. Попробуйте позже.",
    footerCopyright:
      "© {year} Global Sport Football Club. Все права защищены.",
  },
  fr: {
    aboutTitle: "À propos de Global Sport International",
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
      { name: "Contactez-nous", href: "/contact" },
    ],
    legalTitle: "Légal",
    legalLinks: [
      { name: "Politique de Confidentialité", href: "/privacy" },
      { name: "Licences", href: "/license" },
      { name: "Conditions Générales", href: "/terms" },
    ],
    stayUpdatedTitle: "Restez Informé",
    stayUpdatedMessage:
      "Abonnez-vous pour les dernières nouvelles du football, les mises à jour des matchs et du contenu exclusif.",
    subscribeButton: "S'abonner",
    subscriptionSuccess: "Abonnement réussi !",
    subscriptionError: "Échec de l'abonnement. Réessayez plus tard.",
    footerCopyright:
      "© {year} Global Sport Football Club. Tous droits réservés.",
  },
  es: {
    aboutTitle: "Sobre Global Sport International",
    aboutLinks: [
      { name: "Nuestra Historia", href: "/clubhistory" },
      { name: "Noticias de Fútbol", href: "/news" },
      { name: "Destacados de Jugadores", href: "/players" },
      { name: "Próximos Partidos", href: "/matches" },
    ],
    followUsTitle: "Síguenos",
    followUsLinks: [
      { name: "Instagram", href: "https://www.instagram.com/globalsport247_/" },
      { name: "Facebook", href: "https://facebook.com/globalsport247" },
      { name: "Contáctanos", href: "/contact" },
    ],
    legalTitle: "Legal",
    legalLinks: [
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Licenciamiento", href: "/license" },
      { name: "Términos y Condiciones", href: "/terms" },
    ],
    stayUpdatedTitle: "Mantente Actualizado",
    stayUpdatedMessage:
      "Suscríbete para recibir las últimas noticias de fútbol, actualizaciones de partidos y contenido exclusivo.",
    subscribeButton: "Suscribirse",
    subscriptionSuccess: "¡Suscripción exitosa!",
    subscriptionError: "La suscripción falló. Intenta nuevamente más tarde.",
    footerCopyright:
      "© {year} Global Sport Football Club. Todos los derechos reservados.",
  },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const { language } = useLanguage(); // Get current language from context
  const content = translations[language] || translations.en; // Default to English

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".footer-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".footer-section",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter an email address." });

      return;
      
    }

    try {
      const response = await emailjs.send(
        "service_mofzwum",
        "template_ormpbz2",
        { user_email: email },
        "a1NybmXRcYdkYXTu6"
      );

      if (response.status === 200) {
        setStatus({ type: "success", message: content.subscriptionSuccess });
        setEmail(""); // Clear the input field
      }
    } catch {
      setStatus({ type: "error", message: content.subscriptionError });
    }
  };

  // Blank line added here to satisfy the padding-line-between-statements rule

  return (
    <div>
      <footer className="w-full bg-blue-900 text-white dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 font-montserrat">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10 lg:py-12">
            {/* About Section */}
            <div className="footer-section">
              <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                {content.aboutTitle}
              </h2>
              <ul className="space-y-3">
                {content.aboutLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-yellow-400 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="footer-section">
              <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                {content.followUsTitle}
              </h2>
              <ul className="space-y-3">
                {content.followUsLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-yellow-400 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="footer-section">
              <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                {content.legalTitle}
              </h2>
              <ul className="space-y-3">
                {content.legalLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-yellow-400 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="footer-section">
              <h2 className="mb-6 text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                {content.stayUpdatedTitle}
              </h2>
              <p className="mb-4 text-gray-300 dark:text-gray-400">{content.stayUpdatedMessage}</p>
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300"
                >
                  {content.subscribeButton}
                </button>
              </form>
              {status && (
                <p
                  className={`mt-3 text-sm ${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="py-6 text-center text-sm text-gray-300 dark:text-gray-500">
            <p suppressHydrationWarning={true}>
              {content.footerCopyright.replace(
                "{year}",
                new Date().getFullYear()
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
