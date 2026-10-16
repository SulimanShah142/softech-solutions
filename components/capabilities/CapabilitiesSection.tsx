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
} from 'lucide-react';
import type { SiteLanguage } from '@/lib/site-language';

import ArchitectureVisual from './ArchitectureVisual';
import CapabilityPanel from './CapabilityPanel';

const capabilities = [
  {
    number: '02',
    icon: Code2,
    accent: '#28D9A0',
    visual: 'engineering' as const,
  },
  {
    number: '03',
    icon: GitBranch,
    accent: '#60A5FA',
    visual: 'integrations' as const,
  },
  {
    number: '04',
    icon: BrainCircuit,
    accent: '#28D9A0',
    visual: 'automation' as const,
  },
];

const translations = {
  en: {
    sectionLabel: '04 / Technical Capabilities',
    heading: ['Beyond the', 'interface.'],
    introduction:
      'Great software is more than what people see. We engineer the architecture, connections, and intelligent systems that make digital products work as one.',
    connected: 'Designed as a connected system',
    architecture: '01 / System Architecture',
    structureFlowScale: 'STRUCTURE / FLOW / SCALE',
    foundationEyebrow: 'Foundations that hold',
    foundationHeading: ['Strong foundations.', 'Connected systems.'],
    foundationDescription:
      'Every reliable product starts with deliberate structure. We design clear system boundaries, meaningful data relationships, and maintainable foundations that can evolve as your business grows.',
    principles: ['Clear boundaries', 'Reliable data', 'Built to evolve'],
    architectureTagline: 'Architecture before complexity',
    architectureStatus: 'ARCHITECTURE / MODULAR BY DESIGN',
    moreCapabilities: 'More ways we engineer value',
    capabilityLabel: 'CAPABILITIES',
    transition: 'From engineering foundations to meaningful impact.',
    built: 'Built with intent',
    cards: [
      {
        eyebrow: 'SOFTWARE ENGINEERING',
        title: 'From interfaces to complete products.',
        description:
          'Web applications, mobile experiences, and custom software engineered for maintainability, performance, and real-world use.',
      },
      {
        eyebrow: 'APIs & INTEGRATIONS',
        title: 'Make every component work together.',
        description:
          'Connect services, databases, and external platforms through reliable APIs and clearly structured data flows.',
      },
      {
        eyebrow: 'AI & AUTOMATION',
        title: 'Intelligence with a clear purpose.',
        description:
          'Integrate practical AI and automation into business workflows to reduce repetitive work and solve defined problems.',
      },
    ],
  },
  'fa-AF': {
    sectionLabel: '۰۴ / توانایی‌های تخنیکی',
    heading: ['فراتر از', 'رابط کاربری.'],
    introduction:
      'نرم‌افزار خوب تنها چیزی نیست که مردم می‌بینند. ما معماری، پیوندها و سیستم‌های هوشمندی را مهندسی می‌کنیم که محصولات دیجیتال را به‌صورت یکپارچه به کار می‌اندازند.',
    connected: 'طراحی‌شده به‌عنوان یک سیستم پیوسته',
    architecture: '۰۱ / معماری سیستم',
    structureFlowScale: 'ساختار / جریان / گسترش',
    foundationEyebrow: 'پایه‌هایی استوار',
    foundationHeading: ['پایه‌های نیرومند.', 'سیستم‌های پیوسته.'],
    foundationDescription:
      'هر محصول قابل اعتماد با ساختاری سنجیده آغاز می‌شود. مرزهای روشن سیستم، پیوندهای معنادار داده و پایه‌های نگهداشت‌پذیری طراحی می‌کنیم که هم‌پای رشد کسب‌وکار شما تکامل یابند.',
    principles: ['مرزهای روشن', 'داده‌های قابل اعتماد', 'آماده برای تکامل'],
    architectureTagline: 'معماری پیش از پیچیدگی',
    architectureStatus: 'معماری / ماژولار از پایه',
    moreCapabilities: 'راه‌های بیشتر برای مهندسی ارزش',
    capabilityLabel: 'توانایی‌ها',
    transition: 'از پایه‌های مهندسی تا اثرگذاری معنادار.',
    built: 'با هدف ساخته شده',
    cards: [
      {
        eyebrow: 'انجنیری نرم‌افزار',
        title: 'از رابط‌ها تا محصولات کامل.',
        description:
          'برنامه‌های وب، تجربه‌های موبایل و نرم‌افزارهای سفارشی با تمرکز بر نگهداشت‌پذیری، کارایی و استفاده در دنیای واقعی مهندسی می‌کنیم.',
      },
      {
        eyebrow: 'رابط‌های برنامه‌نویسی و یکپارچه‌سازی',
        title: 'همه اجزا را باهم هماهنگ کنید.',
        description:
          'خدمات، پایگاه‌های داده و پلتفرم‌های بیرونی را با رابط‌های قابل اعتماد و جریان‌های روشن داده به‌هم پیوند می‌دهیم.',
      },
      {
        eyebrow: 'هوش مصنوعی و خودکارسازی',
        title: 'هوشمندی با هدفی روشن.',
        description:
          'هوش مصنوعی کاربردی و خودکارسازی را در روندهای کاری ادغام می‌کنیم تا کارهای تکراری کمتر شده و مسائل مشخص حل شوند.',
      },
    ],
  },
  ps: {
    sectionLabel: '۰۴ / تخنیکي وړتیاوې',
    heading: ['له دې هاخوا', 'کارن‌مخ.'],
    introduction:
      'ښه سافټویر یوازې هغه څه نه دي چې خلک یې ویني. موږ هغه جوړښت، اړیکې او هوښیار سیسټمونه انجینري کوو چې ډیجیټلي محصولات په ګډه کار کوي.',
    connected: 'د یو تړلي سیسټم په توګه طرحه شوی',
    architecture: '۰۱ / د سیسټم جوړښت',
    structureFlowScale: 'جوړښت / بهیر / پراختیا',
    foundationEyebrow: 'ټینګې بنسټیزې ستنې',
    foundationHeading: ['پیاوړي بنسټونه.', 'تړلي سیسټمونه.'],
    foundationDescription:
      'هر باوري محصول په سنجول شوي جوړښت پیلېږي. موږ د سیسټم روښانه پولې، د معلوماتو مانادارې اړیکې او د ساتنې وړ بنسټونه جوړوو چې ستاسو د سوداګرۍ له ودې سره وده وکړي.',
    principles: ['روښانه پولې', 'باوري معلومات', 'د ودې لپاره جوړ'],
    architectureTagline: 'له پېچلتیا مخکې جوړښت',
    architectureStatus: 'جوړښت / په اصل کې ماډیولر',
    moreCapabilities: 'د ارزښت د جوړولو نورې لارې',
    capabilityLabel: 'وړتیاوې',
    transition: 'له انجینري بنسټونو څخه تر مانادار اغېز پورې.',
    built: 'په موخه جوړ شوی',
    cards: [
      {
        eyebrow: 'د سافټویر انجینري',
        title: 'له کارن‌مخونو تر بشپړو محصولاتو.',
        description:
          'وېب‌اپلېکېشنونه، د موبایل تجربې او ځانګړی سافټویر د ساتنې، چټکتیا او واقعي کارونې لپاره انجینري کوو.',
      },
      {
        eyebrow: 'API او یوځای‌کول',
        title: 'هره برخه په ګډه کار کولو ته چمتو کړئ.',
        description:
          'خدمتونه، ډیټابېسونه او بهرني پلاتفورمونه د باوري API ګانو او روښانه معلوماتي بهیرونو له لارې نښلوو.',
      },
      {
        eyebrow: 'مصنوعي ځیرکتیا او اتومات',
        title: 'له روښانه موخې سره ځیرکتیا.',
        description:
          'د سوداګرۍ په کاري بهیرونو کې عملي مصنوعي ځیرکتیا او اتومات ورګډوو، څو تکراري کارونه کم او مشخصې ستونزې حل شي.',
      },
    ],
  },
} satisfies Record<SiteLanguage, {
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
  cards: { eyebrow: string; title: string; description: string }[];
}>;

export default function CapabilitiesSection({ language }: { language: SiteLanguage }) {
  const copy = translations[language];
  const isRtl = language !== 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener('change', updateMotion);

    const section = sectionRef.current;

    if (motion.matches || !('IntersectionObserver' in window)) {
      setHasEntered(true);

      return () => {
        motion.removeEventListener('change', updateMotion);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    if (section) observer.observe(section);

    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
    };
  }, []);

  const entrance = (side: 'left' | 'right', delay = 0) => ({
    opacity: hasEntered ? 1 : 0,
    transform: hasEntered
      ? 'translate3d(0, 0, 0)'
      : `translate3d(${side === 'left' ? '-24px' : '24px'}, 0, 0)`,
    transition: reducedMotion
      ? 'none'
      : `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative isolate overflow-hidden bg-[#050914] py-24 text-white sm:py-32 lg:py-36"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-[-260px] h-[560px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(40,217,160,0.085) 0%, rgba(40,217,160,0.025) 38%, transparent 72%)',
            filter: 'blur(70px)',
          }}
        />

        <div
          className="absolute -left-[300px] top-[28%] h-[650px] w-[650px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0.025) 42%, transparent 72%)',
            filter: 'blur(85px)',
          }}
        />

        <div
          className="absolute -right-[320px] top-[48%] h-[650px] w-[650px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(40,217,160,0.055) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.42) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.42) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 84%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 84%, transparent 100%)',
          }}
        />

        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050914] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050914] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <header className={`mb-14 max-w-3xl sm:mb-16 lg:mb-20 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9"
              style={{
                background:
                  'linear-gradient(90deg, #28D9A0, rgba(40,217,160,0.15))',
              }}
            />

            <span className={`text-[11px] font-semibold uppercase ${isRtl ? 'tracking-normal' : 'tracking-[0.24em]'} text-[#28D9A0]`}>
              {copy.sectionLabel}
            </span>

            <span className="ml-1 hidden h-px w-16 bg-white/10 sm:block" />
          </div>

          <h2
            id="capabilities-heading"
            className={`max-w-2xl text-4xl font-semibold leading-[1.08] ${isRtl ? '' : 'tracking-[-0.045em]'} text-white sm:text-5xl lg:text-7xl`}
          >
            {copy.heading[0]}{' '}
            <span className="bg-gradient-to-r from-[#28D9A0] via-[#63E8C0] to-[#60A5FA] bg-clip-text text-transparent">
              {copy.heading[1]}
            </span>
          </h2>

          <div className={`mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {copy.introduction}
            </p>

            <div className="hidden shrink-0 items-center gap-2 pb-1 text-xs text-slate-500 lg:flex">
              <Network size={15} className="text-[#28D9A0]" />
              <span>{copy.connected}</span>
            </div>
          </div>
        </header>

        {/* Main architecture feature */}
        <div className="relative">
          <div className={`mb-4 flex items-center justify-between border-b border-white/[0.09] pb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-2.5">
              <Layers3 size={15} className="text-[#28D9A0]" />
              <span className={`text-[10px] font-semibold uppercase ${isRtl ? 'tracking-normal' : 'tracking-[0.2em]'} text-slate-300`}>
                {copy.architecture}
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-wider text-slate-600">
              {copy.structureFlowScale}
            </span>
          </div>

          <div className="grid items-stretch gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
            {/* Editorial copy enters from the left */}
            <div
              className={`group/copy flex flex-col justify-center rounded-xl py-3 transition-colors duration-300 hover:bg-white/[0.012] lg:py-8 ${isRtl ? 'text-right' : 'text-left'}`}
              style={entrance('left')}
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-[#28D9A0]/20 bg-[#28D9A0]/[0.07] text-[#28D9A0] transition-all duration-300 group-hover/copy:border-[#28D9A0]/45 group-hover/copy:bg-[#28D9A0]/[0.12] group-hover/copy:shadow-[0_0_30px_rgba(40,217,160,0.08)]">
                <Workflow size={22} strokeWidth={1.5} />
              </div>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28D9A0]/80">
                {copy.foundationEyebrow}
              </p>

              <h3 className={`max-w-md text-3xl font-medium leading-tight ${isRtl ? '' : 'tracking-[-0.035em]'} text-white sm:text-4xl`}>
                {copy.foundationHeading[0]}
                <span className="block text-slate-500">
                  {copy.foundationHeading[1]}
                </span>
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                {copy.foundationDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/[0.09] pt-5">
                {copy.principles.map(
                  (item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 text-xs text-slate-400 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28D9A0]" />
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className={`mt-8 flex items-center gap-2 text-xs text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="font-mono text-[#28D9A0]">SYS_01</span>
                <span className="h-px w-8 bg-white/15" />
                <span>{copy.architectureTagline}</span>
              </div>
            </div>

            {/* Architecture enters from the right */}
            <div
              className="relative min-w-0"
              style={entrance('right', 120)}
            >
              <ArchitectureVisual language={language} />
            </div>
          </div>

          {/* Small system-status rail */}
          <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.07] py-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28D9A0]/30" />
                <span className="relative h-2 w-2 rounded-full bg-[#28D9A0]" />
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] text-slate-500">
                {copy.architectureStatus}
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[9px] tracking-wider text-slate-600">
              <span>WEB</span>
              <span className="h-1 w-1 rounded-full bg-[#28D9A0]/60" />
              <span>API</span>
              <span className="h-1 w-1 rounded-full bg-[#60A5FA]/60" />
              <span>DATA</span>
            </div>
          </div>
        </div>

        {/* Supporting capabilities */}
        <div className="mt-20 sm:mt-24">
          <div className={`mb-7 flex items-center justify-between gap-4 border-b border-white/[0.09] pb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <p className={`text-[10px] font-semibold uppercase ${isRtl ? 'tracking-normal' : 'tracking-[0.22em]'} text-slate-400`}>
              {copy.moreCapabilities}
            </p>

            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <span>{copy.capabilityLabel}</span>
              <ArrowDownRight size={13} className={isRtl ? 'rotate-90' : ''} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {capabilities.map((capability) => (
              <CapabilityPanel
                key={capability.number}
                number={capability.number}
                eyebrow={copy.cards[Number(capability.number) - 2].eyebrow}
                title={copy.cards[Number(capability.number) - 2].title}
                description={copy.cards[Number(capability.number) - 2].description}
                icon={capability.icon}
                accent={capability.accent}
                visual={capability.visual}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Transition */}
        <div className={`mt-20 flex flex-col gap-4 border-t border-white/[0.09] pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <p className={`text-xs text-slate-500 ${isRtl ? '' : 'tracking-wide'}`}>
            {copy.transition}
          </p>

          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
            <span>{copy.built}</span>
            <ArrowUpRight size={14} className={`text-[#28D9A0] ${isRtl ? '-rotate-90' : ''}`} />
          </div>
        </div>
      </div>
    </section>
  );
}