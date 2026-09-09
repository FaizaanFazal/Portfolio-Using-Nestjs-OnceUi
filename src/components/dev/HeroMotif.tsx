import styles from "./HeroMotif.module.scss";

// Quiet animated wireframe/grid behind the dev hero — CSS only, no WebGL.
// Deliberately calmer than the research hero's particle brain (plan.md §6.5).
export function HeroMotif() {
  return (
    <div className={styles.motif} aria-hidden="true">
      <div className={styles.grid} />
    </div>
  );
}
