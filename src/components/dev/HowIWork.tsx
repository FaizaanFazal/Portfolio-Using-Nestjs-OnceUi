import { Column, Flex, Heading, Text } from "@once-ui-system/core";
import { home } from "@/resources";

export function HowIWork() {
  if (!home.howIWork.display) return null;

  return (
    <Column fillWidth gap="16" paddingX="l">
      <Heading as="h2" variant="display-strong-xs" wrap="balance">
        {home.howIWork.title}
      </Heading>
      <Flex fillWidth gap="24" s={{ direction: "column" }}>
        {home.howIWork.items.map((item) => (
          <Column key={item.title} flex={1} gap="8">
            <Text variant="heading-strong-s">{item.title}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {item.description}
            </Text>
          </Column>
        ))}
      </Flex>
    </Column>
  );
}
