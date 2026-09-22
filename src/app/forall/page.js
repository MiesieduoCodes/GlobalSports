"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Heart, Globe, Users } from "lucide-react";
import Link from "next/link";

const translations = {
  en: {
    heroEyebrow: "VE-GlobalSportFC For All",
    heroTitle: "Opportunity ",
    heroTitleAccent: "shouldn't depend on your postcode.",
    sub: "A club in Almaty should be able to produce a player who plays in Europe. That starts with making sure every kid gets a real look, not just the ones whose families can already afford it.",
    missionTitle: "The Mission",
    missionSub: "Inclusivity, Education, and Development.",
    pillars: [
      { title: "Inclusive Football", desc: "Ensuring children of all backgrounds have access to the same coaching, not a diluted version of it.", icon: <Heart className="w-5 h-5 text-vsky" /> },
      { title: "Community Reach", desc: "Bringing football clinics and trial days to regions of Kazakhstan a first-team scout wouldn't normally reach.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { title: "Youth Mentorship", desc: "Educational support alongside athletic development — the Academy pathway is about the person, not just the player.", icon: <Users className="w-5 h-5 text-vsky" /> }
    ],
    cta: "Register for a Trial"
  },
  ru: {
    heroEyebrow: "VE-GlobalSportFC для всех",
    heroTitle: "Возможность ",
    heroTitleAccent: "не должна зависеть от района.",
    sub: "Клуб из Алматы должен уметь вырастить игрока, который заиграет в Европе. Это начинается с того, чтобы каждый ребёнок получил настоящий шанс.",
    missionTitle: "Миссия",
    missionSub: "Инклюзивность, образование и развитие.",
    pillars: [
      { title: "Инклюзивный футбол", desc: "Доступ к одинаковому качеству тренировок для детей любого происхождения.", icon: <Heart className="w-5 h-5 text-vsky" /> },
      { title: "Охват сообщества", desc: "Футбольные клиники и дни просмотра в регионах Казахстана, куда скауты обычно не добираются.", icon: <Globe className="w-5 h-5 text-vgold" /> },
      { title: "Молодежное наставничество", desc: "Образовательная поддержка наряду со спортивным развитием — путь Академии касается личности, а не только игрока.", icon: <Users className="w-5 h-5 text-vsky" /> }
    ],
    cta: "Записаться на просмотр"
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
          <h1 className="section-heading mt-4 max-w-[820px] mx-auto">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub mx-auto">{t.sub}</p>
          <Link href="/academy#register" className="inline-block mt-8 bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3.5 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.cta}
          </Link>
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
