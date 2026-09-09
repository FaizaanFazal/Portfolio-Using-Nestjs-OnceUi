import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  result?: string;
};

import { notFound } from 'next/navigation';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    result: data.result || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

export type PublicationMetadata = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  volume?: string;
  doi?: string;
  impactFactor?: number;
  status: "published-international" | "published-domestic" | "under-review";
  topic: "segmentation" | "survival" | "genetics" | "explainability" | "classification" | "benchmarking";
  finding: string;
  bibtex: string;
  metric?: string;
};

function readPublicationFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: PublicationMetadata = {
    title: data.title || "",
    authors: data.authors || "",
    venue: data.venue || "",
    year: data.year || 0,
    volume: data.volume || "",
    doi: data.doi || "",
    impactFactor: data.impactFactor || undefined,
    status: data.status,
    topic: data.topic,
    finding: data.finding || "",
    bibtex: data.bibtex || "",
    metric: data.metric || "",
  };

  return { metadata, content };
}

export function getPublications() {
  const dir = path.join(process.cwd(), "src", "content", "publications");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  return files
    .map((file) => {
      const { metadata, content } = readPublicationFile(path.join(dir, file));
      const slug = path.basename(file, path.extname(file));
      return { metadata, slug, content };
    })
    .sort((a, b) => b.metadata.year - a.metadata.year);
}
