"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import type { NewsItem, MatchItem, VideoItem, LocalizedText } from "@/types/content";
import newsSeed from "@/app/components/constants/news.json";
import matchesSeed from "@/app/components/constants/matches.json";
import videosSeed from "@/app/components/constants/videos.json";

const tabs = [
  { id: "news" as const, label: "News" },
  { id: "matches" as const, label: "Matches" },
  { id: "videos" as const, label: "Videos" },
];

type TabId = (typeof tabs)[number]["id"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function createLocalizedText(base?: Partial<LocalizedText>): LocalizedText {
  const en = base?.en && isNonEmptyString(base.en) ? base.en : "";
  return {
    en,
    ru: base?.ru ?? "",
    fr: base?.fr ?? "",
    es: base?.es ?? "",
  };
}

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">Checking authentication…</p>
      </div>
    );
  }

  if (!user) {
    return <AdminAuthScreen />;
  }

  return <AdminShell />;
}

function AdminAuthScreen() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Authentication failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-md shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {mode === "login" ? "Admin Sign In" : "Create Admin Account"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Use your admin credentials to access the dashboard.
        </p>
        {error && (
          <p className="mb-3 text-sm text-red-500">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting
              ? "Submitting..."
              : mode === "login"
              ? "Sign In"
              : "Register"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-4 text-xs text-blue-600 dark:text-yellow-400 hover:underline"
        >
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

function AdminShell() {
  const [activeTab, setActiveTab] = useState<TabId>("news");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Manage the dynamic content that appears on the public site. Data is stored in Firebase Firestore.
            </p>
          </div>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-300 dark:border-gray-700 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-800 border border-b-0 border-gray-300 dark:border-gray-700"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "news" && <NewsAdminSection />}
        {activeTab === "matches" && <MatchesAdminSection />}
        {activeTab === "videos" && <VideosAdminSection />}
      </div>
    </div>
  );
}

function NewsAdminSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<NewsItem>>({ title: "", description: "", image: "", link: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "news"));
      const docs: NewsItem[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<NewsItem, "id">) }));
      if (docs.length === 0 && Array.isArray((newsSeed as any).news)) {
        setItems((newsSeed as any).news.map((n: any, index: number) => ({
          id: String(index),
          title: n.title ?? "",
          description: n.description ?? "",
          image: n.image ?? "",
          link: n.link ?? "",
        })));
      } else {
        setItems(docs);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof NewsItem, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({ title: "", description: "", image: "", link: "" });
  }

  function startEdit(item: NewsItem) {
    setForm({ ...item });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        image: form.image ?? "",
        link: form.link ?? "",
      };
      if (form.id) {
        await updateDoc(doc(db, "news", form.id), payload);
      } else {
        await addDoc(collection(db, "news"), payload);
      }
      await load();
      startCreate();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setSaving(true);
    try {
      await deleteDoc(doc(db, "news", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function seedFromJson() {
    setSaving(true);
    try {
      const snapshot = await getDocs(collection(db, "news"));
      if (snapshot.empty && Array.isArray((newsSeed as any).news)) {
        const col = collection(db, "news");
        const entries: any[] = (newsSeed as any).news;
        for (const entry of entries) {
          await addDoc(col, {
            title: entry.title ?? "",
            description: entry.description ?? "",
            image: entry.image ?? "",
            link: entry.link ?? "",
          });
        }
        await load();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">News</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startCreate}
            className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            New
          </button>
          <button
            type="button"
            onClick={seedFromJson}
            className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Seed from JSON
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={form.title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={form.image ?? ""}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link</label>
          <input
            type="text"
            value={form.link ?? ""}
            onChange={(e) => handleChange("link", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-60"
          >
            {form.id ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No news items yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded border border-gray-200 dark:border-gray-700 px-3 py-2"
              >
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MatchesAdminSection() {
  const [items, setItems] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<MatchItem>>({ team1: "", team1Logo: "", team2: "", team2Logo: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "matches"));
      const docs: MatchItem[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MatchItem, "id">) }));
      if (docs.length === 0 && Array.isArray(matchesSeed)) {
        setItems(matchesSeed.map((m: any, index: number) => ({
          id: String(index),
          team1: m.team1 ?? "",
          team1Logo: m.team1Logo ?? "",
          team2: m.team2 ?? "",
          team2Logo: m.team2Logo ?? "",
        })));
      } else {
        setItems(docs);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof MatchItem, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({ team1: "", team1Logo: "", team2: "", team2Logo: "" });
  }

  function startEdit(item: MatchItem) {
    setForm({ ...item });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.team1 || !form.team2) return;
    setSaving(true);
    try {
      const payload = {
        team1: form.team1,
        team1Logo: form.team1Logo ?? "",
        team2: form.team2,
        team2Logo: form.team2Logo ?? "",
      };
      if (form.id) {
        await updateDoc(doc(db, "matches", form.id), payload);
      } else {
        await addDoc(collection(db, "matches"), payload);
      }
      await load();
      startCreate();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setSaving(true);
    try {
      await deleteDoc(doc(db, "matches", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function seedFromJson() {
    setSaving(true);
    try {
      const snapshot = await getDocs(collection(db, "matches"));
      if (snapshot.empty && Array.isArray(matchesSeed)) {
        const col = collection(db, "matches");
        const entries: any[] = matchesSeed as any[];
        for (const entry of entries) {
          await addDoc(col, {
            team1: entry.team1 ?? "",
            team1Logo: entry.team1Logo ?? "",
            team2: entry.team2 ?? "",
            team2Logo: entry.team2Logo ?? "",
          });
        }
        await load();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Matches</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startCreate}
            className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            New
          </button>
          <button
            type="button"
            onClick={seedFromJson}
            className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Seed from JSON
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Team 1 Name</label>
          <input
            type="text"
            value={form.team1 ?? ""}
            onChange={(e) => handleChange("team1", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team 1 Logo URL</label>
          <input
            type="text"
            value={form.team1Logo ?? ""}
            onChange={(e) => handleChange("team1Logo", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team 2 Name</label>
          <input
            type="text"
            value={form.team2 ?? ""}
            onChange={(e) => handleChange("team2", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team 2 Logo URL</label>
          <input
            type="text"
            value={form.team2Logo ?? ""}
            onChange={(e) => handleChange("team2Logo", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-60"
          >
            {form.id ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No matches yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded border border-gray-200 dark:border-gray-700 px-3 py-2"
              >
                <div className="text-sm">
                  <div className="font-medium">
                    {item.team1} vs {item.team2}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {item.team1Logo} | {item.team2Logo}
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type VideoForm = {
  id?: string;
  src: string;
  thumbnail: string;
  titleEn: string;
  titleRu: string;
  titleFr: string;
  titleEs: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionFr: string;
  descriptionEs: string;
  link: string;
  date: string;
};

function VideosAdminSection() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<VideoForm>({
    src: "",
    thumbnail: "",
    titleEn: "",
    titleRu: "",
    titleFr: "",
    titleEs: "",
    descriptionEn: "",
    descriptionRu: "",
    descriptionFr: "",
    descriptionEs: "",
    link: "",
    date: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "videos"));
      const docs: VideoItem[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<VideoItem, "id">) }));
      if (docs.length === 0 && Array.isArray(videosSeed)) {
        setItems(videosSeed.map((v: any) => ({
          id: v.id ?? "",
          src: v.src ?? "",
          thumbnail: v.thumbnail ?? "",
          title: createLocalizedText(v.title),
          description: createLocalizedText(v.description),
          link: v.link ?? "",
          date: v.date ?? "",
        })));
      } else {
        setItems(docs);
      }
    } finally {
      setLoading(false);
    }
  }

  function toForm(video: VideoItem): VideoForm {
    return {
      id: video.id,
      src: video.src,
      thumbnail: video.thumbnail,
      titleEn: video.title.en ?? "",
      titleRu: video.title.ru ?? "",
      titleFr: video.title.fr ?? "",
      titleEs: video.title.es ?? "",
      descriptionEn: video.description.en ?? "",
      descriptionRu: video.description.ru ?? "",
      descriptionFr: video.description.fr ?? "",
      descriptionEs: video.description.es ?? "",
      link: video.link,
      date: video.date,
    };
  }

  function fromForm(v: VideoForm): Omit<VideoItem, "id"> {
    return {
      src: v.src,
      thumbnail: v.thumbnail,
      title: createLocalizedText({
        en: v.titleEn,
        ru: v.titleRu,
        fr: v.titleFr,
        es: v.titleEs,
      }),
      description: createLocalizedText({
        en: v.descriptionEn,
        ru: v.descriptionRu,
        fr: v.descriptionFr,
        es: v.descriptionEs,
      }),
      link: v.link,
      date: v.date,
    };
  }

  function handleChange(field: keyof VideoForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({
      src: "",
      thumbnail: "",
      titleEn: "",
      titleRu: "",
      titleFr: "",
      titleEs: "",
      descriptionEn: "",
      descriptionRu: "",
      descriptionFr: "",
      descriptionEs: "",
      link: "",
      date: "",
    });
  }

  function startEdit(item: VideoItem) {
    setForm(toForm(item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.src || !form.thumbnail) return;
    setSaving(true);
    try {
      const payload = fromForm(form);
      if (form.id) {
        await updateDoc(doc(db, "videos", form.id), payload);
      } else {
        await addDoc(collection(db, "videos"), payload);
      }
      await load();
      startCreate();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setSaving(true);
    try {
      await deleteDoc(doc(db, "videos", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function seedFromJson() {
    setSaving(true);
    try {
      const snapshot = await getDocs(collection(db, "videos"));
      if (snapshot.empty && Array.isArray(videosSeed)) {
        const col = collection(db, "videos");
        const entries: any[] = videosSeed as any[];
        for (const entry of entries) {
          await addDoc(col, {
            src: entry.src ?? "",
            thumbnail: entry.thumbnail ?? "",
            title: createLocalizedText(entry.title),
            description: createLocalizedText(entry.description),
            link: entry.link ?? "",
            date: entry.date ?? "",
          });
        }
        await load();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Videos</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startCreate}
            className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            New
          </button>
          <button
            type="button"
            onClick={seedFromJson}
            className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Seed from JSON
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Video Source Path</label>
          <input
            type="text"
            value={form.src}
            onChange={(e) => handleChange("src", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail Image Path</label>
          <input
            type="text"
            value={form.thumbnail}
            onChange={(e) => handleChange("thumbnail", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link</label>
          <input
            type="text"
            value={form.link}
            onChange={(e) => handleChange("link", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (EN)</label>
          <input
            type="text"
            value={form.titleEn}
            onChange={(e) => handleChange("titleEn", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (RU)</label>
          <input
            type="text"
            value={form.titleRu}
            onChange={(e) => handleChange("titleRu", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (FR)</label>
          <input
            type="text"
            value={form.titleFr}
            onChange={(e) => handleChange("titleFr", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (ES)</label>
          <input
            type="text"
            value={form.titleEs}
            onChange={(e) => handleChange("titleEs", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (EN)</label>
          <textarea
            value={form.descriptionEn}
            onChange={(e) => handleChange("descriptionEn", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (RU)</label>
          <textarea
            value={form.descriptionRu}
            onChange={(e) => handleChange("descriptionRu", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (FR)</label>
          <textarea
            value={form.descriptionFr}
            onChange={(e) => handleChange("descriptionFr", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (ES)</label>
          <textarea
            value={form.descriptionEs}
            onChange={(e) => handleChange("descriptionEs", e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm min-h-[80px]"
          />
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-60"
          >
            {form.id ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No videos yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded border border-gray-200 dark:border-gray-700 px-3 py-2"
              >
                <div>
                  <div className="font-medium text-sm">{item.title.en}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.description.en}
                  </div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
