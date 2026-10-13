"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 w-fit items-center gap-2 border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan"
    >
      {state === "copied" ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">
        {state === "copied" ? "Email copied" : state === "failed" ? "Copy failed, select the address" : "Copy email"}
      </span>
    </button>
  );
}
