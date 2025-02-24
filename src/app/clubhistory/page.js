"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";

// Content JSON
const contentData = {
  title: "The Legacy of Global Sport FC",
  subtitle: "A Journey Through Time and Triumph",
  description:
    "From humble beginnings in Kazakhstan to global dominance in Spain, Global Sport FC has carved its name in football history. Explore the milestones, legendary players, and unforgettable moments that define this iconic club.",
  features: [
    {
      icon: CloudArrowUpIcon,
      title: "Founding Years in Kazakhstan",
      description:
        "Established in 1892 in Kazakhstan, Global Sport FC started as a local club with a passionate following. The early years were filled with struggles, but determination and a unique playing style set the foundation for future success. Overcoming challenges, the club slowly began to make its mark on the national stage."
    },
    {
      icon: LockClosedIcon,
      title: "Rise to Prominence",
      description:
        "By the mid-20th century, Global Sport FC had developed into a force to be reckoned with. With tactical innovations and legendary managers, the club won consecutive league titles and built a reputation for fast, attacking football. This era saw the emergence of young talents who would later become icons of the game."
    },
    {
      icon: ServerIcon,
      title: "European Ascent and Relocation",
      description:
        "Seeking greater competition and expansion, the club made the historic decision to relocate to Spain in the 1980s. With its new home in a football-crazy nation, Global Sport FC embraced new challenges. Competing against Europe’s best, they cemented their status as an elite club with memorable victories in domestic and international tournaments."
    },
    {
      icon: ServerIcon,
      title: "A Legacy of Excellence",
      description:
        "Global Sport FC has since become synonymous with success, winning multiple championships and cultivating a worldwide fanbase. The club’s dedication to youth development and innovative tactics has kept it at the pinnacle of the sport."
    }
  ],
  images: [
    {
      src: "https://images.pexels.com/photos/29185445/pexels-photo-29185445/free-photo-of-children-playing-soccer-in-urban-alleyway.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Children playing soccer in an urban alleyway",
    },
    {
      src: "https://images.pexels.com/photos/17258095/pexels-photo-17258095/free-photo-of-exterior-of-the-san-siro-football-stadium-in-milan-italy.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Exterior of a football stadium",
    }
  ]
};

export default function HistorySection() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

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
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900`}
    >
      <div className="mx-auto max-w-7xl text-center px-4 sm:px-6 lg:px-8">
        <p className="text-base font-semibold text-indigo-600">{contentData.subtitle}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{contentData.title}</h1>
        <p className="mt-6 text-lg">{contentData.description}</p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 gap-10 p-6 lg:grid-cols-2 lg:gap-x-8">
        <div className="flex justify-center">
          <img
            ref={(el) => imageRefs.current.push(el)}
            src={contentData.images[0].src}
            alt={contentData.images[0].alt}
            className="w-[48rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div>
        
        <div className="max-w-lg">
          {contentData.features.map((feature, index) => (
            <div key={index} className="flex gap-x-3 mt-6" ref={(el) => textRefs.current.push(el)}>
              <feature.icon className="mt-1 text-3xl  h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <img
            ref={(el) => imageRefs.current.push(el)}
            src={contentData.images[0].src}
            alt={contentData.images[0].alt}
            className="w-[48rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div>
      </div>


    </div>
  );
}