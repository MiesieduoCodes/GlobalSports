"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

    // Entrance animation: Cards slide in from left to right
    gsap.fromTo(
      cards,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Scroll-triggered open-close animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      onEnter: () => {
        gsap.to(cards, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.inOut",
        });
        gsap.to(cards, {
          scale: 1,
          delay: 0.2,
          duration: 0.2,
          ease: "power1.inOut",
        });
      },
    });
  }, []);

  const teamMembers = [
    {
      name: "Alex Morgan",
      image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg", // Football field
      about: "Star forward with a knack for finding the back of the net. Leading scorer in multiple tournaments.",
    },
    {
      name: "Manuel Neuer",
      image: "https://images.pexels.com/photos/3621103/pexels-photo-3621103.jpeg", // Football stadium
      about: "Legendary goalkeeper known for incredible reflex saves and commanding presence in the box.",
    },
    {
      name: "Sergio Ramos",
      image: "https://images.pexels.com/photos/46798/pexels-photo-46798.jpeg", // Football in motion
      about: "Defensive stalwart with unmatched leadership on and off the pitch. Master of set-pieces.",
    },
    {
      name: "Megan Rapinoe",
      image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg", // Football field
      about: "Dynamic midfielder and two-time World Cup winner. Iconic for precision passing and playmaking.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-green-100 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800 dark:text-yellow-300">
          Meet Our Squad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>

              {/* Sliding Bio */}
              <div className="absolute inset-y-0 left-0 w-0 group-hover:w-2/3 bg-black text-white overflow-hidden transition-all duration-500 z-20">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-yellow-400">{member.name}</h3>
                  <p className="text-sm mt-2">{member.about}</p>
                </div>
              </div>

              {/* White Wipe Effect */}
              <div className="absolute inset-y-0 left-0 w-0 group-hover:w-2/3 bg-white transition-all duration-300 z-15"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
