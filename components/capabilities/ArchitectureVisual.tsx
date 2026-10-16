'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  AppWindow,
  Boxes,
  Braces,
  Database,
  Globe2,
  Server,
  ShieldCheck,
} from 'lucide-react';
import type { SiteLanguage } from '@/lib/site-language';

const layers = [
  {
    label: 'PRESENTATION',
    detail: 'Web · Mobile · UI',
    icon: AppWindow,
    color: '#28D9A0',
    width: '88%',
    offset: '0%',
  },
  {
    label: 'APPLICATION',
    detail: 'Logic · Services',
    icon: Braces,
    color: '#60A5FA',
    width: '94%',
    offset: '3%',
  },
  {
    label: 'DATA & SERVICES',
    detail: 'APIs · Storage',
    icon: Database,
    color: '#28D9A0',
    width: '100%',
    offset: '0%',
  },
];

const modules = [
  { label: 'CLIENTS', icon: Globe2, x: '8%', y: '17%' },
  { label: 'API LAYER', icon: Server, x: '68%', y: '10%' },
  { label: 'SECURITY', icon: ShieldCheck, x: '8%', y: '75%' },
  { label: 'DATA FLOW', icon: Activity, x: '69%', y: '77%' },
];

function Signal({
  delay,
  duration,
  color,
  vertical = false,
}: {
  delay: string;
  duration: string;
  color: string;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`architecture-signal ${
        vertical ? 'architecture-signal-vertical' : ''
      } absolute left-0 top-0 h-1 w-1 rounded-full`}
      style={{
        background: color,
        boxShadow: `0 0 8px 2px ${color}90`,
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
}

const architectureCopy = {
  en: {
    ariaLabel: 'Layered software architecture connecting client interfaces, application services, APIs, security, and data',
    systemMap: 'SYSTEM MAP',
    layeredArchitecture: 'Layered architecture',
    modularConnected: 'MODULAR / CONNECTED',
    modules: ['CLIENTS', 'API LAYER', 'SECURITY', 'DATA FLOW'],
    layers: [
      ['PRESENTATION', 'Web · Mobile · UI'],
      ['APPLICATION', 'Logic · Services'],
      ['DATA & SERVICES', 'APIs · Storage'],
    ],
    flowActive: 'FLOW / ACTIVE',
    modularByDesign: 'Modular by design',
  },
  'fa-AF': {
    ariaLabel: 'معماری لایه‌ای نرم‌افزار که رابط‌های مشتری، خدمات برنامه، APIها، امنیت و داده را به‌هم پیوند می‌دهد',
    systemMap: 'نقشه سیستم',
    layeredArchitecture: 'معماری لایه‌ای',
    modularConnected: 'ماژولار / پیوسته',
    modules: ['مشتریان', 'لایه API', 'امنیت', 'جریان داده'],
    layers: [
      ['ارائه', 'وب · موبایل · رابط'],
      ['برنامه', 'منطق · خدمات'],
      ['داده و خدمات', 'APIها · ذخیره‌سازی'],
    ],
    flowActive: 'جریان / فعال',
    modularByDesign: 'ماژولار از پایه',
  },
  ps: {
    ariaLabel: 'د سافټویر پوړیز جوړښت چې د پېرودونکو مخونه، د اپلېکېشن خدمتونه، API ګانې، امنیت او معلومات نښلوي',
    systemMap: 'د سیسټم نقشه',
    layeredArchitecture: 'پوړیز جوړښت',
    modularConnected: 'ماډیولر / تړلی',
    modules: ['پېرودونکي', 'API پوړ', 'امنیت', 'د معلوماتو بهیر'],
    layers: [
      ['وړاندې کول', 'وېب · موبایل · مخ'],
      ['اپلېکېشن', 'منطق · خدمتونه'],
      ['معلومات او خدمتونه', 'API ګانې · زېرمه'],
    ],
    flowActive: 'بهیر / فعال',
    modularByDesign: 'په اصل کې ماډیولر',
  },
} satisfies Record<SiteLanguage, {
  ariaLabel: string;
  systemMap: string;
  layeredArchitecture: string;
  modularConnected: string;
  modules: string[];
  layers: [string, string][];
  flowActive: string;
  modularByDesign: string;
}>;

export default function ArchitectureVisual({ language }: { language: SiteLanguage }) {
  const copy = architectureCopy[language];
  const isRtl = language !== 'en';
  const translatedLayers = layers.map((layer, index) => ({
    ...layer,
    label: copy.layers[index][0],
    detail: copy.layers[index][1],
  }));
  const translatedModules = modules.map((module, index) => ({
    ...module,
    label: copy.modules[index],
  }));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotionPreference = () => {
      setReducedMotion(media.matches);
    };

    updateMotionPreference();
    media.addEventListener('change', updateMotionPreference);

    return () => {
      media.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return (
    <div
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={copy.ariaLabel}
      role="img"
      className="architecture-enter relative mx-auto w-full max-w-[680px]"
    >
      <style>{`
        @keyframes architectureEnter {
          from {
            opacity: 0;
            transform: translate3d(26px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes architectureSignalHorizontal {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes architectureSignalVertical {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes architectureAmbient {
          0%, 100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes architecturePulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.35);
          }
        }

        .architecture-enter {
          animation: architectureEnter 850ms cubic-bezier(0.2, 0.7, 0.2, 1)
            both;
        }

        .architecture-signal {
          animation-name: architectureSignalHorizontal;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .architecture-signal-vertical {
          animation-name: architectureSignalVertical;
        }

        .architecture-ambient {
          animation: architectureAmbient 8s ease-in-out infinite;
        }

        .architecture-status-pulse {
          animation: architecturePulse 3s ease-in-out infinite;
        }

        .architecture-layer {
          transition:
            transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1),
            border-color 320ms ease,
            box-shadow 320ms ease,
            opacity 320ms ease,
            filter 320ms ease;
          transform-origin: center;
        }

        .architecture-layer:hover,
        .architecture-layer:focus-visible {
          transform: translate3d(0, -5px, 0) scale(1.015);
          z-index: 30;
        }

        .architecture-module {
          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background-color 250ms ease,
            box-shadow 250ms ease;
        }

        .architecture-module:hover {
          transform: translate3d(0, -3px, 0);
          box-shadow: 0 7px 22px rgba(0, 0, 0, 0.22);
        }

        @media (hover: hover) and (pointer: fine) {
          .architecture-canvas:has(.architecture-layer:hover)
            .architecture-layer:not(:hover) {
            opacity: 0.67;
            filter: saturate(0.78);
          }

          .architecture-canvas:has(.architecture-module:hover)
            .architecture-module:not(:hover) {
            opacity: 0.68;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .architecture-enter,
          .architecture-signal,
          .architecture-ambient,
          .architecture-status-pulse {
            animation: none !important;
          }

          .architecture-layer,
          .architecture-module {
            transition: none !important;
          }
        }
      `}</style>

      {/* Main visual frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07101D]/90 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-500 hover:border-[#28D9A0]/20 hover:shadow-[0_30px_100px_rgba(0,0,0,0.4),0_0_35px_rgba(40,217,160,0.035)]">
        {/* Ambient light */}
        <div
          aria-hidden="true"
          className="architecture-ambient pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 43%, rgba(40,217,160,0.09), transparent 52%), radial-gradient(ellipse at 80% 15%, rgba(96,165,250,0.07), transparent 42%)',
          }}
        />

        {/* Header */}
        <div className={`relative z-10 flex items-center justify-between border-b border-white/[0.08] px-4 py-3.5 sm:px-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#28D9A0]/20 bg-[#28D9A0]/[0.08] text-[#28D9A0] transition-colors duration-300 hover:border-[#28D9A0]/50 hover:bg-[#28D9A0]/[0.14]">
              <Boxes size={14} />
            </div>

            <div>
              <p className={`text-[10px] font-semibold ${isRtl ? '' : 'tracking-[0.13em]'} text-slate-200`}>
                {copy.systemMap}
              </p>
              <p className="mt-0.5 text-[9px] text-slate-500">
                {copy.layeredArchitecture}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 transition-colors duration-300 hover:border-[#28D9A0]/20 hover:bg-[#28D9A0]/[0.04] ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="architecture-status-pulse absolute inset-0 rounded-full bg-[#28D9A0]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#28D9A0]" />
            </span>

            <span className="font-mono text-[9px] tracking-wide text-slate-400">
              {copy.modularConnected}
            </span>
          </div>
        </div>

        {/* Diagram canvas */}
        <div className="architecture-canvas relative min-h-[390px] overflow-hidden px-3 py-5 sm:min-h-[445px] sm:px-5 sm:py-7">
          {/* Fine technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.45) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 82%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 82%)',
            }}
          />

          {/* Connector network */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 600 420"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="arch-green-line">
                <stop offset="0%" stopColor="#28D9A0" stopOpacity="0.06" />
                <stop offset="50%" stopColor="#28D9A0" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#28D9A0" stopOpacity="0.06" />
              </linearGradient>

              <linearGradient id="arch-blue-line">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <path
              d="M 95 95 L 150 95 L 180 145"
              stroke="url(#arch-green-line)"
              strokeWidth="1.2"
            />
            <path
              d="M 510 70 L 460 70 L 425 145"
              stroke="url(#arch-blue-line)"
              strokeWidth="1.2"
            />
            <path
              d="M 95 330 L 145 330 L 180 280"
              stroke="url(#arch-blue-line)"
              strokeWidth="1.2"
            />
            <path
              d="M 510 335 L 460 335 L 425 280"
              stroke="url(#arch-green-line)"
              strokeWidth="1.2"
            />

            <path
              d="M 300 172 L 300 196"
              stroke="#28D9A0"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />
            <path
              d="M 300 246 L 300 270"
              stroke="#60A5FA"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />

            {[
              [95, 95],
              [180, 145],
              [510, 70],
              [425, 145],
              [95, 330],
              [180, 280],
              [510, 335],
              [425, 280],
              [300, 172],
              [300, 196],
              [300, 246],
              [300, 270],
            ].map(([cx, cy], index) => (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="2.3"
                fill={index % 2 === 0 ? '#28D9A0' : '#60A5FA'}
                fillOpacity="0.85"
              />
            ))}
          </svg>

          {/* Floating connection modules */}
          {translatedModules.map((module, index) => {
            const Icon = module.icon;
            const blue = index === 1 || index === 2;
            const color = blue ? '#60A5FA' : '#28D9A0';
            const isHovered = hoveredModule === module.label;

            return (
              <div
                key={module.label}
                className="absolute z-10"
                style={{
                  left: isRtl ? undefined : module.x,
                  right: isRtl ? module.x : undefined,
                  top: module.y,
                }}
              >
                <div
                  onMouseEnter={() => setHoveredModule(module.label)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`architecture-module flex cursor-default items-center gap-1.5 rounded-md border px-2 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}
                  style={{
                    borderColor: isHovered ? `${color}80` : `${color}30`,
                    background: isHovered
                      ? `${color}12`
                      : 'rgba(7,16,29,0.92)',
                    color,
                    boxShadow: isHovered
                      ? `0 0 20px ${color}12`
                      : 'none',
                  }}
                >
                  <Icon size={11} />

                  <span className="whitespace-nowrap font-mono text-[8px] tracking-[0.08em] sm:text-[9px]">
                    {module.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="ml-0.5 h-1 w-1 rounded-full transition-opacity duration-300"
                    style={{
                      background: color,
                      opacity: isHovered ? 1 : 0.4,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Architecture layers */}
          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 px-5 sm:gap-3 sm:px-12">
            {translatedLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;
              const isOtherActive =
                activeLayer !== null && activeLayer !== index;

              return (
                <div
                  key={layer.label}
                  className="architecture-layer relative"
                  style={{
                    width: layer.width,
                    marginLeft: isRtl ? undefined : layer.offset,
                    marginRight: isRtl ? layer.offset : undefined,
                    opacity: isOtherActive ? 0.72 : 1,
                  }}
                  onMouseEnter={() => setActiveLayer(index)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  {/* Short connector */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-2 left-1/2 h-2 w-px transition-opacity duration-300"
                    style={{
                      background: `${layer.color}75`,
                      opacity: index === 0 ? 0 : isActive ? 1 : 0.65,
                    }}
                  />

                  <div
                    className="relative overflow-hidden rounded-lg border backdrop-blur-md"
                    style={{
                      borderColor: isActive
                        ? `${layer.color}95`
                        : `${layer.color}35`,
                      background: isActive
                        ? 'linear-gradient(110deg, rgba(18,37,53,0.99), rgba(10,24,39,0.99))'
                        : 'linear-gradient(110deg, rgba(13,27,43,0.97), rgba(9,18,32,0.94))',
                      boxShadow: isActive
                        ? `0 16px 42px rgba(0,0,0,0.32), 0 0 28px ${layer.color}13, inset 0 1px 0 ${layer.color}35`
                        : `0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 ${layer.color}12`,
                    }}
                  >
                    {/* Top-edge highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-[12%] top-0 h-px transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)`,
                        opacity: isActive ? 1 : 0.55,
                      }}
                    />

                    {/* Subtle hover wash */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(100deg, ${layer.color}09, transparent 60%)`,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    <div className={`relative flex min-h-[66px] items-center gap-3 px-3 py-3 sm:min-h-[74px] sm:gap-4 sm:px-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-[background-color,border-color,box-shadow] duration-300 sm:h-10 sm:w-10"
                        style={{
                          borderColor: isActive
                            ? `${layer.color}75`
                            : `${layer.color}30`,
                          background: isActive
                            ? `${layer.color}19`
                            : `${layer.color}0D`,
                          color: layer.color,
                          boxShadow: isActive
                            ? `0 0 18px ${layer.color}15`
                            : 'none',
                        }}
                      >
                        <Icon size={17} strokeWidth={1.6} />
                      </div>

                      <div className={`min-w-0 flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <p className={`text-[10px] font-semibold ${isRtl ? '' : 'tracking-[0.13em]'} text-slate-100 sm:text-[11px]`}>
                          {layer.label}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-500 transition-colors duration-300 sm:text-[10px]">
                          {layer.detail}
                        </p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                        <span
                          className="h-1 w-1 rounded-full transition-shadow duration-300"
                          style={{
                            background: layer.color,
                            boxShadow: isActive
                              ? `0 0 8px ${layer.color}`
                              : 'none',
                          }}
                        />

                        <span className="font-mono text-[8px] tracking-wider text-slate-500">
                          L0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Restrained data signals */}
          {!reducedMotion && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[26%] top-[34%] h-px w-[36%] overflow-hidden"
              >
                <Signal
                  delay="-2s"
                  duration="8s"
                  color="#28D9A0"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[49%] top-[38%] h-[26%] w-px overflow-hidden"
              >
                <Signal
                  delay="-5s"
                  duration="10s"
                  color="#60A5FA"
                  vertical
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[38%] top-[67%] h-px w-[32%] overflow-hidden"
              >
                <Signal
                  delay="-4s"
                  duration="9s"
                  color="#60A5FA"
                />
              </div>
            </>
          )}

          {/* Coordinate labels */}
          <div className="absolute bottom-3 left-4 font-mono text-[8px] tracking-widest text-slate-700 sm:bottom-4 sm:left-5">
            NODE / 01
          </div>

          <div className={`absolute bottom-3 right-4 font-mono text-[8px] ${isRtl ? '' : 'tracking-widest'} text-slate-700 sm:bottom-4 sm:right-5`}>
            {copy.flowActive}
          </div>
        </div>

        {/* Footer metadata */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-black/10 px-4 py-3.5 sm:px-5">
          <div className={`flex items-center gap-2 text-[10px] text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="h-1 w-1 rounded-full bg-[#28D9A0]" />
            <span>{copy.modularByDesign}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[9px] tracking-wider text-slate-600">
            <span>WEB</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>API</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>DATA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
