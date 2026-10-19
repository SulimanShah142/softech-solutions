
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

export default function CapabilitiesSection({
  language,
}: {
  language: SiteLanguage;
}) {
  const copy = translations[language];
  const isRtl = language !== 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const { hasEntered, reducedMotion } = useSectionEntrance(sectionRef);

  return (
    <section
      ref={sectionRef}
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative isolate overflow-hidden bg-[#050914] py-20 text-white sm:py-28 lg:py-32"
    >
      <style>{`
        @keyframes capabilitiesAmbient {
          0%, 100% { opacity: .45; }
          50% { opacity: .8; }
        }

        @keyframes capabilitiesStatus {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }

        .capabilities-ambient {
          animation: capabilitiesAmbient 12s ease-in-out infinite;
        }

        .capabilities-status {
          animation: capabilitiesStatus 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .capabilities-ambient,
          .capabilities-status {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="capabilities-ambient absolute left-1/2 top-[-260px] h-[540px] w-[860px] max-w-[130vw] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(40,217,160,0.085) 0%, rgba(40,217,160,0.025) 40%, transparent 72%)',
            filter: 'blur(65px)',
          }}
        />

        <div
          className="absolute -left-[360px] top-[30%] h-[620px] w-[620px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.075) 0%, transparent 70%)',
            filter: 'blur(85px)',
          }}
        />

        <div
          className="absolute -right-[400px] top-[55%] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(40,217,160,0.045) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.45) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
          }}
        />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050914] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050914] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <header
          className={`mb-12 max-w-4xl sm:mb-16 lg:mb-20 ${
            isRtl ? 'text-right' : 'text-left'
          }`}
        >
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 shrink-0"
              style={{
                background:
                  'linear-gradient(90deg, #28D9A0, rgba(40,217,160,0.12))',
              }}
            />

            <span
              className={`text-[10px] font-semibold uppercase text-[#28D9A0] sm:text-[11px] ${
                isRtl ? '' : 'tracking-[0.2em]'
              }`}
            >
              {copy.sectionLabel}
            </span>

            <span
              aria-hidden="true"
              className="hidden h-px w-14 bg-white/10 sm:block"
            />
          </div>

          <h2
            id="capabilities-heading"
            className={`max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-7xl ${
              isRtl ? '' : 'tracking-[-0.045em]'
            }`}
          >
            {copy.heading[0]}{' '}
            <span className="bg-gradient-to-r from-[#28D9A0] via-[#63E8C0] to-[#60A5FA] bg-clip-text text-transparent">
              {copy.heading[1]}
            </span>
          </h2>

          <div
            className={`mt-6 flex flex-col gap-5 sm:mt-7 sm:flex-row sm:items-end sm:justify-between ${
              isRtl ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {copy.introduction}
            </p>

            <div
              className={`hidden shrink-0 items-center gap-2 pb-1 text-xs text-slate-500 lg:flex ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <Network
                size={15}
                strokeWidth={1.6}
                className="text-[#28D9A0]"
              />
              <span>{copy.connected}</span>
            </div>
          </div>
        </header>

        {/* Primary architecture feature */}
        <div>
          <div
            className={`mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.09] pb-3 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex items-center gap-2.5 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <Layers3
                size={15}
                strokeWidth={1.6}
                className="text-[#28D9A0]"
              />

              <span
                className={`text-[10px] font-semibold uppercase text-slate-300 sm:text-[11px] ${
                  isRtl ? '' : 'tracking-[0.17em]'
                }`}
              >
                {copy.architecture}
              </span>
            </div>

            <span
              className={`font-mono text-[9px] text-slate-600 sm:text-[10px] ${
                isRtl ? '' : 'tracking-[0.12em]'
              }`}
            >
              {copy.structureFlowScale}
            </span>
          </div>

          <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 xl:gap-14">
            {/* Architecture narrative */}
            <div
              className={`flex min-w-0 flex-col justify-center py-2 lg:py-8 ${
                isRtl ? 'text-right' : 'text-left'
              }`}
              style={entranceStyle(
                hasEntered,
                reducedMotion,
                isRtl ? 'right' : 'left',
              )}
            >
              <div
                className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#28D9A0]/20 bg-[#28D9A0]/[0.06] text-[#28D9A0] ${
                  isRtl ? 'self-end' : 'self-start'
                }`}
              >
                <Workflow size={21} strokeWidth={1.5} />
              </div>

              <p
                className={`mb-3 text-[10px] font-semibold uppercase text-[#28D9A0]/85 sm:text-[11px] ${
                  isRtl ? '' : 'tracking-[0.18em]'
                }`}
              >
                {copy.foundationEyebrow}
              </p>

              <h3
                className={`max-w-lg text-3xl font-medium leading-[1.2] text-white sm:text-4xl ${
                  isRtl ? '' : 'tracking-[-0.035em]'
                }`}
              >
                {copy.foundationHeading[0]}
                <span className="mt-1 block text-slate-500">
                  {copy.foundationHeading[1]}
                </span>
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:leading-8">
                {copy.foundationDescription}
              </p>

              <p className="mt-4 max-w-lg border-s-2 border-[#28D9A0]/45 bg-white/[0.025] px-3 py-2.5 text-xs leading-6 text-slate-300 sm:text-[13px]">
                <span className="mb-1 block font-semibold text-[#28D9A0]">
                  {copy.exampleLabel}
                </span>
                {copy.example}
              </p>

              <ul
                className={`mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/[0.09] pt-5 ${
                  isRtl ? 'justify-end' : ''
                }`}
              >
                {copy.principles.map((principle) => (
                  <li
                    key={principle}
                    className={`flex items-center gap-2 text-xs text-slate-400 ${
                      isRtl ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28D9A0]"
                    />
                    {principle}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-7 flex items-center gap-2 text-xs text-slate-500 ${
                  isRtl ? 'flex-row-reverse' : ''
                }`}
              >
                <span className="font-mono text-[#28D9A0]">SYS_01</span>
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-white/15"
                />
                <span>{copy.architectureTagline}</span>
              </div>
            </div>

            {/* Architecture visualization */}
            <div
              className="min-w-0"
              style={entranceStyle(
                hasEntered,
                reducedMotion,
                isRtl ? 'left' : 'right',
                100,
              )}
            >
              <ArchitectureVisual language={language} />
            </div>
          </div>

          {/* System metadata */}
          <div
            className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.07] py-3 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex items-center gap-2.5 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="relative flex h-2 w-2 shrink-0"
              >
                <span className="capabilities-status absolute inset-0 rounded-full bg-[#28D9A0]/50" />
                <span className="relative h-2 w-2 rounded-full bg-[#28D9A0]" />
              </span>

              <span
                className={`text-[9px] text-slate-500 sm:text-[10px] ${
                  isRtl ? '' : 'font-mono tracking-[0.12em]'
                }`}
              >
                {copy.architectureStatus}
              </span>
            </div>

            <div
              aria-label="Web, API, and data layers"
              className="flex items-center gap-3 font-mono text-[9px] tracking-wider text-slate-600"
            >
              <span>WEB</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#28D9A0]/60"
              />
              <span>API</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#60A5FA]/60"
              />
              <span>DATA</span>
            </div>
          </div>
        </div>

        {/* Supporting capabilities */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div
            className={`mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.09] pb-4 sm:mb-7 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <p
                className={`text-[10px] font-semibold uppercase text-slate-400 sm:text-[11px] ${
                  isRtl ? '' : 'tracking-[0.18em]'
                }`}
              >
                {copy.moreCapabilities}
              </p>
            </div>

            <div
              className={`flex items-center gap-2 text-[9px] text-slate-600 sm:text-[10px] ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <span
                className={isRtl ? '' : 'font-mono tracking-[0.12em]'}
              >
                {copy.capabilityLabel}
              </span>

              <ArrowDownRight
                size={13}
                aria-hidden="true"
                className={isRtl ? '-rotate-90' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
            {capabilities.map((capability, index) => {
              const card = copy.cards[capability.copyIndex];

              return (
                <div
                  key={capability.number}
                  className="min-w-0"
                  style={{
                    opacity: hasEntered ? 1 : 0,
                    transform: reducedMotion
                      ? 'none'
                      : hasEntered
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transition: reducedMotion
                      ? 'none'
                      : `opacity 600ms ease ${160 + index * 100}ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) ${160 + index * 100}ms`,
                  }}
                >
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
              );
            })}
          </div>
        </div>

        {/* Section closing statement */}
        <div
          className={`mt-16 flex flex-col gap-4 border-t border-white/[0.09] pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between ${
            isRtl ? 'sm:flex-row-reverse' : ''
          }`}
        >
          <p
            className={`max-w-xl text-xs leading-6 text-slate-500 sm:text-sm ${
              isRtl ? '' : 'tracking-wide'
            }`}
          >
            {copy.transition}
          </p>

          <div
            className={`flex items-center gap-3 text-[10px] font-medium text-slate-500 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span
              className={isRtl ? '' : 'uppercase tracking-[0.15em]'}
            >
              {copy.built}
            </span>

            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className={`text-[#28D9A0] ${
                isRtl ? '-rotate-90' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
