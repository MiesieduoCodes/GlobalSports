"use client";
import React, { useState } from "react";

export default function Gallery() {

 const currentLanguage = "en";

  const translations = {
    en: {
      highlightsTitle: "Global Sport Academy Junior Team",
      introText:
        "Discover the dynamic energy and teamwork of the Global Sport Academy Junior Team. Watch as young talents train, compete, and excel in various sports disciplines.",
      callToAction:
        "Join us and be a part of the journey towards excellence and sportsmanship!",
    },
    ru: {
      highlightsTitle: "Молодежная команда Глобальной спортивной академии",
      introText:
        "Откройте для себя динамичную энергию и командный дух молодежной команды Глобальной спортивной академии. Смотрите, как молодые таланты тренируются, соревнуются и достигают успеха в различных видах спорта.",
      callToAction:
        "Присоединяйтесь к нам и станьте частью пути к совершенству и спортивному мастерству!",
    },
    fr: {
      highlightsTitle: "Équipe Junior de l'Académie Sportive Globale",
      introText:
        "Découvrez l'énergie dynamique et l'esprit d'équipe de l'équipe junior de l'Académie Sportive Globale. Regardez comment de jeunes talents s'entraînent, concourent et excellent dans diverses disciplines sportives.",
      callToAction:
        "Rejoignez-nous et faites partie du voyage vers l'excellence et l'esprit sportif!",
    },
    es: {
      highlightsTitle: "Equipo Juvenil de la Academia Global de Deportes",
      introText:
        "Descubre la energía dinámica y el espíritu de equipo del Equipo Juvenil de la Academia Global de Deportes. Observa cómo jóvenes talentos se entrenan, compiten y sobresalen en diversas disciplinas deportivas.",
      callToAction:
        "¡Únete a nosotros y sé parte del camino hacia la excelencia y el juego limpio!",
    },
  };

  const { highlightsTitle, introText, callToAction } =
    translations[currentLanguage];

  const row1Items = [
    {
      id: "item1",
      type: "image",
      src: "https://pagedone.io/asset/uploads/1713942989.png",
    },
    {
      id: "item2",
      type: "video",
      src: "/videos/VID-20250219-WA0121.mp4",
      poster: "/images/IMG-20250219-WA0120(2).jpg",
    },
  ];

  const row2Items = [
    {
      id: "item3",
      type: "image",
      src: "https://pagedone.io/asset/uploads/1713943024.png",
    },
    {
      id: "item4",
      type: "video",
      src: "https://www.w3schools.com/html/movie.mp4",
      poster: "/images/IMG-20250219-WA0120(2).jpg",
    },
    {
      id: "item5",
      type: "image",
      src: "https://pagedone.io/asset/uploads/1713943054.png",
    },
  ];

  // State to manage the currently selected item in the lightbox.
  const [lightboxItem, setLightboxItem] = useState(null);

  const openLightbox = (item) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-2.5 lg:pb-16 pb-10">
          <h2 className="w-full text-center text-gray-900 text-4xl font-bold leading-normal">
            {highlightsTitle}
          </h2>
          <div className="w-full text-center text-gray-600 text-lg leading-8">
            {introText}
          </div>
          <div className="w-full text-center text-blue-600 text-lg font-semibold">
            {callToAction}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-10">
          {/* Row 1 */}
          <div className="grid md:grid-cols-12 gap-8">
            {row1Items.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index === 0 ? "md:col-span-4" : "md:col-span-8"
                } md:h-[404px] h-[277px] w-full rounded-3xl overflow-hidden`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt="Gallery item"
                    className="object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out w-full h-full"
                    onClick={() => openLightbox(item)}
                  />
                ) : (
                  <img
                    src={item.poster}
                    alt="Video thumbnail"
                    className="object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out w-full h-full"
                    onClick={() => openLightbox(item)}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {row2Items.map((item) => (
              <div key={item.id} className="h-[277px] w-full rounded-3xl overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt="Gallery item"
                    className="object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out w-full h-full"
                    onClick={() => openLightbox(item)}
                  />
                ) : (
                  <img
                    src={item.poster}
                    alt="Video thumbnail"
                    className="object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out w-full h-full"
                    onClick={() => openLightbox(item)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxItem && (
        <div
          className="fixed z-[999] top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <span
            className="text-white text-3xl absolute top-5 right-8 cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </span>
          {lightboxItem.type === "image" ? (
            <img
              src={lightboxItem.src}
              alt="Lightbox content"
              className="block mx-auto max-w-full max-h-full"
            />
          ) : (
            <video
              src={lightboxItem.src}
              controls
              autoPlay
              className="block mx-auto max-w-full max-h-full"
            />
          )}
        </div>
      )}
    </section>
  );
}
