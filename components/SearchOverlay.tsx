"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type { BlogPost, Person, Publication, ResearchArea } from "@/lib/types";

export interface SearchIndex {
  blogs: BlogPost[];
  publications: Publication[];
  people: Person[];
  areas: ResearchArea[];
}

interface ResultItem {
  title: string;
  subtitle?: string;
  href: string;
}

interface ResultGroup {
  key: string;
  label: string;
  items: ResultItem[];
}

function matches(query: string, ...fields: (string | null | undefined)[]) {
  const q = query.toLowerCase();
  return fields.some((f) => (f ?? "").toLowerCase().includes(q));
}

export default function SearchOverlay({
  open,
  onClose,
  index,
}: {
  open: boolean;
  onClose: () => void;
  index: SearchIndex;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const groups = useMemo<ResultGroup[]>(() => {
    const q = query.trim();
    if (!q) return [];
    const results: ResultGroup[] = [];

    const blogItems = index.blogs
      .filter((b) => matches(q, b.title, b.excerpt, b.tags.join(" ")))
      .slice(0, 4)
      .map((b) => ({
        title: b.title,
        subtitle: b.excerpt,
        href: `/blog/${b.slug}`,
      }));
    if (blogItems.length) results.push({ key: "blogs", label: "Blog Posts", items: blogItems });

    const pubItems = index.publications
      .filter((p) => matches(q, p.title, p.venue, p.authors.join(" "), p.abstract))
      .slice(0, 4)
      .map((p) => ({
        title: p.title,
        subtitle: `${p.venue} · ${p.year} · ${p.authors.join(", ")}`,
        href: "/publications",
      }));
    if (pubItems.length)
      results.push({ key: "publications", label: "Publications", items: pubItems });

    const personItems = index.people
      .filter((p) => matches(q, p.name, p.institution, p.role))
      .slice(0, 4)
      .map((p) => ({
        title: p.name,
        subtitle: [p.role, p.institution].filter(Boolean).join(" · "),
        href: "/people",
      }));
    if (personItems.length) results.push({ key: "people", label: "People", items: personItems });

    const areaItems = index.areas
      .filter((a) => matches(q, a.name, a.description))
      .slice(0, 4)
      .map((a) => ({ title: a.name, subtitle: a.description, href: "/research" }));
    if (areaItems.length)
      results.push({ key: "areas", label: "Research Areas", items: areaItems });

    return results;
  }, [query, index]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-quantum-950/70 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          <motion.div
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <svg
                width="18"
                height="18"
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
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs, publications, people, research areas…"
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                aria-label="Search site"
              />
              <kbd className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">
                Esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-3">
              {query.trim() === "" && (
                <p className="px-3 py-8 text-center text-sm text-slate-500">
                  Type to search across the whole site.
                </p>
              )}
              {query.trim() !== "" && total === 0 && (
                <p className="px-3 py-8 text-center text-sm text-slate-500">
                  No results for “{query}”.
                </p>
              )}
              {groups.map((group) => (
                <div key={group.key} className="mb-2">
                  <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-300">
                    {group.label}
                  </p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={`${group.key}-${item.title}`}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-violet-glow/10"
                        >
                          <span className="block text-sm font-medium text-white">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="mt-0.5 line-clamp-1 block text-xs text-slate-400">
                              {item.subtitle}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
