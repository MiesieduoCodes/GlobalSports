"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Heart, Globe, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Veria for All",
    heroTitle: "Our ",
    heroTitleAccent: "Foundation",
    sub: "Football is for everyone. Our mission is to use the game to drive social change and empower the youth of Kazakhstan.",
    missionTitle: "The Mission",
    missionSub: "Inclusivity, Education, and Development.",
    pillars: [
      { title: "Inclusive Football", desc: "Ensuring children of all backgrounds have access to elite training.", icon: <Heart className="w-5 h-5 text-vsky" /> },
      { title: "Community Reach", desc: "Bringing football clinics to remote regions of Kazakhstan.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { title: "Youth Mentorship", desc: "Providing educational support alongside athletic development.", icon: <Users className="w-5 h-5 text-vsky" /> }
    ]
  },
  ru: {
    heroEyebrow: "ВЕ-ГЛОБАЛСПОРТС для всех",
    heroTitle: "Наш ",
    heroTitleAccent: "Фонд",
    sub: "Футбол — для каждого. Наша миссия — использовать игру для социальных изменений.",
    missionTitle: "Миссия",
    missionSub: "Инклюзивность, образование и развитие.",
    pillars: [
      { title: "Инклюзивный футбол", desc: "Доступ к обучению для всех детей.", icon: <Heart className="w-5 h-5 text-vsky" /> },
      { title: "Охват сообщества", desc: "Футбольные клиники в отдаленных регионах.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { title: "Молодежное наставничество", desc: "Образовательная поддержка атлетов.", icon: <Users className="w-5 h-5 text-vsky" /> }
    ]
  }
};

export default function ForAllPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden text-center">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mt-4">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub mx-auto">{t.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading text-4xl mb-3">{t.missionTitle}</h2>
            <p className="text-vsky font-barlow-condensed tracking-[2px] uppercase font-bold text-sm">{t.missionSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.pillars.map((p, i) => (
              <div key={i} className="bg-vnavy-card border border-white/5 rounded-[20px] p-8 hover:border-vgold/30 transition-all group">
                <div className="w-12 h-12 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center mb-6">
                  {p.icon}
                </div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3 group-hover:text-vgold transition-colors">{p.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
