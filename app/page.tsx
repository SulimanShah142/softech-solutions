'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
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
  Heart,
  ChevronDown,
  ShieldCheck,
  Globe2,
  Cpu,
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers3,
  Network,
  BrainCircuit,
  Blocks,
  CloudCog,
  Workflow,
  ArrowDownRight,
  MonitorSmartphone,
  Bot,
  BriefcaseBusiness,
  Rocket,
  Target,
  DatabaseZap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SiteNavbar from "@/components/site-navbar";
import ComputerScene from "@/components/ComputerScene";
import LaserFlow from "@/components/LaserFlow";
import EngineeringSection from '@/components/EngineeringSection';
import CapabilitiesSection from '@/components/capabilities/CapabilitiesSection';
import ContactSection from '@/components/contact/ContactSection';
import WorkAboutSections from '@/components/WorkAboutSections';
import {
  SITE_LANGUAGE_CHANGE_EVENT,
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  type SiteLanguage,
} from '@/lib/site-language';
import TechnologySection from '@/components/TechnologySection';

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



const technologyServiceIcons = [
  BrainCircuit,
  Code2,
  Blocks,
  CloudCog,
] as const;

const technologyServiceAccents = [
  {
    icon: "border-blue-300/20 bg-blue-300/[0.07] text-blue-200",
    line: "via-blue-200/60",
    rule: "bg-blue-200/60",
    glow: "bg-blue-400/[0.07] group-hover:bg-blue-400/[0.13]",
    hover: "hover:border-blue-300/30",
    tag: "group-hover:border-blue-200/20",
    number: "text-blue-200/70",
  },
  {
    icon: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200",
    line: "via-cyan-200/60",
    rule: "bg-cyan-200/60",
    glow: "bg-cyan-400/[0.06] group-hover:bg-cyan-400/[0.12]",
    hover: "hover:border-cyan-300/30",
    tag: "group-hover:border-cyan-200/20",
    number: "text-cyan-200/70",
  },
  {
    icon: "border-indigo-300/20 bg-indigo-300/[0.06] text-indigo-200",
    line: "via-indigo-200/60",
    rule: "bg-indigo-200/60",
    glow: "bg-indigo-400/[0.06] group-hover:bg-indigo-400/[0.12]",
    hover: "hover:border-indigo-300/30",
    tag: "group-hover:border-indigo-200/20",
    number: "text-indigo-200/70",
  },
  {
    icon: "border-emerald-300/20 bg-emerald-300/[0.05] text-emerald-200",
    line: "via-emerald-200/50",
    rule: "bg-emerald-200/60",
    glow: "bg-emerald-400/[0.045] group-hover:bg-emerald-400/[0.09]",
    hover: "hover:border-emerald-300/25",
    tag: "group-hover:border-emerald-200/20",
    number: "text-emerald-200/70",
  },
] as const;




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

const heroTranslations: Record<
  SiteLanguage,
  {
    eyebrow: string;
    headline: [string, string];
    description: string;
    trustLine: string;
    startProject: string;
    exploreServices: string;
    buildHeading: string;
    capabilities: [string, string, string];
    signature: string;
    engineering: string;
    engineeringTagline: string;
    systemsOnline: string;
    workflowSummary: string;
    workflow: [string, string, string];
  }
> = {
  en: {
    eyebrow: 'AI engineering for digital products',
    headline: ['AI engineering for', 'web & mobile.'],
    description:
      'We integrate AI into web and mobile products, aligning each solution with your business requirements.',
    trustLine: 'Weekly demos · fixed-scope quotes · client-owned code · staging before launch · NDAs by default.',
    startProject: 'Start a project',
    exploreServices: 'Explore our services',
    buildHeading: 'AI for real products',
    capabilities: ['AI Engineering', 'On-Device AI', 'Web & Mobile'],
    signature: 'AI engineering · web & mobile · product support',
    engineering: 'Engineering',
    engineeringTagline: 'AI across web, mobile & device',
    systemsOnline: 'Systems online',
    workflowSummary: 'Design · Build · Deploy',
    workflow: ['Design', 'Build', 'Evolve'],
  },
  'fa-AF': {
    eyebrow: 'مهندسی هوش مصنوعی برای محصولات دیجیتال',
    headline: ['مهندسی هوش مصنوعی برای', 'وب و موبایل'],
    description:
      'هوش مصنوعی را در محصولات وب و موبایل ادغام می‌کنیم و هر راهکار را با نیازهای کسب‌وکار شما هماهنگ می‌سازیم.',
    trustLine: 'نمایش هفتگی · پیشنهاد با محدودهٔ ثابت · مالکیت کد برای مشتری · محیط آزمایشی پیش از راه‌اندازی · توافق‌نامهٔ محرمانگی به‌طور پیش‌فرض.',
    startProject: 'آغاز یک پروژه',
    exploreServices: 'دیدن خدمات ما',
    buildHeading: 'هوش مصنوعی برای محصولات واقعی',
    capabilities: ['مهندسی هوش مصنوعی', 'هوش مصنوعی روی دستگاه', 'وب و موبایل'],
    signature: 'مهندسی هوش مصنوعی · وب و موبایل · پشتیبانی محصول',
    engineering: 'انجنیری',
    engineeringTagline: 'هوش مصنوعی در وب، موبایل و دستگاه',
    systemsOnline: 'سیستم‌ها فعال‌اند',
    workflowSummary: 'طراحی · ساخت · راه‌اندازی',
    workflow: ['طراحی', 'ساخت', 'پیشرفت'],
  },
  ps: {
    eyebrow: 'د ډیجیټلي محصولاتو لپاره د مصنوعي ځیرکتیا انجینري',
    headline: ['د مصنوعي ځیرکتیا انجینري', 'د وېب او موبایل لپاره'],
    description:
      'موږ مصنوعي ځیرکتیا د وېب او موبایل محصولاتو سره یوځای کوو او هر حل ستاسو د سوداګرۍ اړتیاوو سره برابروو.',
    trustLine: 'اونیزې نندارې · د ثابتې کچې بیې · د کوډ مالکیت د پېرودونکي دی · له خپرېدو مخکې ازمایښتي چاپېریال · د محرميت تړونونه د تګلارې له مخې.',
    startProject: 'یوه پروژه پیل کړئ',
    exploreServices: 'زموږ خدمتونه وګورئ',
    buildHeading: 'د واقعي محصولاتو لپاره مصنوعي ځیرکتیا',
    capabilities: ['د مصنوعي ځیرکتیا انجینري', 'پر وسیله مصنوعي ځیرکتیا', 'وېب او موبایل'],
    signature: 'د ځیرکتیا انجینري · وېب او موبایل · د محصول ملاتړ',
    engineering: 'انجینري',
    engineeringTagline: 'په وېب، موبایل او وسیله کې مصنوعي ځیرکتیا',
    systemsOnline: 'سیسټمونه فعال دي',
    workflowSummary: 'ډیزاین · جوړول · خپرول',
    workflow: ['ډیزاین', 'جوړول', 'پرمختګ'],
  },
};

const technologyTranslations: Record<
  SiteLanguage,
  {
    eyebrow: string;
    heading: [string, string, string, string];
    description: string;
    cards: {
      label: string;
      title: string;
      description: string;
      tags: string[];
      footer: string;
    }[];
    footerHeading: string;
    footerDescription: string;
    footerCta: string;
  }
> = {
  en: {
    eyebrow: 'Software & AI engineering',
    heading: ['Software for', 'real products,', 'from device', 'to cloud.'],
    description:
      'We build AI features, web and mobile products, and connected services. The right setup depends on the product and how people will use it.',
    cards: [
      {
        label: 'AI engineering',
        title: 'AI features, placed where they fit',
        description:
          'Plan AI features for web and mobile, using on-device or cloud processing based on the job.',
        tags: ['On-device AI', 'Cloud AI', 'Product workflows'],
        footer: 'Choose a useful place for processing.',
      },
      {
        label: 'Product engineering',
        title: 'Web and mobile products',
        description:
          'Build websites, mobile apps, and the services they rely on with clear APIs and maintainable architecture.',
        tags: ['Web apps', 'Mobile apps', 'APIs', 'Product services'],
        footer: 'Connect the parts people use.',
      },
      {
        label: 'Product support',
        title: 'Tools for product operations',
        description:
          'Add integrations and automation to help teams manage the everyday work around a digital product.',
        tags: ['Business systems', 'Workflow automation', 'Operations'],
        footer: 'Support day-to-day product work.',
      },
      {
        label: 'Connected systems',
        title: 'Cloud, security & integrations',
        description:
          'Connect cloud services and APIs with clear access rules, deployment, and operational visibility.',
        tags: ['Cloud services', 'Access controls', 'System integrations'],
        footer: 'Keep system connections understandable.',
      },
    ],
    footerHeading: 'Practical AI. Thoughtful product engineering.',
    footerDescription:
      'We choose the parts that fit the product, from on-device processing to cloud services.',
    footerCta: 'Discuss your project',
  },
  'fa-AF': {
    eyebrow: 'مهندسی نرم‌افزار و هوش مصنوعی',
    heading: ['نرم‌افزار برای', 'محصولات واقعی،', 'از دستگاه', 'تا ابر.'],
    description:
      'قابلیت‌های هوش مصنوعی، محصولات وب و موبایل و خدمات متصل می‌سازیم. ساختار مناسب به محصول و شیوهٔ استفادهٔ مردم بستگی دارد.',
    cards: [
      {
        label: 'مهندسی هوش مصنوعی',
        title: 'قابلیت‌های هوش مصنوعی در جای مناسب',
        description:
          'قابلیت‌های هوش مصنوعی را برای وب و موبایل برنامه‌ریزی می‌کنیم و پردازش روی دستگاه یا ابر را بر پایهٔ وظیفه انتخاب می‌کنیم.',
        tags: ['هوش مصنوعی روی دستگاه', 'هوش مصنوعی ابری', 'جریان کار محصول'],
        footer: 'جای مناسب برای پردازش را انتخاب کنید.',
      },
      {
        label: 'مهندسی محصول',
        title: 'محصولات وب و موبایل',
        description:
          'وب‌سایت‌ها، اپلیکیشن‌های موبایل و خدمات مورد نیاز آن‌ها را با APIهای روشن و معماری نگهداشت‌پذیر می‌سازیم.',
        tags: ['اپلیکیشن وب', 'اپلیکیشن موبایل', 'APIها', 'خدمات محصول'],
        footer: 'بخش‌هایی را که مردم استفاده می‌کنند پیوند دهید.',
      },
      {
        label: 'پشتیبانی محصول',
        title: 'ابزارهای عملیات محصول',
        description:
          'یکپارچه‌سازی و خودکارسازی را برای کمک به تیم‌ها در کارهای روزمرهٔ پیرامون یک محصول دیجیتال می‌افزاییم.',
        tags: ['سیستم‌های تجاری', 'خودکارسازی کارها', 'عملیات'],
        footer: 'از کار روزمرهٔ محصول پشتیبانی کنید.',
      },
      {
        label: 'سیستم‌های متصل',
        title: 'ابر، امنیت و یکپارچه‌سازی',
        description:
          'خدمات ابری و APIها را با قواعد روشن دسترسی، استقرار و دید عملیاتی پیوند می‌دهیم.',
        tags: ['خدمات ابری', 'کنترول دسترسی', 'یکپارچه‌سازی سیستم'],
        footer: 'ارتباط میان سیستم‌ها را روشن نگه دارید.',
      },
    ],
    footerHeading: 'هوش مصنوعی کاربردی؛ مهندسی سنجیدهٔ محصول.',
    footerDescription:
      'بخش‌های مناسب برای هر محصول را انتخاب می‌کنیم؛ از پردازش روی دستگاه تا خدمات ابری.',
    footerCta: 'درباره پروژه‌تان گفت‌وگو کنیم',
  },
  ps: {
    eyebrow: 'د سافټویر او مصنوعي ځیرکتیا انجینري',
    heading: ['د واقعي محصولاتو', 'لپاره سافټویر،', 'له وسیلې', 'تر کلاوډ پورې.'],
    description:
      'موږ د ځیرکتیا ځانګړنې، وېب او موبایل محصولات او نښلول شوي خدمتونه جوړوو. مناسب جوړښت د محصول او د خلکو د کارونې له طریقې سره تړاو لري.',
    cards: [
      {
        label: 'د مصنوعي ځیرکتیا انجینري',
        title: 'د ځیرکتیا ځانګړنې په مناسب ځای کې',
        description:
          'د وېب او موبایل لپاره د ځیرکتیا ځانګړنې پلان کوو او د دندې له مخې پر وسیله یا کلاوډ پروسس ټاکو.',
        tags: ['پر وسیله ځیرکتیا', 'کلاوډ ځیرکتیا', 'د محصول کاري بهیر'],
        footer: 'د پروسس لپاره مناسب ځای وټاکئ.',
      },
      {
        label: 'د محصول انجینري',
        title: 'وېب او موبایل محصولات',
        description:
          'وېبپاڼې، موبایل اپلېکېشنونه او اړوند خدمتونه د روښانه APIګانو او د ساتنې وړ جوړښت سره جوړوو.',
        tags: ['وېب اپلېکېشنونه', 'موبایل اپلېکېشنونه', 'APIګانې', 'د محصول خدمتونه'],
        footer: 'هغه برخې ونښلوئ چې خلک یې کاروي.',
      },
      {
        label: 'د محصول ملاتړ',
        title: 'د محصول د عملیاتو وسایل',
        description:
          'د ډیجیټلي محصول د ورځنیو کارونو لپاره د ټیمونو په مرسته نښلونې او اتومات بهیرونه ورزیاتوو.',
        tags: ['سوداګریز سیسټمونه', 'د کاري بهیر اتومات', 'عملیات'],
        footer: 'د محصول د ورځني کار ملاتړ وکړئ.',
      },
      {
        label: 'نښلول شوي سیسټمونه',
        title: 'کلاوډ، امنیت او نښلونې',
        description:
          'کلاوډ خدمتونه او APIګانې د لاسرسي، خپرولو او عملیاتي لید په روښانه اصولو سره نښلوو.',
        tags: ['کلاوډ خدمتونه', 'د لاسرسي کنټرول', 'د سیسټم نښلونې'],
        footer: 'د سیسټمونو اړیکې روښانه وساتئ.',
      },
    ],
    footerHeading: 'ګټوره ځیرکتیا؛ د محصول سنجول شوې انجینري.',
    footerDescription:
      'د هر محصول لپاره مناسبې برخې ټاکو؛ له پر وسیله پروسس څخه تر کلاوډ خدمتونو پورې.',
    footerCta: 'د خپلې پروژې په اړه خبرې وکړئ',
  },
};

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
   SofTech delivery card
    — premium dark card with service-oriented product styling
───────────────────────────────────────────────────────────── */
export function SofTechDeliveryCard() {
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
                    <span className="text-primary font-bold text-xs">SS</span>
                  </div>
                  <span className="text-foreground/50 text-[10px] font-bold tracking-wider uppercase">
                    SofTech
                  </span>
                </div>
                <CreditCardServiceProvider type="Delivery" />
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
                <CreditCardName>Delivery team</CreditCardName>
                <CreditCardExpiry>2028</CreditCardExpiry>
              </div>

              <div className="absolute bottom-2 right-4 text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">
                build better
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
                    <span className="text-primary font-bold text-[8px]">SS</span>
                  </div>
                  <span className="text-muted-foreground/40 text-[9px] font-bold tracking-wide">SofTech</span>
                </div>
                <CreditCardServiceProvider type="Built" format="icon" />
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
  { symbol: 'AI', price: 'Ops', change: '+2.4%', positive: true, color: '#F7931A' },
  { symbol: 'Web', price: 'Build', change: '+1.8%', positive: true, color: '#627EEA' },
  { symbol: 'Cloud', price: 'Deploy', change: '0.00%', positive: true, color: '#26A17B' },
  { symbol: 'App', price: 'Scale', change: '-0.3%', positive: false, color: '#F3BA2F' },
  { symbol: 'Data', price: 'Sync', change: '+5.1%', positive: true, color: '#9945FF' },
  { symbol: 'Ops', price: 'Ship', change: '+0.8%', positive: true, color: 'var(--success)' },
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
              Client
            </p>
            <p
              className={cn(
                'uppercase tracking-widest text-foreground/90 font-medium',
                small ? 'text-[9px]' : 'text-[11px]',
              )}
              style={{ letterSpacing: '0.12em' }}
            >
              Program team
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
   Delivery throughput panel
══════════════════════════════════════════════════════════ */
export function DeliveryPipelineMini({ inView }: { inView: boolean }) {
  const plan = [
    { label: 'Planning', value: '18', depth: 85 },
    { label: 'Design', value: '12', depth: 72 },
    { label: 'Build', value: '9', depth: 58 },
    { label: 'QA', value: '6', depth: 40 },
    { label: 'Launch', value: '4', depth: 28 },
  ];
  const track = [
    { label: 'Sprint', value: '22', depth: 78 },
    { label: 'Ops', value: '14', depth: 60 },
    { label: 'Support', value: '11', depth: 50 },
    { label: 'Scale', value: '8', depth: 35 },
    { label: 'AI', value: '5', depth: 22 },
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
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Delivery flow
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground/60">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 mb-2 px-1">
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider font-bold">Phase</span>
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider text-center font-bold">Scope</span>
        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider text-right font-bold">Load</span>
      </div>

      <div className="space-y-0.5 mb-1">
        {track
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
              <span className="relative text-[10px] font-mono text-destructive font-bold">{row.label}</span>
              <span className="relative text-[10px] font-mono text-muted-foreground text-center font-medium">
                {row.value}
              </span>
              <span className="relative text-[10px] font-mono text-muted-foreground/50 text-right font-medium">
                {row.depth}%
              </span>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-center gap-2 py-1.5 border-y border-border/40 my-1">
        <span className="text-[10px] text-muted-foreground/60 font-medium">Cycle</span>
        <span className="text-[10px] font-mono font-bold text-foreground">3.5 wks</span>
        <span className="text-[9px] text-muted-foreground/40 font-bold">avg</span>
      </div>

      <div className="space-y-0.5 mt-1">
        {plan.map((row, i) => (
          <div key={i} className="relative grid grid-cols-3 items-center px-1 py-0.5 rounded">
            <div
              className="absolute right-0 top-0 bottom-0 rounded bg-success/10"
              style={{
                width: `${row.depth}%`,
              }}
            />
            <span className="relative text-[10px] font-mono text-success font-bold">{row.label}</span>
            <span className="relative text-[10px] font-mono text-muted-foreground text-center font-medium">
              {row.value}
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
   Capability mix ring
══════════════════════════════════════════════════════════ */
export function CapabilityMixRing({ inView }: { inView: boolean }) {
  const segments = [
    { symbol: 'AI', pct: 42, color: '#F7931A', value: '$6,490' },
    { symbol: 'Web', pct: 28, color: '#627EEA', value: '$2,996' },
    { symbol: 'Cloud', pct: 20, color: '#26A17B', value: '$1,748' },
    { symbol: 'Ops', pct: 10, color: '#F3BA2F', value: '$1,248' },
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
        Capability mix
        </span>
        <span className="text-[10px] text-muted-foreground/60 font-mono font-bold">4 focus areas</span>
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
   Project scope widget
══════════════════════════════════════════════════════════ */
export function ProjectScopeWidget({ inView }: { inView: boolean }) {
  const [side, setSide] = useState<'build' | 'support'>('build');
  const [amount, setAmount] = useState('100');

  const isBuild = side === 'build';

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
      {/* Build/Support structural toggle layer */}
      <div className="flex rounded-md p-1 mb-4 bg-background/50 border border-border/20">
        {(['build', 'support'] as const).map((s) => {
          const isSelected = side === s;
          return (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={cn(
                'flex-1 py-1.5 rounded text-xs font-bold capitalize transition-all duration-200 cursor-pointer focus:outline-none',
                isSelected 
                  ? s === 'build'
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

      {/* Project planning / delivery status row */}
      <div className="flex items-center justify-between mb-3 select-none">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border border-border/10"
            style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#60A5FA' }}
          >
            SS
          </div>
          <span className="text-foreground text-sm font-bold tracking-tight">Project planning</span>
        </div>
        <span className="text-foreground font-mono font-bold text-sm">Ready</span>
      </div>

      {/* Budget / scope input container */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded border bg-background/40 border-border/60">
        <span className="text-muted-foreground/60 text-xs font-semibold">Scope value</span>
        <div className="flex items-center gap-1.5">
          <span className="text-foreground text-sm font-mono font-bold">$ {amount}</span>
          <span className="text-muted-foreground/40 text-[9px] font-bold">engagement</span>
        </div>
      </div>

      {/* Interactive preset shortcut metric buttons grid */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {['1k', '5k', '10k', '25k'].map((v) => {
          const isActive = amount === v;
          return (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className={cn(
                "py-1 rounded text-[10px] font-bold transition-all duration-150 border cursor-pointer focus:outline-none",
                isActive
                  ? isBuild
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
          isBuild 
            ? "bg-success hover:bg-success/90 shadow-success/10" 
            : "bg-destructive hover:bg-destructive/90 shadow-destructive/10"
        )}
      >
        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
        <span className="relative z-10">
          {isBuild ? '🚀 Start project' : '📞 Review brief'} — ${amount}
        </span>
      </button>

      <p className="text-center text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider mt-2">
        Prototype mode — no billing shown
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
    icon: MonitorSmartphone,
    title: 'Web & mobile product design',
    description:
      'Clear, reliable digital experiences for customers, teams, and internal workflows — built around real business needs.',
    accent: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
  },
  {
    icon: Bot,
    title: 'AI & automation',
    description:
      'Practical automations and AI workflows that reduce repetitive work, improve consistency, and unlock operational insight.',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: Layers3,
    title: 'Custom software systems',
    description:
      'Bespoke systems for operations, reporting, internal tools, and customer-facing products that need to scale with the business.',
    accent: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Secure delivery foundations',
    description:
      'Architecture, governance, and access controls built to support real product growth without creating unnecessary operational risk.',
    accent: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
  },
  {
    icon: CloudCog,
    title: 'Cloud & integration enablement',
    description:
      'Smooth connections between services, systems, and data sources so your workflows stay dependable as the business evolves.',
    accent: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Headphones,
    title: 'Ongoing support',
    description:
      'Hands-on collaboration from strategy and build through refinement, release, and long-term reliability improvements.',
    accent: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
  },
];

const stats = [
  { value: '7+', label: 'Years of delivery', icon: BriefcaseBusiness },
  { value: '40+', label: 'Projects supported', icon: Rocket },
  { value: '100%', label: 'Business-focused', icon: Target },
  { value: '24/7', label: 'Partnership mindset', icon: Headphones },
];

const securityFeatures = [
  {
    icon: Lock,
    title: 'Secure architecture',
    description: 'Clear boundaries, safe access patterns, and production-minded controls built into the system.',
  },
  {
    icon: ShieldCheck,
    title: 'Governed delivery',
    description: 'Well-defined processes, review checkpoints, and technical oversight from start to release.',
  },
  {
    icon: DatabaseZap,
    title: 'Operational visibility',
    description: 'Monitoring, logging, and support practices that help teams catch issues early and act confidently.',
  },
  {
    icon: CheckCircle,
    title: 'Reliable outcomes',
    description: 'A practical approach to quality, rollout, and iteration that keeps products moving forward without surprises.',
  },
];

type NavDropdownItem = {
  icon: LucideIcon;
  label: string;
  desc: string;
  href: string;
  color: string;
  badge?: string;
};

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
              <span className="text-primary font-black text-xs">SS</span>
            </div>
            <span className="text-foreground font-bold text-sm tracking-tight">SofTech</span>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded border bg-card/40 border-border/60 flex items-center justify-center transition-colors duration-150 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Live delivery snapshot panel */}
        <div className="mx-4 mt-4 px-3 py-2.5 rounded border flex items-center justify-between bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Delivery status</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { s: 'AI', p: 'Live', c: '#F7931A' },
              { s: 'Web', p: 'Ready', c: '#627EEA' },
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
          <Link href="#contact" onClick={onClose}>
            <button
              className="w-full py-2.5 rounded border text-sm font-semibold text-muted-foreground bg-card/40 border-border/60 hover:text-foreground hover:border-muted-foreground transition-all duration-200 cursor-pointer focus:outline-none"
            >
              Book a call
            </button>
          </Link>
          
          <Link href="#contact" onClick={onClose}>
            <button
              className="relative w-full py-2.5 rounded text-sm font-extrabold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 overflow-hidden group shadow-lg shadow-primary/10 cursor-pointer focus:outline-none"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a project <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </button>
          </Link>
          
          <p className="text-center text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider">
            Strategy · design · delivery
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
    icon: Code2,
    label: 'Custom software',
    desc: 'Business systems, portals, and tools built around your workflows',
    href: '#capabilities',
    color: '#38BDF8',
    badge: 'Core',
  },
  {
    icon: BrainCircuit,
    label: 'AI & automation',
    desc: 'Operational tools that reduce manual work and improve decision speed',
    href: '#capabilities',
    color: '#34D399',
  },
  {
    icon: MonitorSmartphone,
    label: 'Web & mobile',
    desc: 'Digital experiences designed for users, customers, and real business outcomes',
    href: '#capabilities',
    color: '#A78BFA',
  },
  {
    icon: ShieldCheck,
    label: 'Secure delivery',
    desc: 'Architecture, governance, and controls that support scale and trust',
    href: '#security',
    color: '#F59E0B',
    badge: 'Trust',
  },
  {
    icon: CloudCog,
    label: 'Cloud & data',
    desc: 'Connected foundations for deployment, integration, and product reliability',
    href: '#engineering-section',
    color: '#60A5FA',
  },
  {
    icon: Headphones,
    label: 'Support & partnership',
    desc: 'Practical collaboration from strategy to launch and beyond',
    href: '#contact',
    color: '#F87171',
  },
];

const navLinks = [
  { label: 'home', href: '#home' },
  { label: 'technology', href: '#technology' },
  { label: 'engineering', href: '#engineering-section' },
  { label: 'services', href: '#capabilities' },
  { label: 'how we work', href: '#how-we-work' },
  { label: 'contact', href: '#contact' },
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
  icon?: LucideIcon;
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
const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/#capabilities" },
      { label: "Mobile Applications", href: "/#capabilities" },
      { label: "Custom Software", href: "/#capabilities" },
      { label: "AI & Automation", href: "/#capabilities" },
      { label: "UI/UX Design", href: "/#capabilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How We Work", href: "/#how-we-work" },
      { label: "Our Approach", href: "/#engineering-section" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Start a Project", href: "/#contact" },
      {
        label: "Email Us",
        href: "mailto:info@softechsoftwaresystems.com",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/softech_software_solutions?obrf=cHc1bzQyMm9udHd2",
      },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const footerTranslations: Record<
  SiteLanguage,
  {
    description: string;
    homeLabel: string;
    groups: { title: string; links: string[] }[];
    copyright: string;
    tagline: string;
    contact: string;
  }
> = {
  en: {
    description: 'We build digital products that help businesses work smarter, serve customers better, and move forward with confidence.',
    homeLabel: 'SofTech Solutions home',
    groups: [
      { title: 'Services', links: ['Website Development', 'Mobile Applications', 'Custom Software', 'AI & Automation', 'UI/UX Design'] },
      { title: 'Company', links: ['How We Work', 'Our Approach'] },
      { title: 'Get in Touch', links: ['Start a Project', 'info@softechsolutions.com', 'Instagram'] },
      { title: 'Policies', links: ['Privacy', 'Terms'] },
    ],
    copyright: 'All rights reserved.',
    tagline: 'Built with care. Designed for business.',
    contact: 'Contact us',
  },
  'fa-AF': {
    description: 'محصولات دیجیتال می‌سازیم تا کسب‌وکارها هوشمندانه‌تر کار کنند، بهتر به مشتریان خدمت کنند و با اطمینان پیشرفت کنند.',
    homeLabel: 'صفحه اصلی SofTech Solutions',
    groups: [
      { title: 'خدمات', links: ['ساخت وب‌سایت', 'اپلیکیشن‌های موبایل', 'نرم‌افزار سفارشی', 'هوش مصنوعی و خودکارسازی', 'طراحی رابط و تجربه کاربری'] },
      { title: 'شرکت', links: ['روش کار ما', 'رویکرد کاری'] },
      { title: 'تماس با ما', links: ['آغاز یک پروژه', 'info@softechsolutions.com', 'اینستاگرام'] },
      { title: 'سیاست‌ها', links: ['حریم خصوصی', 'شرایط'] },
    ],
    copyright: 'تمام حقوق محفوظ است.',
    tagline: 'با دقت ساخته شده؛ برای کسب‌وکار طراحی شده.',
    contact: 'تماس با ما',
  },
  ps: {
    description: 'موږ ډیجیټلي محصولات جوړوو چې سوداګرۍ هوښیار کار وکړي، پېرودونکو ته ښه خدمت وکړي او په ډاډه زړه پرمختګ وکړي.',
    homeLabel: 'د SofTech Solutions کورپاڼه',
    groups: [
      { title: 'خدمتونه', links: ['د وېب‌پاڼې جوړول', 'د موبایل اپلېکېشنونه', 'ځانګړی سافټویر', 'مصنوعي ځیرکتیا او اتومات', 'د کارن‌مخ او تجربې طرحه'] },
      { title: 'شرکت', links: ['زموږ د کار طریقه', 'زموږ تګلاره'] },
      { title: 'اړیکه ونیسئ', links: ['یوه پروژه پیل کړئ', 'info@softechsolutions.com', 'انسټاګرام'] },
      { title: 'تګلارې', links: ['محرمیت', 'شرایط'] },
    ],
    copyright: 'ټول حقونه خوندي دي.',
    tagline: 'په پاملرنې جوړ شوی؛ د سوداګرۍ لپاره طرحه شوی.',
    contact: 'اړیکه ونیسئ',
  },
};



/* ─────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────── */

function Footer({ language }: { language: SiteLanguage }) {
  const copy = footerTranslations[language];
  const isRtl = language !== 'en';
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden border-t border-white/[0.09] bg-[#050914] text-[#EDF3FA]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top_left,rgba(40,217,160,0.08),transparent_48%),radial-gradient(ellipse_at_top_right,rgba(91,132,255,0.07),transparent_42%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10 lg:px-12 lg:pt-12">
        <div className="grid gap-y-10 border-b border-white/[0.12] pb-8 sm:gap-y-12 sm:pb-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-x-8">
          <section className={`min-w-0 ${isRtl ? 'text-right' : 'text-left'}`}>
            <Link
              href="/"
              aria-label={copy.homeLabel}
              className={`group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#28D9A0]/35 bg-[#28D9A0]/[0.08] transition-colors duration-200 group-hover:border-[#28D9A0]/70">
                <span className="text-[11px] font-black tracking-[-0.08em] text-[#5AE8B7]">ST</span>
                <span aria-hidden="true" className="absolute -bottom-px h-px w-4 bg-[#28D9A0]" />
              </span>
              <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.03em] text-white">
                SofTech<span className="text-[#28D9A0]"> Solutions</span>
              </span>
            </Link>

            <p className="mt-4 max-w-[24rem] text-[13px] leading-6 text-slate-400">
              {copy.description}
            </p>

            <Link
              href="/#contact"
              className="group relative mt-5 inline-flex h-10 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl bg-[#28D9A0] px-4 text-[13px] font-semibold text-[#04120F] shadow-[0_0_0_1px_rgba(40,217,160,0.5),0_8px_24px_-8px_rgba(40,217,160,0.55)] transition-[background-color,box-shadow] duration-200 hover:bg-[#3BE6AE] hover:shadow-[0_0_0_1px_rgba(85,232,183,0.8),0_10px_32px_-6px_rgba(40,217,160,0.7)] before:pointer-events-none before:absolute before:inset-y-0 before:start-0 before:w-1/3 before:-translate-x-full before:skew-x-[-20deg] before:bg-white/40 before:blur-sm before:transition-transform before:duration-700 hover:before:translate-x-[420%] motion-reduce:before:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914]"
            >
              <span className="relative">{copy.contact}</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className={[
                  'relative shrink-0 transition-transform duration-200 motion-reduce:transition-none',
                  isRtl
                    ? 'scale-x-[-1] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                    : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                ].join(' ')}
              />
            </Link>
          </section>

          <nav
            aria-label={copy.groups.map((group) => group.title).join(', ')}
            className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-7 lg:col-span-4 lg:[grid-template-columns:subgrid]"
          >
            {footerLinks.map((group, groupIndex) => (
              <div key={group.title} className={isRtl ? 'text-right' : 'text-left'}>
                <h3 className={`mb-3 text-[10px] font-semibold uppercase text-slate-500 ${isRtl ? '' : 'tracking-[0.16em]'}`}>
                  {copy.groups[groupIndex].title}
                </h3>
                <ul className="space-y-1.5">
                  {group.links.map((item, linkIndex) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={item.label === "Instagram" ? "_blank" : undefined}
                        rel={item.label === "Instagram" ? "noreferrer" : undefined}
                        className="inline-flex min-h-6 items-center break-words text-xs leading-5 text-slate-300 transition-colors duration-200 hover:text-[#5AE8B7] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] sm:text-[13px]"
                      >
                        {copy.groups[groupIndex].links[linkIndex]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={`flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row sm:text-start ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex flex-col items-center gap-2 text-[11px] font-medium text-slate-500 sm:flex-row sm:gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <span>
              © {currentYear ?? ""} SofTech Solutions. {copy.copyright}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className={`inline-flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Shield size={13} className="shrink-0 text-[#28D9A0]" />
              <span>{copy.tagline}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [heroLanguage, setHeroLanguage] = useState<SiteLanguage>('en');
  const heroText = heroTranslations[heroLanguage];
  const technologyText = technologyTranslations[heroLanguage];
  const isHeroRtl = heroLanguage !== 'en';
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const applyLanguage = (language: string | null) => {
      if (isSiteLanguage(language)) setHeroLanguage(language);
    };
    const onLanguageChange = (event: Event) => {
      applyLanguage((event as CustomEvent<SiteLanguage>).detail);
    };
    const frame = window.requestAnimationFrame(() => {
      applyLanguage(window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY));
    });

    window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, onLanguageChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, onLanguageChange);
    };
  }, []);

  const { ref: section2Ref, inView: section2InView } = useInView(0.25);
  const section3 = useInView(0.2);
  const featuresSection = useInView(0.1);
const laserSurfaceRef = useRef<HTMLDivElement>(null);
const laserStageRef = useRef<HTMLDivElement>(null);
const cardsRef = useRef<HTMLDivElement>(null);
const [laserLandingY, setLaserLandingY] = useState<number | null>(null);

useLayoutEffect(() => {
  const stage = laserStageRef.current;
  const cards = cardsRef.current;

  if (!stage || !cards) return;

  let frame = 0;

  const measure = () => {
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const stageRect = stage.getBoundingClientRect();
      const cardsRect = cards.getBoundingClientRect();

      setLaserLandingY(cardsRect.top - stageRect.top);
    });
  };

  measure();

  const observer = new ResizeObserver(measure);
  observer.observe(stage);
  observer.observe(cards);

  window.addEventListener("resize", measure);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("resize", measure);
  };
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['features', 'security'];
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
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-all duration-500 ease-out',
        scrolled
          ? [
              'bg-[#050914]/95',
              'shadow-[0_12px_40px_rgba(0,0,0,0.28)]',
            ].join(' ')
          : 'bg-[#050914]/85',
      )}
    >
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      <SiteNavbar />
    </div>



{/* HERO — SOFTECH SOLUTIONS */}
<section
  id="home"
  aria-labelledby="hero-heading"
  dir={isHeroRtl ? "rtl" : "ltr"}
  lang={heroLanguage}
  className={`relative isolate scroll-mt-20 overflow-hidden bg-[#050914] text-[#EDF3FA] ${
    isHeroRtl ? "rtl-language" : ""
  }`}
>
  {/* ARCHITECTURAL BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute -right-[18%] -top-48 h-[28rem] w-[28rem] rounded-full bg-[#153D72]/20 blur-[100px] sm:-right-[12%] sm:-top-64 sm:h-[42rem] sm:w-[42rem] sm:blur-[145px]" />

    <div className="absolute -left-[22%] top-[34%] h-[22rem] w-[22rem] rounded-full bg-[#102B50]/25 blur-[95px] sm:-left-[16%] sm:h-[32rem] sm:w-[32rem] sm:blur-[120px]" />

    <div className="absolute -bottom-48 right-[5%] h-[24rem] w-[24rem] rounded-full bg-[#174A83]/[0.09] blur-[100px] sm:-bottom-64 sm:h-[32rem] sm:w-[32rem] sm:blur-[130px]" />

    {/* Technical grid */}
    <div
      className="absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(126,158,198,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(126,158,198,0.22) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse at 72% 45%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 72% 45%, black 0%, transparent 75%)",
      }}
    />

    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/35 to-transparent" />

    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7892B4]/20 to-transparent" />

    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050914] to-transparent sm:h-28" />
  </div>

  {/* MAIN COMPOSITION */}
  <div className="relative z-[1] mx-auto grid w-full max-w-[1480px] grid-cols-1 items-center gap-6 px-5 pb-8 pt-24 sm:gap-10 sm:px-8 sm:pb-14 sm:pt-28 lg:min-h-svh lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 lg:px-12 lg:pb-12 lg:pt-28 xl:gap-14 xl:px-16">
    {/* LEFT — BUSINESS POSITIONING */}
    <div className="relative z-10 mx-auto w-full max-w-[600px] lg:mx-0 lg:-translate-y-8 xl:-translate-y-12">
      {/* Eyebrow */}
      <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-7">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28D9A0] shadow-[0_0_10px_rgba(40,217,160,0.35)]"
        />

        <span
          className={`min-w-0 text-[10px] font-semibold leading-relaxed text-[#A9B8CB] sm:text-[11px] ${
            isHeroRtl ? "" : "uppercase tracking-[0.16em] sm:tracking-[0.2em]"
          }`}
        >
          {heroText.eyebrow}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-px w-10 shrink-0 bg-gradient-to-r from-[#28D9A0]/45 to-transparent sm:block"
        />
      </div>

      {/* Headline */}
      <h1
        id="hero-heading"
        className={`w-full font-semibold leading-[1.2] [hyphens:none] sm:leading-[1.12] lg:leading-[1.1] ${
          isHeroRtl
            ? "text-right text-[clamp(1.65rem,6.5vw,2.25rem)] tracking-normal sm:text-[clamp(2rem,3.8vw,3rem)]"
            : "text-left text-[clamp(2rem,7.5vw,2.75rem)] tracking-[-0.035em] sm:text-[clamp(2.4rem,4vw,3.5rem)]"
        }`}
      >
        <span className="block text-[#E3EAF3]">
          {heroText.headline[0]}
        </span>

        <span className="hero-gradient-text block">
          {heroText.headline[1]}
        </span>
      </h1>

      {/* Supporting copy */}
      <p
        className={`mt-4 max-w-[470px] text-[14px] leading-[1.75] text-[#B7C4D4] sm:mt-6 sm:text-[15px] sm:leading-[1.9] ${
          isHeroRtl ? "font-normal" : ""
        }`}
      >
        {heroText.description}
      </p>

      {/* PRIMARY AND SECONDARY ACTIONS */}
      <div className="mt-6 flex flex-col gap-3 min-[380px]:flex-row min-[380px]:flex-wrap min-[380px]:items-center sm:mt-8">
        <Link
          href="/#contact"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#28D9A0] bg-[#28D9A0] px-4 py-3 text-[12px] font-semibold text-[#04120F] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#55E8B7] hover:bg-[#55E8B7] hover:shadow-[0_8px_26px_rgba(40,217,160,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] min-[380px]:w-auto sm:min-h-[50px] sm:gap-3 sm:px-5 sm:text-[12px]"
        >
          <span>{heroText.startProject}</span>

          <ArrowRight
            size={15}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 ${
              isHeroRtl
                ? "rotate-180 group-hover:-translate-x-1"
                : "group-hover:translate-x-1"
            }`}
          />
        </Link>

        <Link
          href="/#capabilities"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/[0.20] bg-white/[0.04] px-4 py-3 text-[12px] font-semibold text-[#F1F5FA] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/[0.32] hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] min-[380px]:w-auto sm:min-h-[50px] sm:gap-2 sm:px-5 sm:text-[12px]"
        >
          <span>{heroText.exploreServices}</span>

          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 ${
              isHeroRtl
                ? "rotate-[-45deg] group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            }`}
          />
        </Link>
      </div>

      {/* TRUST LINE */}
      <div className="mt-5 flex min-w-0 items-start gap-2.5 text-[11px] leading-[1.7] text-[#B7C4D4] sm:mt-8 sm:text-[11px]">
        <span
          aria-hidden="true"
          className="mt-[0.65em] h-px w-5 shrink-0 bg-[#28D9A0]/70"
        />

        <span className="min-w-0">{heroText.trustLine}</span>
      </div>
    </div>

    {/* RIGHT — ENGINEERING CHASSIS */}
    <div className="relative mx-auto flex w-full min-w-0 max-w-[680px] items-center justify-center lg:ml-auto lg:max-w-none">
      {/* Chassis illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full bg-[#174A83]/20 blur-[65px] sm:blur-[100px]"
      />

      {/* Structural chassis */}
      <div className="relative isolate w-full min-w-0 overflow-hidden rounded-xl border border-[#8197B5]/[0.16] bg-[#0A1120]/80 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:rounded-2xl sm:bg-[#0A1120]/70 sm:backdrop-blur-md">
        {/* Chassis header */}
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.02] px-3 sm:min-h-12 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28D9A0]"
            />

            <span className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B7C5D6] sm:text-[10px] sm:tracking-[0.19em]">
              {heroText.engineering}
            </span>
          </div>

          <span className="shrink-0 font-mono text-[9px] text-[#8294AC]">
            SOFTECH / 01
          </span>
        </div>

        {/* 3D visualization */}
        <div className="relative min-w-0 px-1 py-1 sm:px-3 sm:py-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,74,122,0.12),transparent_70%)]"
          />

          <div className="relative z-[1] min-w-0">
            <ComputerScene language={heroLanguage} />
          </div>
        </div>

        {/* Chassis footer */}
        <div className="hidden flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/[0.08] bg-black/[0.10] px-4 py-3 sm:flex sm:px-5">
          <p
            className={`min-w-0 text-[10px] leading-5 text-[#9AAAC0] ${
              isHeroRtl ? "" : "tracking-[0.025em]"
            }`}
          >
            {heroText.engineeringTagline}
          </p>

          <span
            className="h-px w-8 shrink-0 bg-[#28D9A0]/45"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</section>




{/* SECTION 02 — THE TECHNOLOGY STUDIO */}
<section
  id="technology"
  lang={heroLanguage}
  dir={isHeroRtl ? "rtl" : "ltr"}
  aria-labelledby="technology-heading"
  className={`relative isolate overflow-hidden bg-[#05070d] px-5 py-24 text-[#edf3fa] sm:px-8 sm:py-28 lg:px-12 lg:py-32 ${
    isHeroRtl ? "rtl-language" : ""
  }`}
>
  {/* BACKGROUND ENVIRONMENT */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-[#05070d]" />

    <div className="absolute left-1/2 top-[-28rem] h-[48rem] w-[70rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-blue-500/[0.055] blur-[150px]" />

    <div className="absolute -right-72 top-[32%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.018] blur-[140px]" />

    <div className="absolute -left-72 bottom-[5%] h-[32rem] w-[32rem] rounded-full bg-blue-500/[0.025] blur-[140px]" />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 78%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 78%, transparent)",
      }}
    />

    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(2,4,9,0.3)_70%,rgba(2,4,9,0.65)_100%)]" />

    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#03050a]/80" />
  </div>

<TechnologySection language={heroLanguage} />
</section>





{/* SECTION 03 — ENGINEERING PHILOSOPHY */}
<section
  id="engineering-section"
  lang={heroLanguage}
  dir={isHeroRtl ? "rtl" : "ltr"}
  data-disable-global-glow-cursor
  className="relative isolate overflow-hidden bg-[#050914]"
>
  <div className="relative z-20">
    <EngineeringSection language={heroLanguage} />
  </div>
</section>


{/* ═══════════════════════════════════════════════════════════════════════
    STATS — Keep the dark environment continuous
═══════════════════════════════════════════════════════════════════════ */}
<div className="relative z-10 bg-[#030303] overflow-hidden">

  {/* SECTION 4 — TECHNICAL CAPABILITIES */}
<CapabilitiesSection language={heroLanguage} />
</div>

<WorkAboutSections language={heroLanguage} />

{/* ═══════════════════════════════════════════════════════════════════════
    SECTION 5 — SECURITY
═══════════════════════════════════════════════════════════════════════ */}
<section
  id="security"
  className="relative z-10 overflow-hidden bg-[#030303]"
>
  {/* SECTION 6 — CONTACT CTA */}
<ContactSection language={heroLanguage} />
</section>


      {/* ══ CORPORATE SYNCED FOOTER SECTION LAYER ═════════════════════════════════ */}
      <Footer language={heroLanguage} />

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
