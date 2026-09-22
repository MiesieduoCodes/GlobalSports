"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Users, GraduationCap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const translations = {
  en: {
    heroEyebrow: "The Academy",
    heroTitle: "We're not just developing players. ",
    heroTitleAccent: "We're building a pipeline.",
    heroSub: "VE-GlobalSportFC Academy takes players from their first touch to their first professional trial — U8 through U19, structured so a nine-year-old in Almaty and a nineteen-year-old chasing a European move are both training inside the same club identity.",
    groupsTitle: "Age-Group Pathway",
    groups: [
      { num: "01", range: "U8 – U10", title: "Foundation", desc: "Fall in love with the ball. Technical basics, coordination, confidence.", icon: <Users className="w-5 h-5 text-vsky" /> },
      { num: "02", range: "U12 – U15", title: "Development", desc: "Learn to read the game. Tactical understanding, decision-making under pressure.", icon: <GraduationCap className="w-5 h-5 text-vgold" /> },
      { num: "03", range: "U17 – U19", title: "Performance", desc: "Prepare for what's next. Competitive readiness, mentality, honest conversations.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ],
    outwardEyebrow: "From Almaty, Outward",
    outwardTitle: "Kazakhstan is where we start. It isn't where we stop.",
    outwardBody: "We've already moved players into transfer conversations with clubs in Croatia — a small but deliberate first step toward something bigger: a football pipeline that runs from Central Asia into Europe, not the other way around. Almaty is home. It isn't the ceiling.",
    outwardCta: "Partner With Us",
    trialsEyebrow: "Trials",
    trialsTitle: "If you're good enough, we want to see you.",
    trialsBody: "We're not looking for the most technically gifted kid in every trial. We're looking for the ones who are coachable, competitive, and willing to be told they're wrong by a coach who's trying to make them better.",
    traits: ["Committed", "Coachable", "Disciplined", "Competitive", "Team-oriented", "Ambitious"],
    enrollTitle: "Register for a Trial",
    fields: {
      parentName: "Parent / Guardian Name",
      contactEmail: "Email Address",
      contactPhone: "Phone Number",
      childName: "Player Name",
      childAge: "Age",
      medicalInfo: "Medical Info (optional)"
    },
    btn: "Submit Registration",
    btnSubmitting: "Submitting…",
    success: "Registration submitted. We'll be in touch to confirm your trial date.",
    error: "Something went wrong. Please try again or email info@veglobalsports.com."
  },
  ru: {
    heroEyebrow: "Академия",
    heroTitle: "Мы не просто развиваем игроков. ",
    heroTitleAccent: "Мы строим конвейер.",
    heroSub: "Академия VE-GlobalSportFC ведёт игроков от первого касания мяча до первого профессионального просмотра — от U8 до U19.",
    groupsTitle: "Возрастной путь",
    groups: [
      { num: "01", range: "U8 – U10", title: "Основа", desc: "Полюбить мяч. Технические основы, координация, уверенность.", icon: <Users className="w-5 h-5 text-vsky" /> },
      { num: "02", range: "U12 – U15", title: "Развитие", desc: "Учиться читать игру. Тактическое понимание, принятие решений под давлением.", icon: <GraduationCap className="w-5 h-5 text-vgold" /> },
      { num: "03", range: "U17 – U19", title: "Мастерство", desc: "Готовность к следующему шагу. Соревновательная готовность, менталитет.", icon: <Trophy className="w-5 h-5 text-vsky" /> }
    ],
    outwardEyebrow: "Из Алматы — вовне",
    outwardTitle: "Казахстан — это старт. Не финиш.",
    outwardBody: "Мы уже провели трансферные переговоры с клубами Хорватии — небольшой, но осознанный первый шаг к футбольному конвейеру из Центральной Азии в Европу.",
    outwardCta: "Стать партнёром",
    trialsEyebrow: "Просмотры",
    trialsTitle: "Если ты достаточно хорош — мы хотим тебя увидеть.",
    trialsBody: "Мы ищем не самого технически одарённого ребёнка, а тех, кто способен учиться, конкурировать и готов услышать от тренера, что был неправ.",
    traits: ["Целеустремлённость", "Обучаемость", "Дисциплина", "Конкурентность", "Командный дух", "Амбициозность"],
    enrollTitle: "Записаться на просмотр",
    fields: {
      parentName: "Имя родителя / опекуна",
      contactEmail: "Email",
      contactPhone: "Телефон",
      childName: "Имя игрока",
      childAge: "Возраст",
      medicalInfo: "Медицинская информация (необязательно)"
    },
    btn: "Отправить заявку",
    btnSubmitting: "Отправка…",
    success: "Заявка отправлена. Мы свяжемся с вами для подтверждения даты просмотра.",
    error: "Что-то пошло не так. Попробуйте снова или напишите на info@veglobalsports.com."
  }
};

export default function AcademyPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [form, setForm] = useState({
    parentName: "", contactEmail: "", contactPhone: "", childName: "", childAge: "", medicalInfo: ""
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Registration failed");
      setStatus("success");
      setForm({ parentName: "", contactEmail: "", contactPhone: "", childName: "", childAge: "", medicalInfo: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="bg-vnavy min-h-screen">

      {/* Hero */}
      <section className="relative pt-[140px] pb-[70px] px-6 md:px-[60px] bg-vnavy-mid overflow-hidden">
        <div className="kz-grid opacity-[0.025]" />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.heroEyebrow}</span>
          <h1 className="section-heading mb-4 max-w-[800px]">{t.heroTitle}<span className="text-vgold">{t.heroTitleAccent}</span></h1>
          <p className="section-sub max-w-[640px]">{t.heroSub}</p>
        </div>
      </section>

      {/* Pathway */}
      <section className="section">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="section-heading mb-12">{t.groupsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.groups.map((g, i) => (
              <div key={i} className="bg-vnavy-card border border-white/5 rounded-[20px] p-8 hover:border-vsky/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-bebas text-4xl text-vgold">{g.num}</div>
                  <div className="w-12 h-12 rounded-[12px] bg-vnavy border border-white/10 flex items-center justify-center">
                    {g.icon}
                  </div>
                </div>
                <div className="font-barlow-condensed text-vsky text-sm tracking-[1.5px] uppercase font-bold mb-2">{g.range}</div>
                <h3 className="font-bebas text-2xl text-vwhite tracking-[1px] mb-3 group-hover:text-vgold transition-colors">{g.title}</h3>
                <p className="font-barlow text-vmuted text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Almaty Outward */}
      <section className="section bg-vnavy-mid">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-eyebrow">{t.outwardEyebrow}</span>
          <h2 className="section-heading">{t.outwardTitle}</h2>
          <p className="section-sub max-w-none mt-4 mb-8">{t.outwardBody}</p>
          <Link href="/business-club" className="inline-block bg-vgold text-vnavy font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase px-7 py-3 rounded-[6px] hover:bg-vgold-light transition-colors">
            {t.outwardCta}
          </Link>
        </div>
      </section>

      {/* Trials + Registration */}
      <section id="register" className="section scroll-mt-[90px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="section-eyebrow">{t.trialsEyebrow}</span>
            <h2 className="section-heading">{t.trialsTitle}</h2>
            <p className="section-sub max-w-none mt-4 mb-6">{t.trialsBody}</p>
            <div className="flex flex-wrap gap-2">
              {t.traits.map((trait, i) => (
                <span key={i} className="bg-vnavy-card border border-white/10 rounded-[6px] px-4 py-2 text-xs font-barlow-condensed text-vwhite">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-vnavy-card border border-vgold/10 p-8 md:p-10 rounded-[24px] shadow-2xl">
            <h3 className="font-bebas text-3xl text-vwhite tracking-[2px] mb-6">{t.enrollTitle}</h3>

            {status === "success" ? (
              <p className="text-vsky font-barlow leading-relaxed">{t.success}</p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="parentName" value={form.parentName} onChange={handleChange} type="text" placeholder={t.fields.parentName} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
                <input required name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" placeholder={t.fields.contactEmail} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
                <input required name="contactPhone" value={form.contactPhone} onChange={handleChange} type="tel" placeholder={t.fields.contactPhone} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
                <input required name="childName" value={form.childName} onChange={handleChange} type="text" placeholder={t.fields.childName} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
                <input required name="childAge" value={form.childAge} onChange={handleChange} type="number" min="5" max="19" placeholder={t.fields.childAge} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />
                <input name="medicalInfo" value={form.medicalInfo} onChange={handleChange} type="text" placeholder={t.fields.medicalInfo} className="bg-vnavy border border-white/10 rounded-[8px] px-5 py-3 text-sm focus:border-vgold/50 outline-none" />

                {status === "error" && <p className="md:col-span-2 text-red-400 text-sm">{t.error}</p>}

                <button type="submit" disabled={status === "submitting"} className="md:col-span-2 bg-vgold text-vnavy font-barlow-condensed font-bold text-[14px] tracking-[2px] uppercase py-4 rounded-[8px] hover:bg-vgold-light transition-all disabled:opacity-60">
                  {status === "submitting" ? t.btnSubmitting : t.btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
