'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Wallet,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
  Lock,
  Smartphone,
  Headphones,
  ChevronRight,
  X,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Star,
  CreditCard as CreditCardIcon,
  Activity,
  Mail,
  GitBranch,
  Briefcase,
  Heart,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const DEFAULT_PALETTE = [
  { css: '#eab308', rgb: '234,179,8' },
  { css: '#3b82f6', rgb: '59,130,246' },
  { css: '#10b981', rgb: '16,185,129' },
  { css: '#a855f7', rgb: '168,85,247' },
];

const BrandColors = {
  primary: { rgb: '219,168,0' },
  success: { rgb: '16,185,129' },
};

const StatCardPalette = DEFAULT_PALETTE;

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const Button = ({ variant = 'default', size = 'md', className = '', ...props }: any) => {
  const variantMap: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    ghost: 'bg-transparent border border-border text-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-border',
  };
  const sizeMap: Record<string, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50',
        variantMap[variant] ?? variantMap.default,
        sizeMap[size] ?? sizeMap.md,
        className,
      )}
    />
  );
};

const Badge = ({ variant = 'default', className = '', ...props }: any) => {
  const variantMap: Record<string, string> = {
    default: 'bg-primary/10 border border-primary/20 text-primary',
    secondary: 'bg-muted/10 border border-border text-foreground',
  };

  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        variantMap[variant] ?? variantMap.default,
        className,
      )}
    />
  );
};

const CreditCard = ({ className = '', children, ...props }: any) => (
  <div className={cn('relative rounded-xl', className)} {...props}>
    {children}
  </div>
);
const CreditCardFlipper = ({ className = '', children, ...props }: any) => (
  <div className={cn('relative', className)} {...props}>
    {children}
  </div>
);
const CreditCardFront = ({ className = '', children, ...props }: any) => (
  <div className={cn('rounded-xl', className)} {...props}>
    {children}
  </div>
);
const CreditCardBack = ({ className = '', children, ...props }: any) => (
  <div className={cn('rounded-xl', className)} {...props}>
    {children}
  </div>
);
const CreditCardChip = ({ className = '', ...props }: any) => (
  <div className={cn('rounded-[4px] border border-white/10', className)} {...props} />
);
const CreditCardContactless = ({ className = '', ...props }: any) => (
  <div className={cn('flex items-center gap-1', className)} {...props}>
    <span className="block h-1.5 w-1.5 rounded-full bg-white/80" />
    <span className="block h-1.5 w-1.5 rounded-full bg-white/60" />
    <span className="block h-1.5 w-1.5 rounded-full bg-white/40" />
  </div>
);
const CreditCardNumber = ({ className = '', children, ...props }: any) => (
  <div className={cn('font-mono tracking-[0.24em]', className)} {...props}>
    {children}
  </div>
);
const CreditCardName = ({ className = '', children, ...props }: any) => (
  <div className={cn('text-sm font-medium', className)} {...props}>
    {children}
  </div>
);
const CreditCardExpiry = ({ className = '', children, ...props }: any) => (
  <div className={cn('font-mono text-xs', className)} {...props}>
    {children}
  </div>
);
const CreditCardCvv = ({ className = '', children, ...props }: any) => (
  <div className={cn('font-mono', className)} {...props}>
    {children}
  </div>
);
const CreditCardLogo = ({ className = '', children, ...props }: any) => (
  <div className={cn('font-black tracking-tight', className)} {...props}>
    {children}
  </div>
);
const CreditCardServiceProvider = ({ type, format, className = '', ...props }: any) => (
  <div className={cn('font-bold tracking-wider uppercase', className)} {...props}>
    {type}
  </div>
);
const CreditCardMagStripe = ({ className = '', ...props }: any) => (
  <div className={cn('h-8 w-full rounded-md bg-white/5', className)} {...props} />
);
const CreditCardSignature = ({ className = '', children, ...props }: any) => (
  <div className={cn('font-mono italic', className)} {...props}>
    {children}
  </div>
);

const services = [
  {
    number: '01',
    title: 'Custom software',
    description:
      'Bespoke digital products and internal systems designed around your workflows, users, and operational realities.',
  },
  {
    number: '02',
    title: 'Web & mobile',
    description:
      'Responsive web experiences and polished apps that help teams serve customers, manage work, and scale with confidence.',
  },
  {
    number: '03',
    title: 'Automation & AI',
    description:
      'Practical AI and process automation that reduces manual effort while improving speed, consistency, and insight.',
  },
  {
    number: '04',
    title: 'Cloud & data',
    description:
      'Reliable foundations for deployments, data pipelines, analytics, and product growth without unnecessary complexity.',
  },
];

const process = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We clarify the business problem, goals, and user needs before design or build starts.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We translate the challenge into a clear product direction, experience, and technical plan.',
  },
  {
    number: '03',
    title: 'Deliver',
    description:
      'We build, refine, and support the solution with transparent communication and practical delivery.',
  },
];

/* ─────────────────────────────────────────────────────────────
   useInView
───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────
   TetherHub themed credit card
    — dark emerald gradient, CSS hover flip
───────────────────────────────────────────────────────────── */
export function TetherHubCard() {
  return (
    <div
      /* 
        🚀 Fixed the Y-Shifting Bug: Converted the card container into a balanced, 
        flex-centered grid box. This ensures the card flips smoothly along a 
        stable center transform axis without shifting downward.
      */
      className="relative flex items-center justify-center transition-all duration-300 select-none overflow-visible"
      style={{
        width: '420px',
        height: '340px',
        filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(219,168,0,0.06))',
      }}
    >
      {/* Dynamic Background Glow Halo Overlay */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 300,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(219,168,0,0.08) 0%, transparent 70%)',
          filter: 'blur(35px)',
          zIndex: 0,
        }}
      />

      {/* Balanced, Center-Aligned Flipper Layout Layer */}
      <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu overflow-visible">
        <CreditCard>
          <CreditCardFlipper>
            
            {/* ════════════════════════════════════════════════════
                CREDIT CARD FRONT FACE VIEWPORT
            ════════════════════════════════════════════════════ */}
            <CreditCardFront
              className="relative overflow-hidden border bg-card/90 backdrop-blur-xl border-border/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              style={{
                background: 'linear-gradient(135deg, #1E2329 0%, #15191E 45%, #0B0E11 100%)',
              }}
            >
              {/* Glossy overlay card body reflections */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: `
                    radial-gradient(ellipse at 20% 15%, rgba(219,168,0,0.08) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 80%, rgba(255,255,255,0.01) 0%, transparent 45%),
                    linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%)
                  `,
                }}
              />

              {/* Central Technical Circuit Grid Traces */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
                viewBox="0 0 380 240"
                fill="none"
              >
                <path d="M0 180 Q 95 160 190 180 Q 285 200 380 170" stroke="var(--primary)" strokeWidth="1" />
                <path d="M0 120 Q 120 100 240 130 Q 310 145 380 120" stroke="var(--success)" strokeWidth="0.8" />
                <path d="M320 0 L320 80 Q 320 100 340 100 L380 100" stroke="var(--primary)" strokeWidth="0.8" />
                <circle cx="320" cy="80" r="3" fill="var(--primary)" opacity="0.4" />
                <circle cx="190" cy="180" r="2" fill="var(--success)" opacity="0.4" />
              </svg>

              {/* Brand identifier label headers */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border bg-primary/10 border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">AP</span>
                  </div>
                  <span className="text-foreground/50 text-[10px] font-bold tracking-wider uppercase">
                    AtlasPay
                  </span>
                </div>
                <CreditCardServiceProvider type="Mastercard" />
              </div>

              {/* Interactive microchip asset vectors */}
              <div className="flex items-center gap-4 relative z-10 my-4">
                <CreditCardChip />
                <CreditCardContactless />
              </div>

              {/* Account Card Numbers Mask display block */}
              <CreditCardNumber>
                <span className="text-foreground/30">••••</span>
                <span className="mx-2 text-foreground/30">••••</span>
                <span className="mx-2 text-foreground/40">••••</span>
                <span className="ml-2 text-foreground/90 font-bold">4291</span>
              </CreditCardNumber>

              {/* Bottom Row Information Metas */}
              <div className="flex items-end justify-between relative z-10 mt-2">
                <CreditCardName>AtlasPay User</CreditCardName>
                <CreditCardExpiry>12/29</CreditCardExpiry>
              </div>

              <div className="absolute bottom-2 right-4 text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">
                hover to flip
              </div>
            </CreditCardFront>

            {/* ════════════════════════════════════════════════════
                CREDIT CARD REVERSE FACE VIEWPORT
            ════════════════════════════════════════════════════ */}
            <CreditCardBack
              className="relative overflow-hidden border bg-card/90 backdrop-blur-xl border-border/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              style={{
                background: 'linear-gradient(135deg, #1E2329 0%, #15191E 40%, #0B0E11 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 40%)',
                }}
              />

              <CreditCardMagStripe />

              <CreditCardSignature className="mx-6 mt-4 bg-muted/60 border border-border/20 rounded px-3 flex items-center justify-between">
                <span className="text-muted-foreground/30 text-[9px] italic font-bold tracking-wider">
                  Authorized Signature
                </span>
              </CreditCardSignature>

              <div className="flex items-center gap-4 mx-6 mt-3 relative z-10">
                <CreditCardExpiry>12/29</CreditCardExpiry>
                <div className="h-6 w-[1.5px] bg-border/40" />
                <CreditCardCvv>
                  <span className="font-mono tracking-[0.3em] text-foreground/60 text-xs font-bold">•••</span>
                </CreditCardCvv>
              </div>

              <div className="mx-6 mt-auto mb-4 relative z-10">
                <CreditCardNumber className="text-muted-foreground/30 text-xs font-semibold">
                  •••• •••• •••• 4291
                </CreditCardNumber>
              </div>

              <div className="mx-6 flex items-center justify-between mb-1 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded border bg-primary/10 border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-[8px]">AP</span>
                  </div>
                  <span className="text-muted-foreground/40 text-[9px] font-bold tracking-wide">AtlasPay</span>
                </div>
                <CreditCardServiceProvider type="Mastercard" format="icon" />
              </div>
            </CreditCardBack>

          </CreditCardFlipper>
        </CreditCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DotGrid canvas
───────────────────────────────────────────────────────────── */
export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ─── Whitelabel Reseller Token Extraction ─────────────────────────
    // Dynamically captures RGB profiles from the document container context 
    // Defaults safely to your custom Gold Ochre (#dba800) [r: 219, g: 168, b: 0]
    let accentRGB = { r: 219, g: 168, b: 0 };
    
    try {
      const computedColor = window.getComputedStyle(document.documentElement)
        .getPropertyValue('--primary').trim();
        
      if (computedColor.startsWith('#')) {
        const hex = computedColor.replace('#', '');
        const bigInt = parseInt(hex, 16);
        accentRGB = {
          r: (bigInt >> 16) & 255,
          g: (bigInt >> 8) & 255,
          b: bigInt & 255,
        };
      }
    } catch {
      // Fallback defaults safely handled if styles are out of structural initialization phase bounds
    }

    const SPACING = 38;
    const DOT_R = 1.1;
    const MAX_DIST = 160;

    let W = 0, H = 0;
    let dots: { x: number; y: number }[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      dots = [];
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) dots.push({ x: c * SPACING, y: r * SPACING });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      
      // Get the correct base color token opacity values based on html layout status flags (.dark check)
      const isDarkMode = document.documentElement.classList.contains('dark');
      const baseColor = isDarkMode ? '234, 236, 239' : '24, 26, 32'; // High-contrast base matrix tracks

      for (const d of dots) {
        const dist = Math.hypot(d.x - mx, d.y - my);
        const t = Math.max(0, 1 - dist / MAX_DIST);
        const alpha = 0.05 + t * 0.55; // Refined baseline contrast visibility constraints
        const radius = DOT_R + t * 1.6;
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        
        ctx.fillStyle = t > 0.05
          ? `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${alpha})`
          : `rgba(${baseColor}, ${alpha * 0.4})`;
          
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    draw();
    
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0" />
  );
}

/* ─────────────────────────────────────────────────────────────
   PulseRings Component
───────────────────────────────────────────────────────────── */
export function PulseRings({ ready }: { ready: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary/10 transition-opacity duration-1000"
          style={{
            width: `${i * 160}px`,
            height: `${i * 160}px`,
            opacity: ready ? 1 : 0,
            /* Leverages standard keyframes linked through global styling files inside index.css */
            animation: ready ? `pulseRing ${2.5 + i * 0.6}s ease-out ${i * 0.4}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  );
}



/* ─────────────────────────────────────────────────────────────
   FloatingOrbs
───────────────────────────────────────────────────────────── */
export function FloatingOrbs({ ready }: { ready: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-Right Branding Hue Ambient Glow — fully dynamic tracking of your primary Gold Ochre theme color */}
      <div
        className="absolute rounded-full transition-opacity duration-[2000ms] ease-in-out"
        style={{
          width: 600,
          height: 600,
          top: '5%',
          right: '-10%',
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          opacity: ready ? 0.05 : 0,
          filter: 'blur(50px)',
          animation: ready ? 'orbFloat1 12s ease-in-out infinite' : 'none',
        }}
      />
      {/* Bottom-Left Blue Layout Accent Ambient Glow */}
      <div
        className="absolute rounded-full transition-opacity duration-[2000ms] ease-in-out"
        style={{
          width: 400,
          height: 400,
          bottom: '10%',
          left: '-5%',
          background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          opacity: ready ? 0.04 : 0,
          filter: 'blur(60px)',
          animation: ready ? 'orbFloat2 15s ease-in-out infinite' : 'none',
          transitionDelay: '0.5s',
        }}
      />
      {/* Central Success Signal Accent Ambient Glow */}
      <div
        className="absolute rounded-full transition-opacity duration-[2000ms] ease-in-out"
        style={{
          width: 300,
          height: 300,
          top: '20%',
          left: '35%',
          background: 'radial-gradient(circle, var(--success) 0%, transparent 70%)',
          opacity: ready ? 0.04 : 0,
          filter: 'blur(50px)',
          animation: ready ? 'orbFloat3 10s ease-in-out infinite' : 'none',
          transitionDelay: '0.8s',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Ticker Strip Configuration Metas
───────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { symbol: 'BTC', price: '$67,240', change: '+2.4%', positive: true, color: '#F7931A' },
  { symbol: 'ETH', price: '$3,521', change: '+1.8%', positive: true, color: '#627EEA' },
  { symbol: 'USDT', price: '$1.00', change: '0.00%', positive: true, color: '#26A17B' },
  { symbol: 'BNB', price: '$612', change: '-0.3%', positive: false, color: '#F3BA2F' },
  { symbol: 'SOL', price: '$178', change: '+5.1%', positive: true, color: '#9945FF' },
  { symbol: 'AFN', price: '؋۱.12', change: '+0.8%', positive: true, color: 'var(--success)' }, // Tied to your theme token variables
];

/* ─────────────────────────────────────────────────────────────
   TickerStrip Component
───────────────────────────────────────────────────────────── */
export function TickerStrip({ ready }: { ready: boolean }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden py-3 border-y border-border/40 backdrop-blur-md bg-card/30 transition-all duration-1000 z-10',
        ready ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* Smooth Side-Gradient Masks to fade out the rolling ticker items nicely */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
      />
      
      {/* Endless Horizontal Marquee Slider Container */}
      <div
        className="flex items-center gap-10 whitespace-nowrap"
        style={{ animation: 'tickerScroll 25s linear infinite' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-xs select-none">
            {/* Dynamic Asset Circle Badge */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border border-current/10"
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              {item.symbol.charAt(0)}
            </div>
            
            <span className="text-muted-foreground font-semibold">{item.symbol}</span>
            <span className="text-foreground font-mono font-bold tracking-tight">{item.price}</span>
            <span
              className={cn('font-bold font-mono', item.positive ? 'text-success' : 'text-destructive')}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   StatPill
───────────────────────────────────────────────────────────── */
function StatPill({
  children,
  delay = 0,
  ready,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  ready: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'absolute flex items-center gap-2 px-3 py-2 rounded-2xl',
        'bg-zinc-900/85 border border-zinc-700/50 backdrop-blur-xl',
        'shadow-2xl shadow-black/50 text-xs font-medium text-zinc-200',
        'transition-all duration-700 ease-out',
        ready ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-3',
        className,
      )}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Sparkline({ 
  color = 'var(--success)', // Maps directly to #0ECB81 premium green trading systems
  up = true 
}: { 
  color?: string; 
  up?: boolean; 
}) {
  const points = up
    ? '0,20 8,16 16,18 24,12 32,14 40,8 48,10 56,4 64,6'
    : '0,6 8,10 16,8 24,14 32,12 40,18 48,16 56,20 64,18';

  return (
    <svg width="64" height="24" viewBox="0 0 64 24" fill="none" className="overflow-visible">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   SpotlightCard Interface & Component
───────────────────────────────────────────────────────────── */
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  // Linked directly to a clean alpha-channel value matching your soft Gold Ochre theme token
  spotlightColor = 'rgba(219, 168, 0, 0.08)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      /* Completely synchronized with our index.css design schema properties */
      className={cn(
        'group relative rounded-lg border border-border/40 bg-card overflow-hidden',
        'transition-all duration-300 hover:border-primary/40',
        'hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5',
        className,
      )}
    >
      {/* Interactive hardware radial spotlight cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────
   Old-style MasterCard (used in section 1 only)
───────────────────────────────────────────────────────────── */
export function HeroCard({ tilt = false, small = false }: { tilt?: boolean; small?: boolean }) {
  return (
    <div
      className={cn(
        'relative select-none',
        small ? 'w-64 h-40' : 'w-80 h-[200px]',
        tilt && 'rotate-6',
      )}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full rounded-lg overflow-hidden border border-border/30 transition-all duration-300"
        style={{
          /* Layered premium card baseline depth configurations mapping cleanly to your dark canvas spec */
          background: 'linear-gradient(135deg, #1E2329 0%, #15191E 45%, #0B0E11 100%)',
          boxShadow: tilt
            ? '0 30px 80px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)'
            : '0 40px 100px rgba(0,0,0,0.55), 0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Ambient surface highlights */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.03) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 85%, rgba(255,255,255,0.01) 0%, transparent 40%)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.01) 100%)',
          }}
        />

        <div
          className={cn(
            'absolute flex items-start justify-between',
            small ? 'top-5 left-5 right-5' : 'top-6 left-6 right-6',
          )}
        >
          {/* ── Dynamic Gold Ochre EMV Hardware Chip ── */}
          <div className="relative">
            <div
              className={cn(
                'rounded-[3px] relative overflow-hidden border border-primary/20',
                small ? 'w-9 h-[26px]' : 'w-11 h-8',
              )}
              style={{
                /* Tied cleanly to a metallic reflection array leveraging your #dba800 setup */
                background: 'linear-gradient(135deg, var(--primary) 0%, #FFF3B3 30%, var(--primary) 65%, #C99600 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px p-[3px]">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background:
                        i === 4
                          ? 'linear-gradient(135deg, #9C7200 0%, var(--primary) 100%)'
                          : 'linear-gradient(135deg, #B58400 0%, #F5CE56 100%)',
                      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
                      borderRadius: i === 4 ? '1px' : '0.5px',
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-black/15" />
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-black/15" />
            </div>
          </div>

          {/* Clean Muted Payments Icon Asset Rings */}
          <div className="flex items-center -space-x-3 opacity-80">
            <div
              className={cn('rounded-full bg-foreground/10 border border-border/40', small ? 'w-6 h-6' : 'w-8 h-8')}
              style={{ background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.15), transparent)' }}
            />
            <div
              className={cn('rounded-full bg-foreground/5 border border-border/30', small ? 'w-6 h-6' : 'w-8 h-8')}
              style={{ background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1), transparent)' }}
            />
          </div>
        </div>

        {/* Secure Account Card String */}
        <div
          className={cn(
            'absolute font-mono text-foreground/80 font-bold',
            small ? 'bottom-[52px] left-5 text-xs' : 'bottom-[60px] left-6 text-sm',
          )}
          style={{
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            letterSpacing: '0.24em',
          }}
        >
          <span className="opacity-40">&bull;&bull;&bull;&bull;</span>
          <span className="mx-2 opacity-40">&bull;&bull;&bull;&bull;</span>
          <span className="mx-2 opacity-40">&bull;&bull;&bull;&bull;</span>
          <span className="ml-2 opacity-90">4291</span>
        </div>

        {/* Bottom Details Parameters Row */}
        <div
          className={cn(
            'absolute flex items-end justify-between',
            small ? 'bottom-4 left-5 right-5' : 'bottom-5 left-6 right-6',
          )}
        >
          <div>
            <p
              className={cn(
                'uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5 font-bold',
                small ? 'text-[7px]' : 'text-[8px]',
              )}
            >
              Card Holder
            </p>
            <p
              className={cn(
                'uppercase tracking-widest text-foreground/90 font-medium',
                small ? 'text-[9px]' : 'text-[11px]',
              )}
              style={{ letterSpacing: '0.12em' }}
            >
              AtlasPay User
            </p>
          </div>
          <div className="text-right">
            <p
              className={cn(
                'uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5 font-bold',
                small ? 'text-[7px]' : 'text-[8px]',
              )}
            >
              Expires
            </p>
            <p
              className={cn('text-foreground/90 font-mono font-bold', small ? 'text-[9px]' : 'text-[11px]')}
            >
              12/29
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-xl pointer-events-none bg-gradient-to-t from-white/[0.015] to-transparent" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FloatingBadge Component
───────────────────────────────────────────────────────────── */
export function FloatingBadge({
  className,
  children,
  delay = 0,
  inView,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        'absolute px-3 py-1.5 rounded-md border border-border/40',
        'bg-card/95 backdrop-blur-md text-xs font-semibold text-foreground shadow-2xl shadow-black/40',
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2',
        className,
      )}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
/* ══════════════════════════════════════════════════════════
   Sparkline chart per coin  (mini area chart)
══════════════════════════════════════════════════════════ */
export function MiniChart({ color, up, points }: { color: string; up: boolean; points: string }) {
  const id = `grad-${color.replace('#', '')}`;
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none" className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Area Gradient Fill Underlay */}
      <path
        d={`M${points
          .split(' ')
          .map((p, i, arr) => {
            const [x, y] = p.split(',');
            if (i === 0) return `${x},${y}`;
            if (i === arr.length - 1)
              return `${x},${y} L${x},32 L${points.split(' ')[0].split(',')[0]},32 Z`;
            return `${x},${y}`;
          })
          .join(' L')}`}
        fill={`url(#${id})`}
        opacity="0.5"
      />
      
      {/* Main Trend Line Trace */}
      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Real-time End Vector Pin Dot */}
      {(() => {
        const last = points.trim().split(' ').pop();
        if (!last) return null;
        const [lx, ly] = last.split(',');
        return <circle cx={lx} cy={ly} r="2.5" fill={color} />;
      })()}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   TerminalCoinRow Interface & Component
───────────────────────────────────────────────────────────── */
interface TerminalCoinRowProps {
  rank: number;
  symbol: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  price: string;
  change: string;
  positive: boolean;
  volume: string;
  chartPoints: string;
  delay: number;
  inView: boolean;
}

export function TerminalCoinRow({
  rank,
  symbol,
  name,
  color,
  bgColor,
  icon,
  price,
  change,
  positive,
  volume,
  chartPoints,
  delay,
  inView,
}: TerminalCoinRowProps) {
  const [hovered, setHovered] = useState(false);

  // Fallback defaults mapping to unified crypto indicators
  const trendColor = positive ? 'var(--success)' : 'var(--destructive)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer border',
        'backdrop-blur-md bg-card/40 border-border/40',
        'transition-all duration-500 ease-out select-none',
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
      )}
      style={{
        transitionDelay: `${delay}ms`,
        borderColor: hovered ? `${color}33` : 'var(--border-transparent, transparent)',
        backgroundColor: hovered ? `${color}0A` : undefined,
        boxShadow: hovered ? `0 8px 32px ${color}12` : 'none',
      }}
    >
      {/* Structural Table Row Rank Indicator */}
      <span className="text-[10px] font-mono font-bold w-4 text-center flex-shrink-0 text-muted-foreground/30">
        {rank}
      </span>

      {/* Asset Core Visual Badge */}
      <div
        className="w-9 h-9 rounded-full border border-border/10 flex items-center justify-center text-sm font-black flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: bgColor,
          color,
          boxShadow: hovered ? `0 0 16px ${color}35` : 'none',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {icon}
      </div>

      {/* Asset Text Information Block */}
      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm font-bold leading-tight">{symbol}</p>
        <p className="text-muted-foreground/60 text-[10px] truncate mt-0.5 font-medium">{name}</p>
      </div>

      {/* Responsive Sparkline Trend SVG Chart */}
      <div className="hidden sm:block flex-shrink-0">
        <MiniChart color={trendColor} up={positive} points={chartPoints} />
      </div>

      {/* Valuation Pricing Metadata Column */}
      <div className="text-right flex-shrink-0 min-w-[72px]">
        <p className="text-foreground text-xs font-mono font-bold leading-tight">${price}</p>
        <p className={cn("text-[10px] font-bold mt-0.5", positive ? "text-success" : "text-destructive")}>
          {change}
        </p>
      </div>

      {/* Volumetric Trading Capacity Parameter */}
      <div className="hidden lg:flex flex-col items-end flex-shrink-0 min-w-[56px]">
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider font-bold">Vol</span>
        <span className="text-muted-foreground text-[10px] font-mono font-semibold mt-0.5">{volume}</span>
      </div>

      {/* Networking Live Sync Pulse Ring Tracer */}
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 relative">
        <span
          className={cn("absolute inset-0 rounded-full animate-ping opacity-35")}
          style={{
            backgroundColor: trendColor,
            animationDuration: `${1.5 + rank * 0.3}s`,
          }}
        />
        <span
          className="relative block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: trendColor }}
        />
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════
   Order book mini panel
══════════════════════════════════════════════════════════ */
export function OrderBookMini({ inView }: { inView: boolean }) {
  const bids = [
    { price: '67,180', size: '0.842', depth: 85 },
    { price: '67,150', size: '1.204', depth: 72 },
    { price: '67,120', size: '0.631', depth: 58 },
    { price: '67,090', size: '2.100', depth: 40 },
    { price: '67,060', size: '0.455', depth: 28 },
  ];
  const asks = [
    { price: '67,300', size: '0.912', depth: 78 },
    { price: '67,330', size: '0.344', depth: 60 },
    { price: '67,360', size: '1.560', depth: 50 },
    { price: '67,390', size: '0.788', depth: 35 },
    { price: '67,420', size: '0.230', depth: 22 },
  ];

  return (
    <div
      className={cn(
        'rounded-lg p-4 transition-all duration-700 ease-out border backdrop-blur-md bg-card/40 border-border/40',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        transitionDelay: '750ms',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Order Book
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground/60">Live</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 mb-2 px-1">
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider font-bold">Price</span>
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider text-center font-bold">Size</span>
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider text-right font-bold">Depth</span>
      </div>

      {/* Asks (red) */}
      <div className="space-y-0.5 mb-1">
        {asks
          .slice()
          .reverse()
          .map((row, i) => (
            <div key={i} className="relative grid grid-cols-3 items-center px-1 py-0.5 rounded">
              <div
                className="absolute right-0 top-0 bottom-0 rounded bg-destructive/10"
                style={{
                  width: `${row.depth}%`,
                }}
              />
              <span className="relative text-[10px] font-mono text-destructive font-bold">{row.price}</span>
              <span className="relative text-[10px] font-mono text-muted-foreground text-center font-medium">
                {row.size}
              </span>
              <span className="relative text-[10px] font-mono text-muted-foreground/50 text-right font-medium">
                {row.depth}%
              </span>
            </div>
          ))}
      </div>

      {/* Spread */}
      <div className="flex items-center justify-center gap-2 py-1.5 border-y border-border/40 my-1">
        <span className="text-[10px] text-muted-foreground/60 font-medium">Spread</span>
        <span className="text-[10px] font-mono font-bold text-foreground">$120.00</span>
        <span className="text-[9px] text-muted-foreground/40 font-bold">0.18%</span>
      </div>

      {/* Bids (green) */}
      <div className="space-y-0.5 mt-1">
        {bids.map((row, i) => (
          <div key={i} className="relative grid grid-cols-3 items-center px-1 py-0.5 rounded">
            <div
              className="absolute right-0 top-0 bottom-0 rounded bg-success/10"
              style={{
                width: `${row.depth}%`,
              }}
            />
            <span className="relative text-[10px] font-mono text-success font-bold">{row.price}</span>
            <span className="relative text-[10px] font-mono text-muted-foreground text-center font-medium">
              {row.size}
            </span>
            <span className="relative text-[10px] font-mono text-muted-foreground/50 text-right font-medium">
              {row.depth}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Portfolio allocation ring
══════════════════════════════════════════════════════════ */
export function AllocationRing({ inView }: { inView: boolean }) {
  const segments = [
    { symbol: 'BTC', pct: 52, color: '#F7931A', value: '$6,490' },
    { symbol: 'EAP', pct: 24, color: '#627EEA', value: '$2,996' },
    { symbol: 'USDT', pct: 14, color: '#26A17B', value: '$1,748' },
    { symbol: 'BNB', pct: 10, color: '#F3BA2F', value: '$1,248' },
  ];

  const R = 42,
    CX = 52,
    CY = 52,
    stroke = 12;
  const circumference = 2 * Math.PI * R;
  let cumPct = 0;

  return (
    <div
      className={cn(
        'rounded-lg p-4 transition-all duration-700 ease-out border backdrop-blur-md bg-card/40 border-border/40',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        transitionDelay: '600ms',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Allocation
        </span>
        <span className="text-[10px] text-muted-foreground/60 font-mono font-bold">$12,482</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut Chart SVG Graphic */}
        <div className="relative flex-shrink-0">
          <svg width="104" height="104" viewBox="0 0 104 104" className="overflow-visible">
            {/* Background Underlay Ring Track */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="var(--border)"
              strokeWidth={stroke}
              className="opacity-40"
            />
            {segments.map((seg, i) => {
              const offset = circumference * (1 - cumPct / 100);
              const dash = circumference * (seg.pct / 100);
              const gap = circumference - dash;
              cumPct += seg.pct;
              return (
                <circle
                  key={i}
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={stroke - 1}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${600 + i * 120}ms`,
                    filter: `drop-shadow(0 0 4px ${seg.color}40)`,
                  }}
                />
              );
            })}
            
            {/* Embedded Center Indicator Content Strings */}
            <text
              x={CX}
              y={CY - 4}
              textAnchor="middle"
              fill="var(--success)"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace"
            >
              +8.4%
            </text>
            <text
              x={CX}
              y={CY + 10}
              textAnchor="middle"
              fill="var(--color-muted-foreground)"
              fontSize="8"
              fontWeight="600"
              className="fill-muted-foreground/50 uppercase tracking-wider"
            >
              24h
            </text>
          </svg>
        </div>

        {/* Informational Parameter Legends Block */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {segments.map((seg, idx) => (
            <div key={seg.symbol} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: seg.color,
                  boxShadow: `0 0 6px ${seg.color}60`,
                }}
              />
              <span className="text-muted-foreground text-[10px] font-bold w-8">{seg.symbol}</span>
              
              {/* Dynamic Percentage Linear Bar Fill track */}
              <div className="flex-1 h-1 rounded-full overflow-hidden bg-border/40">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out opacity-85"
                  style={{
                    width: inView ? `${seg.pct}%` : '0%',
                    backgroundColor: seg.color,
                    transitionDelay: `${700 + idx * 100}ms`,
                  }}
                />
              </div>
              <span className="text-muted-foreground/50 text-[10px] font-mono font-bold w-8 text-right">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   Quick trade widget
══════════════════════════════════════════════════════════ */
export function QuickTradeWidget({ inView }: { inView: boolean }) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('100');

  const isBuy = side === 'buy';

  return (
    <div
      className={cn(
        'rounded-lg p-4 transition-all duration-700 ease-out border backdrop-blur-md bg-card/40 border-border/40',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        transitionDelay: '500ms',
      }}
    >
      {/* Buy/Sell structural toggle layer */}
      <div className="flex rounded-md p-1 mb-4 bg-background/50 border border-border/20">
        {(['buy', 'sell'] as const).map((s) => {
          const isSelected = side === s;
          return (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={cn(
                'flex-1 py-1.5 rounded text-xs font-bold capitalize transition-all duration-200 cursor-pointer focus:outline-none',
                isSelected 
                  ? s === 'buy'
                    ? 'bg-success text-white shadow-[0_4px_12px_rgba(14,203,129,0.2)]'
                    : 'bg-destructive text-white shadow-[0_4px_12px_rgba(246,70,93,0.2)]'
                  : 'bg-transparent text-muted-foreground/50 hover:text-foreground'
              )}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Crypto Asset Trading Pair Meta Row */}
      <div className="flex items-center justify-between mb-3 select-none">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border border-border/10"
            style={{ backgroundColor: 'rgba(247,147,26,0.15)', color: '#F7931A' }}
          >
            ₿
          </div>
          <span className="text-foreground text-sm font-bold tracking-tight">BTC / USD</span>
        </div>
        <span className="text-foreground font-mono font-bold text-sm">$67,240</span>
      </div>

      {/* Numerical Data Amount input container */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded border bg-background/40 border-border/60">
        <span className="text-muted-foreground/60 text-xs font-semibold">Amount (USD)</span>
        <div className="flex items-center gap-1.5">
          <span className="text-foreground text-sm font-mono font-bold">${amount}</span>
          <span className="text-muted-foreground/40 text-[9px] font-bold">≈ 0.00149 BTC</span>
        </div>
      </div>

      {/* Interactive preset shortcut metric buttons grid */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {['50', '100', '250', '500'].map((v) => {
          const isActive = amount === v;
          return (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className={cn(
                "py-1 rounded text-[10px] font-bold transition-all duration-150 border cursor-pointer focus:outline-none",
                isActive
                  ? isBuy
                    ? "bg-success/10 border-success/30 text-success"
                    : "bg-destructive/10 border-destructive/30 text-destructive"
                  : "bg-card/40 border-border/40 text-muted-foreground/50 hover:text-foreground"
              )}
            >
              ${v}
            </button>
          );
        })}
      </div>

      {/* Primary Execution Call-To-Action Button Section */}
      <button
        className={cn(
          "w-full py-2.5 rounded text-xs font-extrabold transition-all duration-200 relative overflow-hidden group text-white cursor-pointer focus:outline-none shadow-lg",
          isBuy 
            ? "bg-success hover:bg-success/90 shadow-success/10" 
            : "bg-destructive hover:bg-destructive/90 shadow-destructive/10"
        )}
      >
        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
        <span className="relative z-10">
          {isBuy ? '⚡ Buy BTC' : '⬇ Sell BTC'} — ${amount}
        </span>
      </button>

      <p className="text-center text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider mt-2">
        Demo mode — no real funds used
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Centralized Coin Data Struct Array Module
══════════════════════════════════════════════════════════ */
export const terminalCoins: TerminalCoinRowProps[] = [
  {
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#F7931A',
    bgColor: 'rgba(247,147,26,0.15)',
    icon: '₿',
    price: '67,240',
    change: '+2.4%',
    positive: true,
    volume: '$1.2B',
    chartPoints: '0,28 9,24 18,26 27,18 36,20 45,12 54,15 63,8 72,10',
    delay: 0,
    inView: false,
  },
  {
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627EEA',
    bgColor: 'rgba(98,126,234,0.15)',
    icon: 'Ξ',
    price: '3,521',
    change: '+1.8%',
    positive: true,
    volume: '$840M',
    chartPoints: '0,22 9,18 18,20 27,14 36,16 45,10 54,12 63,6 72,8',
    delay: 80,
    inView: false,
  },
  {
    rank: 3,
    symbol: 'USDT',
    name: 'Tether',
    color: '#26A17B',
    bgColor: 'rgba(38,161,123,0.15)',
    icon: '₮',
    price: '1.00',
    change: '0.00%',
    positive: true,
    volume: '$3.1B',
    chartPoints: '0,16 9,16 18,15 27,16 36,16 45,15 54,16 63,16 72,16',
    delay: 160,
    inView: false,
  },
  {
    rank: 4,
    symbol: 'BNB',
    name: 'BNB Chain',
    color: '#F3BA2F',
    bgColor: 'rgba(243,186,47,0.15)',
    icon: 'B',
    price: '612.40',
    change: '-0.3%',
    positive: false,
    volume: '$210M',
    chartPoints: '0,8 9,12 18,10 27,16 36,14 45,20 54,18 63,24 72,22',
    delay: 240,
    inView: false,
  },
  {
    rank: 5,
    symbol: 'SOL',
    name: 'Solana',
    color: '#9945FF',
    bgColor: 'rgba(153,69,255,0.15)',
    icon: 'S',
    price: '178.60',
    change: '+5.1%',
    positive: true,
    volume: '$560M',
    chartPoints: '0,30 9,24 18,26 27,16 36,18 45,10 54,12 63,5 72,7',
    delay: 320,
    inView: false,
  },
];

/* ─── White-Label Custom Spotlight Radial Color Map Arrays ─── */
export const featureSpotlightColors = [
  'var(--color-success-glow, rgba(14,203,129,0.06))',
  'var(--color-primary-glow, rgba(219,168,0,0.05))', // Synced exactly to your soft #dba800 Ochre configuration
  'var(--color-success-glow, rgba(14,203,129,0.06))',
  'var(--color-secondary-glow, rgba(59,130,246,0.05))',
  'var(--color-secondary-glow, rgba(59,130,246,0.05))',
  'var(--color-primary-glow, rgba(219,168,0,0.05))',
];


const features = [
  {
    icon: Wallet,
    title: 'Multi-Currency Wallet',
    description:
      'Hold, send, and receive AFN, USD, BTC, EAP, and USDT — all in one secure wallet with real-time balances.',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: Zap,
    title: 'Instant P2P Transfers',
    description:
      'Send money to anyone across Afghanistan in seconds. No bank hours, no delays — just instant, reliable transfers.',
    accent: 'text-yellow-400',
    iconBg: 'bg-yellow-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Live Crypto Trading',
    description:
      'Trade Bitcoin, Ethereum, and Tether with real-time pricing. Buy low, sell high, all from your phone.',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description:
      'Your assets are protected with AES-256 encryption, cold storage, and multi-factor authentication.',
    accent: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description:
      'Access international crypto markets while staying connected to local Afghan payment methods and support.',
    accent: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Headphones,
    title: 'Local Support',
    description:
      'Dari and Pashto-speaking support team available 24/7. Real people, real help, whenever you need it.',
    accent: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
  },
];

const stats = [
  { value: '50K+', label: 'Active Users', icon: Users },
  { value: '100+', label: 'Cities Covered', icon: MapPin },
  { value: '99.9%', label: 'Uptime', icon: Clock },
  { value: '24/7', label: 'Support', icon: Headphones },
];

const securityFeatures = [
  {
    icon: Lock,
    title: 'AES-256 Encryption',
    description: 'Military-grade encryption for all data at rest and in transit',
  },
  {
    icon: Smartphone,
    title: 'Multi-Factor Auth',
    description: 'SMS + authenticator app + biometric verification layers',
  },
  {
    icon: Shield,
    title: 'Cold Storage',
    description: '95% of assets stored offline in geographically distributed vaults',
  },
  {
    icon: CheckCircle,
    title: 'Audit Trail',
    description: 'Complete transaction history with immutable logging and compliance',
  },
];

const testimonials = [
  {
    name: 'Ahmad K.',
    role: 'Kabul',
    amount: '+$12,400',
    date: '2 days ago',
    rating: 5,
    text: 'AtlasPay made it so easy to send money to my family in Herat. Instant and secure.',
  },
  {
    name: 'Fatima M.',
    role: 'Mazar-i-Sharif',
    amount: '+$8,200',
    date: '1 week ago',
    rating: 5,
    text: 'Finally a platform I can trust. The wallet feature is exactly what I needed for my business.',
  },
  {
    name: 'Omar S.',
    role: 'Herat',
    amount: '+$23,100',
    date: '3 days ago',
    rating: 5,
    text: 'The crypto trading is smooth and the prices are always up to date. Best app in Afghanistan.',
  },
  {
    name: 'Zarina H.',
    role: 'Kandahar',
    amount: '+$5,600',
    date: '5 days ago',
    rating: 5,
    text: 'I use AtlasPay daily for my remittance business. The fees are unbeatable and transfers are instant.',
  },
  {
    name: 'Mohammad R.',
    role: 'Balkh',
    amount: '+$31,200',
    date: '1 day ago',
    rating: 5,
    text: 'The dual-currency wallet changed everything. I can hold USD and AFN and trade whenever I want.',
  },
  {
    name: 'Lailuma N.',
    role: 'Herat',
    amount: '+$3,800',
    date: '2 weeks ago',
    rating: 5,
    text: 'As a small business owner, AtlasPay helps me accept crypto payments from overseas clients seamlessly.',
  },
];

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Wallet', href: '/wallet' },
      { label: 'Exchange', href: '/exchange' },
      { label: 'Cards', href: '/cards' },
      { label: 'Remittances', href: '/remittances' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Brand Guidelines', href: '/brand' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Status', href: '/status' },
      { label: 'Community', href: '/community' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Licenses', href: '/licenses' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
];

const socialLinks = [
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: Briefcase, href: '#', label: 'Business' },
  { icon: Mail, href: '#', label: 'Email' },
];

const FOOTER_COINS = [
  { symbol: 'BTC', price: 67284, change: 2.4 },
  { symbol: 'ETH', price: 3451, change: -1.2 },
  { symbol: 'USDT', price: 1.0, change: 0.01 },
  { symbol: 'SOL', price: 148.2, change: 5.7 },
];

/* ══════════════════════════════════════════════════════════
   NavMegaMenu sub-component
══════════════════════════════════════════════════════════ */
interface NavDropdownItem {
  icon: React.ElementType;
  label: string;
  desc: string;
  href: string;
  color: string;
  badge?: string;
}

// Simple mock components to satisfy type compiler checks if necessary
interface NavDropdownItem { label: string; href: string; desc: string; icon: React.ElementType; color: string; badge?: string; }

/* ─────────────────────────────────────────────────────────────
   NavMegaMenu Component
───────────────────────────────────────────────────────────── */
export function NavMegaMenu({ items, visible }: { items: NavDropdownItem[]; visible: boolean }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] transition-all duration-200 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : -8}px)`,
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 100,
      }}
    >
      {/* Structural Top Arrow Indicator Tip Point */}
      <div
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l bg-popover border-border/60"
        style={{
          borderBottom: 'none',
          borderRight: 'none',
        }}
      />

      <div className="rounded-lg overflow-hidden border backdrop-blur-xl bg-popover/98 border-border/60 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        
        {/* Sub-Header Meta Strip */}
        <div className="px-4 py-3 flex items-center justify-between border-b bg-gradient-to-br from-primary/5 to-transparent border-border/40">
          <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            Platform
          </span>
          
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <span className="text-orange-500 text-[9px] font-black">₿</span>
            <span className="text-orange-500 text-[10px] font-mono font-bold">$67,240</span>
            <span className="text-success text-[9px] font-bold">+2.4%</span>
          </div>
        </div>

        {/* Dynamic Mega Grid Selection Panel Loop */}
        <div className="grid grid-cols-2 gap-1 p-3">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 p-3 rounded border border-transparent transition-all duration-150 select-none"
              /* Assigns localized CSS values safely avoiding inline hardcoded color injection loops */
              style={{
                '--hover-bg': `${item.color}0D`,
                '--hover-border': `${item.color}26`,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                e.currentTarget.style.borderColor = 'var(--hover-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {/* Icon Container Shield */}
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border"
                style={{
                  background: `${item.color}12`,
                  borderColor: `${item.color}25`,
                }}
              >
                <item.icon size={14} style={{ color: item.color }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-foreground text-xs font-bold leading-tight">
                    {item.label}
                  </span>
                  
                  {item.badge && (
                    <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded border bg-success/10 text-success border-success/20">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground/60 text-[10px] leading-snug font-medium">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Global Regional Localization Footer Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between border-t border-border/40 bg-background/20">
          <span className="text-muted-foreground/40 text-[10px] font-medium">50,000+ users across Afghanistan</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-success text-[10px] font-bold hover:text-success/80 transition-colors duration-150"
          >
            Get started free <ArrowRight size={9} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollProgressBar Component
───────────────────────────────────────────────────────────── */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border/20">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          /* Tracks your custom #dba800 Ochre configuration flawlessly across themes */
          background: 'linear-gradient(90deg, var(--primary), var(--success))',
          boxShadow: '0 0 10px var(--primary)',
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Mobile Drawer
══════════════════════════════════════════════════════════ */
function MobileDrawer({
  open,
  onClose,
  navItems,
  megaItems,
}: {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
  megaItems: NavDropdownItem[];
}) {
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setRendered(false);
        document.body.style.overflow = '';
      }, 350);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open]);

  if (!rendered) return null;

  return (
    <>
      {/* ── Dimmed Backdrop Backdrop Layer ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 bg-black/70 backdrop-blur-sm",
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* ── Main Sidebar Sheet Panel Slideway Drawer ── */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[320px] flex flex-col border-l backdrop-blur-xl bg-popover/98 border-border/60 shadow-2xl",
          "transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1)"
        )}
        style={{
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: visible ? '-24px 0 80px rgba(0,0,0,0.45)' : 'none',
        }}
      >
        {/* Drawer Layout Branding Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-8 h-8 rounded border bg-primary/10 border-primary/20 flex items-center justify-center">
              <span className="text-primary font-black text-xs">AP</span>
            </div>
            <span className="text-foreground font-bold text-sm tracking-tight">AtlasPay</span>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded border bg-card/40 border-border/60 flex items-center justify-center transition-colors duration-150 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Live Markets Realtime Sub-Widget Panel (Updated from success to primary for your brand Gold Ochre) */}
        <div className="mx-4 mt-4 px-3 py-2.5 rounded border flex items-center justify-between bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Markets Live</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { s: '₿', p: '$67,240', c: '#F7931A' },
              { s: 'Ξ', p: '$3,521', c: '#627EEA' },
            ].map((m) => (
              <div key={m.s} className="flex items-center gap-1 select-none">
                <span className="text-[10px] font-black" style={{ color: m.c }}>
                  {m.s}
                </span>
                <span className="text-foreground font-mono text-[10px] font-bold">{m.p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main List Scroller Links Node Iterations */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-bold px-2 mb-3 select-none">
            Navigate
          </p>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded border border-transparent text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-border/30 transition-all duration-150 group"
            >
              <span className="capitalize font-semibold">{item.label}</span>
              <ChevronRight
                size={14}
                className="text-muted-foreground/30 group-hover:text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          ))}

          {/* Deep Navigation Section Dropdowns */}
          <div className="pt-4">
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-bold px-2 mb-3 select-none">
              Platform
            </p>
            <div className="space-y-1">
              {megaItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded border border-transparent transition-all duration-150"
                  style={{
                    '--hover-bg': `${item.color}0D`,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    className="w-7 h-7 rounded border flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${item.color}12`,
                      borderColor: `${item.color}25`,
                    }}
                  >
                    <item.icon size={12} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-bold leading-tight">{item.label}</p>
                    <p className="text-muted-foreground/60 text-[10px] font-medium leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  {item.badge && (
                    <span className="ml-auto text-[8px] font-extrabold px-1.5 py-0.5 rounded border bg-primary/10 text-primary border-primary/20">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Drawer CTA Authentication Action Area */}
        <div className="px-4 pb-6 pt-4 space-y-2.5 border-t border-border/40 bg-background/20">
          <Link href="/auth/login" onClick={onClose}>
            <button
              className="w-full py-2.5 rounded border text-sm font-semibold text-muted-foreground bg-card/40 border-border/60 hover:text-foreground hover:border-muted-foreground transition-all duration-200 cursor-pointer focus:outline-none"
            >
              Sign in
            </button>
          </Link>
          
          <Link href="/auth/register" onClick={onClose}>
            {/* Primary Action Registration CTA Linked dynamically to your brand variables instead of success green */}
            <button
              className="relative w-full py-2.5 rounded text-sm font-extrabold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 overflow-hidden group shadow-lg shadow-primary/10 cursor-pointer focus:outline-none"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </button>
          </Link>
          
          <p className="text-center text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider">
            No credit card required · Free forever
          </p>
        </div>
      </div>
    </>
  );

}


/* ══════════════════════════════════════════════════════════
   Nav data
══════════════════════════════════════════════════════════ */
const navMegaItems: NavDropdownItem[] = [
  {
    icon: Wallet,
    label: 'Multi-Currency Wallet',
    desc: 'AFN, USD, BTC, ETH, USDT in one place',
    href: '#features',
    color: '#10B981',
    badge: 'New',
  },
  {
    icon: TrendingUp,
    label: 'Live Trading',
    desc: 'Real-time crypto markets & charts',
    href: '#features',
    color: '#F7931A',
  },
  {
    icon: Zap,
    label: 'P2P Transfers',
    desc: 'Instant sends across Afghanistan',
    href: '#features',
    color: '#F59E0B',
  },
  {
    icon: CreditCardIcon,
    label: 'Virtual Card',
    desc: 'Spend online anywhere, instantly',
    href: '#features',
    color: '#818CF8',
    badge: 'Hot',
  },
  {
    icon: Shield,
    label: 'Security',
    desc: 'AES-256, cold storage, 2FA',
    href: '#security',
    color: '#34D399',
  },
  {
    icon: Headphones,
    label: 'Local Support',
    desc: 'Dari & Pashto 24/7 assistance',
    href: '#testimonials',
    color: '#F87171',
  },
];

const navLinks = [
  { label: 'features', href: '#features' },
  { label: 'security', href: '#security' },
  { label: 'testimonials', href: '#testimonials' },
];

/* ══════════════════════════════════════════════════════════
   useCountUp — animates a number from 0 to target
══════════════════════════════════════════════════════════ */
function useCountUp(
  target: number,
  duration = 2000,
  inView = false,
  delay = 0,
) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const delayTimer = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration, delay]);

  return count;
}

/* ══════════════════════════════════════════════════════════
   StatCard — single animated stat
══════════════════════════════════════════════════════════ */
export function StatCard({ value, label, icon: Icon, index, inView = true }: StatCardProps) {
  const [hovered, setHovered] = useState(false);

  // 🚀 FIXED: Target string variables strictly by accessing specific capture array index blocks
  const parsed = (() => {
    const rawValue = value || '0';
    const match = rawValue.match(/^([\d.,]+)(.*)$/);
    if (!match) return { num: 0, suffix: rawValue };
    
    // Grabs capture group 1 string (numbers) and replaces commas safely
    const cleanNumString = match[1].replace(/,/g, '');
    return { 
      num: parseFloat(cleanNumString) || 0, 
      suffix: match[2] || '' // Capture group 2 yields the text suffix safely
    };
  })();

  const count = useCountUp(parsed.num, 1800, inView, index * 140);

  const sparklines = [
    '0,24 10,20 20,22 30,14 40,16 50,8 60,10 70,4 80,6',
    '0,20 10,18 20,16 30,14 40,12 50,10 60,8 70,6 80,4',
    '0,10 10,8  20,9  30,7  40,8  50,6  60,7 70,5 80,6',
    '0,18 10,14 20,16 30,10 40,12 50,6  60,8 70,4 80,4',
  ];

  let currentToken = DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
  try {
    if (typeof StatCardPalette !== 'undefined' && Array.isArray(StatCardPalette) && StatCardPalette.length > 0) {
      currentToken = StatCardPalette[index % StatCardPalette.length];
    }
  } catch (e) {}

  const color = currentToken.css || '#eab308'; 
  const rgb = (currentToken.rgb || '234,179,8').replace(/\s+/g, ''); 

  const currentSparkline = sparklines[index % sparklines.length];
  const generatedPath = currentSparkline
    ? currentSparkline
        .split(/\s+/)
        .filter(Boolean)
        .map((p, i, arr) => {
          const [x, y] = p.split(',');
          if (i === 0) return `M ${x} ${y}`;
          if (i === arr.length - 1) return `L ${x} ${y} L ${x} 28 L 0 28 Z`;
          return `L ${x} ${y}`;
        })
        .join(' ')
    : '';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex flex-col items-center text-center p-6 rounded-lg overflow-hidden border',
        'backdrop-blur-md bg-card/40 border-border/40 select-none',
        'transition-all duration-700 ease-out cursor-default',
        inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95',
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        borderColor: hovered ? `rgba(${rgb},0.2)` : 'rgba(255,255,255,0.05)',
        backgroundColor: hovered ? `rgba(${rgb},0.04)` : undefined,
        boxShadow: hovered ? `0 16px 48px rgba(${rgb},0.08)` : 'none',
      }}
    >
      {/* Glow Ambient Overlay */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-500"
        style={{
          width: 200, height: 200,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(${rgb},0.1) 0%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Localized Vector Canvas Sparklines */}
      <div
        className="absolute top-3 right-3 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: inView ? (hovered ? 0.9 : 0.35) : 0 }}
      >
        <svg width="80" height="28" viewBox="0 0 80 28" fill="none" className="overflow-visible">
          <defs>
            <linearGradient id={`sg-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={generatedPath} fill={`url(#sg-${index})`} opacity="0.6" />
          <polyline
            points={currentSparkline}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Icon Graphic Container */}
      <div
        className="relative w-12 h-12 rounded-md flex items-center justify-center mb-4 transition-all duration-300 border"
        style={{
          background: hovered ? `rgba(${rgb},0.1)` : `rgba(${rgb},0.05)`,
          borderColor: hovered ? `rgba(${rgb},0.25)` : `rgba(${rgb},0.15)`,
          boxShadow: hovered ? `0 8px 24px rgba(${rgb},0.12)` : 'none',
          transform: hovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
        }}
      >
        {Icon && <Icon size={20} style={{ color }} />}
      </div>

      {/* Numeric Results Field Block */}
      <div
        className="relative font-black mb-1.5 font-mono tabular-nums text-foreground transition-all duration-300 tracking-tight"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          lineHeight: 1,
          textShadow: hovered ? `0 0 30px rgba(${rgb},0.25)` : 'none',
        }}
      >
        <span>{Number.isInteger(parsed.num) ? count : count.toFixed(1)}</span>
        <span style={{ color: hovered ? color : `rgba(${rgb},0.8)` }} className="ml-0.5">
          {parsed.suffix}
        </span>
      </div>

      <p className="text-muted-foreground text-sm font-semibold transition-colors duration-300">
        {label}
      </p>

      {/* Tracker Loading Strip Element */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1800ms] ease-out"
          style={{
            width: inView ? '100%' : '0%',
            transitionDelay: `${index * 140 + 300}ms`,
            background: `linear-gradient(90deg, transparent, rgba(${rgb},0.4), ${color})`,
            opacity: hovered ? 1 : 0.6,
          }}
        />
      </div>
    </div>
  );
}



type StatCardProps = {
  value: string;
  label: string;
  icon?: React.ElementType;
  index: number;
  inView?: boolean;
};

interface StatsSectionProps {
  stats?: Array<{
    value: string;
    label: string;
    icon: any;
  }>;
}

// 🚀 FIXED: Standard high-performance fallback stats data so it always populates immediately
const DEFAULT_STATS_DATA = [
  { value: '34', label: 'Provinces Covered', icon: Globe },
  { value: '2.4M', label: 'Daily Transactions', icon: Zap },
  { value: '27001', label: 'ISO Security Certified', icon: ShieldCheck },
  { value: '99.9%', label: 'Platform Uptime', icon: CreditCard },
];

export function StatsSection({ stats }: StatsSectionProps) {
  const { ref, inView } = useInView(0.05);

  // 🚀 FIXED: If the parent didn't feed data yet, load the default numbers immediately instead of rendering blank skeletons
  const safeStats = Array.isArray(stats) && stats.length > 0 ? stats : DEFAULT_STATS_DATA;

  return (
    <section
      ref={ref}
      className="relative z-10 py-20 overflow-hidden border-t border-b border-border/40 bg-background/20"
    >
      {/* Dynamic Ambient Branding Backdrop Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 100% at 50% 50%,
              rgba(219, 168, 0, 0.04) 0%, transparent 70%),
            rgba(0,0,0,0.15)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Row Label */}
        <div
          className={cn(
            'flex items-center justify-center gap-3 mb-10 transition-all duration-700 select-none',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(219, 168, 0, 0.25))',
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 800ms ease 200ms',
              transformOrigin: 'right',
            }}
          />
          <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">
              By the numbers
            </span>
          </div>
          <div
            className="h-px flex-1 max-w-[80px]"
            style={{
              background: 'linear-gradient(to left, transparent, rgba(219, 168, 0, 0.25))',
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 800ms ease 200ms',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* 🚀 FIXED: Skeletons are completely removed. Real cards are guaranteed to render now */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {safeStats.map((s, i) => (
            <StatCard
              key={s?.label ? `stat-card-${s.label}` : `stat-fallback-${i}`}
              value={s?.value || '0'}
              label={s?.label || ''}
              icon={s?.icon}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Lower Regional Information Badges */}
        <div
          className={cn(
            'flex items-center justify-center gap-6 mt-10 transition-all duration-700 select-none',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { dot: '#10b981', text: 'Serving 34 provinces' },
            { dot: '#eab308', text: 'Processing $2.4M daily' },
            { dot: '#3b82f6', text: 'ISO 27001 certified' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: item.dot,
                  boxShadow: `0 0 6px ${item.dot}40`,
                }}
              />
              <span className="text-muted-foreground/60 text-xs font-semibold block">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TestimonialAvatar Component
───────────────────────────────────────────────────────────── */
interface TestimonialCardProps {
  name: string;
  role: string;
  amount: string;
  date: string;
  rating: number;
  text: string;
  index?: number;
}

/* ─────────────────────────────────────────────────────────────
   TestimonialAvatar Component
───────────────────────────────────────────────────────────── */
export function TestimonialAvatar({
  name = 'Trader',
  seed,
}: {
  name: string;
  seed?: number;
}) {
  // Crashproof parsing structure strips spacing issues safely before index access
  const initials = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => (n && n[0] ? n[0] : ''))
    .filter(Boolean)
    .join('')
    .substring(0, 2)
    .toUpperCase();
    
  const safeNameLength = String(name || '').length || 6;
  const hue = (seed ?? safeNameLength * 40) % 360;
  
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 select-none border border-white/5"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 55%, 35%), hsl(${(hue + 30) % 360}, 45%, 25%))`,
        boxShadow: `0 0 0 2px rgba(${BrandColors.primary.rgb}, 0.15)`,
      }}
    >
      {initials || 'U'}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RatingBar Component
───────────────────────────────────────────────────────────── */
export function RatingBar({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < rating;
        return (
          <Star
            key={`rating-star-${i}`}
            size={12}
            /* 🚀 Fixed: Aligned to dynamic theme primary gold tokens while keeping original markup style */
            className={cn(
              "transition-colors duration-200",
              isFilled ? "text-primary fill-primary" : "text-muted-foreground/30 fill-none"
            )}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TestimonialCard Component
───────────────────────────────────────────────────────────── */
export function TestimonialCard({ name = 'Trader', role, amount, date, rating, text, index = 0 }: TestimonialCardProps) {
  const safeName = String(name || '').trim() || 'Trader';

  return (
    <div
      className="group relative rounded-2xl p-5 transition-all duration-500 border border-border/40 select-none"
      style={{
        /* 🚀 Fixed Card Transparency: Solid charcoal canvas ensures background particles can no longer bleed through */
        background: '#12161A',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Glow halo mapped safely to central color variables */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${BrandColors.primary.rgb}, 0.04) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <RatingBar rating={rating} />
          {/* Mapped amount badge safely to central success colors */}
          <span className="text-[11px] font-mono text-success font-bold tracking-tight">
            {amount}
          </span>
        </div>
        
        <p className="text-foreground/90 text-sm leading-relaxed text-left">&ldquo;{text}&rdquo;</p>
        
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border/40">
          <TestimonialAvatar name={safeName} seed={safeName.length} />
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground truncate">{safeName}</span>
              <span className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center shrink-0 border border-success/20">
                <CheckCircle size={10} className="text-success" />
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-0.5 font-medium">
              <span>{role}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface TestimonialData {
  name: string;
  role: string;
  amount: string;
  date: string;
  rating: number;
  text: string;
}


export function MarqueeRow({
  items = [],
  direction = 'left',
  speed = 30,
}: {
  items: TestimonialData[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const [rowId, setRowId] = useState('');

  useEffect(() => {
    setRowId(`marquee-${Math.random().toString(36).slice(2, 9)}`);
  }, []);

  // Guard rails: safe fallback check avoids crashing during async network fetch phases
  const safeItems = Array.isArray(items) ? items : [];
  const combinedItems = [...safeItems, ...safeItems];

  return (
    <div className="relative overflow-hidden w-full">
      {rowId ? (
        <style>{`
          @keyframes ${rowId} {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      ) : null}
      
      <div
        className="flex gap-4 w-max"
        style={{
          animation: rowId ? `${rowId} ${speed}s linear infinite` : 'none',
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {combinedItems.length > 0 ? (
          combinedItems.map((t, i) => (
            <div key={t?.name ? `${t.name}-${i}` : `marquee-card-${i}`} className="w-[340px] shrink-0">
              <TestimonialCard {...t} index={i} />
            </div>
          ))
        ) : (
          // Opaque solid skeletons stand up securely against particle layers
          Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={`marquee-skeleton-${i}`} 
              className="w-[340px] h-44 animate-pulse rounded-lg border backdrop-blur-md shrink-0" 
              style={{ backgroundColor: '#12161A', borderColor: '#22262A' }}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TestimonialsSection Component
───────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const row1 = safeTestimonials.slice(0, 3);
  const row2 = safeTestimonials.slice(3, 6);

  return (
    <section id="testimonials" className="relative z-10 py-20 sm:py-28 overflow-hidden bg-background/5">
      {/* ── Dynamic Ambient Branding Backdrop Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            /* Seamlessly tracks your custom brand Gold Ochre parameters across configurations */
            background: `radial-gradient(circle, rgba(${BrandColors.primary.rgb}, 0.3) 0%, transparent 70%)`,
            opacity: 0.1, // Clean, elegant illumination overlay constraints
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 select-none">
              <div className="flex -space-x-2">
                {safeTestimonials.slice(0, 4).map((t, idx) => (
                  <TestimonialAvatar key={t?.name || idx} name={t?.name || 'Trader'} seed={String(t?.name || '').length} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <RatingBar rating={5} />
                <span className="text-xs text-muted-foreground/60 font-semibold ml-1">4.98 avg</span>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-2">
              Trusted by thousands
            </h2>
            <p className="text-muted-foreground/80 text-base sm:text-lg max-w-xl font-medium mt-1">
              Join the growing community of Afghans using AtlasPay for their daily financial needs.
            </p>
          </div>
          
          <Link href="/testimonials">
            <Button variant="ghost" size="sm" className="text-sm gap-1.5 shrink-0 font-bold group">
              Read all reviews <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Endless Horizontal Rolling Columns */}
      <div className="flex flex-col gap-5 relative z-10">
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={30} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

return (
  <>
    {/* ── Pre-footer CTA ── */}
    <section className="relative z-10 py-20 sm:py-28 bg-background/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden p-10 sm:p-14 md:p-16 border backdrop-blur-xl border-border/40"
          style={{
            background:
              'linear-gradient(135deg, #1E2329 0%, #15191E 45%, #0B0E11 100%)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* Ambient lights */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${BrandColors.primary.rgb}, 0.3) 0%, transparent 70%)`,
                opacity: 0.1,
                filter: 'blur(80px)',
              }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${BrandColors.success.rgb}, 0.2) 0%, transparent 70%)`,
                opacity: 0.1,
                filter: 'blur(80px)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.18em]">
                  Stay ahead
                </span>
                <div className="h-[1.5px] w-8 bg-primary/25" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
                Ready to transform your finances?
              </h2>

              <p className="text-muted-foreground/80 text-base sm:text-lg font-medium mt-1">
                Join <span className="text-primary font-bold">50,000+</span>{' '}
                Afghans already using AtlasPay. Get early access to new
                features and exclusive updates.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0 relative z-10">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-72 h-11 pl-10 pr-4 rounded text-sm bg-background/50 border border-border text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <Button type="submit" size="md" className="h-11 shrink-0 font-bold group">
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                  {!subscribed && (
                    <ArrowRight
                      size={14}
                      className="ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  )}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground/30 font-bold uppercase tracking-wider mt-2">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Main Footer ── */}
    <footer className="relative z-10 border-t bg-gradient-to-b from-popover to-background border-border/40">
      
      {/* Live ticker */}
      <div className="border-b border-border/20 overflow-hidden select-none bg-background/10">
        <div className="flex items-center gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest shrink-0">
            Live prices
          </span>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {FOOTER_COINS.map((coin) => {
              const isPositive = coin.change >= 0;

              return (
                <div key={coin.symbol} className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-foreground">
                    {coin.symbol}
                  </span>

                  <span className="text-xs font-mono font-bold text-muted-foreground">
                    $
                    {coin.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>

                  <span
                    className={cn(
                      'text-[10px] font-bold font-mono',
                      isPositive ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {coin.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2 text-left">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded border bg-primary/10 border-primary/20 flex items-center justify-center">
                <span className="text-primary font-black text-sm">AP</span>
              </div>
              <span className="text-foreground font-bold text-base">
                AtlasPay
              </span>
            </div>

            <p className="text-xs text-muted-foreground/60 leading-relaxed font-semibold mb-5 max-w-xs">
              Afghanistan&apos;s most trusted financial platform. Send, spend,
              and trade across borders with confidence.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 rounded border bg-card/40 border-border/60 flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="text-left">
              <h3 className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest mb-4">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20 bg-background/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground/30">
            <span>© {new Date().getFullYear()} AtlasPay. All rights reserved.</span>

            <span className="hidden sm:inline">·</span>

            <div className="flex items-center gap-1.5">
              <Shield size={11} className="text-primary" />
              <span>Secure Terminal Layer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);
}
/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const section2 = useInView(0.25);
  const section3 = useInView(0.2);
  const featuresSection = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['features', 'security', 'testimonials'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

 return (
  <div className="relative min-h-screen w-full overflow-x-hidden bg-[#020202] text-foreground">
    {/* ═══════════════════════════════════════════════════════════════
        GLOBAL PITCH-BLACK CANVAS
        Single visual foundation for the entire landing page.
        Keeps the page anchored to the same black atmosphere as auth.
    ═══════════════════════════════════════════════════════════════ */}
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(
            120% 90% at 50% -10%,
            rgba(255,255,255,0.018) 0%,
            rgba(255,255,255,0.008) 35%,
            rgba(2,2,2,1) 72%
          ),
          linear-gradient(
            180deg,
            #030303 0%,
            #020202 45%,
            #000000 100%
          )
        `,
      }}
    />

    {/* Extremely subtle top atmospheric light */}
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-[520px] z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(255,255,255,0.012), transparent 70%)',
      }}
    />

    {/* ═══════════════════════════════════════════════════════════════
        NAVIGATION
    ═══════════════════════════════════════════════════════════════ */}
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500 ease-out',
        'border-b',
        scrolled
          ? [
              'bg-[#020202]/80',
              'backdrop-blur-2xl',
              'border-white/[0.06]',
              'shadow-[0_12px_40px_rgba(0,0,0,0.35)]',
            ].join(' ')
          : 'bg-transparent border-transparent',
      )}
    >
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">

          {/* ═══════════════════════════════════════════════════════
              BRAND
          ═══════════════════════════════════════════════════════ */}
          <Link
            href="/"
            className="group/logo flex shrink-0 select-none items-center gap-3"
          >
            {/* Logo mark */}
            <div className="relative">
              {/* Hover aura */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-0
                  rounded-xl
                  bg-primary/20
                  opacity-0
                  blur-xl
                  transition-opacity duration-500
                  group-hover/logo:opacity-100
                "
              />

              {/* Logo container */}
              <div
                className="
                  relative
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  border border-primary/20
                  bg-primary/[0.07]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                  transition-all duration-300
                  group-hover/logo:scale-105
                  group-hover/logo:border-primary/35
                  group-hover/logo:bg-primary/10
                "
              >
                <span className="text-sm font-black tracking-[-0.08em] text-primary">
                  AP
                </span>
              </div>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col justify-center leading-none">
              <span
                className="
                  text-[15px]
                  font-black
                  tracking-[-0.02em]
                  text-white
                  transition-colors duration-300
                "
              >
                AtlasPay
              </span>

              <span
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                Crypto · Wallet · Payments
              </span>
            </div>
          </Link>

          {/* ═══════════════════════════════════════════════════════
              DESKTOP NAVIGATION
          ═══════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex items-center">

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimer.current) {
                  clearTimeout(dropdownTimer.current);
                }
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                if (dropdownTimer.current) {
                  clearTimeout(dropdownTimer.current);
                }
                dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 140);
              }}
            >
              <button
                type="button"
                className={cn(
                  `
                    group/nav
                    flex items-center gap-1.5
                    rounded-lg
                    px-3 py-2
                    text-[13px]
                    font-semibold
                    transition-all duration-200
                    focus:outline-none
                  `,
                  dropdownOpen
                    ? 'bg-white/[0.05] text-white'
                    : 'text-white/50 hover:bg-white/[0.025] hover:text-white/90',
                )}
              >
                <span>Products</span>

                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={cn(
                    'transition-transform duration-200',
                    dropdownOpen && 'rotate-180',
                  )}
                >
                  <path
                    d="M2 3.5L5 6.5L8 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                  />
                </svg>
              </button>

              <NavMegaMenu
                items={navMegaItems}
                visible={dropdownOpen}
              />
            </div>

            {/* Divider */}
            <div className="mx-2 h-5 w-px bg-white/[0.07]" />

            {/* Standard links */}
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.label;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      `
                        group/link
                        relative
                        rounded-lg
                        px-3 py-2
                        text-[13px]
                        font-semibold
                        transition-all duration-200
                        focus:outline-none
                      `,
                      isActive
                        ? 'text-white'
                        : 'text-white/45 hover:text-white/90',
                    )}
                  >
                    <span className="relative">
                      {link.label}

                      {/* Animated underline */}
                      <span
                        className={cn(
                          `
                            absolute
                            -bottom-1
                            left-0
                            h-px
                            rounded-full
                            bg-primary
                            transition-all duration-300
                          `,
                          isActive
                            ? 'w-full opacity-80'
                            : 'w-0 opacity-0 group-hover/link:w-full group-hover/link:opacity-60',
                        )}
                      />
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span
                        className="
                          absolute
                          right-2
                          top-1.5
                          h-1
                          w-1
                          rounded-full
                          bg-primary
                        "
                        style={{
                          boxShadow: '0 0 8px rgba(219,168,0,0.8)',
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              RIGHT ACTIONS
          ═══════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex items-center gap-2.5">

            {/* Market status */}
            <div
              className="
                hidden
                xl:flex
                items-center gap-2
                rounded-full
                border border-white/[0.06]
                bg-white/[0.025]
                px-3 py-1.5
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-primary
                    opacity-50
                  "
                />

                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>

              <span className="text-[9px] font-black text-primary">
                ₿
              </span>

              <span className="font-mono text-[10px] font-bold text-white/80">
                $67,240
              </span>

              <span className="text-[9px] font-extrabold text-success">
                +2.4%
              </span>
            </div>

            {/* Sign in */}
            <Link href="/auth/login">
              <button
                type="button"
                className="
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-4 py-2
                  text-[13px]
                  font-bold
                  text-white/60
                  transition-all duration-200
                  hover:border-white/[0.12]
                  hover:bg-white/[0.05]
                  hover:text-white
                  focus:outline-none
                "
              >
                Sign in
              </button>
            </Link>

            {/* Primary CTA */}
            <Link href="/auth/register">
              <button
                type="button"
                className="
                  group/cta
                  relative
                  flex items-center gap-2
                  overflow-hidden
                  rounded-xl
                  bg-primary
                  px-5 py-2
                  text-[13px]
                  font-extrabold
                  text-primary-foreground
                  shadow-[0_8px_30px_rgba(219,168,0,0.12)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_35px_rgba(219,168,0,0.2)]
                  focus:outline-none
                "
              >
                {/* Shine sweep */}
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-y-0 left-0
                    w-1/2
                    -translate-x-[160%]
                    skew-x-[-20deg]
                    bg-white/20
                    transition-transform duration-700
                    group-hover/cta:translate-x-[300%]
                  "
                />

                <span className="relative z-10">
                  Get Started
                </span>

                <ArrowRight
                  size={14}
                  className="
                    relative z-10
                    transition-transform duration-200
                    group-hover/cta:translate-x-0.5
                  "
                />
              </button>
            </Link>
          </div>

          {/* ═══════════════════════════════════════════════════════
              MOBILE MENU BUTTON
          ═══════════════════════════════════════════════════════ */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              `
                lg:hidden
                relative
                flex h-10 w-10
                flex-col
                items-center
                justify-center
                gap-[5px]
                rounded-xl
                border
                transition-all duration-300
                focus:outline-none
              `,
              mobileOpen
                ? 'border-primary/25 bg-primary/[0.07]'
                : 'border-white/[0.07] bg-white/[0.025]',
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                'h-[1.5px] w-4 rounded-full transition-all duration-300',
                mobileOpen
                  ? 'translate-y-[6.5px] rotate-45 bg-primary'
                  : 'bg-white/50',
              )}
            />

            <span
              className={cn(
                'h-[1.5px] w-4 rounded-full transition-all duration-200',
                mobileOpen
                  ? 'scale-x-0 opacity-0'
                  : 'bg-white/50',
              )}
            />

            <span
              className={cn(
                'h-[1.5px] w-4 rounded-full transition-all duration-300',
                mobileOpen
                  ? '-translate-y-[6.5px] -rotate-45 bg-primary'
                  : 'bg-white/50',
              )}
            />
          </button>
        </div>
      </div>
    </nav>

       {/* ══════════════════════════════════════════════════════════
          HERO LANDING SPLASH VIEWPORT SECTION
      ══════════════════════════════════════════════════════════ */}
  <section className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">
  <div className="absolute inset-0 z-0">
    <DotGrid />
  </div>

  <FloatingOrbs ready={heroReady} />

  <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center pointer-events-none">
    <PulseRings ready={heroReady} />
  </div>

  {/* Bottom atmospheric fade */}
  <div
    className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
    style={{
      background:
        'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 45%, transparent 100%)',
    }}
  />

  {/* Top atmospheric fade */}
  <div
    className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
    style={{
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
    }}
  />


        <div className="relative z-20 mt-16">
          <TickerStrip ready={heroReady} />
        </div>

        <div className="relative z-20 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              
              {/* LEFT COLUMN: Core Branding Context Elements */}
              <div className="flex-1 max-wxl order-2 lg:order-1 text-center lg:text-left">
                <div
                  className={cn(
                    'transition-all duration-1000 ease-out',
                    heroReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20',
                  )}
                >
                  {/* Live Status Badge Layer - Migrated safely to var(--primary) for Gold Ochre layout tracking */}
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-primary/10 border border-primary/20 backdrop-blur-sm transition-all duration-700',
                      heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                    )}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">
                      Live — Markets Open
                    </span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                    <span className="block text-foreground">Afghanistan&apos;s</span>
                    {/* Shimmer Text Gradient - Aligned to your premium Gold Ochre design parameters */}
                <span
  className="inline-block tracking-tighter px-4 py-2 -mx-4 -my-2"
  style={{
    background:
      'linear-gradient(135deg, var(--primary) 0%, #FFF3B3 40%, #FFFCE6 70%, var(--primary) 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: heroReady ? 'shimmerText 4s linear infinite' : 'none',
    willChange: 'transform, background-position', // Forces clean GPU rendering
  }}
>
  Crypto Platform
</span>


                  </h1>

                  <p className="text-muted-foreground text-lg sm:text-xl mb-10 leading-relaxed max-w-lg font-medium">
                    Manage crypto assets, send instant P2P transfers, and trade with live pricing
                    &mdash; all from one secure, locally-supported platform.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10">
                    <Link href="/auth/register">
                      <Button
                        size="lg"
                        className="px-8 text-base font-extrabold text-primary-foreground bg-primary hover:bg-primary/95 shadow-lg shadow-primary/10 relative overflow-hidden group/btn cursor-pointer focus:outline-none h-12"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Get Started Free <ArrowRight size={16} />
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                      </Button>
                    </Link>
                    <a href="#features">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="px-8 text-base font-bold text-muted-foreground bg-card/40 border border-border hover:text-foreground hover:border-muted-foreground transition-all duration-200 cursor-pointer focus:outline-none h-12"
                      >
                        Learn More <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </a>
                  </div>

                  {/* Verification Features Row */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 border-t border-border/10 pt-6">
                    {[
                      { icon: CheckCircle, label: 'No hidden fees' },
                      { icon: Zap, label: 'Instant transfers' },
                      { icon: Shield, label: 'Bank-grade security' },
                    ].map(({ icon: Icon, label }, i) => (
                      <div
                        key={label}
                        className={cn(
                          'flex items-center gap-1.5 text-xs text-muted-foreground/40 font-bold uppercase tracking-wider transition-all duration-500 ease-out',
                          heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                        )}
                        style={{ transitionDelay: `${600 + i * 100}ms` }}
                      >
                        <Icon size={13} className="text-primary" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Hardware Card Showcase */}
              <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
                <div
                  className={cn(
                    'transition-all duration-1000 ease-out delay-200',
                    heroReady ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24',
                  )}
                >
                  <div className="relative" style={{ width: 420, height: 340 }}>
                    
                    {/* Ambient dynamic backdrop glow halo - fully migrated to your custom Gold Ochre brand color */}
                    <div
                      className="absolute rounded-full pointer-events-none z-0"
                      style={{
                        width: 320,
                        height: 320,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(219, 168, 0, 0.12) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                        opacity: heroReady ? 1 : 0,
                        transition: 'opacity 1.5s ease',
                      }}
                    />

                    {/* Secondary Tilted Card Asset Layer */}
                    <div
                      className={cn(
                        'absolute transition-all duration-1000 ease-out z-10',
                        heroReady ? 'opacity-100' : 'opacity-0 translate-x-8',
                      )}
                      style={{
                        top: 60,
                        left: 50,
                        transform: 'rotate(8deg) translateY(10px)',
                        transitionDelay: '350ms',
                      }}
                    >
                      <HeroCard small tilt />
                    </div>

                    {/* Primary Floating Card Asset Layer */}
                    <div
                      className={cn(
                        'absolute transition-all duration-1000 ease-out z-20',
                        heroReady ? 'opacity-100' : 'opacity-0 translate-x-12',
                      )}
                      style={{
                        top: 20,
                        left: 10,
                        animation: heroReady ? 'floatCard 5s ease-in-out infinite' : 'none',
                        transitionDelay: '150ms',
                      }}
                    >
                      <HeroCard />
                    </div>

                    {/* Floating Info Pill: Active User base status */}
                    <StatPill ready={heroReady} delay={700} style={{ top: 0, right: 0 }}>
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      <span className="text-muted-foreground/60 font-semibold">Users</span>
                      <span className="text-foreground font-extrabold">50K+</span>
                    </StatPill>

                    {/* Floating Info Pill: Real-time price tracker trend asset */}
                    <StatPill ready={heroReady} delay={850} style={{ bottom: 30, right: -10 }}>
                      <span className="text-orange-500 font-black text-sm">₿</span>
                      <div className="text-left">
                        <p className="text-foreground font-mono font-bold text-xs leading-none">$67,240</p>
                        <p className="text-primary text-[10px] font-bold mt-1">+2.4% today</p>
                      </div>
                      <Sparkline color="var(--primary)" up />
                    </StatPill>

                    {/* Floating Info Pill: Infrastructure system encryption metrics */}
                    <StatPill ready={heroReady} delay={1000} style={{ bottom: 10, left: -10 }}>
                      <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Shield size={12} className="text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-foreground text-xs font-bold leading-none">AES-256</p>
                        <p className="text-muted-foreground/40 text-[10px] font-semibold mt-1">Bank-grade</p>
                      </div>
                    </StatPill>

                    {/* Floating Info Pill: Transaction settlement speed bounds */}
                    <StatPill
                      ready={heroReady}
                      delay={1150}
                      style={{ top: 80, right: -20 }}
                      className="hidden lg:flex"
                    >
                      <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Zap size={12} className="text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-foreground text-xs font-bold leading-none">&lt; 3 sec</p>
                        <p className="text-muted-foreground/40 text-[10px] font-semibold mt-1">Transfer speed</p>
                      </div>
                    </StatPill>

                    {/* Floating Info Pill: 24-Hour Exchange Trading Volume metrics */}
                    <StatPill
                      ready={heroReady}
                      delay={1300}
                      style={{ top: -10, left: 60 }}
                      className="hidden lg:flex"
                    >
                      <Activity size={12} className="text-primary" />
                      <span className="text-muted-foreground/60 text-[10px] font-semibold">24h volume</span>
                      <span className="text-foreground font-mono text-xs font-black">$2.4M</span>
                    </StatPill>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* ═══════════════════════════════════════════════════════════════════════
    SECTION 2 — SMART PAYMENTS
    Pitch-black product canvas
    Kibo / Tether card LEFT → Editorial content RIGHT
═══════════════════════════════════════════════════════════════════════ */}
<section
  id="features"
  className="relative isolate overflow-hidden bg-[#020202] text-foreground"
>
  {/* ══════════════════════════════════════════════════════════════════
      AMBIENT BACKGROUND SYSTEM
      Intentionally restrained — the product remains the visual focus.
  ══════════════════════════════════════════════════════════════════ */}

  {/* Base pitch-black canvas */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(
          80% 70% at 18% 50%,
          rgba(219,168,0,0.045) 0%,
          rgba(219,168,0,0.018) 32%,
          transparent 68%
        ),
        radial-gradient(
          65% 75% at 82% 42%,
          rgba(255,255,255,0.018) 0%,
          transparent 62%
        ),
        linear-gradient(
          180deg,
          #020202 0%,
          #030303 48%,
          #010101 100%
        )
      `,
    }}
  />

  {/* Soft gold spotlight behind the card */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none z-0 rounded-full"
    style={{
      width: 680,
      height: 680,
      left: '-14%',
      top: '50%',
      transform: 'translateY(-50%)',
      background:
        'radial-gradient(circle, rgba(219,168,0,0.075) 0%, rgba(219,168,0,0.028) 28%, transparent 68%)',
      filter: 'blur(45px)',
      animation: section2.inView ? 'sec2BlobA 16s ease-in-out infinite' : 'none',
    }}
  />

  {/* Very subtle opposing ambient light */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none z-0 rounded-full"
    style={{
      width: 520,
      height: 520,
      right: '-14%',
      top: '15%',
      background:
        'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 68%)',
      filter: 'blur(70px)',
      opacity: 0.7,
    }}
  />

  {/* Focused gold halo directly behind the product */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none z-0 rounded-full"
    style={{
      width: 430,
      height: 430,
      left: '18%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      background:
        'radial-gradient(circle, rgba(219,168,0,0.085) 0%, rgba(219,168,0,0.025) 42%, transparent 72%)',
      filter: 'blur(35px)',
      opacity: section2.inView ? 1 : 0,
      transition: 'opacity 1.5s ease',
    }}
  />

  {/* ══════════════════════════════════════════════════════════════════
      TECHNICAL GRID
      Extremely subtle — adds depth without becoming a visible pattern.
  ══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)
      `,
      backgroundSize: '72px 72px',
      maskImage:
        'radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 75%)',
      WebkitMaskImage:
        'radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 75%)',
    }}
  />

  {/* ══════════════════════════════════════════════════════════════════
      MICRO AMBIENT PARTICLES
      Sparse, almost imperceptible.
  ══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
  >
    {[
      { size: 2, top: '18%', left: '9%', delay: 0, dur: 8 },
      { size: 2, top: '72%', left: '14%', delay: 1.5, dur: 9 },
      { size: 2, top: '28%', left: '88%', delay: 0.8, dur: 7 },
      { size: 1, top: '78%', left: '78%', delay: 2, dur: 10 },
      { size: 2, top: '12%', left: '62%', delay: 1, dur: 8 },
      { size: 1, top: '58%', left: '48%', delay: 2.5, dur: 9 },
    ].map((particle, i) => (
      <span
        key={i}
        className="absolute rounded-full bg-primary"
        style={{
          width: particle.size,
          height: particle.size,
          top: particle.top,
          left: particle.left,
          opacity: 0.3,
          boxShadow: '0 0 10px rgba(219,168,0,0.35)',
          animation: `particleFloat ${particle.dur}s ease-in-out ${particle.delay}s infinite`,
        }}
      />
    ))}
  </div>

  {/* ══════════════════════════════════════════════════════════════════
      SECTION EDGE TRANSITIONS
      Keeps this section visually connected to the hero and next section.
  ══════════════════════════════════════════════════════════════════ */}

  <div
    aria-hidden="true"
    className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
    style={{
      background:
        'linear-gradient(to bottom, #020202 0%, rgba(2,2,2,0.65) 35%, transparent 100%)',
    }}
  />

  <div
    aria-hidden="true"
    className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
    style={{
      background:
        'linear-gradient(to top, #020202 0%, rgba(2,2,2,0.75) 38%, transparent 100%)',
    }}
  />

  {/* ══════════════════════════════════════════════════════════════════
      CONTENT
  ══════════════════════════════════════════════════════════════════ */}
  <div
    ref={section2.ref}
    className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44"
  >
    <div className="flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-24">

      {/* ══════════════════════════════════════════════════════════════
          LEFT — PRODUCT VISUAL
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
        <div
          className={cn(
            'relative w-[420px] max-w-full h-[380px]',
            'transition-all duration-1000 ease-out',
            section2.inView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20',
          )}
        >

          {/* Product-centered atmospheric halo */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 pointer-events-none rounded-full"
            style={{
              width: 380,
              height: 280,
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(ellipse, rgba(219,168,0,0.095) 0%, rgba(219,168,0,0.035) 45%, transparent 72%)',
              filter: 'blur(28px)',
              opacity: section2.inView ? 1 : 0,
              transition: 'opacity 1.5s ease',
            }}
          />

          {/* Fine orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2].map((ring) => (
              <div
                key={ring}
                className="absolute rounded-full"
                style={{
                  width: `${300 + ring * 80}px`,
                  height: `${220 + ring * 55}px`,
                  border: '1px solid rgba(219,168,0,0.065)',
                  boxShadow:
                    ring === 1
                      ? '0 0 40px rgba(219,168,0,0.025)'
                      : 'none',
                  animation: section2.inView
                    ? `pulseRing ${4 + ring}s ease-out ${ring * 0.7}s infinite`
                    : 'none',
                }}
              />
            ))}
          </div>

          {/* Product card */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: section2.inView
                ? 'floatCard 6s ease-in-out infinite'
                : 'none',
            }}
          >
            <TetherHubCard />
          </div>

          {/* ══════════════════════════════════════════════════════════
              FLOATING PRODUCT METRICS
          ══════════════════════════════════════════════════════════ */}

          {/* Instant issuance */}
          <div
            className={cn(
              'absolute top-8 right-[-8px] sm:right-[-24px] z-30',
              'flex items-center gap-2.5 px-3.5 py-2.5',
              'rounded-xl border border-white/[0.08]',
              'bg-[#080808]/85 backdrop-blur-xl',
              'shadow-[0_12px_40px_rgba(0,0,0,0.45)]',
              'transition-all duration-700 ease-out',
              section2.inView
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-95',
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
              <Zap size={12} className="text-primary" />
            </div>

            <div>
              <p className="text-foreground text-[11px] font-bold leading-none">
                Instant issuance
              </p>
              <p className="text-muted-foreground/45 text-[9px] font-semibold mt-1">
                Ready in seconds
              </p>
            </div>
          </div>

          {/* Security */}
          <div
            className={cn(
              'absolute bottom-8 left-[-8px] sm:left-[-24px] z-30',
              'flex items-center gap-2.5 px-3.5 py-2.5',
              'rounded-xl border border-white/[0.08]',
              'bg-[#080808]/85 backdrop-blur-xl',
              'shadow-[0_12px_40px_rgba(0,0,0,0.45)]',
              'transition-all duration-700 ease-out',
              section2.inView
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-95',
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
              <Lock size={12} className="text-primary" />
            </div>

            <div>
              <p className="text-foreground text-[11px] font-black leading-none">
                AES-256
              </p>
              <p className="text-muted-foreground/45 text-[9px] font-semibold mt-1">
                End-to-end encrypted
              </p>
            </div>
          </div>

          {/* Balance */}
          <div
            className={cn(
              'absolute bottom-3 right-[-8px] sm:right-[-20px] z-30',
              'flex items-center gap-2 px-3 py-2',
              'rounded-lg border border-white/[0.07]',
              'bg-[#080808]/80 backdrop-blur-xl',
              'shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
              'transition-all duration-700 ease-out',
              section2.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3',
            )}
            style={{ transitionDelay: '750ms' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>

            <span className="text-muted-foreground/50 text-[10px] font-semibold">
              Balance
            </span>

            <span className="text-foreground text-xs font-mono font-bold">
              $4,820.00
            </span>
          </div>

          {/* Interaction hint */}
          <p
            className={cn(
              'absolute bottom-[-28px] left-0 right-0',
              'text-center text-[9px] tracking-[0.18em]',
              'uppercase text-muted-foreground/25 font-bold',
              'transition-opacity duration-700',
              section2.inView ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transitionDelay: '1000ms' }}
          >
            Hover to explore
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RIGHT — EDITORIAL CONTENT
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:flex-1 max-w-xl order-1 lg:order-2">
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-150',
            section2.inView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-16',
          )}
        >

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-primary/60" />

            <span className="text-primary/80 text-[10px] font-black uppercase tracking-[0.2em]">
              Smart Payments
            </span>

            <span className="w-1 h-1 rounded-full bg-primary/40" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.04em] leading-[1.04] text-foreground mb-6">
            One card for
            <br />

            <span
              className="inline-block"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary) 0%, #FFF3B3 42%, #FFFCE6 68%, var(--primary) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: section2.inView
                  ? 'shimmerText 4s linear infinite'
                  : 'none',
              }}
            >
              everything you need.
            </span>
          </h2>

          {/* Supporting copy */}
          <p className="text-muted-foreground/65 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
            A smarter way to move money. Create your virtual card instantly,
            spend across currencies, and stay in control of every transaction
            from one secure platform.
          </p>

          {/* Feature stack */}
          <div className="space-y-2.5 mb-10">
            {[
              {
                icon: Zap,
                title: 'Instant virtual card issuance',
                desc: 'Create your card in seconds with no paperwork.',
              },
              {
                icon: Globe,
                title: 'Multi-currency spending',
                desc: 'Move between AFN and USD with effortless control.',
              },
              {
                icon: Activity,
                title: 'Real-time transaction alerts',
                desc: 'Know exactly when money moves, instantly.',
              },
              {
                icon: Lock,
                title: 'Complete card control',
                desc: 'Freeze or unfreeze your card whenever you need.',
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={cn(
                    'group flex items-center gap-4',
                    'px-4 py-3.5 rounded-xl',
                    'border border-white/[0.055]',
                    'bg-white/[0.012]',
                    'transition-all duration-500 ease-out',
                    'hover:bg-white/[0.025]',
                    'hover:border-primary/15',
                    'hover:-translate-y-0.5',
                    section2.inView
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8',
                  )}
                  style={{
                    transitionDelay: `${300 + i * 90}ms`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex-shrink-0',
                      'flex items-center justify-center',
                      'border border-primary/10',
                      'bg-primary/[0.045]',
                      'transition-all duration-300',
                      'group-hover:bg-primary/[0.08]',
                      'group-hover:border-primary/20',
                    )}
                  >
                    <Icon
                      size={15}
                      className="text-primary"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-bold leading-tight">
                      {item.title}
                    </p>

                    <p className="text-muted-foreground/40 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Status */}
                  <CheckCircle
                    size={14}
                    className="text-primary/60 flex-shrink-0"
                  />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
            <Link href="/auth/register">
              <button
                className={cn(
                  'relative h-12 px-7 rounded-xl',
                  'flex items-center justify-center gap-2',
                  'text-sm font-extrabold',
                  'text-primary-foreground',
                  'bg-primary',
                  'overflow-hidden',
                  'transition-all duration-300',
                  'hover:-translate-y-0.5',
                  'hover:shadow-[0_12px_35px_rgba(219,168,0,0.16)]',
                  'focus:outline-none',
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Your Card
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>

                <div
                  className="absolute inset-0 bg-white/10
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-500
                    skew-x-12 pointer-events-none"
                />
              </button>
            </Link>

            <a href="#features">
              <button
                className="
                  h-12 px-7 rounded-xl
                  text-sm font-bold
                  text-muted-foreground/70
                  border border-white/[0.07]
                  bg-white/[0.015]
                  transition-all duration-300
                  hover:text-foreground
                  hover:bg-white/[0.035]
                  hover:border-white/[0.12]
                  focus:outline-none
                "
              >
                Explore features
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 {/* ═══════════════════════════════════════════════════════════════════════
    SECTION 3 — LIVE MARKETS / TRADING TERMINAL
    Premium pitch-black financial interface
═══════════════════════════════════════════════════════════════════════ */}
<section className="relative z-10 py-28 sm:py-40 overflow-hidden bg-[#020202]">

  {/* ═══════════════════════════════════════════════════════════════════
      ATMOSPHERIC BACKGROUND SYSTEM
  ═══════════════════════════════════════════════════════════════════ */}

  {/* Core pitch-black canvas */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(
          ellipse 85% 70% at 72% 42%,
          rgba(219,168,0,0.055) 0%,
          rgba(219,168,0,0.018) 32%,
          transparent 68%
        ),
        radial-gradient(
          ellipse 65% 80% at 12% 65%,
          rgba(59,130,246,0.018) 0%,
          transparent 60%
        ),
        linear-gradient(
          180deg,
          #020202 0%,
          #030303 48%,
          #020202 100%
        )
      `,
    }}
  />

  {/* Large focused gold spotlight behind trading interface */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none rounded-full"
    style={{
      width: 850,
      height: 850,
      top: '12%',
      right: '-20%',
      background:
        'radial-gradient(circle, rgba(219,168,0,0.065) 0%, rgba(219,168,0,0.025) 28%, transparent 68%)',
      filter: 'blur(70px)',
      animation: 'orbFloat1 18s ease-in-out infinite',
    }}
  />

  {/* Secondary cool ambient light */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none rounded-full"
    style={{
      width: 500,
      height: 500,
      bottom: '8%',
      left: '-12%',
      background:
        'radial-gradient(circle, rgba(59,130,246,0.025) 0%, transparent 70%)',
      filter: 'blur(80px)',
      animation: 'orbFloat2 16s ease-in-out infinite',
    }}
  />

  {/* Small central gold spotlight */}
  <div
    aria-hidden="true"
    className="absolute pointer-events-none rounded-full"
    style={{
      width: 320,
      height: 320,
      top: '48%',
      left: '48%',
      transform: 'translate(-50%, -50%)',
      background:
        'radial-gradient(circle, rgba(219,168,0,0.035) 0%, transparent 70%)',
      filter: 'blur(60px)',
      animation: 'orbFloat3 12s ease-in-out infinite',
    }}
  />

  {/* ═══════════════════════════════════════════════════════════════════
      SUBTLE MARKET GRID
  ═══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none opacity-[0.025]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
      `,
      backgroundSize: '72px 72px',
      maskImage:
        'linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)',
      WebkitMaskImage:
        'linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)',
    }}
  />

  {/* ═══════════════════════════════════════════════════════════════════
      MARKET TRAJECTORY LINES
  ═══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >
    <svg
      className="absolute w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {/* Primary rising market trajectory */}
      <path
        d="M-100 720
           C160 680 250 590 420 620
           C600 650 690 470 850 500
           C1040 535 1120 350 1540 270"
        stroke="var(--primary)"
        strokeWidth="1"
        opacity="0.055"
      />

      {/* Secondary trajectory */}
      <path
        d="M-100 560
           C180 500 300 470 480 500
           C690 535 770 360 960 390
           C1140 420 1270 260 1540 220"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.8"
        opacity="0.025"
      />

      {/* Minimal circuit-style line */}
      <path
        d="M0 780
           H280
           V690
           H520
           V730
           H760
           V620
           H1020
           V540
           H1280
           V470
           H1440"
        stroke="var(--primary)"
        strokeWidth="0.8"
        opacity="0.035"
      />

      {/* Market data nodes */}
      {[
        [280, 680],
        [520, 720],
        [760, 610],
        [1020, 530],
        [1280, 460],
      ].map(([cx, cy], i) => (
        <g key={`market-node-${i}`}>
          <circle
            cx={cx}
            cy={cy}
            r="3"
            fill="var(--primary)"
            opacity="0.12"
          />
          <circle
            cx={cx}
            cy={cy}
            r="8"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.6"
            opacity="0.05"
          />
        </g>
      ))}
    </svg>
  </div>

  {/* ═══════════════════════════════════════════════════════════════════
      FLOATING ATMOSPHERIC PARTICLES
  ═══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >
    {[
      { size: 2, top: '14%', left: '8%', delay: 0, dur: 8 },
      { size: 3, top: '28%', left: '92%', delay: 1.2, dur: 7 },
      { size: 2, top: '62%', left: '7%', delay: 2, dur: 9 },
      { size: 2, top: '76%', left: '87%', delay: 0.5, dur: 8 },
      { size: 3, top: '44%', left: '54%', delay: 1.8, dur: 7 },
      { size: 2, top: '88%', left: '42%', delay: 2.4, dur: 10 },
    ].map((p, i) => (
      <div
        key={`section3-particle-${i}`}
        className="absolute rounded-full bg-primary"
        style={{
          width: p.size,
          height: p.size,
          top: p.top,
          left: p.left,
          opacity: 0.25,
          filter: 'blur(0.5px)',
          boxShadow: '0 0 12px rgba(219,168,0,0.35)',
          animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }}
      />
    ))}
  </div>

  {/* ═══════════════════════════════════════════════════════════════════
      EDGE ATMOSPHERE
  ═══════════════════════════════════════════════════════════════════ */}

  {/* Top fade */}
  <div
    aria-hidden="true"
    className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
    style={{
      background:
        'linear-gradient(to bottom, #020202 0%, rgba(2,2,2,0.75) 35%, transparent 100%)',
    }}
  />

  {/* Bottom fade */}
  <div
    aria-hidden="true"
    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
    style={{
      background:
        'linear-gradient(to top, #020202 0%, rgba(2,2,2,0.75) 35%, transparent 100%)',
    }}
  />

  {/* Left fade */}
  <div
    aria-hidden="true"
    className="absolute inset-y-0 left-0 w-32 pointer-events-none"
    style={{
      background:
        'linear-gradient(to right, #020202 0%, rgba(2,2,2,0.65) 35%, transparent 100%)',
    }}
  />

  {/* Right fade */}
  <div
    aria-hidden="true"
    className="absolute inset-y-0 right-0 w-32 pointer-events-none"
    style={{
      background:
        'linear-gradient(to left, #020202 0%, rgba(2,2,2,0.65) 35%, transparent 100%)',
    }}
  />

  {/* ═══════════════════════════════════════════════════════════════════
      CONTENT
  ═══════════════════════════════════════════════════════════════════ */}
  <div
    ref={section3.ref}
    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >

    {/* ═══════════════════════════════════════════════════════════════
        SECTION HEADER
    ═══════════════════════════════════════════════════════════════ */}
    <div
      className={cn(
        'relative text-center mb-16 sm:mb-20 transition-all duration-1000 ease-out',
        section3.inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8',
      )}
    >
      {/* Header spotlight */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 220,
          background:
            'radial-gradient(ellipse, rgba(219,168,0,0.07) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      <div className="relative">

        {/* Live market indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-primary/[0.07] border border-primary/15 backdrop-blur-xl shadow-[0_0_30px_rgba(219,168,0,0.04)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>

          <TrendingUp
            size={11}
            className="text-primary"
          />

          <span className="text-primary text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em]">
            Live Markets · Real-time Data
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] mb-6 leading-[1.04] text-foreground">
          <span className="block">
            Trade crypto
          </span>

          <span
            className="inline-block px-4 py-2 -mx-4 -my-2"
            style={{
              background:
                'linear-gradient(135deg, var(--primary) 0%, #FFF3B3 38%, #FFFCE6 62%, var(--primary) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: section3.inView
                ? 'shimmerText 4s linear infinite'
                : 'none',
            }}
          >
            with confidence
          </span>
        </h2>

        <p className="text-muted-foreground/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Professional-grade trading tools with a simpler experience.
          Monitor markets, manage your portfolio, and execute trades from
          one secure platform built for modern digital finance.
        </p>
      </div>
    </div>

    {/* ═══════════════════════════════════════════════════════════════
        MAIN TRADING INTERFACE
    ═══════════════════════════════════════════════════════════════ */}
    <div className="flex flex-col xl:flex-row items-start gap-8 lg:gap-10">

      {/* ═════════════════════════════════════════════════════════════
          LEFT — TRADING TERMINAL
      ═════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          'w-full xl:w-[58%] transition-all duration-1000 ease-out',
          section3.inView
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-16',
        )}
      >
        {/* Outer ambient glow */}
        <div className="relative">

          <div
            aria-hidden="true"
            className="absolute -inset-8 pointer-events-none rounded-[2rem]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(219,168,0,0.055) 0%, transparent 68%)',
              filter: 'blur(35px)',
            }}
          />

          {/* Terminal shell */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#050505]/95 backdrop-blur-2xl"
            style={{
              boxShadow: `
                0 40px 100px rgba(0,0,0,0.65),
                0 0 0 1px rgba(255,255,255,0.015),
                inset 0 1px 0 rgba(255,255,255,0.035)
              `,
            }}
          >

            {/* Gold top accent light */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-[12%] right-[12%] h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(219,168,0,0.35), transparent)',
                boxShadow: '0 0 18px rgba(219,168,0,0.18)',
              }}
            />

            {/* Terminal toolbar */}
            <div className="px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-white/[0.05] bg-white/[0.012]">

              <div className="flex items-center gap-3 select-none">

                {/* Window controls */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-400/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/50 border border-primary/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/40 border border-emerald-400/10" />
                </div>

                <div className="w-px h-4 bg-white/[0.07]" />

                <div className="flex items-center gap-2">
                  <Activity
                    size={12}
                    className="text-primary"
                  />

                  <span className="text-muted-foreground/45 text-[10px] sm:text-xs font-mono font-bold tracking-tight">
                    AtlasPay://markets/live
                  </span>
                </div>
              </div>

              {/* Live status */}
              <div className="flex items-center gap-3 select-none">

                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/[0.05] border border-primary/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />

                  <span className="text-primary text-[9px] font-black uppercase tracking-[0.14em]">
                    Live
                  </span>
                </div>

                <span className="hidden sm:block text-muted-foreground/25 text-[9px] font-mono font-bold">
                  UPDATED JUST NOW
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-3 sm:p-4">

              {/* Portfolio overview card */}
              <div
                className={cn(
                  'relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/[0.055] via-transparent to-transparent mb-4 transition-all duration-700',
                  section3.inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4',
                )}
                style={{
                  transitionDelay: '100ms',
                }}
              >

                {/* Internal spotlight */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(219,168,0,0.08), transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                <div className="relative text-left">
                  <p className="text-muted-foreground/35 text-[9px] font-black uppercase tracking-[0.16em] mb-1">
                    Total Portfolio Value
                  </p>

                  <p className="text-foreground text-xl sm:text-2xl font-bold font-mono tracking-tight">
                    $12,
                    <span className="text-primary font-black">
                      482
                    </span>
                    <span className="text-muted-foreground/50 text-base font-medium">
                      .50
                    </span>
                  </p>
                </div>

                <div className="relative flex items-center gap-5 sm:gap-7">

                  <div className="hidden sm:block text-right">
                    <p className="text-muted-foreground/30 text-[8px] font-black uppercase tracking-[0.14em] mb-1">
                      24h P&L
                    </p>

                    <p className="text-success text-sm font-bold font-mono">
                      +$968.20
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-muted-foreground/30 text-[8px] font-black uppercase tracking-[0.14em] mb-1">
                      Change
                    </p>

                    <div className="flex items-center gap-1.5">
                      <TrendingUp
                        size={11}
                        className="text-success"
                      />

                      <span className="text-success text-sm font-bold font-mono">
                        +8.4%
                      </span>
                    </div>
                  </div>

                  <Link href="/auth/register">
                    <button
                      className="px-4 py-2 rounded-lg text-primary-foreground text-[10px] font-black uppercase tracking-wider bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/10 cursor-pointer"
                    >
                      Trade
                    </button>
                  </Link>
                </div>
              </div>

              {/* Market table header */}
              <div
                className={cn(
                  'grid items-center px-4 pb-2.5 transition-all duration-500',
                  section3.inView
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
                style={{
                  gridTemplateColumns:
                    '20px 36px minmax(100px,1fr) 80px 80px 60px',
                  gap: '12px',
                  transitionDelay: '150ms',
                }}
              >
                <span className="text-[8px] text-muted-foreground/20 font-black uppercase tracking-wider">
                  #
                </span>

                <span className="col-span-2 text-[8px] text-muted-foreground/20 font-black uppercase tracking-wider">
                  Asset
                </span>

                <span className="text-[8px] text-muted-foreground/20 font-black uppercase tracking-wider text-right hidden sm:block">
                  Chart
                </span>

                <span className="text-[8px] text-muted-foreground/20 font-black uppercase tracking-wider text-right">
                  Price
                </span>

                <span className="text-[8px] text-muted-foreground/20 font-black uppercase tracking-wider text-right hidden lg:block">
                  Volume
                </span>
              </div>

              {/* Asset rows */}
              <div className="space-y-1.5">
                {terminalCoins.map((coin) => (
                  <TerminalCoinRow
                    key={coin.symbol}
                    {...coin}
                    inView={section3.inView}
                  />
                ))}
              </div>

              {/* Terminal footer */}
              <div
                className={cn(
                  'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/[0.05] transition-all duration-500',
                  section3.inView
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
                style={{
                  transitionDelay: '600ms',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success/70" />

                  <span className="text-muted-foreground/25 text-[9px] font-mono font-bold">
                    MARKET DATA · UPDATED IN REAL-TIME
                  </span>
                </div>

                <Link href="/auth/register">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-primary bg-primary/[0.06] border border-primary/10 hover:bg-primary/[0.12] transition-all duration-200 cursor-pointer"
                  >
                    View all markets
                    <ChevronRight size={10} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          RIGHT — TRADING WIDGET STACK
      ═════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          'w-full xl:w-[42%] flex flex-col gap-4 transition-all duration-1000 ease-out delay-200',
          section3.inView
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-16',
        )}
      >

        {/* Quick Trade */}
        <QuickTradeWidget
          inView={section3.inView}
        />

        {/* Allocation */}
        <AllocationRing
          inView={section3.inView}
        />

        {/* Order Book */}
        <OrderBookMini
          inView={section3.inView}
        />

        {/* Trust metrics */}
        <div
          className={cn(
            'grid grid-cols-3 gap-2.5 transition-all duration-700 ease-out',
            section3.inView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8',
          )}
          style={{
            transitionDelay: '850ms',
          }}
        >
          {[
            {
              icon: Shield,
              label: 'Audited',
              sub: 'Smart contracts',
              color: 'var(--success)',
              rgb: '14, 203, 129',
            },
            {
              icon: Lock,
              label: 'Secured',
              sub: 'AES-256 vault',
              color: 'var(--secondary)',
              rgb: '59, 130, 246',
            },
            {
              icon: Zap,
              label: 'Fast',
              sub: 'Sub-3s trades',
              color: 'var(--primary)',
              rgb: '219, 168, 0',
            },
          ].map((b) => (
            <div
              key={b.label}
              className="relative overflow-hidden flex flex-col items-center gap-1.5 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl text-center transition-all duration-300 hover:bg-white/[0.025] hover:border-white/[0.09]"
            >
              {/* Tiny card spotlight */}
              <div
                aria-hidden="true"
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(${b.rgb},0.08), transparent 70%)`,
                  filter: 'blur(12px)',
                }}
              />

              <div
                className="relative w-8 h-8 rounded-lg border flex items-center justify-center"
                style={{
                  background: `rgba(${b.rgb}, 0.06)`,
                  borderColor: `rgba(${b.rgb}, 0.14)`,
                }}
              >
                <b.icon
                  size={14}
                  style={{
                    color: b.color,
                  }}
                />
              </div>

              <p className="text-foreground text-[11px] font-bold leading-tight mt-1">
                {b.label}
              </p>

              <p className="text-muted-foreground/30 text-[8px] font-bold leading-none">
                {b.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div
          className={cn(
            'transition-all duration-700 ease-out',
            section3.inView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8',
          )}
          style={{
            transitionDelay: '950ms',
          }}
        >
          <Link href="/auth/register">
            <button
              className="relative w-full py-3.5 rounded-xl text-sm font-black text-primary-foreground overflow-hidden group transition-all duration-300 bg-primary hover:bg-primary/95 shadow-[0_12px_40px_rgba(219,168,0,0.10)] hover:shadow-[0_16px_50px_rgba(219,168,0,0.18)] hover:-translate-y-0.5 cursor-pointer focus:outline-none"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 40px rgba(219,168,0,0.10)',
              }}
            >
              {/* Animated shine */}
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Trading Free
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </button>
          </Link>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-1 h-1 rounded-full bg-primary/50" />

            <p className="text-center text-muted-foreground/25 text-[9px] font-bold uppercase tracking-[0.12em]">
              No credit card · Instant setup · 50K+ active traders
            </p>

            <span className="w-1 h-1 rounded-full bg-primary/50" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════════════════════════════════════════════════════════
    SECTION 4 — PLATFORM CORE FEATURES
    Pitch-black atmospheric environment + localized spotlights
═══════════════════════════════════════════════════════════════════════ */}
<section
  id="features"
  className="relative z-10 py-24 sm:py-32 overflow-hidden bg-[#000000] text-foreground"
>
  {/* ═══════════════════════════════════════════════════════════════════
      ATMOSPHERIC BACKGROUND
  ═══════════════════════════════════════════════════════════════════ */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >
    {/* ── Top-center gold spotlight ── */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: 900,
        height: 500,
        top: -300,
        left: '50%',
        transform: 'translateX(-50%)',
        background:
          'radial-gradient(ellipse at center, rgba(219,168,0,0.10) 0%, rgba(219,168,0,0.045) 28%, rgba(219,168,0,0.012) 55%, transparent 75%)',
        filter: 'blur(45px)',
      }}
    />

    {/* ── Left warm ambient light ── */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: 650,
        height: 750,
        top: '15%',
        left: '-25%',
        background:
          'radial-gradient(circle, rgba(219,168,0,0.055) 0%, rgba(219,168,0,0.018) 40%, transparent 72%)',
        filter: 'blur(80px)',
      }}
    />

    {/* ── Right warm ambient light ── */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: 650,
        height: 750,
        top: '45%',
        right: '-25%',
        background:
          'radial-gradient(circle, rgba(219,168,0,0.05) 0%, rgba(219,168,0,0.015) 42%, transparent 72%)',
        filter: 'blur(85px)',
      }}
    />

    {/* ── Central soft atmospheric glow ── */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: 700,
        height: 500,
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'radial-gradient(ellipse, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.006) 40%, transparent 72%)',
        filter: 'blur(60px)',
      }}
    />

    {/* ═══════════════════════════════════════════════════════════════
        TECHNICAL GRID
    ═══════════════════════════════════════════════════════════════ */}
    <div
      className="absolute inset-0"
      style={{
        opacity: 0.035,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    />

    {/* ═══════════════════════════════════════════════════════════════
        LOCALIZED CARD-AREA LIGHT
        Gives the feature matrix a subtle visual stage
    ═══════════════════════════════════════════════════════════════ */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: '85%',
        height: 600,
        top: '28%',
        left: '7.5%',
        background:
          'radial-gradient(ellipse at center, rgba(219,168,0,0.018) 0%, transparent 68%)',
        filter: 'blur(50px)',
      }}
    />

    {/* ── Top transition fade ── */}
    <div
      className="absolute top-0 left-0 right-0 h-40"
      style={{
        background:
          'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.65) 35%, transparent 100%)',
      }}
    />

    {/* ── Bottom transition fade ── */}
    <div
      className="absolute bottom-0 left-0 right-0 h-40"
      style={{
        background:
          'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.65) 35%, transparent 100%)',
      }}
    />
  </div>

  {/* ═══════════════════════════════════════════════════════════════════
      CONTENT
  ═══════════════════════════════════════════════════════════════════ */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* ═════════════════════════════════════════════════════════════════
        HEADER
    ═════════════════════════════════════════════════════════════════ */}
    <div
      ref={featuresSection.ref}
      className={cn(
        'text-center mb-16 select-none',
        'transition-all duration-700 ease-out',
        // IMPORTANT:
        // Do not keep the entire section invisible if IntersectionObserver
        // has not fired.
        featuresSection.inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-100 translate-y-0',
      )}
    >
      {/* Badge */}
      <Badge
        variant="secondary"
        className="mb-5 text-xs inline-flex bg-primary/10 border border-primary/20 text-primary"
      >
        <Zap size={12} className="text-primary mr-1.5" />
        Platform Features
      </Badge>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-5">
        Everything you need
      </h2>

      {/* Description */}
      <p className="text-muted-foreground/75 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
        A complete crypto platform built for Afghanistan — from wallets to
        trading to instant transfers.
      </p>
    </div>

    {/* ═════════════════════════════════════════════════════════════════
        FEATURE MATRIX
    ═════════════════════════════════════════════════════════════════ */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={cn(
            'relative',
            'transition-all duration-700 ease-out',
            // Keep cards visible regardless of observer timing.
            featuresSection.inView
              ? 'opacity-100 translate-y-0'
              : 'opacity-100 translate-y-0',
          )}
          style={{
            transitionDelay: `${i * 80}ms`,
          }}
        >
          <SpotlightCard
            spotlightColor={
              featureSpotlightColors[
                i % featureSpotlightColors.length
              ]
            }
            className="h-full"
          >
            <div
              className="
                group
                relative
                h-full
                min-h-[230px]
                flex
                flex-col
                p-6
                rounded-xl
                overflow-hidden

                bg-[#090909]
                border
                border-white/[0.10]

                shadow-[0_20px_70px_rgba(0,0,0,0.55)]

                transition-all
                duration-300

                hover:bg-[#0D0D0D]
                hover:border-primary/30
                hover:shadow-[0_20px_80px_rgba(219,168,0,0.06)]
              "
            >
              {/* ═══════════════════════════════════════════════════
                  CARD LOCALIZED SPOTLIGHT
              ═══════════════════════════════════════════════════ */}
              <div
                className="
                  absolute
                  pointer-events-none
                  -top-32
                  left-1/2
                  w-64
                  h-64
                  -translate-x-1/2
                  rounded-full
                  opacity-60
                  blur-3xl
                "
                style={{
                  background:
                    'radial-gradient(circle, rgba(219,168,0,0.055) 0%, transparent 70%)',
                }}
              />

              {/* ═══════════════════════════════════════════════════
                  CARD TOP EDGE LIGHT
              ═══════════════════════════════════════════════════ */}
              <div
                className="
                  absolute
                  top-0
                  left-[12%]
                  right-[12%]
                  h-px
                  opacity-40
                "
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(219,168,0,0.35), transparent)',
                }}
              />

              {/* ═══════════════════════════════════════════════════
                  ICON
              ═══════════════════════════════════════════════════ */}
              <div
                className="
                  relative
                  z-10
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-6

                  bg-primary/[0.07]
                  border
                  border-primary/[0.16]
                  text-primary

                  shadow-[0_0_30px_rgba(219,168,0,0.05)]

                  group-hover:bg-primary/[0.11]
                  group-hover:border-primary/30
                  group-hover:scale-105

                  transition-all
                  duration-300
                "
              >
                <f.icon size={21} />
              </div>

              {/* ═══════════════════════════════════════════════════
                  CONTENT
              ═══════════════════════════════════════════════════ */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3
                  className="
                    text-base
                    font-bold
                    text-foreground
                    mb-2
                    tracking-tight
                    group-hover:text-primary
                    transition-colors
                    duration-200
                  "
                >
                  {f.title}
                </h3>

                <p
                  className="
                    text-sm
                    text-muted-foreground/70
                    leading-relaxed
                    flex-1
                    font-medium
                  "
                >
                  {f.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="
                    mt-6
                    h-px
                    w-0
                    group-hover:w-full
                    transition-all
                    duration-500
                    ease-out
                    rounded-full
                    bg-gradient-to-r
                    from-transparent
                    via-primary/40
                    to-transparent
                  "
                />
              </div>
            </div>
          </SpotlightCard>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ═══════════════════════════════════════════════════════════════════════
    STATS — Keep the dark environment continuous
═══════════════════════════════════════════════════════════════════════ */}
<div className="relative z-10 bg-[#030303] overflow-hidden">

  {/* Ambient transition light */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
    style={{
      width: 700,
      height: 250,
      background:
        'radial-gradient(ellipse, rgba(219,168,0,0.045) 0%, transparent 70%)',
      filter: 'blur(50px)',
    }}
  />

  {/* Section divider */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px"
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(219,168,0,0.15), transparent)',
    }}
  />

  <StatsSection />
</div>


{/* ═══════════════════════════════════════════════════════════════════════
    SECTION 5 — SECURITY
═══════════════════════════════════════════════════════════════════════ */}
<section
  id="security"
  className="relative z-10 py-24 sm:py-32 overflow-hidden bg-[#030303]"
>
  {/* ── Background atmosphere ── */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    {/* Main security spotlight */}
    <div
      className="absolute rounded-full"
      style={{
        width: 850,
        height: 500,
        top: -250,
        left: '50%',
        transform: 'translateX(-50%)',
        background:
          'radial-gradient(ellipse, rgba(219,168,0,0.06) 0%, rgba(219,168,0,0.018) 40%, transparent 72%)',
        filter: 'blur(50px)',
      }}
    />

    {/* Left gold light */}
    <div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        top: '30%',
        left: '-18%',
        background:
          'radial-gradient(circle, rgba(219,168,0,0.035) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
    />

    {/* Right blue security light */}
    <div
      className="absolute rounded-full"
      style={{
        width: 450,
        height: 550,
        bottom: '5%',
        right: '-15%',
        background:
          'radial-gradient(circle, rgba(59,130,246,0.025) 0%, transparent 70%)',
        filter: 'blur(75px)',
      }}
    />

    {/* Technical grid */}
    <div
      className="absolute inset-0"
      style={{
        opacity: 0.02,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage:
          'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    />

    {/* Top fade */}
    <div
      className="absolute top-0 left-0 right-0 h-32"
      style={{
        background:
          'linear-gradient(to bottom, #030303, transparent)',
      }}
    />

    {/* Bottom fade */}
    <div
      className="absolute bottom-0 left-0 right-0 h-32"
      style={{
        background:
          'linear-gradient(to top, #030303, transparent)',
      }}
    />
  </div>

  {/* ── Content ── */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Security header */}
    <div className="text-center mb-16 select-none">

      <Badge
        variant="secondary"
        className="
          mb-5
          text-xs
          inline-flex
          bg-primary/10
          border border-primary/20
          text-primary
        "
      >
        <Shield size={12} className="text-primary mr-1.5" />
        Security First
      </Badge>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-5">
        Built to protect your assets
      </h2>

      <p className="text-muted-foreground/75 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
        Multi-layered security infrastructure designed to keep your crypto
        safe — no compromises.
      </p>
    </div>

    {/* Security cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {securityFeatures.map((f, i) => (
        <SpotlightCard
          key={f.title}
          spotlightColor="rgba(219, 168, 0, 0.07)"
        >
          <div
            className="
              group relative
              flex items-start gap-5
              p-6
              min-h-[150px]
              rounded-xl
              overflow-hidden
              bg-[#0A0A0A]
              border border-white/[0.08]
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              hover:bg-[#0D0D0D]
              hover:border-primary/20
              transition-all duration-300
            "
          >
            {/* Localized card glow */}
            <div
              className="
                absolute
                -top-20 -left-20
                w-48 h-48
                rounded-full
                bg-primary/[0.035]
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-500
                pointer-events-none
              "
            />

            {/* Icon */}
            <div
              className="
                relative z-10
                w-11 h-11
                rounded-xl
                bg-primary/[0.07]
                border border-primary/[0.15]
                flex items-center justify-center
                shrink-0
                text-primary
                group-hover:bg-primary/[0.11]
                group-hover:border-primary/25
                transition-all duration-300
              "
            >
              <f.icon size={18} />
            </div>

            {/* Text */}
            <div className="relative z-10 text-left">
              <h3
                className="
                  font-bold
                  text-foreground
                  mb-2
                  tracking-tight
                  group-hover:text-primary
                  transition-colors duration-200
                "
              >
                {f.title}
              </h3>

              <p
                className="
                  text-sm
                  text-muted-foreground/65
                  leading-relaxed
                  font-medium
                "
              >
                {f.description}
              </p>
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  </div>
</section>
      {/* ══ TESTIMONIAL COROUSEL SECTION LAYER ════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══ CORPORATE SYNCED FOOTER SECTION LAYER ═════════════════════════════════ */}
      <Footer />

      {/* ── Mobile Drawer Layout Overlay Module ── */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navLinks}
        megaItems={navMegaItems}
      />

      {/* ── Optimized Hardware Performance Keyframe Animations Styles ── */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-12px) rotate(0.6deg); }
          66%      { transform: translateY(-6px) rotate(-0.4deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.85); opacity: 0.5; }
          70%  { transform: scale(1.4);  opacity: 0;   }
          100% { transform: scale(1.4);  opacity: 0;   }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(-30px, 20px) scale(1.05); }
          66%     { transform: translate(20px,-15px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(25px,-30px) scale(1.08); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0,0); }
          50%     { transform: translate(-20px,25px); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80%     { transform: translateY(12px); opacity: 0; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) scale(1);   opacity: 0.5; }
          33%     { transform: translateY(-18px) scale(1.1); opacity: 0.8; }
          66%     { transform: translateY(-8px) scale(0.95); opacity: 0.3; }
        }
        @keyframes sec2BlobA {
          0%, 100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(40px,-30px) scale(1.08); }
          70%     { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes sec2BlobB {
          0%, 100% { transform: translate(0,0); }
          50%     { transform: translate(-35px,-25px) scale(1.06); }
        }
        @keyframes sec2BlobC {
          0%, 100% { transform: translate(0,0); }
          50%     { transform: translate(25px,-30px); }
        }
      `}</style>
    </div>
  );
}

