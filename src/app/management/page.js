"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import LineupPitch, { BenchPlayer } from "@/app/components/LineupPitch";

const translations = {
  en: {
    heroEyebrow: "Club Structure",
    heroTitle: "The people running ",
    heroTitleAccent: "VE-GlobalSportFC.",
    heroSub: "Every player pathway, every transfer conversation, every matchday decision runs through this group.",
    structure: [
      {
        role: "President & Chairman",
        name: "Veria Lawrence Ebiks",
        initials: "VE",
        image: "/images/IMG-20260324-WA0048.jpg-removebg-preview.png",
        bio: "The driving force behind VE-GlobalSportFC, Veria Lawrence Ebiks founded the club with a singular conviction: that world-class football could and should thrive in Almaty, Kazakhstan."
      },
      {
        role: "Head Coach",
        name: "Bernard Cyriaque Erokotan",
        initials: "BE",
        bio: "Leads the first team's tactical identity and matchday preparation — building a squad that competes with discipline over talent alone."
      },
      {
        role: "Sporting Director",
        name: "Ontanwa Louis",
        initials: "OL",
        image: "/images/IMG_3656.JPG-removebg-preview.png",
        bio: "Responsible for the club's technical structure — from first team to academy — building a cohesive playing identity that demands intensity, intelligence and creativity."
      },
      {
        role: "Assistant Coach",
        name: "Sunday Jerimoyamoh",
        initials: "SJ",
        bio: "Supports the Head Coach on training design, opposition analysis and player development across the first-team squad."
      },
      {
        role: "Business Development Manager",
        name: "Audu Emmanuel Kaz",
        initials: "AK",
        bio: "Leads the club's commercial strategy — forging partnerships and growing VE-GlobalSportFC's brand across Central Asia and beyond."
      },
      {
        role: "Strategic Manager",
        name: "Bariy A Sanusi",
        initials: "BS",
        image: "/images/IMG-20260324-WA0050.jpg",
        bio: "Translates the founder's vision into actionable long-term plans and growth roadmaps for the club."
      }
    ],
    lineupEyebrow: "Matchday Lineup",
    lineupTitle: "The XI, however we set up.",
    lineupSub: "A live template for the confirmed starting eleven and bench — updated per fixture from the official team sheet. Formation below is illustrative.",
    subsTitle: "Substitutes",
    staffTitle: "Coaching Staff",
    staff: [
      "Bernard Cyriaque Erokotan — Head Coach",
      "Sunday Jerimoyamoh — Assistant Coach"
    ]
  },
  ru: {
    heroEyebrow: "Структура клуба",
    heroTitle: "Люди, управляющие ",
    heroTitleAccent: "VE-GlobalSportFC.",
    heroSub: "Каждый путь игрока, каждые трансферные переговоры, каждое решение в день матча проходят через эту группу.",
    structure: [
      { role: "Президент и председатель", name: "Верия Лоуренс Эбикс", initials: "VE", image: "/images/IMG-20260324-WA0048.jpg-removebg-preview.png", bio: "Движущая сила VE-GlobalSportFC, Верия Лоуренс Эбикс основал клуб с твёрдым убеждением, что футбол мирового класса может и должен процветать в Алматы." },
      { role: "Главный тренер", name: "Бернард Сириак Эрокотан", initials: "BE", bio: "Отвечает за тактическую подготовку первой команды и подготовку к матчам." },
      { role: "Спортивный директор", name: "Онтанва Луис", initials: "OL", image: "/images/IMG_3656.JPG-removebg-preview.png", bio: "Отвечает за техническую структуру клуба — от первой команды до академии." },
      { role: "Тренер-ассистент", name: "Санди Джеримойамо", initials: "SJ", bio: "Поддерживает главного тренера в подготовке тренировок и анализе соперников." },
      { role: "Менеджер по развитию бизнеса", name: "Ауду Эммануэль Каз", initials: "AK", bio: "Руководит коммерческой стратегией клуба и развитием бренда." },
      { role: "Стратегический менеджер", name: "Барий А Сануси", initials: "BS", image: "/images/IMG-20260324-WA0050.jpg", bio: "Переводит видение основателя в конкретные долгосрочные планы." }
    ],
    lineupEyebrow: "Состав на матч",
    lineupTitle: "Стартовый состав — как бы мы ни играли.",
    lineupSub: "Живой шаблон стартового состава и скамейки запасных — обновляется по протоколу матча. Формация ниже приведена для примера.",
    subsTitle: "Запасные",
    staffTitle: "Тренерский штаб",
    staff: [
      "Бернард Сириак Эрокотан — Главный тренер",
      "Санди Джеримойамо — Тренер-ассистент"
    ]
  }
};

// Illustrative 4-3-3 — shirt numbers resolve to the squad roster.
// x: 0..100 across the pitch (left -> right when attacking up), y: 0..100 from our goal line.
const LINEUP = {
  formation: "4-3-3",
  starters: [
    { num: 45, pos: "GK", x: 50, y: 4 },
    { num: 14, pos: "LB", x: 14, y: 30 },
    { num: 20, pos: "CB", x: 37, y: 23 },
    { num: 3, pos: "CB", x: 63, y: 23 },
    { num: 2, pos: "RB", x: 86, y: 30 },
    { num: 5, pos: "CDM", x: 50, y: 43 },
    { num: 18, pos: "CM", x: 27, y: 58 },
    { num: 4, pos: "CM", x: 73, y: 58 },
    { num: 7, pos: "LW", x: 16, y: 80 },
    { num: 16, pos: "ST", x: 50, y: 88 },
    { num: 10, pos: "RW", x: 84, y: 80 }
  ],
  subs: [
    { num: 55, pos: "GK" },
    { num: 29, pos: "RB" },
    { num: 9, pos: "MF" },
    { num: 11, pos: "W" },
    { num: 28, pos: "ST" }
  ]
};

export default function ManagementPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">

      {/* Hero */}
      <section className="relative pt-[140px] pb-[60px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden">
        <div className="kz-grid opacity-[0.025]" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-4 max-w-[800px]">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub max-w-[600px]">{t.heroSub}</p>
        </div>
      </section>

      {/* Club Structure */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.structure.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-vnavy-card border border-white/5 rounded-[16px] overflow-hidden group hover:border-vgold/30 transition-all"
            >
              <div className="h-40 bg-vnavy flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-vgold/10 to-transparent opacity-30" />
                <div className="w-20 h-20 rounded-full border-2 border-vgold/30 flex items-center justify-center font-bebas text-2xl text-vgold bg-vgold/5 z-10 overflow-hidden group-hover:scale-110 transition-transform">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    p.initials
                  )}
                </div>
              </div>
              <div className="p-7 text-center">
                <div className="font-barlow-condensed font-bold text-[11px] tracking-[2.5px] uppercase text-vsky mb-2">{p.role}</div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3">{p.name}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{p.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Matchday Lineup */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.lineupEyebrow}</span>
          <h2 className="section-heading mb-4">{t.lineupTitle}</h2>
          <p className="section-sub mb-12">{t.lineupSub}</p>

          <LineupPitch formation={LINEUP.formation} starters={LINEUP.starters} language={language} />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-10">
            <div>
              <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky mb-4">{t.subsTitle}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {LINEUP.subs.map((s) => (
                  <BenchPlayer key={s.num} num={s.num} pos={s.pos} language={language} />
                ))}
              </div>
            </div>
            <div>
              <div className="font-barlow-condensed font-bold text-[11px] tracking-[2px] uppercase text-vsky mb-4">{t.staffTitle}</div>
              <div className="flex flex-col gap-2">
                {t.staff.map((s, i) => (
                  <div key={i} className="bg-vnavy-card border border-white/5 rounded-[8px] px-4 py-3 text-sm font-barlow-condensed text-vwhite">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
