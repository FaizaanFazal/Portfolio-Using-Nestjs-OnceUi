"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CodeWindow } from "@/components/dev/CodeWindow";
import { BrainBackdrop } from "@/components/three/BrainBackdrop";
import styles from "./Gate.module.scss";

type Profile = "research" | "dev";

export function Gate({ location }: { location: string }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<Profile | null>(null);
  const [remembered, setRemembered] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile");
      if (saved === "research" || saved === "dev") setRemembered(saved);
    } catch {
      // localStorage unavailable — gate still works, just without the
      // "continue as" affordance.
    }
  }, []);

  const choose = (profile: Profile) => {
    try {
      localStorage.setItem("profile", profile);
    } catch {
      // ignore — navigation still proceeds
    }
    router.push(profile === "research" ? "/research" : "/dev");
  };

  const basisClass = (profile: Profile) => {
    if (hovered === profile) return styles.expanded;
    if (hovered && hovered !== profile) return styles.dimmed;
    return "";
  };

  return (
    <div className={styles.screen}>
      <div className={styles.panels}>
        <button
          type="button"
          className={`${styles.panel} ${basisClass("research")} ${remembered === "research" ? styles.remembered : ""}`}
          onMouseEnter={() => setHovered("research")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => choose("research")}
          aria-label="Enter Research profile"
        >
          {/* Was a static poster image (a baked-in dot pattern that only
              nudged a few px on hover). Removed in favour of BrainBackdrop's
              WebGL particle field, which actually disperses on hover. */}
          <div className={styles.motif}>
            <BrainBackdrop mode="hover" hoverTilt={0.2} idleSpeed={0.08} distance={4.6} particles />
          </div>
          <div className={styles.scrim} />
          <div className={styles.content}>
            <div className={styles.label}>Research</div>
            <p className={styles.description}>
              AI for biomedical imaging — MRI, PET, Alzheimer&apos;s prediction
            </p>
            <div className={styles.stats}>
              <span className={styles.stat}>7 papers</span>
              <span className={styles.statDivider} aria-hidden="true" />
              <span className={styles.stat}>5 conference talks</span>
            </div>
          </div>
        </button>

        <button
          type="button"
          className={`${styles.panel} ${basisClass("dev")} ${remembered === "dev" ? styles.remembered : ""}`}
          onMouseEnter={() => setHovered("dev")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => choose("dev")}
          aria-label="Enter Development profile"
        >
          {/* Was a licensed client screenshot that read as an editorial/
              fashion photo rather than development work, backed by a flat
              CSS grid. CodeWindow is a self-contained stylized editor mockup
              instead — reads unambiguously as "software," the way the brain
              reads as "biomedical imaging" on the other side — and the same
              BrainBackdrop used there now supplies the ambient particle
              field here too (brain=false: particles only, no GLB), so both
              panels share one modular component instead of the research
              side getting real dispersing dots and this one a static grid. */}
          <div className={styles.motif}>
            <BrainBackdrop mode="hover" brain={false} particles />
            <CodeWindow />
          </div>
          <div className={styles.scrim} />
          <div className={styles.content}>
            <div className={styles.label}>Development</div>
            <p className={styles.description}>
              Full-stack web development with React, Next.js, and Node
            </p>
            <div className={styles.stats}>
              <span className={styles.stat}>10+ sites shipped</span>
            </div>
          </div>
        </button>
      </div>

      {/* Personal mark, fixed dead-centre of the whole screen regardless of
          how the two panels' flex-basis animates on hover — it's a sibling
          of .panels positioned in the parent's coordinate space, not a
          child of either button, so panel expansion/dimming can't move or
          resize it. pointer-events: none lets clicks fall through to
          whichever panel is underneath. */}
      <div className={styles.centerMark}>
        <div className={styles.centerAvatarRing}>
          <Image
            src="/images/dp/Faizaan.webp"
            alt=""
            width={212}
            height={212}
            priority
            className={styles.centerAvatar}
          />
        </div>
        <div className={styles.centerName}>Faizaan Fazal Khan</div>
      </div>

      <div className={styles.footer}>
        <span>{location}</span>
        {remembered && (
          <Link href={remembered === "research" ? "/research" : "/dev"} className={styles.continueAs}>
            Continue as {remembered === "research" ? "Research" : "Development"} →
          </Link>
        )}
      </div>
    </div>
  );
}
