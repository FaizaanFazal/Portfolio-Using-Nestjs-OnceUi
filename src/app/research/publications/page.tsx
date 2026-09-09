import { Column, Heading, Meta } from "@once-ui-system/core";
import { researchPublications, baseURL, conferencePresentations } from "@/resources";
import { getPublications } from "@/utils/utils";
import { PublicationsList } from "@/components/research/PublicationsList";

export async function generateMetadata() {
  return Meta.generate({
    title: researchPublications.title,
    description: researchPublications.description,
    baseURL: baseURL,
    path: researchPublications.path,
  });
}

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <Column maxWidth="l" gap="24" fillWidth paddingX="l">
      <Column gap="8">
        <Heading variant="display-strong-l">{researchPublications.heading}</Heading>
      </Column>
      <PublicationsList publications={publications} conferences={conferencePresentations} />
    </Column>
  );
}
