"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Trophy, Star, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Club Achievements",
    heroTitle: "Progress & ",
    heroTitleAccent: "Recognition",
    sub: "We're not finished, and we're not trying to be — yet. Here's the record so far.",
    honors: [
      { year: "2025/26", title: "Best-Ever League Finish — 2nd Place", category: "Almaty League A", desc: "14 wins, 5 draws, 3 losses, 47 points — the best finish in the club's history so far, and not the ceiling.", icon: <Trophy className="w-6 h-6 text-vgold" /> },
      { year: "2024", title: "First International Transfer Talks", category: "Global Pathway", desc: "Players moved into transfer conversations with clubs in Croatia — the first deliberate step from Central Asia into Europe.", icon: <Award className="w-6 h-6 text-vsky" /> },
      { year: "2017–", title: "Academy Pathway, U8 to U19", category: "Youth Development", desc: "A structured pipeline from first touch to first professional trial, built to outlast any single season, coach, or squad.", icon: <Star className="w-6 h-6 text-vgold" /> },
      { year: "2017", title: "Club Founded in Almaty", category: "Foundation", desc: "Founded by Veria Lawrence Ebiks on a specific bet: Kazakhstani football had more talent than infrastructure.", icon: <Medal className="w-6 h-6 text-vsky" /> }
    ]
  },
  ru: {
    heroEyebrow: "Достижения Клуба",
    heroTitle: "Прогресс и ",
    heroTitleAccent: "Признание",
    sub: "Мы ещё не закончили — и пока не стремимся к этому. Вот наш путь на сегодня.",
    honors: [
      { year: "2025/26", title: "Лучший результат в истории — 2-е место", category: "Алматинская лига A", desc: "14 побед, 5 ничьих, 3 поражения, 47 очков — лучший результат в истории клуба на сегодня, и не предел.", icon: <Trophy className="w-6 h-6 text-vgold" /> },
      { year: "2024", title: "Первые международные трансферные переговоры", category: "Глобальный путь", desc: "Игроки вышли на трансферные переговоры с клубами Хорватии — первый шаг из Центральной Азии в Европу.", icon: <Award className="w-6 h-6 text-vsky" /> },
      { year: "2017–", title: "Академический путь, от U8 до U19", category: "Развитие молодежи", desc: "Структурированный путь от первого касания мяча до первого профессионального просмотра.", icon: <Star className="w-6 h-6 text-vgold" /> },
      { year: "2017", title: "Основание клуба в Алматы", category: "Основание", desc: "Основан Верией Лоуренсом Эбиксом на конкретной ставке: в казахстанском футболе больше таланта, чем инфраструктуры.", icon: <Medal className="w-6 h-6 text-vsky" /> }
    ]
  }
};

export default function AwardsPage() {
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
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.honors.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-vnavy-card border border-white/5 rounded-[20px] p-8 hover:border-vgold/30 transition-all group flex gap-6"
            >
              <div className="w-16 h-16 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {h.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bebas text-vgold text-xl tracking-[1px]">{h.year}</span>
                  <span className="w-1 h-4 bg-white/10 rounded-full" />
                  <span className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky">{h.category}</span>
                </div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3 group-hover:text-vgold transition-colors">{h.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
