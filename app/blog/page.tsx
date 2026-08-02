import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BlogList from "@/components/BlogList";
import { getPublishedBlogs } from "@/lib/content";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, resources and research updates from the QuICK Research Group.",
};

export default function BlogPage() {
  const posts: BlogPost[] = getPublishedBlogs();

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-glow">
            News & insights
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            The <span className="text-shimmer">Blog</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Workshop resources, curated quantum learning materials and the
            latest research updates from the group.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal className="mt-14">
            <p className="glass rounded-2xl p-10 text-center text-slate-400">
              No posts yet — check back soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14">
            <BlogList posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}
