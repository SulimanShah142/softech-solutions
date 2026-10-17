
'use client';

import { useState, type FormEvent } from 'react';
import CrystalizedBall from '@/components/CrystalizedBall';
import type { SiteLanguage } from '@/lib/site-language';
import ConsultationBooking from '@/components/contact/ConsultationBooking';


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

export default function ContactSection({ language }: { language: SiteLanguage }) {
  const copy = translations[language];
  const isRtl = language !== 'en';
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorKey, setErrorKey] = useState<
    keyof (typeof translations)['en']['errors'] | null
  >(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    website: '',
  });

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === 'error') setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorKey(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
  name: form.name,
  email: form.email,
  projectType: form.projectType,
  message: form.message,
  website:
    (
      event.currentTarget.elements.namedItem(
        'website',
      ) as HTMLInputElement | null
    )?.value ?? '',
}),
      });

      const result = await response.json();

      if (!response.ok) {
        const safeMessage =
          typeof result?.error === 'string' && apiErrorKeys[result.error]
            ? result.error
            : 'We could not send your message. Please try again.';
        throw new Error(safeMessage);
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        projectType: '',
        message: '',
        website: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorKey(
        error instanceof Error && apiErrorKeys[error.message]
          ? apiErrorKeys[error.message]
          : 'generic',
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      lang={language}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#050914] py-24 sm:py-32"
    >
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-48 top-10 h-[440px] w-[440px] rounded-full bg-[#28D9A0]/[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
        {/* Brand message and crystal */}
        <div className={`relative flex min-w-0 flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border border-[#28D9A0]/20 bg-[#28D9A0]/[0.06] px-3.5 py-2 text-xs font-semibold text-[#28D9A0] ${isRtl ? 'flex-row-reverse' : 'tracking-wide'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#28D9A0] shadow-[0_0_12px_#28D9A0]" />
            {copy.badge}
          </div>

          <h2 id="contact-heading" className={`mt-7 max-w-xl text-4xl font-semibold leading-[1.08] ${isRtl ? '' : 'tracking-tight'} text-white sm:text-5xl lg:text-6xl`}>
            {copy.heading[0]}
            <br />
            {copy.heading[1]}
            <span className="mt-2 block bg-gradient-to-r from-[#28D9A0] via-[#6CE8C2] to-[#65A7FF] bg-clip-text pb-1 text-transparent">
              {copy.heading[2]}
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            {copy.introduction}
          </p>

          <div className={`relative mx-auto mt-5 h-[300px] w-full max-w-[440px] sm:mt-2 sm:h-[390px] ${isRtl ? 'lg:-mr-6' : 'lg:-ml-6'} lg:mt-0 lg:h-[420px]`}>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#28D9A0]/[0.06] blur-[70px] sm:h-72 sm:w-72"
            />
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
              particleCount={10000}
              motion="rise"
              particleShape="square"
              depth={0.6}
              sway={0.35}
              twinkle={0.4}
              haze={0.5}
              dustSpeed={0.7}
              speed={0.7}
              intro
              paused={false}
            />
          </div>

          <div className={`mt-1 flex items-center gap-3 text-sm text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="h-px w-8 bg-[#28D9A0]/50" />
            {copy.tagline}
          </div>
        </div>

        {/* Contact form */}
        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#28D9A0]/[0.08] via-transparent to-blue-500/[0.07] blur-2xl"
          />

          <div className={`relative rounded-3xl border border-white/[0.1] bg-[#0A1020]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="mb-7">
              <p className={`text-xs font-semibold uppercase ${isRtl ? '' : 'tracking-[0.2em]'} text-[#28D9A0]`}>
                {copy.formEyebrow}
              </p>
              <h3 id="contact-form-heading" className={`mt-3 text-2xl font-semibold text-white sm:text-3xl ${isRtl ? '' : 'tracking-tight'}`}>
                {copy.formHeading}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {copy.formHelp}
              </p>
            </div>

            <form
              aria-labelledby="contact-form-heading"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Honeypot field: hidden from regular visitors */}
              {/* <div
                aria-hidden="true"
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    updateField('website', event.target.value)
                  }
                />
              </div> */}

              
{/* Honeypot: legitimate users should leave this field empty */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
>
  <label htmlFor="contact-website">
    {copy.honeypot}
  </label>
  <input
    id="contact-website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="new-password"
    defaultValue=""
  />
</div>


              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    {copy.name}
                  </label>
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
                    onChange={(event) =>
                      updateField('name', event.target.value)
                    }
                    placeholder={copy.name}
                    className="w-full rounded-xl border border-white/[0.1] bg-[#060B16] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#28D9A0]/60 focus:ring-2 focus:ring-[#28D9A0]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    {copy.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    dir="ltr"
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#060B16] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#28D9A0]/60 focus:ring-2 focus:ring-[#28D9A0]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-project"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  {copy.projectType}
                </label>
                <select
                  id="contact-project"
                  name="projectType"
                  required
                  value={form.projectType}
                  onChange={(event) =>
                    updateField('projectType', event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-white/[0.1] bg-[#060B16] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#28D9A0]/60 focus:ring-2 focus:ring-[#28D9A0]/10"
                >
                  <option value="" disabled>
                    {copy.chooseProject}
                  </option>
                  {translations.en.projects.map((type, index) => (
                    <option key={type} value={type}>
                      {copy.projects[index]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  {copy.details}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  value={form.message}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                  placeholder={copy.messagePlaceholder}
                  className="w-full resize-y rounded-xl border border-white/[0.1] bg-[#060B16] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-[#28D9A0]/60 focus:ring-2 focus:ring-[#28D9A0]/10"
                />
                <p
                  aria-label={`${form.message.length} ${copy.characterCount} / 5000`}
                  className={`mt-2 text-xs text-slate-600 ${isRtl ? 'text-left' : 'text-right'}`}
                >
                  {form.message.length}/5000
                </p>
              </div>

              {status === 'success' && (
                <div
                  role="status"
                  className="rounded-xl border border-[#28D9A0]/20 bg-[#28D9A0]/[0.07] px-4 py-3 text-sm leading-6 text-[#8AF0CD]"
                >
                  {copy.success}
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-200"
                >
                  {copy.errors[errorKey ?? 'generic']}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#28D9A0] px-5 py-4 text-sm font-bold text-[#04130F] transition duration-200 hover:bg-[#51E6B5] hover:shadow-[0_0_35px_rgba(40,217,160,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1020] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? copy.sending : copy.submit}
                {status !== 'sending' && (
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    style={isRtl ? { transform: 'scaleX(-1)' } : undefined}
                  >
                    ↗
                  </span>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                {copy.privacy}
              </p>
            </form>
            <ConsultationBooking language={language} />
          </div>
        </div>
      </div>
    </section>
  );
}
