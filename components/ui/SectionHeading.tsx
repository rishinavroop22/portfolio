import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  /** Short line under the title that says what the section contains. */
  lede?: ReactNode;
};

/**
 * Section title: oversized condensed type with a thin signal rule.
 * The rule draws in on scroll (see ScrollEffects).
 */
export function SectionHeading({ id, title, lede }: Props) {
  return (
    <header className="mb-12 md:mb-16">
      <h2 id={id} className="display text-[clamp(3rem,9vw,7.5rem)] text-ink" data-split>
        {title}
      </h2>
      <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden
          data-rule
          className="block h-px w-40 shrink-0 origin-left sm:w-56 bg-gradient-to-r from-cyan via-violet to-magenta"
        />
        {lede ? <p className="max-w-[52ch] text-muted">{lede}</p> : null}
      </div>
    </header>
  );
}
