import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CopyEmail } from "@/components/ui/CopyEmail";

export function Contact() {
  const links = [
    { href: profile.links.linkedin, label: "LinkedIn", detail: "rishi-navroop", icon: <LinkedinIcon size={18} />, external: true },
    { href: profile.links.github, label: "GitHub", detail: "rishinavroop22", icon: <GithubIcon size={18} />, external: true },
    { href: profile.links.resume, label: "Resume", detail: "PDF, 1 page", icon: <Download size={18} aria-hidden />, download: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="noise relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 100%, rgb(255 61 154 / .16), transparent 70%), radial-gradient(50% 60% at 0% 0%, rgb(52 232 255 / .08), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <h2 id="contact-title" className="display text-[clamp(3.6rem,12vw,10.5rem)] text-ink" data-split>
          Get in touch
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg text-muted" data-reveal>
          I&apos;m looking for software engineering internships and full-time roles. Email is the fastest way to
          reach me.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.25rem,3.6vw,2.6rem)] font-semibold tracking-tight text-ink"
          >
            <Mail className="shrink-0 text-cyan" size={28} aria-hidden />
            <span className="truncate bg-gradient-to-r from-cyan to-magenta bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_2px]">
              {profile.email}
            </span>
          </a>
          <CopyEmail email={profile.email} />
        </div>

        <ul className="mt-14 grid border-y border-line sm:grid-cols-3" data-reveal>
          {links.map((l) => (
            <li key={l.label} className="border-line [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r">
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(l.download ? { download: true } : {})}
                className="group flex min-h-20 items-center justify-between gap-4 px-1 py-6 transition-colors hover:bg-panel/60 sm:px-6"
              >
                <span>
                  <span className="block text-xl font-semibold text-ink">{l.label}</span>
                  <span className="block text-sm text-dim">{l.detail}</span>
                </span>
                <span className="text-muted transition-colors group-hover:text-cyan">{l.icon}</span>
                {l.external ? <span className="sr-only">(opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
