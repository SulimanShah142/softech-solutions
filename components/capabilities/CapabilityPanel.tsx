
"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  AppWindow,
  BrainCircuit,
  Check,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

type CapabilityVisual = "engineering" | "integrations" | "automation";

interface CapabilityPanelProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  visual: CapabilityVisual;
  language: SiteLanguage;
}

const artworkCopy = {
  en: {
    engineering: "On-device AI engineering for web and mobile products",
    integration: "Governed cloud and blockchain integrations across services",
    automation: "On-device AI orchestration with cloud-connected workflows",
    components: "ON-DEVICE AI / WEB + MOBILE",
    ready: "POLICY CONTROLS",
    synchronized: "GOVERNED SERVICES / SYNCHRONIZED",
    linked: "LINKED",
    workflow: "AI ORCHESTRATION",
    integrationLabel: "NETWORK / 02",
    workflowLabel: "ORCHESTRATION / 03",
    inputLabel: "INPUT",
    logicLabel: "AI LOGIC",
    outputLabel: "OUTPUT",
    processing: "ON-DEVICE",
    inputInsightAction: "INPUT → ON-DEVICE AI → ACTION",
    active: "POLICY READY",
    engineered: "GOVERNED",
    realWorld: "Secure, governed AI for products",
  },
  "fa-AF": {
    engineering: "مهندسی هوش مصنوعی روی دستگاه برای محصولات وب و موبایل",
    integration: "یکپارچه‌سازی‌های تحت حاکمیت ابر و بلاک‌چین میان خدمات",
    automation: "هماهنگی هوش مصنوعی روی دستگاه با روندهای متصل به ابر",
    components: "هوش مصنوعی روی دستگاه / وب و موبایل",
    ready: "کنترول‌های سیاستی",
    synchronized: "خدمات تحت حاکمیت / هماهنگ",
    linked: "پیوسته",
    workflow: "هماهنگی هوش مصنوعی",
    integrationLabel: "شبکه / ۰۲",
    workflowLabel: "هماهنگی / ۰۳",
    inputLabel: "ورودی",
    logicLabel: "منطق هوش مصنوعی",
    outputLabel: "خروجی",
    processing: "روی دستگاه",
    inputInsightAction: "ورودی ← هوش مصنوعی روی دستگاه ← اقدام",
    active: "کنترول‌های سیاستی آماده",
    engineered: "تحت حاکمیت",
    realWorld: "هوش مصنوعی امن و تحت حاکمیت برای محصولات",
  },
  ps: {
    engineering: "د وېب او موبایل محصولاتو لپاره د وسیلې دننه د ځیرکتیا انجینري",
    integration: "د کلاوډ او بلاکچېن د اداره شویو خدمتونو نښلونې",
    automation: "د کلاوډ له نښلول شويو کاري بهیرونو سره د وسیلې دننه همغږي",
    components: "پر وسیله ځیرکتیا / وېب او موبایل",
    ready: "د تګلارې کنټرولونه",
    synchronized: "اداره شوي خدمتونه / همغږي",
    linked: "نښلول شوی",
    workflow: "د مصنوعي ځیرکتیا همغږي",
    integrationLabel: "شبکه / ۰۲",
    workflowLabel: "همغږي / ۰۳",
    inputLabel: "ننوتنه",
    logicLabel: "د ځیرکتیا منطق",
    outputLabel: "وتنه",
    processing: "پر وسیله",
    inputInsightAction: "ننوتنه ← پر وسیله ځیرکتیا ← عمل",
    active: "تګلاره چمتو ده",
    engineered: "اداره شوی",
    realWorld: "د محصولاتو لپاره خوندي او اداره شوې ځیرکتیا",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

const styles = `
  @keyframes capabilitySignalTravel {
    0% {
      transform: translateX(-130%);
      opacity: 0;
    }
    18% {
      opacity: 1;
    }
    82% {
      opacity: 1;
    }
    100% {
      transform: translateX(430%);
      opacity: 0;
    }
  }

  @keyframes capabilityPathFlow {
    to {
      stroke-dashoffset: -36;
    }
  }

  @keyframes capabilityNodePulse {
    0%, 100% {
      opacity: .45;
      transform: scale(.85);
    }
    50% {
      opacity: 1;
      transform: scale(1.15);
    }
  }

  @keyframes capabilityCodeReveal {
    from {
      opacity: .25;
      transform: translateX(-5px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .capability-panel {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 650ms ease,
      transform 650ms cubic-bezier(.2,.75,.25,1),
      border-color 350ms ease,
      background-color 350ms ease,
      box-shadow 350ms ease;
  }

  .capability-panel.capability-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .capability-panel:hover {
    transform: translateY(-5px);
    background-color: rgba(11,23,38,.76);
    border-color: rgba(148,163,184,.22);
    box-shadow: 0 24px 60px rgba(0,0,0,.24);
  }

  .capability-art {
    transition:
      border-color 350ms ease,
      box-shadow 350ms ease;
  }

  .capability-panel:hover .capability-art {
    border-color: rgba(148,163,184,.19);
    box-shadow: 0 14px 38px rgba(0,0,0,.2);
  }

  .capability-panel:hover .integration-path {
    animation: capabilityPathFlow 2.4s linear infinite;
  }

  .automation-signal {
    animation: capabilitySignalTravel 2.2s ease-in-out infinite;
  }

  .automation-signal-delayed {
    animation-delay: -1.1s;
  }

  .capability-panel:hover .automation-signal {
    animation-duration: 1.3s;
  }

  .capability-code-line {
    transform-origin: left center;
    transition: opacity 300ms ease;
  }

  .capability-panel:hover .capability-code-line {
    animation: capabilityCodeReveal 450ms ease both;
  }

  .capability-panel:hover .capability-code-line:nth-child(2) {
    animation-delay: 45ms;
  }

  .capability-panel:hover .capability-code-line:nth-child(3) {
    animation-delay: 90ms;
  }

  .capability-panel:hover .capability-code-line:nth-child(4) {
    animation-delay: 135ms;
  }

  .capability-node-pulse {
    animation: capabilityNodePulse 2.6s ease-in-out infinite;
  }

  .capability-panel:focus-visible {
    outline: 2px solid rgba(40,217,160,.65);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .capability-panel,
    .capability-panel.capability-visible,
    .capability-panel:hover,
    .capability-art,
    .capability-code-line {
      opacity: 1;
      transform: none;
      animation: none !important;
      transition: none !important;
    }

    .integration-path,
    .automation-signal,
    .capability-node-pulse {
      animation: none !important;
    }
  }
`;

function EngineeringVisual({
  accent,
  language,
}: {
  accent: string;
  language: SiteLanguage;
}) {
  const copy = artworkCopy[language];
  const isRtl = language !== "en";

  const codeLines = [
    { width: 66, color: "#60A5FA" },
    { width: 43, color: "#94A3B8" },
    { width: 83, color: accent },
    { width: 57, color: "#94A3B8" },
  ];

  return (
    <div
      role="img"
      aria-label={copy.engineering}
      className="capability-art relative h-[172px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#060D18]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.07) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to bottom,black,transparent 95%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: accent }}
      />

      {/* Architecture index */}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
        <span className="font-mono text-[8px] tracking-[0.16em] text-slate-500">
          MODULE / 01
        </span>
      </div>

      {/* Code structure */}
      <div className="absolute inset-x-3 bottom-3 top-9 rounded-lg border border-white/[0.09] bg-[#080F1B]/95 shadow-xl transition-transform duration-500 group-hover:-translate-y-0.5">
        <div className="flex h-8 items-center justify-between border-b border-white/[0.07] px-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
          </div>

          <span className="font-mono text-[8px] text-slate-500">
            system.ts
          </span>

          <Code2 size={12} style={{ color: accent }} />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 px-3 py-3">
          <div className="space-y-2.5">
            {codeLines.map((line, index) => (
              <div
                key={index}
                className="capability-code-line flex items-center gap-2"
                style={{
                  animationDelay: `${index * 45}ms`,
                  transform: `translateX(${index * 5}px)`,
                }}
              >
                <span className="w-3 font-mono text-[8px] text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="h-[3px] rounded-full"
                  style={{
                    width: `${line.width}px`,
                    maxWidth: "80%",
                    background: line.color,
                    opacity: index === 2 ? 0.95 : 0.5,
                  }}
                />

                {index === 2 && (
                  <span
                    className="capability-node-pulse h-1.5 w-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Component structure */}
          <div
            aria-hidden="true"
            className={`flex flex-col justify-center gap-1.5 ${
              isRtl ? "items-start" : "items-end"
            }`}
          >
            {[accent, "#60A5FA", "#94A3B8"].map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5"
              >
                <span
                  className="h-3 w-5 rounded-sm border"
                  style={{
                    borderColor: `${color}55`,
                    background: `${color}12`,
                  }}
                />
                <span
                  className="h-px w-3"
                  style={{ background: `${color}70` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-4 z-10 flex items-center gap-1.5 ${
          isRtl ? "right-3 flex-row-reverse" : "left-3"
        }`}
      >
        <Layers3 size={11} style={{ color: accent }} />
        <span className="font-mono text-[8px] text-slate-400">
          {copy.components}
        </span>
      </div>

      <div
        className={`absolute bottom-4 z-10 flex items-center gap-1.5 ${
          isRtl ? "left-3 flex-row-reverse" : "right-3"
        }`}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
        <span className="font-mono text-[8px] text-slate-400">
          {copy.ready}
        </span>
      </div>
    </div>
  );
}

function IntegrationsVisual({
  accent,
  language,
  idPrefix,
}: {
  accent: string;
  language: SiteLanguage;
  idPrefix: string;
}) {
  const copy = artworkCopy[language];
  const isRtl = language !== "en";
  const gradientId = `${idPrefix}-integration-line`;

  return (
    <div
      role="img"
      aria-label={copy.integration}
      className="capability-art relative h-[172px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#060D18]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,.5) .7px,transparent .7px)",
          backgroundSize: "15px 15px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%,rgba(96,165,250,.09),transparent 65%)",
        }}
      />

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="font-mono text-[8px] tracking-[0.15em] text-slate-500">
          {copy.integrationLabel}
        </span>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 320 150"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <path
          d="M56 43 H105 Q120 43 120 58 V75 H142"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path"
        />

        <path
          d="M56 108 H91 Q107 108 107 92 V75 H142"
          stroke="#60A5FA"
          strokeOpacity="0.7"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path integration-path-delayed"
        />

        <path
          d="M178 75 H211 Q225 75 225 59 V43 H264"
          stroke={accent}
          strokeOpacity="0.7"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path integration-path-delayed"
        />

        <path
          d="M178 75 H211 Q225 75 225 91 V108 H264"
          stroke="#60A5FA"
          strokeOpacity="0.7"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path"
        />

        {[
          [56, 43, accent],
          [56, 108, "#60A5FA"],
          [264, 43, accent],
          [264, 108, "#60A5FA"],
        ].map(([cx, cy, color], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill={String(color)}
          />
        ))}

        <circle
          cx="160"
          cy="75"
          r="25"
          stroke={accent}
          strokeOpacity=".13"
          strokeWidth="1"
        />
      </svg>

      {/* Source nodes */}
      <div className="absolute left-[9%] top-[29%] flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white">
        <Globe2 size={14} />
      </div>

      <div className="absolute left-[9%] top-[64%] flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-blue-300 transition-transform duration-300 group-hover:-translate-y-1">
        <Database size={14} />
      </div>

      {/* Central integration layer */}
      <div
        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border bg-[#0B1B29] transition-[box-shadow,border-color] duration-500 group-hover:shadow-[0_0_30px_rgba(40,217,160,0.12)]"
        style={{
          color: accent,
          borderColor: `${accent}65`,
        }}
      >
        <GitBranch size={19} strokeWidth={1.5} />
      </div>

      {/* Destination nodes */}
      <div className="absolute right-[9%] top-[29%] flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5">
        <Workflow size={14} />
      </div>

      <div className="absolute right-[9%] top-[64%] flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-blue-300 transition-transform duration-300 group-hover:translate-x-0.5">
        <Activity size={14} />
      </div>

      <span
        className={`absolute bottom-3 font-mono text-[8px] text-slate-500 ${
          isRtl ? "right-3" : "left-3"
        }`}
      >
        {copy.synchronized}
      </span>

      <span
        className={`absolute bottom-3 flex items-center gap-1.5 font-mono text-[8px] text-slate-500 ${
          isRtl ? "left-3 flex-row-reverse" : "right-3"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
        {copy.linked}
      </span>
    </div>
  );
}

function AutomationVisual({
  accent,
  language,
}: {
  accent: string;
  language: SiteLanguage;
}) {
  const copy = artworkCopy[language];
  const isRtl = language !== "en";

  return (
    <div
      role="img"
      aria-label={copy.automation}
      className="capability-art relative h-[172px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#060D18]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%,rgba(40,217,160,.1),transparent 65%)",
        }}
      />

      <div
        className={`absolute left-3 right-3 top-3 flex items-center justify-between ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-mono text-[8px] tracking-[0.15em] text-slate-500">
          {copy.workflowLabel}
        </span>

        <span
          className={`flex items-center gap-1.5 font-mono text-[8px] text-slate-500 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <span
            className="capability-node-pulse h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          {copy.processing}
        </span>
      </div>

      {/* Processing sequence */}
      <div className="absolute inset-x-3 top-[38%] flex items-center justify-between gap-1.5 sm:inset-x-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5">
          <Activity size={14} />
        </div>

        <div className="relative h-px min-w-2 flex-1 overflow-hidden bg-white/10">
          <span
            className="automation-signal absolute inset-y-0 left-0 w-6"
            style={{
              background: `linear-gradient(90deg,transparent,${accent},transparent)`,
            }}
          />
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-[border-color,box-shadow] duration-500 group-hover:shadow-[0_0_25px_rgba(40,217,160,0.12)]"
          style={{
            color: accent,
            borderColor: `${accent}65`,
            background: `${accent}0C`,
          }}
        >
          <BrainCircuit size={21} strokeWidth={1.5} />
        </div>

        <div className="relative h-px min-w-2 flex-1 overflow-hidden bg-white/10">
          <span
            className="automation-signal automation-signal-delayed absolute inset-y-0 left-0 w-6"
            style={{
              background:
                "linear-gradient(90deg,transparent,#60A5FA,transparent)",
            }}
          />
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-emerald-300 transition-transform duration-300 group-hover:translate-y-0.5">
          <Check size={14} />
        </div>
      </div>

      {/* Sequence labels */}
      <div
        className={`absolute inset-x-3 top-[68%] flex items-center justify-between font-mono text-[7px] text-slate-500 sm:inset-x-4 sm:text-[8px] ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <span>01 / {copy.inputLabel}</span>
        <span>02 / {copy.logicLabel}</span>
        <span>03 / {copy.outputLabel}</span>
      </div>

      <div
        className={`absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5 ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-mono text-[8px] text-slate-500">
          {copy.inputInsightAction}
        </span>

        <span className="font-mono text-[8px]" style={{ color: accent }}>
          {copy.active}
        </span>
      </div>
    </div>
  );
}

function CapabilityArtwork({
  visual,
  accent,
  language,
  idPrefix,
}: {
  visual: CapabilityVisual;
  accent: string;
  language: SiteLanguage;
  idPrefix: string;
}) {
  switch (visual) {
    case "engineering":
      return <EngineeringVisual accent={accent} language={language} />;

    case "integrations":
      return (
        <IntegrationsVisual
          accent={accent}
          language={language}
          idPrefix={idPrefix}
        />
      );

    case "automation":
      return <AutomationVisual accent={accent} language={language} />;
  }
}

export default function CapabilityPanel({
  number,
  eyebrow,
  title,
  description,
  icon: Icon,
  accent,
  visual,
  language,
}: CapabilityPanelProps) {
  const copy = artworkCopy[language];
  const isRtl = language !== "en";
  const panelRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Stable unique prefix for SVG definitions across multiple instances.
  const generatedId = useId();
  const idPrefix = `capability-${generatedId.replace(/:/g, "")}`;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReducedMotion(media.matches);
    };

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const element = panelRef.current;

    if (!element) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const panelIndex = Number.parseInt(number, 10);
  const transitionDelay = Number.isFinite(panelIndex)
    ? Math.min(330, Math.max(0, (panelIndex - 2) * 110))
    : 0;

  return (
    <>
      <style>{styles}</style>

      <article
        ref={panelRef}
        lang={language}
        dir={isRtl ? "rtl" : "ltr"}
        className={`capability-panel group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#08111E]/45 p-4 sm:p-5 ${
          visible ? "capability-visible" : ""
        }`}
        style={{
          transitionDelay:
            visible && !reducedMotion ? `${transitionDelay}ms` : "0ms",
          ["--capability-accent" as string]: accent,
        }}
      >
        {/* Accent line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-0 h-px opacity-45 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg,transparent,${accent},transparent)`,
          }}
        />

        {/* Ambient hover lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{ background: accent }}
        />

        {/* Panel metadata */}
        <div
          className={`relative mb-4 flex items-center justify-between gap-3 sm:mb-5 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <span
            dir="ltr"
            className="font-mono text-[10px] tracking-[0.14em] text-slate-500"
          >
            CAP_{number}
          </span>

          <div
            className={`flex items-center gap-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_10px_var(--capability-accent)]"
              style={{ background: accent }}
            />

            <span
              className={`font-mono text-[8px] text-slate-500 ${
                isRtl ? "" : "tracking-wider"
              }`}
            >
              {copy.engineered}
            </span>

            <Icon
              size={15}
              strokeWidth={1.6}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: accent }}
            />
          </div>
        </div>

        {/* Capability illustration */}
        <div className="relative">
          <CapabilityArtwork
            visual={visual}
            accent={accent}
            language={language}
            idPrefix={idPrefix}
          />
        </div>

        {/* Capability content */}
        <div
          className={`relative flex flex-1 flex-col pt-5 sm:pt-6 ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          <p
            className={`mb-2.5 text-[9px] font-semibold uppercase ${
              isRtl ? "" : "tracking-[0.19em]"
            }`}
            style={{ color: accent }}
          >
            {eyebrow}
          </p>

          <h3
            className={`max-w-sm text-xl font-medium leading-snug text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-[22px] ${
              isRtl ? "" : "tracking-[-0.035em]"
            }`}
          >
            {title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
            {description}
          </p>

          {/* Informational footer, not a fake navigation affordance */}
          <div
            className={`mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-[9px] text-slate-500 sm:mt-6 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accent }}
            />

            <span>{copy.realWorld}</span>
          </div>
        </div>
      </article>
    </>
  );
}
