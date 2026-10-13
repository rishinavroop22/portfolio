import { achievements, experience } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionHeading
          id="experience-title"
          title="Experience"
          lede="Roles and recognition outside the classroom."
        />

        <div className="grid gap-16 lg:grid-cols-12">
          <ol className="relative lg:col-span-8">
            <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />
            {experience.map((x) => (
              <li key={x.role + x.org} className="relative pb-10 pl-10 last:pb-0" data-reveal>
                <span aria-hidden className="absolute left-0 top-2 size-[11px] border border-cyan bg-void shadow-[0_0_10px_rgb(52_232_255/.7)]" />
                <p className="text-sm text-dim">{x.period}</p>
                <h3 className="mt-1 text-2xl font-semibold text-ink">
                  {x.role}, <span className="text-muted">{x.org}</span>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {x.points.map((pt) => (
                    <li key={pt} className="max-w-[64ch] leading-relaxed text-muted">
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-4" data-reveal>
            <h3 className="text-sm font-semibold text-muted">Recognition</h3>
            <ul className="mt-4 space-y-4">
              {achievements.map((a) => (
                <li key={a.title} className="clip-corner hairline bg-panel/70 p-6">
                  <p className="text-lg font-semibold leading-snug text-ink">{a.title}</p>
                  <p className="mt-1 text-sm text-dim">{a.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
