"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Cpu, Layers3, Workflow } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";
import CursorGrid from "@/components/CursorGrid";

const EngineeringScene = dynamic(() => import("./EngineeringScene"), {
  ssr: false,
  loading: () => null,
});

type EngineeringCopy = {
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
      { title: "Architecture first", description: "Set service boundaries and data ownership before implementation starts." },
      { title: "Connected by design", description: "Define API contracts so web and mobile clients use the same service rules." },
      { title: "Technology with purpose", description: "Choose on-device or cloud processing to suit the task, not the trend." },
    ],
    signature: "Clear thinking. Solid engineering.",
    architecture: "System architecture",
    designedToConnect: "Designed to connect",
    connectedComponents: "Connected components",
    architectureAlternative: "Conceptual software system diagram with connected modules around a central core.",
  },
  "fa-AF": {
    sectionLabel: "فلسفهٔ مهندسی",
    heading: ["با اندیشه", "طراحی‌شده.", "مهندسی‌شده", "برای رشد."],
    description:
      "ایده‌های بزرگ را با معماری سنجیده، سیستم‌های پیوسته و مهندسی بر پایهٔ نیازهای واقعی به محصولات دیجیتال قابل‌اعتماد تبدیل می‌کنیم.",
    primaryCta: "دربارهٔ رویکرد فنی گفت‌وگو کنیم",
    secondaryCta: "معماری سیستم را ببینید",
    capabilities: [
      { title: "معماری در اولویت", description: "پیش از پیاده‌سازی، مرز خدمات و مالکیت داده را مشخص می‌کنیم." },
      { title: "پیوند از آغاز طراحی", description: "قراردادهای API را تعریف می‌کنیم تا نسخه‌های وب و موبایل از قواعد یکسان استفاده کنند." },
      { title: "فناوری هدفمند", description: "پردازش روی دستگاه یا ابر را بر پایهٔ وظیفه انتخاب می‌کنیم، نه مُد روز." },
    ],
    signature: "اندیشهٔ روشن. مهندسیِ استوار.",
    architecture: "معماری سیستم",
    designedToConnect: "طراحی‌شده برای پیوند",
    connectedComponents: "اجزای متصل",
    architectureAlternative: "نمای مفهومی سیستم نرم‌افزاری با ماژول‌های پیوسته در اطراف یک هسته.",
  },
  ps: {
    sectionLabel: "د انجینرۍ فلسفه",
    heading: ["په پاملرنه طرحه", "شوې ده.", "د ودې لپاره", "انجینري شوې."],
    description:
      "لویې مفکورې د سنجول شوې معمارۍ، نښتو سیسټمونو او د واقعي اړتیاوو پر بنسټ انجینرۍ له لارې پر باوري ډیجیټلي محصولاتو بدلوو.",
    primaryCta: "د تخنیکي لارې په اړه خبرې وکړو",
    secondaryCta: "د سیسټم جوړښت وګورئ",
    capabilities: [
      { title: "معماري لومړی", description: "له پلي کولو مخکې د خدمتونو پولې او د معلوماتو مالکیت ټاکو." },
      { title: "له ډیزاین سره نښلول", description: "د API تړونونه ټاکو، څو وېب او موبایل یو شان خدمت اصول وکاروي." },
      { title: "موخه‌لرونکې ټکنالوژي", description: "د دندې له مخې پر وسیله یا کلاوډ پروسس ټاکو، نه د لنډمهاله دود له مخې." },
    ],
    signature: "روښانه فکر. پیاوړې انجینري.",
    architecture: "د سیسټم معمارۍ",
    designedToConnect: "د نښلېدو لپاره طرحه شوی",
    connectedComponents: "نښتي برخې",
    architectureAlternative: "د سافټویر سیسټم مفهومي انځور چې ماډیولونه یې د مرکزي هستې شاوخوا نښتي دي.",
  },
};

const capabilityIcons = [Layers3, Workflow, Cpu];
// Where each principle's label floats around the 3D scene (logical start/end, so RTL mirrors).
const chipPositions = ["start-[2%] top-[30%]", "end-[2%] top-[46%]", "start-[6%] bottom-[22%]"];

function EngineeringSceneFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6686A8]/20" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#28D9A0]/20" />
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 border border-[#28D9A0]/40 bg-[#102847]/70" />
      <div className="absolute left-[28%] top-[32%] h-2 w-2 rounded-full bg-[#60A5FA]" />
      <div className="absolute bottom-[31%] right-[26%] h-2 w-2 rounded-full bg-[#28D9A0]" />
    </div>
  );
}

class EngineeringSceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.hasError ? <EngineeringSceneFallback /> : this.props.children;
  }
}

const css = `
@keyframes es-rise{from{opacity:0;transform:translateY(.6em);filter:blur(12px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes es-shimmer{from{background-position:0% center}to{background-position:200% center}}
@keyframes es-scan{0%{transform:translateY(0);opacity:0}15%,85%{opacity:.5}100%{transform:translateY(100%);opacity:0}}
.es [data-r]{opacity:0}
.es.es-in [data-r]{animation:es-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
.es-g{background-image:linear-gradient(100deg,#7DCBFF 0%,#4C9FFF 38%,#28D9A0 72%,#7DCBFF 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.es.es-in .es-g[data-r]{animation:es-rise .9s cubic-bezier(.2,.7,.2,1) var(--d,0s) both,es-shimmer 8s linear infinite}
.es-scan{animation:es-scan 7s linear infinite}
@media (prefers-reduced-motion:reduce){.es [data-r]{opacity:1}.es.es-in [data-r],.es.es-in .es-g[data-r],.es-scan{animation:none!important}}
`;

export default function EngineeringSection({ language }: { language: SiteLanguage }) {
  const text = engineeringTranslations[language];
  const isRtl = language !== "en";

  const sectionRef = useRef<HTMLElement>(null);
  const sceneViewportRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [sceneNearViewport, setSceneNearViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);

  // Reveal once when the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause the 3D scene when the tab is hidden.
  useEffect(() => {
    const update = () => {
      setPageVisible(!document.hidden);
      if (document.hidden) setSceneReady(false);
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Only mount the 3D scene near the viewport.
  useEffect(() => {
    const el = sceneViewportRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSceneNearViewport(true);
    const io = new IntersectionObserver(
      ([e]) => {
        setSceneNearViewport(e.isIntersecting);
        if (!e.isIntersecting) setSceneReady(false);
      },
      { rootMargin: "240px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sceneActive = sceneNearViewport && pageVisible;
  const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;
  const aim = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const w0 = text.heading[0].split(" ");
  const w1 = text.heading[1].split(" ");
  const gAt = 0.2 + (w0.length + w1.length) * 0.07 + 0.05;

  return (
    <section
      ref={sectionRef}
      id="engineering"
      lang={language}
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="engineering-heading"
      className={`es relative isolate overflow-hidden bg-[#04070F] text-[#EDF3FA] ${seen ? "es-in" : ""} ${isRtl ? "rtl-language" : ""}`}
    >
      <style>{css}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
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

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(18,62,104,.35),transparent_70%)]" />
        <div className="absolute -right-1/4 top-[20%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(40,217,160,.10),transparent)]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(23,60,114,.30),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#315780]/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 xl:px-16 xl:py-32">
        {/* LABEL */}
        <div data-r style={rise(0.05)} className="mb-12 flex items-center gap-3 sm:mb-16">
          <span className="h-px w-9 shrink-0 bg-[#28D9A0]" />
          <p className={`text-xs font-semibold text-[#A6B5C8] ${isRtl ? "" : "tracking-[0.14em]"}`}>
            <span dir="ltr" className="font-mono">03 /</span> {text.sectionLabel}
          </p>
          <span className="hidden h-px w-14 bg-gradient-to-r from-[#315780]/60 to-transparent sm:block" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-16">
          {/* LEFT */}
          <div className="relative z-10 min-w-0">
            <h2
              id="engineering-heading"
              className={`max-w-[760px] font-semibold ${
                isRtl
                  ? "text-[clamp(2.3rem,5vw,4.8rem)] leading-[1.3] tracking-normal"
                  : "text-[clamp(2.7rem,5.2vw,5.2rem)] leading-[1] tracking-[-0.055em]"
              }`}
            >
              {[w0, w1].map((words, line) => (
                <span key={line} className="block text-[#E3EAF3]">
                  {words.map((w, i) => (
                    <span key={i}>
                      <span data-r className="inline-block" style={rise(0.2 + (line === 0 ? i : w0.length + i) * 0.07)}>{w}</span>{" "}
                    </span>
                  ))}
                </span>
              ))}
              <span data-r className="es-g mt-2 block pb-2" style={rise(gAt)}>{text.heading[2]}</span>
              <span data-r className="es-g block pb-2" style={rise(gAt + 0.1)}>{text.heading[3]}</span>
            </h2>

            <p data-r style={rise(gAt + 0.3)} className="mt-7 max-w-[540px] text-base leading-8 text-[#A3B2C6] sm:text-[17px]">
              {text.description}
            </p>

            <div data-r style={rise(gAt + 0.42)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
              <Link
                href="/#contact"
                className="group inline-flex min-h-[52px] w-fit items-center justify-center gap-3 rounded-lg border border-[#28D9A0] bg-[#28D9A0] px-6 text-sm font-semibold text-[#04120F] shadow-[0_10px_36px_rgba(40,217,160,.2)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#55E8B7] hover:shadow-[0_14px_44px_rgba(40,217,160,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F] motion-reduce:transform-none"
              >
                {text.primaryCta}
                <ArrowRight size={16} aria-hidden="true" className={`transition-transform duration-300 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Link>
              <Link
                href="/#capabilities"
                className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-[#B2C0D2] transition-colors duration-200 hover:text-[#28D9A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04070F]"
              >
                {text.secondaryCta}
                <ArrowDownRight size={16} aria-hidden="true" className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${isRtl ? "-scale-x-100" : ""}`} />
              </Link>
            </div>

            {/* PRINCIPLES: hovering one lights its label on the 3D scene */}
            <ul className="mt-12 grid gap-3">
              {text.capabilities.map(({ title, description }, i) => {
                const Icon = capabilityIcons[i] ?? Layers3;
                return (
                  <li
                    key={i}
                    data-r
                    tabIndex={0}
                    style={rise(gAt + 0.55 + i * 0.12)}
                    onPointerMove={aim}
                    onPointerEnter={() => setFocus(i)}
                    onPointerLeave={() => setFocus(null)}
                    onFocus={() => setFocus(i)}
                    onBlur={() => setFocus(null)}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4 outline-none transition-[border-color,background-color] duration-300 hover:border-[#28D9A0]/35 hover:bg-white/[0.035] focus-visible:border-[#28D9A0]/60 sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "radial-gradient(300px circle at var(--x,50%) var(--y,50%), rgba(40,217,160,.11), transparent 70%)" }}
                    />
                    <div className="relative flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#82A99E] transition-colors duration-300 group-hover:border-[#28D9A0]/40 group-hover:bg-[#28D9A0]/[0.08] group-hover:text-[#28D9A0]">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[15px] font-semibold text-[#EAF0F7]">{title}</h3>
                          <span className="font-mono text-[11px] text-[#71899F]">0{i + 1}</span>
                        </div>
                        <p className="mt-1.5 max-w-[430px] text-sm leading-6 text-[#94A4B8]">{description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div data-r style={rise(gAt + 1)} className={`mt-7 flex items-center gap-3 text-xs text-[#8A99AC] ${isRtl ? "" : "tracking-[0.1em]"}`}>
              <span className="h-px w-8 shrink-0 bg-[#28D9A0]/65" />
              {text.signature}
            </div>
          </div>

          {/* RIGHT: 3D engineering scene with a HUD */}
          <div data-r style={rise(0.3)} className="relative min-w-0">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123E68]/30 blur-[90px]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#6686A8]/20 motion-safe:animate-[spin_100s_linear_infinite] motion-reduce:animate-none" />

            <div
              ref={sceneViewportRef}
              role="img"
              aria-label={text.architectureAlternative}
              className="relative h-[360px] w-full sm:h-[450px] md:h-[510px] lg:h-[min(580px,52vw)] xl:h-[640px]"
            >
              {sceneActive && (
                <EngineeringSceneBoundary onError={() => setSceneReady(false)}>
                  <EngineeringScene onReady={() => setSceneReady(true)} />
                </EngineeringSceneBoundary>
              )}
              {!sceneReady && <EngineeringSceneFallback />}
            </div>

            {/* HUD (decorative) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute left-0 top-0 size-5 border-l border-t border-white/25" />
              <span className="absolute right-0 top-0 size-5 border-r border-t border-white/25" />
              <span className="absolute bottom-0 left-0 size-5 border-b border-l border-white/25" />
              <span className="absolute bottom-0 right-0 size-5 border-b border-r border-white/25" />
              <span className="es-scan absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#7DCBFF]/60 to-transparent" />

              <div className="absolute inset-x-4 top-4 flex items-start justify-between sm:inset-x-6 sm:top-6">
                <div className={`min-w-0 border-[#28D9A0]/50 ${isRtl ? "border-r pr-3" : "border-l pl-3"}`}>
                  <p className={`text-[10px] text-[#8FA2B8] ${isRtl ? "" : "tracking-[0.14em]"}`}>{text.architecture}</p>
                  <p className="mt-1 text-xs font-medium text-[#DCE5F0]">{text.designedToConnect}</p>
                </div>
                <span dir="ltr" className="shrink-0 font-mono text-[10px] tracking-wider text-[#7F97B3]">ST / 003</span>
              </div>

              {text.capabilities.map((c, i) => (
                <span
                  key={i}
                  className={`absolute ${chipPositions[i]} hidden items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] backdrop-blur-md transition-[border-color,background-color,color,box-shadow] duration-300 sm:flex ${
                    focus === i
                      ? "border-[#28D9A0]/70 bg-[#0D2A2A]/85 text-white shadow-[0_0_28px_rgba(40,217,160,.3)]"
                      : "border-white/10 bg-[#070C16]/70 text-slate-400"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#28D9A0]">0{i + 1}</span>
                  {c.title}
                </span>
              ))}

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4 sm:inset-x-6 sm:bottom-6">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#28D9A0]/40 motion-safe:animate-ping motion-reduce:animate-none" />
                    <span className="relative size-2 rounded-full bg-[#28D9A0]" />
                  </span>
                  <span className={`text-[10px] font-medium text-[#A9B8CB] ${isRtl ? "" : "tracking-[0.1em]"}`}>{text.connectedComponents}</span>
                </div>
                <span dir="ltr" className="shrink-0 font-mono text-[10px] text-[#7F97B3]">ARCHITECTURE · 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}