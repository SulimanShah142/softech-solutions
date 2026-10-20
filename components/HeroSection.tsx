"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ComputerScene from "./ComputerScene";
import type { SiteLanguage } from "@/lib/site-language";

/** Same shape as your existing `heroText`, so your own copy keeps working.
 *  (Extra fields such as `engineering` are simply ignored.) */
export type HeroCopy = {
  eyebrow: string;
  headline: [string, string];
  description: string;
  startProject: string;
  exploreServices: string;
  trustLine: string;
};

/* ───────── cursor light: writes --mx/--my (px, per element) and --px/--py (-1..1) ───────── */
function useCursorLight(...refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const rest = () => [window.innerWidth * 0.7, window.innerHeight * 0.4];
    let [tx, ty] = rest();
    let x = tx, y = ty, raf = 0;
    const paint = () => {
      for (const ref of refs) {
        const el = ref.current;
        if (!el) continue;
        const b = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${x - b.left}px`);
        el.style.setProperty("--my", `${y - b.top}px`);
        el.style.setProperty("--px", ((x / window.innerWidth - 0.5) * 2).toFixed(3));
        el.style.setProperty("--py", ((y / window.innerHeight - 0.5) * 2).toFixed(3));
      }
    };
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      paint();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; kick(); };
    const back = () => { [tx, ty] = rest(); kick(); };
    paint();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", back);
    document.documentElement.addEventListener("pointerleave", back);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", back);
      document.documentElement.removeEventListener("pointerleave", back);
    };
    // refs are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ───────── atmosphere ───────── */
const CLOUDS = [
  // z = parallax depth. Most clouds sit behind the text column.
  { w: 860, h: 660, top: "0%", left: "-12%", c: "rgba(46,91,255,.55)", a: "sf-a", d: 34, o: 0.62, z: 1.2 },
  { w: 700, h: 520, top: "42%", left: "4%", c: "rgba(26,167,255,.36)", a: "sf-b", d: 42, o: 0.55, z: 0.8 },
  { w: 520, h: 420, top: "-8%", left: "26%", c: "rgba(91,75,255,.30)", a: "sf-b", d: 46, o: 0.5, z: 1.5 },
  { w: 780, h: 620, top: "-14%", left: "56%", c: "rgba(46,91,255,.38)", a: "sf-a", d: 38, o: 0.5, z: 0.5 },
  { w: 600, h: 480, top: "62%", left: "38%", c: "rgba(40,217,160,.26)", a: "sf-a", d: 40, o: 0.5, z: 1 },
];
const grid = (rgba: string) =>
  `linear-gradient(${rgba} 1px, transparent 1px), linear-gradient(90deg, ${rgba} 1px, transparent 1px)`;
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Atmosphere() {
  const lit = "radial-gradient(300px circle at var(--mx) var(--my), #000 0%, transparent 100%)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0A1430_0%,#04070F_55%,#02030A_100%)]" />

      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute transition-transform duration-700 ease-out will-change-transform"
          style={{
            width: c.w, height: c.h, top: c.top, left: c.left,
            transform: `translate3d(calc(var(--px, 0) * ${-c.z * 28}px), calc(var(--py, 0) * ${-c.z * 18}px), 0)`,
          }}
        >
          <div
            className="sf-anim h-full w-full rounded-full mix-blend-screen will-change-transform"
            style={{
              opacity: c.o,
              background: `radial-gradient(closest-side, ${c.c}, transparent)`,
              animation: `${c.a} ${c.d}s ease-in-out ${-i * 9}s infinite alternate`,
            }}
          />
        </div>
      ))}

      {[28, 68].map((top, i) => (
        <div
          key={top}
          className="sf-anim absolute -inset-x-1/4 h-56 will-change-transform"
          style={{
            top: `${top}%`,
            background: "radial-gradient(closest-side, rgba(130,175,255,.10), transparent)",
            animation: `sf-fog ${48 + i * 16}s ease-in-out ${-i * 20}s infinite alternate`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: grid("rgba(126,158,198,.10)"),
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 60% 45%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 45%, #000 0%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: grid("rgba(125,203,255,.55)"), backgroundSize: "56px 56px", maskImage: lit, WebkitMaskImage: lit }}
      />
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: "radial-gradient(540px circle at var(--mx) var(--my), rgba(76,159,255,.17), rgba(40,217,160,.05) 45%, transparent 70%)" }}
      />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04070F] to-transparent" />
    </div>
  );
}

const css = `
@keyframes sf-a{0%{transform:translate3d(-4%,2%,0) scale(1)}100%{transform:translate3d(6%,-5%,0) scale(1.18)}}
@keyframes sf-b{0%{transform:translate3d(5%,-3%,0) scale(1.1)}100%{transform:translate3d(-6%,5%,0) scale(.92)}}
@keyframes sf-fog{0%{transform:translateX(-14%)}100%{transform:translateX(14%)}}
@keyframes sf-rise{from{opacity:0;transform:translateY(18px);filter:blur(10px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes sf-word{from{opacity:0;transform:translateY(.55em);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes sf-shimmer{from{background-position:0 0,0% center}to{background-position:0 0,200% center}}
@keyframes sf-mist{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:translate3d(-10%,-6%,0) scale(1.5)}}
@keyframes sf-scroll{0%{transform:translate(-50%,0);opacity:0}30%{opacity:1}100%{transform:translate(-50%,12px);opacity:0}}
.sf-rise{animation:sf-rise .9s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:var(--d,0s)}
.sf-word{display:inline-block;animation:sf-word 1s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:var(--d,0s)}
.sf-line{background-size:100% 100%,200% auto;background-repeat:no-repeat,repeat-x;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sf-word 1.1s cubic-bezier(.2,.7,.2,1) var(--d,0s) backwards,sf-shimmer 8s linear infinite}
.sf-mist{opacity:0;animation:sf-mist 2.8s cubic-bezier(.3,.6,.3,1) .1s backwards}
@media (prefers-reduced-motion:reduce){.sf-anim,.sf-rise,.sf-word,.sf-line,.sf-mist,.sf-cue{animation:none!important}}
`;

/* ───────── hero ───────── */
export default function HeroSection({
  language,
  heroText,
}: {
  language: SiteLanguage;
  heroText: HeroCopy;
}) {
  const t = heroText;
  const rtl = language !== "en";

  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  useCursorLight(heroRef, frameRef, lineRef);

  const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;
  // Word by word only (never letter by letter: that breaks Arabic-script shaping).
  const words = t.headline[0].split(" ");
  const line2At = 0.45 + words.length * 0.07 + 0.1;

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      dir={rtl ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#04070F] text-[#EDF3FA]"
      style={{ "--mx": "70%", "--my": "40%", "--px": "0", "--py": "0" } as CSSProperties}
    >
      <style>{css}</style>
      <Atmosphere />

      <div className="relative z-[1] mx-auto grid w-full max-w-[1480px] -translate-y-3 grid-cols-1 items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:min-h-svh lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-12 lg:pb-20 xl:gap-16 xl:px-16">
        {/* LEFT: message */}
        <div className="relative mx-auto w-full max-w-[680px] lg:mx-0">
          <div
            aria-hidden="true"
            className="sf-mist pointer-events-none absolute -inset-x-16 -inset-y-14 z-20 mix-blend-screen"
            style={{
              background:
                "radial-gradient(60% 50% at 28% 38%, rgba(150,190,255,.38), transparent 70%), radial-gradient(50% 45% at 72% 66%, rgba(120,170,255,.30), transparent 70%)",
            }}
          />

          <div
            className="sf-rise mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
            style={rise(0.1)}
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#28D9A0] shadow-[0_0_10px_rgba(40,217,160,0.6)]" />
            <span className={`truncate text-xs font-medium text-[#C3D0E0] ${rtl ? "" : "tracking-[0.02em]"}`}>{t.eyebrow}</span>
          </div>

          <h1
            id="hero-heading"
            className={`font-semibold ${
              rtl
                ? "text-[clamp(2rem,6vw,2.7rem)] leading-[1.35] tracking-normal sm:text-[clamp(2.3rem,3.9vw,3.5rem)]"
                : "text-[clamp(2.6rem,8vw,3.4rem)] leading-[1.04] tracking-[-0.045em] sm:text-[clamp(2.9rem,4.5vw,4.5rem)]"
            }`}
          >
            <span className="block text-[#EEF3FA]">
              {words.map((w, i) => (
                <span key={i}>
                  <span className="sf-word" style={rise(0.45 + i * 0.07)}>{w}</span>{" "}
                </span>
              ))}
            </span>
            <span
              ref={lineRef}
              className="sf-line block pb-[0.1em]"
              style={{
                ...rise(line2At),
                backgroundImage:
                  "radial-gradient(260px circle at var(--mx) var(--my), rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 70%), linear-gradient(100deg, #7DCBFF 0%, #4C9FFF 30%, #28D9A0 60%, #7DCBFF 100%)",
              }}
            >
              {t.headline[1]}
            </span>
          </h1>

          <p className="sf-rise mt-6 max-w-[540px] text-base leading-[1.85] text-[#B7C4D4] sm:text-[17px]" style={rise(line2At + 0.35)}>
            {t.description}
          </p>

          <div className="sf-rise mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap" style={rise(line2At + 0.5)}>
            <Link
              href="/#contact"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-lg border border-[#28D9A0] bg-[#28D9A0] px-6 text-sm font-semibold text-[#04120F] shadow-[0_10px_36px_rgba(40,217,160,0.22)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#55E8B7] hover:shadow-[0_14px_44px_rgba(40,217,160,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <span>{t.startProject}</span>
              <ArrowRight size={16} aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </Link>

            <Link
              href="/#capabilities"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-6 text-sm font-semibold text-[#F1F5FA] backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <span>{t.exploreServices}</span>
              <ArrowUpRight size={15} aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${rtl ? "-rotate-45 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"}`} />
            </Link>
          </div>

          <div className="sf-rise mt-10 flex items-center gap-3 border-t border-white/[0.08] pt-6 text-sm text-[#B7C4D4]" style={rise(line2At + 0.65)}>
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[#28D9A0]/70" />
            <span>{t.trustLine}</span>
          </div>
        </div>

        {/* RIGHT: compact architecture scene in a frame that lights up near the cursor */}
        <div className="relative mx-auto w-full max-w-[640px] lg:ml-auto lg:max-w-none">
          <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full bg-[#174A83]/35 blur-[90px]" />
          <div
            ref={frameRef}
            className="relative rounded-[19px] p-px shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            style={{
              "--mx": "50%",
              "--my": "30%",
              background: "radial-gradient(380px circle at var(--mx) var(--my), rgba(125,203,255,.65), rgba(129,151,181,.16) 55%)",
            } as CSSProperties}
          >
            <div className="overflow-hidden rounded-[18px]">
              <ComputerScene language={language} />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-6 z-[2] hidden justify-center lg:flex">
        <span className="relative h-9 w-[22px] rounded-full border border-white/20">
          <span className="sf-cue absolute left-1/2 top-1.5 h-1.5 w-[3px] rounded-full bg-white/60" style={{ animation: "sf-scroll 1.8s ease-in-out infinite" }} />
        </span>
      </div>
    </section>
  );
}