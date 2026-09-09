"use client";

import { RefObject, useEffect, useRef } from "react";

export type PointerOrbitMode = "drag" | "hover" | "idle";

export type PointerOrbitState = {
  /** Normalized cursor position within the host, -1..1. Eased by the reader (BrainModel), not here. */
  nx: number;
  ny: number;
  /** Accumulated radians from dragging — persists as the new baseline once released. */
  dragYaw: number;
  dragPitch: number;
  /** Residual spin speed (rad/frame-at-60fps) left over when a drag ends, decayed by the reader. */
  velocityYaw: number;
  dragging: boolean;
};

const PITCH_LIMIT = 0.5;

/**
 * Pointer-driven replacement for the old scroll-scrub (plan.md's dolsten-
 * style pinned track). Everything is written into a plain ref, not React
 * state, so the R3F frame loop can read it every frame without triggering
 * re-renders — same reasoning as the scroll-progress refs it replaces.
 *
 * "drag": click-and-drag spins the model (with a bit of flick inertia); the
 *   cursor also nudges it toward the pointer when not dragging (hover sway).
 * "hover": sway only, no drag capture — used inside the gate panels, which
 *   are themselves click-to-navigate buttons that a drag gesture would fight.
 * "idle": no pointer tracking at all (reduced-motion / no-WebGL callers
 *   never mount this, but kept for completeness).
 */
export function usePointerOrbit(
  hostRef: RefObject<HTMLElement | null>,
  mode: PointerOrbitMode = "drag",
): RefObject<PointerOrbitState> {
  const state = useRef<PointerOrbitState>({
    nx: 0,
    ny: 0,
    dragYaw: 0,
    dragPitch: 0,
    velocityYaw: 0,
    dragging: false,
  });

  useEffect(() => {
    const el = hostRef.current;
    if (!el || mode === "idle") return;

    const setHover = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      state.current.nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      state.current.ny = ((clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleMove = (e: PointerEvent) => setHover(e.clientX, e.clientY);
    const handleLeave = () => {
      state.current.nx = 0;
      state.current.ny = 0;
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    let lastX = 0;
    let lastY = 0;

    const handleDown = (e: PointerEvent) => {
      // Touch drag is left alone so it still scrolls the page normally —
      // only a mouse (or trackpad-as-mouse) grabs the model.
      if (mode !== "drag" || e.pointerType !== "mouse") return;
      // The canvas isn't a text node, but a fast mousedown+drag across the
      // page still triggers the browser's native text-selection drag
      // underneath it (dragging can select nearby text purely by document
      // flow, not visual overlap) unless explicitly suppressed here.
      e.preventDefault();
      document.body.style.userSelect = "none";
      state.current.dragging = true;
      state.current.velocityYaw = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = "grabbing";
    };

    const handleDragMove = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const sensitivity = 0.008;
      const stepYaw = dx * sensitivity;
      state.current.dragYaw += stepYaw;
      state.current.dragPitch = Math.max(
        -PITCH_LIMIT,
        Math.min(PITCH_LIMIT, state.current.dragPitch - dy * sensitivity),
      );
      // Smoothed velocity, spent as flick inertia once the pointer lifts.
      state.current.velocityYaw = state.current.velocityYaw * 0.7 + stepYaw * 0.3;
    };

    const endDrag = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      state.current.dragging = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "grab";
      document.body.style.userSelect = "";
    };

    if (mode === "drag") {
      el.style.cursor = "grab";
      el.addEventListener("pointerdown", handleDown);
      el.addEventListener("pointermove", handleDragMove);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
    }

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      if (mode === "drag") {
        el.removeEventListener("pointerdown", handleDown);
        el.removeEventListener("pointermove", handleDragMove);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
        // Unmounting mid-drag (e.g. a fast route change) would otherwise
        // leave the whole page unselectable. Reading .current here (rather
        // than a variable captured earlier) is intentional — this needs the
        // value at cleanup time, not at effect-setup time.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (state.current.dragging) document.body.style.userSelect = "";
      }
    };
  }, [hostRef, mode]);

  return state;
}
