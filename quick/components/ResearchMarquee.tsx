import type { ResearchArea } from "@/lib/types";

export default function ResearchMarquee({
  areas,
}: {
  areas: ResearchArea[];
}) {
  const items = areas.map((a) => a.name);
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2" aria-label="Research areas">
      <div className="animate-marquee flex w-max gap-4">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="glass rounded-full px-5 py-2 text-sm font-medium text-slate-200"
          >
            <span className="mr-1.5 text-violet-glow">◆</span>
            {name}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
