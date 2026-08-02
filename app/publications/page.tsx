import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PublicationGrid from "./PublicationGrid";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Selected publications of the QuICK Research Group in edge intelligence and quantum-guided computation.",
};

export default function PublicationsPage() {
  const items = getPublications();

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-glow">
            Our work
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Selected <span className="text-shimmer">Publications</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Filter by year to explore research from the group on edge
            intelligence, collaborative inference and quantum-guided models.
          </p>
        </Reveal>

        <div className="mt-12">
          <PublicationGrid items={items} />
        </div>
      </div>
    </div>
  );
}
