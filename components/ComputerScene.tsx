"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { RotateCcw } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

type DemoMode = "studio" | "software" | "ai";

const sceneTranslations: Record<
  SiteLanguage,
  {
    studio: string;
    software: string;
    ai: string;
    group: string;
    preview: string;
    studioOnline: string;
    engineering: string;
    previewLabel: string;
    aiPreview: string;
    softwarePreview: string;
    studioPreview: string;
    reset: string;
    drag: string;
    zoom: string;
    fallback: string;
    loading: string;
  }
> = {
  en: {
    studio: "Studio",
    software: "Software",
    ai: "AI",
    group:
      "Interactive SofTech workstation. Drag to rotate, scroll or pinch to zoom, or reset the view.",
    preview: "Preview",
    studioOnline: "Engineering studio · online",
    engineering: "SofTech engineering",
    previewLabel: "Workstation screen preview",
    aiPreview: "AI and automation",
    softwarePreview: "software engineering",
    studioPreview: "SofTech studio",
    reset: "Reset view",
    drag: "Drag to rotate",
    zoom: "Scroll or pinch to zoom",
    fallback:
      "The interactive 3D preview is unavailable. SofTech Solutions branding is shown instead.",
    loading: "Loading the interactive SofTech workstation.",
  },
  "fa-AF": {
    studio: "استودیو",
    software: "نرم‌افزار",
    ai: "هوش مصنوعی",
    group: "ایستگاه کاری تعاملی سافت‌تک. برای چرخاندن بکشید، برای بزرگ‌نمایی پیمایش یا نیشگون کنید، یا نما را بازنشانی کنید.",
    preview: "پیش‌نمایش",
    studioOnline: "استودیوی انجنیری · آنلاین",
    engineering: "انجنیری سافت‌تک",
    previewLabel: "پیش‌نمایش صفحه ایستگاه کاری",
    aiPreview: "هوش مصنوعی و خودکارسازی",
    softwarePreview: "انجنیری نرم‌افزار",
    studioPreview: "استودیوی سافت‌تک",
    reset: "بازنشانی نما",
    drag: "برای چرخاندن بکشید",
    zoom: "برای بزرگ‌نمایی پیمایش یا نیشگون کنید",
    fallback:
      "پیش‌نمایش سه‌بعدی تعاملی در دسترس نیست. نشان تجاری سافت‌تک نمایش داده می‌شود.",
    loading: "ایستگاه کاری تعاملی سافت‌تک در حال بارگذاری است.",
  },
  ps: {
    studio: "سټوډیو",
    software: "سافټویر",
    ai: "مصنوعي ځیرکتیا",
    group: "د سافټ‌ټېک متقابل کاري سټېشن. د تاوولو لپاره یې راکاږئ، د لویولو لپاره سکرول یا نیشگون وکاروئ، یا لید بېرته سم کړئ.",
    preview: "مخکتنه",
    studioOnline: "د انجینري سټوډیو · فعاله",
    engineering: "د سافټ‌ټېک انجینري",
    previewLabel: "د کاري سټېشن د پردې مخکتنه",
    aiPreview: "مصنوعي ځیرکتیا او اتومات",
    softwarePreview: "د سافټویر انجینري",
    studioPreview: "د سافټ‌ټېک سټوډیو",
    reset: "لید بېرته سمول",
    drag: "د تاوولو لپاره یې راکاږئ",
    zoom: "د لویولو لپاره سکرول یا نیشگون وکاروئ",
    fallback:
      "متقابل درې‌بعدي مخکتنه شتون نه لري. د سافټ‌ټېک نښه ښودل کېږي.",
    loading: "د سافټ‌ټېک متقابل کاري سټېشن پرانیستل کېږي.",
  },
};

const COLORS = {
  background: "#050914",
  screen: "#07111c",
  surface: "#0d1b2a",
  blue: "#078df3",
  cyan: "#23b9ff",
  green: "#08d890",
  white: "#edf3fa",
  muted: "#91a5ba",
};

function createDemoScreen(
  mode: Exclude<DemoMode, "studio">,
  language: SiteLanguage,
) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1440;
  canvas.height = 900;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const software = mode === "software";
  const rtl = language !== "en";
  const copy = {
    en: {
      studioType: software ? "/ ENGINEERING STUDIO" : "/ APPLIED INTELLIGENCE",
      online: "ALL SYSTEMS OPERATIONAL",
      items: software
        ? ["Overview", "Architecture", "Development", "Quality", "Deployment"]
        : ["Overview", "Knowledge", "Automation", "Intelligence", "Analytics"],
      title: software ? "Engineering overview" : "Intelligence overview",
      subtitle: software
        ? "A clear view of product delivery and engineering quality."
        : "Connect data, workflows and practical automation.",
      cards: software
        ? [
            ["BUILD STATUS", "Healthy", COLORS.green],
            ["ACTIVE PROJECTS", "08", COLORS.cyan],
            ["NEXT RELEASE", "In review", "#d9bc77"],
          ]
        : [
            ["WORKFLOWS", "12 active", COLORS.cyan],
            ["AUTOMATIONS", "08 running", COLORS.green],
            ["DATA SOURCES", "Connected", "#d9bc77"],
          ],
      panel: software ? "Delivery pipeline" : "Workflow performance",
      activity: "RECENT ACTIVITY",
      weekdays: ["MON", "TUE", "WED", "THU", "FRI"],
    },
    "fa-AF": {
      studioType: software ? "/ استودیوی انجنیری" : "/ هوشمندی کاربردی",
      online: "همه سیستم‌ها فعال‌اند",
      items: software
        ? ["نمای کلی", "معماری", "توسعه", "کیفیت", "استقرار"]
        : ["نمای کلی", "دانش", "خودکارسازی", "هوشمندی", "تحلیل"],
      title: software ? "نمای کلی انجنیری" : "نمای کلی هوشمندی",
      subtitle: software
        ? "نمای روشن از تحویل محصول و کیفیت انجنیری."
        : "داده‌ها، جریان‌های کاری و خودکارسازی عملی را پیوند دهید.",
      cards: software
        ? [
            ["وضعیت ساخت", "سالم", COLORS.green],
            ["پروژه‌های فعال", "۰۸", COLORS.cyan],
            ["نسخه بعدی", "در حال بررسی", "#d9bc77"],
          ]
        : [
            ["جریان‌های کاری", "۱۲ فعال", COLORS.cyan],
            ["خودکارسازی‌ها", "۰۸ در حال اجرا", COLORS.green],
            ["منابع داده", "متصل", "#d9bc77"],
          ],
      panel: software ? "خط لوله تحویل" : "کارکرد جریان‌های کاری",
      activity: "فعالیت‌های اخیر",
      weekdays: ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
    },
    ps: {
      studioType: software ? "/ د انجینري سټوډیو" : "/ عملي هوښیارتیا",
      online: "ټول سیسټمونه فعال دي",
      items: software
        ? ["لنډیز", "معماري", "پراختیا", "کیفیت", "ځای پرځای کول"]
        : ["لنډیز", "پوهه", "اتومات", "هوښیارتیا", "شننه"],
      title: software ? "د انجینري لنډیز" : "د هوښیارتیا لنډیز",
      subtitle: software
        ? "د محصول سپارلو او انجینري کیفیت روښانه لید."
        : "ډاټا، کاري بهیرونه او عملي اتومات سره ونښلوئ.",
      cards: software
        ? [
            ["د جوړولو حالت", "سم", COLORS.green],
            ["فعالې پروژې", "۰۸", COLORS.cyan],
            ["راتلونکی خپرون", "تر بیاکتنې لاندې", "#d9bc77"],
          ]
        : [
            ["کاري بهیرونه", "۱۲ فعال", COLORS.cyan],
            ["اتوماتونه", "۰۸ روان", COLORS.green],
            ["د ډاټا سرچینې", "نښلول شوې", "#d9bc77"],
          ],
      panel: software ? "د سپارلو بهیر" : "د کاري بهیر فعالیت",
      activity: "وروستي فعالیتونه",
      weekdays: ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
    },
  }[language];
  const drawText = (text: string, x: number, y: number) => {
    ctx.direction = rtl ? "rtl" : "ltr";
    ctx.textAlign = rtl ? "right" : "left";
    ctx.fillText(text, x, y);
    ctx.direction = "ltr";
    ctx.textAlign = "left";
  };

  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, 1440, 900);

  // Application header
  ctx.fillStyle = "#0a1725";
  ctx.fillRect(0, 0, 1440, 82);

  ctx.fillStyle = COLORS.cyan;
  ctx.fillRect(0, 80, 1440, 2);

  ctx.fillStyle = COLORS.white;
  ctx.font = "600 23px sans-serif";
  ctx.fillText("SOFTECH", 42, 49);

  ctx.fillStyle = COLORS.muted;
  ctx.font = "17px sans-serif";
  drawText(copy.studioType, rtl ? 500 : 154, 49);

  ctx.fillStyle = COLORS.green;
  ctx.beginPath();
  ctx.arc(1270, 41, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#b5c7d9";
  ctx.font = "15px sans-serif";
  drawText(copy.online, 1400, 47);

  // Navigation sidebar
  ctx.fillStyle = "#091522";
  ctx.fillRect(0, 82, 245, 818);

  ctx.strokeStyle = "rgba(180, 207, 231, 0.12)";
  ctx.beginPath();
  ctx.moveTo(245, 82);
  ctx.lineTo(245, 900);
  ctx.stroke();

  const items = copy.items;

  ctx.font = "19px sans-serif";

  items.forEach((item, index) => {
    const y = 150 + index * 66;

    if (index === 0) {
      ctx.fillStyle = "rgba(7, 141, 243, 0.13)";
      ctx.fillRect(18, y - 31, 208, 47);

      ctx.fillStyle = COLORS.cyan;
      ctx.fillRect(18, y - 31, 3, 47);
      ctx.fillStyle = COLORS.white;
    } else {
      ctx.fillStyle = "#8499af";
    }

    drawText(item, rtl ? 220 : 39, y);
  });

  // Main heading
  ctx.fillStyle = COLORS.white;
  ctx.font = "600 35px sans-serif";
  drawText(copy.title, rtl ? 1310 : 290, 151);

  ctx.fillStyle = COLORS.muted;
  ctx.font = "19px sans-serif";
  drawText(copy.subtitle, rtl ? 1310 : 290, 190);

  // Dashboard cards
  const cards = copy.cards;

  cards.forEach(([label, value, accent], index) => {
    const x = 290 + index * 350;
    const y = 236;
    const w = 320;
    const h = 145;

    ctx.fillStyle = "#0c1a29";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "rgba(180, 207, 231, 0.12)";
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = accent;
    ctx.fillRect(x, y, 3, h);

    ctx.fillStyle = COLORS.muted;
    ctx.font = "15px sans-serif";
    drawText(label, rtl ? x + w - 22 : x + 22, y + 38);

    ctx.fillStyle = COLORS.white;
    ctx.font = "600 27px sans-serif";
    drawText(value, rtl ? x + w - 22 : x + 22, y + 87);

    ctx.fillStyle = accent;
    ctx.fillRect(x + 22, y + 111, 65 + index * 24, 3);
  });

  // Performance / delivery panel
  ctx.fillStyle = "#0b1927";
  ctx.fillRect(290, 415, 1020, 410);

  ctx.strokeStyle = "rgba(180, 207, 231, 0.12)";
  ctx.strokeRect(290, 415, 1020, 410);

  ctx.fillStyle = COLORS.white;
  ctx.font = "600 20px sans-serif";
  drawText(copy.panel, rtl ? 1280 : 320, 457);

  ctx.fillStyle = COLORS.muted;
  ctx.font = "15px sans-serif";
  drawText(copy.activity, rtl ? 1280 : 320, 493);

  // Chart grid
  ctx.strokeStyle = "rgba(180, 207, 231, 0.10)";
  ctx.lineWidth = 1;

  for (let i = 0; i < 5; i++) {
    const y = 535 + i * 53;

    ctx.beginPath();
    ctx.moveTo(320, y);
    ctx.lineTo(1275, y);
    ctx.stroke();
  }

  // Chart line
  const accent = software ? COLORS.cyan : COLORS.green;

  ctx.beginPath();
  ctx.moveTo(335, 706);
  ctx.bezierCurveTo(420, 690, 465, 620, 550, 650);
  ctx.bezierCurveTo(640, 680, 690, 558, 785, 590);
  ctx.bezierCurveTo(880, 622, 920, 542, 1015, 563);
  ctx.bezierCurveTo(1100, 585, 1160, 510, 1260, 530);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Chart points
  [
    [550, 650],
    [785, 590],
    [1015, 563],
    [1260, 530],
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
  });

  ctx.fillStyle = COLORS.muted;
  ctx.font = "15px sans-serif";
  copy.weekdays.forEach((weekday, index) => {
    const x = [330, 565, 800, 1035, 1250][index];
    drawText(weekday, rtl ? x + 90 : x, 789);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  return texture;
}

function ComputerModel({
  onReady,
  reducedMotion,
  demoMode,
  language,
}: {
  onReady: () => void;
  reducedMotion: boolean;
  demoMode: DemoMode;
  language: SiteLanguage;
}) {
  const logoTexture = useTexture("/softech-solutions-image.png");
  const [hovered, setHovered] = useState(false);

  const demoTexture = useMemo(
    () =>
      demoMode === "studio" ? null : createDemoScreen(demoMode, language),
    [demoMode, language],
  );

  useEffect(() => {
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = 8;
    onReady();
  }, [logoTexture, onReady]);

  useEffect(() => {
    return () => demoTexture?.dispose();
  }, [demoTexture]);

  return (
    <Float
      speed={reducedMotion ? 0 : 0.65}
      rotationIntensity={reducedMotion ? 0 : 0.012}
      floatIntensity={reducedMotion ? 0 : 0.055}
    >
      <group
        position={[0, -0.06, 0]}
        scale={hovered ? 1.012 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Precision-machined monitor housing */}
        <RoundedBox
          args={[3.62, 2.22, 0.19]}
          radius={0.105}
          smoothness={6}
          position={[0, 0.91, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#293a4b"
            metalness={0.82}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Screen recess */}
        <RoundedBox
          args={[3.43, 2.03, 0.025]}
          radius={0.065}
          smoothness={5}
          position={[0, 0.91, 0.103]}
        >
          <meshBasicMaterial color={COLORS.screen} />
        </RoundedBox>

        {/* Display surface */}
        <mesh position={[0, 0.91, 0.119]}>
          <planeGeometry args={[3.31, 1.91]} />
          <meshBasicMaterial color="#081521" />
        </mesh>

        {/* Brand screen */}
        {demoMode === "studio" ? (
          <>
            <mesh position={[0, 0.99, 0.126]}>
              <planeGeometry args={[1.68, 1.12]} />
              <meshBasicMaterial
                map={logoTexture}
                transparent
                toneMapped={false}
              />
            </mesh>

            {/* Minimal brand accent below the logo */}
            <mesh position={[0, 0.34, 0.127]}>
              <boxGeometry args={[0.46, 0.012, 0.004]} />
              <meshBasicMaterial
                color={COLORS.cyan}
                toneMapped={false}
              />
            </mesh>
          </>
        ) : (
          <mesh position={[0, 0.91, 0.127]}>
            <planeGeometry args={[3.31, 1.91]} />
            <meshBasicMaterial
              map={demoTexture ?? undefined}
              color={COLORS.white}
              toneMapped={false}
            />
          </mesh>
        )}

        {/* Camera and discreet status indicator */}
        <mesh position={[0, 2.012, 0.105]}>
          <sphereGeometry args={[0.018, 16, 12]} />
          <meshBasicMaterial color="#101e2a" />
        </mesh>

        <mesh position={[1.52, -0.145, 0.105]}>
          <sphereGeometry args={[0.022, 16, 12]} />
          <meshBasicMaterial
            color={hovered ? COLORS.cyan : COLORS.green}
            toneMapped={false}
          />
        </mesh>

        {/* Rear support / stand */}
        <RoundedBox
          args={[0.32, 0.51, 0.27]}
          radius={0.045}
          smoothness={5}
          position={[0, -0.49, -0.035]}
          castShadow
        >
          <meshStandardMaterial
            color="#34485a"
            metalness={0.78}
            roughness={0.27}
          />
        </RoundedBox>

        {/* Weighted metal base */}
        <RoundedBox
          args={[1.43, 0.105, 0.78]}
          radius={0.065}
          smoothness={5}
          position={[0, -0.785, 0.02]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#3a4b5d"
            metalness={0.8}
            roughness={0.24}
          />
        </RoundedBox>

        {/* Desk surface */}
        <mesh position={[0, -0.91, 0]} receiveShadow>
          <boxGeometry args={[5.5, 0.09, 2.9]} />
          <meshStandardMaterial
            color="#0d1723"
            metalness={0.36}
            roughness={0.5}
          />
        </mesh>

        {/* Minimal keyboard */}
        <RoundedBox
          args={[1.22, 0.045, 0.37]}
          radius={0.035}
          smoothness={4}
          position={[-0.12, -0.84, 0.83]}
          castShadow
        >
          <meshStandardMaterial
            color="#172637"
            metalness={0.38}
            roughness={0.43}
          />
        </RoundedBox>

        {/* Keyboard's subtle cyan light strip */}
        <mesh position={[-0.12, -0.813, 0.83]}>
          <boxGeometry args={[0.72, 0.006, 0.012]} />
          <meshBasicMaterial
            color={COLORS.cyan}
            toneMapped={false}
          />
        </mesh>

        {/* Minimal wireless mouse */}
        <mesh position={[0.93, -0.81, 0.84]} castShadow>
          <sphereGeometry args={[0.105, 24, 16]} />
          <meshStandardMaterial
            color="#1c2c3c"
            metalness={0.36}
            roughness={0.38}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SceneContents({
  onReady,
  reducedMotion,
  demoMode,
  language,
}: {
  onReady: () => void;
  reducedMotion: boolean;
  demoMode: DemoMode;
  language: SiteLanguage;
}) {
  return (
    <>
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2.4}
        color="#edf3fa"
        castShadow
      />

      <pointLight
        position={[-3.5, 1.8, 2.6]}
        intensity={13}
        distance={9}
        color="#078df3"
      />

      <pointLight
        position={[3.2, 1.4, -1.7]}
        intensity={9}
        distance={8}
        color="#23b9ff"
      />

      <pointLight
        position={[0, -0.1, -3]}
        intensity={5}
        distance={7}
        color="#08d890"
      />

      <ComputerModel
        onReady={onReady}
        reducedMotion={reducedMotion}
        demoMode={demoMode}
        language={language}
      />
    </>
  );
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function SceneFallback({
  failed,
  language,
}: {
  failed: boolean;
  language: SiteLanguage;
}) {
  const text = sceneTranslations[language];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <Image
        src="/softech-solutions-image.png"
        alt="SofTech Solutions"
        width={300}
        height={200}
        className="h-auto w-44 opacity-80 sm:w-56"
      />

      <p className="sr-only">
        {failed ? text.fallback : text.loading}
      </p>
    </div>
  );
}

export default function ComputerScene({ language }: { language: SiteLanguage }) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [demoMode, setDemoMode] = useState<DemoMode>("studio");
  const text = sceneTranslations[language];

  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");

      setWebglSupported(Boolean(context));

      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setWebglSupported(false);
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    setReducedMotion(motionPreference.matches);

    const updateMotionPreference = () => {
      setReducedMotion(motionPreference.matches);
    };

    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const useFallback = webglSupported === false || sceneFailed;

  const demoModes: { id: DemoMode; label: string }[] = [
    { id: "studio", label: text.studio },
    { id: "software", label: text.software },
    { id: "ai", label: text.ai },
  ];

  return (
    <div
      role="group"
      aria-label={text.group}
      className="relative isolate h-[390px] w-full overflow-hidden sm:h-[455px] lg:h-[520px]"
    >
      {/* Studio atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 62% at 50% 51%, rgba(7,141,243,0.16), transparent 72%), radial-gradient(ellipse 45% 27% at 50% 88%, rgba(35,185,255,0.07), transparent 76%)",
        }}
      />

      {/* Subtle technical framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[7%] top-[11%] h-[73%] border-y border-white/[0.045]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-[16%] h-[63%] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      {webglSupported && !sceneFailed ? (
        <SceneErrorBoundary onError={() => setSceneFailed(true)}>
          <Canvas
            camera={{ position: [0, 0.9, 8.1], fov: 35 }}
            dpr={[1, 1.35]}
            shadows
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(COLORS.background, 0);
              gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
          >
            <Suspense fallback={null}>
              <SceneContents
                onReady={handleSceneReady}
                reducedMotion={reducedMotion}
                demoMode={demoMode}
                language={language}
              />

              <OrbitControls
                ref={controlsRef}
                makeDefault
                target={[0, 0.18, 0]}
                enablePan={false}
                enableZoom
                minDistance={6.4}
                maxDistance={9.4}
                minPolarAngle={Math.PI / 3.1}
                maxPolarAngle={Math.PI / 1.85}
                autoRotate={!reducedMotion}
                autoRotateSpeed={0.28}
                enableDamping
                dampingFactor={0.075}
              />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>
      ) : (
        <SceneFallback failed={useFallback} language={language} />
      )}

      {/* Studio status */}
      <div className="absolute left-5 top-5 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:left-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[#08d890] shadow-[0_0_12px_rgba(8,216,144,0.5)]" />
        {sceneReady && !sceneFailed
          ? text.studioOnline
          : text.engineering}
      </div>

      {/* Screen demo controls */}
      <div
        role="group"
        aria-label={text.previewLabel}
        className="absolute bottom-[3.65rem] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 border border-white/[0.11] bg-[#07111b]/90 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:bottom-[4.1rem]"
      >
        <span className="hidden px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:inline">
          {text.preview}
        </span>

        {demoModes.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={demoMode === id}
            disabled={useFallback}
            onClick={() => setDemoMode(id)}
            className={`min-h-9 min-w-[76px] px-3 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23b9ff] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[84px] ${
              demoMode === id
                ? "bg-[#078df3]/20 text-[#dff5ff] shadow-[inset_0_-2px_0_#23b9ff]"
                : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {language === "fa-AF" ? "نمایش" : language === "ps" ? "ښودل کېږي" : "Showing"}{" "}
        {demoMode === "ai"
          ? text.aiPreview
          : demoMode === "software"
            ? text.softwarePreview
            : text.studioPreview}{" "}
        {text.preview.toLocaleLowerCase(language)}
      </span>

      {/* Reset camera */}
      {webglSupported && !sceneFailed && (
        <button
          type="button"
          onClick={() => controlsRef.current?.reset()}
          aria-label={text.reset}
          className="absolute right-5 top-4 inline-flex min-h-9 items-center gap-2 border border-white/10 bg-[#07111b]/75 px-3 text-[10px] font-medium text-slate-400 transition-colors hover:border-[#23b9ff]/45 hover:text-[#23b9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23b9ff] sm:right-7"
        >
          <RotateCcw size={13} aria-hidden="true" />
          {text.reset}
        </button>
      )}

      {/* Loading indicator */}
      {!sceneReady && !useFallback && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid place-items-center bg-[#050914]/20"
        >
          <span className="h-5 w-5 animate-spin rounded-full border border-white/15 border-t-[#23b9ff]" />
        </div>
      )}

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium tracking-wide text-slate-500 sm:bottom-3 sm:text-[10px]">
        {text.drag}
        <span className="px-1.5 text-[#23b9ff]">·</span>
        {text.zoom}
      </p>
    </div>
  );
}