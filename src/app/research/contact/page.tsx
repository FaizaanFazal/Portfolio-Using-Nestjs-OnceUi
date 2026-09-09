import { Column, Flex, Heading, IconButton, Text, Meta } from "@once-ui-system/core";
import { researchContact, baseURL, person, sameAs } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: researchContact.title,
    description: researchContact.description,
    baseURL: baseURL,
    path: researchContact.path,
  });
}

export default function ResearchContactPage() {
  const links = [
    { name: "Email", icon: "email" as const, link: `mailto:${person.email}` },
    { name: "GitHub", icon: "github" as const, link: sameAs.github },
    { name: "LinkedIn", icon: "linkedin" as const, link: sameAs.linkedin },
    { name: "Google Scholar", icon: "scholar" as const, link: sameAs.scholar },
    { name: "ORCID", icon: "orcid" as const, link: sameAs.orcid },
  ].filter((item) => item.link);

  return (
    <Column maxWidth="s" gap="24" fillWidth paddingX="l" paddingY="xl">
      <Heading variant="display-strong-l">{researchContact.heading}</Heading>
      <Text variant="body-default-l" style={{ fontFamily: "var(--font-body)" }} onBackground="neutral-weak">
        {researchContact.body}
      </Text>
      <Flex gap="12" wrap>
        {links.map((item) => (
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
  );
}
