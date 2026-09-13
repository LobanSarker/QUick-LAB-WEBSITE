export type Role = "ADMIN" | "EDITOR";
export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ResearchArea {
  id: number;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface Person {
  id: number;
  name: string;
  institution: string;
  role: string | null;
  profileUrl: string | null;
  email: string | null;
  sortOrder: number;
}

export interface Publication {
  id: number;
  title: string;
  venue: string;
  year: number;
  authors: string[];
  abstract: string;
  doi: string | null;
  link: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  cover: string | null;
  tags: string[];
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
  author: BlogAuthor | null;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface UploadResult {
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}
