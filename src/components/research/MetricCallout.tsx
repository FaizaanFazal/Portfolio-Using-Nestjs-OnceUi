import styles from "./MetricCallout.module.scss";

// A metric with its uncertainty and a one-line interpretation (plan.md
// §5.4) — the honest caveat sits right next to the number, not buried.
export function MetricCallout({
  value,
  ci,
  label,
  interpretation,
  caveat,
}: {
  value: string;
  ci?: string;
  label: string;
  interpretation: string;
  caveat?: string;
}) {
  return (
    <div className={styles.callout}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {value}
        {ci && <span className={styles.ci}>{ci}</span>}
      </div>
      <p className={styles.interpretation}>{interpretation}</p>
      {caveat && <p className={styles.caveat}>{caveat}</p>}
    </div>
  );
}
