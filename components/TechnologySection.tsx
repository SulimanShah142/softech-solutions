"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { ArrowDownRight, Boxes, Code2, Cpu, ShieldCheck, Workflow } from "lucide-react";
// Your existing laser component. Adjust the path if yours differs.
import LaserFlow from "@/components/LaserFlow";
import type { SiteLanguage } from "@/lib/site-language";

/* ───────────────────────── COPY ───────────────────────── */
type CardCopy = { label: string; title: string; description: string; footer: string; tags?: string[] };
type Copy = {
  eyebrow: string;
  heading: [string, string];
  description: string;
  cards: [CardCopy, CardCopy, CardCopy, CardCopy];
  footerHeading: string;
  footerDescription: string;
  footerCta: string;
};

const copy: Record<SiteLanguage, Copy> = {
  en: {
    eyebrow: "The technology studio",
    heading: ["Engineering depth,", "built for enterprise scale."],
    description: "Four disciplines, one accountable team. We take responsibility for the whole system, from the first screen to the last server.",
    cards: [
      { label: "Product engineering", title: "Web, mobile and custom software", description: "Fast, secure products designed around your workflows and built to last.", footer: "Web · iOS · Android · Internal tools", tags: ["Cross-Platform Systems", "Legacy Modernization", "High-Availability Architecture"] },
      { label: "Applied AI", title: "AI, ML and data analytics", description: "Models and dashboards that turn raw data into decisions you can act on.", footer: "Custom models · Dashboards · Reports" },
      { label: "Web3", title: "Blockchain and smart contracts", description: "Audited Smart Contracts & Cryptographic Ledgers for Enterprise Networks.", footer: "dApps · Contracts · Tokens" },
      { label: "Cloud and security", title: "Cloud, DevOps and protection", description: "Scalable infrastructure, automated releases and security that stays on.", footer: "Cloud · CI/CD · Monitoring", tags: ["Zero-Trust Architecture", "Automated CI/CD Pipelines", "Disaster Recovery"] },
    ],
    footerHeading: "Not sure which discipline you need?",
    footerDescription: "Tell us what you are building. We will map the right team and plan in one conversation.",
    footerCta: "Talk to an engineer",
  },
  "fa-AF": {
    eyebrow: "استودیوی فناوری",
    heading: ["عمق مهندسی،", "ساخته‌شده برای مقیاس سازمانی."],
    description: "چهار تخصص، یک تیم پاسخ‌گو. ما مسئولیت کل سیستم را می‌پذیریم؛ از اولین صفحه تا آخرین سرور.",
    cards: [
      { label: "مهندسی محصول", title: "وب، موبایل و نرم‌افزار سفارشی", description: "محصولات سریع و امن که بر اساس روند کاری شما طراحی و برای ماندگاری ساخته می‌شوند.", footer: "وب · iOS · Android · ابزارهای داخلی", tags: ["سامانه‌های چندسکویی", "نوسازی سامانه‌های قدیمی", "معماری با دسترس‌پذیری بالا"] },
      { label: "هوش مصنوعی کاربردی", title: "هوش مصنوعی، یادگیری ماشین و تحلیل داده", description: "مدل‌ها و داشبوردهایی که داده خام را به تصمیم قابل اجرا تبدیل می‌کنند.", footer: "مدل‌های سفارشی · داشبورد · گزارش" },
      { label: "وب۳", title: "بلاکچین و قراردادهای هوشمند", description: "قراردادهای هوشمندِ تفتیش‌شده و دفترکل‌های رمزنگاری‌شده برای شبکه‌های سازمانی.", footer: "dApp · قرارداد هوشمند · توکن" },
      { label: "ابر و امنیت", title: "زیرساخت ابری، دواپس و حفاظت", description: "زیرساخت مقیاس‌پذیر، انتشار خودکار و امنیتی که همیشه فعال است.", footer: "ابر · CI/CD · پایش", tags: ["معماری اعتماد صفر", "خطوط CI/CD خودکار", "بازیابی پس از فاجعه"] },
    ],
    footerHeading: "مطمئن نیستید به کدام تخصص نیاز دارید؟",
    footerDescription: "بگویید چه می‌سازید. در یک گفتگو تیم و برنامه مناسب را مشخص می‌کنیم.",
    footerCta: "با یک مهندس صحبت کنید",
  },
  ps: {
    eyebrow: "د ټکنالوژۍ سټوډیو",
    heading: ["د انجینرۍ ژوروالی،", "د سازمان کچې لپاره جوړ شوی."],
    description: "څلور تخصصونه، یو ځواب ویونکی ټیم. موږ د ټول سیسټم مسولیت پر غاړه اخلو، له لومړي پاڼې تر وروستي سرور پورې.",
    cards: [
      { label: "د محصول انجینري", title: "وېب، موبایل او دودیز سافټویر", description: "چټک او خوندي محصولات چې ستاسو د کاري بهیر پر بنسټ جوړېږي.", footer: "وېب · iOS · Android · کورني وسایل", tags: ["د څو پلېټفارمونو سیسټمونه", "د زړو سیسټمونو عصري کول", "د لوړې لاسرسي‌وړتیا جوړښت"] },
      { label: "کارېدونکې مصنوعي ځیرکتیا", title: "مصنوعي ځیرکتیا، ماشیني زده کړه او ډاټا تحلیل", description: "ماډلونه او ډش بورډونه چې خام ډاټا په کړنې پرېکړو بدلوي.", footer: "دودیز ماډلونه · ډش بورډ · راپورونه" },
      { label: "ویب۳", title: "بلاکچین او هوښيار قراردادونه", description: "د تصدیو شبکو لپاره تفتیش شوي هوښیار قراردادونه او کریپټوګرافیک لیجرونه.", footer: "dApp · هوښيار قرارداد · ټوکن" },
      { label: "کلاوډ او امنیت", title: "کلاوډ، DevOps او ساتنه", description: "پراخېدونکې زیربنا، اتومات خپرونه او تل فعاله امنیت.", footer: "کلاوډ · CI/CD · څارنه", tags: ["د صفر باور جوړښت", "اتومات CI/CD پایپ‌لاینونه", "له ناورین وروسته بېرته رغونه"] },
    ],
    footerHeading: "نه پوهېږئ کوم تخصص ته اړتیا لرئ؟",
    footerDescription: "راته ووایاست څه جوړوئ. په یوه خبرو کې به سم ټیم او پلان وټاکو.",
    footerCta: "له یو انجینر سره خبرې وکړئ",
  },
};

/* ───────────────────── MINI PRODUCT VISUALS (language-neutral) ───────────────────── */
const frame = "rounded-xl border border-white/[0.08] bg-[#04070d]";

function EditorVisual() {
  return (
    <div dir="ltr" className={`${frame} font-mono text-[11px] leading-6 text-slate-400`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <i className="size-2 rounded-full bg-white/15" /><i className="size-2 rounded-full bg-white/15" /><i className="size-2 rounded-full bg-white/15" />
        <span className="ms-auto flex items-center gap-1.5 text-[10px] text-emerald-300"><i className="size-1.5 rounded-full bg-emerald-400" />deployed</span>
      </div>
      <pre className="overflow-hidden p-3"><code>
        <span className="text-[#c4a7ff]">const</span> app = <span className="text-[#7dcbff]">ship</span>({"{"}
        {"\n"}  web: <span className="text-[#ffb86b]">true</span>, ios: <span className="text-[#ffb86b]">true</span>,
        {"\n"}  android: <span className="text-[#ffb86b]">true</span>,
        {"\n"}{"}"});<span className="tc-caret ms-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-sky-300" />
      </code></pre>
    </div>
  );
}
function ChartVisual() {
  return (
    <div dir="ltr" className={`${frame} p-3`}>
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-slate-500"><span>inference / live</span><i className="size-1.5 rounded-full bg-indigo-300" /></div>
      <div className="flex h-[78px] items-end gap-1.5">
        {[38, 55, 42, 68, 52, 80, 62, 90, 74, 96].map((h, i) => (
          <span key={i} className="tc-bar flex-1 rounded-sm bg-gradient-to-t from-indigo-500/10 to-indigo-300/70" style={{ height: `${h}%`, animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}
function ChainVisual() {
  return (
    <div dir="ltr" className={`${frame} flex items-center p-3`}>
      {["0x7f3a", "0x91c4", "0xb02e", "0xd8a1"].map((h, i, a) => (
        <div key={h} className="flex min-w-0 flex-1 items-center last:flex-none">
          <span className="tc-blk rounded-md border border-emerald-300/20 bg-emerald-300/[0.05] px-1.5 py-2 font-mono text-[10px] text-emerald-200" style={{ animationDelay: `${i * 0.7}s` }}>{h}</span>
          {i < a.length - 1 && <span className="h-px flex-1 bg-gradient-to-r from-emerald-300/50 to-emerald-300/10" />}
        </div>
      ))}
    </div>
  );
}
function PipelineVisual() {
  return (
    <div dir="ltr" className={`${frame} grid grid-cols-4 gap-2 p-3`}>
      {["Build", "Test", "Scan", "Ship"].map((s, i) => (
        <div key={s}>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]"><span className="tc-fill block h-full rounded-full bg-sky-300/80" style={{ animationDelay: `${i * 0.7}s` }} /></div>
          <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-slate-400"><i className="size-1.5 rounded-full bg-emerald-400" />{s}</p>
        </div>
      ))}
    </div>
  );
}

const META: { icon: typeof Code2; rgb: string; tags: string[]; Visual: () => ReactNode }[] = [
  { icon: Code2, rgb: "125,203,255", tags: ["React", "Next.js", "Flutter"], Visual: EditorVisual },
  { icon: Cpu, rgb: "139,140,255", tags: ["Python", "TensorFlow", "SQL"], Visual: ChartVisual },
  { icon: Boxes, rgb: "40,217,160", tags: ["Solidity", "Rust", "Ethers"], Visual: ChainVisual },
  { icon: ShieldCheck, rgb: "76,159,255", tags: ["AWS", "Kubernetes", "Docker"], Visual: PipelineVisual },
];

/* ───────────────────────── HOOKS ───────────────────────── */
function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/** Distance (px) from the top of the stage to the top of the surface the laser lands on. */
function useLaserLanding(stageRef: RefObject<HTMLElement | null>, surfaceRef: RefObject<HTMLElement | null>) {
  const [landY, setLandY] = useState<number | null>(null);
  useEffect(() => {
    const stage = stageRef.current, surface = surfaceRef.current;
    if (!stage || !surface) return;
    const measure = () => setLandY(Math.round(surface.getBoundingClientRect().top - stage.getBoundingClientRect().top));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage); ro.observe(surface);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [stageRef, surfaceRef]);
  return landY;
}

/** Each card gets its own --x/--y, so cursor light bleeds across the gaps between cards. */
function useGridSpotlight(gridRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));
    const put = (x: number, y: number, el: HTMLElement) => { el.style.setProperty("--x", `${x}px`); el.style.setProperty("--y", `${y}px`); };
    const move = (e: PointerEvent) => {
      const g = grid.getBoundingClientRect();
      if (g.bottom < -200 || g.top > window.innerHeight + 200) return;
      for (const c of cards) { const r = c.getBoundingClientRect(); put(e.clientX - r.left, e.clientY - r.top, c); }
    };
    const leave = () => cards.forEach((c) => put(-999, -999, c));
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, [gridRef]);
}

const css = `
@keyframes tc-rise{from{opacity:0;transform:translateY(.6em);filter:blur(12px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes tc-shimmer{from{background-position:0% center}to{background-position:200% center}}
@keyframes tc-bar{from{transform:scaleY(.72)}to{transform:scaleY(1)}}
@keyframes tc-blk{0%,100%{box-shadow:none;border-color:rgba(110,231,183,.2)}12%{box-shadow:0 0 18px rgba(52,211,153,.35);border-color:rgba(110,231,183,.7)}30%{box-shadow:none}}
@keyframes tc-fill{0%{width:0}12%,85%{width:100%}100%{width:0}}
@keyframes tc-caret{50%{opacity:0}}
.tc [data-r]{opacity:0}
.tc.tc-in [data-r]{animation:tc-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
.tc-line{background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.tc.tc-in .tc-line[data-r]{animation:tc-rise .9s cubic-bezier(.2,.7,.2,1) var(--d,0s) both,tc-shimmer 8s linear infinite}
.tc-bar{transform-origin:bottom;animation:tc-bar 2.4s ease-in-out infinite alternate}
.tc-blk{animation:tc-blk 4s ease-in-out infinite}
.tc-fill{width:0;animation:tc-fill 6s ease-in-out infinite}
.tc-caret{animation:tc-caret 1s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.tc [data-r]{opacity:1}.tc.tc-in [data-r],.tc.tc-in .tc-line[data-r],.tc-bar,.tc-blk,.tc-fill,.tc-caret{animation:none!important}.tc-fill{width:100%}}
`;

/* ───────────────────────── SECTION ───────────────────────── */
export default function TechnologyLaserSection({ language }: { language: SiteLanguage }) {
  const t = copy[language];
  const rtl = language !== "en";

  const [sectionRef, seen] = useInView<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const landY = useLaserLanding(stageRef, surfaceRef);
  useGridSpotlight(gridRef);

  const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;
  const words = t.heading[0].split(" ");
  const at = 0.25 + words.length * 0.07 + 0.08;

  return (
    <section
      ref={sectionRef}
      id="technology"
      lang={language}
      dir={rtl ? "rtl" : "ltr"}
      aria-labelledby="technology-heading"
      className={`tc relative isolate overflow-hidden bg-[#04060C] px-5 py-24 text-[#EDF3FA] sm:px-8 sm:py-28 lg:px-12 lg:py-32 ${seen ? "tc-in" : ""}`}
    >
      <style>{css}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(90%_50%_at_50%_0%,rgba(30,64,140,.30),transparent_70%)]" />
        <div className="absolute -right-1/4 top-[45%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(76,159,255,.09),transparent)]" />
        <div className="absolute -left-1/4 bottom-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(40,217,160,.07),transparent)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.5) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse at 50% 35%, #000 0%, transparent 72%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, #000 0%, transparent 72%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03050A] to-transparent" />
      </div>

      <div className="mx-auto max-w-[1360px]">
        <div ref={stageRef} className="relative isolate">
          {/* LASER FIELD: your LaserFlow, configuration retained */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-visible" style={{ height: landY === null ? "100%" : `${landY + 2}px` }}>
            <div className="absolute left-1/2 top-[-5rem] h-[calc(100%+5rem)] w-28 -translate-x-1/2 sm:w-40" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(103,200,255,0.07), rgba(59,130,246,0.02) 42%, transparent 76%)", filter: "blur(28px)" }} />
            <div className="absolute inset-x-0 top-0 overflow-hidden opacity-45 mix-blend-screen" style={{ height: landY === null ? "100%" : `${Math.max(0, landY)}px` }}>
              <LaserFlow
                surfaceRef={surfaceRef}
                intensity={1.8}
                flare={1.5}
                spread={1.5}
                color="#078df3"
                beamPosition={0.5}
                spill={1}
                fog={0.2}
                dust={1.6}
                revealImage="/your-ui.png" /* replace with a screenshot of your product UI */
                revealRadius={220}
                revealOpacity={0.6}
                beamWidth={1.5}
                streaks={1.5}
                dots={1}
                pulse={1.5}
                speed={1.5}
                seed={3}
                mouseInteraction
                intro
              />
            </div>
            {landY !== null && (
              <div className="absolute inset-x-0 h-28 -translate-y-1/2" style={{ top: `${landY}px`, background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.10), rgba(37,99,235,0.03) 42%, transparent 75%)", filter: "blur(26px)" }} />
            )}
          </div>

          {/* HEADER */}
          <header className="relative z-10 mx-auto max-w-4xl text-center">
            <div data-r style={rise(0.05)} className="mb-8 flex justify-center sm:mb-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.11] bg-[#070b13]/90 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,.3)]">
                <span className="relative flex size-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-30 motion-reduce:animate-none" /><span className="relative size-2 rounded-full bg-cyan-200" /></span>
                <span className={`text-[11px] font-semibold text-cyan-100 ${rtl ? "" : "tracking-[0.12em]"}`}>{t.eyebrow}</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="font-mono text-[10px] tracking-wider text-slate-400">02 / 04</span>
              </div>
            </div>

            <h2 id="technology-heading" className={`font-semibold text-white [text-shadow:0_2px_30px_rgba(0,0,0,.8)] ${rtl ? "text-[clamp(1.9rem,5.5vw,3.6rem)] leading-[1.4] tracking-normal" : "text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.05] tracking-[-0.045em]"}`}>
              <span className="block">
                {words.map((w, i) => (<span key={i}><span data-r className="inline-block" style={rise(0.25 + i * 0.07)}>{w}</span>{" "}</span>))}
              </span>
              <span data-r className="tc-line block pb-[0.1em]" style={{ ...rise(at), backgroundImage: "linear-gradient(100deg,#7DCBFF 0%,#8B8CFF 35%,#28D9A0 65%,#7DCBFF 100%)" }}>{t.heading[1]}</span>
            </h2>

            <p data-r style={rise(at + 0.25)} className="mx-auto mt-7 max-w-2xl rounded-2xl bg-[#04060C]/60 px-4 py-2 text-[15px] leading-8 text-slate-200 sm:text-base">{t.description}</p>

            <div data-r style={rise(at + 0.4)} className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
              <span className="font-mono text-[9px] font-medium tracking-[0.2em] text-slate-500">SOFTECH / STUDIO</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </header>

          {/* CARDS: the laser lands on the top edge of this grid */}
          <div ref={surfaceRef} className="relative z-10 mt-20 sm:mt-28 lg:mt-36">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] -top-px h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent" />
            <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
              {META.map((m, i) => {
                const c = t.cards[i], Icon = m.icon, Visual = m.Visual;
                return (
                  <article
                    key={c.title}
                    data-card
                    data-r
                    style={{
                      ...rise(at + 0.55 + i * 0.1),
                      "--x": "-999px",
                      "--y": "-999px",
                      background: `radial-gradient(340px circle at var(--x) var(--y), rgba(${m.rgb},.8), rgba(255,255,255,.09) 62%)`,
                    } as CSSProperties}
                    className="group relative rounded-[20px] p-px"
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[19px] bg-[#070b13]">
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(420px circle at var(--x) var(--y), rgba(${m.rgb},.11), transparent 65%)` }} />
                      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${m.rgb},.7), transparent)` }} />

                      <div className="relative flex h-full flex-col p-5 xl:p-6">
                        <div className="flex items-center justify-between">
                          <span className="flex size-11 items-center justify-center rounded-xl border" style={{ color: `rgb(${m.rgb})`, borderColor: `rgba(${m.rgb},.28)`, background: `rgba(${m.rgb},.08)` }}>
                            <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                          </span>
                          <span className="font-mono text-[11px] tracking-wider text-slate-500">0{i + 1}</span>
                        </div>

                        <p className={`mt-7 flex items-center gap-2 text-[11px] font-semibold text-slate-400 ${rtl ? "" : "tracking-[0.1em]"}`}>
                          <span className="h-px w-5" style={{ background: `rgb(${m.rgb})` }} />{c.label}
                        </p>
                        <h3 className={`mt-2 break-words text-xl font-semibold leading-snug text-white ${rtl ? "" : "tracking-[-0.03em]"}`}>{c.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{c.description}</p>

                        <div className="mt-5"><Visual /></div>

                        <div dir="ltr" className="mt-4 flex flex-wrap gap-1.5">
                          {(c.tags ?? m.tags).map((tag) => (
                            <span key={tag} className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-white/20 group-hover:text-white">{tag}</span>
                          ))}
                        </div>

                        <p className="mt-auto border-t border-white/[0.08] pt-4 text-xs leading-5 text-slate-400 [margin-top:1.5rem]">{c.footer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* CLOSING BAND */}
        <div data-r style={rise(at + 1)} className="mt-12 flex flex-col gap-5 rounded-2xl border border-white/[0.09] bg-gradient-to-r from-white/[0.04] via-white/[0.015] to-transparent p-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/[0.16] bg-cyan-300/[0.05] text-cyan-200"><Workflow aria-hidden="true" className="size-5" /></span>
            <div className="min-w-0">
              <p className="text-base font-semibold text-white">{t.footerHeading}</p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">{t.footerDescription}</p>
            </div>
          </div>
          <a href="#contact" className="group inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-full border border-cyan-200/25 bg-cyan-300/[0.06] px-6 text-sm font-semibold text-white transition-[background-color,border-color,box-shadow] duration-300 hover:border-cyan-200/50 hover:bg-cyan-300/[0.12] hover:shadow-[0_0_32px_rgba(103,200,255,.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060C]">
            {t.footerCta}
            <ArrowDownRight aria-hidden="true" className={`size-4 text-cyan-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${rtl ? "-scale-x-100" : ""}`} />
          </a>
        </div>
      </div>
    </section>
  );
}