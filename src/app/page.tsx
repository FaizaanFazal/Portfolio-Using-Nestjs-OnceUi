import { Meta } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { Gate } from "@/components/gate/Gate";

export async function generateMetadata() {
  return Meta.generate({
    title: `${person.name} — Research & Development`,
    description:
      "Faizaan Fazal Khan — AI research in biomedical imaging, and full-stack software development. Pick a side.",
    baseURL: baseURL,
    path: "/",
    image: "/images/research/hero-poster.webp",
  });
}

export default function GatePage() {
  return <Gate location="Gwangju, South Korea" />;
}
