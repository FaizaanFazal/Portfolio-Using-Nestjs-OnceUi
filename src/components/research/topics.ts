import { PublicationTopic } from "@/types";

// Topic color code (plan.md §5.3) — introduced once with a legend on the
// publications page, then used everywhere without one.
export const topicMeta: Record<PublicationTopic, { label: string; color: string }> = {
  segmentation: { label: "Segmentation", color: "var(--label-hippocampus)" },
  survival: { label: "Survival / progression", color: "var(--label-putamen)" },
  genetics: { label: "Genetics & biomarkers", color: "var(--label-amygdala)" },
  explainability: { label: "Explainability / trust", color: "var(--label-thalamus)" },
  classification: { label: "Classification & staging", color: "var(--label-caudate)" },
  benchmarking: { label: "Clinical benchmarking", color: "var(--label-ventricle)" },
};

export const topicOrder: PublicationTopic[] = [
  "segmentation",
  "survival",
  "genetics",
  "explainability",
  "classification",
  "benchmarking",
];
