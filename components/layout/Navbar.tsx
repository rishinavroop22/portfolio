"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // Lock scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line bg-void/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[var(--nav-h)] max-w-[90rem] items-center justify-between px-[var(--gutter)]"
      >
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
          <Monogram />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide text-ink sm:inline">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative block px-3 py-2 text-sm transition-colors",
                  active === item.id ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-cyan shadow-[0_0_8px_rgb(52_232_255/.8)]"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                ) : null}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={profile.links.resume}
              download
              className="inline-flex items-center gap-2 border border-line-strong px-3.5 py-2 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan"
            >
              <Download size={15} aria-hidden /> Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 top-[var(--nav-h)] h-[calc(100dvh-var(--nav-h))] overflow-y-auto bg-void px-[var(--gutter)] pb-10 pt-6 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="display block py-4 text-5xl text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={profile.links.resume}
              download
              className="clip-corner-sm mt-8 inline-flex min-h-11 items-center gap-2 bg-cyan px-5 py-2.5 font-semibold text-void"
            >
              <Download size={16} aria-hidden /> Download resume
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="relative grid size-9 place-items-center border border-line-strong font-display text-sm font-extrabold tracking-wider text-ink transition-colors group-hover:border-cyan"
    >
      RN
      <span className="absolute -right-px -top-px size-1.5 bg-magenta" />
      <span className="absolute -bottom-px -left-px size-1.5 bg-cyan" />
    </span>
  );
}
