"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Spinner } from "@once-ui-system/core";
import { BrainModel, BrainMotion } from "./BrainModel";
import { usePointerOrbit, PointerOrbitMode } from "./usePointerOrbit";
import { ParticleField } from "./ParticleField";
import styles from "./BrainCanvas3D.module.scss";

type BrainCanvas3DProps = BrainMotion & {
  /** "drag": click-drag to spin + hover sway. "hover": sway only (used inside click-to-navigate buttons). */
  mode?: PointerOrbitMode;
  className?: string;
  /** Camera distance — smaller frames the brain tighter. */
  distance?: number;
  /** Real interactive point cloud that disperses away from the cursor. */
  particles?: boolean;
  /** Set false to use this purely as a particles-only ambient backdrop (dev panel) — skips loading the GLB/texture entirely. */
  brain?: boolean;
};

function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => onReady(), [onReady]);
  return null;
}

/**
 * WebGL stage for the brain model. Follows the same progressive-enhancement
 * contract as the particle canvas it replaces (plan.md §4.8): it renders
 * nothing at all when WebGL is unavailable, so whatever poster/motif the
 * parent already paints stays visible, and it stops its frame loop entirely
 * when scrolled out of view.
 *
 * Interaction replaces the earlier scroll-scrub entirely: mouse drag spins
 * the model, and it sways gently toward the cursor otherwise.
 */
export function BrainCanvas3D({
  mode = "drag",
  className,
  distance = 4.4,
  particles = false,
  brain = true,
  ...motion
}: BrainCanvas3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const pointerRef = usePointerOrbit(hostRef, supported ? mode : "idle");

  useEffect(() => {
    const probe = document.createElement("canvas");
    setSupported(Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl")));
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !supported) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [supported]);

  if (supported === false) return null;

  return (
    <div ref={hostRef} className={`${styles.host} ${className ?? ""}`} aria-hidden="true">
      {/* The GLB + texture fetch/parse takes a visible moment (see
          BrainModel's useLoader calls) — without this the panel just looks
          empty/broken until it pops in. Cross-fades with the canvas's own
          fade-in below rather than the two ever overlapping. */}
      {supported && (
        <div className={`${styles.loading} ${ready ? styles.loadingDone : ""}`}>
          <Spinner size="m" />
        </div>
      )}
      {supported && (
        <Canvas
          className={`${styles.canvas} ${ready ? styles.visible : ""}`}
          dpr={[1, 2]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0, distance], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.15;
          }}
        >
          {brain && (
            <>
              {/* Cool key + purple rim + cyan underfill: keeps the specimen
                  readable as real anatomy while sitting inside the site's
                  neuroimaging palette instead of fighting it. Points are
                  unlit (PointsMaterial ignores scene lights), so these only
                  matter when the brain itself is rendered. */}
              <ambientLight intensity={0.55} />
              <directionalLight position={[3, 4, 5]} intensity={2.4} />
              <directionalLight position={[-4, 1.5, -3]} intensity={2.0} color="#a855c7" />
              <directionalLight position={[0, -3, 2]} intensity={0.7} color="#67ffff" />
            </>
          )}
          <Suspense fallback={null}>
            {brain && (
              <BrainModel
                pointerRef={pointerRef}
                reducedMotion={reducedMotion}
                {...motion}
              />
            )}
            {particles && <ParticleField pointerRef={pointerRef} reducedMotion={reducedMotion} />}
            <ReadySignal onReady={() => setReady(true)} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
