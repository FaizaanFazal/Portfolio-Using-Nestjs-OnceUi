"use client";

import { RefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry } from "three";
import { PointerOrbitState } from "./usePointerOrbit";

// Synthetic, not sourced from the anatomical .dat files: those are literal
// scan points of real structures (sulci, vessels), and any sparse subsample
// of them reads as visible curved streaks rather than an even scatter —
// tried a random resample first and the streaks are the data, not an
// aliasing bug. This is meant to be an ambient halo, not more anatomy (the
// brain model already covers that), so a procedural shell is both cleaner
// and cheaper — no fetch, no parsing.
const POINT_COUNT = 2600;
const INNER_RADIUS = 0.5;
const OUTER_RADIUS = 1.0;
// Flattened, wide ellipsoid — matches the original poster art's oval halo
// rather than a perfect sphere.
const SCALE: [number, number, number] = [2.7, 1.85, 1.5];

const RADIUS = 1.3;
const STRENGTH = 0.05;
const SPRING = 0.02;
const DAMPING = 0.9;

function buildShell(): Float32Array {
  const homes = new Float32Array(POINT_COUNT * 3);
  for (let p = 0; p < POINT_COUNT; p++) {
    let x = 0, y = 0, z = 0, lenSq = 0;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      lenSq = x * x + y * y + z * z;
    } while (lenSq > 1 || lenSq === 0);
    const len = Math.sqrt(lenSq);
    const r = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS);
    const i = p * 3;
    homes[i] = (x / len) * r * SCALE[0];
    homes[i + 1] = (y / len) * r * SCALE[1];
    homes[i + 2] = (z / len) * r * SCALE[2];
  }
  return homes;
}

type ParticleFieldProps = {
  pointerRef: RefObject<PointerOrbitState>;
  reducedMotion?: boolean;
  color?: string;
  size?: number;
};

/**
 * The "molecular structure" halo, now real points instead of a baked-in
 * poster pattern, so it can disperse away from the cursor instead of just
 * sitting there.
 */
export function ParticleField({ pointerRef, reducedMotion = false, color = "#e8ecf2", size = 0.045 }: ParticleFieldProps) {
  const homesRef = useRef<Float32Array>(buildShell());
  const positionsRef = useRef<Float32Array>(homesRef.current.slice());
  const velocitiesRef = useRef<Float32Array>(new Float32Array(homesRef.current.length));
  const geometryRef = useRef<BufferGeometry>(null);
  // Stable across re-renders so the bufferAttribute below isn't recreated.
  const positions = useMemo(() => positionsRef.current, []);

  useFrame((state) => {
    const homes = homesRef.current;
    const velocities = velocitiesRef.current;
    const geometry = geometryRef.current;
    if (!geometry) return;

    const pointer = pointerRef.current;
    // Same plane the brain sits on (z=0), so the repel radius lines up with
    // where the cursor visually appears to be relative to the model.
    const cursorX = pointer.nx * state.viewport.width * 0.5;
    const cursorY = -pointer.ny * state.viewport.height * 0.5;
    const cursorActive = !reducedMotion;

    for (let i = 0; i < positions.length; i += 3) {
      const ix = i, iy = i + 1, iz = i + 2;

      if (cursorActive) {
        const dx = positions[ix] - cursorX;
        const dy = positions[iy] - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.0001) {
          const force = Math.pow(1 - dist / RADIUS, 2) * STRENGTH;
          velocities[ix] += (dx / dist) * force;
          velocities[iy] += (dy / dist) * force;
        }
      }

      velocities[ix] += (homes[ix] - positions[ix]) * SPRING;
      velocities[iy] += (homes[iy] - positions[iy]) * SPRING;
      velocities[iz] += (homes[iz] - positions[iz]) * SPRING;

      velocities[ix] *= DAMPING;
      velocities[iy] *= DAMPING;
      velocities[iz] *= DAMPING;

      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];
    }

    const attr = geometry.getAttribute("position") as BufferAttribute;
    attr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
