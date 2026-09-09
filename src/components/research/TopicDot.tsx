import { PublicationTopic } from "@/types";
import { topicMeta } from "./topics";

// Small colored dot only — labels/putamen-magenta and ventricle-violet are
// dots-and-charts-only per plan.md §2.1 (borderline AA as body text).
export function TopicDot({ topic, size = 8 }: { topic: PublicationTopic; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: topicMeta[topic].color,
        flexShrink: 0,
      }}
    />
  );
}
