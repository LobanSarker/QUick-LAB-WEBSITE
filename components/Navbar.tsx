"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import SearchOverlay, { type SearchIndex } from "./SearchOverlay";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ searchIndex }: { searchIndex: SearchIndex }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/images/logo.jpg"
            alt="QuICK logo"
            width={32}
            height={32}
            className="rounded-full ring-1 ring-violet-glow/40 transition-transform duration-300 group-hover:rotate-90"
          />
          <span className="text-lg font-bold tracking-tight">
            QuICK<span className="text-cyan-glow"> Lab</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${active ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-glow/30 to-cyan-glow/30 ring-1 ring-violet-glow/40"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search site"
              title="Search (press /)"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-violet-glow/15 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        index={searchIndex}
      />
    </header>
  );
}
