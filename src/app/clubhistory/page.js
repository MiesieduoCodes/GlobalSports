"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Flag, Shield, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Our Legacy",
    heroTitle: "Club ",
    heroTitleAccent: "History",
    sub: "Founded by Veria Lawrence Ebiks in 2017, VE-GlobalSportFC was built to turn Almaty into a city that exports football talent — not just imports foreign coaches.",
    timeline: [
      { year: "2017", title: "The Foundation", desc: "Veria Lawrence Ebiks founds VE-GlobalSportFC in Almaty, betting that Kazakhstani football had more talent than infrastructure.", icon: <Flag className="w-5 h-5 text-vsky" /> },
      { year: "2018–2023", title: "Building The Pathway", desc: "The academy pathway takes shape from U8 to U19, and the first team's coaching structure and squad are built out.", icon: <Shield className="w-5 h-5 text-vgold" /> },
      { year: "2024", title: "First International Conversations", desc: "The club moves players into transfer conversations with clubs in Croatia — the first deliberate step from Central Asia into Europe.", icon: <Globe className="w-5 h-5 text-vsky" /> },
      { year: "2025/26", title: "Best-Ever League Finish", desc: "2nd place in Almaty League A — 14 wins, 5 draws, 3 losses, 47 points. The best finish in the club's history so far, and not the ceiling.", icon: <TrendingUp className="w-5 h-5 text-vgold" /> }
    ]
  },
  ru: {
    heroEyebrow: "Наше Наследие",
    heroTitle: "История ",
    heroTitleAccent: "Клуба",
    sub: "Основанный Верией Лоуренсом Эбиксом в 2017 году, VE-GlobalSportFC создавался, чтобы превратить Алматы в город, экспортирующий футбольный талант.",
    timeline: [
      { year: "2017", title: "Основание", desc: "Верия Лоуренс Эбикс основывает VE-GlobalSportFC в Алматы, делая ставку на то, что в казахстанском футболе больше таланта, чем инфраструктуры.", icon: <Flag className="w-5 h-5 text-vsky" /> },
      { year: "2018–2023", title: "Строительство пути", desc: "Формируется академический путь от U8 до U19, выстраивается тренерская структура и состав первой команды.", icon: <Shield className="w-5 h-5 text-vgold" /> },
      { year: "2024", title: "Первые международные переговоры", desc: "Клуб выходит на трансферные переговоры с клубами Хорватии — первый осознанный шаг из Центральной Азии в Европу.", icon: <Globe className="w-5 h-5 text-vsky" /> },
      { year: "2025/26", title: "Лучший результат в истории", desc: "2-е место в Алматинской лиге A — 14 побед, 5 ничьих, 3 поражения, 47 очков. Лучший результат в истории клуба на сегодня — и не предел.", icon: <TrendingUp className="w-5 h-5 text-vgold" /> }
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
          <h1 className="section-heading mt-4">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
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
