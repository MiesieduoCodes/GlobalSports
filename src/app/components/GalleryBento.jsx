"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  GALLERY_PAGE_SIZE,
  LOCAL_GALLERY_MANIFEST,
  fromFirestoreGallery,
  localGalleryItem,
  layoutPage
} from "@/lib/media";

const translations = {
  en: { eyebrow: "Gallery", title: "Club Moments", page: "Page", prev: "Previous page", next: "Next page", close: "Close", prevPhoto: "Previous photo", nextPhoto: "Next photo", photo: "Photo" },
  ru: { eyebrow: "Галерея", title: "Моменты клуба", page: "Страница", prev: "Предыдущая страница", next: "Следующая страница", close: "Закрыть", prevPhoto: "Предыдущее фото", nextPhoto: "Следующее фото", photo: "Фото" }
};

// 1 … 4 5 6 … 11 — always first, last and the current page's neighbours
function pageList(current, total) {
  const pages = new Set([0, total - 1, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 0 && p < total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(`gap-${p}`);
    out.push(p);
  });
  return out;
}

async function loadGallery() {
  try {
    const snap = await getDocs(query(collection(db, "gallery"), orderBy("order", "asc")));
    if (!snap.empty) return snap.docs.map((d) => fromFirestoreGallery(d.id, d.data()));
  } catch (err) {
    console.error("Error fetching gallery:", err);
  }
  try {
    const res = await fetch(LOCAL_GALLERY_MANIFEST);
    if (res.ok) return (await res.json()).map(localGalleryItem);
  } catch {
    // no local manifest — public/gallery only exists before photos are imported
  }
  return [];
}

export default function GalleryBento({ language }) {
  const t = translations[language] || translations.en;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(null); // index into items
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadGallery().then((list) => !cancelled && setItems(list));
    return () => { cancelled = true; };
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / GALLERY_PAGE_SIZE));
  const pageStart = page * GALLERY_PAGE_SIZE;
  const tiles = useMemo(
    () => layoutPage(items.slice(pageStart, pageStart + GALLERY_PAGE_SIZE), page),
    [items, pageStart, page]
  );

  // Warm the cache for the next page so switching feels instant
  useEffect(() => {
    items.slice(pageStart + GALLERY_PAGE_SIZE, pageStart + 2 * GALLERY_PAGE_SIZE).forEach((it) => {
      const img = new Image();
      img.src = it.thumb;
    });
  }, [items, pageStart]);

  const goToPage = (p) => {
    if (p === page || p < 0 || p >= totalPages) return;
    setPage(p);
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const step = useCallback(
    (dir) => setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const current = lightbox !== null ? items[lightbox] : null;

  return (
    <section className="section scroll-mt-[100px]" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-eyebrow">{t.eyebrow}</span>
            <h2 className="section-heading mb-0">{t.title}</h2>
          </div>
          {items.length > 0 && (
            <div className="font-barlow-condensed font-bold text-[12px] tracking-[2px] uppercase text-vmuted">
              {t.page} <span className="text-vgold">{page + 1}</span> / {totalPages}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-2 sm:grid-cols-4 grid-flow-dense gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[200px]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.045 } },
              exit: { opacity: 0, transition: { duration: 0.2 } }
            }}
          >
            {tiles.map(({ item, span }, i) => (
              <motion.button
                type="button"
                key={item.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.92, y: 16 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 24 } }
                }}
                onClick={() => setLightbox(pageStart + i)}
                className={`${span} relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-vgold/40 transition-colors duration-300 group bg-vnavy-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-vgold`}
                aria-label={item.caption || `${t.photo} ${pageStart + i + 1}`}
              >
                <img
                  src={item.thumb}
                  alt={item.caption || ""}
                  loading={i < 4 ? "eager" : "lazy"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vnavy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2" aria-label="Gallery pages">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              aria-label={t.prev}
              className="w-10 h-10 rounded-full border border-white/10 text-vwhite flex items-center justify-center hover:border-vgold hover:text-vgold transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </button>
            {pageList(page, totalPages).map((p) =>
              typeof p === "string" ? (
                <span key={p} className="w-6 text-center text-vmuted font-barlow-condensed">…</span>
              ) : (
                <button
                  type="button"
                  key={p}
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`min-w-10 h-10 px-2 rounded-full font-bebas text-[17px] tracking-[1px] transition-all ${p === page ? "bg-vgold text-vnavy scale-110 shadow-[0_0_0_4px_rgba(200,168,75,0.15)]" : "border border-white/10 text-vmuted hover:text-vwhite hover:border-white/30"}`}
                >
                  {p + 1}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages - 1}
              aria-label={t.next}
              className="w-10 h-10 rounded-full border border-white/10 text-vwhite flex items-center justify-center hover:border-vgold hover:text-vgold transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-vnavy/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={current.id}
              src={current.full}
              alt={current.caption || ""}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" onClick={() => setLightbox(null)} aria-label={t.close}
              className="absolute top-4 right-4 bg-vnavy/80 text-vwhite hover:text-vgold p-3 rounded-full border border-white/10 hover:border-vgold/30 transition-colors">
              <X size={22} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={t.prevPhoto}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-vnavy/80 text-vwhite hover:text-vgold p-3 rounded-full border border-white/10 hover:border-vgold/30 transition-colors">
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={t.nextPhoto}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-vnavy/80 text-vwhite hover:text-vgold p-3 rounded-full border border-white/10 hover:border-vgold/30 transition-colors">
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-barlow-condensed font-bold text-[12px] tracking-[2px] text-vmuted bg-vnavy/80 px-3 py-1 rounded-full">
              {lightbox + 1} / {items.length}
              {current.caption && <span className="text-vwhite normal-case tracking-normal ml-2">{current.caption}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
