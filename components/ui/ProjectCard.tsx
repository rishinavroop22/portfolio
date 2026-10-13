import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/data/projects";
import { TiltPanel } from "./TiltPanel";
import { cn } from "@/lib/utils";

/** One project as a case file: story on one side, a live "signal panel" on the other. */
export function ProjectCard({ project, flip = false }: { project: Project; flip?: boolean }) {
  const titleId = `project-${project.slug}`;
  return (
    <article aria-labelledby={titleId} className="border-t border-line pt-10 md:pt-14">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
        <div>
          <p className="mb-3 text-[0.95rem] text-cyan">
            {project.tagline}
            {project.context ? <span className="text-dim"> / {project.context}</span> : null}
          </p>
          <h3 id={titleId} className="display max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.6rem)] !leading-[0.9] text-ink">
            {project.name}
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan"
            >
              <GithubIcon size={16} /> Source code
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-corner-sm inline-flex min-h-11 items-center gap-2 bg-ink px-4 py-2 text-sm font-semibold text-void transition-colors hover:bg-cyan"
            >
              <ExternalLink size={16} aria-hidden /> Live demo
              <span className="sr-only"> of {project.name} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <p className="max-w-[62ch] text-lg leading-relaxed text-ink/90" data-reveal>
            {project.problem}
          </p>

          <h4 className="mt-9 text-sm font-semibold text-muted" data-reveal>
            What I built
          </h4>
          <ul className="mt-4 space-y-4">
            {project.built.map((b) => (
              <li key={b} className="relative max-w-[66ch] pl-6 leading-relaxed text-muted" data-reveal>
                <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-3 bg-magenta" />
                {b}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${project.name} technology stack`} data-reveal>
            {project.stack.map((s) => (
              <li key={s} className="border border-line px-2.5 py-1 font-mono text-[0.75rem] text-ink/80">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("lg:col-span-5", flip && "lg:order-1")} data-reveal>
          <TiltPanel className="p-6 sm:p-7">
            <p className="text-sm text-muted">How it works</p>
            <ol className="relative mt-5 space-y-0" data-flow-group>
              {project.flow.map((step, i) => (
                <li key={step} data-flow className="relative flex items-center gap-4 py-2">
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 grid size-3 shrink-0 place-items-center border",
                      i === project.flow.length - 1 ? "border-magenta bg-magenta" : "border-cyan bg-void",
                    )}
                  />
                  {i < project.flow.length - 1 ? (
                    <span aria-hidden className="absolute left-[5.5px] top-1/2 h-full w-px bg-gradient-to-b from-cyan/70 to-violet/40" />
                  ) : null}
                  <span className="text-[0.95rem] text-ink">{step}</span>
                </li>
              ))}
            </ol>

            <dl className="mt-7 grid grid-cols-2 border-t border-line">
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "border-b border-line py-4",
                    i % 2 === 0 ? "border-r pr-4" : "pl-4",
                  )}
                >
                  <dt className="text-xs leading-snug text-muted">{m.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
            {project.liveNote ? <p className="mt-4 text-xs leading-relaxed text-dim">{project.liveNote}</p> : null}
          </TiltPanel>
        </div>
      </div>
    </article>
  );
}
