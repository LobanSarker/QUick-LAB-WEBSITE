"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

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
                : pathname.startsWith(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                    active
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
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
        </ul>
      </nav>
    </header>
  );
}
