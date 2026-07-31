"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function QuantumHero({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"waiting" | "webgl" | "fallback">("waiting");

  useEffect(() => {
    const w = window;
    if (prefersReducedMotion() || !supportsWebGL()) {
      const fallbackId = w.setTimeout(() => setMode("fallback"), 0);
      return () => w.clearTimeout(fallbackId);
    }
    if (typeof w.requestIdleCallback === "function") {
      const idleId = w.requestIdleCallback(
        () => setMode("webgl"),
        { timeout: 2500 },
      );
      return () => w.cancelIdleCallback(idleId);
    }
    const timeoutId = w.setTimeout(() => setMode("webgl"), 600);
    return () => w.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {mode === "webgl" ? (
        <Scene3D />
      ) : (
        <div className="aurora-bg absolute inset-0" aria-hidden="true" />
      )}
    </div>
  );
}
