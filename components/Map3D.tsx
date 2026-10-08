"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { DESTINATIONS, type Destination } from "@/lib/data";

// Map lat/long of Maharashtra roughly to 3D X/Z plane coordinates
// Western India bounds: Lat ~15.5 to 20.5, Lng ~72.5 to 74.5
function projectCoords(lat: number, lng: number): [number, number, number] {
  // Center roughly at Mumbai (19.0, 73.0)
  const x = (lng - 73.4) * 4.8;
  const z = -(lat - 18.6) * 4.2;
  // Elevation based on mountain / coastal nature
  const y = lat > 17.5 && lng > 73.2 ? 0.35 : 0.1;
  return [x, y, z];
}

const HUB_POS: [number, number, number] = projectCoords(18.922, 72.834); // Mumbai Gateway / Hub

// Smooth camera controller that lerps to target
function CameraController({ targetPos }: { targetPos: [number, number, number] | null }) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (targetPos) {
      const targetLook = new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]);
      currentLookAt.current.lerp(targetLook, delta * 3.0);
      camera.lookAt(currentLookAt.current);

      const desiredCamPos = new THREE.Vector3(
        targetPos[0] + 0.5,
        targetPos[1] + 2.2,
        targetPos[2] + 2.8
      );
      camera.position.lerp(desiredCamPos, delta * 2.5);
    } else {
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), delta * 2.0);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}

// Route curve generator
function RouteArc({ start, end, active }: { start: [number, number, number]; end: [number, number, number]; active: boolean }) {
  const curve = useMemo(() => {
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const dist = p1.distanceTo(p2);
    mid.y += Math.max(0.4, dist * 0.35); // Arch height
    return new THREE.CatmullRomCurve3([p1, mid, p2]);
  }, [start, end]);

  const tubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (tubeRef.current && active) {
      const mat = tubeRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
    }
  });

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 40, active ? 0.025 : 0.012, 8, false]} />
      <meshBasicMaterial
        color={active ? "#E8A84C" : "#C4622D"}
        transparent
        opacity={active ? 0.9 : 0.35}
      />
    </mesh>
  );
}

// Individual 3D Marker Pin
function MapPinMarker({
  dest,
  isSelected,
  onSelect,
}: {
  dest: Destination;
  isSelected: boolean;
  onSelect: (dest: Destination) => void;
}) {
  const pos = useMemo(() => projectCoords(dest.lat, dest.lng), [dest]);
  const ringRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      const scale = 1 + (isSelected ? Math.sin(t * 3) * 0.4 : Math.sin(t * 1.5 + pos[0]) * 0.2);
      ringRef.current.scale.set(scale, scale, scale);
    }
    if (beaconRef.current) {
      beaconRef.current.position.y = pos[1] + 0.15 + Math.sin(t * 2 + pos[2]) * 0.05;
    }
  });

  const pinColor = isSelected
    ? "#FFB100"
    : dest.category === "Mountains"
    ? "#E8A84C"
    : dest.category === "Beaches"
    ? "#2A7A6F"
    : dest.category === "Heritage"
    ? "#C4622D"
    : "#52B788";

  return (
    <group position={pos} onClick={(e) => { e.stopPropagation(); onSelect(dest); }}>
      {/* Base ground ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.16, 24]} />
        <meshBasicMaterial
          color={pinColor}
          transparent
          opacity={isSelected ? 0.9 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical pin stem */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.24, 8]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>

      {/* Glowing floating head pin */}
      <mesh ref={beaconRef} position={[0, 0.25, 0]}>
        <sphereGeometry args={[isSelected ? 0.09 : 0.065, 16, 16]} />
        <meshStandardMaterial
          color={pinColor}
          emissive={pinColor}
          emissiveIntensity={isSelected ? 1.0 : 0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Floating 3D Text Label */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.12}
        color={isSelected ? "#FFF6E9" : "#E8A84C"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#0A1628"
      >
        {dest.name}
      </Text>
    </group>
  );
}

// 3D Topographic Base Platform for Maharashtra
function MaharashtraMapBase() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(10, 8, 48, 48);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      // Gentle elevation for the Ghats spine along the center
      const ghatElevation = Math.exp(-Math.pow(x + 0.3, 2) / 2.5) * 0.4;
      p.setZ(i, ghatElevation + Math.sin(x * 2) * Math.cos(y * 2) * 0.08);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      {/* Topo surface */}
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color="#0C1E34"
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Grid line overlay */}
      <mesh position={[0, 0, 0.02]} geometry={geo}>
        <meshBasicMaterial
          color="#2A7A6F"
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

interface Map3DProps {
  selectedDest: Destination | null;
  onSelectDest: (dest: Destination) => void;
  className?: string;
}

export default function Map3D({ selectedDest, onSelectDest, className = "w-full h-full" }: Map3DProps) {
  const targetPos = useMemo(() => {
    return selectedDest ? projectCoords(selectedDest.lat, selectedDest.lng) : null;
  }, [selectedDest]);

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 4.2, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} color="#e6f0fa" />
        <directionalLight position={[6, 9, 4]} intensity={1.5} color="#FFF6E9" />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#C4622D" />
        <pointLight position={[0, 3, 0]} intensity={0.7} color="#E8A84C" distance={15} />

        <MaharashtraMapBase />

        {/* Mumbai Hub marker */}
        <group position={HUB_POS}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.07, 0.12, 24]} />
            <meshBasicMaterial color="#E8A84C" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#E8A84C" emissive="#E8A84C" emissiveIntensity={0.8} />
          </mesh>
          <Text position={[0, 0.25, 0]} fontSize={0.11} color="#E8A84C" outlineWidth={0.01} outlineColor="#0A1628">
            Mumbai (Hub)
          </Text>
        </group>

        {/* Destination Markers */}
        {DESTINATIONS.map((dest) => (
          <MapPinMarker
            key={dest.id}
            dest={dest}
            isSelected={selectedDest?.id === dest.id}
            onSelect={onSelectDest}
          />
        ))}

        {/* Route Arcs from Mumbai */}
        {DESTINATIONS.map((dest) => {
          const destPos = projectCoords(dest.lat, dest.lng);
          const isSelected = selectedDest?.id === dest.id;
          return (
            <RouteArc
              key={`route-${dest.id}`}
              start={HUB_POS}
              end={destPos}
              active={isSelected}
            />
          );
        })}

        <CameraController targetPos={targetPos} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          minDistance={2.5}
          maxDistance={8.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
