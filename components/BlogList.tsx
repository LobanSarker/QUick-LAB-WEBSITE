"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";
import type { BlogPost } from "@/lib/types";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const post of posts) for (const t of post.tags) set.add(t);
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false;
      if (!q) return true;
      return [post.title, post.excerpt, post.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [posts, query, tag]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-4 py-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-slate-500"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title, tag, or keyword…"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            aria-label="Search blog posts"
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTag(null)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                tag === null
                  ? "bg-gradient-to-r from-violet-glow to-cyan-glow text-white"
                  : "glass text-slate-300 hover:text-white"
              }`}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                  tag === t
                    ? "bg-gradient-to-r from-violet-glow to-cyan-glow text-white"
                    : "glass text-slate-300 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="glass rounded-2xl p-10 text-center text-slate-400">
          No posts match your search — try different keywords.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
