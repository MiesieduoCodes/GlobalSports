// Gallery + video helpers shared by the About page, Videos pages and the admin.
//
// Source of truth is Firestore (`gallery`, `videos`), managed in /admin. The local file lists below
// are only what /admin → Gallery → "Import local media" uploads when those files are present
// (public/gallery from the photo converter, public/videos) — both have been imported already.

export const GALLERY_PAGE_SIZE = 12;

// Converted match photos (public/gallery is git-ignored; see .gitignore). Each entry:
// { slug, source, width, height, orientation }
export const LOCAL_GALLERY_MANIFEST = "/gallery/manifest.json";

export const localGalleryItem = (entry, order) => ({
  id: entry.slug,
  thumb: `/gallery/thumb/${entry.slug}.webp`,
  full: `/gallery/full/${entry.slug}.webp`,
  orientation: entry.orientation,
  caption: "",
  order
});

export const fromFirestoreGallery = (id, d) => ({
  id,
  thumb: d.thumb || d.full || "",
  full: d.full || d.thumb || "",
  orientation: d.orientation || "square",
  caption: d.caption || "",
  order: Number(d.order) || 0,
  storagePaths: d.storagePaths || []
});

// ---- Bento layouts ---------------------------------------------------------------------------
// Each page of 12 uses one of these patterns (rotating per page) so the grid visibly rearranges.
// Every pattern covers exactly 20 cells (1 big = 4, 2 tall, 3 wide, 6 small) of a 4-column grid.
const SPANS = {
  big: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  small: "col-span-1 row-span-1"
};
const PATTERNS = [
  ["big", "small", "small", "tall", "wide", "small", "tall", "small", "wide", "small", "wide", "small"],
  ["wide", "small", "tall", "small", "big", "small", "wide", "tall", "small", "small", "wide", "small"],
  ["small", "tall", "big", "small", "wide", "small", "small", "wide", "tall", "small", "small", "wide"]
];
const FITS = { tall: ["portrait"], wide: ["landscape"], big: ["landscape", "square"], small: [] };

// Place a page's photos into the page's pattern, putting portrait shots in tall tiles and
// landscape shots in wide ones where possible.
export function layoutPage(items, pageIndex) {
  const pattern = PATTERNS[pageIndex % PATTERNS.length].slice(0, items.length);
  const remaining = [...items];
  return pattern.map((shape) => {
    const wanted = FITS[shape];
    let i = wanted.length ? remaining.findIndex((it) => wanted.includes(it.orientation)) : -1;
    if (i === -1) i = 0;
    const [item] = remaining.splice(i, 1);
    return { item, shape, span: SPANS[shape] };
  });
}

// ---- Videos ----------------------------------------------------------------------------------
// Training clips in public/videos. Imported into the `videos` collection (same shape the admin
// Videos tab edits); titles can be renamed there afterwards.
const VIDEO_FILES = [
  ["VID-20250219-WA0072", "2025-02-19"],
  ["VID-20250219-WA0078", "2025-02-19"],
  ["VID-20250219-WA0082", "2025-02-19"],
  ["VID-20250219-WA0083", "2025-02-19"],
  ["VID-20250219-WA0118", "2025-02-19"],
  ["VID-20250219-WA0119", "2025-02-19"],
  ["VID-20250219-WA0121", "2025-02-19"],
  ["VID-20250220-WA0014", "2025-02-20"]
];
export const LOCAL_VIDEOS = VIDEO_FILES.map(([file, date], i) => ({
  id: file.toLowerCase(),
  src: `/videos/${file}.mp4`,
  thumbnail: "",
  title: { en: `Training session — clip ${i + 1}`, ru: `Тренировка — видео ${i + 1}`, fr: "", es: "" },
  description: { en: "", ru: "", fr: "", es: "" },
  category: "Training",
  link: "",
  date
}));

export const fromFirestoreVideo = (id, d) => ({
  id,
  src: d.src || "",
  thumbnail: d.thumbnail || "",
  title: d.title || { en: "Untitled video" },
  description: d.description || { en: "" },
  category: d.category || "",
  link: d.link || "",
  date: d.date || "",
  duration: Number(d.duration) || 0
});

// Newest first
export async function loadVideos() {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase");
  try {
    const snap = await getDocs(collection(db, "videos"));
    if (!snap.empty) {
      return snap.docs
        .map((d) => fromFirestoreVideo(d.id, d.data()))
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }
  } catch (err) {
    console.error("Error fetching videos:", err);
  }
  return [];
}

export const localized = (text, language) =>
  (text && (text[language] || text.en)) || "";

export const formatDuration = (seconds) => {
  if (!seconds) return "";
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const formatDate = (iso, language) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(language === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
};
