"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
// Sample data for coaches
const coaches = [
    {
      name: "John Doe",
      title: "Head Coach",
      description: "John leads the team with a wealth of knowledge and experience in football strategy.",
      avatar: "https://example.com/john-doe.png", // Replace with actual image URL
      socialLinks: [
        { name: "Facebook", url: "#", icon: faFacebook },
        { name: "Twitter", url: "#", icon: faTwitter },
      ],
    },
    {
      name: "Jane Smith",
      title: "Assistant Coach",
      description: "Jane specializes in player development and brings a collaborative spirit to the team.",
      avatar: "https://example.com/jane-smith.png", // Replace with actual image URL
      socialLinks: [
        { name: "LinkedIn", url: "#", icon: faLinkedin },
        { name: "Instagram", url: "#", icon: faInstagram },
      ],
    },
    {
      name: "Mike Johnson",
      title: "Goalkeeping Coach",
      description: "Mike focuses on developing top-tier goalkeeping skills in our players.",
      avatar: "https://example.com/mike-johnson.png", // Replace with actual image URL
      socialLinks: [
        { name: "Facebook", url: "#", icon: faFacebook },
        { name: "Twitter", url: "#", icon: faTwitter },
      ],
    },
    {
      name: "Sara Lee",
      title: "Fitness Coach",
      description: "Sara enhances the physical preparedness of our athletes for peak performance.",
      avatar: "https://example.com/sara-lee.png", // Replace with actual image URL
      socialLinks: [
        { name: "Instagram", url: "#", icon: faInstagram },
        { name: "LinkedIn", url: "#", icon: faLinkedin },
      ],
    },
  ];
export default function OurTeam() {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our Coaches
        </h2>
        <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          Meet our dedicated football coaches who drive the team to success with their passion and expertise.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 mb-6 lg:mb-16">
        {coaches.map((coach) => (
          <div key={coach.name} className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={coach.avatar} alt={`${coach.name} Avatar`} />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{coach.name}</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">{coach.title}</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{coach.description}</p>
              <ul className="flex space-x-4 sm:mt-0">
                {coach.socialLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.url} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}

