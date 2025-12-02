"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "@/app/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// EmailJS Credentials from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

const translations = {
  en: {
    contactUs: "Get In Touch",
    sendMessage: "Send Us A Message",
    namePlaceholder: "Your Full Name",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+1 (555) 123-4567",
    messagePlaceholder: "Tell us about your inquiry...",
    preferredMethod: "Preferred Method of Communication",
    email: "Email",
    phone: "Phone",
    sending: "Sending...",
    sendMessageButton: "Send Message",
    successMessage: "✅ Your message has been sent successfully!",
    errorMessage: "❌ Something went wrong. Please try again.",
    getInTouch: "Get in Touch",
    contactDescription: "Ready to take your football journey to the next level? We'd love to hear from you. Reach out to discuss partnerships, trials, or any inquiries.",
    contactInfo: {
      phone: "+7 727 327 4755, +7 702 589 5922",
      email: "globalsportint2017@gmail.com, info@gsfc.com",
      location: "Almaty, Kazakhstan",
    },
    quickResponse: "We typically respond within 24 hours",
    followUs: "Follow Our Journey",
    officeHours: "Office Hours: Mon-Fri 9:00 AM - 6:00 PM",
  },
  ru: {
    contactUs: "Свяжитесь с нами",
    sendMessage: "Отправьте нам сообщение",
    namePlaceholder: "Ваше полное имя",
    emailPlaceholder: "ваш.email@example.com",
    phonePlaceholder: "+7 (777) 123-4567",
    messagePlaceholder: "Расскажите нам о вашем запросе...",
    preferredMethod: "Предпочтительный способ связи",
    email: "Электронная почта",
    phone: "Телефон",
    sending: "Отправка...",
    sendMessageButton: "Отправить сообщение",
    successMessage: "✅ Ваше сообщение успешно отправлено!",
    errorMessage: "❌ Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
    getInTouch: "Свяжитесь с нами",
    contactDescription: "Готовы вывести свой футбольный путь на новый уровень? Мы будем рады услышать вас. Свяжитесь с нами для обсуждения партнерства, пробных тренировок или любых вопросов.",
    contactInfo: {
      phone: "+7 727 327 4755, +7 702 589 5922",
      email: "globalsportint2017@gmail.com, info@gsfc.com",
      location: "Алматы, Казахстан",
    },
    quickResponse: "Обычно отвечаем в течение 24 часов",
    followUs: "Следите за нашим путешествием",
    officeHours: "Часы работы: Пн-Пт 9:00 - 18:00",
  },
  fr: {
    contactUs: "Contactez-nous",
    sendMessage: "Envoyez-nous un message",
    namePlaceholder: "Votre nom complet",
    emailPlaceholder: "votre.email@exemple.com",
    phonePlaceholder: "+33 1 23 45 67 89",
    messagePlaceholder: "Parlez-nous de votre demande...",
    preferredMethod: "Méthode de communication préférée",
    email: "E-mail",
    phone: "Téléphone",
    sending: "Envoi...",
    sendMessageButton: "Envoyer le message",
    successMessage: "✅ Votre message a été envoyé avec succès!",
    errorMessage: "❌ Une erreur s'est produite. Veuillez réessayer.",
    getInTouch: "Entrez en contact",
    contactDescription: "Prêt à faire passer votre parcours footballistique au niveau supérieur ? Nous aimerions avoir de vos nouvelles. Contactez-nous pour discuter de partenariats, d'essais ou de toute demande.",
    contactInfo: {
      phone: "+7 727 327 4755, +7 702 589 5922",
      email: "globalsportint2017@gmail.com, info@gsfc.com",
      location: "Almaty, Kazakhstan",
    },
    quickResponse: "Nous répondons généralement dans les 24 heures",
    followUs: "Suivez notre parcours",
    officeHours: "Heures de bureau: Lun-Ven 9h00 - 18h00",
  },
  es: {
    contactUs: "Contáctanos",
    sendMessage: "Envíanos un mensaje",
    namePlaceholder: "Tu nombre completo",
    emailPlaceholder: "tu.email@ejemplo.com",
    phonePlaceholder: "+34 91 123 45 67",
    messagePlaceholder: "Cuéntanos sobre tu consulta...",
    preferredMethod: "Método de comunicación preferido",
    email: "Correo electrónico",
    phone: "Teléfono",
    sending: "Enviando...",
    sendMessageButton: "Enviar mensaje",
    successMessage: "✅ ¡Tu mensaje ha sido enviado con éxito!",
    errorMessage: "❌ Algo salió mal. Por favor, inténtalo de nuevo.",
    getInTouch: "Ponte en contacto",
    contactDescription: "¿Listo para llevar tu viaje futbolístico al siguiente nivel? Nos encantaría saber de ti. Ponte en contacto para discutir asociaciones, pruebas o cualquier consulta.",
    contactInfo: {
      phone: "+7 727 327 4755, +7 702 589 5922",
      email: "globalsportint2017@gmail.com, info@gsfc.com",
      location: "Almaty, Kazajistán",
    },
    quickResponse: "Normalmente respondemos en 24 horas",
    followUs: "Sigue nuestro viaje",
    officeHours: "Horario de oficina: Lun-Vie 9:00 - 18:00",
  },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactMethod: "email",
  });
  
  const [isSending, setIsSending] = useState(false);
  const { language } = useLanguage();
  const content = translations[language] || translations.en;
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then(
        () => {
          setIsSending(false);
          toast.success(content.successMessage);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            contactMethod: "email",
          });
        },
        (error) => {
          setIsSending(false);
          toast.error(content.errorMessage);
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-24 px-6 transition-colors duration-300">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
              {content.getInTouch}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content.contactUs}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {content.contactDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Image Section */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <img
                src="/images/IMG-20250219-WA0081.jpg"
                alt="Global Sport FC Team"
                className="w-full h-96 object-cover rounded-3xl relative shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <ContactInfo 
                    icon="📞" 
                    title="Phone" 
                    text={content.contactInfo.phone}
                    subtitle={content.officeHours}
                  />
                  <ContactInfo 
                    icon="📧" 
                    title="Email" 
                    text={content.contactInfo.email}
                    subtitle={content.quickResponse}
                  />
                  <ContactInfo 
                    icon="📍" 
                    title="Location" 
                    text={content.contactInfo.location}
                    subtitle="Visit Our Academy"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {content.followUs}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay updated with our latest news, player developments, and match schedules.
              </p>
              <div className="flex space-x-4">
                {["📘", "📷", "🐦", "📺"].map((icon, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {content.sendMessage}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Fill out the form below and we'll get back to you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <FormInput
                  name="name"
                  placeholder={content.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  icon="👤"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <FormInput
                  name="email"
                  type="email"
                  placeholder={content.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  icon="📧"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <FormInput
                  name="phone"
                  type="tel"
                  placeholder={content.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  icon="📞"
                />
              </div>

              {/* Contact Method Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {content.preferredMethod} *
                </label>
                <div className="flex space-x-6">
                  <RadioInput
                    id="email"
                    label={content.email}
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === "email"}
                    onChange={handleChange}
                    icon="📧"
                  />
                  <RadioInput
                    id="phone"
                    label={content.phone}
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === "phone"}
                    onChange={handleChange}
                    icon="📞"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Your Message *
                </label>
                <FormInput
                  name="message"
                  placeholder={content.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  textarea
                  required
                  icon="💬"
                  rows="5"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSending ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    {content.sending}
                  </span>
                ) : (
                  content.sendMessageButton
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000}
        theme="colored"
        pauseOnHover
      />
    </section>
  );
};

// Enhanced Contact Info Component
const ContactInfo = ({ icon, title, text, subtitle }) => (
  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{text}</p>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{subtitle}</p>
      )}
    </div>
  </div>
);

// Enhanced Input Field Component
const FormInput = ({ name, placeholder, value, onChange, textarea, required, type = "text", icon, rows = "4", className }) => {
  const InputComponent = textarea ? "textarea" : "input";
  
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
          {icon}
        </span>
      )}
      <InputComponent
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={textarea ? rows : undefined}
        className={`
          w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 
          focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent 
          placeholder-gray-400 dark:placeholder-gray-500 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white
          transition-all duration-300
          ${icon ? 'pl-12' : 'pl-4'}
          ${textarea ? 'resize-none' : ''}
          hover:border-gray-300 dark:hover:border-gray-500
          ${className}
        `}
      />
    </div>
  );
};

// Enhanced Radio Button Component
const RadioInput = ({ id, label, name, value, checked, onChange, icon }) => (
  <label className="flex items-center cursor-pointer group">
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
      required
    />
    <div className={`
      flex items-center space-x-3 px-4 py-3 rounded-xl border-2 transition-all duration-300
      ${checked 
        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
        : 'border-gray-200 dark:border-gray-600 group-hover:border-gray-300 dark:group-hover:border-gray-500'
      }
    `}>
      <span className="text-xl">{icon}</span>
      <span className={`
        font-semibold transition-colors duration-300
        ${checked ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}
      `}>
        {label}
      </span>
      <div className={`
        w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300
        ${checked ? 'border-yellow-400 bg-yellow-400' : 'border-gray-300 dark:border-gray-500'}
      `}>
        {checked && <span className="w-2 h-2 bg-white rounded-full"></span>}
      </div>
    </div>
  </label>
);

export default ContactPage;