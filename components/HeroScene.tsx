"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// ─── Terrain Geometry (procedural Maharashtra landscape) ─────────────────────

function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 120, 120);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Layered noise-like elevation for Sahyadri feel
      const h =
        Math.sin(x * 0.5) * Math.cos(y * 0.4) * 1.2 +
        Math.sin(x * 1.1 + 0.5) * Math.cos(y * 0.9) * 0.7 +
        Math.sin(x * 2.3 - 1.0) * Math.cos(y * 2.1 + 0.3) * 0.35 +
        Math.sin(x * 0.3 + y * 0.2) * 0.9 +
        Math.cos(x * 0.8 - y * 0.6) * 0.5;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.5, 0]}>
      <meshStandardMaterial
        color="#1A3A2A"
        roughness={0.85}
        metalness={0.05}
        wireframe={false}
      />
    </mesh>
  );
}

// ─── Destination Markers ──────────────────────────────────────────────────────

const MARKER_POSITIONS: { pos: [number, number, number]; label: string; color: string }[] = [
  { pos: [-2.5, 0.8, 2.0], label: "Matheran", color: "#E8A84C" },
  { pos: [1.0, 1.2, 1.5], label: "Mahabaleshwar", color: "#C4622D" },
  { pos: [-3.5, 0.5, 0.5], label: "Alibaug", color: "#2A7A6F" },
  { pos: [2.5, 0.3, -0.5], label: "Raigad", color: "#E8A84C" },
  { pos: [0.5, 1.5, -1.0], label: "Lonavala", color: "#C4622D" },
  { pos: [-1.5, 0.9, -2.0], label: "Konkan", color: "#2A7A6F" },
];

function DestinationMarker({ pos, color }: { pos: [number, number, number]; color: string }) {
  const ringRef = useRef<THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * 1.5 + pos[0]) * 0.18);
      ringRef.current.material.opacity = 0.5 + Math.sin(t * 1.5 + pos[0]) * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = pos[1] + Math.sin(t * 0.8 + pos[2]) * 0.12;
    }
  });

  return (
    <group position={pos}>
      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Marker sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Vertical line */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ─── Atmospheric Particles (mist / clouds) ───────────────────────────────────

function AtmosphericParticles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 600 : 1400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C4E8D0" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// ─── Floating Mist Planes ─────────────────────────────────────────────────────

function MistLayer({ y, opacity }: { y: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.06) * 1.5;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[22, 22]} />
      <meshBasicMaterial color="#a8d5b5" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Scene Camera Animation ───────────────────────────────────────────────────

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.07) * 1.2;
    state.camera.position.y = 4.5 + Math.sin(t * 0.05) * 0.4;
    state.camera.lookAt(0, -0.5, 0);
  });
  return null;
}

// ─── Main Hero 3D Scene ───────────────────────────────────────────────────────

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 8], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={typeof window !== "undefined" && window.devicePixelRatio > 2 ? 2 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
    >
      <ambientLight intensity={0.4} color="#b8d8c8" />
      <directionalLight position={[5, 8, 3]} intensity={1.6} color="#F0EDE8" castShadow />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#E8A84C" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#2A7A6F" distance={20} />

      <Stars radius={80} depth={50} count={1200} factor={3} saturation={0} fade speed={0.5} />

      <TerrainMesh />
      <AtmosphericParticles />
      <MistLayer y={-0.4} opacity={0.04} />
      <MistLayer y={0.2} opacity={0.025} />

      {MARKER_POSITIONS.map((m) => (
        <DestinationMarker key={m.label} pos={m.pos} color={m.color} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 5}
      />

      <CameraRig />
    </Canvas>
  );
}
