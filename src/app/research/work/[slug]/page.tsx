import { notFound } from "next/navigation";
import { Column, Flex, Heading, Meta, Text, Button } from "@once-ui-system/core";
import { Metadata } from "next";
import { getPublications } from "@/utils/utils";
import { CustomMDX } from "@/components";
import { CompareSlider } from "@/components/research/CompareSlider";
import { MetricCallout } from "@/components/research/MetricCallout";
import { TopicDot } from "@/components/research/TopicDot";
import { CopyButton } from "@/components/research/CopyButton";
import { baseURL, researchWork } from "@/resources";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPublications().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPublications().find((p) => p.slug === slug);
  if (!paper) return {};

  return Meta.generate({
    title: paper.metadata.title,
    description: paper.metadata.finding,
    baseURL,
    path: `${researchWork.path}/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = getPublications().find((p) => p.slug === slug);
  if (!paper) notFound();

  const { metadata, content } = paper;
  const volumePart = metadata.volume ? ` ${metadata.volume}` : "";
  const ifPart = metadata.impactFactor ? ` · IF ${metadata.impactFactor}` : "";
  const citation = `${metadata.authors} (${metadata.year}). ${metadata.title}. ${metadata.venue}${volumePart}${ifPart}.`;

  return (
    <Column maxWidth="m" gap="24" fillWidth paddingX="l">
      <Button data-border="rounded" href={researchWork.path} variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
        Case studies
      </Button>

      <Flex gap="8" vertical="center">
        <TopicDot topic={metadata.topic} size={10} />
        <Text variant="label-default-s" onBackground="neutral-weak">
          {metadata.venue}
          {ifPart}
        </Text>
      </Flex>

      <Heading variant="display-strong-l">{metadata.title}</Heading>

      <Column as="article" maxWidth="xs" gap="4">
        <CustomMDX source={content} components={{ CompareSlider, MetricCallout }} />
      </Column>

      <Column
        gap="12"
        padding="24"
        radius="l"
        border="neutral-alpha-medium"
        background="neutral-alpha-weak"
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          {citation}
        </Text>
        <Flex gap="12" wrap vertical="center">
          {metadata.doi && (
            <>
              <a
                href={`https://doi.org/${metadata.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-code)", fontSize: "var(--text-caption)", color: "var(--label-caudate)" }}
              >
                {metadata.doi}
              </a>
              <CopyButton text={metadata.doi} label="Copy DOI" copiedLabel="Copied" />
            </>
          )}
          {metadata.bibtex && <CopyButton text={metadata.bibtex} label="Copy BibTeX" copiedLabel="Copied" />}
        </Flex>
      </Column>
    </Column>
  );
}
