"use client";

import styles from "./ResearchHero.module.scss";
import { person } from "@/resources";
import { BrainBackdrop } from "@/components/three/BrainBackdrop";
import { SocialLinks } from "@/components/SocialLinks";
import { FloatingProfileCard } from "@/components/FloatingProfileCard";

// The backdrop used to be a static poster image (a baked-in dot pattern that
// only nudged a few px on hover via CSS parallax). Replaced with a flat
// fallback colour — the real payoff is BrainBackdrop's WebGL particle field,
// which actually disperses away from the cursor instead of just sitting
// there; the brain model progressively enhances on top of both once
// WebGL/motion checks pass, fading in when the GLB has parsed (plan.md
// §4.6 — the canvas fades in behind the headline, never blocks it).
export function ResearchHero({ statement }: { statement: React.ReactNode }) {
  return (
    <div className={styles.hero}>
      <div className={styles.poster} />
      <BrainBackdrop mode="drag" hoverTilt={0.28} idleSpeed={0.1} offsetX={0.16} distance={4.2} particles />
      <div className={styles.scrim} />
      <FloatingProfileCard current="research" />
      <div className={styles.content}>
        <div className={styles.name}>{person.name}</div>
        <h1 className={styles.statement}>{statement}</h1>
        <SocialLinks className={styles.social} />
      </div>
    </div>
  );
}
