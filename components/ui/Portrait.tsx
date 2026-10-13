import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Portrait in a HUD frame with cyan/magenta rim light. Uses the real photo
 * when profile.photo is set; otherwise a monogram plate of the same size.
 */
export function Portrait({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <figure className={cn("relative aspect-[4/5]", className)}>
      {/* rim light blooms behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 opacity-80 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 55% at 0% 60%, rgb(52 232 255 / .35), transparent 70%), radial-gradient(55% 55% at 100% 30%, rgb(255 61 154 / .35), transparent 70%)",
        }}
      />
      <div className="clip-corner hairline relative h-full w-full overflow-hidden bg-panel">
        {profile.photo ? (
          <>
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 60vw, 26vw"
              className="object-cover object-[50%_18%] brightness-[0.82] contrast-[1.08] saturate-[0.9]"
            />
            {/* cinematic grade: cool shadows, cyan edge left, magenta edge right */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(90deg, rgb(52 232 255 / .55) 0%, transparent 28%, transparent 70%, rgb(255 61 154 / .55) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgb(6 5 10 / .85), transparent 38%)" }}
            />
          </>
        ) : (
          <div className="relative grid h-full w-full place-items-center overflow-hidden">
            <div aria-hidden className="grid-floor absolute inset-0 opacity-70" />
            <span
              aria-hidden
              className="display relative bg-gradient-to-b from-ink to-ink/30 bg-clip-text text-[clamp(5rem,12vw,10rem)] text-transparent"
            >
              RN
            </span>
            <span className="sr-only">{profile.name}</span>
          </div>
        )}
        <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-40" />
      </div>

      {/* HUD corner ticks */}
      <span aria-hidden className="absolute -left-2 -top-2 h-6 w-6 border-l border-t border-cyan" />
      <span aria-hidden className="absolute -bottom-2 -right-2 h-6 w-6 border-b border-r border-magenta" />
    </figure>
  );
}
