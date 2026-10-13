"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "@/lib/utils";
import { pointer } from "./pointer";

type Props = { count: number; animate: boolean };

/** Sparse dust around the core. Round points, two colours, slow drift. */
export function ParticleField({ count, animate }: Props) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const rand = mulberry32(1337);
    const pos = new Float32Array(count * 3);
    const tint = new Float32Array(count);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;
      tint[i] = rand();
      size[i] = 0.6 + rand() * 1.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute float aTint;
          attribute float aSize;
          varying float vTint;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * 0.3 + aTint * 6.283) * 0.12;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
            vTint = aTint;
            vAlpha = 0.35 + 0.65 * abs(sin(uTime * 0.6 + aTint * 20.0));
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vTint;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            vec3 cyan = vec3(0.204, 0.91, 1.0);
            vec3 magenta = vec3(1.0, 0.24, 0.6);
            vec3 col = vTint > 0.72 ? magenta : cyan;
            gl_FragColor = vec4(col, smoothstep(0.5, 0.0, d) * vAlpha * 0.8);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const m = p.material as THREE.ShaderMaterial;
    m.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    if (!animate) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    p.rotation.y += delta * 0.015;
    // Parallax: the dust moves opposite to the core.
    p.position.x += (-pointer.x * 0.35 - p.position.x) * Math.min(1, delta * 1.5);
    p.position.y += (-pointer.y * 0.2 - p.position.y) * Math.min(1, delta * 1.5);
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
