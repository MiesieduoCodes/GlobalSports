"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Shield, Target, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Technical Leadership",
    heroTitle: "Elite ",
    heroTitleAccent: "Coaching",
    sub: "UEFA-licensed professionals dedicated to the tactical and physical development of Veria FC players.",
    coaches: [
      { name: "Otanwa Louis", role: "Technical Director", initials: "OL", bio: "Leading the club's long-term technical vision and first-team methodology." },
      { name: "S. Nurlan", role: "Head Coach", initials: "SN", bio: "Former national player with deep tactical expertise in modern positional play." },
      { name: "V. Petrov", role: "First Team Coach", initials: "VP", bio: "Specializing in high-intensity training regimes and player conditioning." }
    ]
  },
  ru: {
    heroEyebrow: "Техническое руководство",
    heroTitle: "Элитный ",
    heroTitleAccent: "Тренинг",
    sub: "Профессионалы с лицензиями UEFA, посвятившие себя тактическому развитию игроков Верия ФК.",
    coaches: [
      { name: "Отанва Луис", role: "Технический директор", initials: "OL", bio: "Руководит долгосрочным техническим видением клуба." },
      { name: "С. Нурлан", role: "Главный тренер", initials: "SN", bio: "Бывший игрок национальной сборной с глубокой тактической экспертизой." },
      { name: "В. Петров", role: "Тренер первой команды", initials: "VP", bio: "Специализируется на высокоинтенсивных тренировках." }
    ]
  }
};

export default function CoachesPage() {
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
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.coaches.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-vnavy-card border border-white/5 rounded-[20px] overflow-hidden group hover:border-vsky/30 transition-all"
            >
              <div className="h-48 bg-vnavy flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-vsky/10 to-transparent opacity-20" />
                <div className="w-24 h-24 rounded-full border-2 border-vsky/20 flex items-center justify-center font-bebas text-3xl text-vsky bg-vsky/5 z-10 group-hover:scale-110 transition-transform">
                  {c.initials}
                </div>
              </div>
              <div className="p-8 text-center">
                <div className="font-barlow-condensed font-bold text-[11px] tracking-[2.5px] uppercase text-vgold mb-2">{c.role}</div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3 group-hover:text-vsky transition-colors">{c.name}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{c.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}