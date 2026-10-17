
'use client';

import { useId } from 'react';
import {
  Activity,
  AppWindow,
  Boxes,
  Braces,
  Database,
  Globe2,
  Server,
  ShieldCheck,
  ArrowDown,
} from 'lucide-react';
import type { SiteLanguage } from '@/lib/site-language';

const layers = [
  {
    icon: AppWindow,
    color: '#28D9A0',
    code: 'L01',
  },
  {
    icon: Braces,
    color: '#60A5FA',
    code: 'L02',
  },
  {
    icon: Database,
    color: '#28D9A0',
    code: 'L03',
  },
] as const;

const modules = [
  { icon: Globe2, color: '#28D9A0', code: 'MOD.01' },
  { icon: Server, color: '#60A5FA', code: 'MOD.02' },
  { icon: ShieldCheck, color: '#60A5FA', code: 'MOD.03' },
  { icon: Activity, color: '#28D9A0', code: 'MOD.04' },
] as const;

const architectureCopy = {
  en: {
    ariaLabel:
      'Enterprise AI product architecture connecting web and mobile interfaces, on-device orchestration, governance, cloud services, and blockchain integrations.',
    systemMap: 'AI PRODUCT ARCHITECTURE',
    layeredArchitecture: 'Governed web & mobile systems',
    modularConnected: 'MODULAR / GOVERNED',
    modules: ['WEB & MOBILE', 'ON-DEVICE AI', 'GOVERNANCE', 'CLOUD & BLOCKCHAIN'],
    layers: [
      ['PRODUCT EXPERIENCE', 'Web apps · Mobile apps · AI features'],
      ['AI ORCHESTRATION', 'On-device inference · APIs · Policy controls'],
      ['PLATFORM SERVICES', 'Cloud · Data · Blockchain integrations'],
    ],
    flowActive: 'GOVERNED AI FLOW',
    modularByDesign: 'Clear boundaries, coordinated services',
    moduleHeading: 'COORDINATED CAPABILITIES',
    moduleDescription:
      'Product interfaces, on-device AI, policy controls, and connected services.',
    moduleCount: '04 MODULES',
    layerHeading: 'PRODUCT SYSTEM LAYERS',
    layerCount: '03 LAYERS',
    input: 'REQUEST',
    output: 'RESPONSE',
    secure: 'SECURE',
    status: 'ARCHITECTURE / ONLINE',
    footer: 'AI / SECURE / GOVERNED',
    web: 'WEB',
    api: 'API',
    data: 'DATA',
  },
  'fa-AF': {
    ariaLabel:
      'معماری سازمانی محصول هوش مصنوعی که رابط‌های وب و موبایل، هماهنگی روی دستگاه، حاکمیت، خدمات ابری و یکپارچه‌سازی‌های بلاک‌چین را پیوند می‌دهد.',
    systemMap: 'معماری محصول هوش مصنوعی',
    layeredArchitecture: 'سیستم‌های تحت حاکمیت وب و موبایل',
    modularConnected: 'ماژولار / تحت حاکمیت',
    modules: ['وب و موبایل', 'هوش مصنوعی روی دستگاه', 'حاکمیت', 'ابر و بلاک‌چین'],
    layers: [
      ['تجربه محصول', 'برنامه‌های وب · موبایل · قابلیت‌های هوش مصنوعی'],
      ['هماهنگی هوش مصنوعی', 'استنتاج روی دستگاه · APIها · کنترل‌های سیاستی'],
      ['خدمات پلتفرم', 'ابر · داده · یکپارچه‌سازی بلاک‌چین'],
    ],
    flowActive: 'جریان تحت حاکمیت هوش مصنوعی',
    modularByDesign: 'مرزهای روشن و خدمات هماهنگ',
    moduleHeading: 'توانایی‌های هماهنگ',
    moduleDescription:
      'رابط‌های محصول، هوش مصنوعی روی دستگاه، کنترل‌های سیاستی و خدمات متصل.',
    moduleCount: '۰۴ ماژول',
    layerHeading: 'لایه‌های سیستم محصول',
    layerCount: '۰۳ لایه',
    input: 'درخواست',
    output: 'پاسخ',
    secure: 'امن',
    status: 'معماری / فعال',
    footer: 'هوش مصنوعی / امن / تحت حاکمیت',
    web: 'وب',
    api: 'API',
    data: 'داده',
  },
  ps: {
    ariaLabel:
      'د مصنوعي ځیرکتیا د محصول تصدۍ جوړښت چې د وېب او موبایل مخونه، پر وسیله همغږي، حاکمیت، کلاوډ خدمتونه او د بلاکچېن نښلونې سره تړي.',
    systemMap: 'د ځیرک محصول جوړښت',
    layeredArchitecture: 'اداره شوي وېب او موبایل سیسټمونه',
    modularConnected: 'ماډیولر / اداره شوی',
    modules: ['وېب او موبایل', 'پر وسیله ځیرکتیا', 'حاکمیت', 'کلاوډ او بلاکچېن'],
    layers: [
      ['د محصول تجربه', 'وېب · موبایل · د ځیرکتیا ځانګړنې'],
      ['د ځیرکتیا همغږي', 'پر وسیله استنتاج · APIګانې · د تګلارو کنټرول'],
      ['د پلېټفارم خدمتونه', 'کلاوډ · معلومات · د بلاکچېن نښلونې'],
    ],
    flowActive: 'د اداره شوې ځیرکتیا بهیر',
    modularByDesign: 'روښانه پولې، همغږي خدمتونه',
    moduleHeading: 'همغږي شوې وړتیاوې',
    moduleDescription:
      'د محصول مخونه، پر وسیله ځیرکتیا، د تګلارو کنټرول او نښلول شوي خدمتونه.',
    moduleCount: '۰۴ ماډیولونه',
    layerHeading: 'د محصول سیسټم پوړونه',
    layerCount: '۰۳ پوړونه',
    input: 'غوښتنه',
    output: 'ځواب',
    secure: 'خوندي',
    status: 'جوړښت / فعال',
    footer: 'ځیرکتیا / خوندي / اداره شوی',
    web: 'وېب',
    api: 'API',
    data: 'معلومات',
  },
} satisfies Record<
  SiteLanguage,
  {
    ariaLabel: string;
    systemMap: string;
    layeredArchitecture: string;
    modularConnected: string;
    modules: string[];
    layers: [string, string][];
    flowActive: string;
    modularByDesign: string;
    moduleHeading: string;
    moduleDescription: string;
    moduleCount: string;
    layerHeading: string;
    layerCount: string;
    input: string;
    output: string;
    secure: string;
    status: string;
    footer: string;
    web: string;
    api: string;
    data: string;
  }
>;

function ArchitectureModule({
  icon: Icon,
  label,
  code,
  color,
  rtl,
}: {
  icon: typeof Globe2;
  label: string;
  code: string;
  color: string;
  rtl: boolean;
}) {
  return (
    <div
      className={`architecture-module group relative flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#081321]/95 px-3 py-3 sm:px-3.5 ${
        rtl ? 'flex-row-reverse text-right' : ''
      }`}
      style={
        {
          '--module-accent': color,
        } as React.CSSProperties
      }
    >
      <span className="absolute inset-y-3 start-0 w-[2px] rounded-full bg-[var(--module-accent)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-[var(--module-accent)] transition-colors duration-300 group-hover:bg-white/[0.06]">
        <Icon size={16} strokeWidth={1.7} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block break-words text-[9px] font-semibold leading-relaxed tracking-[0.04em] text-slate-200 sm:text-[10px]">
          {label}
        </span>
        <span
          dir="ltr"
          className="mt-1 block font-mono text-[8px] tracking-wider text-slate-600"
        >
          {code}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--module-accent)] opacity-60 sm:block"
      />
    </div>
  );
}

export default function ArchitectureVisual({
  language,
}: {
  language: SiteLanguage;
}) {
  const copy = architectureCopy[language];
  const rtl = language !== 'en';
  const reactId = useId().replace(/:/g, '');
  const greenGradientId = `architecture-green-${reactId}`;
  const blueGradientId = `architecture-blue-${reactId}`;

  return (
    <div
      lang={language}
      dir={rtl ? 'rtl' : 'ltr'}
      role="img"
      aria-label={copy.ariaLabel}
      className="architecture-enter mx-auto w-full max-w-[720px]"
    >
      <style>{`
        @keyframes architecture-enter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes architecture-data-flow {
          0% { transform: translateY(-5px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: .9; }
          100% { transform: translateY(20px); opacity: 0; }
        }

        @keyframes architecture-status {
          0%, 100% { opacity: .5; }
          50% { opacity: 1; }
        }

        .architecture-enter {
          animation: architecture-enter 700ms cubic-bezier(.2,.7,.2,1) both;
        }

        .architecture-data-particle {
          animation: architecture-data-flow 3.8s ease-in-out infinite;
        }

        .architecture-status-dot {
          animation: architecture-status 3s ease-in-out infinite;
        }

        .architecture-module {
          transition:
            border-color 220ms ease,
            background-color 220ms ease,
            transform 220ms ease;
        }

        .architecture-module:hover {
          border-color: color-mix(in srgb, var(--module-accent) 35%, transparent);
          background-color: #0b1929;
          transform: translateY(-2px);
        }

        .architecture-layer {
          transition: border-color 220ms ease, background-color 220ms ease;
        }

        .architecture-layer:hover {
          border-color: var(--layer-accent);
          background-color: #102033;
        }

        @media (prefers-reduced-motion: reduce) {
          .architecture-enter,
          .architecture-data-particle,
          .architecture-status-dot {
            animation: none !important;
          }

          .architecture-module,
          .architecture-layer {
            transition: none !important;
          }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#050B14] shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
        {/* Background lighting and technical grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 38%, rgba(40,217,160,0.075), transparent 55%), radial-gradient(ellipse at 90% 8%, rgba(96,165,250,0.07), transparent 36%)',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.55) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage:
              'linear-gradient(to bottom, black, transparent 92%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black, transparent 92%)',
          }}
        />

        {/* System header */}
        <header
          className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5 sm:py-[18px] ${
            rtl ? 'flex-row-reverse' : ''
          }`}
        >
          <div className={`flex min-w-0 items-center gap-3 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#28D9A0]/20 bg-[#28D9A0]/[0.07] text-[#28D9A0]">
              <Boxes size={19} strokeWidth={1.6} />
            </span>

            <span className="min-w-0">
              <span className={`block text-[10px] font-semibold text-slate-100 sm:text-[11px] ${rtl ? '' : 'tracking-[0.12em]'}`}>
                {copy.systemMap}
              </span>
              <span className="mt-1 block text-[10px] text-slate-500">
                {copy.layeredArchitecture}
              </span>
            </span>
          </div>

          <div className={`flex items-center gap-2 rounded-full border border-[#28D9A0]/15 bg-[#28D9A0]/[0.045] px-3 py-2 ${rtl ? 'flex-row-reverse' : ''}`}>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="architecture-status-dot absolute inset-0 rounded-full bg-[#28D9A0]" />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-[#28D9A0]" />
            </span>
            <span className="text-[8px] font-medium text-slate-400 sm:text-[9px]">
              {copy.modularConnected}
            </span>
          </div>
        </header>

        {/* Diagram content */}
        <div className="relative z-[1] px-3 py-5 sm:px-5 sm:py-6">
          <div className={`mb-3 flex items-center justify-between gap-3 px-1 ${rtl ? 'flex-row-reverse' : ''}`}>
            <span className={`text-[9px] font-semibold text-slate-400 ${rtl ? '' : 'tracking-[0.12em]'}`}>
              {copy.moduleHeading}
            </span>
            <span className="font-mono text-[8px] text-slate-600">
              {copy.moduleCount}
            </span>
          </div>

          <p className={`mb-4 px-1 text-[10px] leading-relaxed text-slate-500 ${rtl ? 'text-right' : ''}`}>
            {copy.moduleDescription}
          </p>

          {/* Supporting modules */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {modules.map((module, index) => (
              <ArchitectureModule
                key={module.code}
                icon={module.icon}
                label={copy.modules[index]}
                code={module.code}
                color={module.color}
                rtl={rtl}
              />
            ))}
          </div>

          {/* Connection spine */}
          <div className="relative flex h-12 items-center justify-center" aria-hidden="true">
            <div className="h-full w-px bg-gradient-to-b from-[#28D9A0]/40 via-[#60A5FA]/50 to-[#28D9A0]/40" />
            <span className="architecture-data-particle absolute top-2 h-1.5 w-1.5 rounded-full bg-[#28D9A0] shadow-[0_0_10px_2px_rgba(40,217,160,0.35)]" />
            <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#07101D] text-slate-500">
              <ArrowDown size={12} />
            </span>
          </div>

          {/* Core architecture */}
          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-2.5 sm:p-3.5">
            <div className={`mb-3 flex items-center justify-between gap-3 px-1 ${rtl ? 'flex-row-reverse' : ''}`}>
              <span className={`text-[9px] font-semibold text-slate-300 ${rtl ? '' : 'tracking-[0.12em]'}`}>
                {copy.layerHeading}
              </span>
              <span className="font-mono text-[8px] text-slate-600">
                {copy.layerCount}
              </span>
            </div>

            <div className="space-y-2">
              {copy.layers.map(([label, detail], index) => {
                const layer = layers[index];
                const Icon = layer.icon;

                return (
                  <div
                    key={layer.code}
                    className={`architecture-layer group relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#091422]/90 ${
                      rtl ? 'text-right' : ''
                    }`}
                    style={
                      {
                        '--layer-accent': layer.color,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 start-0 w-[2px]"
                      style={{
                        background: layer.color,
                        opacity: 0.75,
                      }}
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, ${layer.color}0B, transparent 65%)`,
                      }}
                    />

                    <div className={`relative flex min-h-[68px] items-center gap-3 px-3 py-3 sm:min-h-[74px] sm:gap-3.5 sm:px-4 ${rtl ? 'flex-row-reverse' : ''}`}>
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          color: layer.color,
                          borderColor: `${layer.color}30`,
                          background: `${layer.color}0D`,
                        }}
                      >
                        <Icon size={18} strokeWidth={1.65} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className={`block text-[10px] font-semibold text-slate-100 sm:text-[11px] ${rtl ? '' : 'tracking-[0.08em]'}`}>
                          {label}
                        </span>
                        <span className="mt-1.5 block break-words text-[9px] leading-relaxed text-slate-500 sm:text-[10px]">
                          {detail}
                        </span>
                      </span>

                      <span className={`hidden shrink-0 flex-col items-end gap-1.5 sm:flex ${rtl ? 'items-start' : ''}`}>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: layer.color,
                            boxShadow: `0 0 8px ${layer.color}50`,
                          }}
                        />
                        <span
                          dir="ltr"
                          className="font-mono text-[8px] tracking-wider text-slate-600"
                        >
                          {layer.code}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Request / response boundary */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className={`flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.018] px-3 py-2.5 ${rtl ? 'flex-row-reverse' : ''}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
              <span className="text-[9px] text-slate-400">{copy.input}</span>
            </div>
            <div className={`flex items-center justify-end gap-2 rounded-lg border border-white/[0.06] bg-white/[0.018] px-3 py-2.5 ${rtl ? 'flex-row-reverse' : ''}`}>
              <span className="text-[9px] text-slate-400">{copy.output}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#28D9A0]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-black/20 px-4 py-3.5 sm:px-5 ${rtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${rtl ? 'flex-row-reverse' : ''}`}>
            <ShieldCheck size={13} className="shrink-0 text-[#28D9A0]" strokeWidth={1.7} />
            <span className="text-[9px] text-slate-400">
              {copy.modularByDesign}
            </span>
          </div>

          <div className={`flex items-center gap-2.5 font-mono text-[8px] text-slate-600 ${rtl ? 'flex-row-reverse' : ''}`}>
            <span>{copy.web}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{copy.api}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{copy.data}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
