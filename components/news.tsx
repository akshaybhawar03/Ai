"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

type Article = {
  title?: string;
  description?: string;
  url: string;
  urlToImage?: string | null;
  source?: { name?: string } | null;
  publishedAt?: string;
};

const categories = ["finance", "business", "crypto", "economy", "stock"];

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("finance");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/news?category=${encodeURIComponent(category)}&q=${encodeURIComponent(debouncedSearch)}`
        );
        const data = await res.json();

        const arr: Article[] = Array.isArray(data?.articles) ? data.articles : [];
        if (!cancelled) setArticles(arr);
      } catch (err) {
        console.error("Error fetching news:", err);
        if (!cancelled) setArticles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [category, debouncedSearch]);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return articles;
    const s = debouncedSearch.toLowerCase();
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(s) ||
        a.description?.toLowerCase().includes(s)
    );
  }, [articles, debouncedSearch]);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
     
      {/* 🔍 search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div
          className="relative flex-1 w-full rounded-full border backdrop-blur-xl
                     bg-white/70 dark:bg-neutral-900/40 border-white/50 dark:border-white/10
                     shadow-sm focus-within:shadow-lg transition"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search finance, crypto, stocks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent outline-none rounded-full"
          />
        </div>
      </div>

      {/* 🏷️ category pills */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              c === category
                ? "bg-blue-600 text-white shadow"
                : "bg-white/70 dark:bg-neutral-800/50 hover:bg-blue-100 dark:hover:bg-neutral-700"
            }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* 📰 news grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/60 dark:border-white/10
                         bg-white/60 dark:bg-neutral-900/40 backdrop-blur animate-pulse"
            >
              <div className="h-40 bg-gray-200/70 dark:bg-neutral-800/70 rounded-t-2xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-4 w-5/6 bg-gray-200/70 dark:bg-neutral-800/70 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-gray-200/60 dark:border-white/10
                         bg-white/60 dark:bg-neutral-900/40 backdrop-blur
                         transition hover:-translate-y-1 hover:shadow-xl"
            >
              {a.urlToImage ? (
                <img
                  src={a.urlToImage}
                  alt={a.title || "news image"}
                  className="w-full h-40 object-cover rounded-t-2xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-40 rounded-t-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700" />
              )}

              <div className="p-4">
                <h3 className="font-semibold mb-2 group-hover:underline">
                  {a.title || "Untitled"}
                </h3>

                <p
                  className="text-sm text-gray-600 dark:text-gray-300 mb-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {a.description || "No description available."}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{a.source?.name || "Unknown source"}</span>
                  <span>{formatDate(a.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No news found</p>
      )}
    </div>
  );
}
