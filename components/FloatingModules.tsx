"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

type FloatingModuleProps = {
  position: [number, number, number];
  color: string;
  shape: "box" | "octahedron" | "torus";
  scale: number;
  phase: number;
};

const MODULES: FloatingModuleProps[] = [
  {
    position: [-2.15, 0.65, -0.8],
    color: "#36baff",
    shape: "octahedron",
    scale: 0.22,
    phase: 0,
  },
  {
    position: [2.15, 0.8, -0.65],
    color: "#38dfa1",
    shape: "box",
    scale: 0.2,
    phase: 1.2,
  },
  {
    position: [1.9, -1.1, -0.5],
    color: "#36baff",
    shape: "torus",
    scale: 0.2,
    phase: 2.1,
  },
  {
    position: [-1.85, -1.2, -0.7],
    color: "#38dfa1",
    shape: "box",
    scale: 0.16,
    phase: 3,
  },
];

export default function FloatingModules() {
  return (
    <group>
      {MODULES.map((module, index) => (
        <FloatingModule
          key={`floating-module-${index}`}
          {...module}
        />
      ))}
    </group>
  );
}

function FloatingModule({
  position,
  color,
  shape,
  scale,
  phase,
}: FloatingModuleProps) {
  const moduleRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!moduleRef.current) return;

    const time = clock.elapsedTime + phase;

    // Slow, independent floating motion.
    moduleRef.current.position.y =
      position[1] + Math.sin(time * 0.55) * 0.07;

    moduleRef.current.rotation.x += delta * 0.08;
    moduleRef.current.rotation.y += delta * 0.12;

    // Tiny movement toward and away from the viewer.
    moduleRef.current.position.z =
      position[2] + Math.sin(time * 0.35) * 0.035;

    moduleRef.current.scale.setScalar(
      MathUtils.lerp(
        moduleRef.current.scale.x,
        scale * (1 + Math.sin(time * 0.8) * 0.035),
        0.08,
      ),
    );
  });

  return (
    <group ref={moduleRef} position={position} scale={scale}>
      {shape === "box" && (
        <mesh>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial
            color="#26394e"
            metalness={0.9}
            roughness={0.24}
            emissive={color}
            emissiveIntensity={0.12}
          />
          <Edges color={color} opacity={0.85} />
        </mesh>
      )}

      {shape === "octahedron" && (
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9bb1c7"
            metalness={0.85}
            roughness={0.22}
            emissive={color}
            emissiveIntensity={0.18}
            flatShading
          />
          <Edges color={color} opacity={0.9} />
        </mesh>
      )}

      {shape === "torus" && (
        <mesh>
          <torusGeometry args={[0.8, 0.16, 10, 28]} />
          <meshStandardMaterial
            color="#9bb1c7"
            metalness={0.9}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </mesh>
      )}
    </group>
  );
}

function Edges({
  color,
  opacity,
}: {
  color: string;
  opacity: number;
}) {
  return (
    <lineSegments>
      <edgesGeometry args={[undefined as never]} />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </lineSegments>
  );
}
