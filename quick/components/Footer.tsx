import Link from "next/link";
import Image from "next/image";

const emails = [
  { label: "sumtamnimi@gmail.com", href: "mailto:sumtamnimi@gmail.com" },
  {
    label: "sumaiya@cse.uiu.ac.bd",
    href: "mailto:sumaiya@cse.uiu.ac.bd",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-violet-glow/15">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo.jpg"
              alt="QuICK logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-bold tracking-tight">
              QuICK<span className="text-cyan-glow"> Lab</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Quantum mechanics guided Intelligent Computation for Knowledge-based
            systems. We are QuICK to unlock knowledge at quantum speed.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/research", label: "Research Concentration" },
              { href: "/people", label: "People" },
              { href: "/publications", label: "Publications" },
              { href: "/blog", label: "Blog" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-300 transition-colors hover:text-cyan-glow"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {emails.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="text-slate-300 transition-colors hover:text-cyan-glow"
                >
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} QuICK Research Group · Quantum mechanics
        guided Intelligent Computation for Knowledge-based systems
      </div>
    </footer>
  );
}
