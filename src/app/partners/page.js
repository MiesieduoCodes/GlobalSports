"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

const translations = {
  en: {
    heroEyebrow: "Global Network",
    heroTitle: "Club ",
    heroTitleAccent: "Partners",
    sub: "Working with the most prestigious brands in Central Asia and beyond to scale the VE-GLOBALSPORTS FC vision.",
    tiers: [
      { name: "Principal Partners", color: "text-vgold", partners: ["Gold Air", "Almaty Energy", "KazBank"] },
      { name: "Official Partners", color: "text-vsky", partners: ["Steppe Motors", "Sky Logistics", "Mount Vision"] }
    ]
  },
  ru: {
    heroEyebrow: "Глобальная сеть",
    heroTitle: "Партнеры ",
    heroTitleAccent: "Клуба",
    sub: "Работа с самыми престижными брендами в Центральной Азии для масштабирования видения ВЕ-ГЛОБАЛСПОРТС ФК.",
    tiers: [
      { name: "Генеральные партнеры", color: "text-vgold", partners: ["Gold Air", "Almaty Energy", "KazBank"] },
      { name: "Официальные партнеры", color: "text-vsky", partners: ["Steppe Motors", "Sky Logistics", "Mount Vision"] }
    ]
  }
};

export default function PartnersPage() {
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
        <div className="max-w-[1440px] mx-auto space-y-20">
          {t.tiers.map((tier, i) => (
            <div key={i}>
              <div className="text-center mb-12">
                <h2 className={`font-bebas text-3xl tracking-[3px] uppercase ${tier.color}`}>{tier.name}</h2>
                <div className="h-px w-20 bg-white/10 mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tier.partners.map((p, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="h-40 bg-vnavy-card border border-white/5 rounded-[20px] flex items-center justify-center p-8 group hover:border-vgold/30 transition-all"
                  >
                    <span className="font-bebas text-2xl text-vmuted group-hover:text-vwhite group-hover:scale-110 transition-all tracking-[2px]">{p}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
