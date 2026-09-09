"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./CompactProfileSwitch.module.scss";

type Profile = "research" | "dev";

// Equivalent-page mapping (plan.md §3.3) — pages with no counterpart on the
// other side fall back to that profile's home.
const EQUIVALENTS: Record<string, string> = {
  "/dev/about": "/research/about",
  "/dev/work": "/research/work",
  "/research/about": "/dev/about",
  "/research/work": "/dev/work",
};

function targetPath(pathname: string, next: Profile): string {
  if (EQUIVALENTS[pathname]) return EQUIVALENTS[pathname];
  for (const [from, to] of Object.entries(EQUIVALENTS)) {
    if (pathname.startsWith(`${from}/`)) return to;
  }
  return next === "research" ? "/research" : "/dev";
}

// Compact "R / D" profile switch for the header — shown on every inner page
// except the two profile home pages, which have the full FloatingProfileCard
// on their hero instead (plan.md §3.3, revised: two switchers would be
// redundant on the home pages themselves).
export function CompactProfileSwitch() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const current: Profile = pathname.startsWith("/research") ? "research" : "dev";

  const go = (profile: Profile) => {
    if (profile === current) return;
    try {
      localStorage.setItem("profile", profile);
    } catch {
      // ignore — navigation still proceeds
    }
    router.push(targetPath(pathname, profile));
  };

  return (
    <div className={styles.switch} role="tablist" aria-label="Profile">
      <button
        type="button"
        role="tab"
        aria-selected={current === "research"}
        aria-label="Switch to Research"
        title="Research"
        className={`${styles.btn} ${current === "research" ? styles.active : ""}`}
        onClick={() => go("research")}
      >
        R
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={current === "dev"}
        aria-label="Switch to Development"
        title="Development"
        className={`${styles.btn} ${current === "dev" ? styles.active : ""}`}
        onClick={() => go("dev")}
      >
        D
      </button>
    </div>
  );
}
