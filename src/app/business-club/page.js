"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Briefcase, Camera } from "lucide-react";
import Link from "next/link";

const translations = {
  en: {
    heroEyebrow: "Business Club",
    heroTitle: "A seat at the table, ",
    heroTitleAccent: "not just a logo on the shirt.",
    heroSub: "Our corporate membership programme — built for companies who want direct access to the club: matchday hospitality, brand visibility, and a genuine relationship with a club still shaping its identity in Kazakhstani football.",
    cta: "Join the Business Club",
    pressEyebrow: "Press & Accreditation",
    pressTitle: "Covering the club.",
    pressBody: "Journalists and photographers covering VE-GlobalSportFC matches can apply for accreditation — include outlet name, purpose, and the fixture you're requesting access for.",
    pressCta: "Apply for Accreditation"
  },
  ru: {
    heroEyebrow: "Бизнес-клуб",
    heroTitle: "Место за столом, ",
    heroTitleAccent: "а не просто логотип на футболке.",
    heroSub: "Наша программа корпоративного членства — для компаний, которые хотят прямого доступа к клубу: гостеприимство в дни матчей, видимость бренда и настоящие отношения с клубом, который всё ещё формирует свою идентичность.",
    cta: "Присоединиться к бизнес-клубу",
    pressEyebrow: "Пресса и аккредитация",
    pressTitle: "Освещение клуба.",
    pressBody: "Журналисты и фотографы, освещающие матчи VE-GlobalSportFC, могут подать заявку на аккредитацию — укажите название издания, цель и матч, на который запрашивается доступ.",
    pressCta: "Подать заявку на аккредитацию"
  }
};

export default function BusinessClubPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <main className="bg-vnavy min-h-screen">

      <section className="relative pt-[140px] pb-[80px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-4 max-w-[800px]">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub max-w-[600px] mb-8">{t.heroSub}</p>
          <div className="w-14 h-14 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center mb-8">
            <Briefcase className="w-6 h-6 text-vgold" />
          </div>
          <Link href="/contact" className="inline-block bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3.5 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.cta}
          </Link>
        </div>
      </section>

      <section id="press" className="section scroll-mt-[90px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start bg-vnavy-card border border-white/5 rounded-[16px] p-10">
          <div className="w-14 h-14 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center">
            <Camera className="w-6 h-6 text-vsky" />
          </div>
          <div>
            <span className="section-eyebrow">{t.pressEyebrow}</span>
            <h2 className="font-bebas text-4xl text-vwhite tracking-[1px] mb-3">{t.pressTitle}</h2>
            <p className="text-vmuted leading-relaxed font-light max-w-[560px] mb-6">{t.pressBody}</p>
            <Link href="/contact" className="inline-block border border-white/20 text-vwhite font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:border-vsky hover:text-vsky transition-colors">
              {t.pressCta}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
