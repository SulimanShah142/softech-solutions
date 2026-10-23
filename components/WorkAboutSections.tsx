"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { CalendarCheck, ClipboardCheck, KeyRound, Lock, Rocket } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

/* Copy is exactly as you wrote it. */
const content = {
  en: {
    eyebrow: "How we work",
    title: "A clear process, from scope to launch.",
    description: "Project expectations and progress stay visible throughout delivery.",
    practices: [
      ["Weekly demos", "Review working progress together each week."],
      ["Fixed-scope quotes", "Agree on project scope and its quote before work begins."],
      ["Client-owned code", "The client owns the code produced for their project."],
      ["Staging before launch", "Review the product in a staging environment before launch."],
      ["NDAs by default", "We use non-disclosure agreements by default."],
    ],
  },
  "fa-AF": {
    eyebrow: "روش کار ما",
    title: "روندی روشن، از تعیین محدوده تا راه‌اندازی.",
    description: "انتظارات پروژه و روند پیشرفت در تمام مدت اجرا روشن می‌ماند.",
    practices: [
      ["نمایش هفتگی", "هر هفته پیشرفت کار را با هم بررسی می‌کنیم."],
      ["پیشنهاد با محدودهٔ ثابت", "محدوده و هزینهٔ پیشنهادی پروژه را پیش از آغاز کار توافق می‌کنیم."],
      ["مالکیت کد برای مشتری", "کدی که برای پروژهٔ مشتری تولید می‌شود، متعلق به مشتری است."],
      ["محیط آزمایشی پیش از راه‌اندازی", "پیش از راه‌اندازی، محصول را در محیط آزمایشی بررسی می‌کنیم."],
      ["توافق‌نامهٔ محرمانگی به‌طور پیش‌فرض", "به‌طور پیش‌فرض از توافق‌نامهٔ محرمانگی استفاده می‌کنیم."],
    ],
  },
  ps: {
    eyebrow: "زموږ د کار طریقه",
    title: "له کچې ټاکلو تر خپرېدو پورې، روښانه بهیر.",
    description: "د پروژې تمې او پرمختګ د کار په ټوله موده کې روښانه ساتو.",
    practices: [
      ["اونیزې نندارې", "هره اوونۍ کاري پرمختګ په ګډه ګورو."],
      ["د ثابتې کچې بیې", "د کار له پیل مخکې د پروژې پر کچه او بیه هوکړه کوو."],
      ["د کوډ مالکیت د پېرودونکي دی", "د پېرودونکي د پروژې لپاره جوړ شوی کوډ د پېرودونکي ملکیت دی."],
      ["له خپرېدو مخکې ازمایښتي چاپېریال", "له خپرېدو مخکې محصول په ازمایښتي چاپېریال کې ګورو."],
      ["د محرميت تړونونه د تګلارې له مخې", "د محرميت تړونونه د تګلارې له مخې کاروو."],
    ],
  },
} as const;

// Display order follows a project from day zero to handover:
// NDAs -> fixed-scope quote -> weekly demos -> staging -> client-owned code.
// These are indexes into `practices` above; reorder them here if your process differs.
const ORDER = [4, 1, 0, 3, 2] as const;
// Icons by original index: demos, quotes, code, staging, NDAs.
const ICONS = [CalendarCheck, ClipboardCheck, KeyRound, Rocket, Lock];

const css = `
@keyframes hw-rise{from{opacity:0;transform:translateY(.6em);filter:blur(12px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes hw-shimmer{from{background-position:0% center}to{background-position:200% center}}
@keyframes hw-drift-a{from{transform:translate3d(-3%,0,0) scale(1)}to{transform:translate3d(5%,4%,0) scale(1.12)}}
@keyframes hw-drift-b{from{transform:translate3d(4%,3%,0) scale(1.08)}to{transform:translate3d(-5%,-4%,0) scale(.94)}}
@keyframes hw-grow{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes hw-node{to{color:#28D9A0;border-color:rgba(40,217,160,.7);box-shadow:0 0 26px rgba(40,217,160,.35)}}
.hw [data-r]{opacity:1}
.hw.hw-in [data-r]{animation:hw-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
.hw-g{background-image:linear-gradient(100deg,#28D9A0 0%,#63E8C0 35%,#60A5FA 70%,#28D9A0 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hw.hw-in .hw-g[data-r]{animation:hw-rise .9s cubic-bezier(.2,.7,.2,1) var(--d,0s) both,hw-shimmer 8s linear infinite}
.hw-fill-x{transform:scaleX(0);transform-origin:left}
.hw-fill-y{transform:scaleY(0);transform-origin:top}
[dir=rtl] .hw-fill-x{transform-origin:right}
.hw.hw-in .hw-fill-x,.hw.hw-in .hw-fill-y{animation:hw-grow 2.6s .5s cubic-bezier(.4,0,.2,1) forwards}
.hw.hw-in .hw-node{animation:hw-node .6s ease forwards;animation-delay:var(--nd,0s)}
@media (prefers-reduced-motion:reduce){
  .hw [data-r]{opacity:1}
  .hw.hw-in [data-r],.hw.hw-in .hw-g[data-r],.hw-cloud{animation:none!important}
  .hw-fill-x,.hw-fill-y{transform:none;animation:none!important}
  .hw .hw-node{color:#28D9A0;border-color:rgba(40,217,160,.7);animation:none!important}
}
`;

export default function WorkAboutSections({ language }: { language: SiteLanguage }) {
  const copy = content[language];
  const isRtl = language !== "en";

  const sectionRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

  // Title splits at its first comma (Latin or Arabic): the second half gets the gradient.
  const match = copy.title.match(/^(.*?[,،])\s*(.*)$/);
  const [titleA, titleB] = match ? [match[1], match[2]] : [copy.title, ""];
  const words = titleA.split(" ");
  const gAt = 0.2 + words.length * 0.07 + 0.05;

  const aimSection = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  // Each card frame gets its own --x/--y so the light bleeds across the gaps.
  const aimCards = (e: ReactPointerEvent<HTMLElement>, clear = false) => {
    e.currentTarget.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--x", clear ? "-999px" : `${e.clientX - r.left}px`);
      c.style.setProperty("--y", clear ? "-999px" : `${e.clientY - r.top}px`);
    });
  };

  const gridImage =
    "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)";
  const litMask = "radial-gradient(320px circle at var(--mx, 50%) var(--my, 30%), #000 0%, transparent 100%)";

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      lang={language}
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="how-we-work-heading"
      onPointerMove={aimSection}
      className={`hw relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.07] bg-[#050914] px-5 py-24 text-[#EDF3FA] sm:px-8 sm:py-28 lg:px-12 lg:py-32 ${
        seen ? "hw-in" : ""
      }`}
    >
      <style>{css}</style>

      {/* ATMOSPHERE */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_30%_0%,rgba(20,80,80,.28),transparent_70%)]" />
        <div
          className="hw-cloud absolute -left-1/4 top-[4%] h-[36rem] w-[36rem] rounded-full will-change-transform"
          style={{ background: "radial-gradient(closest-side, rgba(40,217,160,.16), transparent)", animation: "hw-drift-a 30s ease-in-out infinite alternate" }}
        />
        <div
          className="hw-cloud absolute -right-1/4 bottom-[-6%] h-[40rem] w-[40rem] rounded-full will-change-transform"
          style={{ background: "radial-gradient(closest-side, rgba(59,130,246,.16), transparent)", animation: "hw-drift-b 36s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: gridImage,
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        />
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: gridImage, backgroundSize: "72px 72px", maskImage: litMask, WebkitMaskImage: litMask }} />
        <div className="absolute inset-0 mix-blend-screen" style={{ background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), rgba(40,217,160,.08), rgba(96,165,250,.04) 45%, transparent 70%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04070F] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-14 max-w-3xl sm:mb-20">
          <div data-r style={rise(0.05)} className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 shrink-0 bg-gradient-to-r from-[#28D9A0] to-[#28D9A0]/10 rtl:bg-gradient-to-l" />
            <span className={`text-xs font-semibold text-[#28D9A0] ${isRtl ? "" : "uppercase tracking-[0.18em]"}`}>{copy.eyebrow}</span>
          </div>

          <h2
            id="how-we-work-heading"
            className={`font-semibold text-white ${
              isRtl
                ? "text-[clamp(2rem,5vw,4rem)] leading-[1.4] tracking-normal"
                : "text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.05] tracking-[-0.05em]"
            }`}
          >
            <span className="block">
              {words.map((w, i) => (
                <span key={i}>
                  <span data-r className="inline-block" style={rise(0.2 + i * 0.07)}>{w}</span>{" "}
                </span>
              ))}
            </span>
            {titleB && (
              <span data-r className="hw-g block pb-2" style={rise(gAt)}>{titleB}</span>
            )}
          </h2>

          <p data-r style={rise(gAt + 0.2)} className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-[17px]">
            {copy.description}
          </p>
        </header>

        {/* TIMELINE */}
        <ol
          className="relative grid gap-5 lg:grid-cols-5"
          onPointerMove={(e) => aimCards(e)}
          onPointerLeave={(e) => aimCards(e, true)}
        >
          {/* horizontal rail (desktop) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-[9%] top-[22px] hidden h-px bg-white/10 lg:block">
            <span className="hw-fill-x block h-full bg-gradient-to-r from-[#28D9A0] to-[#60A5FA] rtl:bg-gradient-to-l" />
          </div>
          {/* vertical rail (mobile) */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-10 start-[21px] top-10 w-px bg-white/10 lg:hidden">
            <span className="hw-fill-y block h-full w-full bg-gradient-to-b from-[#28D9A0] to-[#60A5FA]" />
          </div>

          {ORDER.map((practiceIndex, step) => {
            const [title, description] = copy.practices[practiceIndex];
            const Icon = ICONS[practiceIndex];
            return (
              <li key={practiceIndex} data-r style={rise(gAt + 0.35 + step * 0.1)} className="relative ps-14 lg:ps-0">
                <span
                  className="hw-node absolute start-0 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-[#050914] font-mono text-xs text-slate-500 lg:static lg:mb-7"
                  style={{ "--nd": `${0.5 + step * 0.52}s` } as CSSProperties}
                >
                  <span dir="ltr">0{step + 1}</span>
                </span>

                <div
                  data-card
                  className="relative h-full rounded-2xl p-px"
                  style={
                    {
                      "--x": "-999px",
                      "--y": "-999px",
                      background: "radial-gradient(300px circle at var(--x) var(--y), rgba(40,217,160,.8), rgba(255,255,255,.09) 62%)",
                    } as CSSProperties
                  }
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[15px] bg-[#070d19] p-5 sm:p-6">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(360px circle at var(--x) var(--y), rgba(40,217,160,.10), transparent 65%)" }}
                    />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/60 to-transparent" />

                    <div className="relative">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors duration-300 group-hover:border-[#28D9A0]/40 group-hover:bg-[#28D9A0]/[0.08] group-hover:text-[#28D9A0]">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-base font-semibold leading-snug text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}