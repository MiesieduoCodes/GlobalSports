"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { Star, Users, History, ShieldHeader, ChevronRight } from "lucide-react";

const translations = {
  en: {
    heroEyebrow: "Our Story",
    heroTitle: "The Club. ",
    heroTitleAccent: "The Vision.",
    story: [
      "Founded with a bold vision to bring world-class football to the heart of Central Asia, Veria Football Club was established in Almaty, Kazakhstan — a city of mountains, ambition and unstoppable energy.",
      "Under the leadership of founder Veria Lawrence Ebiks, the club has grown from a passionate idea into one of Kazakhstan's most dynamic football institutions, blending elite sporting standards with deep community values.",
      "From the shadow of the Tian Shan mountains, Veria FC rises — building legacy, developing talent, and competing at the highest level the Kazakhstan Premier League has to offer."
    ],
    pillarsTitle: "Club Values",
    pillarsEyebrow: "What We Stand For",
    pillars: [
      {
        title: "Excellence",
        desc: "We pursue the highest standards in every aspect of our game — on the pitch, in the academy, and in the front office. Mediocrity has no home at Veria FC.",
        color: "rgba(200,168,75,0.1)", border: "rgba(200,168,75,0.2)", iconColor: "#C8A84B"
      },
      {
        title: "Community",
        desc: "Rooted in Almaty, we are a club for every Kazakh — from the mountains of the south to the steppes of the north. Football belongs to the people.",
        color: "rgba(0,174,239,0.1)", border: "rgba(0,174,239,0.2)", iconColor: "#00AEEF"
      },
      {
        title: "Legacy",
        desc: "Every match, every player, every season adds another chapter to the story we are writing. We build not just for today, but for generations to come.",
        color: "rgba(200,168,75,0.08)", border: "rgba(200,168,75,0.15)", iconColor: "#C8A84B"
      }
    ],
    leadershipTitle: "Club Leadership",
    leadershipEyebrow: "The People Behind The Club",
    leadershipSub: "A united front of visionary professionals driving Veria FC's ambitions on and off the pitch.",
    leaders: [
      {
        role: "Founder & Chairman",
        name: "Veria Lawrence Ebiks",
        initials: "VLE",
        image: "/images/IMG-20260324-WA0048.jpg",
        bio: "The driving force behind Veria FC, Veria Lawrence Ebiks founded the club with a singular conviction: that world-class football could and should thrive in Almaty, Kazakhstan. His entrepreneurial vision, global perspective and unwavering passion for the beautiful game have shaped every aspect of the club — from its philosophy and identity to its long-term strategic ambitions.",
        isFounder: true
      },
      {
        role: "Technical Director",
        name: "Otanwa Louis",
        initials: "OL",
        bio: "Otanwa Louis brings deep tactical expertise and a modern football philosophy to Veria FC. Responsible for the club's technical structure — from first team to academy — he has built a cohesive playing identity that demands intensity, intelligence and creativity."
      },
      {
        role: "Business Development Manager",
        name: "Kaz",
        initials: "KAZ",
        bio: "Kaz leads Veria FC's commercial strategy — forging partnerships, growing the club's brand across Central Asia and beyond, and building the commercial infrastructure that sustains long-term success."
      },
      {
        role: "Strategic Manager",
        name: "Bariy A Sanusi",
        initials: "BAS",
        image: "/images/IMG-20260324-WA0050.jpg",
        bio: "Bariy A Sanusi serves as the club's Strategic Manager, responsible for translating the founder's vision into actionable long-term plans and growth roadmaps."
      }
    ]
  },
  ru: {
    heroEyebrow: "Наша История",
    heroTitle: "Клуб. ",
    heroTitleAccent: "Видение.",
    story: [
      "Основанный с смелым видением принести футбол мирового класса в сердце Центральной Азии, футбольный клуб Верия был создан в Алматы, Казахстан — городе гор, амбиций и неудержимой энергии.",
      "Под руководством основателя Верии Лоуренса Эбикса клуб вырос из страстной идеи в один из самых динамичных футбольных институтов Казахстана.",
      "Из тени гор Тянь-Шаня Верия ФК поднимается — создавая наследие, развивая таланты и соревнуясь на самом высоком уровне."
    ],
    pillarsTitle: "Ценности Клуба",
    pillarsEyebrow: "За Что Мы Стоим",
    pillars: [
      { title: "Превосходство", desc: "Мы стремимся к самым высоким стандартам во всех аспектах нашей игры." },
      { title: "Сообщество", desc: "Укорененный в Алматы, мы — клуб для каждого казахстанца." },
      { title: "Наследие", desc: "Каждый матч, каждый игрок добавляет еще одну главу в нашу историю." }
    ],
    leadershipTitle: "Руководство Клуба",
    leadershipEyebrow: "Люди, Стоящие За Клубом",
    leadershipSub: "Единый фронт дальновидных профессионалов, реализующих амбиции Верия ФК.",
    leaders: [
      { role: "Основатель и Председатель", name: "Верия Лоуренс Эбикс", initials: "VLE", image: "/images/IMG-20260324-WA0048.jpg", bio: "Движущая сила Верия ФК, Верия Лоуренс Эбикс основал клуб с твердым убеждением в успехе футбола мирового класса в Алматы.", isFounder: true },
      { role: "Технический Директор", name: "Отанва Луис", initials: "OL", bio: "Отанва Луис привносит глубокую тактическую экспертизу и современную футбольную философию в Верия ФК." },
      { role: "Менеджер по развитию бизнеса", name: "Каз", initials: "KAZ", bio: "Каз руководит коммерческой стратегией Верия ФК — создавая партнерства и развивая бренд клуба." },
      { role: "Стратегический Менеджер", name: "Барий А Сануси", initials: "BAS", image: "/images/IMG-20260324-WA0050.jpg", bio: "Барий А Сануси выступает в качестве стратегического менеджера клуба, отвечая за реализацию видения основателя." }
    ]
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

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <span className="section-eyebrow">{t.heroEyebrow}</span>
            <h1 className="section-heading mb-6">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
            <div className="space-y-4 font-barlow text-vmuted text-lg leading-relaxed font-light">
              {t.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-[300px] md:h-[300px] rounded-full bg-vsky/[0.05] border border-vsky/10 flex items-center justify-center relative">
              <div className="absolute inset-4 rounded-full border border-dashed border-vgold/15" />
              <div className="scale-75 md:scale-100">
                <svg width="200" height="200" viewBox="0 0 90 90" fill="none">
                  <path d="M45 5 L78 18 L78 52 Q78 72 45 85 Q12 72 12 52 L12 18 Z" fill="#172038" stroke="#C8A84B" strokeWidth="2.5" />
                  <path d="M45 10 L72 21 L72 50 Q72 68 45 79 Q18 68 18 50 L18 21 Z" fill="none" stroke="rgba(0,174,239,0.15)" strokeWidth="1" />
                  <text x="45" y="34" fontFamily="Bebas Neue, sans-serif" fontSize="13" fill="#C8A84B" textAnchor="middle" letterSpacing="1.5">VERIA</text>
                  <text x="45" y="56" fontFamily="Bebas Neue, sans-serif" fontSize="26" fill="#F0EEE8" textAnchor="middle" letterSpacing="1">FC</text>
                  <line x1="30" y1="62" x2="60" y2="62" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
                  <text x="45" y="74" fontFamily="Bebas Neue, sans-serif" fontSize="10" fill="#00AEEF" textAnchor="middle" letterSpacing="2">ALMATY</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.pillarsEyebrow}</span>
          <h2 className="section-heading mb-12">{t.pillarsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.pillars.map((p, i) => (
              <div key={i} className="bg-vnavy-card border border-[rgba(255,255,255,0.06)] rounded-[14px] p-8 hover:border-vgold/30 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-6" style={{ background: p.color || 'rgba(255,255,255,0.05)', border: `1px solid ${p.border || 'transparent'}` }}>
                  {i === 0 && <Star className="w-5 h-5 text-vgold" />}
                  {i === 1 && <Users className="w-5 h-5 text-vsky" />}
                  {i === 2 && <History className="w-5 h-5 text-vgold" />}
                </div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3">{p.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Leadership Section */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.leadershipEyebrow}</span>
          <h2 className="section-heading mb-4">{t.leadershipTitle}</h2>
          <p className="section-sub mb-12">{t.leadershipSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.leaders.map((l, i) => (
              <div key={i} className={`leader-card group ${l.isFounder ? 'md:col-span-2 founder' : ''}`}>
                <div className="leader-card-hero">
                  <div className="leader-initials-bg">
                    <div className="initials-circle overflow-hidden border-vgold/30">
                      {l.image ? (
                        <img src={l.image} alt={l.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        l.initials
                      )}
                    </div>
                  </div>
                  {l.isFounder && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 font-bebas text-9xl text-vwhite/[0.03] tracking-[4px] pointer-events-none hidden md:block uppercase">
                      FOUNDER
                    </div>
                  )}
                </div>
                <div className="leader-card-body">
                  <span className="leader-role">{l.role}</span>
                  <h3 className="leader-name">{l.name}</h3>
                  <p className="leader-bio">{l.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}