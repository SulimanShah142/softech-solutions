import { useId } from "react";

type MiniSparklineProps = {
  up?: boolean;
  color?: string;
  idKey?: string;
  width?: number;
  height?: number;
};

export function MiniSparkline({
  up = true,
  color = "var(--brand-blue-light)",
  idKey = "spark",
  width = 96,
  height = 36,
}: MiniSparklineProps) {
  const generatedId = useId();
  const gradientId = `spark-${idKey}-${generatedId.replace(/:/g, "")}`;

  const points = up
    ? "0,23 8,20 16,22 24,14 32,17 40,10 48,13 56,6 64,9"
    : "0,7 8,11 16,9 24,16 32,13 40,20 48,17 56,24 64,21";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 30"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={`M 0,30 L ${points} L 64,30 Z`}
        fill={`url(#${gradientId})`}
      />

      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
