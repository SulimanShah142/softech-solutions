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

type TechnologyRowProps = {
  name: string;
  description?: string;
  category?: string;
  accent?: Accent;
  icon?: ReactNode;
};


export function TechnologyRow({
  name,
  description,
  category,
  accent = "green",
  icon,
}: TechnologyRowProps) {
  const color = accentColors[accent];

  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.025]">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
        style={{
          color,
          background: `${color}0D`,
          borderColor: `${color}25`,
        }}
      >
        {icon ?? <span aria-hidden="true">⌘</span>}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{name}</p>

        {description && (
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>

      {category && (
        <span className="text-xs text-[var(--muted-soft)]">
          {category}
        </span>
      )}
    </div>
  );
}
