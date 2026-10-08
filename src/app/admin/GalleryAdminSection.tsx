"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { LOCAL_GALLERY_MANIFEST, LOCAL_VIDEOS, fromFirestoreGallery } from "@/lib/media";

type GalleryItem = ReturnType<typeof fromFirestoreGallery>;
type ManifestEntry = { slug: string; source: string; width: number; height: number; orientation: string };

const THUMB = 800;
const FULL = 1800;

// Runs `worker` over `items` with at most `limit` in flight
async function pool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) await worker(items[next++]);
    })
  );
}

async function upload(path: string, blob: Blob) {
  const r = storageRef(storage, path);
  await uploadBytes(r, blob, { contentType: blob.type || undefined, cacheControl: "public, max-age=31536000" });
  return getDownloadURL(r);
}

async function fetchBlob(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.blob();
}

function canvasToWebp(source: CanvasImageSource, w: number, h: number, longSide: number, quality: number) {
  const scale = Math.min(1, longSide / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not encode image"))), "image/webp", quality)
  );
}

const orientationOf = (w: number, h: number) => (w > h * 1.15 ? "landscape" : h > w * 1.15 ? "portrait" : "square");

// Grabs a frame ~1s in as the poster, and reads the duration
async function videoPosterAndDuration(blob: Blob) {
  const url = URL.createObjectURL(blob);
  try {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.src = url;
    await new Promise((res, rej) => { video.onloadedmetadata = res; video.onerror = () => rej(new Error("Could not read video")); });
    const duration = video.duration;
    video.currentTime = Math.min(1, duration / 2);
    await new Promise((res) => { video.onseeked = res; });
    const poster = await canvasToWebp(video, video.videoWidth, video.videoHeight, 1280, 0.8);
    return { poster, duration: Math.round(duration) };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function GalleryAdminSection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "gallery"), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => fromFirestoreGallery(d.id, d.data())));
    } catch (err) {
      console.error("Error loading gallery:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  const fail = (msg: string) => setErrors((e) => [...e, msg]);
  const permissionHint = (err: unknown) => {
    const code = (err as { code?: string })?.code || "";
    return code.includes("unauthorized") || code.includes("permission-denied")
      ? " — permission denied (this account needs the admin claim, and the Firebase rules must allow it)"
      : "";
  };

  // ---- Import the local photos (public/gallery) and videos (public/videos) into Firebase ------
  async function importLocalMedia() {
    setBusy(true);
    setErrors([]);
    try {
      let manifest: ManifestEntry[] | null = null;
      try {
        const res = await fetch(LOCAL_GALLERY_MANIFEST);
        if (res.ok) manifest = await res.json();
      } catch {}
      if (!manifest) {
        setStatus("No local photos found. Run this from your local dev server (npm run dev) — public/gallery only exists on your computer.");
        return;
      }

      const have = new Set(items.map((i) => i.id));
      const photos = manifest.map((entry, order) => ({ entry, order })).filter(({ entry }) => !have.has(entry.slug));
      let done = 0;
      setStatus(`Photos 0/${photos.length}…`);
      await pool(photos, 4, async ({ entry, order }) => {
        try {
          const paths = [`gallery/${entry.slug}-thumb.webp`, `gallery/${entry.slug}-full.webp`];
          const [thumb, full] = await Promise.all([
            fetchBlob(`/gallery/thumb/${entry.slug}.webp`).then((b) => upload(paths[0], b)),
            fetchBlob(`/gallery/full/${entry.slug}.webp`).then((b) => upload(paths[1], b)),
          ]);
          await setDoc(doc(db, "gallery", entry.slug), {
            thumb, full, order,
            orientation: entry.orientation, width: entry.width, height: entry.height,
            caption: "", source: entry.source, storagePaths: paths, createdAt: serverTimestamp(),
          });
        } catch (err) {
          fail(`${entry.source}: ${(err as Error).message}${permissionHint(err)}`);
        }
        setStatus(`Photos ${++done}/${photos.length}…`);
      });

      const videoSnap = await getDocs(collection(db, "videos"));
      const haveVideos = new Set(videoSnap.docs.map((d) => d.id));
      const videos = LOCAL_VIDEOS.filter((v) => !haveVideos.has(v.id));
      done = 0;
      for (const v of videos) {
        setStatus(`Videos ${done}/${videos.length} — uploading ${v.src.split("/").pop()}…`);
        try {
          const blob = await fetchBlob(v.src);
          const { poster, duration } = await videoPosterAndDuration(blob);
          const paths = [`videos/${v.id}.mp4`, `thumbnails/${v.id}.webp`];
          const [src, thumbnail] = await Promise.all([upload(paths[0], blob), upload(paths[1], poster)]);
          const { id, ...fields } = v;
          await setDoc(doc(db, "videos", id), { ...fields, src, thumbnail, duration, storagePaths: paths });
        } catch (err) {
          fail(`${v.src}: ${(err as Error).message}${permissionHint(err)}`);
        }
        done++;
      }

      setStatus(`Done — ${photos.length} photo(s) and ${videos.length} video(s) processed.`);
      await load();
    } finally {
      setBusy(false);
    }
  }

  // ---- Upload new photos from this computer ----------------------------------------------------
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setErrors([]);
    let order = items.reduce((m, i) => Math.max(m, i.order), -1) + 1;
    let done = 0;
    try {
      for (const file of files) {
        setStatus(`Uploading ${++done}/${files.length}: ${file.name}`);
        try {
          let bitmap: ImageBitmap;
          try {
            bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
          } catch {
            throw new Error("this browser can't read this format (HEIC/RAW) — export it as JPG first");
          }
          const [thumbBlob, fullBlob] = await Promise.all([
            canvasToWebp(bitmap, bitmap.width, bitmap.height, THUMB, 0.72),
            canvasToWebp(bitmap, bitmap.width, bitmap.height, FULL, 0.78),
          ]);
          const slug = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          const paths = [`gallery/${slug}-thumb.webp`, `gallery/${slug}-full.webp`];
          const [thumb, full] = await Promise.all([upload(paths[0], thumbBlob), upload(paths[1], fullBlob)]);
          await setDoc(doc(db, "gallery", slug), {
            thumb, full, order: order++,
            orientation: orientationOf(bitmap.width, bitmap.height), width: bitmap.width, height: bitmap.height,
            caption: "", source: file.name, storagePaths: paths, createdAt: serverTimestamp(),
          });
        } catch (err) {
          fail(`${file.name}: ${(err as Error).message}${permissionHint(err)}`);
        }
      }
      setStatus(`Uploaded ${files.length} photo(s).`);
      await load();
    } finally {
      setBusy(false);
    }
  }

  // ---- Edit / reorder / delete -----------------------------------------------------------------
  async function saveCaption(item: GalleryItem, caption: string) {
    if (caption === item.caption) return;
    try {
      await updateDoc(doc(db, "gallery", item.id), { caption });
      setItems((list) => list.map((i) => (i.id === item.id ? { ...i, caption } : i)));
    } catch (err) {
      fail(`Caption not saved: ${(err as Error).message}${permissionHint(err)}`);
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const other = index + dir;
    if (other < 0 || other >= items.length) return;
    const a = items[index], b = items[other];
    // Swap positions; fall back to list positions if orders were equal
    const [orderA, orderB] = a.order === b.order ? [other, index] : [b.order, a.order];
    setBusy(true);
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, "gallery", a.id), { order: orderA });
      batch.update(doc(db, "gallery", b.id), { order: orderB });
      await batch.commit();
      await load();
    } catch (err) {
      fail(`Reorder failed: ${(err as Error).message}${permissionHint(err)}`);
    } finally {
      setBusy(false);
    }
  }

  async function remove(item: GalleryItem) {
    setBusy(true);
    try {
      await deleteDoc(doc(db, "gallery", item.id));
      // Best effort: the photo is already off the site once the document is gone
      await Promise.all((item.storagePaths as string[]).map((p) => deleteObject(storageRef(storage, p)).catch(() => {})));
      setItems((list) => list.filter((i) => i.id !== item.id));
    } catch (err) {
      fail(`Delete failed: ${(err as Error).message}${permissionHint(err)}`);
    } finally {
      setBusy(false);
      setPendingDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3">🖼️</span> Gallery
            <span className="ml-3 text-sm font-normal text-gray-500">{items.length} photo{items.length === 1 ? "" : "s"}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={importLocalMedia}
              disabled={busy || loading}
              className="px-4 py-2 text-sm rounded-xl border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50"
            >
              ⬇ Import local media
            </button>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={busy}
              className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg disabled:opacity-50"
            >
              + Upload photos
            </button>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={handleUpload} />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Photos appear on the About page in this order, 12 per page. <strong>Import local media</strong> uploads the match photos in{" "}
          <code>public/gallery</code> and the clips in <code>public/videos</code> to Firebase (skipping any already imported) — run it from
          your local dev server. Videos then show under the Videos tab.
        </p>
        {status && <p className="mt-3 text-sm font-medium text-blue-700 dark:text-blue-300">{busy && "⏳ "}{status}</p>}
        {errors.length > 0 && (
          <ul className="mt-3 text-sm text-red-600 dark:text-red-400 list-disc pl-5 space-y-1 max-h-40 overflow-y-auto">
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading gallery…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No photos in Firebase yet — use “Import local media” or “Upload photos”.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
                <img src={item.thumb} alt={item.caption} loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-1.5 left-1.5 text-[11px] font-bold bg-black/60 text-white rounded px-1.5 py-0.5">
                  #{index + 1} · p{Math.floor(index / 12) + 1}
                </span>
              </div>
              <div className="p-2 space-y-2">
                <input
                  defaultValue={item.caption}
                  onBlur={(e) => saveCaption(item, e.target.value.trim())}
                  placeholder="Caption (optional)"
                  className="w-full text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-transparent"
                />
                {pendingDeleteId === item.id ? (
                  <div className="flex gap-1">
                    <button type="button" onClick={() => remove(item)} disabled={busy} className="flex-1 text-xs py-1 rounded bg-red-600 text-white font-semibold">Delete</button>
                    <button type="button" onClick={() => setPendingDeleteId(null)} className="flex-1 text-xs py-1 rounded border border-gray-300 dark:border-gray-600">Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <button type="button" onClick={() => move(index, -1)} disabled={busy || index === 0} aria-label="Move earlier" className="flex-1 text-xs py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-30">↑</button>
                    <button type="button" onClick={() => move(index, 1)} disabled={busy || index === items.length - 1} aria-label="Move later" className="flex-1 text-xs py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-30">↓</button>
                    <button type="button" onClick={() => setPendingDeleteId(item.id)} disabled={busy} aria-label="Delete photo" className="flex-1 text-xs py-1 rounded border border-red-300 text-red-600 disabled:opacity-30">🗑</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
