"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

const NODES = [
  { position: [-1.8, 0.8, 0.2] as [number, number, number], color: "#36baff", size: 0.055 },
  { position: [1.7, 1.1, -0.3] as [number, number, number], color: "#38dfa1", size: 0.065 },
  { position: [2.0, -0.6, 0.1] as [number, number, number], color: "#36baff", size: 0.045 },
  { position: [-1.5, -1.0, -0.2] as [number, number, number], color: "#38dfa1", size: 0.06 },
  { position: [0.3, 1.8, 0.1] as [number, number, number], color: "#36baff", size: 0.045 },
  { position: [-0.4, -1.8, 0.3] as [number, number, number], color: "#38dfa1", size: 0.05 },
];

const CONNECTIONS = [
  [0, 4],
  [4, 1],
  [1, 2],
  [2, 5],
  [5, 3],
  [3, 0],
  [0, 1],
  [3, 2],
];

export default function SystemNetwork() {
  const networkRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!networkRef.current) return;

    // Keep the network moving almost imperceptibly.
    networkRef.current.rotation.y += delta * 0.025;
    networkRef.current.rotation.x = MathUtils.lerp(
      networkRef.current.rotation.x,
      Math.sin(clock.elapsedTime * 0.25) * 0.035,
      0.025,
    );
  });

  return (
    <group ref={networkRef}>
      {/* Fine connections between network nodes */}
      {CONNECTIONS.map(([startIndex, endIndex], index) => {
        const start = NODES[startIndex].position;
        const end = NODES[endIndex].position;

        return (
          <line key={`connection-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([...start, ...end]),
                  3,
                ]}
              />
            </bufferGeometry>

            <lineBasicMaterial
              color={index % 2 === 0 ? "#268acb" : "#239e78"}
              transparent
              opacity={0.38}
            />
          </line>
        );
      })}

      {/* Network nodes */}
      {NODES.map((node, index) => (
        <NetworkNode
          key={`node-${index}`}
          position={node.position}
          color={node.color}
          size={node.size}
          phase={index * 0.8}
        />
      ))}
    </group>
  );
}

type NetworkNodeProps = {
  position: [number, number, number];
  color: string;
  size: number;
  phase: number;
};

function NetworkNode({
  position,
  color,
  size,
  phase,
}: NetworkNodeProps) {
  const nodeRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;

    const pulse = 1 + Math.sin(clock.elapsedTime * 1.4 + phase) * 0.12;
    nodeRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={nodeRef} position={position}>
      {/* Soft glow */}
      <mesh>
        <sphereGeometry args={[size * 2.8, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </mesh>

      {/* Bright central node */}
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}
