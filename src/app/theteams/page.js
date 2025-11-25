"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Translations JSON
const translations = {
  en: {
    title: "Executive Leadership Team",
    subtitle: "Guiding Excellence, Building Legacy",
    description: "Meet the visionary leaders driving Global Sport FC's success. Our diverse leadership team brings decades of combined experience in football management, player development, and strategic growth.",
    viewProfile: "View Profile",
    contact: "Contact",
    experience: "Years Experience",
    achievements: "Key Achievements",
    biography: "Biography",
    leadership: [
      {
        id: 1,
        name: "Veria Lawrence Ebiks",
        role: "Club Director & Founder",
        department: "Executive Leadership",
        image: "/images/leadership/veria-ebiks.jpg",
        experience: "15+",
        bio: "Visionary leader with over 15 years in sports management. Founded GSFC with a mission to develop world-class football talent from grassroots levels.",
        email: "v.ebiks@globalsportfc.com",
        phone: "+1 (555) 010-2001",
        achievements: [
          "Founded GSFC in 2018",
          "Secured $5M in partnerships",
          "Expanded to 3 international academies"
        ],
        specialties: ["Strategic Planning", "Partnership Development", "Club Operations"]
      },
      {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Head Coach",
        department: "Technical Staff",
        image: "/images/leadership/marcus-rodriguez.jpg",
        experience: "12+",
        bio: "UEFA Pro License holder with extensive experience in youth development and tactical innovation. Former professional player with 150+ appearances.",
        email: "m.rodriguez@globalsportfc.com",
        phone: "+1 (555) 010-2002",
        achievements: [
          "UEFA Pro License Certified",
          "Developed 10+ professional players",
          "League Championship 2022"
        ],
        specialties: ["Tactical Analysis", "Player Development", "Match Strategy"]
      },
      {
        id: 3,
        name: "Dr. Sarah Chen",
        role: "Technical Director",
        department: "Technical Staff",
        image: "/images/leadership/sarah-chen.jpg",
        experience: "10+",
        bio: "Sports scientist and technical expert specializing in player performance optimization and data-driven decision making.",
        email: "s.chen@globalsportfc.com",
        phone: "+1 (555) 010-2003",
        achievements: [
          "PhD in Sports Science",
          "Implemented performance analytics system",
          "Reduced player injuries by 40%"
        ],
        specialties: ["Performance Analysis", "Sports Science", "Data Analytics"]
      },
      {
        id: 4,
        name: "Audu Kaz Emmanuel",
        role: "Operations Manager",
        department: "Management & Support",
        image: "/images/leadership/audu-kaz.jpg",
        experience: "8+",
        bio: "Expert in football club operations and logistics management. Ensures seamless day-to-day functioning of the club.",
        email: "a.emmanuel@globalsportfc.com",
        phone: "+1 (555) 010-2004",
        achievements: [
          "Streamlined operational processes",
          "Managed 50+ international transfers",
          "Improved facility utilization by 60%"
        ],
        specialties: ["Operations Management", "Logistics", "Facility Management"]
      },
      {
        id: 5,
        name: "Otanwa Luise",
        role: "Player Development Manager",
        department: "Management & Support",
        image: "/images/leadership/otanwa-luise.jpg",
        experience: "7+",
        bio: "Dedicated to holistic player development, focusing on both athletic performance and personal growth.",
        email: "o.luise@globalsportfc.com",
        phone: "+1 (555) 010-2005",
        achievements: [
          "Implemented mentorship program",
          "100% academic success rate for scholars",
          "Developed life skills curriculum"
        ],
        specialties: ["Player Welfare", "Education Coordination", "Career Development"]
      },
      {
        id: 6,
        name: "Abubakar Aliyu Audu",
        role: "Head of Scouting",
        department: "Management & Support",
        image: "/images/leadership/abubakar-audu.jpg",
        experience: "9+",
        bio: "Extensive network across African and European football markets. Specializes in identifying and recruiting emerging talent.",
        email: "a.audu@globalsportfc.com",
        phone: "+1 (555) 010-2006",
        achievements: [
          "Built 50+ scout network",
          "Discovered 15 professional players",
          "Expanded recruitment to 12 countries"
        ],
        specialties: ["Talent Identification", "Recruitment Strategy", "Market Analysis"]
      },
      {
        id: 7,
        name: "Sanusi Adekunle Bariy",
        role: "Finance & Compliance Director",
        department: "Management & Support",
        image: "/images/leadership/sanusi-bariy.jpg",
        experience: "11+",
        bio: "Chartered accountant with expertise in sports finance, compliance, and strategic financial planning for football clubs.",
        email: "s.bariy@globalsportfc.com",
        phone: "+1 (555) 010-2007",
        achievements: [
          "CPA Certified",
          "Secured financial sustainability",
          "Implemented compliance framework"
        ],
        specialties: ["Financial Management", "Regulatory Compliance", "Budget Planning"]
      }
    ],
    departments: {
      all: "All Leadership",
      executive: "Executive",
      technical: "Technical",
      management: "Management"
    }
  },
  ru: {
    title: "Команда исполнительного руководства",
    subtitle: "Направляем к совершенству, строим наследие",
    description: "Познакомьтесь с дальновидными лидерами, обеспечивающими успех Global Sport FC. Наша разнообразная команда руководителей обладает десятилетиями совокупного опыта в управлении футболом, развитии игроков и стратегическом росте.",
    viewProfile: "Профиль",
    contact: "Контакт",
    experience: "Лет опыта",
    achievements: "Ключевые достижения",
    biography: "Биография",
    departments: {
      all: "Все руководители",
      executive: "Руководство",
      technical: "Технический отдел",
      management: "Менеджмент"
    },
    leadership: [
      // Russian translations would follow the same structure
    ]
  },
  fr: {
    title: "Équipe de Direction Exécutive",
    subtitle: "Guider l'Excellence, Bâtir un Héritage",
    description: "Rencontrez les leaders visionnaires qui font le succès de Global Sport FC. Notre équipe de direction diversifiée apporte des décennies d'expérience combinée en gestion du football, développement des joueurs et croissance stratégique.",
    viewProfile: "Voir le Profil",
    contact: "Contact",
    experience: "Années d'Expérience",
    achievements: "Réalisations Clés",
    biography: "Biographie",
    departments: {
      all: "Tous les Leaders",
      executive: "Direction",
      technical: "Technique",
      management: "Gestion"
    },
    leadership: [
      // French translations would follow the same structure
    ]
  },
  es: {
    title: "Equipo de Liderazgo Ejecutivo",
    subtitle: "Guiando la Excelencia, Construyendo Legado",
    description: "Conoce a los líderes visionarios que impulsan el éxito de Global Sport FC. Nuestro diverso equipo directivo aporta décadas de experiencia combinada en gestión futbolística, desarrollo de jugadores y crecimiento estratégico.",
    viewProfile: "Ver Perfil",
    contact: "Contacto",
    experience: "Años de Experiencia",
    achievements: "Logros Clave",
    biography: "Biografía",
    departments: {
      all: "Todo el Liderazgo",
      executive: "Ejecutivo",
      technical: "Técnico",
      management: "Gestión"
    },
    leadership: [
      // Spanish translations would follow the same structure
    ]
  },
};

export default function TeamSection() {
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  // Filter leadership by department
  const filteredLeadership = content.leadership.filter(member => {
    if (activeFilter === "all") return true;
    if (activeFilter === "executive") return member.department === "Executive Leadership";
    if (activeFilter === "technical") return member.department === "Technical Staff";
    if (activeFilter === "management") return member.department === "Management & Support";
    return true;
  });

  // Enhanced GSAP Animations
  useEffect(() => {
    // Section animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Staggered card animations
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [language, activeFilter]);

  const getDepartmentColor = (department) => {
    const colors = {
      "Executive Leadership": "from-purple-500 to-purple-700",
      "Technical Staff": "from-blue-500 to-blue-700",
      "Management & Support": "from-green-500 to-green-700",
    };
    return colors[department] || "from-gray-500 to-gray-700";
  };

  const getDepartmentBadge = (department) => {
    const badges = {
      "Executive Leadership": "🏛️",
      "Technical Staff": "⚽",
      "Management & Support": "👥",
    };
    return badges[department] || "💼";
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
              Executive Leadership
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
            {content.subtitle}
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "executive", "technical", "management"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {content.departments[filter]}
            </button>
          ))}
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredLeadership.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* Member Image with Overlay */}
              <div className="relative overflow-hidden h-64">
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-2xl">
                    {getDepartmentBadge(member.department)}
                  </span>
                </div>
                
                {/* Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Leadership Photo</p>
                  </div>
                </div>
                
                {/* Experience Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {member.experience} {content.experience}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white w-full">
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="w-full px-4 py-2 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors mb-2"
                    >
                      {content.viewProfile}
                    </button>
                    <button className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30">
                      {content.contact}
                    </button>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getDepartmentColor(member.department)} text-white mb-2`}>
                    {member.department}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                    {member.role}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.slice(0, 2).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                      >
                        {specialty}
                      </span>
                    ))}
                    {member.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                        +{member.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Achievements */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {content.achievements}:
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {member.achievements.slice(0, 1).map((achievement, idx) => (
                      <li key={idx} className="line-clamp-1">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLeadership.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No team members found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try selecting a different department filter.
            </p>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              
              {/* Modal Content */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Photo</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details Section */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r ${getDepartmentColor(selectedMember.department)} text-white mb-3`}>
                        {selectedMember.department}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedMember.name}
                      </h2>
                      <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                        {selectedMember.role}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>📧 {selectedMember.email}</span>
                        <span>📞 {selectedMember.phone}</span>
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {content.biography}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {content.achievements}
                      </h3>
                      <ul className="space-y-2">
                        {selectedMember.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Areas of Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}