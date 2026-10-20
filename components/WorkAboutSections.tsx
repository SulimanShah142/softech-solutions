import Link from "next/link";
import { ArrowUpRight, Check, CircleDashed } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

const content = {
  en: {
    work: {
      eyebrow: "Selected work",
      title: "A transparent view of the work.",
      description:
        "We are building a verified project portfolio. Until client work is ready to share, this is the one in-house example we can show.",
      ownWork: "In-house digital experience",
      ownTitle: "SofTech Solutions website",
      ownDescription:
        "Our own website brings together service information, an engineering approach, and a contact flow in one responsive experience.",
      ownLabel: "SofTech's own digital experience · Not client work",
      pendingTitle: "Client case studies",
      pendingDescription:
        "Client projects, names, and outcomes are not published here until the details and permission to share them are verified.",
      pending: "Case studies pending verification",
      cta: "Discuss a project",
    },
    about: {
      eyebrow: "About SofTech",
      title: "Thoughtful software, shaped around real needs.",
      description:
        "The services described across this site include web and mobile products, custom software, applied AI and automation, and system integrations.",
      approach: "How we approach the work",
      principles: [
        ["Architecture first", "Clarify system boundaries and data responsibilities before implementation."],
        ["Connected by design", "Plan integrations and shared service rules around the product."],
        ["Technology with purpose", "Choose tools to suit the problem rather than follow a trend."],
      ],
      founder: "Founder profile",
      founderPending:
        "Pending verification. A confirmed founder name, biography, and portrait have not been provided for publication.",
      contact: "Start a conversation",
    },
  },
  "fa-AF": {
    work: {
      eyebrow: "نمونه کارها",
      title: "نمایی شفاف از کارها.",
      description:
        "در حال آماده‌سازی نمونه‌کارهای تأییدشده هستیم. تا زمانی که کارهای مشتریان برای نشر آماده شوند، این نمونهٔ داخلی را نمایش می‌دهیم.",
      ownWork: "تجربهٔ دیجیتال داخلی",
      ownTitle: "وب‌سایت SofTech Solutions",
      ownDescription:
        "وب‌سایت خود ما اطلاعات خدمات، رویکرد مهندسی و راه ارتباطی را در یک تجربهٔ واکنش‌گرا گرد هم می‌آورد.",
      ownLabel: "تجربهٔ دیجیتال خود SofTech · کار مشتری نیست",
      pendingTitle: "مطالعات موردی مشتریان",
      pendingDescription:
        "پروژه‌ها، نام‌ها و نتایج مشتریان تا زمان تأیید جزئیات و اجازهٔ نشر در اینجا منتشر نمی‌شوند.",
      pending: "مطالعات موردی در انتظار تأیید",
      cta: "دربارهٔ پروژه گفتگو کنید",
    },
    about: {
      eyebrow: "دربارهٔ SofTech",
      title: "نرم‌افزار سنجیده، بر پایهٔ نیازهای واقعی.",
      description:
        "خدماتی که در این وب‌سایت معرفی شده‌اند شامل محصولات وب و موبایل، نرم‌افزار سفارشی، هوش مصنوعی کاربردی و خودکارسازی، و یکپارچه‌سازی سیستم‌ها هستند.",
      approach: "رویکرد کاری ما",
      principles: [
        ["معماری در اولویت", "پیش از پیاده‌سازی، مرزهای سیستم و مسئولیت داده‌ها را روشن می‌کنیم."],
        ["پیوند از آغاز طراحی", "یکپارچه‌سازی‌ها و قواعد مشترک خدمات را بر پایهٔ محصول برنامه‌ریزی می‌کنیم."],
        ["فناوری هدفمند", "ابزارها را بر اساس مسئله انتخاب می‌کنیم، نه مُد روز."],
      ],
      founder: "پروفایل بنیان‌گذار",
      founderPending:
        "در انتظار تأیید. نام، زندگینامه و تصویر تأییدشده‌ای برای نشر ارائه نشده است.",
      contact: "گفتگو را آغاز کنید",
    },
  },
  ps: {
    work: {
      eyebrow: "غوره شوي کارونه",
      title: "د کارونو رڼه کتنه.",
      description:
        "موږ د تایید شویو پروژو بېلګې چمتو کوو. تر هغو چې د پېرودونکو کارونه د خپرېدو لپاره چمتو شي، دا خپله داخلي بېلګه ښیو.",
      ownWork: "زموږ خپله ډیجیټلي تجربه",
      ownTitle: "د SofTech Solutions وېب‌پاڼه",
      ownDescription:
        "زموږ خپله وېب‌پاڼه د خدمتونو معلومات، د انجینرۍ تګلاره او د اړیکې لاره په یوه ځواب‌ویونکې تجربه کې راټولوي.",
      ownLabel: "د SofTech خپله ډیجیټلي تجربه · د پېرودونکي کار نه دی",
      pendingTitle: "د پېرودونکو د قضیو بېلګې",
      pendingDescription:
        "د پېرودونکو پروژې، نومونه او پایلې تر هغو نه خپروو چې جزیات او د شریکولو اجازه یې تایید شوې نه وي.",
      pending: "د قضیو بېلګې د تایید په تمه دي",
      cta: "د پروژې په اړه خبرې",
    },
    about: {
      eyebrow: "د SofTech په اړه",
      title: "د واقعي اړتیاوو لپاره سنجول شوی سافټویر.",
      description:
        "په دې وېب‌پاڼه کې یاد شوي خدمتونه وېب او موبایل محصولات، ځانګړی سافټویر، عملي مصنوعي ځیرکتیا او اتومات، او د سیسټمونو یوځای کول دي.",
      approach: "زموږ کاري تګلاره",
      principles: [
        ["معماري لومړی", "له پلي کولو مخکې د سیسټم پولې او د معلوماتو مسؤلیتونه روښانوو."],
        ["له ډیزاین سره نښلول", "د محصول لپاره یوځای کول او ګډ خدمت اصول پلان کوو."],
        ["موخه‌لرونکې ټکنالوژي", "وسایل د ستونزې له مخې ټاکو، نه د لنډمهاله دود له مخې."],
      ],
      founder: "د بنسټګر پېژندنه",
      founderPending:
        "د تایید په تمه. د خپرولو لپاره د بنسټګر تایید شوی نوم، ژوندلیک او انځور نه دی وړاندې شوی.",
      contact: "خبرې پیل کړئ",
    },
  },
} as const;

export default function WorkAboutSections({
  language,
}: {
  language: SiteLanguage;
}) {
  const copy = content[language];
  const isRtl = language !== "en";

  return (
    <>
      <section
        id="work"
        lang={language}
        dir={isRtl ? "rtl" : "ltr"}
        aria-labelledby="work-heading"
        className="scroll-mt-24 border-t border-white/[0.07] bg-[#050914] px-5 py-20 text-[#EDF3FA] sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28D9A0]">
              {copy.work.eyebrow}
            </p>
            <h2 id="work-heading" className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {copy.work.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {copy.work.description}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="relative overflow-hidden border border-[#28D9A0]/20 bg-[linear-gradient(130deg,rgba(17,43,58,0.75),rgba(7,14,26,0.92)_62%)] p-6 sm:p-9">
              <div aria-hidden="true" className="absolute inset-y-0 end-0 w-1 bg-[#28D9A0]/70" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#70D9B4]">
                {copy.work.ownWork}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
                {copy.work.ownTitle}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                {copy.work.ownDescription}
              </p>
              <p className="mt-7 inline-flex items-center gap-2 border-t border-white/[0.1] pt-4 text-xs text-slate-400">
                <Check size={14} aria-hidden="true" className="text-[#28D9A0]" />
                {copy.work.ownLabel}
              </p>
            </article>

            <article className="flex flex-col justify-between border border-dashed border-white/[0.16] bg-white/[0.018] p-6 sm:p-9">
              <div>
                <CircleDashed size={20} aria-hidden="true" className="text-slate-500" />
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {copy.work.pendingTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {copy.work.pendingDescription}
                </p>
              </div>
              <span className="mt-7 border-t border-white/[0.08] pt-4 text-xs font-medium text-slate-500">
                {copy.work.pending}
              </span>
            </article>
          </div>
        </div>
      </section>

      <section
        id="about"
        lang={language}
        dir={isRtl ? "rtl" : "ltr"}
        aria-labelledby="about-heading"
        className="scroll-mt-24 border-t border-white/[0.07] bg-[#03070f] px-5 py-20 text-[#EDF3FA] sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28D9A0]">
              {copy.about.eyebrow}
            </p>
            <h2 id="about-heading" className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {copy.about.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {copy.about.description}
            </p>
            <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              {copy.about.approach}
            </h3>
            <ul className="mt-4 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {copy.about.principles.map(([title, description], index) => (
                <li key={title} className="flex gap-4 py-4">
                  <span className="pt-0.5 font-mono text-[10px] text-[#28D9A0]/70">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{title}</h4>
                    <p className="mt-1 text-xs leading-6 text-slate-400">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-center border border-white/[0.09] bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">
              {copy.about.founder}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {copy.about.founderPending}
            </p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#28D9A0]/40 text-sm font-semibold text-white transition-colors hover:border-[#28D9A0] hover:text-[#28D9A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
            >
              {copy.about.contact}
              <ArrowUpRight aria-hidden="true" size={15} className={isRtl ? "rotate-[-90deg]" : ""} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
