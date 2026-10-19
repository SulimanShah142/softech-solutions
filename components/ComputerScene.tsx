"use client";

import { Component, useCallback, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { RotateCcw } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

export type SceneMode = "platform" | "integrations" | "delivery";

const InteractiveScene = dynamic(() => import("./ComputerSceneRenderer"), {
  ssr: false,
  loading: () => null,
});

type SceneCopy = {
  label: string;
  platform: string;
  integrations: string;
  delivery: string;
  eyebrow: string;
  title: string;
  description: string;
  layers: [string, string, string];
  interfaces: string[];
  services: string[];
  infrastructure: string[];
  system: string;
  reset: string;
  rotate: string;
  zoom: string;
  fallback: string;
  loading: string;
};

const copy: Record<SiteLanguage, SceneCopy> = {
  en: {
    label: "Interactive software systems architecture",
    platform: "Platform",
    integrations: "Integrations",
    delivery: "Delivery",
    eyebrow: "SYSTEM ARCHITECTURE",
    title: "Engineered as a system",
    description: "A conceptual view of how interfaces, application services and infrastructure fit together.",
    layers: ["USER INTERFACES", "APPLICATION SERVICES", "DATA & INFRASTRUCTURE"],
    interfaces: ["Web platform", "Mobile apps", "Admin tools"],
    services: ["Business logic", "APIs & security", "Workflows"],
    infrastructure: ["Databases", "External services", "Cloud runtime"],
    system: "SYSTEM DESIGN",
    reset: "Reset view",
    rotate: "Drag to explore",
    zoom: "Scroll or pinch to zoom",
    fallback: "Software systems architecture",
    loading: "Loading the interactive systems visualization.",
  },
  "fa-AF": {
    label: "معماری تعاملی سیستم‌های نرم‌افزاری",
    platform: "پلتفرم",
    integrations: "یکپارچه‌سازی",
    delivery: "تحویل",
    eyebrow: "معماری سیستم",
    title: "طراحی‌شده به‌عنوان یک سیستم",
    description: "نمای مفهومی از ارتباط رابط‌ها، خدمات کاربردی و زیرساخت‌ها.",
    layers: ["رابط‌های کاربری", "خدمات کاربردی", "داده و زیرساخت"],
    interfaces: ["پلتفرم وب", "اپلیکیشن موبایل", "ابزارهای مدیریت"],
    services: ["منطق تجاری", "API و امنیت", "جریان‌های کاری"],
    infrastructure: ["پایگاه‌های داده", "خدمات بیرونی", "زیرساخت ابری"],
    system: "طراحی سیستم",
    reset: "بازنشانی نما",
    rotate: "برای بررسی بکشید",
    zoom: "برای بزرگ‌نمایی پیمایش یا نیشگون کنید",
    fallback: "معماری سیستم‌های نرم‌افزاری",
    loading: "نمایش تعاملی سیستم‌ها در حال بارگذاری است.",
  },
  ps: {
    label: "د سافټویر سیسټمونو متقابل جوړښت",
    platform: "پلېټفارم",
    integrations: "یوځای کول",
    delivery: "سپارنه",
    eyebrow: "د سیسټم جوړښت",
    title: "د یو سیسټم په توګه جوړ شوی",
    description: "د کارن مخونو، اپلېکېشن خدمتونو او زیربناوو ترمنځ د اړیکو مفهومي انځور.",
    layers: ["د کارن مخونه", "د اپلېکېشن خدمتونه", "ډاټا او زیربنا"],
    interfaces: ["وېب پلېټفارم", "موبایل اپلېکېشنونه", "مدیریتي وسایل"],
    services: ["سوداګریز منطق", "API او امنیت", "کاري بهیرونه"],
    infrastructure: ["ډېټابېسونه", "بهرني خدمتونه", "کلاوډ چاپېریال"],
    system: "د سیسټم ډیزاین",
    reset: "لید بېرته سمول",
    rotate: "د کتلو لپاره یې راکاږئ",
    zoom: "د لویولو لپاره سکرول یا نیشگون وکاروئ",
    fallback: "د سافټویر سیسټمونو جوړښت",
    loading: "د سیسټمونو متقابل انځور بار کېږي.",
  },
};

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function ArchitectureFallback({ text, mode, hidden }: {
  text: SceneCopy;
  mode: SceneMode;
  hidden: boolean;
}) {
  const activeIndex = mode === "platform" ? 0 : mode === "integrations" ? 1 : 2;

  return (
    <div
      role="img"
      aria-label={text.fallback}
      aria-hidden={hidden}
      className={`absolute inset-x-[8%] top-1/2 -translate-y-1/2 space-y-3 ${
        hidden ? "opacity-0" : ""
      }`}
    >
      {text.layers.map((layer, index) => {
        const accent = index === 0 ? "#42c7ff" : index === 1 ? "#168df5" : "#28d9a0";

        return (
          <div
            key={layer}
            className={`relative flex min-h-[58px] items-center gap-3 border bg-[#0b1625]/80 p-3 backdrop-blur-md ${
              activeIndex === index ? "border-white/25" : "border-white/10"
            }`}
          >
            <span aria-hidden="true" className="h-7 w-0.5 shrink-0" style={{ backgroundColor: accent }} />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-slate-300">{layer}</p>
              <div className="mt-2 flex gap-2" aria-hidden="true">
                {[0, 1, 2].map((item) => (
                  <span key={item} className="h-1 flex-1 bg-white/[0.12]" />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ComputerScene({ language }: { language: SiteLanguage }) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [sceneNearViewport, setSceneNearViewport] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mode, setMode] = useState<SceneMode>("platform");
  const [hasInteracted, setHasInteracted] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const text = copy[language];

  useEffect(() => {
    let supported = false;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      supported = Boolean(gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      supported = false;
    }
    setWebglSupported(supported);

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    updateMotion();
    preference.addEventListener("change", updateMotion);
    return () => preference.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setSceneNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSceneNearViewport(entry.isIntersecting),
      { rootMargin: "180px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleError = useCallback(() => setSceneFailed(true), []);
  const modes: { id: SceneMode; label: string }[] = [
    { id: "platform", label: text.platform },
    { id: "integrations", label: text.integrations },
    { id: "delivery", label: text.delivery },
  ];
  const showCanvas = webglSupported === true && sceneNearViewport && !sceneFailed;

  return (
    <div
      ref={sceneRef}
      role="group"
      aria-label={text.label}
      dir={language === "en" ? "ltr" : "rtl"}
      className="relative isolate mx-auto h-[390px] w-full overflow-hidden sm:h-[455px] lg:h-[520px] lg:max-w-[720px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 40% at 50% 46%, rgba(22,141,245,0.14), transparent 73%), radial-gradient(ellipse 32% 27% at 50% 48%, rgba(66,199,255,0.045), transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[16%] top-[18%] h-[60%] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      <ArchitectureFallback text={text} mode={mode} hidden={showCanvas} />
      {showCanvas && (
        <div
          className="absolute inset-0 z-[1] touch-pan-y"
          onPointerDownCapture={() => setHasInteracted(true)}
        >
          <SceneErrorBoundary onError={handleError}>
            <InteractiveScene mode={mode} reducedMotion={reducedMotion} controlsRef={controlsRef} />
          </SceneErrorBoundary>
        </div>
      )}

      <div className="absolute left-4 top-5 flex items-center gap-2.5 sm:left-7">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#42c7ff]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">{text.eyebrow}</span>
      </div>

      {showCanvas && (
        <button
          type="button"
          onClick={() => controlsRef.current?.reset()}
          aria-label={text.reset}
          className="absolute right-4 top-3 z-[2] inline-flex min-h-11 items-center gap-2 border border-white/10 bg-[#07111b]/80 px-3 text-[10px] font-medium text-slate-300 transition-colors hover:border-[#42c7ff]/45 hover:text-[#42c7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42c7ff] sm:right-7"
        >
          <RotateCcw size={13} aria-hidden="true" />
          {text.reset}
        </button>
      )}

      <div
        role="group"
        aria-label={text.system}
        className="absolute bottom-[3.6rem] left-1/2 z-[2] flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 border border-white/[0.11] bg-[#07111b]/95 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-md sm:bottom-[4.1rem]"
      >
        {modes.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={`min-h-11 whitespace-nowrap px-2.5 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42c7ff] sm:px-4 ${
              mode === id
                ? "bg-[#168df5]/15 text-[#e4f5ff] shadow-[inset_0_-2px_0_#42c7ff]"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {showCanvas && !hasInteracted && (
        <p className="absolute bottom-2 left-1/2 z-[2] max-w-[92%] -translate-x-1/2 text-center text-[9px] font-medium leading-4 text-slate-400 sm:bottom-3 sm:text-[10px]">
          {text.rotate}<span className="px-1.5 text-[#42c7ff]">·</span>{text.zoom}
        </p>
      )}

      <span className="sr-only" aria-live="polite">
        {text.system}: {modes.find((item) => item.id === mode)?.label}
      </span>
      <span className="sr-only">{text.title}. {text.description}</span>
    </div>
  );
}
