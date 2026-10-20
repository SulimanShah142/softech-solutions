
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  GitBranch,
  Layers3,
  Network,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import type { SiteLanguage } from '@/lib/site-language';

import ArchitectureVisual from './ArchitectureVisual';
import CapabilityPanel from './CapabilityPanel';

const BRAND = {
  jade: '#28D9A0',
  blue: '#60A5FA',
  navy: '#050914',
} as const;

const capabilities: {
  number: string;
  icon: LucideIcon;
  accent: string;
  visual: 'engineering' | 'integrations' | 'automation';
  copyIndex: number;
}[] = [
  {
    number: '02',
    icon: Code2,
    accent: BRAND.jade,
    visual: 'engineering',
    copyIndex: 0,
  },
  {
    number: '03',
    icon: GitBranch,
    accent: BRAND.blue,
    visual: 'integrations',
    copyIndex: 1,
  },
  {
    number: '04',
    icon: BrainCircuit,
    accent: BRAND.jade,
    visual: 'automation',
    copyIndex: 2,
  },
];

const translations = {
  en: {
    sectionLabel: '04 / Technical Capabilities',
    heading: ['AI engineering,', 'built for products.'],
    introduction:
      'We build AI features and web and mobile products, choosing where processing happens to suit each use.',
    connected: 'Web, mobile & connected services',
    architecture: '01 / AI Product Architecture',
    structureFlowScale: 'ON-DEVICE / WEB / MOBILE / CLOUD',
    foundationEyebrow: 'AI, placed with purpose',
    foundationHeading: ['On-device when it fits.', 'Connected when it helps.'],
    foundationDescription:
      'Choose where an AI feature runs based on its purpose and the information it needs. Some tasks can happen on the device; others may use a cloud service.',
    exampleLabel: 'A product example',
    example:
      'A notes app could summarize a note on the device without sending the note to a server.',
    principles: ['On-device AI when it fits', 'Clear service boundaries', 'Cloud services when useful'],
    architectureTagline: 'Choose processing for the task',
    architectureStatus: 'AI / WEB / MOBILE / CLOUD',
    moreCapabilities: 'More ways we engineer value',
    capabilityLabel: 'CAPABILITIES',
    transition: 'Choose product technology for the work it needs to do.',
    built: 'Engineered with intent',
    cards: [
      {
        eyebrow: 'AI ENGINEERING',
        title: 'Place AI where it fits.',
        description:
          'Plan AI features for device or cloud processing, with data paths chosen for each product.',
      },
      {
        eyebrow: 'WEB & MOBILE PRODUCTS',
        title: 'Build web and mobile products.',
        description:
          'Create websites and mobile apps with clear service boundaries and the integrations they need.',
      },
      {
        eyebrow: 'BLOCKCHAIN & INTEGRATIONS',
        title: 'Connect blockchain and fintech systems.',
        description:
          'Support blockchain and fintech products with API and smart-contract integrations.',
      },
    ],
  },
  'fa-AF': {
    sectionLabel: '۰۴ / توانایی‌های تخنیکی',
    heading: ['مهندسی هوش مصنوعی،', 'برای محصولات واقعی.'],
    introduction:
      'قابلیت‌های هوش مصنوعی و محصولات وب و موبایل می‌سازیم و محل پردازش را بر پایهٔ کاربرد انتخاب می‌کنیم.',
    connected: 'وب، موبایل و خدمات متصل',
    architecture: '۰۱ / معماری محصول هوش مصنوعی',
    structureFlowScale: 'روی دستگاه / وب / موبایل / ابر',
    foundationEyebrow: 'هوش مصنوعی با جای‌گذاری سنجیده',
    foundationHeading: ['روی دستگاه، هرجا مناسب است.', 'متصل، هرجا سودمند است.'],
    foundationDescription:
      'محل اجرای قابلیت هوش مصنوعی را بر پایهٔ هدف و اطلاعات مورد نیاز آن انتخاب می‌کنیم. بعضی کارها روی دستگاه انجام می‌شوند و بعضی دیگر ممکن است به خدمت ابری نیاز داشته باشند.',
    exampleLabel: 'نمونه‌ای از کاربرد محصول',
    example:
      'برای نمونه، یک برنامهٔ یادداشت می‌تواند یادداشت را روی دستگاه خلاصه کند، بی‌آن‌که آن را به سرور بفرستد.',
    principles: ['هوش مصنوعی روی دستگاه، هرجا مناسب است', 'مرزهای روشن خدمات', 'خدمات ابری، هرجا مفید است'],
    architectureTagline: 'پردازش را بر پایهٔ وظیفه انتخاب کنید',
    architectureStatus: 'هوش مصنوعی / وب / موبایل / ابر',
    moreCapabilities: 'راه‌های بیشتر برای مهندسی ارزش',
    capabilityLabel: 'توانایی‌ها',
    transition: 'فناوری محصول را بر پایهٔ کاری که باید انجام دهد انتخاب کنید.',
    built: 'با هدف مهندسی‌شده',
    cards: [
      {
        eyebrow: 'مهندسی هوش مصنوعی',
        title: 'هوش مصنوعی در جای مناسب.',
        description:
          'قابلیت‌های هوش مصنوعی را برای پردازش روی دستگاه یا ابر برنامه‌ریزی می‌کنیم و مسیر داده را برای هر محصول برمی‌گزینیم.',
      },
      {
        eyebrow: 'محصولات وب و موبایل',
        title: 'محصولات وب و موبایل بسازید.',
        description:
          'وب‌سایت‌ها و اپلیکیشن‌های موبایل را با مرزهای روشن خدمات و یکپارچه‌سازی‌های مورد نیاز می‌سازیم.',
      },
      {
        eyebrow: 'بلاک‌چین و یکپارچه‌سازی',
        title: 'سیستم‌های بلاک‌چین و فناوری مالی را پیوند دهید.',
        description:
          'از محصولات بلاک‌چین و فناوری مالی با یکپارچه‌سازی API و قراردادهای هوشمند پشتیبانی می‌کنیم.',
      },
    ],
  },
  ps: {
    sectionLabel: '۰۴ / تخنیکي وړتیاوې',
    heading: ['د مصنوعي ځیرکتیا انجینري،', 'د محصولاتو لپاره.'],
    introduction:
      'موږ د ځیرکتیا ځانګړنې او وېب او موبایل محصولات جوړوو او پروسس د کارونې له مخې ټاکو.',
    connected: 'وېب، موبایل او نښلول شوي خدمتونه',
    architecture: '۰۱ / د ځیرک محصول جوړښت',
    structureFlowScale: 'پر وسیله / وېب / موبایل / کلاوډ',
    foundationEyebrow: 'ځیرکتیا په مناسب ځای کې',
    foundationHeading: ['پر وسیله، چې مناسب وي.', 'نښلول شوې، چې ګټوره وي.'],
    foundationDescription:
      'د ځیرکتیا د ځانګړنې ځای د هغې د موخې او اړینو معلوماتو له مخې ټاکو. ځینې کارونه پر وسیله کېدای شي او نور ښايي کلاوډ خدمت وکاروي.',
    exampleLabel: 'د محصول یوه بېلګه',
    example:
      'د بېلګې په توګه، د یادښتونو اپلېکېشن کولی شي یادښت پر وسیله لنډ کړي، پرته له دې چې سرور ته یې ولېږي.',
    principles: ['پر وسیله ځیرکتیا، چې مناسبه وي', 'د خدمتونو روښانه پولې', 'کلاوډ خدمتونه، چې ګټور وي'],
    architectureTagline: 'پروسس د دندې له مخې وټاکئ',
    architectureStatus: 'ځیرکتیا / وېب / موبایل / کلاوډ',
    moreCapabilities: 'د ارزښت د جوړولو نورې لارې',
    capabilityLabel: 'وړتیاوې',
    transition: 'د محصول ټکنالوژي د هغه د اړتیا له مخې وټاکئ.',
    built: 'په موخه انجینري شوی',
    cards: [
      {
        eyebrow: 'د مصنوعي ځیرکتیا انجینري',
        title: 'ځیرکتیا په مناسب ځای کې.',
        description:
          'د ځیرکتیا ځانګړنې پر وسیله یا کلاوډ د پروسس لپاره پلان کوو او د هر محصول لپاره د معلوماتو لاره ټاکو.',
      },
      {
        eyebrow: 'وېب او موبایل محصولات',
        title: 'وېب او موبایل محصولات جوړ کړئ.',
        description:
          'وېبپاڼې او موبایل اپلېکېشنونه د خدمتونو په روښانه پولو او اړینو نښلونې سره جوړوو.',
      },
      {
        eyebrow: 'بلاکچېن او نښلونې',
        title: 'بلاکچېن او مالي سیسټمونه ونښلوئ.',
        description:
          'د بلاکچېن او مالي ټکنالوژۍ د محصولاتو ملاتړ د API او سمارټ قراردادونو د نښلولو له لارې کوو.',
      },
    ],
  },
} satisfies Record<
  SiteLanguage,
  {
    sectionLabel: string;
    heading: [string, string];
    introduction: string;
    connected: string;
    architecture: string;
    structureFlowScale: string;
    foundationEyebrow: string;
    foundationHeading: [string, string];
    foundationDescription: string;
    exampleLabel: string;
    example: string;
    principles: string[];
    architectureTagline: string;
    architectureStatus: string;
    moreCapabilities: string;
    capabilityLabel: string;
    transition: string;
    built: string;
    cards: {
      eyebrow: string;
      title: string;
      description: string;
    }[];
  }
>;

function useSectionEntrance(sectionRef: React.RefObject<HTMLElement | null>) {
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotionPreference = () => {
      setReducedMotion(motionQuery.matches);

      if (motionQuery.matches) {
        setHasEntered(true);
      }
    };

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    const section = sectionRef.current;

    if (
      motionQuery.matches ||
      !('IntersectionObserver' in window) ||
      !section
    ) {
      setHasEntered(true);

      return () => {
        motionQuery.removeEventListener('change', updateMotionPreference);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', updateMotionPreference);
    };
  }, [sectionRef]);

  return { hasEntered, reducedMotion };
}

function entranceStyle(
  hasEntered: boolean,
  reducedMotion: boolean,
  direction: 'left' | 'right',
  delay = 0,
): CSSProperties {
  return {
    opacity: hasEntered ? 1 : 0,
    transform: reducedMotion
      ? 'none'
      : hasEntered
        ? 'translate3d(0, 0, 0)'
        : `translate3d(${direction === 'left' ? '-20px' : '20px'}, 0, 0)`,
    transition: reducedMotion
      ? 'none'
      : `opacity 650ms ease ${delay}ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   CapabilitiesSection — refined (section 4)

   HOW TO APPLY, inside your existing CapabilitiesSection.tsx:
   1. Replace your react import line with:
        import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
   2. KEEP: lucide imports, BRAND, `capabilities`, `translations`,
      `useSectionEntrance`, and the ArchitectureVisual / CapabilityPanel imports.
   3. DELETE your `entranceStyle` function and your
      `export default function CapabilitiesSection`.
      Paste everything below in their place.

   What's better:
   - Same motion language as the other sections: word-by-word headline,
     shimmering gradient line, blur-rise reveals
   - Light follows the cursor (section glow + a grid that lights up under it)
   - Each capability card sits in a frame whose border lights up near the
     cursor, in the card's own accent colour, bleeding across the gaps
   - "ON-DEVICE / WEB / MOBILE / CLOUD" becomes a live processing-path
     selector (auto-cycles, hover or focus to pick)
   - Principles are a proper list, the example is a callout, and the closing
     line is a real closing statement
   - RTL fix: your version put `flex-row-reverse` on rows that already mirror
     under dir="rtl", which flipped them back. This version trusts `dir`.
   No new copy needed: everything uses your existing translations.
═══════════════════════════════════════════════════════════════════ */

const css = `
@keyframes cp-rise{from{opacity:0;transform:translateY(.6em);filter:blur(12px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes cp-shimmer{from{background-position:0% center}to{background-position:200% center}}
@keyframes cp-drift-a{0%{transform:translate3d(-4%,0,0) scale(1)}100%{transform:translate3d(6%,5%,0) scale(1.15)}}
@keyframes cp-drift-b{0%{transform:translate3d(5%,3%,0) scale(1.1)}100%{transform:translate3d(-6%,-4%,0) scale(.92)}}
@keyframes cp-scan{0%{transform:translateY(0);opacity:0}15%,85%{opacity:.5}100%{transform:translateY(100%);opacity:0}}
@keyframes cp-pulse{0%,100%{opacity:.45}50%{opacity:1}}
.cp [data-r]{opacity:0}
.cp.cp-in [data-r]{animation:cp-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
.cp-g{background-image:linear-gradient(100deg,#28D9A0 0%,#63E8C0 35%,#60A5FA 70%,#28D9A0 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.cp.cp-in .cp-g[data-r]{animation:cp-rise .9s cubic-bezier(.2,.7,.2,1) var(--d,0s) both,cp-shimmer 8s linear infinite}
.cp-scan{animation:cp-scan 7s linear infinite}
.cp-pulse{animation:cp-pulse 3s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.cp [data-r]{opacity:1}.cp.cp-in [data-r],.cp.cp-in .cp-g[data-r],.cp-scan,.cp-pulse,.cp-cloud{animation:none!important}}
`;

export default function CapabilitiesSection({
  language,
}: {
  language: SiteLanguage;
}) {
  const copy = translations[language];
  const isRtl = language !== 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const { hasEntered } = useSectionEntrance(sectionRef);

  // Processing path: "ON-DEVICE / WEB / MOBILE / CLOUD" as a live selector.
  const steps = copy.structureFlowScale.split(' / ');
  const [step, setStep] = useState(0);
  const [holdPath, setHoldPath] = useState(false);

  useEffect(() => {
    if (!hasEntered || holdPath) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, [hasEntered, holdPath, steps.length]);

  const rise = (d: number) => ({ '--d': `${d}s` }) as CSSProperties;
  const words = copy.heading[0].split(' ');
  const gAt = 0.15 + words.length * 0.07 + 0.05;

  // Cursor light for the whole section.
  const aimSection = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  // Each card frame gets its own --x/--y so light bleeds across the gaps.
  const aimCards = (e: ReactPointerEvent<HTMLElement>, clear = false) => {
    e.currentTarget.querySelectorAll<HTMLElement>('[data-card]').forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--x', clear ? '-999px' : `${e.clientX - r.left}px`);
      c.style.setProperty('--y', clear ? '-999px' : `${e.clientY - r.top}px`);
    });
  };

  const litMask =
    'radial-gradient(320px circle at var(--mx, 70%) var(--my, 20%), #000 0%, transparent 100%)';
  const gridImage =
    'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)';

  return (
    <section
      ref={sectionRef}
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      onPointerMove={aimSection}
      className={`cp relative isolate overflow-hidden bg-[#050914] py-24 text-white sm:py-28 lg:py-32 ${
        hasEntered ? 'cp-in' : ''
      }`}
    >
      <style>{css}</style>

      {/* ATMOSPHERE */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(90%_50%_at_50%_0%,rgba(20,70,90,.30),transparent_70%)]" />
        <div
          className="cp-cloud absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] max-w-[140vw] -translate-x-1/2 rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(40,217,160,.16), transparent)',
            animation: 'cp-drift-a 30s ease-in-out infinite alternate',
          }}
        />
        <div
          className="cp-cloud absolute -left-1/4 top-[32%] h-[40rem] w-[40rem] rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(37,99,235,.16), transparent)',
            animation: 'cp-drift-b 38s ease-in-out infinite alternate',
          }}
        />
        <div
          className="cp-cloud absolute -right-1/4 top-[58%] h-[38rem] w-[38rem] rounded-full will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(40,217,160,.09), transparent)',
            animation: 'cp-drift-a 44s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: gridImage,
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{ backgroundImage: gridImage, backgroundSize: '64px 64px', maskImage: litMask, WebkitMaskImage: litMask }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(520px circle at var(--mx, 70%) var(--my, 20%), rgba(40,217,160,.09), rgba(96,165,250,.04) 45%, transparent 70%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050914] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <header className="mb-14 max-w-4xl sm:mb-16 lg:mb-20">
          <div data-r style={rise(0.05)} className="mb-7 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 shrink-0 bg-gradient-to-r from-[#28D9A0] to-[#28D9A0]/10 rtl:bg-gradient-to-l" />
            <span className={`text-xs font-semibold text-[#28D9A0] ${isRtl ? '' : 'tracking-[0.14em]'}`}>
              {copy.sectionLabel}
            </span>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/10 sm:block" />
          </div>

          <h2
            id="capabilities-heading"
            className={`font-semibold text-white ${
              isRtl
                ? 'text-[clamp(2.1rem,5vw,4.4rem)] leading-[1.4] tracking-normal'
                : 'text-[clamp(2.6rem,6.2vw,5.6rem)] leading-[1.02] tracking-[-0.055em]'
            }`}
          >
            <span className="block">
              {words.map((w, i) => (
                <span key={i}>
                  <span data-r className="inline-block" style={rise(0.15 + i * 0.07)}>{w}</span>{' '}
                </span>
              ))}
            </span>
            <span data-r className="cp-g block pb-2" style={rise(gAt)}>{copy.heading[1]}</span>
          </h2>

          <div data-r style={rise(gAt + 0.25)} className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-[17px]">{copy.introduction}</p>
            <span className="hidden shrink-0 items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-xs text-slate-300 lg:inline-flex">
              <Network size={15} strokeWidth={1.6} aria-hidden="true" className="text-[#28D9A0]" />
              {copy.connected}
            </span>
          </div>
        </header>

        {/* PRIMARY FEATURE: AI PRODUCT ARCHITECTURE */}
        <div>
          <div data-r style={rise(gAt + 0.35)} className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.09] pb-3">
            <span className="flex items-center gap-2.5">
              <Layers3 size={15} strokeWidth={1.6} aria-hidden="true" className="text-[#28D9A0]" />
              <span className={`text-xs font-semibold text-slate-200 ${isRtl ? '' : 'tracking-[0.12em]'}`}>{copy.architecture}</span>
            </span>
            <span dir="ltr" className="font-mono text-[10px] tracking-[0.12em] text-slate-500">{copy.structureFlowScale}</span>
          </div>

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 xl:gap-16">
            {/* narrative */}
            <div className="flex min-w-0 flex-col justify-center py-2 lg:py-6">
              <span data-r style={rise(gAt + 0.4)} className="mb-6 flex size-12 items-center justify-center rounded-xl border border-[#28D9A0]/25 bg-[#28D9A0]/[0.07] text-[#28D9A0] shadow-[0_0_32px_rgba(40,217,160,.12)]">
                <Workflow size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>

              <p data-r style={rise(gAt + 0.45)} className={`mb-3 text-xs font-semibold text-[#28D9A0]/90 ${isRtl ? '' : 'tracking-[0.12em]'}`}>
                {copy.foundationEyebrow}
              </p>

              <h3 data-r style={rise(gAt + 0.5)} className={`max-w-lg text-3xl font-medium leading-[1.2] text-white sm:text-[2.6rem] ${isRtl ? '' : 'tracking-[-0.04em]'}`}>
                {copy.foundationHeading[0]}
                <span className="mt-1 block text-slate-500">{copy.foundationHeading[1]}</span>
              </h3>

              <p data-r style={rise(gAt + 0.6)} className="mt-5 max-w-lg text-[15px] leading-8 text-slate-300">
                {copy.foundationDescription}
              </p>

              <p data-r style={rise(gAt + 0.7)} className="mt-6 max-w-lg rounded-xl border border-[#28D9A0]/20 bg-[#28D9A0]/[0.04] p-4 text-[13px] leading-6 text-slate-300">
                <span className="mb-1 block text-xs font-semibold text-[#28D9A0]">{copy.exampleLabel}</span>
                {copy.example}
              </p>

              <ul data-r style={rise(gAt + 0.8)} className="mt-7 max-w-lg border-t border-white/[0.09]">
                {copy.principles.map((p, i) => (
                  <li key={p} className="group flex items-center gap-4 border-b border-white/[0.07] py-3.5 text-sm text-slate-300 transition-colors duration-300 hover:text-white">
                    <span className="font-mono text-[11px] text-slate-600 transition-colors duration-300 group-hover:text-[#28D9A0]">0{i + 1}</span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28D9A0] shadow-[0_0_10px_rgba(40,217,160,.5)]" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>

              {/* processing path */}
              <div data-r style={rise(gAt + 0.9)} className="mt-7 max-w-lg" onPointerEnter={() => setHoldPath(true)} onPointerLeave={() => setHoldPath(false)}>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono text-[#28D9A0]">SYS_01</span>
                  <span aria-hidden="true" className="h-px w-7 bg-white/15" />
                  <span>{copy.architectureTagline}</span>
                </div>
                <div dir="ltr" className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2" role="group" aria-label={copy.architectureTagline}>
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-pressed={i === step}
                        onClick={() => setStep(i)}
                        onFocus={() => { setHoldPath(true); setStep(i); }}
                        onBlur={() => setHoldPath(false)}
                        onPointerEnter={() => setStep(i)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] ${
                          i === step
                            ? 'border-[#28D9A0]/60 bg-[#28D9A0]/[0.1] text-[#B6F5DF] shadow-[0_0_22px_rgba(40,217,160,.22)]'
                            : 'border-white/[0.1] bg-white/[0.02] text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                      {i < steps.length - 1 && <span aria-hidden="true" className={`h-px w-4 transition-colors duration-300 ${i < step ? 'bg-[#28D9A0]/60' : 'bg-white/15'}`} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* visual with HUD */}
            <div data-r style={rise(gAt + 0.3)} className="relative min-w-0">
              <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full bg-[#28D9A0]/[0.08] blur-[90px]" />
              <ArchitectureVisual language={language} />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute left-0 top-0 size-5 border-l border-t border-white/25" />
                <span className="absolute right-0 top-0 size-5 border-r border-t border-white/25" />
                <span className="absolute bottom-0 left-0 size-5 border-b border-l border-white/25" />
                <span className="absolute bottom-0 right-0 size-5 border-b border-r border-white/25" />
                <span className="cp-scan absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/60 to-transparent" />
              </div>
            </div>
          </div>

          <div data-r style={rise(gAt + 1)} className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.07] py-3.5">
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="relative flex size-2 shrink-0">
                <span className="cp-pulse absolute inset-0 rounded-full bg-[#28D9A0]/50" />
                <span className="relative size-2 rounded-full bg-[#28D9A0]" />
              </span>
              <span className={`text-[10px] text-slate-400 ${isRtl ? '' : 'font-mono tracking-[0.12em]'}`}>{copy.architectureStatus}</span>
            </span>
            <span dir="ltr" aria-label="Web, API, and data layers" className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-slate-500">
              WEB <i aria-hidden="true" className="size-1 rounded-full bg-[#28D9A0]/70" /> API <i aria-hidden="true" className="size-1 rounded-full bg-[#60A5FA]/70" /> DATA
            </span>
          </div>
        </div>

        {/* SUPPORTING CAPABILITIES */}
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <div data-r style={rise(0.1)} className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.09] pb-4">
            <p className={`text-xs font-semibold text-slate-300 ${isRtl ? '' : 'tracking-[0.14em]'}`}>{copy.moreCapabilities}</p>
            <span className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className={isRtl ? '' : 'font-mono tracking-[0.12em]'}>{copy.capabilityLabel}</span>
              <ArrowDownRight size={13} aria-hidden="true" className={isRtl ? '-scale-x-100' : ''} />
            </span>
          </div>

          <div
            className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5 lg:gap-6"
            onPointerMove={(e) => aimCards(e)}
            onPointerLeave={(e) => aimCards(e, true)}
          >
            {capabilities.map((capability, index) => {
              const card = copy.cards[capability.copyIndex];
              return (
                <div
                  key={capability.number}
                  data-card
                  data-r
                  className="relative min-w-0 rounded-[20px] p-px"
                  style={
                    {
                      ...rise(0.2 + index * 0.12),
                      '--x': '-999px',
                      '--y': '-999px',
                      background: `radial-gradient(340px circle at var(--x) var(--y), ${capability.accent}cc, rgba(255,255,255,.08) 62%)`,
                    } as CSSProperties
                  }
                >
                  <div className="h-full overflow-hidden rounded-[19px] bg-[#050914]">
                    <CapabilityPanel
                      number={capability.number}
                      eyebrow={card.eyebrow}
                      title={card.title}
                      description={card.description}
                      icon={capability.icon}
                      accent={capability.accent}
                      visual={capability.visual}
                      language={language}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <div
          data-r
          style={rise(0.3)}
          className="mt-20 grid gap-6 rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.045] via-white/[0.015] to-transparent p-7 sm:mt-24 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"
        >
          <p className={`max-w-2xl text-2xl font-medium leading-snug text-white sm:text-[1.9rem] ${isRtl ? '' : 'tracking-[-0.03em]'}`}>
            {copy.transition}
          </p>
          <span className="inline-flex w-fit items-center gap-3 rounded-full border border-[#28D9A0]/30 bg-[#28D9A0]/[0.06] px-5 py-3 text-xs font-semibold text-[#9BEFD2]">
            {copy.built}
            <ArrowUpRight size={14} aria-hidden="true" className={`text-[#28D9A0] ${isRtl ? '-scale-x-100' : ''}`} />
          </span>
        </div>
      </div>
    </section>
  );
}
