"use client";

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
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">GS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your content</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === "news" && <NewsAdminSection />}
        {activeTab === "matches" && <MatchesAdminSection />}
        {activeTab === "videos" && <VideosAdminSection />}
        {activeTab === "players" && <PlayersAdminSection />}
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
    if (!confirm("Are you sure you want to delete this item?")) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "news", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

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
        <h3 className="text-lg font-semibold mb-4">Existing News ({items.length})</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No news items yet. Create your first one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
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
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 text-xs rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-900/50"
                  >
                    Delete
                  </button>
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
  }

  function startEdit(item: any) {
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
    if (!confirm("Are you sure you want to delete this match?")) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "matches", id));
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
        <h3 className="text-lg font-semibold mb-4">Scheduled Matches ({items.length})</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No matches scheduled. Add your first one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold">{item.team1}</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">VS</span>
                  <span className="font-bold">{item.team2}</span>
                </div>
                {(item.date || item.venue) && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {item.date && <span>📅 {item.date}</span>}
                    {item.time && <span className="ml-2">⏰ {item.time}</span>}
                    {item.venue && <div>📍 {item.venue}</div>}
                  </div>
                )}
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
            ))}
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
  }

  function startEdit(item: PlayerItem) {
    setForm({ ...item });
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
    if (!confirm("Are you sure you want to delete this player?")) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "players", id));
      await load();
    } finally {
      setSaving(false);
    }
  }

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
        <h3 className="text-lg font-semibold mb-4">Squad Roster ({items.length})</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No players yet. Add your first player!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.jerseyNumber || "?"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400">{item.position}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.nationality}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-2">
                    <div className="font-bold text-gray-900 dark:text-white">{item.appearances}</div>
                    <div className="text-gray-500 dark:text-gray-400">Apps</div>
                  </div>
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-2">
                    <div className="font-bold text-green-600">{item.goals}</div>
                    <div className="text-gray-500 dark:text-gray-400">Goals</div>
                  </div>
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-2">
                    <div className="font-bold text-blue-600">{item.assists}</div>
                    <div className="text-gray-500 dark:text-gray-400">Assists</div>
                  </div>
                </div>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
