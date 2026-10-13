import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "quiet";

const styles: Record<Variant, string> = {
  primary:
    "bg-cyan text-void hover:bg-ink shadow-[0_0_0_1px_rgb(52_232_255/.4),0_8px_30px_-8px_rgb(52_232_255/.55)]",
  ghost:
    "text-ink border border-line-strong hover:border-magenta hover:text-white bg-void/40 backdrop-blur-sm",
  quiet: "text-muted hover:text-ink underline-offset-4 hover:underline",
};

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  icon?: ReactNode;
};

/** Link styled as a button. Every button on this site navigates or downloads. */
export function ButtonLink({ variant = "primary", icon, className, children, ...rest }: Props) {
  return (
    <a
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 px-5 py-2.5 text-[0.95rem] font-semibold tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:translate-y-px",
        variant === "primary" && "clip-corner-sm",
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {icon ? (
        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" aria-hidden>
          {icon}
        </span>
      ) : null}
    </a>
  );
}
