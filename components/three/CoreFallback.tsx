/**
 * Static SVG version of the signal core. Shown while WebGL loads, when WebGL
 * is unavailable, and it is what search engines / no-JS visitors see.
 */
export function CoreFallback({ spin = true }: { spin?: boolean }) {
  const bars = Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * Math.PI * 2;
    const h = 8 + 14 * Math.abs(Math.sin(a * 3)) + 8 * Math.abs(Math.sin(a * 7 + 1));
    const r = 150;
    const x1 = 200 + Math.cos(a) * r;
    const y1 = 200 + Math.sin(a) * r;
    const x2 = 200 + Math.cos(a) * (r + h);
    const y2 = 200 + Math.sin(a) * (r + h);
    return { x1, y1, x2, y2, i };
  });

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="cf-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b0820" />
          <stop offset="70%" stopColor="#1c1240" />
          <stop offset="100%" stopColor="#ff3d9a" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cf-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34e8ff" />
          <stop offset="50%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#ff3d9a" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#cf-glow)" />
      <g className={spin ? "core-spin" : undefined}>
        {bars.map((b) => (
          <line
            key={b.i}
            x1={b.x1.toFixed(2)}
            y1={b.y1.toFixed(2)}
            x2={b.x2.toFixed(2)}
            y2={b.y2.toFixed(2)}
            stroke="url(#cf-ring)"
            strokeWidth="1.6"
          />
        ))}
      </g>
      <circle cx="200" cy="200" r="132" fill="none" stroke="#34e8ff" strokeOpacity="0.45" strokeWidth="0.8" />
      <ellipse cx="200" cy="200" rx="185" ry="60" fill="none" stroke="#7c5cff" strokeOpacity="0.4" strokeWidth="0.8" transform="rotate(-24 200 200)" />
      <polygon
        points="200,118 271,159 271,241 200,282 129,241 129,159"
        fill="none"
        stroke="#ff3d9a"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      <circle cx="200" cy="200" r="64" fill="url(#cf-core)" />
      <circle cx="200" cy="200" r="76" fill="none" stroke="#34e8ff" strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="3 5" />
    </svg>
  );
}
