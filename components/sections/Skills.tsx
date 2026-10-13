import { coreCS, skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Skills as a spec sheet: one row per area, no ratings. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionHeading
          id="skills-title"
          title="Skills"
          lede="The tools I've used to ship the projects below, grouped by where they sit in a system."
        />

        <div className="border-t border-line">
          {skillGroups.map((g) => (
            <div
              key={g.title}
              className="group relative grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-7"
              data-reveal
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-cyan shadow-[0_0_12px_rgb(52_232_255/.8)] transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
              />
              <div className="md:col-span-4 md:pl-5">
                <h3 className="text-xl font-semibold text-ink">{g.title}</h3>
                <p className="mt-1 text-sm text-dim">{g.note}</p>
              </div>
              <ul className="flex flex-wrap gap-x-2 gap-y-2 md:col-span-8 md:items-center">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="border border-line bg-panel/60 px-3 py-1.5 text-[0.95rem] text-ink/90 transition-colors group-hover:border-line-strong"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-muted" data-reveal>
          Coursework foundations: {coreCS.join(", ")}.
        </p>
      </div>
    </section>
  );
}
