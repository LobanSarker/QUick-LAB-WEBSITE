import Link from "next/link";
import type { Metadata } from "next";
import QuantumHero from "@/components/hero/QuantumHero";
import MagneticButton from "@/components/MagneticButton";
import ResearchMarquee from "@/components/ResearchMarquee";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import { getResearchAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "QuICK Research Group",
  description:
    "Quantum mechanics guided Intelligent Computation for Knowledge-based systems. We are QuICK to unlock knowledge at quantum speed.",
};

export default function Home() {
  const areas = getResearchAreas();

  return (
    <div className="aurora-bg min-h-screen">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[88vh] max-w-6xl items-center px-6">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-glow/30 bg-violet-glow/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300">
                <span className="animate-pulse-glow h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                Quantum mechanics guided Intelligent Computation
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                We are <span className="text-shimmer glow-text">QuICK</span> to
                Unlock Knowledge at{" "}
                <span className="text-cyan-glow">Quantum Speed</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                The QuICK Research Group builds knowledge-based systems where
                quantum computing meets deep learning, edge intelligence and
                computational science.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Link
                    href="/research"
                    className="inline-block rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow px-7 py-3.5 font-semibold text-white shadow-[0_0_32px_rgba(139,92,246,0.4)] transition-shadow hover:shadow-[0_0_44px_rgba(139,92,246,0.6)]"
                  >
                    Explore Research
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/people"
                    className="glass inline-block rounded-full px-7 py-3.5 font-semibold text-white transition-colors hover:border-cyan-glow/40"
                  >
                    Meet the Team
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="relative hidden h-[520px] lg:block">
            <QuantumHero />
          </Reveal>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-600" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
          </svg>
        </div>
      </section>

      {/* Research marquee */}
      <section className="relative border-y border-violet-glow/15 py-6">
        <ResearchMarquee areas={areas} />
      </section>



      {/* Newsletter + contact */}
      <section className="relative mx-auto max-w-6xl px-6 pt-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-glow/20 blur-3xl" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Subscribe to Our <span className="text-shimmer">Newsletter</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Quantum computing research updates, curated resources and lab news,
              straight to your inbox.
            </p>
            <div className="mt-8 flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pt-20 text-center">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Get in <span className="text-cyan-glow">Touch</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Collaborations, students, and opportunities — reach us at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "sumtamnimi@gmail.com", href: "mailto:sumtamnimi@gmail.com" },
              {
                label: "sumaiya@cse.uiu.ac.bd",
                href: "mailto:sumaiya@cse.uiu.ac.bd",
              },
            ].map((email) => (
              <a
                key={email.href}
                href={email.href}
                className="glass rounded-full px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-glow"
              >
                {email.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
