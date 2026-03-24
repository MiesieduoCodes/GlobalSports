"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Trophy, Star, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Club Achievements",
    heroTitle: "Glory & ",
    heroTitleAccent: "Awards",
    sub: "A legacy forged in gold. Our record of excellence across all competitions.",
    honors: [
      { year: "2025", title: "Kazakhstan Cup Winners", category: "Major Trophy", desc: "A historic night at Central Stadium as Veria FC claimed their first major title.", icon: <Trophy className="w-6 h-6 text-vgold" /> },
      { year: "2024", title: "KPL Fair Play Award", category: "Sportsmanship", desc: "Recognized for maintaining the highest standards of conduct throughout the season.", icon: <Award className="w-6 h-6 text-vsky" /> },
      { year: "2024", title: "Academy Excellence", category: "Youth", desc: "Awarded to Veria Sport Academy for outstanding youth development infrastructure.", icon: <Star className="w-6 h-6 text-vgold" /> },
      { year: "2023", title: "Best New Club", category: "Innovation", desc: "KPL recognition for the most impactful entrance of a new institution.", icon: <Medal className="w-6 h-6 text-vsky" /> }
    ]
  },
  ru: {
    heroEyebrow: "Достижения Клуба",
    heroTitle: "Слава и ",
    heroTitleAccent: "Награды",
    sub: "Наследие, выкованное в золоте. Наша история успеха во всех турнирах.",
    honors: [
      { year: "2025", title: "Обладатели Кубка Казахстана", category: "Главный Трофей", desc: "Историческая ночь на Центральном Стадионе.", icon: <Trophy className="w-6 h-6 text-vgold" /> },
      { year: "2024", title: "Награда Fair Play КПЛ", category: "Спортивное поведение", desc: "Признание за соблюдение высочайших стандартов поведения.", icon: <Award className="w-6 h-6 text-vsky" /> },
      { year: "2024", title: "Превосходство Академии", category: "Молодежь", desc: "Награда Академии Veria Sport за инфраструктуру.", icon: <Star className="w-6 h-6 text-vgold" /> },
      { year: "2023", title: "Лучший Новый Клуб", category: "Инновации", desc: "Признание КПЛ за самый яркий дебют нового клуба.", icon: <Medal className="w-6 h-6 text-vsky" /> }
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
