import type { CSSProperties, ReactNode } from "react";


type Accent = "blue" | "green" | "silver";

const accentColors: Record<Accent, string> = {
  blue: "#48b5ff",
  green: "#00d68f",
  silver: "#dce3ec",
};



type BaseComponentProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type SpotlightCardProps = BaseComponentProps & {
  accent?: Accent;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

type SoftwareFeatureRowProps = {
  title: string;
  description?: string;
  category?: string;
  accent?: Accent;
  icon?: ReactNode;
  onClick?: () => void;
};

export function SoftwareFeatureRow({
  title,
  description,
  category,
  accent = "blue",
  icon,
  onClick,
}: SoftwareFeatureRowProps) {
  const color = accentColors[accent];

  const content = (
    <>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
        style={{
          color,
          background: `${color}0D`,
          borderColor: `${color}25`,
        }}
      >
        {icon ?? <span aria-hidden="true">↗</span>}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-white">{title}</p>

        {description && (
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>

      {category && (
        <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
          {category}
        </span>
      )}
    </>
  );

  const className = [
    "flex items-center gap-3 rounded-xl border border-transparent",
    "px-3 py-3 transition-colors duration-200",
    onClick ? "cursor-pointer hover:border-[var(--border)] hover:bg-white/[0.025]" : "",
  ].join(" ");

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} w-full text-left`}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
