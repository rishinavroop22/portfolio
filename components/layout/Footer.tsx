import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

/** Minimal footer. The bar strip is a tiny echo of the hero's signal ring. */
export function Footer() {
  const bars = Array.from({ length: 48 }, (_, i) =>
    Math.round(3 + 9 * Math.abs(Math.sin(i * 0.55)) + 5 * Math.abs(Math.sin(i * 1.7))),
  );
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-[var(--gutter)] py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
          <div aria-hidden className="flex h-5 items-end gap-[2px]">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-[2px] bg-gradient-to-t from-violet to-cyan opacity-70"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <p className="text-sm text-dim">
            © 2026 {profile.name}. Built with Next.js and Three.js.
          </p>
        </div>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
          Back to top <ArrowUp size={15} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
