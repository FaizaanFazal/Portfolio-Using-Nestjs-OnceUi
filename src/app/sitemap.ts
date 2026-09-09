import { getPosts, getPublications } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Dev case-study projects live under /dev/work/[slug], not /work/[slug].
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/dev/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Research case studies — one page per publication under /research/work/[slug].
  const caseStudies = getPublications().map((pub) => ({
    url: `${baseURL}/research/work/${pub.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...works, ...caseStudies];
}
