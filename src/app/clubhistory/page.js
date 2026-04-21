"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { History, Shield, Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Our Legacy",
    heroTitle: "Club ",
    heroTitleAccent: "History",
    sub: "Founded by Veria Lawrence Ebiks, VE-GLOBALSPORTS FC was built on a vision to revolutionise football in Almaty, Kazakhstan.",
    timeline: [
      { year: "2023", title: "The Foundation", desc: "Veria Lawrence Ebiks establishes VE-GLOBALSPORTS FC in Almaty, setting the groundwork for a world-class institution.", icon: <Shield className="w-5 h-5 text-vsky" /> },
      { year: "2024", title: "KPL Entrance", desc: "The club makes its debut in the Kazakhstan Premier League, instantly becoming a symbol of Almaty's ambition.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { year: "2025", title: "First Silverware", desc: "A historic victory in the Kazakhstan Cup marks the beginning of a golden era for the club.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ]
  },
  ru: {
    heroEyebrow: "Наше Наследие",
    heroTitle: "История ",
    heroTitleAccent: "Клуба",
    sub: "Основанный Верией Лоуренсом Эбиксом, ВЕ-ГЛОБАЛСПОРТС ФК был создан с видением революции в футболе Алматы.",
    timeline: [
      { year: "2023", title: "Основание", desc: "Верия Лоуренс Эбикс основывает ВЕ-ГЛОБАЛСПОРТС ФК в Алматы.", icon: <Shield className="w-5 h-5 text-vsky" /> },
      { year: "2024", title: "Вход в КПЛ", desc: "Дебют клуба в Премьер-лиге Казахстана.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { year: "2025", title: "Первый Трофей", desc: "Историческая победа в Кубке Казахстана.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ]
  }
};

export default function ClubHistoryPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden text-center">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mt-4">{t.title}<span className="text-vgold">{t.titleAccent}</span></h1>
          <p className="section-sub mx-auto">{t.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1000px] mx-auto relative">
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2" />

          <div className="space-y-16">
            {t.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-left md:text-right px-12 md:px-0">
                  {i % 2 !== 0 && (
                    <>
                      <div className="font-bebas text-4xl text-vgold tracking-[2px] mb-2">{item.year}</div>
                      <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3">{item.title}</h3>
                      <p className="font-barlow text-vmuted text-sm leading-relaxed max-w-[400px] ml-auto">{item.desc}</p>
                    </>
                  )}
                  {i % 2 === 0 && (
                    <>
                      <div className="font-bebas text-4xl text-vgold tracking-[2px] mb-2">{item.year}</div>
                      <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3">{item.title}</h3>
                      <p className="font-barlow text-vmuted text-sm leading-relaxed max-w-[400px]">{item.desc}</p>
                    </>
                  )}
                </div>
                <div className="w-16 h-16 rounded-full bg-vnavy border border-vgold/20 flex items-center justify-center relative z-10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}