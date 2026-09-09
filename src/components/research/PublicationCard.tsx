import Link from "next/link";
import { PublicationMetadata } from "@/utils/utils";
import { TopicDot } from "./TopicDot";
import styles from "./PublicationCard.module.scss";

export function PublicationCard({ slug, metadata }: { slug: string; metadata: PublicationMetadata }) {
  const venueLine = metadata.impactFactor
    ? `${metadata.venue} · IF ${metadata.impactFactor}`
    : metadata.venue;

  return (
    <Link href={`/research/work/${slug}`} className={styles.card}>
      <div className={styles.head}>
        <TopicDot topic={metadata.topic} />
        <span className={styles.venue}>{venueLine}</span>
      </div>
      <div className={styles.title}>{metadata.title}</div>
      <p className={styles.finding}>{metadata.finding}</p>
      {metadata.metric && <div className={styles.metric}>{metadata.metric}</div>}
    </Link>
  );
}
