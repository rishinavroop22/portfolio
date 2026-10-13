"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { hasWebGL, cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { CoreFallback } from "./CoreFallback";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const noop = () => () => {};
let webglCache: boolean | undefined;
const getWebGL = () => (webglCache ??= hasWebGL());

function useWebGLSupport(): boolean | null {
  // null on the server / first paint, then the real answer on the client.
  return useSyncExternalStore<boolean | null>(noop, getWebGL, () => null);
}

function useIsCompact(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(max-width: 767px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

/** Hero 3D centrepiece with progressive enhancement over the SVG fallback. */
export function HeroVisual({ className }: { className?: string }) {
  const webgl = useWebGLSupport();
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className ?? "relative"}>
      <div
        className={cn(
          "absolute inset-[12%] transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <CoreFallback spin={!reduced} />
      </div>
      {webgl ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-out-expo",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <Scene
            visible={visible}
            reducedMotion={reduced}
            compact={compact}
            onReady={() => setReady(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
