"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAP_EASE, DURATION, STAGGER } from "@/lib/animations";

/**
 * All scroll choreography lives here, driven by data attributes so the
 * sections themselves stay server components.
 *
 *  data-hero-line   hero intro sequence (runs once on load)
 *  data-split       section titles: clip-up reveal
 *  data-rule        gradient rules: draw from the left
 *  data-reveal      content blocks: short rise + fade, staggered per group
 *  data-flow        project pipeline nodes: light up in order
 *  data-parallax    background layers: drift at the given speed
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero intro: one orchestrated moment.
      const intro = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      gsap.fromTo(
        intro,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.slow,
          ease: GSAP_EASE,
          stagger: 0.09,
          delay: 0.1,
          clearProps: "transform",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          y: 30,
          duration: DURATION.slow,
          ease: GSAP_EASE,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: DURATION.slow,
          ease: GSAP_EASE,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.set("[data-reveal]", { opacity: 0 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: DURATION.base, ease: GSAP_EASE, stagger: STAGGER, overwrite: true },
          ),
      });

      gsap.utils.toArray<HTMLElement>("[data-flow-group]").forEach((group) => {
        const nodes = group.querySelectorAll("[data-flow]");
        gsap.fromTo(
          nodes,
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 80%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.2);
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
