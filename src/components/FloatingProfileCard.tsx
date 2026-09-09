"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeroMotif } from "@/components/dev/HeroMotif";
import navData from "@/content/data/nav.json";
import styles from "./FloatingProfileCard.module.scss";

type Profile = "research" | "dev";

// Mini version of the gate's two-panel choice, floating on the home-page
// banner instead of living in the persistent header nav (which was
// overlapping the nav pill at medium widths, and only ever matters on the
// two profile home pages anyway).
export function FloatingProfileCard({ current }: { current: Profile }) {
  const router = useRouter();

  const go = (profile: Profile) => {
    if (profile === current) return;
    try {
      localStorage.setItem("profile", profile);
    } catch {
      // ignore — navigation still proceeds
    }
    router.push(profile === "research" ? "/research" : "/dev");
  };

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={`${styles.mini} ${current === "research" ? styles.active : ""}`}
        onClick={() => go("research")}
        aria-label="Switch to Research"
        aria-current={current === "research"}
      >
        <div className={styles.thumb}>
          <Image src="/images/research/hero-poster.webp" alt="" fill sizes="80px" />
        </div>
        <span className={styles.label}>{navData.profileLabels.research}</span>
      </button>
      <button
        type="button"
        className={`${styles.mini} ${current === "dev" ? styles.active : ""}`}
        onClick={() => go("dev")}
        aria-label="Switch to Development"
        aria-current={current === "dev"}
      >
        <div className={styles.thumb}>
          <HeroMotif />
        </div>
        <span className={styles.label}>{navData.profileLabels.dev}</span>
      </button>
    </div>
  );
}
