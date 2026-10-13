import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
};

export function Button({
  variant: _variant,
  size: _size,
  ...props
}: ButtonProps) {
  return <button {...props} />;
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: string;
  children?: ReactNode;
};

export function Badge({ variant: _variant, ...props }: BadgeProps) {
  return <span {...props} />;
}
