"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import {
  SITE_LANGUAGE_CHANGE_EVENT,
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

type LegalDocument = "privacy" | "terms";

const legalCopy = {
  en: {
    privacy: {
      title: "Privacy",
      intro:
        "This page is a basic policy draft for review, not legal advice.",
      sections: [
        {
          title: "Information you submit",
          body: "The contact form asks for your name, email address, project type, and project details. The form submits these details so SofTech can respond to your inquiry.",
        },
        {
          title: "How inquiries are handled",
          body: "The website sends contact form submissions through its configured email-delivery route. This site does not describe or promise a particular retention period or handling by email providers.",
        },
        {
          title: "Questions",
          body: "For questions about this draft or a submitted inquiry, contact:",
        },
      ],
    },
    terms: {
      title: "Terms",
      intro:
        "This page is a basic terms draft for review, not legal advice.",
      sections: [
        {
          title: "Website information",
          body: "This website provides general information about SofTech's services and approach. It is not a project proposal, quote, or commitment to deliver a particular result.",
        },
        {
          title: "Project agreements",
          body: "Any project work, scope, fees, schedule, deliverables, and other terms should be agreed separately in writing before work begins.",
        },
        {
          title: "Questions",
          body: "For questions about these draft terms, contact:",
        },
      ],
    },
    review: "Basic draft for review · Not legal advice",
    footer: "SofTech Solutions",
    home: "Home",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
  },
  "fa-AF": {
    privacy: {
      title: "حریم خصوصی",
      intro: "این صفحه پیش‌نویس ساده برای بررسی است و مشورهٔ حقوقی نیست.",
      sections: [
        {
          title: "اطلاعاتی که می‌فرستید",
          body: "فرم تماس نام، نشانی ایمیل، نوع پروژه و جزئیات پروژه را می‌خواهد. این اطلاعات برای پاسخ‌گویی به درخواست شما فرستاده می‌شود.",
        },
        {
          title: "رسیدگی به درخواست‌ها",
          body: "وب‌سایت درخواست‌های فرم تماس را از مسیر تنظیم‌شدهٔ ارسال ایمیل می‌فرستد. این صفحه مدت نگهداری معینی یا شیوهٔ رسیدگی ارائه‌دهندگان ایمیل را تضمین نمی‌کند.",
        },
        {
          title: "پرسش‌ها",
          body: "برای پرسش دربارهٔ این پیش‌نویس یا درخواست فرستاده‌شده، تماس بگیرید:",
        },
      ],
    },
    terms: {
      title: "شرایط",
      intro: "این صفحه پیش‌نویس سادهٔ شرایط برای بررسی است و مشورهٔ حقوقی نیست.",
      sections: [
        {
          title: "اطلاعات وب‌سایت",
          body: "این وب‌سایت اطلاعات عمومی دربارهٔ خدمات و رویکرد SofTech ارائه می‌کند. این محتوا پیشنهاد پروژه، نرخ‌نامه یا تعهد به نتیجهٔ مشخص نیست.",
        },
        {
          title: "توافق پروژه",
          body: "کار پروژه، محدوده، هزینه، زمان‌بندی، موارد تحویلی و شرایط دیگر باید پیش از آغاز کار جداگانه و به‌صورت کتبی توافق شوند.",
        },
        {
          title: "پرسش‌ها",
          body: "برای پرسش دربارهٔ این شرایط پیش‌نویس، تماس بگیرید:",
        },
      ],
    },
    review: "پیش‌نویس ساده برای بررسی · مشورهٔ حقوقی نیست",
    footer: "SofTech Solutions",
    home: "خانه",
    privacyLabel: "حریم خصوصی",
    termsLabel: "شرایط",
  },
  ps: {
    privacy: {
      title: "د محرمیت تګلاره",
      intro: "دا پاڼه د بیاکتنې لپاره یوه ساده مسوده ده، حقوقي مشوره نه ده.",
      sections: [
        {
          title: "هغه معلومات چې تاسو یې لېږئ",
          body: "د اړیکې فورمه ستاسو نوم، برېښنالیک، د پروژې ډول او د پروژې جزیات غواړي. دا معلومات د دې لپاره لېږل کېږي چې SofTech ستاسو غوښتنې ته ځواب ووایي.",
        },
        {
          title: "د غوښتنو اداره کول",
          body: "وېب‌پاڼه د اړیکې فورمې سپارنې د برېښنالیک د تنظیم شوې لارې له لارې لېږي. دا پاڼه د ساتلو ځانګړې موده یا د برېښنالیک د خدمتونو د برابرونکو د چلند ژمنه نه کوي.",
        },
        {
          title: "پوښتنې",
          body: "د دې مسودې یا لېږل شوې غوښتنې په اړه د پوښتنو لپاره اړیکه ونیسئ:",
        },
      ],
    },
    terms: {
      title: "شرایط",
      intro: "دا پاڼه د بیاکتنې لپاره د شرایطو ساده مسوده ده، حقوقي مشوره نه ده.",
      sections: [
        {
          title: "د وېب‌پاڼې معلومات",
          body: "دا وېب‌پاڼه د SofTech د خدمتونو او تګلارې په اړه عمومي معلومات وړاندې کوي. دا د پروژې وړاندیز، نرخ‌پاڼه یا د یوې ځانګړې پایلې ژمنه نه ده.",
        },
        {
          title: "د پروژې تړونونه",
          body: "د پروژې کار، ساحه، لګښتونه، مهالوېش، سپارل کېدونکي توکي او نور شرایط باید د کار له پیل مخکې په جلا لیکلي تړون کې ومنل شي.",
        },
        {
          title: "پوښتنې",
          body: "د دې مسودې شرایطو په اړه د پوښتنو لپاره اړیکه ونیسئ:",
        },
      ],
    },
    review: "د بیاکتنې لپاره ساده مسوده · حقوقي مشوره نه ده",
    footer: "SofTech Solutions",
    home: "کور",
    privacyLabel: "محرمیت",
    termsLabel: "شرایط",
  },
} as const;

export default function LegalPage({ document }: { document: LegalDocument }) {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const copy = legalCopy[language];
  const page = copy[document];
  const isRtl = language !== "en";

  useEffect(() => {
    const applyLanguage = (value: string | null) => {
      if (isSiteLanguage(value)) setLanguage(value);
    };
    const onLanguageChange = (event: Event) => {
      applyLanguage((event as CustomEvent<SiteLanguage>).detail);
    };

    try {
      applyLanguage(window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY));
    } catch {
      // The default language remains available when storage is unavailable.
    }
    window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, onLanguageChange);
    return () => window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, onLanguageChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#03070f] text-[#EDF3FA]">
      <SiteNavbar />
      <main
        lang={language}
        dir={isRtl ? "rtl" : "ltr"}
        className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28D9A0]">
          {copy.review}
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
          {page.intro}
        </p>
        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {page.sections.map((section) => (
            <section key={section.title} className="py-6">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
              {section.title === page.sections[page.sections.length - 1]?.title && (
                <a
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#80E4C4] underline decoration-[#28D9A0]/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]"
                  href="mailto:info@softechsoftwaresystems.com"
                >
                  info@softechsoftwaresystems.com
                </a>
              )}
            </section>
          ))}
        </div>
      </main>
      <footer className="border-t border-white/[0.08] px-5 py-6 text-sm text-slate-500 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0]">
            {copy.footer} · {copy.home}
          </Link>
          <nav aria-label={language === "en" ? "Legal" : copy.termsLabel} className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">{copy.privacyLabel}</Link>
            <Link href="/terms" className="hover:text-white">{copy.termsLabel}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
