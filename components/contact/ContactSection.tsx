
'use client';

import dynamic from 'next/dynamic';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { SiteLanguage } from '@/lib/site-language';
import ConsultationBooking from '@/components/contact/ConsultationBooking';
import { ArrowUpRight, Check, Phone , Mail} from 'lucide-react';

const CrystalizedBall = dynamic(() => import('@/components/CrystalizedBall'), {
  ssr: false,
  loading: () => null,
});


const translations = {
  en: {
    badge: "LET'S BUILD SOMETHING MEANINGFUL",
    heading: ['Have a project', 'in mind?', "Let's make it real."],
    introduction: 'We engineer secure, governed AI for web and mobile products—from on-device intelligence to cloud-connected systems.',
    tagline: 'AI and software built around your product.',
    formEyebrow: 'Start a conversation',
    formHeading: "Tell us what you're building.",
    formHelp: 'Share a few details and our team will get back to you.',
    honeypot: 'Leave this field empty',
    name: 'Your name',
    email: 'Email address',
    projectType: 'What do you need?',
    chooseProject: 'Select a project type',
    projects: ['Website development', 'Mobile application', 'AI & automation', 'Custom software', 'UI/UX design', 'Other'],
    details: 'Project details',
    messagePlaceholder: 'Tell us a little about your idea, goals, or timeline...',
    success: 'Your message has been sent. Thank you for reaching out!',
    submit: "Let's talk about your project",
    sending: 'Sending message…',
    privacy: 'Your details are used only to respond to your inquiry.',
    characterCount: 'characters',
    errors: {
      invalidFormat: 'Invalid request format.',
      tooLarge: 'Your submission is too large.',
      invalidBody: 'Invalid request body.',
      invalidSubmission: 'Invalid form submission.',
      checkDetails: 'Please check your details and try again.',
      rateLimited: 'Too many submissions. Please try again in 15 minutes.',
      unavailable: 'Email delivery is temporarily unavailable.',
      cannotConnect: 'Could not connect to the email service.',
      sendFailed: 'The email server failed to send your message.',
      recipientRejected: 'The email server did not accept the recipient.',
      generic: 'We could not send your message. Please try again.',
    },
  },
  'fa-AF': {
    badge: 'بیایید چیزی معنادار بسازیم',
    heading: ['پروژه‌ای در', 'ذهن دارید؟', 'بیایید آن را واقعی کنیم.'],
    introduction: 'هوش مصنوعی امن و تحت حاکمیت را برای محصولات وب و موبایل مهندسی می‌کنیم؛ از هوشمندی روی دستگاه تا سیستم‌های متصل به ابر.',
    tagline: 'هوش مصنوعی و نرم‌افزار بر پایه محصول شما.',
    formEyebrow: 'گفتگو را آغاز کنید',
    formHeading: 'بگویید چه چیزی می‌سازید.',
    formHelp: 'چند جزئیات را با ما در میان بگذارید تا تیم ما با شما تماس بگیرد.',
    honeypot: 'این بخش را خالی بگذارید',
    name: 'نام شما',
    email: 'نشانی ایمیل',
    projectType: 'به چه چیزی نیاز دارید؟',
    chooseProject: 'نوع پروژه را انتخاب کنید',
    projects: ['ساخت وب‌سایت', 'اپلیکیشن موبایل', 'هوش مصنوعی و خودکارسازی', 'نرم‌افزار سفارشی', 'طراحی رابط و تجربه کاربری', 'موارد دیگر'],
    details: 'جزئیات پروژه',
    messagePlaceholder: 'کمی درباره ایده، هدف‌ها یا زمان‌بندی خود بگویید...',
    success: 'پیام شما فرستاده شد. از تماس‌تان سپاسگزاریم!',
    submit: 'درباره پروژه‌تان گفتگو کنیم',
    sending: 'پیام در حال فرستادن است…',
    privacy: 'از اطلاعات شما تنها برای پاسخ‌گویی به درخواست‌تان استفاده می‌شود.',
    characterCount: 'حرف',
    errors: {
      invalidFormat: 'قالب درخواست معتبر نیست.',
      tooLarge: 'حجم درخواست شما بیش از حد مجاز است.',
      invalidBody: 'محتوای درخواست معتبر نیست.',
      invalidSubmission: 'فرم فرستاده‌شده معتبر نیست.',
      checkDetails: 'لطفاً اطلاعات خود را بررسی کرده و دوباره تلاش کنید.',
      rateLimited: 'درخواست‌های زیادی فرستاده‌اید. لطفاً ۱۵ دقیقه دیگر دوباره تلاش کنید.',
      unavailable: 'فرستادن ایمیل موقتاً در دسترس نیست.',
      cannotConnect: 'اتصال به خدمات ایمیل ممکن نشد.',
      sendFailed: 'سرور ایمیل نتوانست پیام شما را بفرستد.',
      recipientRejected: 'سرور ایمیل نشانی گیرنده را نپذیرفت.',
      generic: 'پیام شما فرستاده نشد. لطفاً دوباره تلاش کنید.',
    },
  },
  ps: {
    badge: 'راځئ مانادار څه جوړ کړو',
    heading: ['پروژه مو په', 'ذهن کې ده؟', 'راځئ عملي یې کړو.'],
    introduction: 'موږ د وېب او موبایل محصولاتو لپاره خوندي او اداره شوې مصنوعي ځیرکتیا انجینري کوو؛ له وسیلې دننه ځیرکتیا تر کلاوډ سره نښلول شويو سیسټمونو پورې.',
    tagline: 'مصنوعي ځیرکتیا او سافټویر ستاسو د محصول لپاره.',
    formEyebrow: 'خبرې پیل کړئ',
    formHeading: 'ووایاست چې څه جوړوئ.',
    formHelp: 'یو څو جزیات راسره شریک کړئ، زموږ ډله به بېرته درسره اړیکه ونیسي.',
    honeypot: 'دا ځای تش پرېږدئ',
    name: 'ستاسو نوم',
    email: 'د برېښنالیک پته',
    projectType: 'څه ته اړتیا لرئ؟',
    chooseProject: 'د پروژې ډول وټاکئ',
    projects: ['د وېب‌پاڼې جوړول', 'د موبایل اپلېکېشن', 'مصنوعي ځیرکتیا او اتومات', 'ځانګړی سافټویر', 'د کارن‌مخ او تجربې طرحه', 'نور'],
    details: 'د پروژې جزیات',
    messagePlaceholder: 'د خپل نظر، موخو یا مهال‌وېش په اړه لږ معلومات راکړئ...',
    success: 'ستاسو پیغام واستول شو. له اړیکې نیولو مو مننه!',
    submit: 'ستاسو د پروژې په اړه خبرې وکړو',
    sending: 'پیغام لېږل کېږي…',
    privacy: 'ستاسو معلومات یوازې ستاسو پوښتنې ته د ځواب لپاره کارول کېږي.',
    characterCount: 'توري',
    errors: {
      invalidFormat: 'د غوښتنې بڼه ناسمه ده.',
      tooLarge: 'ستاسو غوښتنه له اندازې لویه ده.',
      invalidBody: 'د غوښتنې متن ناسم دی.',
      invalidSubmission: 'د فورم لېږل شوی معلومات ناسم دي.',
      checkDetails: 'مهرباني وکړئ خپل معلومات وګورئ او بیا هڅه وکړئ.',
      rateLimited: 'ډېرې غوښتنې لېږل شوې دي. ۱۵ دقیقې وروسته بیا هڅه وکړئ.',
      unavailable: 'د برېښنالیک لېږل لنډمهاله شوني نه دي.',
      cannotConnect: 'د برېښنالیک خدمت سره نښلول شوني نه شول.',
      sendFailed: 'د برېښنالیک سرور ستاسو پیغام ونه لېږه.',
      recipientRejected: 'د برېښنالیک سرور د ترلاسه کوونکي پته ونه منله.',
      generic: 'ستاسو پیغام ونه لېږل شو. مهرباني وکړئ بیا هڅه وکړئ.',
    },
  },
} satisfies Record<SiteLanguage, {
  badge: string;
  heading: [string, string, string];
  introduction: string;
  tagline: string;
  formEyebrow: string;
  formHeading: string;
  formHelp: string;
  honeypot: string;
  name: string;
  email: string;
  projectType: string;
  chooseProject: string;
  projects: string[];
  details: string;
  messagePlaceholder: string;
  success: string;
  submit: string;
  sending: string;
  privacy: string;
  characterCount: string;
  errors: Record<string, string>;
}>;

const apiErrorKeys: Record<string, keyof (typeof translations)['en']['errors']> = {
  'Invalid request format.': 'invalidFormat',
  'Your submission is too large.': 'tooLarge',
  'Invalid request body.': 'invalidBody',
  'Invalid form submission.': 'invalidSubmission',
  'Please check your details and try again.': 'checkDetails',
  'Too many submissions. Please try again in 15 minutes.': 'rateLimited',
  'Email delivery is temporarily unavailable.': 'unavailable',
  'Could not connect to the email service.': 'cannotConnect',
  'The email server failed to send your message.': 'sendFailed',
  'The email server did not accept the recipient.': 'recipientRejected',
  'An unexpected error occurred while sending your message.': 'generic',
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/* ═══════════════════════════════════════════════════════════════════
   ContactSection — refined (final section)

   HOW TO APPLY, inside your existing ContactSection.tsx:
   1. Replace your react import line with:
        import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react';
   2. Add this import:
        import { ArrowUpRight, Check, Mail, Phone } from 'lucide-react';
   3. KEEP: the CrystalizedBall + ConsultationBooking imports, `translations`,
      `apiErrorKeys`, `FormStatus`.
   4. DELETE your `export default function ContactSection` and paste everything
      below (CONTACT constants + css + component) in its place.

   Unchanged behaviour: POST /api/contact, honeypot (read from the form at
   submit time), the API-error to translated-message mapping, the CrystalizedBall
   props, ConsultationBooking, RTL, 3 languages.

   What's better:
   - Same motion language as the rest of the page: word-by-word headline,
     shimmering gradient line, blur-rise reveals, drifting clouds, a grid that
     lights up under the cursor
   - Crystal sits on a proper stage (rings, corner brackets, glow) and pauses
     when the tab is hidden
   - Direct email and phone under the crystal (no new copy needed)
   - Form card with a border that lights up near the cursor
   - Project type is now a set of selectable chips (native radio inputs, still
     `required`) instead of a select
   - Message counter has a progress line; success shows an animated check
   - Removed the dead commented-out honeypot and the unused `website` state

   Please verify the phone number below: it is copied from your poster.
═══════════════════════════════════════════════════════════════════ */

const CONTACT = {
  email: 'info@softechsolutions.com',
  emailHref: 'mailto:info@softechsoftwaresystems.com',
  phoneLabel: '+1 (343) 946-1487',
  phoneHref: 'tel:+1 (343) 946-1487',
};

const css = `
@keyframes cs-rise{from{opacity:0;transform:translateY(.6em);filter:blur(12px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes cs-shimmer{from{background-position:0% center}to{background-position:200% center}}
@keyframes cs-drift-a{0%{transform:translate3d(-4%,0,0) scale(1)}100%{transform:translate3d(6%,5%,0) scale(1.15)}}
@keyframes cs-drift-b{0%{transform:translate3d(5%,3%,0) scale(1.1)}100%{transform:translate3d(-6%,-4%,0) scale(.92)}}
@keyframes cs-pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
.cs [data-r]{opacity:0}
.cs.cs-in [data-r]{animation:cs-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d,0s)}
.cs-g{background-image:linear-gradient(100deg,#28D9A0 0%,#6CE8C2 35%,#65A7FF 70%,#28D9A0 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.cs.cs-in .cs-g[data-r]{animation:cs-rise .9s cubic-bezier(.2,.7,.2,1) var(--d,0s) both,cs-shimmer 8s linear infinite}
.cs-pop{animation:cs-pop .6s cubic-bezier(.2,.9,.3,1.2) both}
@media (prefers-reduced-motion:reduce){.cs [data-r]{opacity:1}.cs.cs-in [data-r],.cs.cs-in .cs-g[data-r],.cs-cloud,.cs-pop{animation:none!important}}
`;

const field =
  'w-full rounded-xl border border-white/[0.1] bg-[#060B16] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#28D9A0]/60 focus:shadow-[0_0_30px_rgba(40,217,160,0.12)] focus:ring-2 focus:ring-[#28D9A0]/10';

export default function ContactSection({ language }: { language: SiteLanguage }) {
  const copy = translations[language];
  const isRtl = language !== 'en';

  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [sceneNearViewport, setSceneNearViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorKey, setErrorKey] = useState<keyof (typeof translations)['en']['errors'] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' });

  // Reveal once.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mount the WebGL crystal only near the viewport; pause it when the tab is hidden.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setSceneNearViewport(true);
    const io = new IntersectionObserver(([e]) => setSceneNearViewport(e.isIntersecting), {
      rootMargin: '180px 0px',
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === 'error') setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Read the honeypot now: currentTarget is gone after the first await.
    const website =
      (event.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    setStatus('sending');
    setErrorKey(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const known = typeof result?.error === 'string' ? apiErrorKeys[result.error] : undefined;
        setStatus('error');
        setErrorKey(known ?? 'generic');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', projectType: '', message: '' });
    } catch {
      setStatus('error');
      setErrorKey('generic');
    }
  }

  const rise = (d: number) => ({ '--d': `${d}s` }) as CSSProperties;
  const words = [...copy.heading[0].split(' '), ...copy.heading[1].split(' ')];
  const gAt = 0.15 + words.length * 0.07 + 0.05;

  const aimSection = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const aimCard = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const gridImage =
    'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)';
  const litMask = 'radial-gradient(320px circle at var(--mx, 30%) var(--my, 30%), #000 0%, transparent 100%)';

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      onPointerMove={aimSection}
      className={`cs relative isolate overflow-hidden border-t border-white/[0.06] bg-[#050914] py-24 sm:py-32 lg:py-36 ${
        seen ? 'cs-in' : ''
      }`}
    >
      <style>{css}</style>

      {/* ATMOSPHERE */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_30%_0%,rgba(20,80,80,.28),transparent_70%)]" />
        <div
          className="cs-cloud absolute -left-1/4 top-[4%] h-[40rem] w-[40rem] rounded-full will-change-transform"
          style={{ background: 'radial-gradient(closest-side, rgba(40,217,160,.16), transparent)', animation: 'cs-drift-a 32s ease-in-out infinite alternate' }}
        />
        <div
          className="cs-cloud absolute -right-1/4 bottom-[-6%] h-[44rem] w-[44rem] rounded-full will-change-transform"
          style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,.16), transparent)', animation: 'cs-drift-b 40s ease-in-out infinite alternate' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: gridImage,
            backgroundSize: '72px 72px',
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{ backgroundImage: gridImage, backgroundSize: '72px 72px', maskImage: litMask, WebkitMaskImage: litMask }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: 'radial-gradient(520px circle at var(--mx, 30%) var(--my, 30%), rgba(40,217,160,.09), rgba(96,165,250,.04) 45%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04070F] to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:px-10">
        {/* LEFT: message + crystal */}
        <div className="relative flex min-w-0 flex-col">
          <div data-r style={rise(0.05)} className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-[#28D9A0]/25 bg-[#28D9A0]/[0.06] px-4 py-2 text-xs font-semibold text-[#28D9A0] ${isRtl ? '' : 'tracking-wide'}`}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#28D9A0] shadow-[0_0_12px_#28D9A0]" />
            {copy.badge}
          </div>

          <h2
            id="contact-heading"
            className={`mt-7 max-w-xl font-semibold text-white ${
              isRtl
                ? 'text-[clamp(2.1rem,5.5vw,4rem)] leading-[1.4] tracking-normal'
                : 'text-[clamp(2.6rem,6vw,5rem)] leading-[1.03] tracking-[-0.05em]'
            }`}
          >
            <span className="block">
              {words.map((w, i) => (
                <span key={i}>
                  <span data-r className="inline-block" style={rise(0.15 + i * 0.07)}>{w}</span>{' '}
                </span>
              ))}
            </span>
            <span data-r className="cs-g mt-2 block pb-2" style={rise(gAt)}>{copy.heading[2]}</span>
          </h2>

          <p data-r style={rise(gAt + 0.25)} className="mt-6 max-w-lg text-base leading-8 text-slate-300 sm:text-[17px]">
            {copy.introduction}
          </p>

          {/* crystal stage */}
          <div
            data-r
            style={rise(gAt + 0.35)}
            ref={sceneRef}
            role="img"
            aria-label={copy.tagline}
            className="relative mx-auto mt-8 h-[320px] w-full max-w-[470px] sm:h-[400px] lg:mx-0 lg:mt-6 lg:h-[430px]"
          >
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#28D9A0]/[0.10] blur-[80px] sm:size-80" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#28D9A0]/20 motion-safe:animate-[spin_90s_linear_infinite] motion-reduce:animate-none" />
            <span aria-hidden="true" className="absolute left-0 top-0 size-5 border-l border-t border-white/25" />
            <span aria-hidden="true" className="absolute right-0 top-0 size-5 border-r border-t border-white/25" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 size-5 border-b border-l border-white/25" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 size-5 border-b border-r border-white/25" />

            {sceneNearViewport ? (
              <CrystalizedBall
                preset="aurora"
                color="#28D9A0"
                size={0.68}
                crackle={0.42}
                fill={0.5}
                interactive
                hoverStrength={0.45}
                strands={5}
                flares={0.35}
                glow={0.72}
                sparks={0.28}
                particleCount={3600}
                motion="rise"
                particleShape="square"
                depth={0.6}
                sway={0.35}
                twinkle={0.4}
                haze={0.5}
                dustSpeed={0.7}
                speed={0.7}
                intro
                paused={!pageVisible}
              />
            ) : (
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#28D9A0]/20 bg-[radial-gradient(circle,rgba(40,217,160,0.12),rgba(16,40,71,0.05)_55%,transparent_72%)] shadow-[0_0_80px_rgba(40,217,160,0.08)]" />
            )}
          </div>

          <div data-r style={rise(gAt + 0.5)} className="mt-6 flex items-center gap-3 text-sm text-slate-400">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#28D9A0]/60" />
            {copy.tagline}
          </div>

          <div data-r style={rise(gAt + 0.6)} dir="ltr" className="mt-5 flex flex-wrap gap-3">
            <a
              href={CONTACT.emailHref}
              className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition-[border-color,background-color] duration-300 hover:border-[#28D9A0]/45 hover:bg-[#28D9A0]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              <Mail size={16} aria-hidden="true" className="text-[#28D9A0]" />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition-[border-color,background-color] duration-300 hover:border-[#28D9A0]/45 hover:bg-[#28D9A0]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              <Phone size={16} aria-hidden="true" className="text-[#28D9A0]" />
              {CONTACT.phoneLabel}
            </a>
          </div>
        </div>

        {/* RIGHT: form card (border lights up near the cursor) */}
        <div
          data-r
          style={
            {
              ...rise(0.3),
              '--x': '-999px',
              '--y': '-999px',
              background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(40,217,160,.75), rgba(255,255,255,.1) 60%)',
            } as CSSProperties
          }
          onPointerMove={aimCard}
          onPointerLeave={(e) => {
            e.currentTarget.style.setProperty('--x', '-999px');
            e.currentTarget.style.setProperty('--y', '-999px');
          }}
          className="relative min-w-0 rounded-[26px] p-px shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
        >
          <div className="relative overflow-hidden rounded-[25px] bg-[#0A1020] p-5 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(460px circle at var(--x) var(--y), rgba(40,217,160,.07), transparent 65%)' }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#28D9A0]/70 to-transparent" />

            <div className="relative mb-8">
              <p className={`text-xs font-semibold text-[#28D9A0] ${isRtl ? '' : 'uppercase tracking-[0.18em]'}`}>{copy.formEyebrow}</p>
              <h3 id="contact-form-heading" className={`mt-3 text-2xl font-semibold text-white sm:text-3xl ${isRtl ? '' : 'tracking-tight'}`}>
                {copy.formHeading}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy.formHelp}</p>
            </div>

            <form aria-labelledby="contact-form-heading" onSubmit={handleSubmit} className="relative space-y-5">
              {/* Honeypot: legitimate users leave this empty */}
              <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-website">{copy.honeypot}</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="new-password" defaultValue="" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-300">{copy.name}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={form.name}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={copy.name}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-300">{copy.email}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    dir="ltr"
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
              </div>

              {/* Project type: native radios (still `required`), styled as chips */}
              <fieldset>
                <legend className="mb-3 block text-sm font-medium text-slate-300">{copy.projectType}</legend>
                <div className="flex flex-wrap gap-2">
                  {translations.en.projects.map((type, i) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="projectType"
                        value={type}
                        required
                        checked={form.projectType === type}
                        onChange={() => updateField('projectType', type)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#060B16] px-4 py-2.5 text-[13px] text-slate-300 transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-white/25 hover:text-white peer-checked:border-[#28D9A0]/70 peer-checked:bg-[#28D9A0]/[0.1] peer-checked:text-[#B6F5DF] peer-checked:shadow-[0_0_24px_rgba(40,217,160,0.18)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#28D9A0]">
                        {form.projectType === type && <Check size={13} aria-hidden="true" className="text-[#28D9A0]" />}
                        {copy.projects[i]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-300">{copy.details}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  value={form.message}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder={copy.messagePlaceholder}
                  className={`${field} resize-y leading-6`}
                />
                <div className="mt-2.5 flex items-center gap-3">
                  <span aria-hidden="true" className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gradient-to-r from-[#28D9A0] to-[#65A7FF] transition-[width] duration-300" style={{ width: `${Math.min(100, form.message.length / 50)}%` }} />
                  </span>
                  <p dir="ltr" aria-label={`${form.message.length} ${copy.characterCount} / 5000`} className="text-xs tabular-nums text-slate-500">
                    {form.message.length}/5000
                  </p>
                </div>
              </div>

              {status === 'success' && (
                <div role="status" className="flex items-start gap-3 rounded-xl border border-[#28D9A0]/25 bg-[#28D9A0]/[0.07] px-4 py-3.5 text-sm leading-6 text-[#9BEFD2]">
                  <span className="cs-pop mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[#28D9A0]/50 bg-[#28D9A0]/15">
                    <Check size={14} aria-hidden="true" className="text-[#28D9A0]" strokeWidth={2.6} />
                  </span>
                  {copy.success}
                </div>
              )}

              {status === 'error' && (
                <div role="alert" className="rounded-xl border border-red-400/25 bg-red-400/[0.07] px-4 py-3 text-sm leading-6 text-red-200">
                  {copy.errors[errorKey ?? 'generic']}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#28D9A0] to-[#4FE3B8] px-5 py-4 text-sm font-bold text-[#04130F] shadow-[0_10px_36px_rgba(40,217,160,0.2)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(40,217,160,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1020] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[160%] skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-[300%]" />
                <span className="relative">{status === 'sending' ? copy.sending : copy.submit}</span>
                {status !== 'sending' && (
                  <ArrowUpRight size={16} aria-hidden="true" className={`relative transition-transform duration-200 group-hover:-translate-y-0.5 ${isRtl ? '-scale-x-100 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">{copy.privacy}</p>
            </form>

            <div className="relative mt-8 border-t border-white/[0.08] pt-6">
              <ConsultationBooking language={language} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}