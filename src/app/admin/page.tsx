"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import type React from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import type { NewsItem, MatchItem, VideoItem, LocalizedText } from "@/types/content";

const tabs = [
  { id: "news" as const, label: "📰 News", icon: "📰" },
  { id: "matches" as const, label: "⚽ Matches", icon: "⚽" },
  { id: "videos" as const, label: "🎬 Videos", icon: "🎬" },
  { id: "players" as const, label: "👥 Players", icon: "👥" },
];

type TabId = (typeof tabs)[number]["id"];

type PlayerItem = {
  id: string;
  name: string;
  position: string;
  nationality: string;
  jerseyNumber: number;
  image: string;
  story: string;
  strengths: string;
  joinYear: string;
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets: number;
};

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Checking authentication…</p>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-blue-900 font-bold text-2xl">GS</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Global Sports FC</h1>
          <p className="text-blue-200">Admin Dashboard</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {mode === "login" ? "Sign in to manage your content" : "Register to get started"}
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@globalsportsfc.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 transition-all shadow-lg"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {mode === "login" ? "Need an account? Register" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminShell() {
  const [activeTab, setActiveTab] = useState<TabId>("news");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 text-gray-900 dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 border-r border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm lg:flex lg:flex-col">
          <div className="px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">GS</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Admin Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Global Sports FC</p>
              </div>
            </div>
          </div>

          <div className="px-4 pb-6">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/60"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label.split(" ")[1]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="w-full px-4 py-3 text-sm rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">GS</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">Admin Dashboard</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage your content</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as TabId)}
                    className="h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 text-sm font-semibold"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => signOut(auth)}
                    className="h-10 px-4 text-sm rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-8 sm:px-6">
            <div className="mx-auto w-full max-w-7xl">
              {activeTab === "news" && <NewsAdminSection />}
              {activeTab === "matches" && <MatchesAdminSection />}
              {activeTab === "videos" && <VideosAdminSection />}
              {activeTab === "players" && <PlayersAdminSection />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ============================================
// NEWS ADMIN SECTION
// ============================================
function NewsAdminSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<NewsItem>>({ title: "", description: "", image: "", link: "" });
  const [query, setQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "news"));
      const docs: NewsItem[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<NewsItem, "id">) }));
      setItems(docs);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof NewsItem, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({ title: "", description: "", image: "", link: "" });
    setPendingDeleteId(null);
  }

  function startEdit(item: NewsItem) {
    setForm({ ...item });
    setPendingDeleteId(null);
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
      if (form.id === id) {
        startCreate();
      }
    } finally {
      setSaving(false);
      setPendingDeleteId(null);
    }
  }

  const filteredItems = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.title ?? "").toLowerCase().includes(q) ||
      (item.description ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3">📰</span> News Management
          </h2>
          <button
            type="button"
            onClick={startCreate}
            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 shadow-lg transition-all"
          >
            + Add New
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={form.title ?? ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news title"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={form.image ?? ""}
              onChange={(e) => handleChange("image", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="/images/news.jpg or https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Link</label>
            <input
              type="text"
              value={form.link ?? ""}
              onChange={(e) => handleChange("link", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="/news/article-slug"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={startCreate}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg"
            >
              {saving ? "Saving..." : form.id ? "Update News" : "Create News"}
            </button>
          </div>
        </form>
      </div>

      {/* Items List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold">Existing News ({filteredItems.length})</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Search by title or description"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
              📰
            </div>
            <p className="text-gray-500 dark:text-gray-400">No results found.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try a different search term or clear the filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border transition-all ${
                  form.id === item.id
                    ? "border-blue-400/60 dark:border-blue-400/40 ring-2 ring-blue-200/60 dark:ring-blue-900/30"
                    : "border-gray-200 dark:border-gray-600 hover:shadow-md"
                }`}
              >
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                )}
                <h4 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    Edit
                  </button>
                  {pendingDeleteId === item.id ? (
                    <>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-2 text-xs rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => setPendingDeleteId(null)}
                        className="px-3 py-2 text-xs rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setPendingDeleteId(item.id)}
                      className="px-3 py-2 text-xs rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// MATCHES ADMIN SECTION
// ============================================
function MatchesAdminSection() {
  const [items, setItems] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<MatchItem> & { date?: string; time?: string; venue?: string }>({
    team1: "", team1Logo: "", team2: "", team2Logo: "", date: "", time: "", venue: ""
  });
  const [query, setQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "matches"));
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
      setItems(docs);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({ team1: "", team1Logo: "", team2: "", team2Logo: "", date: "", time: "", venue: "" });
    setPendingDeleteId(null);
  }

  function startEdit(item: any) {
    setForm({ ...item });
    setPendingDeleteId(null);
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
        date: form.date ?? "",
        time: form.time ?? "",
        venue: form.venue ?? "",
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
      if (form.id === id) {
        startCreate();
      }
    } finally {
      setSaving(false);
      setPendingDeleteId(null);
    }
  }

  const filteredItems = (items as any[]).filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const haystack = `${item.team1 ?? ""} ${item.team2 ?? ""} ${item.venue ?? ""} ${item.date ?? ""} ${item.time ?? ""}`.toLowerCase();
    return haystack.includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3">⚽</span> Matches Management
          </h2>
          <button
            type="button"
            onClick={startCreate}
            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 shadow-lg"
          >
            + Add Match
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Team 1 Name *</label>
            <input
              type="text"
              value={form.team1 ?? ""}
              onChange={(e) => handleChange("team1", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Global Sports FC"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team 1 Logo URL</label>
            <input
              type="text"
              value={form.team1Logo ?? ""}
              onChange={(e) => handleChange("team1Logo", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="/images/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team 2 Name *</label>
            <input
              type="text"
              value={form.team2 ?? ""}
              onChange={(e) => handleChange("team2", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Opponent FC"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team 2 Logo URL</label>
            <input
              type="text"
              value={form.team2Logo ?? ""}
              onChange={(e) => handleChange("team2Logo", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="/images/opponent-logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Match Date</label>
            <input
              type="date"
              value={form.date ?? ""}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Match Time</label>
            <input
              type="time"
              value={form.time ?? ""}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Venue</label>
            <input
              type="text"
              value={form.venue ?? ""}
              onChange={(e) => handleChange("venue", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Stadium Name, City"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={startCreate}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-60 shadow-lg"
            >
              {saving ? "Saving..." : form.id ? "Update Match" : "Create Match"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold">Scheduled Matches ({filteredItems.length})</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Search matches (team, date, venue)"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
              ⚽
            </div>
            <p className="text-gray-500 dark:text-gray-400">No matches found.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try a different search term or clear the filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Time</th>
                    <th className="px-4 py-3 text-left font-semibold">Match</th>
                    <th className="px-4 py-3 text-left font-semibold">Venue</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item: any) => (
                    <tr
                      key={item.id}
                      className={
                        form.id === item.id
                          ? "bg-blue-50/60 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-800"
                      }
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {item.date || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {item.time || "—"}
                      </td>
                      <td className="px-4 py-3 min-w-[220px]">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{item.team1 || "—"}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            VS
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">{item.team2 || "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200 min-w-[220px]">
                        {item.venue || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="px-3 py-2 text-xs rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          >
                            Edit
                          </button>
                          {pendingDeleteId === item.id ? (
                            <>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-2 text-xs rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => setPendingDeleteId(null)}
                                className="px-3 py-2 text-xs rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-60"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => setPendingDeleteId(item.id)}
                              className="px-3 py-2 text-xs rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-60"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// VIDEOS ADMIN SECTION
// ============================================
function VideosAdminSection() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
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
      setItems(docs);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({
      id: "",
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
    setForm({
      id: item.id,
      src: item.src,
      thumbnail: item.thumbnail,
      titleEn: item.title.en ?? "",
      titleRu: item.title.ru ?? "",
      titleFr: item.title.fr ?? "",
      titleEs: item.title.es ?? "",
      descriptionEn: item.description.en ?? "",
      descriptionRu: item.description.ru ?? "",
      descriptionFr: item.description.fr ?? "",
      descriptionEs: item.description.es ?? "",
      link: item.link,
      date: item.date,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.src || !form.thumbnail) return;
    setSaving(true);
    try {
      const payload = {
        src: form.src,
        thumbnail: form.thumbnail,
        title: createLocalizedText({
          en: form.titleEn,
          ru: form.titleRu,
          fr: form.titleFr,
          es: form.titleEs,
        }),
        description: createLocalizedText({
          en: form.descriptionEn,
          ru: form.descriptionRu,
          fr: form.descriptionFr,
          es: form.descriptionEs,
        }),
        link: form.link,
        date: form.date,
      };
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
    if (!confirm("Are you sure you want to delete this video?")) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "videos", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3">🎬</span> Videos Management
          </h2>
          <button
            type="button"
            onClick={startCreate}
            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg"
          >
            + Add Video
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Video Source Path *</label>
            <input
              type="text"
              value={form.src}
              onChange={(e) => handleChange("src", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="/videos/video.mp4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail Image *</label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => handleChange("thumbnail", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="/images/thumbnail.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Link</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => handleChange("link", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title (English)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title (Russian)</label>
            <input
              type="text"
              value={form.titleRu}
              onChange={(e) => handleChange("titleRu", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description (English)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => handleChange("descriptionEn", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm min-h-[80px]"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={startCreate}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-60 shadow-lg"
            >
              {saving ? "Saving..." : form.id ? "Update Video" : "Create Video"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Video Library ({items.length})</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No videos yet. Add your first one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600"
              >
                <img src={item.thumbnail} alt={item.title.en} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-1 line-clamp-1">{item.title.en}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.date}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-2 text-xs rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// PLAYERS ADMIN SECTION (NEW)
// ============================================
function PlayersAdminSection() {
  const [items, setItems] = useState<PlayerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<PlayerItem>>({
    name: "",
    position: "Midfielder",
    nationality: "",
    jerseyNumber: 0,
    image: "",
    story: "",
    strengths: "",
    joinYear: new Date().getFullYear().toString(),
    appearances: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
  });
  const [query, setQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "players"));
      const docs: PlayerItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<PlayerItem, "id">),
      }));
      setItems(docs);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof PlayerItem, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreate() {
    setForm({
      name: "",
      position: "Midfielder",
      nationality: "",
      jerseyNumber: 0,
      image: "",
      story: "",
      strengths: "",
      joinYear: new Date().getFullYear().toString(),
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
    });
    setPendingDeleteId(null);
  }

  function startEdit(item: PlayerItem) {
    setForm({ ...item });
    setPendingDeleteId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.position) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name ?? "",
        position: form.position ?? "Midfielder",
        nationality: form.nationality ?? "",
        jerseyNumber: Number(form.jerseyNumber) || 0,
        image: form.image ?? "",
        story: form.story ?? "",
        strengths: form.strengths ?? "",
        joinYear: form.joinYear ?? new Date().getFullYear().toString(),
        appearances: Number(form.appearances) || 0,
        goals: Number(form.goals) || 0,
        assists: Number(form.assists) || 0,
        cleanSheets: Number(form.cleanSheets) || 0,
      };
      if (form.id) {
        await updateDoc(doc(db, "players", form.id), payload);
      } else {
        await addDoc(collection(db, "players"), payload);
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
      await deleteDoc(doc(db, "players", id));
      await load();
      if (form.id === id) {
        startCreate();
      }
    } finally {
      setSaving(false);
      setPendingDeleteId(null);
    }
  }

  const filteredItems = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const haystack = `${item.name ?? ""} ${item.position ?? ""} ${item.nationality ?? ""} ${item.jerseyNumber ?? ""}`.toLowerCase();
    return haystack.includes(q);
  });

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3">👥</span> Players Management
          </h2>
          <button
            type="button"
            onClick={startCreate}
            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg"
          >
            + Add Player
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              value={form.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Position *</label>
            <select
              value={form.position ?? "Midfielder"}
              onChange={(e) => handleChange("position", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Jersey Number</label>
            <input
              type="number"
              min="1"
              max="99"
              value={form.jerseyNumber ?? 0}
              onChange={(e) => handleChange("jerseyNumber", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nationality</label>
            <input
              type="text"
              value={form.nationality ?? ""}
              onChange={(e) => handleChange("nationality", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="Ghana"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Join Year</label>
            <input
              type="text"
              value={form.joinYear ?? ""}
              onChange={(e) => handleChange("joinYear", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="2023"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={form.image ?? ""}
              onChange={(e) => handleChange("image", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="/images/players/player.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Appearances</label>
            <input
              type="number"
              min="0"
              value={form.appearances ?? 0}
              onChange={(e) => handleChange("appearances", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Goals</label>
            <input
              type="number"
              min="0"
              value={form.goals ?? 0}
              onChange={(e) => handleChange("goals", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Assists</label>
            <input
              type="number"
              min="0"
              value={form.assists ?? 0}
              onChange={(e) => handleChange("assists", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Clean Sheets (Goalkeepers/Defenders)</label>
            <input
              type="number"
              min="0"
              value={form.cleanSheets ?? 0}
              onChange={(e) => handleChange("cleanSheets", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Strengths</label>
            <input
              type="text"
              value={form.strengths ?? ""}
              onChange={(e) => handleChange("strengths", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm"
              placeholder="Speed, Dribbling, Vision"
            />
          </div>
          <div className="lg:col-span-3 md:col-span-2">
            <label className="block text-sm font-medium mb-2">Player Story/Bio</label>
            <textarea
              value={form.story ?? ""}
              onChange={(e) => handleChange("story", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm min-h-[100px]"
              placeholder="Brief biography about the player..."
            />
          </div>
          <div className="lg:col-span-3 md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={startCreate}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-60 shadow-lg"
            >
              {saving ? "Saving..." : form.id ? "Update Player" : "Add Player"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold">Squad Roster ({filteredItems.length})</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Search players (name, position, #)"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
              👥
            </div>
            <p className="text-gray-500 dark:text-gray-400">No players found.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Try a different search term or clear the filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Player</th>
                    <th className="px-4 py-3 text-left font-semibold">Position</th>
                    <th className="px-4 py-3 text-left font-semibold">Nationality</th>
                    <th className="px-4 py-3 text-left font-semibold">Apps</th>
                    <th className="px-4 py-3 text-left font-semibold">Goals</th>
                    <th className="px-4 py-3 text-left font-semibold">Assists</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={
                        form.id === item.id
                          ? "bg-blue-50/60 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-800"
                      }
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold">
                          {item.jerseyNumber || "?"}
                        </div>
                      </td>
                      <td className="px-4 py-3 min-w-[220px]">
                        <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {item.position}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {item.nationality || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {item.appearances ?? 0}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-semibold text-green-700 dark:text-green-400">
                        {item.goals ?? 0}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-semibold text-blue-700 dark:text-blue-300">
                        {item.assists ?? 0}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="px-3 py-2 text-xs rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          >
                            Edit
                          </button>
                          {pendingDeleteId === item.id ? (
                            <>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-2 text-xs rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => setPendingDeleteId(null)}
                                className="px-3 py-2 text-xs rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-60"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => setPendingDeleteId(item.id)}
                              className="px-3 py-2 text-xs rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-60"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
