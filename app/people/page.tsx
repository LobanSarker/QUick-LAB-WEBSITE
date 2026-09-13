import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { getPeople } from "@/lib/content";
import type { Person } from "@/lib/types";

export const metadata: Metadata = {
  title: "People",
  description: "Members of the QuICK Research Group.",
};

const ROLE_ORDER = [
  "Director",
  "Honorary Advisor",
  "Graduate Research Assistant",
  "Undergraduate Research Assistant",
  "Research Assistant",
];

function roleGroup(role: string | null): string {
  if (!role) return "Members";
  if (role.startsWith("Graduate")) return "Graduate Research Assistant";
  if (role.startsWith("Undergraduate")) return "Undergraduate Research Assistant";
  if (role === "Research Assistant (CS)") return "Research Assistant";
  return role;
}

function initialFor(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function PeoplePage() {
  const people = getPeople();

  const groups = new Map<string, Person[]>();
  for (const person of people) {
    const key = roleGroup(person.role);
    const list = groups.get(key) ?? [];
    list.push(person);
    groups.set(key, list);
  }

  const orderedKeys = [
    ...ROLE_ORDER.filter((r) => groups.has(r)),
    ...Array.from(groups.keys()).filter((k) => !ROLE_ORDER.includes(k)),
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-glow">
            Our people
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Meet the <span className="text-shimmer">Team</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Researchers, advisors and assistants from leading universities
            working together on quantum-guided intelligent computation.
          </p>
        </Reveal>

        {orderedKeys.map((groupName) => (
          <section key={groupName} className="mt-14">
            <Reveal>
              <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-slate-200">
                <span className="h-px w-8 bg-gradient-to-r from-violet-glow to-transparent" />
                {groupName}
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {groups.get(groupName)!.map((person, i) => (
                <Reveal key={person.id} delay={(i % 4) * 0.06}>
                  <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/40">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-glow to-cyan-glow text-lg font-bold text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]">
                        {initialFor(person.name)}
                      </div>
                      {person.profileUrl && (
                        <a href={person.profileUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-xs font-medium text-slate-400 transition-colors hover:text-cyan-glow"
                          aria-label={`LinkedIn profile of ${person.name}`}
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white">
                      {person.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-slate-400">
                      {person.institution}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {person.role && person.role !== "Research Assistant" && (
                        <span className="inline-block rounded-full bg-violet-glow/15 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">
                          {person.role}
                        </span>
                      )}
                      {person.email && (
                        <a href={`mailto:${person.email}`}
                          className="inline-block rounded-full bg-violet-glow/15 px-2.5 py-0.5 text-[11px] font-medium text-violet-300 transition-colors hover:text-cyan-glow"
                        >
                          {person.email}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
