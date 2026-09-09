import { Column, Flex, Heading, Text, IconButton, Meta, Schema } from "@once-ui-system/core";
import { researchHome, researchPublications, baseURL, person, sameAs, social } from "@/resources";
import { getPublications } from "@/utils/utils";
import { ResearchHero } from "@/components/research/ResearchHero";
import { EvidenceStrip } from "@/components/research/EvidenceStrip";
import { PublicationCard } from "@/components/research/PublicationCard";
import Link from "next/link";

export async function generateMetadata() {
  return Meta.generate({
    title: researchHome.title,
    description: researchHome.description,
    baseURL: baseURL,
    path: researchHome.path,
    image: `/api/og/generate?title=${encodeURIComponent(researchHome.title)}`,
  });
}

export default function ResearchHomePage() {
  const publications = getPublications();
  const selected = researchHome.selectedWork
    .map((slug) => publications.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const latest = publications.slice(0, 4);

  const contactLinks = [
    { name: "Email", icon: "email" as const, link: `mailto:${person.email}` },
    { name: "GitHub", icon: "github" as const, link: sameAs.github },
    { name: "LinkedIn", icon: "linkedin" as const, link: sameAs.linkedin },
    { name: "Google Scholar", icon: "scholar" as const, link: sameAs.scholar },
    { name: "ORCID", icon: "orcid" as const, link: sameAs.orcid },
  ].filter((item) => item.link);

  return (
    <Column maxWidth="l" gap="xl" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={researchHome.path}
        title={researchHome.title}
        description={researchHome.description}
        image={`/api/og/generate?title=${encodeURIComponent(researchHome.title)}`}
        author={{ name: person.name, url: `${baseURL}/research/about`, image: `${baseURL}${person.avatar}` }}
      />

      <ResearchHero statement={researchHome.positioningStatement} />

      <EvidenceStrip items={researchHome.evidence} />

      <Column gap="20" paddingX="l">
        <Heading as="h2" variant="display-strong-xs">
          Selected work
        </Heading>
        <Flex fillWidth gap="20" s={{ direction: "column" }}>
          {selected.map((paper) => (
            <div key={paper.slug} style={{ flex: 1 }}>
              <PublicationCard slug={paper.slug} metadata={paper.metadata} />
            </div>
          ))}
        </Flex>
      </Column>

      <Column gap="16" paddingX="l" maxWidth={40}>
        <Heading as="h2" variant="display-strong-xs">
          Research statement
        </Heading>
        <Text variant="body-default-l" wrap="balance" style={{ fontFamily: "var(--font-body)" }}>
          {researchHome.researchStatement}
        </Text>
      </Column>

      <Column gap="16" paddingX="l">
        <Flex fillWidth horizontal="between" vertical="end">
          <Heading as="h2" variant="display-strong-xs">
            Publications
          </Heading>
          <Link href={researchPublications.path}>
            <Text variant="body-default-s">View all →</Text>
          </Link>
        </Flex>
        <Flex fillWidth gap="16" wrap>
          {latest.map((paper) => (
            <div key={paper.slug} style={{ minWidth: "18rem", flex: "1 1 18rem" }}>
              <PublicationCard slug={paper.slug} metadata={paper.metadata} />
            </div>
          ))}
        </Flex>
      </Column>

      <Column gap="16" paddingX="l" paddingBottom="xl">
        <Heading as="h2" variant="display-strong-xs">
          Contact
        </Heading>
        <Flex gap="12" wrap>
          {contactLinks.map((item) => (
            <IconButton
              key={item.name}
              href={item.link}
              icon={item.icon}
              tooltip={item.name}
              size="l"
              variant="secondary"
            />
          ))}
        </Flex>
      </Column>
    </Column>
  );
}
