"use client";

import { useMemo, useState } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import { PublicationMetadata } from "@/utils/utils";
import { ConferencePresentation, PublicationTopic } from "@/types";
import { TopicDot } from "./TopicDot";
import { topicMeta, topicOrder } from "./topics";
import { CopyButton } from "./CopyButton";
import styles from "./PublicationsList.module.scss";

type Status = "published-international" | "published-domestic" | "under-review" | "conference";

type Entry = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  volume?: string;
  doi?: string;
  impactFactor?: number;
  status: Status;
  topic?: PublicationTopic;
  finding?: string;
  bibtex?: string;
};

const statusLabels: Record<Status, string> = {
  "published-international": "Published — international",
  "published-domestic": "Published — domestic",
  "under-review": "Under review",
  conference: "Conference presentations",
};

const statusOrder: Status[] = ["published-international", "published-domestic", "under-review", "conference"];

function citation(entry: Entry) {
  if (entry.status === "conference") {
    return `${entry.title} (${entry.year})${entry.venue ? `, ${entry.venue}` : ""}.`;
  }
  const volumePart = entry.volume ? ` ${entry.volume}` : "";
  const ifPart = entry.impactFactor ? ` · IF ${entry.impactFactor}` : "";
  return `${entry.authors} (${entry.year}). ${entry.title}. ${entry.venue}${volumePart}${ifPart}.`;
}

export function PublicationsList({
  publications,
  conferences,
}: {
  publications: Array<{ slug: string; metadata: PublicationMetadata }>;
  conferences: ConferencePresentation[];
}) {
  const entries: Entry[] = useMemo(() => {
    const pubEntries: Entry[] = publications.map((p) => ({
      slug: p.slug,
      title: p.metadata.title,
      authors: p.metadata.authors,
      venue: p.metadata.venue,
      year: p.metadata.year,
      volume: p.metadata.volume,
      doi: p.metadata.doi,
      impactFactor: p.metadata.impactFactor,
      status: p.metadata.status,
      topic: p.metadata.topic,
      finding: p.metadata.finding,
      bibtex: p.metadata.bibtex,
    }));
    const confEntries: Entry[] = conferences.map((c) => ({
      slug: c.name,
      title: c.name,
      authors: "",
      venue: c.note || "",
      year: c.year,
      status: "conference",
    }));
    return [...pubEntries, ...confEntries];
  }, [publications, conferences]);

  const years = useMemo(
    () => Array.from(new Set(entries.map((e) => e.year))).sort((a, b) => b - a),
    [entries],
  );

  const [activeTopics, setActiveTopics] = useState<Set<PublicationTopic>>(new Set());
  const [activeYears, setActiveYears] = useState<Set<number>>(new Set());
  const [activeStatuses, setActiveStatuses] = useState<Set<Status>>(new Set());

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = entries.filter((e) => {
    if (activeTopics.size > 0 && (!e.topic || !activeTopics.has(e.topic))) return false;
    if (activeYears.size > 0 && !activeYears.has(e.year)) return false;
    if (activeStatuses.size > 0 && !activeStatuses.has(e.status)) return false;
    return true;
  });

  const grouped = statusOrder
    .map((status) => ({ status, items: filtered.filter((e) => e.status === status) }))
    .filter((g) => g.items.length > 0);

  return (
    <Column fillWidth gap="32">
      <Column gap="16">
        <div className={styles.chips} role="group" aria-label="Filter by topic">
          {topicOrder.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`${styles.chip} ${activeTopics.has(topic) ? styles.chipActive : ""}`}
              aria-pressed={activeTopics.has(topic)}
              onClick={() => toggle(activeTopics, topic, setActiveTopics)}
            >
              <TopicDot topic={topic} size={7} />
              {topicMeta[topic].label}
            </button>
          ))}
        </div>
        <div className={styles.chips} role="group" aria-label="Filter by year">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`${styles.chip} ${activeYears.has(year) ? styles.chipActive : ""}`}
              aria-pressed={activeYears.has(year)}
              onClick={() => toggle(activeYears, year, setActiveYears)}
            >
              {year}
            </button>
          ))}
        </div>
        <div className={styles.chips} role="group" aria-label="Filter by venue type">
          {statusOrder.map((status) => (
            <button
              key={status}
              type="button"
              className={`${styles.chip} ${activeStatuses.has(status) ? styles.chipActive : ""}`}
              aria-pressed={activeStatuses.has(status)}
              onClick={() => toggle(activeStatuses, status, setActiveStatuses)}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
        <Text className={styles.count}>
          Showing {filtered.length} of {entries.length}
        </Text>
      </Column>

      <div className={styles.legend} aria-hidden="true">
        {topicOrder.map((topic) => (
          <span key={topic} className={styles.legendItem}>
            <TopicDot topic={topic} size={7} />
            {topicMeta[topic].label}
          </span>
        ))}
      </div>

      {grouped.map(({ status, items }) => (
        <Column key={status} gap="20">
          <Heading as="h2" variant="display-strong-xs">
            {statusLabels[status]}
          </Heading>
          <div className={styles.group}>
            {items.map((entry) => (
              <div key={entry.slug} id={entry.slug} className={styles.entry}>
                <div className={styles.entryHead}>
                  {entry.topic && <TopicDot topic={entry.topic} />}
                  <Text className={styles.citation}>{citation(entry)}</Text>
                </div>
                {entry.finding && <Text className={styles.finding}>{entry.finding}</Text>}
                <div className={styles.actions}>
                  {entry.doi && (
                    <>
                      <a
                        className={styles.doi}
                        href={`https://doi.org/${entry.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.doi}
                      </a>
                      <CopyButton text={entry.doi} label="Copy DOI" copiedLabel="Copied" />
                    </>
                  )}
                  {entry.bibtex && (
                    <CopyButton text={entry.bibtex} label="Copy BibTeX" copiedLabel="Copied" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Column>
      ))}
    </Column>
  );
}
