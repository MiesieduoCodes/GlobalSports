"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Users, GraduationCap, Trophy, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Youth Development",
    heroTitle: "Veria Sport ",
    heroTitleAccent: "Academy",
    sub: "Nurturing the next generation of Kazakh footballers. Based at Central Stadium with UEFA-licensed coaching.",
    groupsTitle: "Age-Group Programmes",
    groups: [
      { range: "U8 – U10", title: "Foundation Stage", desc: "Focus on technical fundamentals and joy of play.", icon: <Users className="w-5 h-5 text-vsky" /> },
      { range: "U12 – U15", title: "Development Stage", desc: "Tactical positioning and physical conditioning.", icon: <GraduationCap className="w-5 h-5 text-vgold" /> },
      { range: "U17 – U19", title: "Performance Stage", desc: "Elite preparation for professional football.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ],
    enrollTitle: "Enroll Your Child",
    btn: "Submit Application"
  },
  ru: {
    heroEyebrow: "Развитие молодежи",
    heroTitle: "Академия ",
    heroTitleAccent: "Veria Sport",
    sub: "Воспитание следующего поколения казахстанских футболистов. Профессиональные тренеры категории UEFA.",
    groupsTitle: "Возрастные Группы",
    groups: [
      { range: "U8 – U10", title: "Базовый этап", desc: "Фокус на технических основах и радости игры.", icon: <Users className="w-5 h-5 text-vsky" /> },
      { range: "U12 – U15", title: "Этап развития", desc: "Тактическое позиционирование и физическая подготовка.", icon: <GraduationCap className="w-5 h-5 text-vgold" /> },
      { range: "U17 – U19", title: "Этап мастерства", desc: "Элитная подготовка к профессиональному футболу.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ],
    enrollTitle: "Записать ребенка",
    btn: "Отправить заявку"
  }
};

export default function KidsCamp() {
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
          <h2 className="section-heading mb-12 text-center">{t.groupsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.groups.map((g, i) => (
              <div key={i} className="bg-vnavy-card border border-white/5 rounded-[20px] p-8 hover:border-vsky/30 transition-all group">
                <div className="w-12 h-12 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center mb-6">
                  {g.icon}
                </div>
                <div className="font-bebas text-vgold text-xl tracking-[1px] mb-2">{g.range}</div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3 group-hover:text-vgold transition-colors">{g.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-vnavy-mid">
        <div className="max-w-[800px] mx-auto bg-vnavy border border-vgold/10 p-10 rounded-[24px] shadow-2xl">
          <h2 className="font-bebas text-4xl text-vwhite tracking-[2px] mb-8 text-center">{t.enrollTitle}</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Parent Name" className="bg-vnavy-card border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
            <input type="email" placeholder="Email Address" className="bg-vnavy-card border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
            <input type="text" placeholder="Child Name" className="bg-vnavy-card border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
            <input type="text" placeholder="Age Group" className="bg-vnavy-card border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
            <button className="md:col-span-2 bg-vgold text-vnavy font-barlow-condensed font-bold text-[14px] tracking-[2px] uppercase py-4 rounded-[8px] hover:bg-vgold-light transition-all">
              {t.btn}
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}