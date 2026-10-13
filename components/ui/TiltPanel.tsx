"use client";

import type { ReactNode, PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Panel that tilts toward the pointer in 3D and moves a light sheen with it.
 * Mouse/pen only; touch and reduced-motion users get a still panel.
 */
export function TiltPanel({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), spring);
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);
  const sheen = useTransform(
    [sheenX, sheenY] as never,
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgb(52 232 255 / .12), transparent 60%)`,
  );

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="[perspective:1100px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn("clip-corner hairline relative bg-panel/80 backdrop-blur-sm", className)}
      >
        {!reduced ? (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: sheen }} />
        ) : null}
        {children}
      </motion.div>
    </div>
  );
}
