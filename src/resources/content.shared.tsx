import { Blog, Newsletter, Person, Social } from "@/types";
import { IconName } from "@/resources/icons";
import { fillTemplate } from "@/utils/template";

import personData from "@/content/data/shared/person.json";
import socialData from "@/content/data/shared/social.json";
import newsletterData from "@/content/data/shared/newsletter.json";
import blogData from "@/content/data/shared/blog.json";

// Identity fields shared between the /research and /dev profiles (plan.md §7).
// Sourced from src/content/data/shared/*.json — edit those files, not this one.
const person: Person = personData as Person;

const tplValues = { name: person.name, email: person.email };

const newsletter: Newsletter = {
  display: newsletterData.display,
  title: fillTemplate(newsletterData.title, tplValues),
  description: fillTemplate(newsletterData.description, tplValues),
};

const social: Social = (socialData as Social).map((item) => ({
  ...item,
  link: fillTemplate(item.link, tplValues),
}));

// Blog is shared across both profiles, tag-filterable by profile (plan.md §3.1).
// Create new blog posts by adding a new .mdx file to app/blog/posts —
// all posts will be listed on the /blog route.
const blog: Blog = {
  ...blogData,
  icon: blogData.icon as IconName,
  description: fillTemplate(blogData.description, tplValues),
};

export { person, social, newsletter, blog };
