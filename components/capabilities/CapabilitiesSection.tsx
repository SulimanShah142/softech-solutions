
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
      'We design secure, governed AI systems for web and mobile products, from on-device orchestration to cloud-connected services and the architecture around them.',
    connected: 'Secure, governed systems across web & mobile',
    architecture: '01 / AI Product Architecture',
    structureFlowScale: 'ON-DEVICE / WEB / MOBILE / CLOUD',
    foundationEyebrow: 'AI, placed with purpose',
    foundationHeading: ['On-device when it fits.', 'Connected when it helps.'],
    foundationDescription:
      'We shape AI features around product needs: on-device inference, clear data boundaries, policy controls, and coordinated web and mobile services. Cloud services join the system where they add value.',
    principles: ['On-device inference', 'Governed data flows', 'Cloud-connected by choice'],
    architectureTagline: 'Privacy-aware orchestration',
    architectureStatus: 'AI / WEB / MOBILE / GOVERNANCE',
    moreCapabilities: 'More ways we engineer value',
    capabilityLabel: 'CAPABILITIES',
    transition: 'AI at the core, engineered across the product.',
    built: 'Engineered with intent',
    cards: [
      {
        eyebrow: 'AI ENGINEERING',
        title: 'Orchestrate AI close to the user.',
        description:
          'Plan on-device inference and web/mobile AI experiences with explicit data boundaries, policy controls, and coordinated service interfaces.',
      },
      {
        eyebrow: 'WEB & MOBILE PRODUCTS',
        title: 'Build dependable digital products.',
        description:
          'Engineer secure web and mobile products with maintainable architecture, clear integrations, and dependable cloud-connected services.',
      },
      {
        eyebrow: 'BLOCKCHAIN & INTEGRATIONS',
        title: 'Connect distributed systems with care.',
        description:
          'Support blockchain and fintech products with secure API boundaries, smart-contract integrations, and considered operational controls.',
      },
    ],
  },
  'fa-AF': {
    sectionLabel: '۰۴ / توانایی‌های تخنیکی',
    heading: ['مهندسی هوش مصنوعی،', 'برای محصولات واقعی.'],
    introduction:
      'سیستم‌های امن و تحت حاکمیت هوش مصنوعی را برای محصولات وب و موبایل طراحی می‌کنیم؛ از هماهنگی روی دستگاه تا خدمات متصل به ابر و معماری پیرامون آن.',
    connected: 'سیستم‌های امن و تحت حاکمیت برای وب و موبایل',
    architecture: '۰۱ / معماری محصول هوش مصنوعی',
    structureFlowScale: 'روی دستگاه / وب / موبایل / ابر',
    foundationEyebrow: 'هوش مصنوعی با جای‌گذاری سنجیده',
    foundationHeading: ['روی دستگاه، هرجا مناسب است.', 'متصل، هرجا سودمند است.'],
    foundationDescription:
      'قابلیت‌های هوش مصنوعی را بر پایه نیاز محصول معماری می‌کنیم: استنتاج روی دستگاه، مرزهای روشن داده، کنترل‌های سیاستی و هماهنگی خدمات وب و موبایل. خدمات ابری هرجا ارزش بیفزایند، به سیستم می‌پیوندند.',
    principles: ['استنتاج روی دستگاه', 'جریان داده تحت حاکمیت', 'اتصال اختیاری به ابر'],
    architectureTagline: 'هماهنگی با توجه به حریم خصوصی',
    architectureStatus: 'هوش مصنوعی / وب / موبایل / حاکمیت',
    moreCapabilities: 'راه‌های بیشتر برای مهندسی ارزش',
    capabilityLabel: 'توانایی‌ها',
    transition: 'هوش مصنوعی در هسته؛ مهندسی در سراسر محصول.',
    built: 'با هدف مهندسی‌شده',
    cards: [
      {
        eyebrow: 'مهندسی هوش مصنوعی',
        title: 'هماهنگی هوش مصنوعی در نزدیکی کاربر.',
        description:
          'استنتاج روی دستگاه و تجربه‌های هوش مصنوعی در وب و موبایل را با مرزهای روشن داده، کنترل‌های سیاستی و رابط‌های هماهنگ خدمات برنامه‌ریزی می‌کنیم.',
      },
      {
        eyebrow: 'محصولات وب و موبایل',
        title: 'محصولات دیجیتال قابل اعتماد بسازید.',
        description:
          'محصولات امن وب و موبایل را با معماری نگهداشت‌پذیر، یکپارچه‌سازی روشن و خدمات ابری قابل اعتماد مهندسی می‌کنیم.',
      },
      {
        eyebrow: 'بلاک‌چین و یکپارچه‌سازی',
        title: 'سیستم‌های توزیع‌شده را سنجیده پیوند دهید.',
        description:
          'از محصولات بلاک‌چین و فناوری مالی با مرزهای امن API، یکپارچه‌سازی قراردادهای هوشمند و کنترل‌های عملیاتی سنجیده پشتیبانی می‌کنیم.',
      },
    ],
  },
  ps: {
    sectionLabel: '۰۴ / تخنیکي وړتیاوې',
    heading: ['د مصنوعي ځیرکتیا انجینري،', 'د محصولاتو لپاره.'],
    introduction:
      'موږ د وېب او موبایل محصولاتو لپاره خوندي او د اصولو له مخې اداره کېدونکي د مصنوعي ځیرکتیا سیسټمونه طرحه کوو؛ له وسیلې دننه همغږۍ تر کلاوډ خدمتونو او شاوخوا جوړښت پورې.',
    connected: 'د وېب او موبایل لپاره خوندي، اداره شوي سیسټمونه',
    architecture: '۰۱ / د ځیرک محصول جوړښت',
    structureFlowScale: 'پر وسیله / وېب / موبایل / کلاوډ',
    foundationEyebrow: 'ځیرکتیا په مناسب ځای کې',
    foundationHeading: ['پر وسیله، چې مناسب وي.', 'نښلول شوې، چې ګټوره وي.'],
    foundationDescription:
      'د محصول د اړتیاوو له مخې د مصنوعي ځیرکتیا ځانګړنې جوړوو: پر وسیله استنتاج، د معلوماتو روښانه پولې، د تګلارو کنټرولونه او همغږي شوي وېب او موبایل خدمتونه. کلاوډ خدمتونه هغه وخت ورګډېږي چې ارزښت زیات کړي.',
    principles: ['پر وسیله استنتاج', 'د معلوماتو اداره شوی بهیر', 'د اړتیا پر مهال کلاوډ'],
    architectureTagline: 'د محرمیت په پام کې نیولو سره همغږي',
    architectureStatus: 'ځیرکتیا / وېب / موبایل / حاکمیت',
    moreCapabilities: 'د ارزښت د جوړولو نورې لارې',
    capabilityLabel: 'وړتیاوې',
    transition: 'ځیرکتیا په هسته کې؛ د محصول په ټولو برخو کې انجینري.',
    built: 'په موخه انجینري شوی',
    cards: [
      {
        eyebrow: 'د مصنوعي ځیرکتیا انجینري',
        title: 'کارن ته نږدې د ځیرکتیا همغږي.',
        description:
          'پر وسیله استنتاج او د وېب او موبایل ځیرکې تجربې د معلوماتو په روښانه پولو، د تګلارو کنټرولونو او همغږي شويو خدمتونو طرحه کوو.',
      },
      {
        eyebrow: 'وېب او موبایل محصولات',
        title: 'باوري ډیجیټلي محصولات جوړ کړئ.',
        description:
          'خوندي وېب او موبایل محصولات د ساتنې وړ جوړښت، روښانه نښلونې او باوري کلاوډ خدمتونو سره انجینري کوو.',
      },
      {
        eyebrow: 'بلاکچېن او نښلونې',
        title: 'وېشل شوي سیسټمونه په پام کې ونښلوئ.',
        description:
          'د بلاکچېن او مالي ټکنالوژۍ د محصولاتو ملاتړ د خوندي API پولو، سمارټ قراردادونو د نښلولو او سنجول شويو عملیاتي کنټرولونو له لارې کوو.',
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
