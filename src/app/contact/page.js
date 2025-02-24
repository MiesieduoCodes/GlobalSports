"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "@/app/context/LanguageContext";

// Hardcoded EmailJS Credentials
const SERVICE_ID = "service_mofzwum";
const TEMPLATE_ID = "template_ormpbz2";
const USER_ID = "a1NybmXRcYdkYXTu6";

const translations = {
  en: {
    contactUs: "Contact Us",
    sendMessage: "Send Us A Message",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    messagePlaceholder: "Message",
    preferredMethod: "Preferred Method of Communication",
    email: "Email",
    phone: "Phone",
    sending: "Sending...",
    sendMessageButton: "Send Message",
    successMessage: "✅ Your message has been sent successfully!",
    errorMessage: "❌ Something went wrong. Please try again.",
    contactInfo: {
      phone: "+77273274755, +77025895922",
      email: "globalsportint2017@gmail.com , info@gsfc.com",
      location: "Kazakhstan",
    },
  },
  // Other translations...
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
  const { language } = useLanguage(); // Get the current language from context
  const content = translations[language] || translations.en; // Default to English

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
        }
      );
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-700 pt-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Contact Info Section */}
        <div className="relative">
          <img
            src="/images/IMG-20250219-WA0081.jpg"
            alt={content.contactUs}
            className="w-full h-full rounded-2xl object-cover"
          />
          <h1 className="absolute top-10 left-10 text-black text-4xl font-bold">
            {content.contactUs}
          </h1>
          <div className="absolute bottom-0 p-6 w-full bg-white rounded-lg shadow-lg">
            <ContactInfo icon="📞" text={content.contactInfo.phone} />
            <ContactInfo
              icon="📧"
              text={content.contactInfo.email}
            />
            <ContactInfo icon="📍" text={content.contactInfo.location} />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {content.sendMessage}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <FormInput
              name="name"
              placeholder={content.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email Input */}
            <FormInput
              name="email"
              placeholder={content.emailPlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />

            {/* Phone Input */}
            <FormInput
              name="phone"
              placeholder={content.phonePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />

            {/* Contact Method Selection */}
            <div className="mb-6">
              <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-4">
                {content.preferredMethod}
              </h4>
              <div className="flex space-x-6">
                <RadioInput
                  id="email"
                  label={content.email}
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === "email"}
                  onChange={handleChange}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-300"
                />
                <RadioInput
                  id="phone"
                  label={content.phone}
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === "phone"}
                  onChange={handleChange}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-300"
                />
              </div>
            </div>

            {/* Message Input */}
            <FormInput
              name="message"
              placeholder={content.messagePlaceholder}
              value={formData.message}
              onChange={handleChange}
              textarea
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? content.sending : content.sendMessageButton}
            </button>
          </form>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </section>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center space-x-3 mb-4">
    <span className="text-lg">{icon}</span>
    <p className="text-black">{text}</p>
  </div>
);

// Input Field Component
const FormInput = ({ name, placeholder, value, onChange, textarea, required, type = "text", className }) => 
  textarea ? (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg mb-4 ${className}`}
      rows="4"
      required={required}
    />
  ) : (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg mb-4 ${className}`}
      required={required}
    />
  );

// Radio Button Component
const RadioInput = ({ id, label, name, value, checked, onChange }) => (
  <label className="flex items-center cursor-pointer text-gray-500">
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
    <span className="w-5 h-5 border rounded-full flex items-center justify-center mr-2">
      {checked && <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>}
    </span>
    {label}
  </label>
);

export default ContactPage;