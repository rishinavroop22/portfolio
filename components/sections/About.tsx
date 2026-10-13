import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const e = profile.education;
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-10 -z-10 h-[38rem] w-[38rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(124 92 255 / .14), transparent 65%)" }}
        data-parallax="-0.25"
      />
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionHeading id="about-title" title="About" lede="Who I am and what I like to build." />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <p
            className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.18] tracking-tight text-ink lg:col-span-6"
            data-reveal
          >
            I build software that can show its working: models in a pipeline, rules in plain files, and tests
            that say exactly what holds.
          </p>

          <div className="space-y-5 text-[1.075rem] leading-relaxed text-muted lg:col-span-6" >
            {profile.about.map((para) => (
              <p key={para} className="max-w-[62ch]" data-reveal>
                {para}
              </p>
            ))}
          </div>
        </div>

        <dl
          className="mt-16 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
        >
          <Fact label="Degree" value={e.degree} />
          <Fact label="University" value={e.school} />
          <Fact label="Years" value={e.years} />
          <Fact label="CGPA" value={e.cgpa} />
        </dl>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line py-6 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0">
      <dt className="text-sm text-dim">{label}</dt>
      <dd className="mt-2 text-lg font-semibold text-ink">{value}</dd>
    </div>
  );
}
