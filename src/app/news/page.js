// "use client";
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// import { Suspense } from "react";
// import dynamicImport from "next/dynamic";
// import { useLanguage } from "@/app/context/LanguageContext";
// import newsData from "@/app/components/constants/newss.json";
// import Link from "next/link";
// import { motion } from "framer-motion";

// /**
//  * The NewsPageContent component contains the useSearchParams hook.
//  * It is defined as a separate function and will be loaded dynamically
//  * to ensure that it’s rendered only on the client.
//  */
// const NewsPageContent = () => {
//   // Import useSearchParams here so that it runs only on the client.
//   const { useSearchParams } = require("next/navigation");
//   const searchParams = useSearchParams();
//   const { language } = useLanguage();
//   const newsId = searchParams.get("id");

//   if (newsId) {
//     const newsItem = newsData.news.find((item) => item.id === Number(newsId));
//     if (!newsItem) return <div>News not found</div>;

//     return (
//       <div className="bg-white dark:bg-gray-800 mx-auto px-4 py-12">
//         <motion.article
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
//         >
//           <img
//             src={newsItem.images[0]}
//             alt={newsItem.translations[language].title}
//             className="w-full h-96 object-cover"
//           />
//           <div className="p-8">
//             <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
//               {newsItem.translations[language].title}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               {new Date(newsItem.date).toLocaleDateString()} -{" "}
//               <span className="text-yellow-500 dark:text-yellow-400 font-semibold">
//                 {newsItem.category}
//               </span>
//             </p>
//             <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
//               {newsItem.translations[language].content}
//             </p>
//           </div>
//         </motion.article>
//       </div>
//     );
//   }

//   // If no specific news ID is provided, display all news items.
//   return (
//     <div className="bg-white dark:bg-gray-800 mx-auto px-4 py-12">
//       <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
//         Latest News
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {newsData.news.map((item) => (
//           <motion.div
//             key={item.id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <Link
//               href={`/news?id=${item.id}`}
//               className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
//             >
//               <img
//                 src={item.images[0]}
//                 alt={item.translations[language].title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
//                   {item.translations[language].title}
//                 </h2>
//                 <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
//                   {new Date(item.date).toLocaleDateString()} -{" "}
//                   <span className="text-yellow-500 dark:text-yellow-400 font-semibold">
//                     {item.category}
//                   </span>
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
//                   {item.translations[language].content}
//                 </p>
//                 <div className="mt-4 flex items-center text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">
//                   <span className="mr-2">Read More</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /**
//  * Dynamically import NewsPageContent with server-side rendering disabled
//  * and Suspense enabled. This ensures that useSearchParams runs only on the client.
//  */
// const DynamicNewsPageContent = dynamicImport(
//   () => Promise.resolve(NewsPageContent),
//   { ssr: false, suspense: true }
// );

// /**
//  * The main page component simply wraps the dynamically imported content
//  * in a Suspense boundary.
//  */
// const NewsPage = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <DynamicNewsPageContent />
//     </Suspense>
//   );
// };

// export default NewsPage;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page