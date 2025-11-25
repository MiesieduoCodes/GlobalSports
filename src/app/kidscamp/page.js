"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-toastify/dist/ReactToastify.css";
import Quote from "@/app/components/quote";
import KidsPlayer from "@/app/components/kidsphotos";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    title: "Global Sports Football Club Junior Academy",
    subtitle: "Where Future Champions Are Made!",
    tagline: "Nurturing Young Talent Through Professional Football Development",
    agePrograms: "Age-Specific Programs",
    ageGroup1: {
      title: "5-7 Years",
      subtitle: "Foundation & Fun",
      items: [
        "Basic motor skills development",
        "Introduction to football rules",
        "Fun team activities",
        "Coordination exercises",
        "Social skills development"
      ],
    },
    ageGroup2: {
      title: "8-10 Years",
      subtitle: "Skill Development",
      items: [
        "Technical skill development",
        "Small-sided matches",
        "Position-specific training",
        "Teamwork fundamentals",
        "Basic tactical understanding"
      ],
    },
    ageGroup3: {
      title: "11-12 Years",
      subtitle: "Advanced Training",
      items: [
        "Advanced tactics",
        "Competitive matches",
        "Fitness conditioning",
        "Leadership development",
        "Performance analysis"
      ],
    },
    juniorChampions: "Our Junior Champions",
    testimonials: "Parent & Player Testimonials",
    faq: "Frequently Asked Questions",
    joinAcademy: "Join Our Junior Academy",
    parentName: "Parent/Guardian Name",
    childName: "Child's Name",
    childAge: "Child's Age",
    medicalInfo: "Medical Information",
    registerNow: "Register Now",
    submitting: "Submitting...",
    successMessage: "🎉 Registration successful! We'll contact you within 24 hours.",
    errorMessage: "❌ Error submitting form. Please try again.",
    viewGallery: "View Gallery",
    learnMore: "Learn More",
    certifiedCoaches: "FA Certified Coaches",
    safeEnvironment: "Safe & Inclusive Environment",
    professionalFacilities: "Professional Facilities",
    faqItems: [
      {
        question: "What age groups do you accept?",
        answer: "We accept children aged 5-12 years old, divided into three age-specific groups with tailored training programs for each developmental stage.",
      },
      {
        question: "What should my child bring to training?",
        answer: "Comfortable sports clothes, football boots, shin guards, and a water bottle. All equipment meets safety standards and is age-appropriate.",
      },
      {
        question: "Are your coaches certified?",
        answer: "All our coaches hold FA Level 2 certifications, have passed enhanced DBS checks, and receive regular training in child development and safety protocols.",
      },
      {
        question: "What is the training schedule?",
        answer: "We offer flexible training schedules with sessions on weekdays after school and Saturday mornings. Each age group has specific time slots.",
      },
      {
        question: "Do you participate in competitions?",
        answer: "Yes! Our junior teams regularly participate in local and regional tournaments, providing valuable competitive experience in a supportive environment.",
      },
    ],
  },
  es: {
    title: "Academia Junior de Global Sports",
    subtitle: "¡Donde se forman los futuros campeones!",
    tagline: "Desarrollando Talento Joven a Través del Fútbol Profesional",
    agePrograms: "Programas por Edad",
    ageGroup1: {
      title: "5-7 Años",
      subtitle: "Fundación y Diversión",
      items: [
        "Desarrollo básico de habilidades motoras",
        "Introducción a las reglas del fútbol",
        "Actividades de equipo divertidas",
        "Ejercicios de coordinación",
        "Desarrollo de habilidades sociales"
      ],
    },
    ageGroup2: {
      title: "8-10 Años",
      subtitle: "Desarrollo de Habilidades",
      items: [
        "Desarrollo de habilidades técnicas",
        "Partidos en espacios reducidos",
        "Entrenamiento específico por posición",
        "Fundamentos del trabajo en equipo",
        "Comprensión táctica básica"
      ],
    },
    ageGroup3: {
      title: "11-12 Años",
      subtitle: "Entrenamiento Avanzado",
      items: [
        "Tácticas avanzadas",
        "Partidos competitivos",
        "Acondicionamiento físico",
        "Desarrollo de liderazgo",
        "Análisis de rendimiento"
      ],
    },
    juniorChampions: "Nuestros Campeones Junior",
    testimonials: "Testimonios de Padres y Jugadores",
    faq: "Preguntas Frecuentes",
    joinAcademy: "Únete a Nuestra Academia Junior",
    parentName: "Nombre del Padre/Responsable",
    childName: "Nombre del Niño",
    childAge: "Edad del Niño",
    medicalInfo: "Información Médica",
    registerNow: "Regístrate Ahora",
    submitting: "Enviando...",
    successMessage: "🎉 ¡Registro exitoso! Nos pondremos en contacto en 24 horas.",
    errorMessage: "❌ Error al enviar el formulario. Por favor, inténtalo de nuevo.",
    viewGallery: "Ver Galería",
    learnMore: "Saber Más",
    certifiedCoaches: "Entrenadores Certificados FA",
    safeEnvironment: "Ambiente Seguro e Inclusivo",
    professionalFacilities: "Instalaciones Profesionales",
    faqItems: [
      {
        question: "¿Qué grupos de edad aceptan?",
        answer: "Aceptamos niños de 5 a 12 años, divididos en tres grupos específicos por edad con programas de entrenamiento adaptados a cada etapa de desarrollo.",
      },
      {
        question: "¿Qué debe traer mi hijo a la práctica?",
        answer: "Ropa deportiva cómoda, botas de fútbol, espinilleras y una botella de agua. Todo el equipo cumple con los estándares de seguridad y es apropiado para la edad.",
      },
      {
        question: "¿Sus entrenadores están certificados?",
        answer: "Todos nuestros entrenadores tienen certificaciones FA de nivel 2, han pasado verificaciones DBS mejoradas y reciben formación regular en desarrollo infantil y protocolos de seguridad.",
      },
      // ... other Spanish translations
    ],
  },
  // ... other languages (ru, fr) with the same enhanced structure
};

const KidsClubPage = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    medicalInfo: "",
    contactEmail: "",
    contactPhone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  
  const heroRef = useRef(null);
  const ageGroupsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // GSAP Animations
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Age groups animation
    gsap.fromTo(".age-group-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ageGroupsRef.current,
          start: "top 80%",
        }
      }
    );

    // Testimonials animation
    gsap.fromTo(".testimonial-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success(content.successMessage, {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
        setFormData({
          parentName: "",
          childName: "",
          childAge: "",
          medicalInfo: "",
          contactEmail: "",
          contactPhone: ""
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(content.errorMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 transition-colors duration-300">
      <ToastContainer />
      
      {/* Enhanced Hero Section */}
      <header ref={heroRef} className="relative min-h-screen pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG-20250219-WA0120.jpg"
            alt="Kids playing football"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 dark:from-blue-900/90 dark:to-blue-800/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center min-h-[80vh]">
          <div className="text-center text-white max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-yellow-400/20 backdrop-blur-sm rounded-full mb-8 border border-yellow-400/30">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-yellow-300 font-semibold text-lg">Elite Junior Development</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {content.title}
              </h1>
              
              <p className="text-2xl md:text-3xl text-yellow-300 mb-8 font-light">
                {content.subtitle}
              </p>
              
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                {content.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25">
                  {content.registerNow}
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  {content.learnMore}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </header>

      {/* Features Banner */}
      <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {content.certifiedCoaches}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                FA Level 2 Certified with Child Safety Training
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                🛡️
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {content.safeEnvironment}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Secure Facilities with First Aid Certified Staff
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                ⚽
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {content.professionalFacilities}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Professional Pitches & Modern Training Equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Enhanced Age Groups Section */}
        <section ref={ageGroupsRef} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {content.agePrograms}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tailored development programs designed for each stage of your child's football journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[content.ageGroup1, content.ageGroup2, content.ageGroup3].map((group, index) => (
              <motion.div
                key={index}
                className="age-group-card group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-4 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {group.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {group.subtitle}
                    </p>
                  </div>
                  
                  <ul className="space-y-3">
                    {group.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                        <span className="text-yellow-500 mr-3 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full mt-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300">
                    {content.learnMore}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {content.juniorChampions}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See our young talents in action and witness their incredible journey
            </p>
          </div>
          <KidsPlayer />
        </section>

        {/* Enhanced Testimonials Section */}
        <section ref={testimonialsRef} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {content.testimonials}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from parents and players about their experiences with our academy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="testimonial-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
            >
              <Quote className="w-12 h-12 text-yellow-400 mb-6" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                &quot;My son&apos;s confidence has grown tremendously since joining. The coaches are amazing at nurturing young talent while making it fun and engaging!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  SJ
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Parent of Liam, 8 years</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="testimonial-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
            >
              <Quote className="w-12 h-12 text-yellow-400 mb-6" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                &quot;The best football academy in the region! My daughter looks forward to every training session and has developed incredible skills and friendships.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Michael Chen</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Parent of Emma, 10 years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="mb-24 py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10 rounded-3xl">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
            >
              {content.faq}
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-4">
              {content.faqItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full text-left p-8 flex justify-between items-center transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      aria-expanded={openFaqIndex === index}
                    >
                      <div className="pr-8">
                        <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {item.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center transform transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-gray-600 ${openFaqIndex === index ? 'rotate-180 bg-blue-200 dark:bg-gray-600' : ''}`}>
                          <svg 
                            className="w-5 h-5 text-blue-600 dark:text-blue-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-6">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Registration Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {content.joinAcademy}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Start your child's football journey today. Limited spots available for each age group.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {content.parentName} *
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {content.childName} *
                  </label>
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={(e) => setFormData({...formData, childName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {content.childAge} *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="12"
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {content.medicalInfo}
                </label>
                <textarea
                  value={formData.medicalInfo}
                  onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300 resize-none"
                  rows="4"
                  placeholder="Any allergies, medical conditions, or special requirements we should know about..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    {content.submitting}
                  </span>
                ) : (
                  content.registerNow
                )}
              </motion.button>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                We respect your privacy. Your information will never be shared with third parties.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default KidsClubPage;