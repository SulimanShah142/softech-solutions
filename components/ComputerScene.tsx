import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  Activity,
  AppWindow,
  ArrowUpRight,
  Boxes,
  Check,
  Database,
  Globe2,
  type LucideIcon,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
  Zap,
} from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

export type SceneMode = "platform" | "integrations" | "delivery";

type SceneModule = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type SceneLayer = {
  id: string;
  number: string;
  modules: SceneModule[];
};

type SceneCopy = {
  label: string;
  platform: string;
  integrations: string;
  delivery: string;
  eyebrow: string;
  system: string;
  status: string;
  inspect: string;
  layers: [string, string, string];
  layerDescriptions: [string, string, string];
  modules: string[];
  details: string[];
  title: string;
  description: string;
  footer: string;
  active: string;
  selected: string;
};

const copy: Record<SiteLanguage, SceneCopy> = {
  en: {
    label: "Interactive software systems architecture",
    platform: "Platform",
    integrations: "Integrations",
    delivery: "Delivery",
    eyebrow: "SYSTEM ARCHITECTURE",
    system: "SYSTEM DESIGN",
    status: "OPERATIONAL",
    inspect: "Select a module to inspect",
    layers: ["USER INTERFACES", "APPLICATION SERVICES", "DATA & INFRASTRUCTURE"],
    layerDescriptions: [
      "The experiences people use",
      "The logic connecting each capability",
      "The foundation that keeps systems running",
    ],
    modules: [
      "Web platform",
      "Mobile applications",
      "Admin tools",
      "Business logic",
      "APIs & security",
      "Workflows",
      "Databases",
      "External services",
      "Cloud runtime",
    ],
    details: [
      "Responsive web experiences built around user needs.",
      "Mobile products that extend the platform to every device.",
      "Operational tools for managing content and services.",
      "Application rules that turn requirements into useful behavior.",
      "Secure interfaces that connect products and services.",
      "Automated processes that coordinate work across the system.",
      "Reliable storage for application and business data.",
      "Third-party services connected through well-defined interfaces.",
      "Scalable infrastructure for deploying and running applications.",
    ],
    title: "Engineered as a system",
    description:
      "A conceptual view of how interfaces, application services and infrastructure fit together.",
    footer: "SYSTEM OVERVIEW",
    active: "ACTIVE MODULE",
    selected: "Clear selection",
  },
  "fa-AF": {
    label: "معماری تعاملی سیستم‌های نرم‌افزاری",
    platform: "پلتفرم",
    integrations: "یکپارچه‌سازی",
    delivery: "تحویل",
    eyebrow: "معماری سیستم",
    system: "طراحی سیستم",
    status: "فعال",
    inspect: "برای بررسی، یک ماژول را انتخاب کنید",
    layers: ["رابط‌های کاربری", "خدمات کاربردی", "داده و زیرساخت"],
    layerDescriptions: [
      "تجربه‌هایی که مردم استفاده می‌کنند",
      "منطقی که قابلیت‌ها را به هم پیوند می‌دهد",
      "بنیادی برای اجرای پایدار سیستم‌ها",
    ],
    modules: [
      "پلتفرم وب",
      "اپلیکیشن موبایل",
      "ابزارهای مدیریت",
      "منطق تجاری",
      "API و امنیت",
      "جریان‌های کاری",
      "پایگاه‌های داده",
      "خدمات بیرونی",
      "زیرساخت ابری",
    ],
    details: [
      "تجربه‌های وب واکنش‌گرا بر اساس نیازهای کاربران.",
      "محصولات موبایل برای دسترسی از دستگاه‌های مختلف.",
      "ابزارهای عملیاتی برای مدیریت محتوا و خدمات.",
      "قواعد کاربردی برای تبدیل نیازها به عملکرد مفید.",
      "رابط‌های امن برای اتصال محصولات و خدمات.",
      "فرایندهای خودکار برای هماهنگی کارها در سیستم.",
      "ذخیره‌سازی مطمئن برای داده‌های کاربردی و تجاری.",
      "اتصال خدمات بیرونی از طریق رابط‌های مشخص.",
      "زیرساخت مقیاس‌پذیر برای اجرا و انتشار اپلیکیشن‌ها.",
    ],
    title: "طراحی‌شده به‌عنوان یک سیستم",
    description: "نمایی مفهومی از ارتباط رابط‌ها، خدمات کاربردی و زیرساخت‌ها.",
    footer: "نمای کلی سیستم",
    active: "ماژول فعال",
    selected: "پاک‌کردن انتخاب",
  },
  ps: {
    label: "د سافټویر سیسټمونو متقابل جوړښت",
    platform: "پلېټفارم",
    integrations: "یوځای کول",
    delivery: "سپارنه",
    eyebrow: "د سیسټم جوړښت",
    system: "د سیسټم ډیزاین",
    status: "فعال",
    inspect: "د کتلو لپاره یو ماډیول وټاکئ",
    layers: ["د کارن مخونه", "د اپلېکېشن خدمتونه", "ډاټا او زیربنا"],
    layerDescriptions: [
      "هغه تجربې چې خلک یې کاروي",
      "هغه منطق چې وړتیاوې سره نښلوي",
      "هغه بنسټ چې سیسټمونه فعال ساتي",
    ],
    modules: [
      "وېب پلېټفارم",
      "موبایل اپلېکېشنونه",
      "مدیریتي وسایل",
      "سوداګریز منطق",
      "API او امنیت",
      "کاري بهیرونه",
      "ډېټابېسونه",
      "بهرني خدمتونه",
      "کلاوډ چاپېریال",
    ],
    details: [
      "د کارن اړتیاوو ته برابر غبرګون‌لرونکي وېب مخونه.",
      "موبایل محصولات چې پلېټفارم هرې وسیلې ته رسوي.",
      "د منځپانګې او خدمتونو د سمبالولو عملیاتي وسایل.",
      "د اپلېکېشن اصول چې غوښتنې په ګټور چلند بدلوي.",
      "خوندي لارې چې محصولات او خدمتونه سره نښلوي.",
      "اتومات بهیرونه چې د سیسټم چارې همغږي کوي.",
      "د اپلېکېشن او سوداګرۍ د معلوماتو باوري زېرمه.",
      "د روښانه لارو له لارې له درېیمګړو خدمتونو سره نښلول.",
      "د اپلېکېشنونو د خپرولو او چلولو لپاره پراخېدونکې زیربنا.",
    ],
    title: "د یو سیسټم په توګه جوړ شوی",
    description: "د کارن مخونو، خدمتونو او زیربناوو ترمنځ د اړیکو مفهومي انځور.",
    footer: "د سیسټم لنډیز",
    active: "فعال ماډیول",
    selected: "ټاکنه پاکول",
  },
};

const layers: SceneLayer[] = [
  {
    id: "interfaces",
    number: "01",
    modules: [
      { id: "web-platform", label: "Web platform", icon: Globe2 },
      { id: "mobile-apps", label: "Mobile apps", icon: Smartphone },
      { id: "admin-tools", label: "Admin tools", icon: AppWindow },
    ],
  },
  {
    id: "services",
    number: "02",
    modules: [
      { id: "business-logic", label: "Business logic", icon: Boxes },
      { id: "apis-security", label: "APIs & security", icon: ShieldCheck },
      { id: "workflows", label: "Workflows", icon: Workflow },
    ],
  },
  {
    id: "infrastructure",
    number: "03",
    modules: [
      { id: "databases", label: "Databases", icon: Database },
      { id: "external-services", label: "External services", icon: Globe2 },
      { id: "cloud-runtime", label: "Cloud runtime", icon: Server },
    ],
  },
];

const modeModules: Record<SceneMode, string[]> = {
  platform: ["web-platform", "mobile-apps", "admin-tools", "business-logic", "databases", "cloud-runtime"],
  integrations: ["apis-security", "workflows", "databases", "external-services"],
  delivery: ["business-logic", "workflows", "databases", "cloud-runtime"],
};

const flatModules = layers.flatMap((layer) => layer.modules);
const indexOfModule = (id: string) => flatModules.findIndex((module) => module.id === id);

const modeOrder: SceneMode[] = ["platform", "integrations", "delivery"];
const nextMode = (current: SceneMode) => modeOrder[(modeOrder.indexOf(current) + 1) % modeOrder.length];

/** Writes --x / --y (px) on the hovered element so CSS can aim a light at the cursor. */
function trackLight(e: ReactPointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

const sceneCss = `
@keyframes sc-flow{0%{transform:translateY(-120%);opacity:0}30%,70%{opacity:1}100%{transform:translateY(320%);opacity:0}}
@keyframes sc-prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sc-prog{transform-origin:left;animation:sc-prog 4.2s linear forwards}
[dir=rtl] .sc-prog{transform-origin:right}
@media (prefers-reduced-motion:reduce){.sc-flow{animation:none!important}.sc-prog{display:none}}
`;

export default function ComputerScene({ language }: { language: SiteLanguage }) {
  const text = copy[language];
  const isRtl = language !== "en";

  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<SceneMode>("platform");
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  const activeModule = hoveredModule ?? selectedModule;
  const activeIndex = activeModule ? indexOfModule(activeModule) : -1;
  const activeLayer = layers.find((layer) => layer.modules.some((module) => module.id === activeModule));
  const activeLayerIndex = activeLayer ? layers.indexOf(activeLayer) : -1;

  // The idle demo only runs while the scene is on screen and the tab is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const autoplayRunning = inView && pageVisible && !activeModule;

  const modeOptions: { id: SceneMode; label: string }[] = [
    { id: "platform", label: text.platform },
    { id: "integrations", label: text.integrations },
    { id: "delivery", label: text.delivery },
  ];

  const activeModes = activeModule ? modeOptions.filter((option) => modeModules[option.id].includes(activeModule)) : [];

  const isHighlighted = (id: string) =>
    activeModule ? activeModule === id : modeModules[mode].includes(id);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={text.label}
      dir={isRtl ? "rtl" : "ltr"}
      className="group/scene relative isolate w-full overflow-hidden bg-[#04080F] text-[#EDF3FA]"
      onPointerMove={trackLight}
      onPointerDown={() => setTouched(true)}
      onPointerLeave={() => setHoveredModule(null)}
    >
      <style>{sceneCss}</style>

      {/* ATMOSPHERE */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-[48%] h-[80%] w-[50%] -translate-x-1/2 rounded-full bg-[#3157C8]/[0.14] blur-[90px]" />
        <div className="absolute inset-x-[12%] top-0 h-[2px] bg-gradient-to-r from-transparent via-[#78D9FF]/60 to-transparent shadow-[0_0_28px_5px_rgba(66,160,255,0.12)]" />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(113,150,199,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(113,150,199,0.16) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/scene:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--x, 50%) var(--y, 30%), rgba(76,159,255,0.12), transparent 70%)",
          }}
        />
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#4B8EFF]/25 bg-[#10213A]/80 text-[#7DCBFF]">
            <Zap size={15} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold tracking-[0.12em] text-slate-100">{text.eyebrow}</p>
            <p className="mt-0.5 hidden text-[11px] text-slate-500 min-[420px]:block">{text.system}</p>
          </div>
        </div>

        <span className="flex items-center gap-2 rounded-full border border-[#28D9A0]/20 bg-[#28D9A0]/[0.06] px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#8FE7C9]">
          <i aria-hidden="true" className="size-1.5 rounded-full bg-[#28D9A0] shadow-[0_0_10px_rgba(40,217,160,0.7)] motion-safe:animate-pulse" />
          {text.status}
        </span>
      </div>

      {/* MODE TABS: the active one shows the idle-demo timer, then hands over to the next */}
      <div className="relative z-10 border-b border-white/[0.06] px-4 py-3">
        <div role="group" aria-label={text.system} className="grid grid-cols-3 gap-1 rounded-lg border border-white/[0.07] bg-black/30 p-1">
          {modeOptions.map((option) => {
            const on = mode === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setMode(option.id);
                  setHoveredModule(null);
                  setSelectedModule(null);
                  setTouched(true);
                }}
                className={`relative flex min-h-9 items-center justify-center gap-2 overflow-hidden rounded-md px-3 text-xs font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C9FF] ${
                  on
                    ? "bg-[#173154] text-[#D9F2FF] shadow-[inset_0_0_0_1px_rgba(100,190,255,0.28),0_0_18px_rgba(41,119,224,0.14)]"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                }`}
              >
                {option.label}
                <span dir="ltr" aria-hidden="true" className={`font-mono text-[10px] ${on ? "text-[#8CCEFF]" : "text-slate-600"}`}>
                  {modeModules[option.id].length}
                </span>

                {on && !touched && (
                  <span aria-hidden="true" className="absolute inset-x-2 bottom-0 h-px overflow-hidden bg-white/10">
                    <span
                      className="sc-prog block h-full bg-[#65C9FF]"
                      style={{ animationPlayState: autoplayRunning ? "running" : "paused" }}
                      onAnimationEnd={() => setMode(nextMode(mode))}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* LAYERS */}
      <div className="relative z-10 flex flex-col px-4 py-4">
        {layers.map((layer, layerIndex) => {
          const layerIsActive = activeLayer
            ? activeLayer.id === layer.id
            : layer.modules.some((module) => modeModules[mode].includes(module.id));

          return (
            <div key={layer.id} className="contents">
              {layerIndex > 0 && (
                <div aria-hidden="true" className="relative mx-auto h-4 w-px overflow-hidden bg-white/10">
                  <span
                    className="sc-flow absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-transparent via-sky-300 to-transparent"
                    style={{ animation: `sc-flow 2.2s ease-in ${layerIndex * 0.5}s infinite` }}
                  />
                </div>
              )}

              <div
                onPointerMove={trackLight}
                className={`group/layer relative grid gap-3 overflow-hidden rounded-xl border p-3 transition-[border-color,background-color,box-shadow] duration-300 sm:grid-cols-[140px_1fr] sm:items-center ${
                  layerIsActive
                    ? "border-[#4C9FFF]/40 bg-[#10213A]/65 shadow-[0_0_30px_rgba(45,119,225,0.10)]"
                    : "border-white/[0.07] bg-[#070D18]/75"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/layer:opacity-100"
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(76,159,255,0.10), transparent 70%)",
                  }}
                />

                <div className="relative min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[11px] transition-colors ${layerIsActive ? "text-[#80C8FF]" : "text-slate-600"}`}>
                      {layer.number}
                    </span>
                    <i
                      aria-hidden="true"
                      className={`size-1.5 rounded-full transition-all duration-300 ${
                        layerIsActive ? "bg-[#67C7FF] shadow-[0_0_10px_2px_rgba(82,176,255,0.4)]" : "bg-slate-700"
                      }`}
                    />
                  </div>
                  <h3 className="mt-1 text-[11px] font-semibold leading-4 tracking-[0.08em] text-slate-100">
                    {text.layers[layerIndex]}
                  </h3>
                  <p className="mt-1 hidden text-[11px] leading-4 text-slate-500 sm:block">
                    {text.layerDescriptions[layerIndex]}
                  </p>
                </div>

                <div className="relative grid grid-cols-3 gap-2">
                  {layer.modules.map((module) => {
                    const Icon = module.icon;
                    const highlighted = isHighlighted(module.id);
                    const selected = selectedModule === module.id;
                    const moduleIndex = indexOfModule(module.id);

                    return (
                      <button
                        key={module.id}
                        type="button"
                        aria-pressed={selected}
                        aria-label={`${text.modules[moduleIndex]}: ${text.details[moduleIndex]}`}
                        onPointerMove={(e) => {
                          e.stopPropagation();
                          trackLight(e);
                        }}
                        // Touch has no "leave", so hover would stick; touch uses tap-to-select instead.
                        onPointerEnter={(e) => {
                          if (e.pointerType !== "touch") setHoveredModule(module.id);
                        }}
                        onFocus={() => setHoveredModule(module.id)}
                        onBlur={() => setHoveredModule(null)}
                        onClick={() => {
                          setSelectedModule((current) => (current === module.id ? null : module.id));
                          setHoveredModule(null);
                        }}
                        className={`group relative flex min-h-[78px] min-w-0 flex-col items-start justify-between gap-2 overflow-hidden rounded-lg border p-2.5 text-start transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6DCBFF] ${
                          highlighted
                            ? "border-[#65B9FF]/50 bg-[#143057]/80 shadow-[inset_0_0_20px_rgba(66,151,255,0.08),0_0_22px_rgba(38,111,221,0.14)]"
                            : "border-white/[0.06] bg-[#080E19]/85 hover:border-[#65B9FF]/35"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(130px circle at var(--x, 50%) var(--y, 50%), rgba(120,200,255,0.28), transparent 70%)",
                          }}
                        />

                        <span
                          className={`relative flex size-8 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                            highlighted
                              ? "border-[#69BFFF]/40 bg-[#24508A]/55 text-[#B5E4FF] shadow-[0_0_18px_rgba(76,158,255,0.18)]"
                              : "border-white/[0.07] bg-white/[0.03] text-slate-400 group-hover:text-[#8CCEFF]"
                          }`}
                        >
                          <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                        </span>

                        <span className={`relative block text-xs font-medium leading-4 transition-colors ${highlighted ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                          {text.modules[moduleIndex]}
                        </span>

                        {selected && <Check size={12} aria-hidden="true" className="absolute end-2 top-2 text-[#72D8FF]" />}

                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3 bottom-0 h-px transition-opacity duration-300 ${
                            highlighted ? "bg-gradient-to-r from-transparent via-[#71C8FF]/80 to-transparent opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INSPECTOR: announces selection changes only (not every hover) */}
      <div aria-live={hoveredModule ? "off" : "polite"} className="relative z-10 border-t border-white/[0.07] bg-black/30 px-4 py-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#28D9A0]/20 bg-[#28D9A0]/[0.06]">
            {activeModule ? (
              <Activity size={15} aria-hidden="true" className="text-[#6FE5BF]" />
            ) : (
              <Zap size={15} aria-hidden="true" className="text-[#7FC8FF]" />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-[10px] font-semibold tracking-[0.14em] text-slate-500">
                {activeModule ? `${text.active} · ${layers[activeLayerIndex].number} ${text.layers[activeLayerIndex]}` : text.footer}
              </p>
              {activeModes.length > 0 && (
                <span className="hidden shrink-0 items-center gap-1 sm:flex">
                  {activeModes.map((option) => (
                    <span key={option.id} className="rounded-full border border-[#65B9FF]/25 bg-[#65B9FF]/[0.07] px-2 py-0.5 text-[9px] font-medium text-[#A9D8FF]">
                      {option.label}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm font-medium text-slate-100">
              {activeModule ? text.modules[activeIndex] : text.title}
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-400">
              {activeModule ? text.details[activeIndex] : text.description}
            </p>
          </div>

          {selectedModule && (
            <button
              type="button"
              onClick={() => setSelectedModule(null)}
              className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-md px-2 text-[11px] text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C9FF]"
            >
              {text.selected}
              <ArrowUpRight size={12} aria-hidden="true" className={isRtl ? "-scale-x-100" : ""} />
            </button>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="relative h-px bg-gradient-to-r from-transparent via-[#28D9A0]/35 to-transparent" />
    </div>
  );
}