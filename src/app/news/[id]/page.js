"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, limit, getDocs } from "firebase/firestore";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { FALLBACK_NEWS } from "@/lib/constants";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function NewsDetailPage() {
    const { id } = useParams();
    const { language } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);

                let currentArticle = null;
                if (docSnap.exists()) {
                    currentArticle = { id: docSnap.id, ...docSnap.data() };
                } else {
                    // Check fallback
                    const base = FALLBACK_NEWS[language] || FALLBACK_NEWS.en;
                    const found = base.find(n => n.id === id);
                    if (found) {
                        currentArticle = {
                            ...found,
                            imageUrl: found.image,
                            renderedTitle: found.title,
                            renderedDesc: found.description
                        };
                    }
                }
                setArticle(currentArticle);

                // Fetch related news
                const q = query(collection(db, "news"), limit(3));
                const relSnap = await getDocs(q);
                let relData = relSnap.docs.filter(d => d.id !== id).map(d => ({ id: d.id, ...d.data() }));

                if (relData.length === 0) {
                    const base = FALLBACK_NEWS[language] || FALLBACK_NEWS.en;
                    relData = base.filter(n => n.id !== id).slice(0, 3);
                }
                setRelated(relData);
            } catch (err) {
                console.error("Error fetching news detail:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, language]);

    if (loading) {
        return (
            <div className="bg-vnavy min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-vgold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="bg-vnavy min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="font-bebas text-4xl text-vwhite mb-4">Article Not Found</h1>
                <Link href="/" className="text-vsky hover:text-vgold transition-colors font-barlow-condensed tracking-widest uppercase text-sm">Return Home</Link>
            </div>
        );
    }

    // Handle data structure robustness
    const displayTitle = article.translations?.[language]?.title || article.title || "Untitled Article";
    const displayDesc = article.translations?.[language]?.description || article.description || "No content available.";
    const displayImage = article.image || article.imageUrl;
    const displayCategory = article.category || "Club News";
    const displayDate = article.date || "March 2026";

    return (
        <main className="bg-vnavy min-h-screen">
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={displayTitle}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-vnavy-light flex items-center justify-center font-bebas text-4xl text-white/5">NEWS</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-vnavy via-vnavy/40 to-transparent" />

                <div className="absolute bottom-[60px] left-6 right-6 md:left-[60px] md:right-[60px] max-w-[900px]">
                    <Link href="/" className="inline-flex items-center gap-2 text-vsky hover:text-vgold transition-colors font-barlow-condensed font-bold tracking-[2px] uppercase text-[11px] mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to News
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-2.5 py-1 bg-vgold text-vnavy rounded font-barlow-condensed font-bold text-[10px] tracking-[1.5px] uppercase">
                            {displayCategory}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-vmuted font-barlow-condensed uppercase tracking-[1px]">
                            <Calendar className="w-3.5 h-3.5" /> {displayDate}
                        </div>
                    </div>
                    <h1 className="font-bebas text-4xl md:text-6xl text-vwhite leading-[0.95] tracking-[1px]">
                        {displayTitle}
                    </h1>
                </div>
            </div>

            <section className="px-6 md:px-[60px] py-20">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20">
                    <article className="prose prose-invert prose-lg max-w-none">
                        <div className="font-barlow text-vmuted leading-relaxed space-y-6">
                            {displayDesc.split('\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </article>

                    <aside className="space-y-12">
                        <div>
                            <h3 className="font-bebas text-2xl text-vwhite tracking-[2px] mb-6 border-b border-white/5 pb-2">Related Stories</h3>
                            <div className="space-y-6">
                                {related.map((rel, i) => (
                                    <Link key={rel.id} href={`/news/${rel.id}`} className="group block">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-20 h-20 shrink-0 rounded-[8px] overflow-hidden bg-vnavy-mid">
                                                <img src={rel.image || rel.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                            </div>
                                            <div>
                                                <h4 className="font-bebas text-lg text-vwhite group-hover:text-vgold transition-colors leading-snug">{rel.translations?.[language]?.title || rel.title}</h4>
                                                <span className="text-[10px] text-vmuted uppercase font-barlow-condensed tracking-[1px]">{rel.date || "Mar 2026"}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-vnavy-card border border-white/5 p-8 rounded-[12px] text-center">
                            <h3 className="font-bebas text-xl text-vwhite mb-2">Never Miss a Moment</h3>
                            <p className="text-[12px] text-vmuted mb-6 font-barlow">Subscribe to get the latest match reports and news delivered to your inbox.</p>
                            <Link href="/contact" className="inline-block px-6 py-3 bg-vsky text-vnavy rounded font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase hover:bg-vgold transition-colors">Join Newsletter</Link>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
