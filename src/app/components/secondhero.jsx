"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CatchUpSoccerHero() {
  const heroContentRef = useRef(null);

  useEffect(() => {
    // GSAP animation: Fade in and slide up the hero content.
    gsap.from(heroContentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/41257/pexels-photo-41257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div
        className="hero-content text-neutral-content text-center"
        ref={heroContentRef}
      >
        <div className="max-w-2xl">
          <h1 className="mb-6 text-6xl font-bold text-blue-600">
            Experience the Thrill of Soccer!
          </h1>
          <p className="mb-8 text-2xl text-black">
            Immerse yourself in electrifying match highlights, unforgettable goals, and game-changing plays. Stay ahead of the action and never miss a beat in the world of soccer.
          </p>
          <button className="btn btn-primary bg-green-600 border-green-600 hover:bg-green-700 transition duration-300 text-xl py-3 px-8">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
