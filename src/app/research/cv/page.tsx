import { Button, Column, Flex, Heading, Text, Meta } from "@once-ui-system/core";
import { researchCV, researchAbout, baseURL, person, sameAs } from "@/resources";
import { getPublications } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: researchCV.title,
    description: researchCV.description,
    baseURL: baseURL,
    path: researchCV.path,
  });
}

export default function CVPage() {
  const publications = getPublications();

  return (
    <Column maxWidth="m" gap="32" fillWidth paddingX="l">
      <Flex fillWidth horizontal="between" vertical="center" wrap gap="16">
        <Column gap="4">
          <Heading variant="display-strong-l">{person.name}</Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {researchAbout.position.title}, {researchAbout.position.institution}
          </Text>
        </Column>
        <Button href={researchCV.pdfHref} variant="secondary" prefixIcon="document" size="m">
          Download PDF
        </Button>
      </Flex>

      <Column gap="8">
        <Text variant="body-default-s" onBackground="neutral-weak">
          {person.email} · {sameAs.linkedin && "LinkedIn"} · {sameAs.github && "GitHub"}
          {sameAs.scholar && " · Google Scholar"}
          {sameAs.orcid && " · ORCID"}
        </Text>
      </Column>

      <Column gap="16">
        <Heading as="h2" variant="display-strong-xs">
          Education
        </Heading>
        <Column gap="16">
          {researchAbout.education.map((edu) => (
            <Column key={edu.institution} gap="4">
              <Flex fillWidth horizontal="between" wrap>
                <Text variant="heading-strong-l">{edu.institution}</Text>
                <Text variant="heading-default-xs" onBackground="neutral-weak">
                  {edu.timeframe}
                </Text>
              </Flex>
              <Text variant="body-default-m">
                {edu.degree} · {edu.location}
              </Text>
              {edu.detail && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {edu.detail}
                </Text>
              )}
            </Column>
          ))}
        </Column>
      </Column>

      <Column gap="16">
        <Heading as="h2" variant="display-strong-xs">
          Position
        </Heading>
        <Flex fillWidth horizontal="between" wrap>
          <Text variant="heading-strong-l">{researchAbout.position.title}</Text>
          <Text variant="heading-default-xs" onBackground="neutral-weak">
            {researchAbout.position.timeframe}
          </Text>
        </Flex>
        <Text variant="body-default-m">
          {researchAbout.position.institution} · {researchAbout.position.department}
        </Text>
      </Column>

      <Column gap="16">
        <Heading as="h2" variant="display-strong-xs">
          Award
        </Heading>
        <Text variant="body-default-m">
          {researchAbout.award.title} — {researchAbout.award.institution}, {researchAbout.award.year}
        </Text>
      </Column>

      <Column gap="16">
        <Heading as="h2" variant="display-strong-xs">
          Publications
        </Heading>
        <Column as="ol" gap="8">
          {publications.map((pub) => (
            <Text as="li" key={pub.slug} variant="body-default-s">
              {pub.metadata.authors} ({pub.metadata.year}). {pub.metadata.title}. {pub.metadata.venue}
              {pub.metadata.volume ? ` ${pub.metadata.volume}` : ""}.
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="16">
        <Heading as="h2" variant="display-strong-xs">
          {researchAbout.skills.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {researchAbout.skills.items.join(" · ")}
        </Text>
      </Column>

      <Column gap="16" paddingBottom="xl">
        <Heading as="h2" variant="display-strong-xs">
          Languages
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {researchAbout.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
        </Text>
      </Column>
    </Column>
  );
}
