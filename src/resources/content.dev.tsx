import { About, Gallery, Home, Work } from "@/types";
import { IconName } from "@/resources/icons";
import { Logo } from "@once-ui-system/core";
import { fillTemplate } from "@/utils/template";
import { person } from "./content.shared";

import homeData from "@/content/data/dev/home.json";
import aboutData from "@/content/data/dev/about.json";
import workData from "@/content/data/dev/work.json";
import galleryData from "@/content/data/dev/gallery.json";

// Developer-profile content — lives under /dev (plan.md §7).
// Copy/labels/links are sourced from src/content/data/dev/*.json — edit
// those files, not this one. This file only wires computed fields (titles
// that interpolate the shared person record) and the one spot — the
// wordmark logo in the subline — that JSON can't express on its own.
const tplValues = { name: person.name, role: person.role };

const [sublineBefore, sublineAfter] = homeData.sublineTemplate.split("{{company}}");

const home: Home = {
  path: homeData.path,
  image: homeData.image,
  label: homeData.label,
  title: fillTemplate(homeData.titleTemplate, tplValues),
  description: fillTemplate(homeData.descriptionTemplate, tplValues),
  headline: homeData.headline,
  featured: homeData.featured,
  subline: (
    <>
      {sublineBefore}
      <Logo
        dark
        icon="/trademarks/wordmark-dark.svg"
        style={{ top: "0.25em", marginLeft: "-0.25em" }}
      />
      <Logo
        light
        icon="/trademarks/wordmark-light.svg"
        style={{ top: "0.25em", marginLeft: "-0.25em" }}
      />
      {sublineAfter}
    </>
  ),
  howIWork: homeData.howIWork,
};

const about: About = {
  ...aboutData,
  icon: aboutData.icon as IconName,
};

const work: Work = {
  path: workData.path,
  label: workData.label,
  icon: workData.icon as IconName,
  title: fillTemplate(workData.titleTemplate, tplValues),
  description: fillTemplate(workData.descriptionTemplate, tplValues),
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /dev and /dev/work routes
};

const gallery: Gallery = {
  path: galleryData.path,
  label: galleryData.label,
  icon: galleryData.icon as IconName,
  title: fillTemplate(galleryData.titleTemplate, tplValues),
  description: fillTemplate(galleryData.descriptionTemplate, tplValues),
  // Images by https://lorant.one — placeholders, replace with your own
  images: galleryData.images,
};

export { home, about, work, gallery };
