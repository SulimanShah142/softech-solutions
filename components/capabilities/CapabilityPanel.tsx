
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { SiteLanguage } from '@/lib/site-language';

type CapabilityVisual = 'engineering' | 'integrations' | 'automation';

interface CapabilityPanelProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  visual: CapabilityVisual;
  language: SiteLanguage;
}

const artworkCopy = {
  en: {
    engineering: 'Software engineering illustration with component structure',
    integration: 'Diagram illustrating connected services and data',
    automation: 'Workflow automation illustration from input to action',
    components: 'COMPONENTS / STRUCTURE',
    ready: 'READY',
    synchronized: 'SERVICES / SYNCHRONIZED',
    linked: 'LINKED',
    workflow: 'WORKFLOW ENGINE',
    processing: 'PROCESSING',
    inputInsightAction: 'INPUT → INSIGHT → ACTION',
    active: 'ACTIVE',
    engineered: 'ENGINEERED',
    realWorld: 'Built for real-world use',
  },
  'fa-AF': {
    engineering: 'نمایش انجنیری نرم‌افزار و ساختار اجزا',
    integration: 'نمودار پیوند خدمات و داده‌ها',
    automation: 'نمایش روند خودکار از ورودی تا اقدام',
    components: 'اجزا / ساختار',
    ready: 'آماده',
    synchronized: 'خدمات / هماهنگ',
    linked: 'پیوسته',
    workflow: 'موتور روند کاری',
    processing: 'در حال پردازش',
    inputInsightAction: 'ورودی ← بینش ← اقدام',
    active: 'فعال',
    engineered: 'مهندسی‌شده',
    realWorld: 'ساخته‌شده برای استفاده واقعی',
  },
  ps: {
    engineering: 'د سافټویر انجینري او د برخو جوړښت انځور',
    integration: 'د نښلول شویو خدمتونو او معلوماتو انځور',
    automation: 'له ننوتنې تر عمله د اتومات کاري بهیر انځور',
    components: 'برخې / جوړښت',
    ready: 'چمتو',
    synchronized: 'خدمتونه / همغږي',
    linked: 'نښلول شوی',
    workflow: 'د کاري بهیر انجن',
    processing: 'پروسس کېږي',
    inputInsightAction: 'ننوتنه ← پوهه ← عمل',
    active: 'فعال',
    engineered: 'انجینري شوی',
    realWorld: 'د واقعي کارونې لپاره جوړ شوی',
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

function EngineeringVisual({ accent, language }: { accent: string; language: SiteLanguage }) {
  const copy = artworkCopy[language];
  const isRtl = language !== 'en';
  return (
    <div role="img" aria-label={copy.engineering} className="capability-art relative h-[158px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#07101D]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.055) 1px,transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div
        className="absolute -right-10 -top-16 h-36 w-36 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: accent }}
      />

      <div className="absolute left-3 right-3 top-3 overflow-hidden rounded-lg border border-white/[0.09] bg-[#080F1B]/95 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex h-8 items-center justify-between border-b border-white/[0.07] px-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
          </div>
          <span className="font-mono text-[8px] tracking-wider text-slate-600">
            system.ts
          </span>
          <Code2 size={11} style={{ color: accent }} />
        </div>

        <div className="space-y-2 px-3 py-3">
          {[72, 48, 86, 59].map((width, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
              style={{
                transform: `translateX(${index * 7}px)`,
              }}
            >
              <span className="w-3 font-mono text-[8px] text-slate-700">
                {index + 1}
              </span>
              <span
                className="h-[3px] rounded-full transition-all duration-500 group-hover:opacity-100"
                style={{
                  width: `${width}px`,
                  background:
                    index === 1
                      ? '#60A5FA'
                      : index === 2
                        ? `${accent}B0`
                        : 'rgba(148,163,184,0.3)',
                  opacity: index === 2 ? 1 : 0.65,
                  transitionDelay: `${index * 45}ms`,
                }}
              />
              {index === 2 && (
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: accent }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`absolute bottom-3 left-3 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Layers3 size={12} style={{ color: accent }} />
        <span className="font-mono text-[8px] tracking-[0.15em] text-slate-500">
          {copy.components}
        </span>
      </div>

      <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
        <span className="font-mono text-[8px] text-slate-500">{copy.ready}</span>
      </div>
    </div>
  );
}

function IntegrationsVisual({ accent, language }: { accent: string; language: SiteLanguage }) {
  const copy = artworkCopy[language];
  const isRtl = language !== 'en';
  return (
    <div role="img" aria-label={copy.integration} className="capability-art relative h-[158px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#07101D]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(148,163,184,0.35) 0.7px,transparent 0.7px)',
          backgroundSize: '15px 15px',
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 320 150"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="capability-integration-line">
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <path
          d="M56 43 H105 Q120 43 120 58 V75 H151"
          stroke="url(#capability-integration-line)"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path"
        />
        <path
          d="M56 108 H91 Q107 108 107 92 V75 H151"
          stroke="#60A5FA"
          strokeOpacity="0.65"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path integration-path-delayed"
        />
        <path
          d="M169 75 H211 Q225 75 225 59 V43 H264"
          stroke={accent}
          strokeOpacity="0.65"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path integration-path-delayed"
        />
        <path
          d="M169 75 H211 Q225 75 225 91 V108 H264"
          stroke="#60A5FA"
          strokeOpacity="0.65"
          strokeWidth="1.3"
          strokeDasharray="4 5"
          className="integration-path"
        />

        <circle cx="56" cy="43" r="3" fill={accent} />
        <circle cx="56" cy="108" r="3" fill="#60A5FA" />
        <circle cx="264" cy="43" r="3" fill={accent} />
        <circle cx="264" cy="108" r="3" fill="#60A5FA" />
      </svg>

      <div className="absolute left-[9%] top-[18%] flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-all duration-300 group-hover:border-white/20 group-hover:text-white">
        <Globe2 size={15} />
      </div>

      <div className="absolute left-[9%] top-[62%] flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-blue-300 transition-all duration-300 group-hover:-translate-y-1">
        <Database size={15} />
      </div>

      <div
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border bg-[#0B1B29] transition-all duration-500 group-hover:scale-110"
        style={{
          color: accent,
          borderColor: `${accent}55`,
          boxShadow: `0 0 25px ${accent}12`,
        }}
      >
        <GitBranch size={20} strokeWidth={1.5} />
      </div>

      <div className="absolute right-[9%] top-[18%] flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-all duration-300 group-hover:translate-x-1">
        <Workflow size={15} />
      </div>

      <div className="absolute right-[9%] top-[62%] flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-blue-300 transition-all duration-300 group-hover:translate-x-1">
        <Activity size={15} />
      </div>

      <span className={`absolute bottom-3 left-3 font-mono text-[8px] ${isRtl ? '' : 'tracking-[0.15em]'} text-slate-500`}>
        {copy.synchronized}
      </span>
      <span className={`absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-[8px] text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
        {copy.linked}
      </span>
    </div>
  );
}

function AutomationVisual({ accent, language }: { accent: string; language: SiteLanguage }) {
  const copy = artworkCopy[language];
  const isRtl = language !== 'en';
  return (
    <div role="img" aria-label={copy.automation} className="capability-art relative h-[158px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#07101D]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(40,217,160,0.10), transparent 62%)',
        }}
      />

      <div className={`absolute left-3 right-3 top-3 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className={`font-mono text-[8px] ${isRtl ? '' : 'tracking-[0.14em]'} text-slate-500`}>
          {copy.workflow}
        </span>
        <span className={`flex items-center gap-1.5 font-mono text-[8px] text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent }}
          />
          {copy.processing}
        </span>
      </div>

      <div className="absolute inset-x-4 top-[39%] flex items-center justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-all duration-300 group-hover:-translate-y-1">
          <Activity size={15} />
        </div>

        <div className="relative h-px flex-1 overflow-hidden bg-white/10">
          <span
            className="automation-signal absolute inset-y-0 left-0 w-8"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        </div>

        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110"
          style={{
            color: accent,
            borderColor: `${accent}55`,
            background: `${accent}0C`,
            boxShadow: `0 0 28px ${accent}12`,
          }}
        >
          <BrainCircuit size={22} strokeWidth={1.5} />
        </div>

        <div className="relative h-px flex-1 overflow-hidden bg-white/10">
          <span
            className="automation-signal automation-signal-delayed absolute inset-y-0 left-0 w-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, #60A5FA, transparent)',
            }}
          />
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0B1726] text-slate-300 transition-all duration-300 group-hover:translate-y-1">
          <Check size={15} />
        </div>
      </div>

      <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className={`font-mono text-[8px] ${isRtl ? '' : 'tracking-wider'} text-slate-500`}>
          {copy.inputInsightAction}
        </span>
        <span className="font-mono text-[8px]" style={{ color: accent }}>
          {copy.active}
        </span>
      </div>
    </div>
  );
}

function CapabilityArtwork({
  visual,
  accent,
  language,
}: {
  visual: CapabilityVisual;
  accent: string;
  language: SiteLanguage;
}) {
  switch (visual) {
    case 'engineering':
      return <EngineeringVisual accent={accent} language={language} />;
    case 'integrations':
      return <IntegrationsVisual accent={accent} language={language} />;
    case 'automation':
      return <AutomationVisual accent={accent} language={language} />;
  }
}

export default function CapabilityPanel({
  number,
  eyebrow,
  title,
  description,
  icon: Icon,
  accent,
  visual,
  language,
}: CapabilityPanelProps) {
  const copy = artworkCopy[language];
  const isRtl = language !== 'en';
  const panelRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = panelRef.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes capabilitySignalTravel {
          from { transform: translateX(-140%); }
          to { transform: translateX(420%); }
        }

        @keyframes capabilityPathFlow {
          to { stroke-dashoffset: -36; }
        }

        .capability-panel {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 650ms ease,
            transform 650ms cubic-bezier(0.2, 0.75, 0.25, 1),
            border-color 350ms ease,
            background-color 350ms ease,
            box-shadow 350ms ease;
        }

        .capability-panel.capability-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .capability-panel:hover {
          transform: translateY(-7px);
          background-color: rgba(11, 23, 38, 0.68);
          border-color: rgba(148, 163, 184, 0.23);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.20);
        }

        .capability-art {
          transition:
            border-color 350ms ease,
            box-shadow 350ms ease,
            transform 450ms cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        .capability-panel:hover .capability-art {
          border-color: rgba(148, 163, 184, 0.18);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
        }

        .capability-panel:hover .integration-path {
          animation: capabilityPathFlow 2.5s linear infinite;
        }

        .automation-signal {
          animation: capabilitySignalTravel 2.4s ease-in-out infinite;
        }

        .automation-signal-delayed {
          animation-delay: -1.2s;
        }

        .capability-panel:hover .automation-signal {
          animation-duration: 1.4s;
        }

        .capability-panel:focus-within {
          outline: 1px solid rgba(40, 217, 160, 0.45);
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .capability-panel,
          .capability-panel.capability-visible,
          .capability-panel:hover,
          .capability-art {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .integration-path,
          .automation-signal {
            animation: none !important;
          }
        }
      `}</style>

      <article
        ref={panelRef}
        lang={language}
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`capability-panel group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#08111E]/45 p-4 sm:p-5 ${
          visible ? 'capability-visible' : ''
        }`}
        style={{
          transitionDelay: visible ? `${(Number(number) - 2) * 110}ms` : '0ms',
          ['--capability-accent' as string]: accent,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{ background: accent }}
        />

        <div className={`relative mb-5 flex items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500">
            CAP_{number}
          </span>

          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span
              className="h-1.5 w-1.5 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_10px_var(--capability-accent)]"
              style={{ background: accent }}
            />
            <span className={`font-mono text-[8px] ${isRtl ? '' : 'tracking-wider'} text-slate-600`}>
              {copy.engineered}
            </span>
            <Icon
              size={15}
              strokeWidth={1.6}
              className="ml-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: accent }}
            />
          </div>
        </div>

        <div className="relative">
          <CapabilityArtwork visual={visual} accent={accent} language={language} />
        </div>

        <div className={`relative flex flex-1 flex-col pt-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          <p
            className={`mb-3 text-[9px] font-semibold uppercase ${isRtl ? '' : 'tracking-[0.19em]'}`}
            style={{ color: accent }}
          >
            {eyebrow}
          </p>

          <h3 className={`max-w-sm text-xl font-medium leading-snug text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-[22px] ${isRtl ? '' : 'tracking-[-0.035em]'}`}>
            {title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
            {description}
          </p>

          <div className={`mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 text-[9px] text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              <span>{copy.realWorld}</span>
            </div>

            <ArrowUpRight
              size={16}
              className={`text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 ${isRtl ? 'group-hover:-translate-x-0.5 -rotate-90' : 'group-hover:translate-x-0.5'}`}
              style={{ color: accent }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
