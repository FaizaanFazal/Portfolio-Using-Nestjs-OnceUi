"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EvidenceStrip.module.scss";

type EvidenceItem = { figure: string; label: string };

function parseFigure(figure: string) {
  const match = figure.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { value: null as number | null, prefix: "", suffix: figure };
  return { value: parseFloat(match[1]), decimals: (match[1].split(".")[1] || "").length, suffix: match[2] };
}

function Counter({ figure }: { figure: string }) {
  const { value, decimals, suffix } = parseFigure(figure);
  const [display, setDisplay] = useState(value === null ? figure : "0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (value === null) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(`${value.toFixed(decimals)}${suffix}`);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 700;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            setDisplay(`${(value * eased).toFixed(decimals)}${suffix}`);
            if (elapsed < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, suffix]);

  return <span ref={ref}>{display}</span>;
}

export function EvidenceStrip({ items }: { items: EvidenceItem[] }) {
  return (
    <div className={styles.strip}>
      {items.map((item) => (
        <div key={item.label}>
          <div className={styles.figure}>
            <Counter figure={item.figure} />
          </div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
