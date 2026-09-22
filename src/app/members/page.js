"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Ticket, Percent, Users2 } from "lucide-react";
import Link from "next/link";

const translations = {
  en: {
    heroEyebrow: "Members",
    heroTitle: "Your membership card, ",
    heroTitleAccent: "with you every matchday.",
    heroSub: "Join the club and follow every match with the people who make VE-GlobalSportFC what it is — early access to fixtures, member pricing, and a closer seat to a club still writing its story.",
    perks: [
      { title: "Early Access", desc: "First look at fixture announcements and matchday ticket allocations, ahead of general sale.", icon: <Ticket className="w-5 h-5 text-vgold" /> },
      { title: "Member Pricing", desc: "Preferential rates on matchday tickets and club merchandise throughout the season.", icon: <Percent className="w-5 h-5 text-vsky" /> },
      { title: "Closer to the Club", desc: "Member-only updates and a closer seat to a club still writing its story.", icon: <Users2 className="w-5 h-5 text-vgold" /> }
    ],
    cta: "Become a Member"
  },
  ru: {
    heroEyebrow: "Участники",
    heroTitle: "Ваша карта участника — ",
    heroTitleAccent: "с вами в каждый матчдей.",
    heroSub: "Присоединяйтесь к клубу и следите за каждым матчем вместе с теми, кто делает VE-GlobalSportFC тем, чем он является — ранний доступ к матчам, цены для участников и место ближе к клубу.",
    perks: [
      { title: "Ранний доступ", desc: "Первыми узнавайте о расписании матчей и распределении билетов до начала общих продаж.", icon: <Ticket className="w-5 h-5 text-vgold" /> },
      { title: "Цены для участников", desc: "Льготные цены на билеты и клубную атрибутику в течение всего сезона.", icon: <Percent className="w-5 h-5 text-vsky" /> },
      { title: "Ближе к клубу", desc: "Эксклюзивные новости и более близкое место в истории, которую клуб продолжает писать.", icon: <Users2 className="w-5 h-5 text-vgold" /> }
    ],
    cta: "Стать участником"
  }
};

export default function MembersPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">

      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-4 max-w-[760px]">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub max-w-[600px] mb-8">{t.heroSub}</p>
          <Link href="/contact" className="inline-block bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3.5 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.cta}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.perks.map((p, i) => (
            <div key={i} className="bg-vnavy-card border border-white/5 rounded-[16px] p-8 hover:border-vgold/30 transition-all">
              <div className="w-12 h-12 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3">{p.title}</h3>
              <p className="font-barlow text-vmuted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
