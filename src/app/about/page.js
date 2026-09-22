"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { X } from "lucide-react";
import Link from "next/link";

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
  const [selectedImage, setSelectedImage] = useState(null);

  // Carousel images
  const carouselImages = [
    "/carousel/WhatsApp Image 2026-05-12 at 12.29.43 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.29.55 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.34 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.35 AM (1).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.35 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.36 AM (1).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.36 AM (2).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.36 AM (3).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.36 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.37 AM (1).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.37 AM (2).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.37 AM (3).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.37 AM (4).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.37 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.38 AM (1).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.38 AM (2).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.38 AM (3).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.38 AM (4).jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.38 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.39 AM.jpeg",
    "/carousel/WhatsApp Image 2026-05-12 at 12.35.36 AM (1).jpeg"
  ];

  // Shuffle array function for random positioning
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get shuffled images for bento grid (using first 12 for better layout)
  const shuffledImages = shuffleArray(carouselImages).slice(0, 12);

  // Bento grid layout configuration
  const bentoLayout = [
    { span: "col-span-2 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-2 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-2 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-2 row-span-1" },
    { span: "col-span-1 row-span-1" }
  ];

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

      {/* Bento Grid Gallery Section */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">Gallery</span>
          <h2 className="section-heading mb-12">Club Moments</h2>

          <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
            {shuffledImages.map((image, index) => (
              <motion.div
                key={`${image}-${index}`}
                className={`${bentoLayout[index].span} relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-vgold/30 transition-all duration-300 group cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vnavy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-vnavy/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-vnavy/80 backdrop-blur-sm text-vwhite hover:text-vgold transition-colors p-3 rounded-full border border-[rgba(255,255,255,0.1)] hover:border-vgold/30"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Full screen gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

    </main>
  );
}