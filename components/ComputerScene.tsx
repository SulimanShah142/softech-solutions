
"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { RotateCcw } from "lucide-react";
import type { SiteLanguage } from "@/lib/site-language";

type SceneMode = "platform" | "integrations" | "delivery";

const C = {
  background: "#050914",
  blue: "#168df5",
  cyan: "#42c7ff",
  green: "#28d9a0",
  white: "#edf3fa",
  muted: "#91a5ba",
};

type SceneCopy = {
  label: string;
  platform: string;
  integrations: string;
  delivery: string;
  eyebrow: string;
  title: string;
  description: string;
  layers: [string, string, string];
  interfaces: string[];
  services: string[];
  infrastructure: string[];
  system: string;
  reset: string;
  rotate: string;
  zoom: string;
  fallback: string;
  loading: string;
};

const copy: Record<SiteLanguage, SceneCopy> = {
  en: {
    label: "Interactive software systems architecture",
    platform: "Platform",
    integrations: "Integrations",
    delivery: "Delivery",
    eyebrow: "SYSTEM ARCHITECTURE",
    title: "Engineered as a system",
    description:
      "A conceptual view of how interfaces, application services and infrastructure fit together.",
    layers: [
      "USER INTERFACES",
      "APPLICATION SERVICES",
      "DATA & INFRASTRUCTURE",
    ],
    interfaces: ["Web platform", "Mobile apps", "Admin tools"],
    services: ["Business logic", "APIs & security", "Workflows"],
    infrastructure: ["Databases", "External services", "Cloud runtime"],
    system: "SYSTEM DESIGN",
    reset: "Reset view",
    rotate: "Drag to explore",
    zoom: "Scroll or pinch to zoom",
    fallback: "Software systems architecture",
    loading: "Loading the interactive systems visualization.",
  },
  "fa-AF": {
    label: "معماری تعاملی سیستم‌های نرم‌افزاری",
    platform: "پلتفرم",
    integrations: "یکپارچه‌سازی",
    delivery: "تحویل",
    eyebrow: "معماری سیستم",
    title: "طراحی‌شده به‌عنوان یک سیستم",
    description:
      "نمای مفهومی از ارتباط رابط‌ها، خدمات کاربردی و زیرساخت‌ها.",
    layers: ["رابط‌های کاربری", "خدمات کاربردی", "داده و زیرساخت"],
    interfaces: ["پلتفرم وب", "اپلیکیشن موبایل", "ابزارهای مدیریت"],
    services: ["منطق تجاری", "API و امنیت", "جریان‌های کاری"],
    infrastructure: ["پایگاه‌های داده", "خدمات بیرونی", "زیرساخت ابری"],
    system: "طراحی سیستم",
    reset: "بازنشانی نما",
    rotate: "برای بررسی بکشید",
    zoom: "برای بزرگ‌نمایی پیمایش یا نیشگون کنید",
    fallback: "معماری سیستم‌های نرم‌افزاری",
    loading: "نمایش تعاملی سیستم‌ها در حال بارگذاری است.",
  },
  ps: {
    label: "د سافټویر سیسټمونو متقابل جوړښت",
    platform: "پلېټفارم",
    integrations: "یوځای کول",
    delivery: "سپارنه",
    eyebrow: "د سیسټم جوړښت",
    title: "د یو سیسټم په توګه جوړ شوی",
    description:
      "د کارن مخونو، اپلېکېشن خدمتونو او زیربناوو ترمنځ د اړیکو مفهومي انځور.",
    layers: ["د کارن مخونه", "د اپلېکېشن خدمتونه", "ډاټا او زیربنا"],
    interfaces: ["وېب پلېټفارم", "موبایل اپلېکېشنونه", "مدیریتي وسایل"],
    services: ["سوداګریز منطق", "API او امنیت", "کاري بهیرونه"],
    infrastructure: ["ډېټابېسونه", "بهرني خدمتونه", "کلاوډ چاپېریال"],
    system: "د سیسټم ډیزاین",
    reset: "لید بېرته سمول",
    rotate: "د کتلو لپاره یې راکاږئ",
    zoom: "د لویولو لپاره سکرول یا نیشگون وکاروئ",
    fallback: "د سافټویر سیسټمونو جوړښت",
    loading: "د سیسټمونو متقابل انځور بار کېږي.",
  },
};

const layerDefinitions = [
  {
    key: "interfaces",
    y: 1.15,
    color: C.cyan,
    labelsKey: "interfaces",
  },
  {
    key: "services",
    y: 0,
    color: C.blue,
    labelsKey: "services",
  },
  {
    key: "infrastructure",
    y: -1.15,
    color: C.green,
    labelsKey: "infrastructure",
  },
] as const;

const modulePositions = [-1.42, 0, 1.42] as const;

function ArchitectureModel({
  mode,
  reducedMotion,
}: {
  mode: SceneMode;
  reducedMotion: boolean;
}) {
  const activeLayer =
    mode === "platform" ? 0 : mode === "integrations" ? 1 : 2;

  return (
    <Float
      speed={reducedMotion ? 0 : 0.3}
      rotationIntensity={reducedMotion ? 0 : 0.018}
      floatIntensity={reducedMotion ? 0 : 0.035}
    >
      <group rotation={[0.035, -0.13, 0]}>
        {/* Floating architectural planes, not physical shelves */}
        {layerDefinitions.map((layer, layerIndex) => {
          const isActive = activeLayer === layerIndex;

          return (
            <group key={layer.key} position={[0, layer.y, 0]}>
              {/* Thin translucent system boundary */}
              <mesh position={[0, 0, -0.12]}>
                <boxGeometry args={[4.45, 0.018, 1.42]} />
                <meshBasicMaterial
                  color={layer.color}
                  transparent
                  opacity={isActive ? 0.13 : 0.045}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>

              {/* Fine perimeter edges */}
              <Line
                points={[
                  [-2.225, 0.01, -0.83],
                  [2.225, 0.01, -0.83],
                  [2.225, 0.01, 0.59],
                  [-2.225, 0.01, 0.59],
                  [-2.225, 0.01, -0.83],
                ]}
                color={layer.color}
                lineWidth={isActive ? 1.1 : 0.65}
                transparent
                opacity={isActive ? 0.6 : 0.19}
              />

              {/* A restrained depth cue along the front edge */}
              <Line
                points={[
                  [-2.02, -0.025, 0.61],
                  [2.02, -0.025, 0.61],
                ]}
                color={layer.color}
                lineWidth={1}
                transparent
                opacity={isActive ? 0.7 : 0.22}
              />

              {/* Three independent software components */}
              {modulePositions.map((x, moduleIndex) => (
                <group
                  key={moduleIndex}
                  position={[x, 0.095, 0.02]}
                >
                  <RoundedBox
                    args={[1.12, 0.19, 0.48]}
                    radius={0.055}
                    smoothness={5}
                  >
                    <meshPhysicalMaterial
                      color={isActive ? "#122b40" : "#0b1728"}
                      metalness={0.18}
                      roughness={0.3}
                      clearcoat={0.55}
                      clearcoatRoughness={0.35}
                      emissive={layer.color}
                      emissiveIntensity={isActive ? 0.09 : 0.018}
                    />
                  </RoundedBox>

                  {/* A precise, illuminated interface detail */}
                  <mesh position={[0, 0.098, 0.015]}>
                    <boxGeometry args={[0.52, 0.008, 0.012]} />
                    <meshBasicMaterial
                      color={layer.color}
                      toneMapped={false}
                    />
                  </mesh>

                  {/* Small status indicator */}
                  <mesh position={[-0.43, 0.012, 0.252]}>
                    <sphereGeometry args={[0.025, 12, 10]} />
                    <meshBasicMaterial
                      color={layer.color}
                      toneMapped={false}
                    />
                  </mesh>
                </group>
              ))}
            </group>
          );
        })}

        {/* Data pathways between corresponding components */}
        {modulePositions.map((x, index) => (
          <group key={index}>
            <Line
              points={[
                [x, 1.04, 0.12],
                [x, 0.73, 0.12],
                [x, 0.42, 0.12],
              ]}
              color={activeLayer === 0 ? C.cyan : "#31516a"}
              lineWidth={1.15}
              transparent
              opacity={activeLayer === 0 ? 0.9 : 0.45}
            />

            <Line
              points={[
                [x, -0.12, 0.12],
                [x, -0.43, 0.12],
                [x, -0.73, 0.12],
              ]}
              color={activeLayer === 1 ? C.blue : "#31516a"}
              lineWidth={1.15}
              transparent
              opacity={activeLayer === 1 ? 0.9 : 0.45}
            />

            {/* Junctions indicate component boundaries */}
            <mesh position={[x, 0.73, 0.13]}>
              <sphereGeometry args={[0.032, 12, 10]} />
              <meshBasicMaterial
                color={C.cyan}
                toneMapped={false}
              />
            </mesh>

            <mesh position={[x, -0.43, 0.13]}>
              <sphereGeometry args={[0.032, 12, 10]} />
              <meshBasicMaterial
                color={C.blue}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* Subtle cross-layer paths suggest a connected system */}
        <Line
          points={[
            [-1.42, 1.04, -0.25],
            [-1.42, 0.6, -0.25],
            [-0.72, 0.25, -0.25],
            [-0.72, -0.24, -0.25],
            [-1.42, -0.73, -0.25],
          ]}
          color={C.cyan}
          lineWidth={0.8}
          transparent
          opacity={0.28}
        />

        <Line
          points={[
            [1.42, 1.04, -0.25],
            [1.42, 0.58, -0.25],
            [0.72, 0.22, -0.25],
            [0.72, -0.25, -0.25],
            [1.42, -0.73, -0.25],
          ]}
          color={C.blue}
          lineWidth={0.8}
          transparent
          opacity={0.28}
        />
      </group>
    </Float>
  );
}

function SceneContents({
  mode,
  reducedMotion,
}: {
  mode: SceneMode;
  reducedMotion: boolean;
}) {
  return (
    <>
      <ambientLight intensity={1.05} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={1.7}
        color="#e7f2ff"
      />

      <pointLight
        position={[-3, 1.5, 3]}
        intensity={5}
        distance={9}
        color={C.blue}
      />

      <pointLight
        position={[3, -0.5, -1]}
        intensity={2.2}
        distance={7}
        color={C.cyan}
      />

      <ArchitectureModel mode={mode} reducedMotion={reducedMotion} />
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

function ArchitectureFallback({
  text,
}: {
  text: SceneCopy;
}) {
  return (
    <div className="absolute inset-x-[8%] top-1/2 -translate-y-1/2 space-y-3">
      {text.layers.map((layer, index) => {
        const accent =
          index === 0
            ? "#42c7ff"
            : index === 1
              ? "#168df5"
              : "#28d9a0";

        return (
          <div
            key={layer}
            className="relative flex min-h-[58px] items-center gap-3 border border-white/10 bg-[#0b1625]/80 p-3 backdrop-blur-md"
          >
            <span
              className="h-7 w-0.5 shrink-0"
              style={{ backgroundColor: accent }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-slate-300">
                {layer}
              </p>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2].map((item) => (
                  <span
                    key={item}
                    className="h-1 flex-1 bg-white/[0.12]"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ComputerScene({
  language,
}: {
  language: SiteLanguage;
}) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(
    null,
  );
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mode, setMode] = useState<SceneMode>("platform");

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const text = copy[language];

  useEffect(() => {
    let supported = false;

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");

      supported = Boolean(gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      supported = false;
    }

    setWebglSupported(supported);

    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotion = () => setReducedMotion(preference.matches);

    updateMotion();
    preference.addEventListener("change", updateMotion);

    return () => {
      preference.removeEventListener("change", updateMotion);
    };
  }, []);

  const handleError = useCallback(() => {
    setSceneFailed(true);
  }, []);

  const modes: { id: SceneMode; label: string }[] = [
    { id: "platform", label: text.platform },
    { id: "integrations", label: text.integrations },
    { id: "delivery", label: text.delivery },
  ];

  const showCanvas = webglSupported === true && !sceneFailed;

  return (
    <div
      role="group"
      aria-label={text.label}
      dir={language === "en" ? "ltr" : "rtl"}
      className="relative isolate h-[390px] w-full overflow-hidden sm:h-[455px] lg:h-[520px]"
    >
      {/* Cool, restrained architectural lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 66% 56% at 50% 46%, rgba(22,141,245,0.14), transparent 73%), radial-gradient(ellipse 44% 38% at 50% 48%, rgba(66,199,255,0.045), transparent 78%)",
        }}
      />

      {/* Low-contrast technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[9%] top-[13%] h-[68%] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      {showCanvas ? (
        <SceneErrorBoundary onError={handleError}>
          <Canvas
            camera={{ position: [0, 0.2, 7.8], fov: 37 }}
            dpr={[1, 1.35]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(C.background, 0);
              gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
          >
            <Suspense fallback={null}>
              <SceneContents mode={mode} reducedMotion={reducedMotion} />

              <OrbitControls
                ref={controlsRef}
                makeDefault
                target={[0, -0.05, 0]}
                enablePan={false}
                enableZoom
                minDistance={6.2}
                maxDistance={9}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.85}
                autoRotate={!reducedMotion}
                autoRotateSpeed={0.18}
                enableDamping
                dampingFactor={0.08}
              />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>
      ) : (
        <ArchitectureFallback text={text} />
      )}

      {/* Context label */}
      <div className="absolute left-4 top-5 flex items-center gap-2.5 sm:left-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[#42c7ff]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {text.eyebrow}
        </span>
      </div>

      {/* Reset camera */}
      {showCanvas && (
        <button
          type="button"
          onClick={() => controlsRef.current?.reset()}
          aria-label={text.reset}
          className="absolute right-4 top-3 inline-flex min-h-9 items-center gap-2 border border-white/10 bg-[#07111b]/80 px-3 text-[10px] font-medium text-slate-400 transition-colors hover:border-[#42c7ff]/45 hover:text-[#42c7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42c7ff] sm:right-7"
        >
          <RotateCcw size={13} aria-hidden="true" />
          {text.reset}
        </button>
      )}

      {/* Architecture mode selector */}
      <div
        role="group"
        aria-label={text.system}
        className="absolute bottom-[3.8rem] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 border border-white/[0.11] bg-[#07111b]/95 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-md sm:bottom-[4.1rem]"
      >
        {modes.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={`min-h-9 whitespace-nowrap px-3 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42c7ff] sm:px-4 ${
              mode === id
                ? "bg-[#168df5]/15 text-[#e4f5ff] shadow-[inset_0_-2px_0_#42c7ff]"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-slate-500 sm:bottom-3 sm:text-[10px]">
        {text.rotate}
        <span className="px-1.5 text-[#42c7ff]">·</span>
        {text.zoom}
      </p>

      <span className="sr-only" aria-live="polite">
        {text.system}: {modes.find((item) => item.id === mode)?.label}
      </span>
    </div>
  );
}
