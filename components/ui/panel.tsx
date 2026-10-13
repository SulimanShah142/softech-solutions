import { CSSProperties, ReactNode } from "react";

type BaseComponentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};


export function Panel({
  children,
  className = "",
  style,
}: BaseComponentProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        "border-[var(--border)] bg-[#0b1423]/80",
        "backdrop-blur-md",
        className,
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
