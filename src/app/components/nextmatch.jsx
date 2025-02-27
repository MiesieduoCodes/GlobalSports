"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function NextMatch() {
  const headerRef = useRef(null);
  const teamsRef = useRef(null);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    // Fetch match data from the JSON file
    const fetchMatchData = async () => {
      const response = await fetch('@/app/components/constants/matches.json'); // Update this path based on where you put the JSON file
      const data = await response.json();
      setMatch(data[0]); // Assuming you want to display the first match
    };

    fetchMatchData();
  }, []);

  if (!match) return <p>Loading...</p>; // Loading state

  const { team1, team1Logo, team2, team2Logo } = match;

  return (
    <section className="bg-white text-black dark:bg-gray-900 dark:text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2
          ref={headerRef}
          className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-yellow-400 mb-6"
          aria-label="Next Match"
        >
          Next Match
        </h2>

        {/* Match Info */}
        <div
          ref={teamsRef}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
          role="presentation"
        >
          {/* Team 1 */}
          <div className="flex flex-col items-center">
            <Image
              src={team1Logo}
              width={60}
              height={60}
              className="rounded-full shadow-md"
              alt={`${team1} Logo`}
              priority
            />
            <p className="font-semibold text-lg mt-2">{team1}</p>
          </div>

          {/* VS Text */}
          <div className="text-xl sm:text-2xl font-bold text-black dark:text-gray-300">
            VS
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center">
            <Image
              src={team2Logo}
              width={60}
              height={60}
              className="rounded-full shadow-md"
              alt={`${team2} Logo`}
              priority
            />
            <p className="font-semibold text-lg mt-2">{team2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}