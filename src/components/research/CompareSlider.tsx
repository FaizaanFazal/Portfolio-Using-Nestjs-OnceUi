"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./CompareSlider.module.scss";

// Draggable before/after comparison (plan.md §5.4) — raw slice vs. predicted
// mask overlay. Keyboard-operable: focus the frame, use arrow keys.
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Input",
  afterLabel = "Prediction",
  caption,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [position, setPosition] = useState(50);
  const [frameWidth, setFrameWidth] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setFrameWidth(frame.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div className={styles.wrap}>
      <div
        ref={frameRef}
        className={styles.frame}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`Comparison: ${beforeLabel} vs ${afterLabel}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={beforeLabel} />
        <div className={styles.afterClip} style={{ width: `${position}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={afterSrc} alt={afterLabel} style={{ width: frameWidth || "100%" }} />
        </div>
        <div className={styles.handle} style={{ left: `${position}%` }}>
          <div className={styles.grip}>↔</div>
        </div>
        <span className={`${styles.tag} ${styles.tagBefore}`}>{beforeLabel}</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>{afterLabel}</span>
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
