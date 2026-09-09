import Script from "next/script";
import { safeScriptJson } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { baseURL, schema, sameAs, about } from "@/resources";

// Site-wide JSON-LD Person structured data — separate from the per-page
// Schema component, which has no "person" type and only attaches `sameAs`
// to its own top-level entity (see plan.md §7: sameAs with Google Scholar
// and ORCID is how a search engine understands he is a researcher).
export function PersonSchema() {
  const profileLinks = [
    sameAs.linkedin,
    sameAs.github,
    sameAs.scholar,
    sameAs.orcid,
    sameAs.threads,
    sameAs.discord,
    ...social.map((item) => item.link),
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: `${baseURL}${about.path}`,
    image: `${baseURL}${person.avatar}`,
    email: schema.email,
    jobTitle: person.role,
    sameAs: Array.from(new Set(profileLinks)),
  };

  return (
    <Script
      id="schema-person"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeScriptJson(data) }}
    />
  );
}
