
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Cpu,
  Layers3,
  Workflow,
} from "lucide-react";
import CursorGrid from "./CursorGrid";
import { BrandGradient } from "@/theme/colors";
import type { SiteLanguage } from "@/lib/site-language";

const EngineeringScene = dynamic(
  () => import("./EngineeringScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-20 w-20 animate-pulse rounded-full border border-[#28D9A0]/30 bg-[#102847]/40 motion-reduce:animate-none" />
      </div>
    ),
  },
);

const engineeringTranslations: Record<
  SiteLanguage,
  {
    sectionLabel: string;
    heading: [string, string, string, string];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    capabilities: { title: string; description: string }[];
    signature: string;
    architecture: string;
    designedToConnect: string;
    connectedComponents: string;
  }
> = {
  en: {
    sectionLabel: "The engineering philosophy",
    heading: ["Thoughtful by", "design.", "Engineered", "to scale."],
    description:
      "We turn ambitious ideas into dependable digital products through thoughtful architecture, connected systems, and engineering built around real-world needs.",
    primaryCta: "Let's build something",
    secondaryCta: "Explore our capabilities",
    capabilities: [
      {
        title: "Architecture first",
        description:
          "Reliable foundations. Systems designed to grow with your ambitions.",
      },
      {
        title: "Connected by design",
        description:
          "Applications, services, and data working as one coherent system.",
      },
      {
        title: "Technology with purpose",
        description:
          "The right tools, solving real problems without unnecessary complexity.",
      },
    ],
    signature: "Clear thinking. Solid engineering.",
    architecture: "System architecture",
    designedToConnect: "Designed to connect",
    connectedComponents: "Connected components",
  },
  "fa-AF": {
    sectionLabel: "فلسفهٔ مهندسی",
    heading: ["با اندیشه", "طراحی‌شده.", "مهندسی‌شده", "برای رشد."],
    description:
      "ایده‌های بزرگ را با معماری سنجیده، سیستم‌های پیوسته و مهندسی بر پایهٔ نیازهای واقعی به محصولات دیجیتال قابل‌اعتماد تبدیل می‌کنیم.",
    primaryCta: "بیایید چیزی بسازیم",
    secondaryCta: "توانمندی‌های ما را ببینید",
    capabilities: [
      {
        title: "معماری در اولویت",
        description:
          "زیربناهای پایدار؛ سیستم‌هایی که همراه با آرزوهای شما رشد می‌کنند.",
      },
      {
        title: "پیوند از آغاز طراحی",
        description:
          "اپلیکیشن‌ها، خدمات و داده‌ها در قالب یک سیستم هماهنگ کار می‌کنند.",
      },
      {
        title: "فناوری هدفمند",
        description:
          "ابزارهای درست برای حل مسائل واقعی، بدون پیچیدگی غیرضروری.",
      },
    ],
    signature: "اندیشهٔ روشن. مهندسیِ استوار.",
    architecture: "معماری سیستم",
    designedToConnect: "طراحی‌شده برای پیوند",
    connectedComponents: "اجزای متصل",
  },
  ps: {
    sectionLabel: "د انجینرۍ فلسفه",
    heading: ["په پاملرنه طرحه", "شوې ده.", "د ودې لپاره", "انجینري شوې."],
    description:
      "لویې مفکورې د سنجول شوې معمارۍ، نښتو سیسټمونو او د واقعي اړتیاوو پر بنسټ انجینرۍ له لارې پر باوري ډیجیټلي محصولاتو بدلوو.",
    primaryCta: "راځئ یو څه جوړ کړو",
    secondaryCta: "زموږ وړتیاوې وګورئ",
    capabilities: [
      {
        title: "معماري لومړی",
        description:
          "باوري بنسټونه؛ داسې سیسټمونه چې ستاسو له هیلو سره وده کوي.",
      },
      {
        title: "له ډیزاین سره نښلول",
        description:
          "اپلېکېشنونه، خدمتونه او معلومات د یوه همغږي سیسټم په توګه کار کوي.",
      },
      {
        title: "موخه‌لرونکې ټکنالوژي",
        description:
          "د واقعي ستونزو د حل لپاره سمې وسیلې، بې له غیرضروري پېچلتیا.",
      },
    ],
    signature: "روښانه فکر. پیاوړې انجینري.",
    architecture: "د سیسټم معمارۍ",
    designedToConnect: "د نښلېدو لپاره طرحه شوی",
    connectedComponents: "نښتي برخې",
  },
};

const capabilityIcons = [Layers3, Workflow, Cpu];

export default function EngineeringSection({
  language,
}: {
  language: SiteLanguage;
}) {
  const text = engineeringTranslations[language];
  const isRtl = language !== "en";

  return (
    <section
      id="engineering"
      lang={language}
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="engineering-heading"
      className={`relative isolate overflow-hidden bg-[#050914] text-[#EDF3FA] ${isRtl ? "rtl-language" : ""}`}
    >
      {/* INTERACTIVE CURSOR GRID */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="h-full w-full">
          <CursorGrid
            cellSize={64}
            color={BrandGradient[0]}
            gradientColors={BrandGradient}
            radius={190}
            holdTime={400}
            fadeDuration={800}
            fillOpacity={0.09}
            gridOpacity={0.1}
            clickPulse
          />
        </div>
      </div>

      {/* AMBIENT LIGHTING */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="absolute -left-[16%] top-[5%] h-[38rem] w-[38rem] rounded-full bg-[#123E68]/20 blur-[150px]" />

        <div className="absolute -right-[12%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#28D9A0]/[0.08] blur-[145px]" />

        <div className="absolute bottom-[-18%] left-[32%] h-[30rem] w-[40rem] rounded-full bg-[#173C72]/25 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(145,170,200,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(145,170,200,0.18) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#315780]/40 to-transparent" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32 xl:px-16 xl:py-36">
        {/* SECTION LABEL */}
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="h-px w-10 shrink-0 bg-[#28D9A0]" />

          <p className={`text-[10px] font-semibold text-[#A0B0C4] sm:text-[11px] ${isRtl ? "" : "uppercase tracking-[0.24em] sm:tracking-[0.3em]"}`}>
            <span dir="ltr">03 /</span> {text.sectionLabel}
          </p>

          <span className="hidden h-px w-16 bg-gradient-to-r from-[#315780]/70 to-transparent sm:block" />
        </div>

        {/* EDITORIAL + 3D COMPOSITION */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-6 xl:gap-8">
          {/* LEFT: COPY */}
          <div className="relative z-10 w-full max-w-[660px]">
            <h2
              id="engineering-heading"
              className={`font-semibold ${isRtl ? "text-[clamp(2.5rem,5.4vw,5.6rem)] text-right leading-[1.28] tracking-normal" : "text-left text-[clamp(3rem,5.4vw,5.6rem)] leading-[0.99] tracking-[-0.065em]"}`}
            >
              <span className="block text-[#D5DCE6]">{text.heading[0]}</span>

              <span className="block text-[#D5DCE6]">{text.heading[1]}</span>

              <span className="engineering-gradient-text mt-2 block pb-2">
                {text.heading[2]}
                <br />
                {text.heading[3]}
              </span>
            </h2>

            <p className={`mt-6 max-w-[490px] text-[14px] leading-7 text-[#9AA9BC] sm:mt-7 sm:text-[15px] sm:leading-8 ${isRtl ? "text-right" : ""}`}>
              {text.description}
            </p>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/#contact"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[#28D9A0]/30 bg-[#0D2428]/90 px-5 py-3 text-[12px] font-semibold text-[#E5F7F0] shadow-[0_8px_35px_rgba(40,217,160,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28D9A0]/65 hover:bg-[#12312F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914]"
              >
                {text.primaryCta}

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className={`transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "-scale-x-100" : ""}`}
                />
              </Link>

              <Link
                href="/#capabilities"
                className="group inline-flex min-h-10 items-center gap-2 text-[12px] font-medium text-[#A5B3C5] transition-colors hover:text-[#28D9A0]"
              >
                {text.secondaryCta}

                <ArrowDownRight
                  size={15}
                  aria-hidden="true"
                  className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${isRtl ? "-scale-x-100" : ""}`}
                />
              </Link>
            </div>

            {/* CAPABILITIES */}
            <div className="mt-10 border-t border-white/[0.10] sm:mt-12">
              {text.capabilities.map(
                ({ title, description }, index) => {
                  const Icon = capabilityIcons[index] ?? Layers3;
                  const number = `0${index + 1}`;

                  return (
                    <div
                      key={number}
                      className="group flex gap-4 border-b border-white/[0.09] py-4 transition-colors duration-300 hover:border-[#28D9A0]/30 sm:gap-5 sm:py-5"
                    >
                      <span className="pt-1 font-mono text-[10px] tracking-wider text-[#6C879A]">
                        {number}
                      </span>

                      <div className="flex min-w-0 flex-1 items-start gap-3.5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.09] bg-white/[0.025] transition-all duration-300 group-hover:border-[#28D9A0]/30 group-hover:bg-[#28D9A0]/[0.06]">
                          <Icon
                            size={16}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="text-[#78A99C] transition-colors duration-300 group-hover:text-[#28D9A0]"
                          />
                        </span>

                        <div>
                          <h3 className="text-[13px] font-semibold text-[#DCE5EF] sm:text-sm">
                            {title}
                          </h3>

                          <p className="mt-1.5 max-w-[380px] text-[12px] leading-6 text-[#8797AC] sm:text-[13px]">
                            {description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className={`mt-2 shrink-0 text-[#28D9A0] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${isRtl ? "-scale-x-100" : ""}`}
                      />
                    </div>
                  );
                },
              )}
            </div>

            {/* SIGNATURE */}
            <div className={`mt-6 flex items-center gap-3 text-[9px] text-[#74849A] ${isRtl ? "" : "uppercase tracking-[0.18em]"}`}>
              <span className="h-px w-8 bg-[#28D9A0]/70" />
              {text.signature}
            </div>
          </div>

          {/* RIGHT: INTERACTIVE 3D SYSTEM */}
          <div className="relative min-w-0 lg:-mr-6 xl:-mr-10">
            {/* CENTRAL AMBIENT GLOW */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123E68]/25 blur-[105px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]"
            />

            {/* OUTER ORBIT */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#6686A8]/20 motion-safe:animate-[spin_90s_linear_infinite] motion-reduce:animate-none"
            />

            {/* INNER ORBIT */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[63%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#28D9A0]/20 motion-safe:animate-[spin_65s_linear_infinite_reverse] motion-reduce:animate-none"
            />

            {/* 3D CANVAS */}
            <div className="relative h-[390px] w-full sm:h-[480px] md:h-[540px] lg:h-[min(620px,68vw)] xl:h-[660px]">
              <EngineeringScene />
            </div>

            {/* TOP ANNOTATION */}
            <div className="pointer-events-none absolute left-2 right-2 top-3 flex items-start justify-between sm:left-5 sm:right-5 sm:top-5">
              <div className={`${isRtl ? "border-r pr-3" : "border-l pl-3"} border-[#28D9A0]/50`}>
                <p className={`text-[8px] text-[#8297AD] sm:text-[9px] ${isRtl ? "" : "uppercase tracking-[0.2em]"}`}>
                  {text.architecture}
                </p>

                <p className="mt-1.5 text-[10px] font-medium text-[#D1DCE8] sm:text-[11px]">
                  {text.designedToConnect}
                </p>
              </div>

              <span className="font-mono text-[9px] tracking-wider text-[#748CA7] sm:text-[10px]">
                ST / 003
              </span>
            </div>

            {/* BOTTOM STATUS */}
            <div className="pointer-events-none absolute bottom-3 left-2 right-2 flex items-center justify-between border-t border-white/[0.10] pt-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#28D9A0]/40 motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-[#28D9A0]" />
                </span>

                <span className={`text-[8px] font-medium text-[#A0B0C4] sm:text-[9px] ${isRtl ? "" : "uppercase tracking-[0.18em]"}`}>
                  {text.connectedComponents}
                </span>
              </div>

              <span className="font-mono text-[8px] text-[#748CA7] sm:text-[9px]">
                ARCHITECTURE · 01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
