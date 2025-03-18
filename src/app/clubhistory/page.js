"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context

gsap.registerPlugin(ScrollTrigger);

// Translations JSON
const translations = {
  en: {
    title: "A Legacy Forged in Grassroots Passion",
    subtitle: "Our Journey of Triumph",
    description:
      "Born from the vision of Veria Lawrence Ebiks, a former professional footballer, GSFC was established in 2018 with a singular purpose: to uplift young talents from local communities who were often overlooked. We are a testament to the power of grassroots scouting, providing professional training and unwavering support to help these players achieve their wildest dreams.",
    features: [
      {
        icon: CloudArrowUpIcon,
        title: "2018: The Birth of GSFC",
        description:
          "The foundation of GSFC was built on grassroots football development, with a mission to discover and nurture hidden talent from local communities.",
      },
      {
        icon: LockClosedIcon,
        title: "2020: Professional Debut",
        description:
          "GSFC made its professional debut in the Kazakhstan J Liga, a significant milestone achieved while staying true to its commitment to grassroots talent.",
      },
      {
        icon: ServerIcon,
        title: "2022: Expanding Our Reach",
        description:
          "Securing vital sponsorships allowed GSFC to expand its academy programs, nurturing the next generation of football stars and providing them with world-class training.",
      },
      {
        icon: ServerIcon,
        title: "2024: Global Partnerships",
        description:
          "GSFC forged strategic international partnerships, creating pathways for its players to shine on the global stage and compete at the highest levels of football.",
      },
    ],
    images: [
      {
        src: "https://images.pexels.com/photos/29185445/pexels-photo-29185445/free-photo-of-children-playing-soccer-in-urban-alleyway.jpeg?auto=compress&cs=tinysrgb&w=600",
        alt: "Children playing soccer in an urban alleyway",
      }
    ],
  },
  ru: {
    title: "Наследие, созданное страстью к футболу на местах",
    subtitle: "Наш путь к триумфу",
    description:
      "Основанный благодаря видению Веры Лоуренс Эбикс, бывшего профессионального футболиста, GSFC был создан в 2018 году с одной целью: помочь молодым талантам из местных сообществ, которые часто оставались без внимания. Мы являемся свидетельством силы скаутинга на местах, предоставляя профессиональное обучение и неизменную поддержку, чтобы помочь этим игрокам достичь своих самых смелых мечтаний.",
    features: [
      {
        icon: CloudArrowUpIcon,
        title: "2018: Рождение GSFC",
        description:
          "Основание GSFC было построено на развитии футбола на местах, с миссией находить и развивать скрытые таланты из местных сообществ.",
      },
      {
        icon: LockClosedIcon,
        title: "2020: Профессиональный дебют",
        description:
          "GSFC дебютировал в профессиональной лиге Казахстана J Лига, достигнув важного рубежа, оставаясь верным своей приверженности талантам на местах.",
      },
      {
        icon: ServerIcon,
        title: "2022: Расширение возможностей",
        description:
          "Получение важных спонсорских соглашений позволило GSFC расширить программы академии, воспитывая новое поколение футбольных звезд и предоставляя им обучение мирового уровня.",
      },
      {
        icon: ServerIcon,
        title: "2024: Глобальные партнерства",
        description:
          "GSFC заключил стратегические международные партнерства, создавая возможности для своих игроков блистать на мировой арене и соревноваться на высочайшем уровне.",
      },
    ],
    images: [
      {
        alt: "Дети играют в футбол в городском переулке",
      }
    ],
  },
  fr: {
    title: "Un héritage forgé par la passion du football de base",
    subtitle: "Notre parcours vers le triomphe",
    description:
      "Né de la vision de Veria Lawrence Ebiks, un ancien footballeur professionnel, GSFC a été créé en 2018 avec un objectif unique : élever les jeunes talents des communautés locales souvent négligés. Nous sommes un témoignage de la puissance du recrutement de base, offrant une formation professionnelle et un soutien indéfectible pour aider ces joueurs à réaliser leurs rêves les plus fous.",
    features: [
      {
        icon: CloudArrowUpIcon,
        title: "2018 : La naissance de GSFC",
        description:
          "La fondation de GSFC a été construite sur le développement du football de base, avec pour mission de découvrir et de nourrir les talents cachés des communautés locales.",
      },
      {
        icon: LockClosedIcon,
        title: "2020 : Débuts professionnels",
        description:
          "GSFC a fait ses débuts professionnels dans la J Liga du Kazakhstan, une étape importante tout en restant fidèle à son engagement envers les talents de base.",
      },
      {
        icon: ServerIcon,
        title: "2022 : Expansion de notre portée",
        description:
          "L'obtention de sponsorships vitaux a permis à GSFC d'étendre ses programmes d'académie, formant la prochaine génération de stars du football et leur offrant une formation de classe mondiale.",
      },
      {
        icon: ServerIcon,
        title: "2024 : Partenariats mondiaux",
        description:
          "GSFC a forgé des partenariats internationaux stratégiques, créant des opportunités pour ses joueurs de briller sur la scène mondiale et de concourir au plus haut niveau.",
      },
    ],
    images: [
      {
        alt: "Enfants jouant au football dans une ruelle urbaine",
      }
    ],
  },
  es: {
    title: "Un legado forjado en la pasión por el fútbol base",
    subtitle: "Nuestro camino hacia el triunfo",
    description:
      "Nacido de la visión de Veria Lawrence Ebiks, un exfutbolista profesional, GSFC se estableció en 2018 con un propósito singular: elevar a los jóvenes talentos de las comunidades locales que a menudo eran pasados por alto. Somos un testimonio del poder del scouting en el fútbol base, brindando entrenamiento profesional y apoyo inquebrantable para ayudar a estos jugadores a alcanzar sus sueños más audaces.",
    features: [
      {
        icon: CloudArrowUpIcon,
        title: "2018: El nacimiento de GSFC",
        description:
          "La fundación de GSFC se construyó sobre el desarrollo del fútbol base, con la misión de descubrir y nutrir talentos ocultos en las comunidades locales.",
      },
      {
        icon: LockClosedIcon,
        title: "2020: Debut profesional",
        description:
          "GSFC hizo su debut profesional en la J Liga de Kazajstán, un hito importante mientras se mantenía fiel a su compromiso con los talentos de base.",
      },
      {
        icon: ServerIcon,
        title: "2022: Expandiendo nuestro alcance",
        description:
          "La obtención de patrocinios vitales permitió a GSFC expandir sus programas de academia, formando a la próxima generación de estrellas del fútbol y brindándoles entrenamiento de clase mundial.",
      },
      {
        icon: ServerIcon,
        title: "2024: Asociaciones globales",
        description:
          "GSFC forjó asociaciones internacionales estratégicas, creando caminos para que sus jugadores brillen en el escenario global y compitan al más alto nivel.",
      },
    ],
    images: [
      {
        alt: "Niños jugando al fútbol en un callejón urbano",
      }
    ],
  },
};

export default function HistorySection() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const { language } = useLanguage(); // Get current language from context
  const content = translations[language] || translations.en; // Default to English

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.3 }
    );

    gsap.fromTo(
      textRefs.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );
  }, [language]); // Re-run animations when language changes

  return (
    <div
      ref={sectionRef}
      className={`relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900`}
    >
      {/* Content Section */}
      <div className="mx-auto max-w-7xl text-center px-4 sm:px-6 lg:px-8">
        <p className="text-base font-semibold text-indigo-600">{content.subtitle}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{content.title}</h1>
        <p className="mt-6 text-lg">{content.description}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 p-6 lg:grid-cols-2 lg:gap-x-8">
        <div className="flex justify-center">
          <img
            ref={(el) => imageRefs.current.push(el)}
            src={content.images.src}
            alt={content.images.alt}
            className="w-[48rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div>

        <div className="max-w-lg">
          {content.features.map((feature, index) => (
            <div key={index} className="flex gap-x-3 mt-6" ref={(el) => textRefs.current.push(el)}>
              <feature.icon className="mt-1 text-3xl h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center">
          <img
            ref={(el) => imageRefs.current.push(el)}
            src={content.images.src}
            alt={content.images.alt}
            className="w-[48rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div> */}
      </div>
    </div>
  );
}