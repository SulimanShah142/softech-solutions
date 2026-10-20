"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { SceneMode } from "./ComputerScene";

const colors = {
  background: "#050914",
  blue: "#168df5",
  cyan: "#42c7ff",
  green: "#28d9a0",
};

const layers = [
  { y: 1.15, color: colors.cyan },
  { y: 0, color: colors.blue },
  { y: -1.15, color: colors.green },
] as const;

const modulePositions = [-1.42, 0, 1.42] as const;

function FirstRenderedFrame({ onReady }: { onReady: () => void }) {
  const hasRendered = useRef(false);

  useFrame(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;
    onReady();
  });

  return null;
}

function ArchitectureModel({ mode, reducedMotion }: {
  mode: SceneMode;
  reducedMotion: boolean;
}) {
  const activeLayer = mode === "platform" ? 0 : mode === "integrations" ? 1 : 2;

  return (
    <Float
      speed={reducedMotion ? 0 : 0.3}
      rotationIntensity={reducedMotion ? 0 : 0.018}
      floatIntensity={reducedMotion ? 0 : 0.035}
    >
      <group rotation={[0.035, -0.13, 0]}>
        {layers.map((layer, layerIndex) => {
          const active = activeLayer === layerIndex;

          return (
            <group key={layer.y} position={[0, layer.y, 0]}>
              <mesh position={[0, 0, -0.12]}>
                <boxGeometry args={[4.45, 0.018, 1.42]} />
                <meshBasicMaterial
                  color={layer.color}
                  transparent
                  opacity={active ? 0.13 : 0.045}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
              <Line
                points={[
                  [-2.225, 0.01, -0.83],
                  [2.225, 0.01, -0.83],
                  [2.225, 0.01, 0.59],
                  [-2.225, 0.01, 0.59],
                  [-2.225, 0.01, -0.83],
                ]}
                color={layer.color}
                lineWidth={active ? 1.1 : 0.65}
                transparent
                opacity={active ? 0.6 : 0.19}
              />
              {modulePositions.map((x, index) => (
                <group key={index} position={[x, 0.095, 0.02]}>
                  <RoundedBox args={[1.12, 0.19, 0.48]} radius={0.055} smoothness={5}>
                    <meshPhysicalMaterial
                      color={active ? "#122b40" : "#0b1728"}
                      metalness={0.18}
                      roughness={0.3}
                      clearcoat={0.55}
                      clearcoatRoughness={0.35}
                      emissive={layer.color}
                      emissiveIntensity={active ? 0.09 : 0.018}
                    />
                  </RoundedBox>
                  <mesh position={[0, 0.098, 0.015]}>
                    <boxGeometry args={[0.52, 0.008, 0.012]} />
                    <meshBasicMaterial color={layer.color} toneMapped={false} />
                  </mesh>
                  <mesh position={[-0.43, 0.012, 0.252]}>
                    <sphereGeometry args={[0.025, 12, 10]} />
                    <meshBasicMaterial color={layer.color} toneMapped={false} />
                  </mesh>
                </group>
              ))}
            </group>
          );
        })}

        {modulePositions.map((x, index) => (
          <group key={index}>
            <Line
              points={[[x, 1.04, 0.12], [x, 0.73, 0.12], [x, 0.42, 0.12]]}
              color={activeLayer === 0 ? colors.cyan : "#31516a"}
              lineWidth={1.15}
              transparent
              opacity={activeLayer === 0 ? 0.9 : 0.45}
            />
            <Line
              points={[[x, -0.12, 0.12], [x, -0.43, 0.12], [x, -0.73, 0.12]]}
              color={activeLayer === 1 ? colors.blue : "#31516a"}
              lineWidth={1.15}
              transparent
              opacity={activeLayer === 1 ? 0.9 : 0.45}
            />
          </group>
        ))}
      </group>
    </Float>
  );
}

export default function ComputerSceneRenderer({
  mode,
  reducedMotion,
  controlsRef,
  onReady,
}: {
  mode: SceneMode;
  reducedMotion: boolean;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onReady: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.8], fov: 37 }}
      dpr={[1, 1.35]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => {
        gl.setClearColor(colors.background, 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        onReady();
      }}
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 5, 6]} intensity={1.7} color="#e7f2ff" />
      <pointLight position={[-3, 1.5, 3]} intensity={5} distance={9} color={colors.blue} />
      <pointLight position={[3, -0.5, -1]} intensity={2.2} distance={7} color={colors.cyan} />
      <ArchitectureModel mode={mode} reducedMotion={reducedMotion} />
      <FirstRenderedFrame onReady={onReady} />
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
    </Canvas>
  );
}
