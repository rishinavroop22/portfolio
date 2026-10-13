"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointer } from "./pointer";

const CYAN = new THREE.Color("#34e8ff");
const VIOLET = new THREE.Color("#7c5cff");
const MAGENTA = new THREE.Color("#ff3d9a");

type Props = { bars: number; animate: boolean };

/**
 * "Signal core": a fresnel-lit icosahedral core inside a wireframe lattice,
 * circled by a ring of signal bars. The bars respond to the pointer angle,
 * a nod to the signal processing in Rishi's speech and weather projects.
 */
export function HolographicCore({ bars, animate }: Props) {
  const root = useRef<THREE.Group>(null);
  const lattice = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const ring = useRef<THREE.InstancedMesh>(null);
  const orbitA = useRef<THREE.Mesh>(null);
  const orbitB = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const coreMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uRim: { value: MAGENTA.clone() },
          uRim2: { value: CYAN.clone() },
          uCore: { value: new THREE.Color("#0b0820") },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vView;
          varying float vWave;
          void main() {
            vec3 p = position;
            float w = sin(p.y * 6.0 + uTime * 1.4) * cos(p.x * 5.0 - uTime) * 0.035;
            p += normal * w;
            vWave = w;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uRim;
          uniform vec3 uRim2;
          uniform vec3 uCore;
          varying vec3 vNormal;
          varying vec3 vView;
          varying float vWave;
          void main() {
            float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
            vec3 rim = mix(uRim2, uRim, smoothstep(-0.6, 0.8, vNormal.y));
            vec3 col = mix(uCore, rim, f) + vWave * 2.0 * uRim2;
            gl_FragColor = vec4(col, 0.92);
          }
        `,
        transparent: true,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: VIOLET.clone() } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float d = distance(vUv, vec2(0.5));
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(uColor, a * a * 0.55);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const shellGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.75, 0)),
    [],
  );

  // Per-bar static data: angle and colour.
  const barData = useMemo(() => {
    const angles = new Float32Array(bars);
    for (let i = 0; i < bars; i++) angles[i] = (i / bars) * Math.PI * 2;
    return { angles };
  }, [bars]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = ring.current;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < bars; i++) {
      const t = i / bars;
      // cyan → violet → magenta → violet → cyan around the ring
      const k = Math.abs(t * 2 - 1);
      if (k < 0.5) c.copy(MAGENTA).lerp(VIOLET, k * 2);
      else c.copy(VIOLET).lerp(CYAN, (k - 0.5) * 2);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    writeBars(0, 0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bars]);

  function writeBars(time: number, pointerAngle: number, pointerOn: boolean) {
    const mesh = ring.current;
    if (!mesh) return;
    const R = 2.35;
    for (let i = 0; i < bars; i++) {
      const a = barData.angles[i];
      const wave =
        0.5 +
        0.35 * Math.sin(a * 3 + time * 1.3) +
        0.25 * Math.sin(a * 7 - time * 2.1) +
        0.15 * Math.sin(a * 13 + time * 3.3);
      let boost = 0;
      if (pointerOn) {
        const d = Math.atan2(Math.sin(a - pointerAngle), Math.cos(a - pointerAngle));
        boost = Math.exp(-(d * d) / 0.08) * 1.4;
      }
      const h = 0.06 + Math.max(0, wave) * 0.32 + boost * 0.55;
      dummy.position.set(Math.cos(a) * (R + h / 2), Math.sin(a) * (R + h / 2), 0);
      dummy.rotation.set(0, 0, a - Math.PI / 2);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = root.current;
    if (!g) return;

    if (animate) {
      if (core.current) (core.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      // Ease the whole object toward the pointer.
      const tx = pointer.y * 0.35;
      const ty = pointer.x * 0.55;
      g.rotation.x += (tx - g.rotation.x) * Math.min(1, delta * 2.5);
      g.rotation.y += (ty - g.rotation.y) * Math.min(1, delta * 2.5);
      if (lattice.current) {
        lattice.current.rotation.y += delta * 0.18;
        lattice.current.rotation.x += delta * 0.07;
      }
      if (shell.current) {
        shell.current.rotation.y -= delta * 0.1;
        shell.current.rotation.z += delta * 0.04;
      }
      if (orbitA.current) orbitA.current.rotation.z += delta * 0.25;
      if (orbitB.current) orbitB.current.rotation.z -= delta * 0.18;
      const pointerAngle = Math.atan2(pointer.y, pointer.x);
      writeBars(t, pointerAngle, pointer.active);
    }
  });

  return (
    <group ref={root}>
      {/* soft glow behind everything */}
      <mesh position={[0, 0, -1.2]} material={glowMaterial}>
        <planeGeometry args={[9, 9]} />
      </mesh>

      {/* fresnel core */}
      <mesh ref={core} material={coreMaterial}>
        <icosahedronGeometry args={[0.95, 5]} />
      </mesh>

      {/* inner lattice */}
      <mesh ref={lattice} scale={1.18}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.45} toneMapped={false} />
      </mesh>

      {/* outer shell edges */}
      <lineSegments ref={shell} geometry={shellGeometry}>
        <lineBasicMaterial color={MAGENTA} transparent opacity={0.35} toneMapped={false} />
      </lineSegments>

      {/* signal ring */}
      <instancedMesh ref={ring} args={[undefined, undefined, bars]}>
        <boxGeometry args={[0.028, 1, 0.028]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
      </instancedMesh>

      {/* orbit rings */}
      <mesh ref={orbitA} rotation={[1.15, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.004, 6, 160]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh ref={orbitB} rotation={[-0.9, 0.6, 0]}>
        <torusGeometry args={[2.9, 0.003, 6, 180]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}
