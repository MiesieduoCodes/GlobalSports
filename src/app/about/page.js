"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import GalleryBento from "@/app/components/GalleryBento";

const translations = {
  en: {
    heroEyebrow: "Our Story",
    heroTitle: "Founded 2017. Still early. ",
    heroTitleAccent: "Already moving.",
    story: [
      "VE-GlobalSportFC was founded in Almaty by Veria Lawrence Ebiks with a specific bet: that Kazakhstani football had more talent than infrastructure, and that a club willing to build the infrastructure properly — coaching, pathways, contracts, international relationships — would outgrow clubs that only focused on this season's results.",
      "Every player CV, every academy trial, every transfer conversation with clubs abroad is part of the same long build. We're not finished. We're not trying to be, yet."
    ],
    visionTitle: "Our Vision",
    visionBody: "To become the football organisation Kazakhstan is measured against — and one of the first names Central Asian talent thinks of when they think \"professional pathway.\"",
    missionTitle: "Our Mission",
    missionBody: "Develop players properly. Compete with integrity. Build a structure that outlasts any single season, coach, or squad.",
    pillarsTitle: "Six things we don't compromise on.",
    pillarsEyebrow: "Our Values",
    pillars: [
      { title: "Discipline", desc: "Talent without it goes nowhere. We've seen it happen elsewhere." },
      { title: "Development", desc: "Players, coaches, staff — everyone here is still improving, including at the top." },
      { title: "Teamwork", desc: "No individual result matters more than the collective one." },
      { title: "Respect", desc: "For opponents, for officials, for the game, for each other." },
      { title: "Ambition", desc: "We set targets that make people uncomfortable, on purpose." },
      { title: "Opportunity", desc: "A club in Almaty should be able to produce a player who plays in Europe. We intend to prove it." }
    ],
    managementCta: "Meet the people running the club",
    managementLink: "See Management"
  },
  ru: {
    heroEyebrow: "Наша История",
    heroTitle: "Основан в 2017. Всё ещё рано. ",
    heroTitleAccent: "Уже в движении.",
    story: [
      "VE-GlobalSportFC был основан в Алматы Верией Лоуренсом Эбиксом с конкретной ставкой: в казахстанском футболе больше таланта, чем инфраструктуры, и клуб, готовый построить эту инфраструктуру правильно — тренерский состав, пути развития, контракты, международные связи — перерастёт клубы, сосредоточенные только на результатах текущего сезона.",
      "Каждое резюме игрока, каждый просмотр в академии, каждые переговоры о трансфере с клубами за рубежом — часть одного долгого пути. Мы ещё не закончили. И пока не стремимся к этому."
    ],
    visionTitle: "Наше видение",
    visionBody: "Стать футбольной организацией, с которой сравнивают Казахстан — и одним из первых имён, о которых думают таланты Центральной Азии, когда речь заходит о «профессиональном пути».",
    missionTitle: "Наша миссия",
    missionBody: "Правильно развивать игроков. Соревноваться честно. Строить структуру, которая переживёт любой отдельный сезон, тренера или состав.",
    pillarsTitle: "Шесть вещей, в которых мы не идём на компромисс.",
    pillarsEyebrow: "Наши ценности",
    pillars: [
      { title: "Дисциплина", desc: "Талант без неё никуда не ведёт. Мы видели это на примере других." },
      { title: "Развитие", desc: "Игроки, тренеры, персонал — все здесь продолжают расти, включая руководство." },
      { title: "Командная работа", desc: "Ни один индивидуальный результат не важнее общего." },
      { title: "Уважение", desc: "К соперникам, к судьям, к игре, друг к другу." },
      { title: "Амбиции", desc: "Мы ставим цели, которые вызывают дискомфорт — намеренно." },
      { title: "Возможности", desc: "Клуб из Алматы должен уметь вырастить игрока, который заиграет в Европе. Мы намерены это доказать." }
    ],
    managementCta: "Познакомьтесь с руководством клуба",
    managementLink: "Руководство клуба"
  }
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] overflow-hidden bg-vnavy-mid">
        <div className="kz-grid opacity-[0.025]" />
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-bebas text-[200px] text-vwhite/[0.02] tracking-[10px] pointer-events-none hidden lg:block">ABOUT</div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start relative z-10">
          <div>
            <span className="section-eyebrow">{t.heroEyebrow}</span>
            <h1 className="section-heading mb-6">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
            <div className="space-y-4 font-barlow text-vmuted text-lg leading-relaxed font-light">
              {t.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:pt-[52px]">
            <div className="bg-vnavy-card border-l-2 border-vsky rounded-[10px] p-6">
              <h3 className="font-bebas text-xl text-vwhite tracking-[1px] mb-2">{t.visionTitle}</h3>
              <p className="text-vmuted text-sm leading-relaxed font-light">{t.visionBody}</p>
            </div>
            <div className="bg-vnavy-card border-l-2 border-vgold rounded-[10px] p-6">
              <h3 className="font-bebas text-xl text-vwhite tracking-[1px] mb-2">{t.missionTitle}</h3>
              <p className="text-vmuted text-sm leading-relaxed font-light">{t.missionBody}</p>
            </div>
          </div>
        </div>
      </section>

      <GalleryBento language={language} />

      {/* Values Section */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.pillarsEyebrow}</span>
          <h2 className="section-heading mb-12 max-w-[700px]">{t.pillarsTitle}</h2>

          <div className="flex flex-col">
            {t.pillars.map((p, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-8 py-6 border-b border-white/5">
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px]">{p.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Management CTA */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto bg-vnavy-card border border-white/5 rounded-[16px] p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-bebas text-2xl text-vwhite tracking-[1px] text-center sm:text-left">{t.managementCta}</p>
          <Link href="/management" className="shrink-0 bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.managementLink}
          </Link>
        </div>
      </section>

    </main>
  );
}