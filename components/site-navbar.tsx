
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  setSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

type Language = SiteLanguage;

const languages: Language[] = ["en", "fa-AF", "ps"];

const translations: Record<
  Language,
  {
    home: string;
    technology: string;
    engineering: string;
    capabilities: string;
    testimonials: string;
    contact: string;
    startProject: string;
    softwareEngineering: string;
    openMenu: string;
    closeMenu: string;
    mobileNavigation: string;
    navigation: string;
    ideaPrompt: string;
    offerings: string;
    language: string;
  }
> = {
  en: {
    home: "Home",
    technology: "Technology",
    engineering: "Engineering",
    capabilities: "Capabilities",
    testimonials: "Testimonials",
    contact: "Contact",
    startProject: "Start a project",
    softwareEngineering: "Software engineering",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mobileNavigation: "Mobile navigation",
    navigation: "Navigation",
    ideaPrompt: "Have an idea? Let's discuss what we can build together.",
    offerings: "Software · AI · Digital Solutions",
    language: "Language",
  },
  "fa-AF": {
    home: "خانه",
    technology: "تکنالوژی",
    engineering: "انجنیری",
    capabilities: "توانایی‌ها",
    testimonials: "دیدگاه مشتریان",
    contact: "تماس",
    startProject: "آغاز یک پروژه",
    softwareEngineering: "انجنیری نرم‌افزار",
    openMenu: "باز کردن منوی راهبری",
    closeMenu: "بستن منوی راهبری",
    mobileNavigation: "منوی راهبری موبایل",
    navigation: "راهبری",
    ideaPrompt: "ایده‌ای دارید؟ بیایید درباره ساخت آن باهم گفتگو کنیم.",
    offerings: "نرم‌افزار · هوش مصنوعی · راهکارهای دیجیتال",
    language: "زبان",
  },
  ps: {
    home: "کور",
    technology: "ټکنالوژي",
    engineering: "انجینري",
    capabilities: "وړتیاوې",
    testimonials: "د پېرودونکو نظرونه",
    contact: "اړیکه",
    startProject: "یوه پروژه پیل کړئ",
    softwareEngineering: "د سافټویر انجینري",
    openMenu: "د غورنۍ پرانیستل",
    closeMenu: "د غورنۍ تړل",
    mobileNavigation: "د موبایل غورنۍ",
    navigation: "غورنۍ",
    ideaPrompt: "نظر لرئ؟ راځئ په ګډه د جوړولو په اړه خبرې وکړو.",
    offerings: "سافټویر · مصنوعي ځیرکتیا · ډیجیټلي حللارې",
    language: "ژبه",
  },
};

const navLinks: {
  label: keyof Pick<
    (typeof translations)["en"],
    "technology" | "engineering" | "capabilities" | "testimonials" | "contact"
  >;
  href: string;
}[] = [
  { label: "technology", href: "/#technology" },
  { label: "engineering", href: "/#engineering-section" },
  { label: "capabilities", href: "/#capabilities" },
  { label: "testimonials", href: "/#testimonials" },
  { label: "contact", href: "/#contact" },
];

function LanguageSwitcher({
  language,
  onChange,
  label,
  tabIndex,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
  tabIndex?: number;
}) {
  const names: Record<Language, string> = {
    en: "EN",
    "fa-AF": "دری",
    ps: "پښتو",
  };

  return (
    <div
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.03] p-1"
      role="group"
    >
      {languages.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-label={
            option === "en" ? "English" : option === "fa-AF" ? "Dari" : "Pashto"
          }
          aria-pressed={language === option}
          tabIndex={tabIndex}
          onClick={() => onChange(option)}
          className={`rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors ${
            language === option
              ? "bg-[#078df3]/20 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {names[option]}
        </button>
      ))}
    </div>
  );
}

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuAreaRef = useRef<HTMLDivElement | null>(null);
  const text = translations[language];
  const isRtl = language !== "en";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedLanguage = window.localStorage.getItem(
        SITE_LANGUAGE_STORAGE_KEY,
      );
      if (isSiteLanguage(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setSiteLanguage(nextLanguage);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuAreaRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    const frame = window.requestAnimationFrame(() =>
      menuAreaRef.current
        ?.querySelector<HTMLElement>("#site-navigation-menu a[href]")
        ?.focus(),
    );
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        dir={isRtl ? "rtl" : "ltr"}
        lang={language}
        className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050914]/95 shadow-[0_10px_35px_rgba(0,0,0,0.16)]"
      >
        <nav
          aria-label={text.navigation}
          className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10"
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${text.home} - SofTech Solutions`}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/softech-solutions-image.png"
              alt=""
              width={68}
              height={46}
              priority
              className="h-[46px] w-[68px] object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#edf3fa] sm:text-[15px]">
                SofTech <span className="text-[#23b9ff]">Solutions</span>
              </span>
              <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {text.softwareEngineering}
              </span>
            </span>
          </Link>

          <div
            ref={menuAreaRef}
            className="relative flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <Link
              href="/#contact"
              onClick={closeMenu}
              aria-label={text.startProject}
              className="group inline-flex min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#078df3]/40 bg-[#078df3] px-2.5 py-2 text-[11px] font-semibold text-white shadow-[0_0_24px_rgba(7,141,243,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#23b9ff] hover:bg-[#087fda] hover:shadow-[0_0_30px_rgba(7,141,243,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23b9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914] sm:gap-2 sm:px-3 sm:text-[12px]"
            >
              <span className="hidden sm:inline">{text.startProject}</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className={`transition-transform duration-200 group-hover:-translate-y-0.5 ${isRtl ? "scale-x-[-1] group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-menu"
              ref={menuButtonRef}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-[#078df3]/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23b9ff]"
            >
              {menuOpen ? (
                <X size={19} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>

            {menuOpen && (
              <div
                id="site-navigation-menu"
                dir={isRtl ? "rtl" : "ltr"}
                lang={language}
                aria-label={text.navigation}
                className="absolute end-0 top-[calc(100%+14px)] z-[70] max-h-[calc(100dvh-5.5rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/[0.11] bg-[#080f1d]/[0.98] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.5)] ring-1 ring-black/20 backdrop-blur-xl sm:p-5"
              >
                <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {text.navigation}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#23b9ff]/50 to-transparent" />
                </div>

                <div className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex min-h-10 items-center justify-between border-b border-white/[0.055] px-1 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-[#23b9ff]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-5 font-mono text-[9px] text-slate-600 transition-colors group-hover:text-[#23b9ff]/70">
                          0{index + 1}
                        </span>
                        {text[link.label]}
                      </span>
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className={`text-slate-600 transition-transform group-hover:-translate-y-0.5 group-hover:text-[#23b9ff] ${isRtl ? "scale-x-[-1]" : ""}`}
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {text.language}
                  </span>
                  <LanguageSwitcher
                    language={language}
                    onChange={changeLanguage}
                    label={text.language}
                  />
                </div>

                <div className="mt-4 border-t border-white/[0.08] pt-4">
                  <p className="mb-3 text-xs leading-5 text-slate-500">
                    {text.ideaPrompt}
                  </p>
                  <Link
                    href="/#contact"
                    onClick={closeMenu}
                    className="group flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#078df3]/35 bg-[#078df3]/95 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#087fda] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23b9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f1d]"
                  >
                    {text.startProject}
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className={isRtl ? "scale-x-[-1]" : ""}
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
