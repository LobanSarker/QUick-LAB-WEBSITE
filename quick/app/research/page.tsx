import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { assetUrl } from "@/lib/assets";
import { getResearchAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Concentration",
  description:
    "The research concentrations of the QuICK Research Group — from supervised quantum computing to computer vision.",
};

export default function ResearchPage() {
  const areas = getResearchAreas();

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-glow">
            What we do
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Research <span className="text-shimmer">Concentration</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Eleven research concentrations where quantum mechanics guides
            intelligent computation for knowledge-based systems.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => {
            const image = assetUrl(area.image);
            return (
              <Reveal key={area.id} delay={(i % 3) * 0.08}>
                <TiltCard className="group h-full">
                  <article className="glass relative h-full overflow-hidden rounded-2xl">
                    <div className="relative aspect-[443/431] overflow-hidden">
                      {image && (
                        <Image
                          src={image}
                          alt={area.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-quantum-950 via-quantum-950/30 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="mb-3 block text-xs font-bold text-cyan-glow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-glow">
                        {area.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        {area.description}
                      </p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
