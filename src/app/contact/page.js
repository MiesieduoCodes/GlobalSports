"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Mail, Phone, MapPin, Clock, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

const translations = {
  en: {
    heroEyebrow: "Find Us",
    heroTitle: "Our ",
    heroTitleAccent: "Address",
    items: [
      {
        title: "Stadium Address",
        val: <>Центральный Стадион<br />Central Stadium, Almaty</>,
        sub: "Kazakhstan · 050010",
        icon: <MapPin className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Club Office",
        val: "+7 (727) 000-0000",
        sub: "Mon–Fri · 09:00–18:00 (ALMT)",
        icon: <Phone className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Email",
        val: "info@veriafc.kz",
        sub: "Tickets: tickets@veriafc.kz",
        icon: <Mail className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Match Day Gates",
        val: "Open 2 hours before kick-off",
        sub: "All stands · Family zone available",
        icon: <Clock className="w-[18px] h-[18px] text-vgold" />
      }
    ],
    follow: "Follow The Club",
    mapLabel: "Central Stadium",
    mapSub: "Almaty, Kazakhstan",
    mapCoords: "43.2220° N, 76.8512° E",
    mapBtn: "Open in Maps"
  },
  ru: {
    heroEyebrow: "Найти Нас",
    heroTitle: "Наш ",
    heroTitleAccent: "Адрес",
    items: [
      {
        title: "Адрес Стадиона",
        val: <>Центральный Стадион<br />Central Stadium, Алматы</>,
        sub: "Казахстан · 050010",
        icon: <MapPin className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Офис Клуба",
        val: "+7 (727) 000-0000",
        sub: "Пн–Пт · 09:00–18:00 (ALMT)",
        icon: <Phone className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Email",
        val: "info@veriafc.kz",
        sub: "Билеты: tickets@veriafc.kz",
        icon: <Mail className="w-[18px] h-[18px] text-vsky" />
      },
      {
        title: "Ворота в день матча",
        val: "Открываются за 2 часа",
        sub: "Все трибуны · Семейная зона",
        icon: <Clock className="w-[18px] h-[18px] text-vgold" />
      }
    ],
    follow: "Следите за нами",
    mapLabel: "Центральный Стадион",
    mapSub: "Алматы, Казахстан",
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
          <h1 className="section-heading">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>

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