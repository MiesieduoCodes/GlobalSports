"use client";

import React from "react";
import Link from "next/link";
import Hero from "@/app/components/hero";
import NextMatch from "@/app/components/nextmatch";
import News from "@/app/components/news";
import RecentResults from "@/app/components/recentresults";
import { useLanguage } from "@/app/context/LanguageContext";

const translations = {
  en: {
    glanceEyebrow: "The Season, At A Glance",
    glanceTitle: "We don't just report the score. We give it context.",
    glancePosition: "2nd",
    glancePositionSub: "in Almaty League A",
    glanceStats: [
      { val: "14", label: "Wins" },
      { val: "5", label: "Draws" },
      { val: "3", label: "Losses" },
      { val: "47", label: "Points" }
    ],
    glanceQuote: "The best league finish in the club's history so far — and we're not done.",
    whoEyebrow: "Who We Are",
    whoTitle: "A club built on purpose, not pressure.",
    whoBody1: "Most clubs in Kazakhstan either chase promotion or chase survival. VE-GlobalSportFC was built to do something else: turn Almaty into a city that exports football talent, not just imports foreign coaches.",
    whoBody2: "Since 2017, that's meant building three things at once — a first team that competes with discipline, an academy pathway from U8 to U19, and a growing network of international partnerships that give our players a route beyond Kazakhstan's borders.",
    whoBody3: "We're not the biggest club in the country yet. We intend to be the one everyone else in the region is compared to.",
    whoCta: "Read Our Story",
    ftEyebrow: "First Team",
    ftTitle: "The squad that wears the shirt.",
    ftBody: "Thirty players. Five-plus nationalities. One dressing room. Our first team is the competitive engine of the club — built on discipline over talent alone, and results over reputation.",
    ftCta1: "Meet the Squad",
    ftCta2: "View Fixtures",
    acEyebrow: "The Academy",
    acTitle: "We're not just developing players. We're building a pipeline.",
    acBody: "VE-GlobalSportFC Academy takes players from their first touch to their first professional trial — U8 through U19, structured so a nine-year-old in Almaty and a nineteen-year-old chasing a European move are both training inside the same club identity.",
    acStages: [
      { num: "01", range: "U8 – U10", title: "Foundation", desc: "Fall in love with the ball. Technical basics, coordination, confidence." },
      { num: "02", range: "U12 – U15", title: "Development", desc: "Learn to read the game. Tactical understanding, decision-making under pressure." },
      { num: "03", range: "U17 – U19", title: "Performance", desc: "Prepare for what's next. Competitive readiness, mentality, honest conversations." }
    ],
    acCta1: "Explore the Academy",
    acCta2: "Register for Trials",
    outEyebrow: "From Almaty, Outward",
    outTitle: "Kazakhstan is where we start. It isn't where we stop.",
    outBody: "We've already moved players into transfer conversations with clubs in Croatia — a small but deliberate first step toward something bigger: a football pipeline that runs from Central Asia into Europe, not the other way around. Almaty is home. It isn't the ceiling.",
    outCta: "Partner With Us"
  },
  ru: {
    glanceEyebrow: "Сезон в цифрах",
    glanceTitle: "Мы не просто сообщаем счёт. Мы даём ему контекст.",
    glancePosition: "2-е",
    glancePositionSub: "место в Алматинской лиге A",
    glanceStats: [
      { val: "14", label: "Победы" },
      { val: "5", label: "Ничьи" },
      { val: "3", label: "Поражения" },
      { val: "47", label: "Очки" }
    ],
    glanceQuote: "Лучший результат в истории клуба на сегодняшний день — и это не предел.",
    whoEyebrow: "Кто мы",
    whoTitle: "Клуб, построенный на цели, а не на давлении.",
    whoBody1: "Большинство клубов в Казахстане либо борются за повышение в классе, либо за выживание. VE-GlobalSportFC создан, чтобы делать нечто иное: превратить Алматы в город, который экспортирует футбольный талант, а не только импортирует иностранных тренеров.",
    whoBody2: "С 2017 года это означало строить три вещи одновременно — первую команду, которая соревнуется с дисциплиной, академию от U8 до U19 и растущую сеть международных партнёрств.",
    whoBody3: "Мы пока не самый большой клуб в стране. Мы намерены стать тем, с кем сравнивают всех остальных в регионе.",
    whoCta: "Наша история",
    ftEyebrow: "Первая команда",
    ftTitle: "Состав, который носит эту футболку.",
    ftBody: "Тридцать игроков. Более пяти национальностей. Одна раздевалка. Наша первая команда — соревновательное ядро клуба, построенное на дисциплине и результате.",
    ftCta1: "Состав команды",
    ftCta2: "Расписание матчей",
    acEyebrow: "Академия",
    acTitle: "Мы не просто развиваем игроков. Мы строим конвейер.",
    acBody: "Академия VE-GlobalSportFC ведёт игроков от первого касания мяча до первого профессионального просмотра — от U8 до U19.",
    acStages: [
      { num: "01", range: "U8 – U10", title: "Основа", desc: "Полюбить мяч. Технические основы, координация, уверенность." },
      { num: "02", range: "U12 – U15", title: "Развитие", desc: "Учиться читать игру. Тактическое понимание, принятие решений под давлением." },
      { num: "03", range: "U17 – U19", title: "Мастерство", desc: "Готовность к следующему шагу. Соревновательная готовность, менталитет." }
    ],
    acCta1: "Об академии",
    acCta2: "Записаться на просмотр",
    outEyebrow: "Из Алматы — вовне",
    outTitle: "Казахстан — это старт. Не финиш.",
    outBody: "Мы уже провели трансферные переговоры с клубами Хорватии — небольшой, но осознанный первый шаг к чему-то большему: футбольному конвейеру из Центральной Азии в Европу.",
    outCta: "Стать партнёром"
  }
};

export default function Page() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [tickerItems, setTickerItems] = React.useState([]);

  React.useEffect(() => {
    const loadTicker = async () => {
      try {
        const { collection, getDocs, query, limit } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        const snapshot = await getDocs(query(collection(db, "matches"), limit(10)));
        const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const items = matches.map(m => {
          if (m.status === 'past') {
            return `${m.team1} ${m.homeScore ?? 0}–${m.awayScore ?? 0} ${m.team2} · FT`;
          } else {
            return `Next: ${m.team1} vs ${m.team2} · ${m.date} · ${m.time}`;
          }
        });

        setTickerItems(items);
      } catch (err) {
        console.error("Error loading ticker:", err);
      }
    };
    loadTicker();
  }, [language]);


  return (
    <div className="bg-vnavy">
      <Hero />

      {/* Ticker Bar */}
      <div className="ticker-bar">
        <div className="ticker-label">
          {language === 'ru' ? 'ПОСЛЕДНИЕ НОВОСТИ' : 'BREAKING NEWS'}
        </div>
        <div className="ticker-track">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {tickerItems.map((item, idx) => (
                <div key={`${i}-${idx}`} className="ticker-item">
                  <span className="ticker-sep">{"///"}</span>
                  {item}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Season At A Glance */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.glanceEyebrow}</span>
          <h2 className="section-heading mb-10 max-w-[700px]">{t.glanceTitle}</h2>

          <div className="bg-vnavy-card border border-white/5 rounded-[16px] p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
            <div>
              <div className="font-bebas text-[64px] leading-none text-vgold">{t.glancePosition}</div>
              <div className="text-sm text-vmuted mt-1">{t.glancePositionSub}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:border-l lg:border-white/10 lg:pl-8">
              {t.glanceStats.map((s, i) => (
                <div key={i}>
                  <div className="font-bebas text-3xl text-vwhite">{s.val}</div>
                  <div className="font-barlow-condensed text-[11px] tracking-[1.5px] uppercase text-vmuted mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <blockquote className="italic text-vmuted text-sm max-w-[220px] border-l-2 border-vgold pl-4 lg:pl-4">
              &ldquo;{t.glanceQuote}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section bg-vnavy-mid">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-eyebrow">{t.whoEyebrow}</span>
            <h2 className="section-heading">{t.whoTitle}</h2>
            <p className="section-sub max-w-none mt-4">{t.whoBody1}</p>
          </div>
          <div className="flex flex-col gap-4 lg:pt-[52px]">
            <p className="text-vmuted leading-relaxed font-light">{t.whoBody2}</p>
            <p className="text-vmuted leading-relaxed font-light">{t.whoBody3}</p>
            <Link href="/about" className="inline-block w-fit mt-2 bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
              {t.whoCta}
            </Link>
          </div>
        </div>
      </section>

      {/* First Team & Academy */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="section-eyebrow">{t.ftEyebrow}</span>
            <h2 className="section-heading">{t.ftTitle}</h2>
            <p className="section-sub max-w-none mt-4 mb-8">{t.ftBody}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/squad" className="bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
                {t.ftCta1}
              </Link>
              <Link href="/matches" className="border border-white/20 text-vwhite font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:border-vgold hover:text-vgold transition-colors">
                {t.ftCta2}
              </Link>
            </div>
          </div>

          <div>
            <span className="section-eyebrow">{t.acEyebrow}</span>
            <h2 className="section-heading">{t.acTitle}</h2>
            <p className="section-sub max-w-none mt-4 mb-8">{t.acBody}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/academy" className="bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
                {t.acCta1}
              </Link>
              <Link href="/academy#register" className="border border-white/20 text-vwhite font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:border-vgold hover:text-vgold transition-colors">
                {t.acCta2}
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {t.acStages.map((s, i) => (
            <div key={i} className="bg-vnavy-card border border-white/5 rounded-[16px] p-8 hover:border-vgold/30 transition-all">
              <div className="font-bebas text-4xl text-vgold mb-2">{s.num}</div>
              <div className="font-barlow-condensed text-[11px] font-bold tracking-[2px] uppercase text-vsky mb-3">{s.range}</div>
              <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-2">{s.title}</h3>
              <p className="text-vmuted text-sm leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* From Almaty, Outward */}
      <section className="section bg-vnavy-mid">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.outEyebrow}</span>
          <h2 className="section-heading">{t.outTitle}</h2>
          <p className="section-sub max-w-none mt-4 mb-8">{t.outBody}</p>
          <Link href="/business-club" className="inline-block bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.outCta}
          </Link>
        </div>
      </section>

      <NextMatch />
      <RecentResults />
      <News />

      {/* Footer is rendered by Layout */}
    </div>
  );
}