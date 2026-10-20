"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";

import {
  SITE_LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  setSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-language";

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

type Language = SiteLanguage;

const languages: Language[] = ["en", "fa-AF", "ps"];

type Translation = {
  home: string;
  work: string;
  about: string;
  capabilities: string;
  contact: string;
  startProject: string;
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
    work: "Work",
    about: "About",
    capabilities: "Services",
    contact: "Contact",
    startProject: "Discuss a project",
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
    work: "کارها",
    about: "درباره",
    capabilities: "خدمات",
    contact: "تماس",
    startProject: "گفتگو درباره پروژه",
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
    work: "کارونه",
    about: "زموږ په اړه",
    capabilities: "خدمتونه",
    contact: "اړیکه",
    startProject: "د پروژې په اړه خبرې",
    openMenu: "د غورنۍ پرانیستل",
    closeMenu: "د غورنۍ تړل",
    mobileNavigation: "د موبایل غورنۍ",
    navigation: "غورنۍ",
    ideaPrompt: "د سوداګرۍ د یوې ستونزې د حل په اړه خبرې وکړو؟",
    language: "ژبه",
    brandDescription: "د سافټویر انجینري",
  },
};

type NavId = "work" | "about" | "capabilities" | "contact";

/** `id` must match the `id` attribute of the matching page section. */
const navLinks: { id: NavId; href: string }[] = [
  { id: "work", href: "/#work" },
  { id: "about", href: "/#about" },
  { id: "capabilities", href: "/#capabilities" },
  { id: "contact", href: "/#contact" },
];

const SECTION_IDS = navLinks.map((link) => link.id);

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

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** True once the page has scrolled past `threshold` pixels. */
function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Returns the id of the section currently crossing the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      // A thin band just above the middle of the screen.
      { rootMargin: "-35% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                               */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28D9A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050914]";

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
        "group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden",
        "whitespace-nowrap rounded-xl bg-[#28D9A0] px-4",
        "text-[13px] font-semibold text-[#04120F]",
        "shadow-[0_0_0_1px_rgba(40,217,160,0.5),0_8px_24px_-8px_rgba(40,217,160,0.55)]",
        "transition-[background-color,box-shadow] duration-200",
        "hover:bg-[#3BE6AE] hover:shadow-[0_0_0_1px_rgba(85,232,183,0.8),0_10px_32px_-6px_rgba(40,217,160,0.7)]",
        // Shine sweep on hover
        "before:pointer-events-none before:absolute before:inset-y-0 before:start-0 before:w-1/3",
        "before:-translate-x-full before:skew-x-[-20deg] before:bg-white/40 before:blur-sm",
        "before:transition-transform before:duration-700 hover:before:translate-x-[420%]",
        "motion-reduce:before:hidden",
        focusRing,
        className,
      ].join(" ")}
    >
      <span className="relative">{label}</span>
      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className={[
          "relative shrink-0 transition-transform duration-200 motion-reduce:transition-none",
          rtl
            ? "scale-x-[-1] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        ].join(" ")}
      />
    </Link>
  );
}

/** Desktop links with a single indicator that slides between hover / active. */
function DesktopNav({
  activeId,
  text,
  measureKey,
}: {
  activeId: string | null;
  text: Translation;
  measureKey: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const [settled, setSettled] = useState(false);

  const targetId = hoverId ?? activeId;

  const measure = useCallback(() => {
    const el = targetId ? itemRefs.current[targetId] : null;
    const list = listRef.current;

    if (!el || !list) {
      setBox(null);
      return;
    }

    const itemRect = el.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    setBox({ left: itemRect.left - listRect.left, width: itemRect.width });
  }, [targetId]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure, measureKey]);

  // Enable the slide transition only after the first placement,
  // so the indicator does not fly in from the edge on load.
  useEffect(() => {
    if (box && !settled) {
      const frame = requestAnimationFrame(() => setSettled(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [box, settled]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <ul
      ref={listRef}
      className="relative flex items-center"
      onMouseLeave={() => setHoverId(null)}
    >
      <span
        aria-hidden="true"
        style={{
          left: 0,
          transform: `translateX(${box?.left ?? 0}px)`,
          width: box?.width ?? 0,
        }}
        className={[
          "pointer-events-none absolute inset-y-0 rounded-lg",
          "bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
          settled
            ? "transition-[transform,width,opacity] duration-300 ease-out motion-reduce:transition-none"
            : "",
          box ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {navLinks.map((link) => {
        const isActive = activeId === link.id;

        return (
          <li key={link.id} className="relative">
            <Link
              href={link.href}
              ref={(el) => {
                itemRefs.current[link.id] = el;
              }}
              aria-current={isActive ? "location" : undefined}
              onMouseEnter={() => setHoverId(link.id)}
              onFocus={() => setHoverId(link.id)}
              onBlur={() => setHoverId(null)}
              className={[
                "relative inline-flex h-9 items-center rounded-lg px-3.5",
                "whitespace-nowrap text-[13px] font-medium",
                "transition-colors duration-200",
                isActive || hoverId === link.id
                  ? "text-white"
                  : "text-slate-400",
                focusRing,
              ].join(" ")}
            >
              {text[link.id]}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-[#28D9A0] to-transparent"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Desktop language picker: one compact button, three options. */
function LanguageMenu({
  language,
  onChange,
  label,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    rootRef.current
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        rootRef.current &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="menuitemradio"]',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`${label}: ${languageNames[language]}`}
        onClick={() => setOpen((value) => !value)}
        className={[
          "inline-flex h-10 items-center gap-2 rounded-xl border border-white/10",
          "bg-white/[0.03] px-3 text-[13px] font-medium text-slate-300",
          "transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
          open ? "border-white/20 bg-white/[0.06] text-white" : "",
          focusRing,
        ].join(" ")}
      >
        <Globe size={15} aria-hidden="true" className="text-slate-400" />
        <span lang={language}>{languageLabels[language]}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={[
            "text-slate-500 transition-transform duration-200 motion-reduce:transition-none",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={[
            "sf-nav-pop absolute end-0 top-[calc(100%+8px)] z-10 w-44",
            "rounded-xl border border-white/10 bg-[#0A1122]/95 p-1.5",
            "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl",
          ].join(" ")}
        >
          {languages.map((option) => {
            const selected = option === language;

            return (
              <button
                key={option}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2",
                  "text-start text-[13px] transition-colors duration-150",
                  selected
                    ? "bg-white/[0.07] text-white"
                    : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                  "focus-visible:bg-white/[0.08] focus-visible:text-white focus-visible:outline-none",
                ].join(" ")}
              >
                <span className="flex items-baseline gap-2">
                  <span lang={option} className="font-medium">
                    {languageLabels[option]}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {languageNames[option]}
                  </span>
                </span>
                {selected && (
                  <Check
                    size={14}
                    aria-hidden="true"
                    className="text-[#28D9A0]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Mobile language picker: all options visible, one tap. */
function LanguageSegmented({
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
      className="inline-flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.03] p-1"
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
              "inline-flex min-h-9 items-center justify-center rounded-lg px-3",
              "text-[13px] font-medium transition-colors duration-200",
              selected
                ? "bg-white/[0.1] text-white"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white",
              focusRing,
            ].join(" ")}
          >
            {languageLabels[option]}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);

  const text = translations[language];
  const isRtl = language !== "en";
  const solid = scrolled || menuOpen;

  /* Restore the saved language, and stay in sync with other tabs. */
  useEffect(() => {
    function readSaved() {
      try {
        const saved = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
        if (isSiteLanguage(saved)) setLanguage(saved);
      } catch {
        // Keep the current language if storage is unavailable.
      }
    }

    readSaved();

    function onStorage(event: StorageEvent) {
      if (event.key === SITE_LANGUAGE_STORAGE_KEY) readSaved();
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function changeLanguage(next: Language) {
    setLanguage(next);
    try {
      setSiteLanguage(next);
    } catch {
      // The selection still applies for this visit.
    }
  }

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Mobile sheet: Escape, outside click, focus, scroll lock, resize. */
  useEffect(() => {
    if (!menuOpen) return;

    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @keyframes sf-nav-pop {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
        .sf-nav-pop { animation: sf-nav-pop 160ms ease-out both; transform-origin: top; }
        @media (prefers-reduced-motion: reduce) {
          .sf-nav-pop { animation: none; }
        }
      `}</style>

      {/*
        Zero-height sticky shell: the bar floats over the page instead of
        pushing it down, so the hero background can run underneath it.
        Give the hero ~96px of top padding.
      */}
      <header
        ref={headerRef}
        dir={isRtl ? "rtl" : "ltr"}
        lang={language}
        className="pointer-events-none sticky top-0 z-50 h-0 text-[#EDF3FA]"
      >
        <div className="pointer-events-auto relative top-3 mx-auto w-[min(1200px,calc(100%-1.5rem))]">
          {/* Bar */}
          <div
            className={[
              "relative grid h-14 grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border",
              "ps-4 pe-2 md:grid-cols-[1fr_auto_1fr] md:pe-2.5 lg:h-16 lg:ps-5",
              "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
              "motion-reduce:transition-none",
              solid
                ? "border-white/10 bg-[#070D1B]/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150"
                : "border-transparent bg-transparent",
            ].join(" ")}
          >
            {/* Top edge highlight */}
            <span
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-x-10 top-0 h-px",
                "bg-gradient-to-r from-transparent via-white/30 to-transparent",
                "transition-opacity duration-300",
                solid ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />

            {/* Brand */}
            <Link
              href="/#home"
              aria-label={`SofTech Solutions — ${text.home}`}
              onClick={closeMenu}
              className={[
                "group flex min-w-0 items-center gap-2.5 justify-self-start rounded-lg",
                focusRing,
              ].join(" ")}
            >
              <Image
                src="/softech-solutions-image.png"
                alt=""
                width={48}
                height={36}
                priority
                className="h-8 w-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:h-9 sm:w-11"
              />

              <span className="flex min-w-0 flex-col justify-center leading-none">
                <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.03em]">
                  SofTech
                  <span className="text-[#28D9A0]"> Solutions</span>
                </span>
                {/* No letter-spacing in RTL: it breaks Arabic-script joining. */}
                <span
                  className={[
                    "mt-1 whitespace-nowrap text-[11px] font-medium text-slate-500",
                    isRtl ? "" : "tracking-[0.02em]",
                  ].join(" ")}
                >
                  {text.brandDescription}
                </span>
              </span>
            </Link>

            {/* Desktop links (centred) */}
            <nav aria-label={text.navigation} className="hidden md:block">
              <DesktopNav
                activeId={activeId}
                text={text}
                measureKey={language}
              />
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2.5 justify-self-end md:flex">
              <LanguageMenu
                language={language}
                onChange={changeLanguage}
                label={text.language}
              />
              <ProjectLink label={text.startProject} rtl={isRtl} />
            </div>

            {/* Mobile toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden",
                "text-slate-200 transition-colors duration-200",
                menuOpen
                  ? "border-white/20 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                focusRing,
              ].join(" ")}
            >
              {menuOpen ? (
                <X size={19} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile sheet */}
          {menuOpen && (
            <div
              ref={sheetRef}
              id={menuId}
              className={[
                "sf-nav-pop absolute inset-x-0 top-[calc(100%+8px)] md:hidden",
                "max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain",
                "rounded-2xl border border-white/10 bg-[#080F1D]/[0.97] p-3",
                "shadow-[0_28px_80px_-10px_rgba(0,0,0,0.8)]",
              ].join(" ")}
            >
              <nav aria-label={text.mobileNavigation}>
                <ul className="flex flex-col">
                  {navLinks.map((link) => {
                    const isActive = activeId === link.id;

                    return (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={isActive ? "location" : undefined}
                          className={[
                            "group flex min-h-12 items-center justify-between gap-3 rounded-xl px-3",
                            "text-[15px] font-medium transition-colors duration-150",
                            isActive
                              ? "bg-white/[0.06] text-[#28D9A0]"
                              : "text-slate-300 hover:bg-white/[0.04] hover:text-white",
                            "focus-visible:bg-white/[0.06] focus-visible:text-white focus-visible:outline-none",
                          ].join(" ")}
                        >
                          <span>{text[link.id]}</span>
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className={[
                              "shrink-0 text-slate-600 transition-colors group-hover:text-[#28D9A0]",
                              isRtl ? "scale-x-[-1]" : "",
                            ].join(" ")}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/[0.08] px-3 pt-3">
                <span className="text-[13px] font-medium text-slate-400">
                  {text.language}
                </span>
                <LanguageSegmented
                  language={language}
                  onChange={changeLanguage}
                  label={text.language}
                />
              </div>

              <div className="mt-3 border-t border-white/[0.08] px-3 pb-1 pt-4">
                <p className="mb-3 text-[13px] leading-5 text-slate-400">
                  {text.ideaPrompt}
                </p>
                <ProjectLink
                  label={text.startProject}
                  rtl={isRtl}
                  onClick={closeMenu}
                  className="h-11 w-full"
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}