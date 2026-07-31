import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { assetUrl } from "@/lib/assets";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/content";

export function generateStaticParams() {
  return getPublishedBlogs().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogBySlug(slug);
    if (!post) return { title: "Blog post" };
    return {
      title: post.title,
      description: post.excerpt || post.title,
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const cover = assetUrl(post.cover);
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative mx-auto max-w-3xl px-6 py-16">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-glow"
        >
          ← All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-violet-glow/15 px-3 py-1 text-xs font-medium text-violet-300"
            >
              {tag}
            </span>
          ))}
          <span>{date}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-glow to-cyan-glow font-bold text-white">
            {post.author?.name?.charAt(0) ?? "Q"}
          </span>
          <span>{post.author?.name ?? "QuICK Research Group"}</span>
        </div>

        {cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <Markdown content={post.content ?? ""} />
        </div>
      </div>
    </article>
  );
}
