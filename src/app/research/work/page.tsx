import { Column, Heading, Text, Meta } from "@once-ui-system/core";
import { researchWork, researchPublications, baseURL } from "@/resources";
import { getPublications } from "@/utils/utils";
import { PublicationCard } from "@/components/research/PublicationCard";
import Link from "next/link";

export async function generateMetadata() {
  return Meta.generate({
    title: researchWork.title,
    description: researchWork.description,
    baseURL: baseURL,
    path: researchWork.path,
  });
}

export default function ResearchWorkIndexPage() {
  const publications = getPublications();
  const [introBefore, introAfter] = researchWork.introTemplate.split("{{publicationsLink}}");

  return (
    <Column maxWidth="l" gap="24" fillWidth paddingX="l" paddingY="xl">
      <Heading variant="display-strong-l">{researchWork.heading}</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak" style={{ fontFamily: "var(--font-body)" }}>
        {introBefore}
        <Link href={researchPublications.path}>{researchWork.publicationsLinkText}</Link>
        {introAfter}
      </Text>
      {publications.map((paper) => (
        <PublicationCard key={paper.slug} slug={paper.slug} metadata={paper.metadata} />
      ))}
    </Column>
  );
}
