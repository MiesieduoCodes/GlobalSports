"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { Star, Users, History, X } from "lucide-react";
import Image from "next/image";

const translations = {
  en: {
    heroEyebrow: "Our Story",
    heroTitle: "The Club. ",
    heroTitleAccent: "The Vision.",
    story: [
      "Founded with a bold vision to bring world-class football to the heart of Central Asia, Veria Football Club was established in Almaty, Kazakhstan — a city of mountains, ambition and unstoppable energy.",
      "Under the leadership of founder Veria Lawrence Ebiks, the club has grown from a passionate idea into one of Kazakhstan's most dynamic football institutions, blending elite sporting standards with deep community values.",
      "From the shadow of the Tian Shan mountains, VE-GLOBALSPORTS FC rises — building legacy, developing talent, and competing at the highest level the Kazakhstan Premier League has to offer."
    ],
    pillarsTitle: "Club Values",
    pillarsEyebrow: "What We Stand For",
    pillars: [
      {
        title: "Excellence",
        desc: "We pursue the highest standards in every aspect of our game — on the pitch, in the academy, and in the front office. Mediocrity has no home at VE-GLOBALSPORTS FC.",
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
    leadershipSub: "A united front of visionary professionals driving VE-GLOBALSPORTS FC's ambitions on and off the pitch.",
    leaders: [
      {
        role: "Founder & Chairman",
        name: "Veria Lawrence Ebiks",
        initials: "VLE",
        image: "/images/IMG-20260324-WA0048.jpg-removebg-preview.png",
        bio: "The driving force behind VE-GLOBALSPORTS FC, Veria Lawrence Ebiks founded the club with a singular conviction: that world-class football could and should thrive in Almaty, Kazakhstan. His entrepreneurial vision, global perspective and unwavering passion for the beautiful game have shaped every aspect of the club — from its philosophy and identity to its long-term strategic ambitions.",
        isFounder: true
      },
      {
        role: "Technical Director",
        name: "Otanwa Louis",
        initials: "OL",
        image:"/images/IMG_3656.JPG-removebg-preview.png",
        bio: "Otanwa Louis brings deep tactical expertise and a modern football philosophy to VE-GLOBALSPORTS FC. Responsible for the club's technical structure — from first team to academy — he has built a cohesive playing identity that demands intensity, intelligence and creativity."
      },
      {
        role: "Business Development Manager",
        name: "Audu Emmanuel Kaz",
        initials: "AEK",
        bio: "Kaz leads VE-GLOBALSPORTS FC's commercial strategy — forging partnerships, growing the club's brand across Central Asia and beyond, and building the commercial infrastructure that sustains long-term success."
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
      "Основанный с смелым видением принести футбол мирового класса в сердце Центральной Азии, футбольный клуб ВЕ-ГЛОБАЛСПОРТС был создан в Алматы, Казахстан — городе гор, амбиций и неудержимой энергии.",
      "Под руководством основателя Верии Лоуренса Эбикса клуб вырос из страстной идеи в один из самых динамичных футбольных институтов Казахстана.",
      "Из тени гор Тянь-Шаня ВЕ-ГЛОБАЛСПОРТС ФК поднимается — создавая наследие, развивая таланты и соревнуясь на самом высоком уровне."
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
    leadershipSub: "Единый фронт дальновидных профессионалов, реализующих амбиции ВЕ-ГЛОБАЛСПОРТС ФК.",
    leaders: [
      { role: "Основатель и Председатель", name: "Верия Лоуренс Эбикс", initials: "VLE", image: "/images/IMG-20260324-WA0048.jpg", bio: "Движущая сила ВЕ-ГЛОБАЛСПОРТС ФК, Верия Лоуренс Эбикс основал клуб с твердым убеждением в успехе футбола мирового класса в Алматы.", isFounder: true },
      { role: "Технический Директор", name: "Отанва Луис", initials: "OL", bio: "Отанва Луис привносит глубокую тактическую экспертизу и современную футбольную философию в ВЕ-ГЛОБАЛСПОРТС ФК." },
      { role: "Менеджер по развитию бизнеса", name: "Ауду Эммануэль Каз", initials: "AEK", bio: "Каз руководит коммерческой стратегией ВЕ-ГЛОБАЛСПОРТС ФК — создавая партнерства и развивая бренд клуба." },
      { role: "Стратегический Менеджер", name: "Барий А Сануси", initials: "BAS", image: "/images/IMG-20260324-WA0050.jpg", bio: "Барий А Сануси выступает в качестве стратегического менеджера клуба, отвечая за реализацию видения основателя." }
    ]
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
            <div className="w-64 h-64 md:w-[300px] md:h-[300px] rounded-full flex items-center justify-center relative">
              <div className="absolute inset-4 rounded-full" />
              <div className="scale-75 md:scale-100">
                <Image src="/logo.png" alt="Club Logo" width={300} height={300} className="rounded-full" />
              </div>
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