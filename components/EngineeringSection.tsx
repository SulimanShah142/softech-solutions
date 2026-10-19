
"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Cpu,
  Layers3,
  Workflow,
} from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";
import CursorGrid from "@/components/CursorGrid";

const EngineeringScene = dynamic(
  () => import("./EngineeringScene"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-16 w-16 rounded-full border border-[#28D9A0]/25 bg-[#102847]/30 motion-safe:animate-pulse motion-reduce:animate-none" />
      </div>
    ),
  },
);

type EngineeringCopy = {
  sectionLabel: string;
  heading: [string, string, string, string];
  description: string;
  primaryCta: string;
  secondaryCta: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  signature: string;
  architecture: string;
  designedToConnect: string;
  connectedComponents: string;
  architectureAlternative: string;
};

const engineeringTranslations: Record<SiteLanguage, EngineeringCopy> = {
  en: {
    sectionLabel: "The engineering philosophy",
    heading: ["Thoughtful by", "design.", "Engineered", "to scale."],
    description:
      "We turn ambitious ideas into dependable digital products through thoughtful architecture, connected systems, and engineering built around real-world needs.",
    primaryCta: "Talk through a technical approach",
    secondaryCta: "View the system architecture",
    capabilities: [
      {
        title: "Architecture first",
        description:
          "Set service boundaries and data ownership before implementation starts.",
      },
      {
        title: "Connected by design",
        description:
          "Define API contracts so web and mobile clients use the same service rules.",
      },
      {
        title: "Technology with purpose",
        description:
          "Choose on-device or cloud processing to suit the task, not the trend.",
      },
    ],
    signature: "Clear thinking. Solid engineering.",
    architecture: "System architecture",
    designedToConnect: "Designed to connect",
    connectedComponents: "Connected components",
    architectureAlternative:
      "Conceptual software system diagram with connected modules around a central core.",
  },

  "fa-AF": {
    sectionLabel: "فلسفهٔ مهندسی",
    heading: ["با اندیشه", "طراحی‌شده.", "مهندسی‌شده", "برای رشد."],
    description:
      "ایده‌های بزرگ را با معماری سنجیده، سیستم‌های پیوسته و مهندسی بر پایهٔ نیازهای واقعی به محصولات دیجیتال قابل‌اعتماد تبدیل می‌کنیم.",
    primaryCta: "دربارهٔ رویکرد فنی گفت‌وگو کنیم",
    secondaryCta: "معماری سیستم را ببینید",
    capabilities: [
      {
        title: "معماری در اولویت",
        description:
          "پیش از پیاده‌سازی، مرز خدمات و مالکیت داده را مشخص می‌کنیم.",
      },
      {
        title: "پیوند از آغاز طراحی",
        description:
          "قراردادهای API را تعریف می‌کنیم تا نسخه‌های وب و موبایل از قواعد یکسان استفاده کنند.",
      },
      {
        title: "فناوری هدفمند",
        description:
          "پردازش روی دستگاه یا ابر را بر پایهٔ وظیفه انتخاب می‌کنیم، نه مُد روز.",
      },
    ],
    signature: "اندیشهٔ روشن. مهندسیِ استوار.",
    architecture: "معماری سیستم",
    designedToConnect: "طراحی‌شده برای پیوند",
    connectedComponents: "اجزای متصل",
    architectureAlternative:
      "نمای مفهومی سیستم نرم‌افزاری با ماژول‌های پیوسته در اطراف یک هسته.",
  },

  ps: {
    sectionLabel: "د انجینرۍ فلسفه",
    heading: ["په پاملرنه طرحه", "شوې ده.", "د ودې لپاره", "انجینري شوې."],
    description:
      "لویې مفکورې د سنجول شوې معمارۍ، نښتو سیسټمونو او د واقعي اړتیاوو پر بنسټ انجینرۍ له لارې پر باوري ډیجیټلي محصولاتو بدلوو.",
    primaryCta: "د تخنیکي لارې په اړه خبرې وکړو",
    secondaryCta: "د سیسټم جوړښت وګورئ",
    capabilities: [
      {
        title: "معماري لومړی",
        description:
          "له پلي کولو مخکې د خدمتونو پولې او د معلوماتو مالکیت ټاکو.",
      },
      {
        title: "له ډیزاین سره نښلول",
        description:
          "د API تړونونه ټاکو، څو وېب او موبایل یو شان خدمت اصول وکاروي.",
      },
      {
        title: "موخه‌لرونکې ټکنالوژي",
        description:
          "د دندې له مخې پر وسیله یا کلاوډ پروسس ټاکو، نه د لنډمهاله دود له مخې.",
      },
    ],
    signature: "روښانه فکر. پیاوړې انجینري.",
    architecture: "د سیسټم معمارۍ",
    designedToConnect: "د نښلېدو لپاره طرحه شوی",
    connectedComponents: "نښتي برخې",
    architectureAlternative:
      "د سافټویر سیسټم مفهومي انځور چې ماډیولونه یې د مرکزي هستې شاوخوا نښتي دي.",
  },
};

const capabilityIcons = [Layers3, Workflow, Cpu];

function EngineeringSceneFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6686A8]/20" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#28D9A0]/20" />
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 border border-[#28D9A0]/40 bg-[#102847]/70" />
      <div className="absolute left-[28%] top-[32%] h-2 w-2 rounded-full bg-[#60A5FA]" />
      <div className="absolute right-[26%] bottom-[31%] h-2 w-2 rounded-full bg-[#28D9A0]" />
    </div>
  );
}

class EngineeringSceneBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <EngineeringSceneFallback /> : this.props.children;
  }
}

export default function EngineeringSection({
  language,
}: {
  language: SiteLanguage;
}) {
  const text = engineeringTranslations[language];
  const isRtl = language !== "en";
  const sceneViewportRef = useRef<HTMLDivElement>(null);
  const [sceneNearViewport, setSceneNearViewport] = useState(false);

  useEffect(() => {
    const element = sceneViewportRef.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setSceneNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSceneNearViewport(entry.isIntersecting),
      { rootMargin: "240px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="engineering"
      lang={language}
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="engineering-heading"
      className={`relative isolate overflow-hidden bg-[#050914] text-[#EDF3FA] ${
        isRtl ? "rtl-language" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <CursorGrid
          ambientMotion
          cellSize={60}
          color="#23B9FF"
          gradientColors={["#23B9FF", "#28D9A0"]}
          radius={140}
          holdTime={400}
          fadeDuration={800}
          fillOpacity={0.06}
          gridOpacity={0.08}
          clickPulse
        />
      </div>

      {/* SUBTLE AMBIENT LIGHTING */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#123E68]/15 blur-[130px]" />

        <div className="absolute -right-40 top-[24%] h-[28rem] w-[28rem] rounded-full bg-[#28D9A0]/[0.055] blur-[130px]" />

        <div className="absolute bottom-0 left-1/3 h-72 w-[34rem] rounded-full bg-[#173C72]/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(145,170,200,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(145,170,200,0.22) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#315780]/30 to-transparent" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-16 xl:py-32">
        {/* SECTION LABEL */}
        <div className="mb-10 flex items-center gap-3 sm:mb-14">
          <span className="h-px w-9 shrink-0 bg-[#28D9A0]" />

          <p
            className={`text-[10px] font-semibold text-[#9EADBF] sm:text-[11px] ${
              isRtl ? "" : "uppercase tracking-[0.22em] sm:tracking-[0.28em]"
            }`}
          >
            <span dir="ltr">03 /</span>{" "}
            {text.sectionLabel}
          </p>

          <span className="hidden h-px w-12 bg-gradient-to-r from-[#315780]/60 to-transparent sm:block" />
        </div>

        {/* EDITORIAL CONTENT + ENGINEERING VISUAL */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 xl:gap-12">
          {/* LEFT COLUMN */}
          <div className="relative z-10 min-w-0 lg:py-5">
            <h2
              id="engineering-heading"
              className={`max-w-[760px] font-semibold ${
                isRtl
                  ? "text-right text-[clamp(2.4rem,5.2vw,5.2rem)] leading-[1.3] tracking-normal"
                  : "text-left text-[clamp(2.8rem,5.4vw,5.4rem)] leading-[0.99] tracking-[-0.065em]"
              }`}
            >
              <span className="block text-[#DCE4EE]">
                {text.heading[0]}
              </span>

              <span className="block text-[#DCE4EE]">
                {text.heading[1]}
              </span>

              <span className="engineering-gradient-text mt-2 block pb-2">
                {text.heading[2]}
              </span>

              <span className="engineering-gradient-text block pb-2">
                {text.heading[3]}
              </span>
            </h2>

            <p
              className={`mt-6 max-w-[510px] text-[14px] leading-7 text-[#9AA9BC] sm:mt-7 sm:text-[15px] sm:leading-8 ${
                isRtl ? "text-right" : ""
              }`}
            >
              {text.description}
            </p>

            {/* CALLS TO ACTION */}
            <div
              className={`mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${
                isRtl ? "sm:flex-row-reverse sm:justify-end" : ""
              }`}
            >
              <Link
                href="/#contact"
                className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 border border-[#28D9A0]/35 bg-[#0D2428]/75 px-5 py-3 text-[12px] font-semibold text-[#E5F7F0] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#28D9A0]/70 hover:bg-[#12312F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] motion-reduce:transform-none"
              >
                {text.primaryCta}

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className={`transition-transform duration-300 group-hover:translate-x-1 ${
                    isRtl ? "rotate-180" : ""
                  }`}
                />
              </Link>

              <Link
                href="/#capabilities"
                className="group inline-flex min-h-11 w-fit items-center gap-2 text-[12px] font-medium text-[#A5B3C5] transition-colors duration-200 hover:text-[#28D9A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050914]"
              >
                {text.secondaryCta}

                <ArrowDownRight
                  size={15}
                  aria-hidden="true"
                  className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
                    isRtl ? "-scale-x-100" : ""
                  }`}
                />
              </Link>
            </div>

            {/* ENGINEERING PRINCIPLES */}
            <div className="mt-10 border-t border-white/[0.10] sm:mt-12">
              {text.capabilities.map(({ title, description }, index) => {
                const Icon = capabilityIcons[index] ?? Layers3;
                const number = `0${index + 1}`;

                return (
                  <div
                    key={number}
                    className="flex items-start gap-3.5 border-b border-white/[0.08] py-4 sm:gap-4 sm:py-5"
                  >
                    <span className="min-w-6 pt-1 font-mono text-[10px] tracking-wider text-[#71899F]">
                      {number}
                    </span>

                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.09] bg-white/[0.025] transition-colors duration-300 group-hover:border-[#28D9A0]/30 group-hover:bg-[#28D9A0]/[0.055]">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-[#82A99E] transition-colors duration-300 group-hover:text-[#28D9A0]"
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-semibold text-[#E0E7F0] sm:text-sm">
                        {title}
                      </h3>

                      <p className="mt-1.5 max-w-[390px] text-[12px] leading-6 text-[#8999AC] sm:text-[13px]">
                        {description}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* SIGNATURE */}
            <div
              className={`mt-6 flex items-center gap-3 text-[9px] text-[#8190A3] ${
                isRtl ? "" : "uppercase tracking-[0.16em]"
              }`}
            >
              <span className="h-px w-8 shrink-0 bg-[#28D9A0]/65" />
              {text.signature}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D ENGINEERING SCENE */}
          <div className="relative min-w-0">
            {/* CONTROLLED SCENE LIGHTING */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123E68]/20 blur-[90px]"
            />

            {/* STATIC OUTER FRAME */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]"
            />

            {/* RESTRAINED ORBIT */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#6686A8]/15 motion-safe:animate-[spin_100s_linear_infinite] motion-reduce:animate-none"
            />

            {/* SCENE */}
            <div
              ref={sceneViewportRef}
              role="img"
              aria-label={text.architectureAlternative}
              className="relative h-[350px] w-full sm:h-[440px] md:h-[500px] lg:h-[min(560px,52vw)] xl:h-[620px]"
            >
              {sceneNearViewport ? (
                <EngineeringSceneBoundary>
                  <EngineeringScene />
                </EngineeringSceneBoundary>
              ) : (
                <EngineeringSceneFallback />
              )}
            </div>

            {/* TOP TECHNICAL ANNOTATION */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-3 flex items-start justify-between sm:inset-x-5 sm:top-5">
              <div
                className={`min-w-0 border-[#28D9A0]/45 ${
                  isRtl ? "border-r pr-3" : "border-l pl-3"
                }`}
              >
                <p
                  className={`text-[8px] text-[#8A9DB2] sm:text-[9px] ${
                    isRtl ? "" : "uppercase tracking-[0.18em]"
                  }`}
                >
                  {text.architecture}
                </p>

                <p className="mt-1.5 text-[10px] font-medium text-[#D3DDE8] sm:text-[11px]">
                  {text.designedToConnect}
                </p>
              </div>

              <span
                dir="ltr"
                className="shrink-0 font-mono text-[9px] tracking-wider text-[#748CA7] sm:text-[10px]"
              >
                ST / 003
              </span>
            </div>

            {/* BOTTOM STATUS */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-3 flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4 sm:inset-x-5 sm:bottom-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[#28D9A0]/35 motion-safe:animate-ping motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-[#28D9A0]" />
                </span>

                <span
                  className={`text-[8px] font-medium text-[#A0B0C4] sm:text-[9px] ${
                    isRtl ? "" : "uppercase tracking-[0.14em]"
                  }`}
                >
                  {text.connectedComponents}
                </span>
              </div>

              <span
                dir="ltr"
                className="shrink-0 font-mono text-[8px] text-[#748CA7] sm:text-[9px]"
              >
                ARCHITECTURE · 01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
