"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import {
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  setSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

type Language = SiteLanguage;

const languages: Language[] = ["en", "fa-AF", "ps"];

type Translation = {
  home: string;
  technology: string;
  engineering: string;
  capabilities: string;
  contact: string;
  startProject: string;
  softwareEngineering: string;
  openMenu: string;
  closeMenu: string;
  mobileNavigation: string;
  navigation: string;
  ideaPrompt: string;
  language: string;
  brandDescription: string;
};

const translations: Record<Language, Translation> = {
  en: {
    home: "Home",
    technology: "Technology",
    engineering: "Engineering",
    capabilities: "Services",
    contact: "Contact",
    startProject: "Discuss a project",
    softwareEngineering: "Software engineering",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mobileNavigation: "Mobile navigation",
    navigation: "Navigation",
    ideaPrompt: "Have a business challenge to solve?",
    language: "Language",
    brandDescription: "Software engineering",
  },

  "fa-AF": {
    home: "خانه",
    technology: "تکنالوژی",
    engineering: "انجنیری",
    capabilities: "خدمات",
    contact: "تماس",
    startProject: "گفتگو درباره پروژه",
    softwareEngineering: "انجنیری نرم‌افزار",
    openMenu: "باز کردن منوی راهبری",
    closeMenu: "بستن منوی راهبری",
    mobileNavigation: "منوی راهبری موبایل",
    navigation: "راهبری",
    ideaPrompt: "برای حل یک چالش تجاری آماده گفتگو هستید؟",
    language: "زبان",
    brandDescription: "انجنیری نرم‌افزار",
  },

  ps: {
    home: "کور",
    technology: "ټکنالوژي",
    engineering: "انجینري",
    capabilities: "خدمتونه",
    contact: "اړیکه",
    startProject: "د پروژې په اړه خبرې",
    softwareEngineering: "د سافټویر انجینري",
    openMenu: "د غورنۍ پرانیستل",
    closeMenu: "د غورنۍ تړل",
    mobileNavigation: "د موبایل غورنۍ",
    navigation: "غورنۍ",
    ideaPrompt: "د سوداګرۍ د یوې ستونزې د حل په اړه خبرې وکړو؟",
    language: "ژبه",
    brandDescription: "د سافټویر انجینري",
  },
};

type NavigationKey =
  | "technology"
  | "engineering"
  | "capabilities"
  | "contact";

const navLinks: {
  label: NavigationKey;
  href: string;
}[] = [
  { label: "technology", href: "/#technology" },
  { label: "engineering", href: "/#engineering-section" },
  { label: "capabilities", href: "/#capabilities" },
  { label: "contact", href: "/#contact" },
];

const languageNames: Record<Language, string> = {
  en: "English",
  "fa-AF": "Dari",
  ps: "Pashto",
};

const languageLabels: Record<Language, string> = {
  en: "EN",
  "fa-AF": "دری",
  ps: "پښتو",
};

function LanguageSwitcher({
  language,
  onChange,
  label,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-white/[0.09] bg-white/[0.025] p-1"
    >
      {languages.map((option) => {
        const selected = language === option;

        return (
          <button
            key={option}
            type="button"
            lang={option}
            aria-label={languageNames[option]}
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={[
              "inline-flex min-h-8 items-center justify-center rounded-md",
              "px-2.5 text-[11px] font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2",
              "focus-visible:ring-offset-[#050914]",
              selected
                ? "bg-white/[0.09] text-white"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white",
            ].join(" ")}
          >
            {languageLabels[option]}
          </button>
        );
      })}
    </div>
  );
}

function ProjectLink({
  label,
  rtl,
  onClick,
  className = "",
}: {
  label: string;
  rtl: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/#contact"
      onClick={onClick}
      className={[
        "group inline-flex min-h-10 items-center justify-center gap-2",
        "whitespace-nowrap rounded-lg border border-[#28D9A0]/40",
        "bg-[#28D9A0] px-3.5 py-2",
        "text-[11px] font-semibold text-[#04120F]",
        "transition-colors duration-200",
        "hover:border-[#55E8B7] hover:bg-[#55E8B7]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#050914]",
        "sm:px-4 sm:text-xs",
        className,
      ].join(" ")}
    >
      <span>{label}</span>

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className={[
          "shrink-0 transition-transform duration-200",
          rtl
            ? "scale-x-[-1] group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5",
        ].join(" ")}
      />
    </Link>
  );
}

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuAreaRef = useRef<HTMLDivElement>(null);

  const menuId = useId();

  const text = translations[language];
  const isRtl = language !== "en";

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem(
        SITE_LANGUAGE_STORAGE_KEY,
      );

      if (isSiteLanguage(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    } catch {
      // Keep the default language if browser storage is unavailable.
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);

    try {
      setSiteLanguage(nextLanguage);
    } catch {
      // The current selection still works if persistence is unavailable.
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
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
      const target = event.target;

      if (
        target instanceof Node &&
        menuAreaRef.current &&
        !menuAreaRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      lang={language}
      className={[
        "sticky top-0 z-50 w-full",
        "border-b border-white/[0.08]",
        "bg-[#050914]/95 text-[#EDF3FA]",
        "shadow-[0_8px_28px_rgba(0,0,0,0.14)]",
        "backdrop-blur-xl",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex h-[68px] max-w-[1440px]",
          "items-center justify-between gap-3",
          "px-4 sm:px-6 lg:h-[76px] lg:px-10 xl:px-12",
        ].join(" ")}
      >
        {/* Brand */}
        <Link
          href="/#home"
          aria-label={`SofTech Solutions — ${text.home}`}
          onClick={closeMenu}
          className={[
            "group flex min-w-0 shrink-0 items-center gap-2.5",
            "rounded-md focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#28D9A0]",
          ].join(" ")}
        >
          <Image
            src="/softech-solutions-image.png"
            alt=""
            width={48}
            height={36}
            priority
            className={[
              "h-8 w-10 shrink-0 object-contain",
              "transition-opacity duration-200 group-hover:opacity-80",
              "sm:h-9 sm:w-11",
            ].join(" ")}
          />

          <span className="flex min-w-0 flex-col justify-center">
            <span className="whitespace-nowrap text-[14px] font-semibold tracking-[-0.045em] text-[#EDF3FA] sm:text-[15px]">
              SofTech
              <span className="text-[#28D9A0]"> Solutions</span>
            </span>

            <span className="mt-0.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-[9px] sm:tracking-[0.15em]">
              {text.brandDescription}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label={text.navigation}
          className="hidden min-w-0 flex-1 items-center justify-center md:flex"
        >
          <div className="flex items-center gap-5 lg:gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "group relative inline-flex min-h-10 items-center",
                  "whitespace-nowrap py-2 text-[11px] font-medium",
                  "text-slate-400 transition-colors duration-200",
                  "hover:text-white",
                  "focus-visible:outline-none focus-visible:text-[#28D9A0]",
                  "after:absolute after:inset-x-0 after:bottom-1",
                  "after:h-px after:origin-center after:scale-x-0",
                  "after:bg-[#28D9A0] after:transition-transform",
                  "after:duration-200 hover:after:scale-x-100",
                ].join(" ")}
              >
                {text[link.label]}
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
          <LanguageSwitcher
            language={language}
            onChange={changeLanguage}
            label={text.language}
          />

          <span
            aria-hidden="true"
            className="h-7 w-px bg-white/[0.09]"
          />

          <ProjectLink label={text.startProject} rtl={isRtl} />
        </div>

        {/* Mobile menu trigger and dropdown */}
        <div
          ref={menuAreaRef}
          className="relative flex shrink-0 items-center md:hidden"
        >
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? text.closeMenu : text.openMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className={[
              "inline-flex h-10 w-10 items-center justify-center",
              "rounded-lg border border-white/[0.10]",
              "bg-white/[0.025] text-slate-300",
              "transition-colors duration-200",
              "hover:border-white/[0.18] hover:bg-white/[0.05]",
              "hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#28D9A0]",
            ].join(" ")}
          >
            {menuOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>

          {menuOpen && (
            <div
              id={menuId}
              className={[
                "absolute end-0 top-[calc(100%+12px)] z-[70]",
                "max-h-[calc(100dvh-6rem)]",
                "w-[min(22rem,calc(100vw-2rem))]",
                "overflow-y-auto overscroll-contain",
                "rounded-xl border border-white/[0.10]",
                "bg-[#080F1D] p-4 sm:p-5",
                "shadow-[0_24px_70px_rgba(0,0,0,0.55)]",
              ].join(" ")}
            >
              {/* Menu heading */}
              <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {text.navigation}
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-9 bg-[#28D9A0]/50"
                />
              </div>

              {/* Navigation links */}
              <nav aria-label={text.mobileNavigation} className="flex flex-col">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={[
                      "group flex min-h-12 items-center justify-between",
                      "gap-3 border-b border-white/[0.055]",
                      "px-1 py-3 text-[13px] font-medium",
                      "text-slate-300 transition-colors duration-200",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:text-[#28D9A0]",
                    ].join(" ")}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="w-5 shrink-0 font-mono text-[9px] text-slate-600 transition-colors group-hover:text-[#28D9A0]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{text[link.label]}</span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className={[
                        "shrink-0 text-slate-600 transition-colors",
                        "group-hover:text-[#28D9A0]",
                        isRtl ? "scale-x-[-1]" : "",
                      ].join(" ")}
                    />
                  </Link>
                ))}
              </nav>

              {/* Language selector: mobile only */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {text.language}
                </span>

                <LanguageSwitcher
                  language={language}
                  onChange={changeLanguage}
                  label={text.language}
                />
              </div>

              {/* Mobile CTA */}
              <div className="mt-4 border-t border-white/[0.08] pt-4">
                <p className="mb-3 text-xs leading-5 text-slate-400">
                  {text.ideaPrompt}
                </p>

                <ProjectLink
                  label={text.startProject}
                  rtl={isRtl}
                  onClick={closeMenu}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}