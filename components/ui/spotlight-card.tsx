
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

/* =========================================================
   SHARED TYPES
========================================================= */

type BaseComponentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type Accent = "blue" | "green" | "silver";

const accentColors: Record<Accent, string> = {
  blue: "#48b5ff",
  green: "#00d68f",
  silver: "#dce3ec",
};

/* =========================================================
   SPOTLIGHT CARD
   A restrained, mouse-following brand highlight.
========================================================= */

type SpotlightCardProps = BaseComponentProps & {
  accent?: Accent;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function SpotlightCard({
  children,
  className = "",
  style,
  accent = "blue",
  onClick,
  onMouseEnter: externalMouseEnter,
  onMouseLeave: externalMouseLeave,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const color = accentColors[accent];

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();

      if (!rect) return;

      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    externalMouseEnter?.();
  }, [externalMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    externalMouseLeave?.();
  }, [externalMouseLeave]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={[
        "group relative isolate overflow-hidden rounded-2xl",
        "border bg-[#0b1423] text-white",
        "transition-[border-color,box-shadow,transform] duration-300",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
      style={{
        borderColor: isHovered
          ? `rgba(72, 181, 255, 0.28)`
          : "var(--border)",
        ...style,
      }}
    >
      {/* Mouse-following highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            280px circle at ${position.x}px ${position.y}px,
            ${color}14,
            transparent 72%
          )`,
        }}
      />

      {/* Fine brand accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(
            90deg,
            transparent,
            ${color}80,
            transparent
          )`,
        }}
      />

      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   PANEL
   Reusable surface for sections, previews and content blocks.
========================================================= */


/* =========================================================
   MINI SPARKLINE
   Abstract technical decoration, not financial data.
========================================================= */


/* =========================================================
   COUNT-UP HOOK
   Used only when a real numeric value is available.
========================================================= */

function useCountUp(
  target: number,
  duration = 1200,
  enabled = true
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || duration <= 0) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(target * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [target, duration, enabled]);

  return value;
}

/* =========================================================
   ANIMATED STAT CARD
   For verified metrics, real counts or genuine measurements.
========================================================= */

type AnimatedStatCardProps = {
  label: string;
  value?: string;
  rawNum?: number;
  prefix?: string;
  suffix?: string;
  subValue?: string;
  accent?: Accent;
  delay?: number;
  formatValue?: (value: number) => string;
  icon?: ReactNode;
};

export function AnimatedStatCard({
  label,
  value,
  rawNum,
  prefix = "",
  suffix = "",
  subValue,
  accent = "blue",
  delay = 0,
  formatValue,
  icon,
}: AnimatedStatCardProps) {
  const [mounted, setMounted] = useState(false);
  const color = accentColors[accent];

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setMounted(true),
      delay
    );

    return () => window.clearTimeout(timeout);
  }, [delay]);

  const animatedValue = useCountUp(
    rawNum ?? 0,
    1200,
    mounted && rawNum !== undefined
  );

  const formattedValue =
    formatValue?.(animatedValue) ??
    animatedValue.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

  return (
    <SpotlightCard
      accent={accent}
      className={[
        "p-5",
        "transition-[opacity,transform] duration-500",
        mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{
            color,
            borderColor: `${color}30`,
            background: `${color}0D`,
          }}
        >
          {icon ?? (
            <span aria-hidden="true" className="text-lg">
              ◈
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className="mt-2 h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
        />
      </div>

      <p className="mt-6 text-sm text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums">
        {rawNum !== undefined
          ? `${prefix}${formattedValue}${suffix}`
          : value ?? "—"}
      </p>

      {subValue && (
        <p className="mt-1 text-xs text-[var(--muted-soft)]">
          {subValue}
        </p>
      )}

      <div className="mt-5 h-px overflow-hidden bg-white/10">
        <div
          className="h-full transition-[width] duration-[1200ms] ease-out"
          style={{
            width: mounted ? "100%" : "0%",
            background: `linear-gradient(90deg, ${color}50, ${color})`,
            transitionDelay: `${delay + 100}ms`,
          }}
        />
      </div>
    </SpotlightCard>
  );
}

/* =========================================================
   SOFTWARE FEATURE ROW
   General-purpose replacement for the old TransactionRow.
========================================================= */


/* =========================================================
   TECHNOLOGY ROW
   General-purpose replacement for the old MarketRow.
========================================================= */
