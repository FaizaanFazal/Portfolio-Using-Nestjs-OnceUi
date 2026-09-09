import { Avatar, Column, Flex, Heading, Tag, Text, Meta } from "@once-ui-system/core";
import { researchAbout, baseURL, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: researchAbout.title,
    description: researchAbout.description,
    baseURL: baseURL,
    path: researchAbout.path,
  });
}

export default function ResearchAboutPage() {
  return (
    <Flex maxWidth="l" fillWidth s={{ direction: "column" }} gap="40" paddingX="l">
      {/* Narrow persistent left rail — plan.md §2.4 */}
      <Column minWidth="12" gap="24" position="sticky" style={{ top: "6rem", alignSelf: "flex-start" }}>
        <Avatar src={person.avatar} size="xl" />
        <Column gap="4">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Based in
          </Text>
          <Text variant="body-default-m">Gwangju, South Korea</Text>
        </Column>
        <Column gap="4">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Languages
          </Text>
          <Flex gap="8" wrap>
            {researchAbout.languages.map((lang) => (
              <Tag key={lang.name} size="l">
                {lang.name}
              </Tag>
            ))}
          </Flex>
        </Column>
      </Column>

      {/* Wide right column */}
      <Column flex={1} gap="40" maxWidth={42}>
        <Column gap="12">
          <Heading variant="display-strong-l">{person.name}</Heading>
          <Text variant="body-default-l" style={{ fontFamily: "var(--font-body)" }}>
            {researchAbout.bio}
          </Text>
        </Column>

        <Column gap="16">
          <Heading as="h2" variant="display-strong-xs">
            Education
          </Heading>
          <Column gap="20">
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
          <Column gap="4">
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
        </Column>

        <Column
          gap="8"
          padding="24"
          radius="l"
          border="brand-alpha-medium"
          background="brand-alpha-weak"
        >
          <Text variant="label-default-s" onBackground="brand-weak">
            Award
          </Text>
          <Text variant="heading-strong-l">{researchAbout.award.title}</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {researchAbout.award.institution}, {researchAbout.award.year}
          </Text>
        </Column>

        <Column gap="16">
          <Heading as="h2" variant="display-strong-xs">
            {researchAbout.skills.title}
          </Heading>
          <Flex gap="8" wrap>
            {researchAbout.skills.items.map((skill) => (
              <Tag key={skill} size="l">
                {skill}
              </Tag>
            ))}
          </Flex>
        </Column>
      </Column>
    </Flex>
  );
}
