import type { HTMLAttributes } from "react";

type CardPartProps = HTMLAttributes<HTMLDivElement>;
type CardTextProps = HTMLAttributes<HTMLSpanElement>;

function partClass(base: string, className?: string) {
  return [base, className].filter(Boolean).join(" ");
}

export function CreditCard({ className, ...props }: CardPartProps) {
  return (
    <div
      className={partClass("relative mx-auto w-full max-w-[380px] aspect-[380/240] [perspective:1200px]", className)}
      {...props}
    />
  );
}

export function CreditCardFlipper({ className, ...props }: CardPartProps) {
  return (
    <div
      className={partClass("relative h-full w-full [transform-style:preserve-3d]", className)}
      {...props}
    />
  );
}

export function CreditCardFront({ className, ...props }: CardPartProps) {
  return (
    <div
      className={partClass("absolute inset-0 flex flex-col rounded-xl p-6 [backface-visibility:hidden]", className)}
      {...props}
    />
  );
}

export function CreditCardBack({ className, ...props }: CardPartProps) {
  return (
    <div
      className={partClass("absolute inset-0 flex flex-col rounded-xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]", className)}
      {...props}
    />
  );
}

export function CreditCardChip() {
  return (
    <div aria-hidden="true" className="grid h-8 w-10 grid-cols-3 grid-rows-3 gap-px overflow-hidden rounded border border-amber-200/30 bg-amber-300/80 p-1">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} className="rounded-[1px] bg-amber-800/30" />
      ))}
    </div>
  );
}

export function CreditCardContactless() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/60">
      <path d="M8 8a6 6 0 0 0 0 8M11 10a3 3 0 0 0 0 4M14 12h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CreditCardNumber({ className, ...props }: CardTextProps) {
  return <span className={partClass("relative z-10 font-mono tracking-[0.22em]", className)} {...props} />;
}

export function CreditCardName({ className, ...props }: CardTextProps) {
  return <span className={partClass("text-xs font-semibold uppercase tracking-wider", className)} {...props} />;
}

export function CreditCardExpiry({ className, ...props }: CardTextProps) {
  return <span className={partClass("font-mono text-xs font-semibold", className)} {...props} />;
}

export function CreditCardCvv({ className, ...props }: CardTextProps) {
  return <span className={partClass("font-mono tracking-widest", className)} {...props} />;
}

export function CreditCardLogo({ className, ...props }: CardTextProps) {
  return <span className={partClass("font-bold uppercase tracking-wider", className)} {...props} />;
}

export function CreditCardServiceProvider({
  type,
  format,
}: {
  type: "Mastercard";
  format?: "icon";
}) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={type}>
      <i className="h-4 w-4 rounded-full bg-red-500/80" />
      <i className="-ml-2 h-4 w-4 rounded-full bg-amber-400/80" />
      {format !== "icon" && <span className="sr-only">{type}</span>}
    </span>
  );
}

export function CreditCardMagStripe() {
  return <div aria-hidden="true" className="relative z-10 -mx-6 mt-8 h-10 bg-black/80" />;
}

export function CreditCardSignature({ className, ...props }: CardPartProps) {
  return <div className={partClass("relative z-10 min-h-8", className)} {...props} />;
}
