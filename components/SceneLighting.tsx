"use client";

import { Environment } from "@react-three/drei";

export default function SceneLighting() {
  return (
    <>
      {/* Midnight-navy foundation */}
      <color attach="background" args={["#050914"]} />

      {/* Soft overall illumination */}
      <ambientLight intensity={0.45} />

      {/* Cool blue key light */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={2.2}
        color="#8dcaff"
      />

      {/* Emerald rim light */}
      <pointLight
        position={[-4, 1.5, -2]}
        intensity={18}
        distance={10}
        decay={2}
        color="#20d99a"
      />

      {/* Cyan side light */}
      <pointLight
        position={[4, -1, 1]}
        intensity={12}
        distance={9}
        decay={2}
        color="#168cff"
      />

      {/* Soft silver highlight from above */}
      <spotLight
        position={[0, 6, 3]}
        angle={0.65}
        penumbra={0.8}
        intensity={1.4}
        color="#e6f3ff"
      />

      {/* Reflections for metallic materials */}
      <Environment preset="city" environmentIntensity={0.65} />
    </>
  );
}
