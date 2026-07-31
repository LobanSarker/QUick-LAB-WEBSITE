"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";import type { Publication } from "@/lib/types";
import { assetUrl, papersFolder } from "@/lib/assets";

export default function PublicationGrid({ items }: { items: Publication[] }) {
  const reduce = useReducedMotion();
  const years = useMemo(
    () => Array.from(new Set(items.map((p) => p.year))).sort((a, b) => b - a),
    [items],
  );
  const [year, setYear] = useState<number | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((pub) => {
      if (year !== "all" && pub.year !== year) return false;
      if (!q) return true;
      return [pub.title, pub.venue, pub.authors.join(" "), pub.abstract]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, year, query]);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setYear("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            year === "all"
              ? "bg-gradient-to-r from-violet-glow to-cyan-glow text-white"
              : "glass text-slate-300 hover:text-white"
          }`}
        >
          All
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              year === y
                ? "bg-gradient-to-r from-violet-glow to-cyan-glow text-white"
                : "glass text-slate-300 hover:text-white"
            }`}
          >
            {y}
          </button>
        ))}
        <div className="glass ml-auto flex w-full items-center gap-3 rounded-full px-4 py-2 sm:w-auto">
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
            placeholder="Search by title, author, venue…"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none sm:w-64"
            aria-label="Search publications"
          />
        </div>
      </div>

      <motion.ul layout className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((pub) => {
            const image = assetUrl(pub.image);
            return (
              <motion.li
                key={pub.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <article className="glass group grid gap-6 rounded-2xl p-6 transition-colors hover:border-cyan-glow/40 sm:grid-cols-[220px_1fr] sm:p-8">
                  <div className="relative aspect-[378/283] overflow-hidden rounded-xl">
                    {image ? (
                      <Image
                        src={image}
                        alt={pub.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 220px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid-bg absolute inset-0" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-violet-glow/40">
                        {String(pub.id).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-cyan-glow/10 px-3 py-1 text-xs font-semibold text-cyan-glow">
                        {pub.year}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-white sm:text-xl">
                      {pub.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-400">{pub.venue}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {pub.authors.join(" · ")}
                    </p>
                    {pub.abstract && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                        {pub.abstract}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-3 pt-4">
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-block rounded-full border border-cyan-glow/40 px-4 py-1.5 text-xs font-semibold text-cyan-glow transition-colors hover:bg-cyan-glow/10"
                        >
                          View paper ↗
                        </a>
                      )}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-block rounded-full border border-violet-glow/40 px-4 py-1.5 text-xs font-semibold text-violet-300 transition-colors hover:bg-violet-glow/10"
                        >
                          DOI
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <p className="mt-8 text-sm text-slate-500">
        Full texts of our publications:{" "}
        <a
          href={papersFolder}
          target="_blank"
          rel="noreferrer noopener"
          className="text-cyan-glow underline underline-offset-4 hover:brightness-110"
        >
          Papers folder ↗
        </a>
      </p>
    </>
  );
}
