import styles from "./CodeWindow.module.scss";

// Replaces a licensed client screenshot (Naude Bourn) that read as an
// editorial/fashion photo rather than as development work. This is
// self-contained — no image asset, no license question, and it reads
// unambiguously as "software" the way the research side's brain reads as
// "biomedical imaging."
export function CodeWindow() {
  return (
    <div className={styles.stage}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.window} aria-hidden="true">
        <div className={styles.bar}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.filename}>portfolio.tsx</span>
        </div>
        <pre className={styles.code}>
          <code>
            <span className={styles.kw}>const</span> stack = [<span className={styles.str}>&quot;Next.js&quot;</span>,{" "}
            <span className={styles.str}>&quot;Node&quot;</span>, <span className={styles.str}>&quot;TypeScript&quot;</span>];
            {"\n\n"}
            <span className={styles.kw}>export default function</span> <span className={styles.fn}>Portfolio</span>() {"{"}
            {"\n  "}
            <span className={styles.kw}>return</span> <span className={styles.tag}>&lt;Crafted shipped={"{"}</span>
            <span className={styles.num}>10</span>
            <span className={styles.tag}>{"}"} /&gt;</span>;{"\n"}
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
