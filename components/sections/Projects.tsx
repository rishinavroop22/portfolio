import { ExternalLink } from "lucide-react";
import { otherProjects, projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-36">
      <div aria-hidden className="grid-floor pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] opacity-60" />
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionHeading
          id="work-title"
          title="Selected work"
          lede="Each project lists the problem, what I implemented, and the numbers from its own tests and evaluations."
        />

        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-24 border-t border-line pt-10 md:mt-32">
            <h3 className="text-xl font-semibold text-ink" data-reveal>
              Also built
            </h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {otherProjects.map((p) => (
                <li key={p.name} className="grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-8" data-reveal>
                  <div className="md:col-span-4">
                    <p className="display text-3xl text-ink">{p.name}</p>
                  </div>
                  <p className="text-muted md:col-span-5">{p.summary}</p>
                  <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                    {p.stack.map((s) => (
                      <span key={s} className="border border-line px-2 py-0.5 font-mono text-[0.72rem] text-ink/80">
                        {s}
                      </span>
                    ))}
                    {p.repo ? (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-cyan hover:text-ink"
                      >
                        <GithubIcon size={15} /> Code<span className="sr-only"> for {p.name}</span>
                      </a>
                    ) : null}
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-cyan hover:text-ink"
                      >
                        <ExternalLink size={15} aria-hidden /> Live<span className="sr-only"> demo of {p.name}</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
