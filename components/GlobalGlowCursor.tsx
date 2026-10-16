"use client";

import { useEffect, useState } from "react";
import GlowCursor from "@/components/GlowCursor";

export default function GlobalGlowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [excluded, setExcluded] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const updateExcludedSection = (event: PointerEvent) => {
      const target = event.target;
      const shouldExclude =
        target instanceof Element &&
        target.closest("[data-disable-global-glow-cursor]") !== null;

      setExcluded((current) => (current === shouldExclude ? current : shouldExclude));
    };

    window.addEventListener("pointermove", updateExcludedSection, { passive: true });
    return () => window.removeEventListener("pointermove", updateExcludedSection);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ visibility: excluded ? "hidden" : "visible" }}
    >
      <GlowCursor
        color="#168bfa"
        secondaryColor="#08d890"
        intensity={0.55}
        trailWidth={2.2}
        linger={0.8}
        glow={0.7}
        hotspot={0.5}
        followSpeed={0.45}
        quality="medium"
        theme="dark"
        blendMode="screen"
        maxDevicePixelRatio={1.35}
        clickBurst={false}
        enabled={enabled}
        className="h-full w-full"
      />
    </div>
  );
}
