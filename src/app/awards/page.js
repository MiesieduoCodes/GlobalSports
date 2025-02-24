"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import awardsData from "@/app/components/constants/awards.json";

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const awardRefs = useRef([]);
  const selectedLanguage = "en"; // Change this to "ru", "es", or "fr" as needed

  useEffect(() => {
    setAwards(awardsData);

    gsap.from(awardRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(/images/IMG-20250219-WA0124.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-white font-bold">Celebrate Excellence</h1>
            <p className="mb-5 text-white">
              Join us in honoring outstanding achievements and recognizing those who set new standards in innovation, leadership, and creativity. Our awards program celebrates excellence and inspires future success.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Football Awards and Achievements
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Here is a collection of prestigious awards and accolades won throughout our football career. These achievements reflect our dedication, skill, and contribution to the sport. Each award represents a significant milestone that motivates us to strive for excellence.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              ref={(el) => (awardRefs.current[index] = el)}
              className="group relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                alt={award.imageAlt[selectedLanguage]} // Select language here
                src={award.imageSrc}
                className="aspect-video w-full rounded-md object-cover group-hover:opacity-75"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {award.name[selectedLanguage]} {/* Select language here */}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{award.year}</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-300">
                  <strong>Match:</strong> {award.match[selectedLanguage]} {/* Select language here */}
                </p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{award.description[selectedLanguage]}</p> {/* Select language here */}
                <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  How it was won: {award.howItWasWon[selectedLanguage]} {/* Select language here */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}