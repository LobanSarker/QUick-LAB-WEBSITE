import fs from "node:fs";
import path from "node:path";
import type {
  BlogPost,
  Person,
  Publication,
  ResearchArea,
} from "@/lib/types";

const dataDir = path.join(process.cwd(), "lib", "data");

interface BlogRecord {
  title: string;
  slug: string;
  excerpt: string;
  cover: string | null;
  tags: string[];
  content: string;
  status: string;
  createdAt: string;
  authorName?: string;
}

interface PersonRecord {
  name: string;
  institution: string;
  role: string | null;
  profileUrl: string | null;
  email: string | null;
  sortOrder: number;
}

interface PublicationRecord {
  title: string;
  venue: string;
  year: number;
  authors: string[];
  abstract: string;
  doi: string | null;
  link: string | null;
  image: string | null;
}

interface ResearchAreaRecord {
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

function readFolder<T>(dir: string): T[] {
  const full = path.join(dataDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf-8")) as T);
}

export function getResearchAreas(): ResearchArea[] {
  const areas = JSON.parse(
    fs.readFileSync(path.join(dataDir, "research-areas.json"), "utf-8"),
  ) as ResearchAreaRecord[];
  return areas
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((area, i) => ({ ...area, id: i + 1 }));
}

export function getPeople(): Person[] {
  return readFolder<PersonRecord>("people")
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((person, i) => ({ ...person, id: i + 1 }));
}

export function getPublications(): Publication[] {
  return readFolder<PublicationRecord>("publications")
    .slice()
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .map((pub, i) => ({
      ...pub,
      id: i + 1,
      createdAt: new Date(`${pub.year}-06-01T00:00:00.000Z`).toISOString(),
      updatedAt: new Date(`${pub.year}-06-01T00:00:00.000Z`).toISOString(),
    }));
}

export function getPublishedBlogs(): BlogPost[] {
  return readFolder<BlogRecord>("blogs")
    .filter((b) => b.status === "PUBLISHED")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((blog, i) => toBlogPost(blog, i + 1));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = readFolder<BlogRecord>("blogs");
  const index = blogs.findIndex(
    (b) => b.slug === slug && b.status === "PUBLISHED",
  );
  if (index === -1) return undefined;
  return toBlogPost(blogs[index], index + 1);
}

function toBlogPost(blog: BlogRecord, id: number): BlogPost {
  return {
    id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    cover: blog.cover,
    tags: blog.tags ?? [],
    content: blog.content,
    status: blog.status === "DRAFT" ? "DRAFT" : "PUBLISHED",
    createdAt: new Date(blog.createdAt).toISOString(),
    updatedAt: new Date(blog.createdAt).toISOString(),
    author: blog.authorName
      ? { id: "author", name: blog.authorName, email: "" }
      : null,
  };
}
