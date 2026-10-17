"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import * as THREE from "three";

const modulePositions: [number, number, number][] = [
  [-1.25, 0.72, 0.05],
  [1.25, 0.72, -0.05],
  [-1.38, -0.58, 0.1],
  [1.38, -0.58, -0.1],
  [0, 1.48, -0.18],
  [0, -1.42, 0.15],
  [-0.2, 0.05, 1.05],
  [0.2, -0.05, -1.05],
];

const connections: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 4],
  [1, 4],
  [2, 5],
  [3, 5],
  [4, 6],
  [5, 6],
  [0, 6],
  [1, 7],
  [2, 7],
  [3, 7],
  [6, 7],
];

function SystemConnections() {
  return (
    <group>
      {connections.map(([start, end], index) => (
        <Line
          key={index}
          points={[modulePositions[start], modulePositions[end]]}
          color={index % 3 === 0 ? "#568C80" : "#315780"}
          lineWidth={1}
          transparent
          opacity={index % 3 === 0 ? 0.55 : 0.38}
        />
      ))}
    </group>
  );
}

function SystemModules({ reducedMotion }: { reducedMotion: boolean }) {
  const modulesRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (reducedMotion || !modulesRef.current) return;

    modulesRef.current.position.y =
      Math.sin(clock.elapsedTime * 0.55) * 0.035;
  });

  return (
    <group ref={modulesRef}>
      {modulePositions.map((position, index) => {
        const greenNode = index === 4 || index === 6;

        return (
          <group key={index} position={position}>
            {/* Module housing */}
            <mesh>
              <boxGeometry args={[0.17, 0.17, 0.17]} />
              <meshStandardMaterial
                color={greenNode ? "#153D35" : "#102847"}
                metalness={0.72}
                roughness={0.32}
                emissive={greenNode ? "#174B3C" : "#102C4B"}
                emissiveIntensity={0.45}
              />
              <Edges
                color={greenNode ? "#568C80" : "#426B96"}
                threshold={15}
              />
            </mesh>

            {/* Small inner component */}
            <mesh scale={0.42}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial
                color={greenNode ? "#7DB6A0" : "#82A9D2"}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function EngineeringCore({ reducedMotion }: { reducedMotion: boolean }) {
  const coreRef = useRef<THREE.Group>(null!);
  const orbitRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const beaconsRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.13;
      coreRef.current.rotation.x =
        Math.sin(clock.elapsedTime * 0.3) * 0.12;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.z -= delta * 0.09;
      orbitRef.current.rotation.x =
        Math.sin(clock.elapsedTime * 0.22) * 0.12;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.18;
      innerRef.current.rotation.y += delta * 0.24;
    }

    if (beaconsRef.current) {
      beaconsRef.current.rotation.y -= delta * 0.07;
    }
  });

  return (
    <group>
      {/* Structural orbit rings */}
      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2.6, 0.2, 0]}>
          <torusGeometry args={[1.75, 0.003, 8, 160]} />
          <meshBasicMaterial
            color="#426B96"
            transparent
            opacity={0.55}
          />
        </mesh>

        <mesh rotation={[0.55, Math.PI / 2.8, 0.3]}>
          <torusGeometry args={[1.52, 0.004, 8, 160]} />
          <meshBasicMaterial
            color="#568C80"
            transparent
            opacity={0.42}
          />
        </mesh>

        <mesh rotation={[1.1, 0.5, 0.7]}>
          <torusGeometry args={[1.28, 0.0025, 8, 160]} />
          <meshBasicMaterial
            color="#6686A8"
            transparent
            opacity={0.38}
          />
        </mesh>
      </group>

      {/* Main engineered core */}
      <group ref={coreRef}>
        {/* Outer structural shell */}
        <mesh>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial
            color="#102847"
            metalness={0.78}
            roughness={0.28}
            emissive="#102847"
            emissiveIntensity={0.5}
            flatShading
            wireframe
          />
        </mesh>

        {/* Inner solid geometry */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color="#254F63"
            metalness={0.8}
            roughness={0.24}
            emissive="#174B3C"
            emissiveIntensity={0.32}
            flatShading
          />
          <Edges color="#7199A0" threshold={15} />
        </mesh>

        {/* Core center */}
        <mesh scale={0.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#A0C8C0" wireframe />
        </mesh>
      </group>

      {/* Connected system modules */}
      <SystemConnections />
      <SystemModules reducedMotion={reducedMotion} />

      {/* Orbiting reference points */}
      <group ref={beaconsRef}>
        <mesh position={[0, 1.76, 0]} scale={0.045}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#23b9ff" />
        </mesh>

        <mesh position={[-1.57, -0.82, 0.25]} scale={0.055}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#08d890" />
        </mesh>

        <mesh position={[1.57, 0.85, -0.1]} scale={0.045}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#edf3fa" />
        </mesh>
      </group>
    </group>
  );
}

function EngineeringSystem({ reducedMotion }: { reducedMotion: boolean }) {
  const systemRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, pointer }, delta) => {
    const system = systemRef.current;
    if (reducedMotion || !system) return;

    system.rotation.x = THREE.MathUtils.damp(
      system.rotation.x,
      pointer.y * 0.12,
      2.4,
      delta,
    );
    system.rotation.y = THREE.MathUtils.damp(
      system.rotation.y,
      pointer.x * 0.16,
      2.4,
      delta,
    );
    system.position.x = THREE.MathUtils.damp(
      system.position.x,
      pointer.x * 0.07,
      2.4,
      delta,
    );
    system.position.y = THREE.MathUtils.damp(
      system.position.y,
      pointer.y * 0.05 + Math.sin(clock.elapsedTime * 0.45) * 0.012,
      2.4,
      delta,
    );
  });

  return (
    <group ref={systemRef} scale={0.92}>
      <EngineeringCore reducedMotion={reducedMotion} />
    </group>
  );
}

export default function EngineeringScene() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.3], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={1.5}
        color="#C6D9EF"
      />

      <pointLight
        position={[-2, 1.5, 2]}
        intensity={18}
        distance={7}
        color="#315F91"
      />

      <pointLight
        position={[2, -1.5, -1]}
        intensity={12}
        distance={6}
        color="#24614F"
      />

      <EngineeringSystem reducedMotion={reducedMotion} />
    </Canvas>
  );
}
