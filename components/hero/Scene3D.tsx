"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Nucleus() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) {
      mat.current.emissiveIntensity = 1.4 + Math.sin(t * 2.4) * 0.7;
    }
  });
  return (
    <mesh>
      <sphereGeometry args={[0.55, 48, 48]} />
      <meshStandardMaterial
        ref={mat}
        color="#8b5cf6"
        emissive="#7c3aed"
        emissiveIntensity={1.6}
        roughness={0.15}
        metalness={0.6}
      />
    </mesh>
  );
}

function Electron({
  radius,
  speed,
  tilt,
  phase,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  phase: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    if (group.current) {
      group.current.rotation.set(tilt, tilt * 0.6, 0);
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const ring = group.current.children[0] as THREE.Mesh;
      if (ball.current) ball.current.position.set(x, 0, z);
      if (ring) ring.scale.set(1, 1, 1);
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.014, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ball}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count = 900 }: { count?: number }) {
  const positions = useMemo(() => {
    const rand = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 26;
      arr[i * 3 + 1] = (rand() - 0.5) * 16;
      arr[i * 3 + 2] = (rand() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#22d3ee"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function QuantumScene() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
        <group position={[0, 0.2, 0]}>
          <Nucleus />
          <Electron
            radius={2.1}
            speed={0.85}
            tilt={0.35}
            phase={0}
            color="#22d3ee"
          />
          <Electron
            radius={2.9}
            speed={0.55}
            tilt={-0.5}
            phase={Math.PI}
            color="#e879f9"
          />
          <Electron
            radius={3.7}
            speed={0.4}
            tilt={0.9}
            phase={Math.PI / 2}
            color="#8b5cf6"
          />
        </group>
      </Float>
      <ParticleField />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={120} color="#22d3ee" />
      <pointLight position={[-6, -4, -6]} intensity={90} color="#e879f9" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 8.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <QuantumScene />
    </Canvas>
  );
}
