"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Mail, Phone, MapPin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";

const translations = {
  en: {
    heroEyebrow: "Contact",
    heroTitle: "There's a place ",
    heroTitleAccent: "for you at this club.",
    heroSub: "Player. Parent. Member. Corporate partner. Wherever you fit, this is where you start.",
    items: [
      {
        title: "General Enquiries",
        val: "info@veglobalsports.com",
        sub: "We aim to respond within 2 business days",
        icon: <Mail className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Phone",
        val: "+7 747 686 8145",
        sub: "Almaty, Kazakhstan (ALMT)",
        icon: <Phone className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Location",
        val: "Almaty, Kazakhstan",
        sub: "VE-GlobalSportFC · Founded 2017",
        icon: <MapPin className="w-[18px] h-[18px] text-vgold" />
      }
    ],
    actions: [
      { name: "Register for Trials", href: "/academy#register" },
      { name: "Join the Business Club", href: "/business-club" },
      { name: "Send a Message", href: "mailto:info@veglobalsports.com" }
    ],
    follow: "Follow The Club",
    mapLabel: "Almaty",
    mapSub: "Kazakhstan",
    mapCoords: "43.2220° N, 76.8512° E",
    mapBtn: "Open in Maps"
  },
  ru: {
    heroEyebrow: "Контакты",
    heroTitle: "В этом клубе есть ",
    heroTitleAccent: "место для вас.",
    heroSub: "Игрок. Родитель. Участник. Корпоративный партнёр. Где бы вы ни были — начните здесь.",
    items: [
      {
        title: "Общие вопросы",
        val: "info@veglobalsports.com",
        sub: "Отвечаем в течение 2 рабочих дней",
        icon: <Mail className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Телефон",
        val: "+7 747 686 8145",
        sub: "Алматы, Казахстан (ALMT)",
        icon: <Phone className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Расположение",
        val: "Алматы, Казахстан",
        sub: "VE-GlobalSportFC · Основан в 2017",
        icon: <MapPin className="w-[18px] h-[18px] text-vgold" />
      }
    ],
    actions: [
      { name: "Записаться на просмотр", href: "/academy#register" },
      { name: "Присоединиться к бизнес-клубу", href: "/business-club" },
      { name: "Написать нам", href: "mailto:info@veglobalsports.com" }
    ],
    follow: "Следите за нами",
    mapLabel: "Алматы",
    mapSub: "Казахстан",
    mapCoords: "43.2220° N, 76.8512° E",
    mapBtn: "Открыть в Картах"
  }
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">

      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid">
        <div className="kz-grid opacity-[0.025]" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-4">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub">{t.heroSub}</p>

          <div className="flex flex-wrap gap-4 mt-8">
            {t.actions.map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className={i === 0
                  ? "bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors"
                  : "border border-white/20 text-vwhite font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:border-vgold hover:text-vgold transition-colors"}
              >
                {a.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start mt-12">

            {/* Contact Info */}
            <div className="flex flex-col gap-7">
              {t.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-vsky/10 border border-vsky/20 rounded-[10px] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky mb-1">{item.title}</div>
                    <div className="text-[15px] text-vwhite leading-relaxed font-medium">{item.val}</div>
                    <div className="text-[12px] text-vmuted mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}

              <div className="mt-2 text-center sm:text-left">
                <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky mb-2.5">{t.follow}</div>
                <div className="flex justify-center sm:justify-start gap-3 mt-5">
                  {[Twitter, Instagram, Facebook, Youtube].map((Icon, idx) => (
                    <div key={idx} className="w-9 h-9 rounded-[8px] bg-white/[0.06] border border-white/10 flex items-center justify-center cursor-pointer transition-all hover:bg-vsky/15 hover:border-vsky/30 text-vmuted hover:text-vsky">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <div className="bg-vnavy-card border border-vsky/10 rounded-[16px] h-[340px] flex flex-col items-center justify-center gap-3.5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-vsky/[0.02] mix-blend-overlay group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="animate-bounce mb-2">
                  <MapPin className="w-12 h-[52px] text-vsky drop-shadow-[0_0_12px_rgba(0,174,239,0.4)]" />
                </div>
                <div className="font-bebas text-2xl text-vwhite tracking-[2px]">{t.mapLabel}</div>
                <div className="font-barlow-condensed text-[13px] text-vmuted">{t.mapSub}</div>
                <div className="font-barlow-condensed text-[11px] text-vsky/60 tracking-[1px] mt-1">{t.mapCoords}</div>
                <button className="mt-4 bg-[rgba(0,174,239,0.12)] border border-[rgba(0,174,239,0.4)] text-vsky px-6 py-2.5 rounded-[8px] font-barlow-condensed font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-vsky/20 transition-all">
                  {t.mapBtn}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}