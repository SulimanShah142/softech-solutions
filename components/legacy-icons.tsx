import type { ReactNode, SVGProps } from "react";

type IconName =
  | "wallet"
  | "shield"
  | "zap"
  | "globe"
  | "arrowRight"
  | "checkCircle"
  | "lock"
  | "smartphone"
  | "headphones"
  | "chevronRight"
  | "x"
  | "trendingUp"
  | "users"
  | "mapPin"
  | "clock"
  | "star"
  | "creditCard"
  | "activity"
  | "mail"
  | "github"
  | "twitter"
  | "linkedin"
  | "heart"
  | "chevronDown"
  | "shieldCheck";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const iconPaths: Partial<Record<IconName, ReactNode>> = {
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 15h2" /></>,
  shield: <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" />,
  zap: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></>,
  smartphone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>,
  headphones: <><path d="M3 13v-1a9 9 0 0 1 18 0v1" /><rect x="3" y="12" width="4" height="8" rx="2" /><rect x="17" y="12" width="4" height="8" rx="2" /></>,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  x: <><path d="m18 6-12 12M6 6l12 12" /></>,
  trendingUp: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  mapPin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  creditCard: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
  activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  github: <><path d="M9 19c-4.3 1.4-4.3-2.2-6-2.5M15 21v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.5 6a4.3 4.3 0 0 0-.1-3S17.4 2.7 15 4.4a12 12 0 0 0-6 0C6.6 2.7 5.6 3 5.6 3a4.3 4.3 0 0 0-.1 3 4.7 4.7 0 0 0-1.2 3.3c0 4.7 2.8 5.7 5.5 6A2.7 2.7 0 0 0 9 17.9V21" /></>,
  twitter: <path d="M21 6.2a7.4 7.4 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.4.9A3.7 3.7 0 0 0 11.7 9a10.5 10.5 0 0 1-7.6-3.9 3.7 3.7 0 0 0 1.1 4.9 3.7 3.7 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.4 2.6A7.5 7.5 0 0 1 3 17.5 10.6 10.6 0 0 0 19.3 8a7.5 7.5 0 0 0 1.7-1.8Z" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7h.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
  heart: <path d="M20.8 8.7c0 4.2-8.8 10.1-8.8 10.1S3.2 12.9 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  shieldCheck: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
};

function createIcon(name: IconName) {
  return function LocalIcon({ size = 24, ...props }: IconProps) {
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {iconPaths[name]}
      </svg>
    );
  };
}

export const Icons = {
  Wallet: createIcon("wallet"),
  Shield: createIcon("shield"),
  Zap: createIcon("zap"),
  Globe: createIcon("globe"),
  ArrowRight: createIcon("arrowRight"),
  CheckCircle: createIcon("checkCircle"),
  Lock: createIcon("lock"),
  Smartphone: createIcon("smartphone"),
  Headphones: createIcon("headphones"),
  ChevronRight: createIcon("chevronRight"),
  X: createIcon("x"),
  TrendingUp: createIcon("trendingUp"),
  Users: createIcon("users"),
  MapPin: createIcon("mapPin"),
  Clock: createIcon("clock"),
  Star: createIcon("star"),
  CreditCardIcon: createIcon("creditCard"),
  Activity: createIcon("activity"),
  Mail: createIcon("mail"),
  Github: createIcon("github"),
  Twitter: createIcon("twitter"),
  Linkedin: createIcon("linkedin"),
  Heart: createIcon("heart"),
  ChevronDown: createIcon("chevronDown"),
  ShieldCheck: createIcon("shieldCheck"),
};
