import { ArrowDownRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/Button";
import { Portrait } from "@/components/ui/Portrait";
import { HeroVisual } from "@/components/three/HeroVisual";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="noise relative isolate flex min-h-dvh flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* atmosphere */}
      <div aria-hidden className="grid-floor absolute inset-0 -z-20" data-parallax="0.15" />
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(50% 60% at 78% 42%, rgb(124 92 255 / .22), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgb(52 232 255 / .08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[90rem] flex-1 grid-cols-1 items-center gap-y-10 px-[var(--gutter)] pb-10 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-4">
        {/* copy */}
        <div className="relative z-10 lg:col-span-7">
          <p data-hero-line className="mb-6 inline-flex items-center gap-2.5 border border-line bg-void/60 px-3 py-1.5 text-sm text-muted backdrop-blur-sm">
            <span className="pulse-dot size-2 rounded-full bg-cyan" aria-hidden />
            {profile.status}
          </p>

          <h1 id="hero-title" className="display text-ink">
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-[clamp(4.4rem,11.5vw,10.5rem)]">
                {profile.firstName}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-line
                className="block bg-gradient-to-r from-ink via-ink to-cyan bg-clip-text pb-[0.04em] text-[clamp(4.4rem,11.5vw,10.5rem)] text-transparent"
              >
                {profile.lastName}
              </span>
            </span>
          </h1>

          <p data-hero-line className="mt-7 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.9rem)] font-semibold leading-snug tracking-tight text-ink">
            {profile.headline}
          </p>
          <p data-hero-line className="mt-4 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div data-hero-line className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work" icon={<ArrowDownRight size={18} />}>
              View projects
            </ButtonLink>
            <ButtonLink href={profile.links.resume} download variant="ghost" icon={<Download size={16} />}>
              Download resume
            </ButtonLink>
            <ButtonLink href="#contact" variant="quiet" icon={<Mail size={16} />}>
              Contact me
            </ButtonLink>
          </div>
        </div>

        {/* visual: portrait inside the signal core */}
        <div className="relative mx-auto mt-6 w-full max-w-[26rem] py-10 lg:col-span-5 lg:mt-0 lg:max-w-none lg:py-0" data-hero-line>
          <HeroVisual className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 sm:w-[120%] lg:left-[62%] lg:top-[52%] lg:w-[128%]" />
          <Portrait priority className="relative mx-auto w-[62%] sm:w-[54%] lg:ml-[8%] lg:mt-16 lg:w-[58%]" />
        </div>
      </div>

      {/* bottom HUD strip */}
      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-[var(--gutter)] py-4 text-sm text-dim">
          <span>
            {profile.education.degree.replace("B.E. in ", "B.E. ")}, JSSSTU, class of 2027
            <span className="hidden md:inline"> / {profile.location}</span>
          </span>
          <a href="#about" className="group hidden items-center gap-3 text-muted hover:text-ink sm:inline-flex">
            Scroll
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-cyan" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
