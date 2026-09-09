"use client";

import { RefObject, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import { PointerOrbitState } from "./usePointerOrbit";

/** The GLB lives in public/, so it is served from the site root. */
export const BRAIN_MODEL_URL = "/assets/3D/A_Human_Brain_realis_0725031126_refine.glb";
/**
 * Desaturated stand-in for the GLB's embedded colour texture (extracted +
 * `sharp().grayscale()`'d once at asset-prep time — see
 * scratch-extract-gray-texture.cjs — rather than re-running that on a
 * canvas for every visitor).
 */
export const BRAIN_TEXTURE_GRAY_URL = "/assets/3D/brain-texture-gray.jpg";

export type BrainMotion = {
  /** Baseline auto-rotation in radians/second, always running underneath any drag/hover offset. */
  idleSpeed?: number;
  /** Max radians the model sways toward the cursor when not being dragged. */
  hoverTilt?: number;
  /**
   * Horizontal placement as a fraction of the *visible* width, so the brain
   * clears the headline on wide screens without hard-coding pixel offsets:
   * 0 is centred, 0.2 sits right of centre. Measured in world units, so it
   * scales correctly on every viewport instead of drifting off-screen on
   * narrow ones.
   */
  offsetX?: number;
  /** Multiplier on the auto-fit scale (which normalises the model to ~2 world units). */
  scale?: number;
};

type BrainModelProps = BrainMotion & {
  pointerRef: RefObject<PointerOrbitState>;
  reducedMotion?: boolean;
};

/**
 * The brain mesh itself. Loaded once and cached by R3F's loader cache, so
 * mounting it on several routes re-uses the same parsed geometry/texture.
 *
 * The GLB is plain glTF 2.0 (no DRACO/meshopt), one mesh of ~2.2k verts with
 * a 2048² photogrammetry base-colour map — cheap enough to animate every
 * frame without a worker, unlike the particle field it replaces.
 */
export function BrainModel({
  pointerRef,
  reducedMotion = false,
  idleSpeed = 0.12,
  hoverTilt = 0.22,
  offsetX = 0,
  scale = 1,
}: BrainModelProps) {
  const gltf = useLoader(GLTFLoader, BRAIN_MODEL_URL);
  const grayTexture = useLoader(TextureLoader, BRAIN_TEXTURE_GRAY_URL);
  const group = useRef<Group>(null);
  // Eased copies of the raw pointer position — only the hover-sway
  // contribution needs smoothing; drag rotation stays 1:1 with the cursor so
  // it feels grabbed rather than laggy.
  const easedNX = useRef(0);
  const easedNY = useRef(0);

  // Centre the model on the origin and normalise it to ~2 world units so the
  // camera framing does not depend on whatever scale it was exported at.
  const { object, fit } = useMemo(() => {
    const object = gltf.scene.clone(true);
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    object.position.set(-center.x, -center.y, -center.z);

    // glTF images are stored top-left-origin, so GLTFLoader always sets
    // flipY = false on textures it creates. A plain TextureLoader defaults
    // flipY = true, which would mirror this stand-in vertically against the
    // model's existing UVs if left unset.
    grayTexture.flipY = false;
    grayTexture.colorSpace = SRGBColorSpace;
    grayTexture.needsUpdate = true;

    object.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const material = mesh.material as MeshStandardMaterial;
      if (!material) return;
      // The export ships roughness 0.8 / metalness 0, which reads flat and
      // chalky. Easing roughness down gives the wet sheen a real specimen has
      // without turning it plastic.
      material.roughness = 0.58;
      material.metalness = 0.05;
      material.map = grayTexture;
      material.needsUpdate = true;
    });

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { object, fit: 2 / maxDim };
  }, [gltf, grayTexture]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;
    const p = pointerRef.current;

    // Flick inertia: once released, the residual drag velocity keeps
    // spinning the model and decays away, instead of stopping dead.
    if (!p.dragging && Math.abs(p.velocityYaw) > 0.00005) {
      const steps = delta * 60;
      p.dragYaw += p.velocityYaw * steps;
      p.velocityYaw *= Math.pow(0.94, steps);
    } else if (!p.dragging) {
      p.velocityYaw = 0;
    }

    const easeFactor = 1 - Math.pow(0.001, delta);
    easedNX.current += (p.nx - easedNX.current) * easeFactor;
    easedNY.current += (p.ny - easedNY.current) * easeFactor;

    const idleAngle = reducedMotion ? 0 : state.clock.elapsedTime * idleSpeed;
    // Hover sway is suppressed while actively dragging (both are driven by
    // the same cursor position, so leaving it on would double-count motion)
    // and under reduced-motion, which should kill ambient sway but not the
    // user's own drag input.
    const hoverWeight = reducedMotion || p.dragging ? 0 : 1;

    node.rotation.y = idleAngle + p.dragYaw + easedNX.current * hoverTilt * hoverWeight;
    node.rotation.x = p.dragPitch + easedNY.current * hoverTilt * 0.6 * hoverWeight;
    node.rotation.z = p.dragPitch * 0.15;

    // viewport is measured in world units at z=0, so both the placement and
    // the size stay proportional to whatever the canvas actually is.
    const visibleWidth = state.viewport.width;
    node.position.x = visibleWidth * offsetX;

    // Shrink on narrow canvases so the brain never outgrows its frame.
    const responsive = Math.min(1, visibleWidth / 3.2);
    node.scale.setScalar(fit * responsive * scale);
  });

  return (
    <group ref={group}>
      <primitive object={object} />
    </group>
  );
}

useLoader.preload(GLTFLoader, BRAIN_MODEL_URL);
useLoader.preload(TextureLoader, BRAIN_TEXTURE_GRAY_URL);
