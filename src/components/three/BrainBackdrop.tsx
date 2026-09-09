"use client";

import dynamic from "next/dynamic";
import { BrainMotion } from "./BrainModel";
import { PointerOrbitMode } from "./usePointerOrbit";

const BrainCanvas3D = dynamic(
  () => import("./BrainCanvas3D").then((m) => m.BrainCanvas3D),
  { ssr: false },
);

type BrainBackdropProps = BrainMotion & {
  mode?: PointerOrbitMode;
  className?: string;
  distance?: number;
  particles?: boolean;
  /** Set false for a particles-only ambient backdrop with no brain (the dev panel) — see BrainCanvas3D. */
  brain?: boolean;
};

/**
 * Drop-in brain (or particles-only backdrop, with brain={false}) for blocks
 * shorter than the viewport (the research hero, the gate panels) —
 * absolutely fills whatever `position: relative` container it's placed in.
 * All the mouse interaction (drag/hover/idle) lives in
 * BrainCanvas3D/usePointerOrbit; this is just the dynamic-import boundary
 * shared by every call site.
 */
export function BrainBackdrop({ className, distance, mode, particles, brain, ...motion }: BrainBackdropProps) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <BrainCanvas3D mode={mode} distance={distance} particles={particles} brain={brain} {...motion} />
    </div>
  );
}
