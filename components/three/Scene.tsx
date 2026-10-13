"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { HolographicCore } from "./HolographicCore";
import { ParticleField } from "./ParticleField";
import { listenPointer } from "./pointer";

type Props = {
  /** False when the hero is scrolled out of view: rendering pauses. */
  visible: boolean;
  reducedMotion: boolean;
  compact: boolean;
  onReady: () => void;
};

export default function Scene({ visible, reducedMotion, compact, onReady }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => listenPointer(), []);

  const animate = !reducedMotion;
  const frameloop = !visible ? "never" : animate ? "always" : "demand";

  return (
    <Canvas
      frameloop={frameloop}
      dpr={compact ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, compact ? 8.6 : 7.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => {
        if (!ready) {
          setReady(true);
          onReady();
        }
      }}
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <AdaptiveDpr pixelated={false} />
      <HolographicCore bars={compact ? 72 : 120} animate={animate} />
      <ParticleField count={compact ? 220 : 520} animate={animate} />
    </Canvas>
  );
}
