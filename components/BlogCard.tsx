import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { assetUrl } from "@/lib/assets";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const cover = assetUrl(post.cover);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-glow/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid-bg absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-quantum-950/70 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-violet-glow/15 px-2.5 py-0.5 text-xs font-medium text-violet-300"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs text-slate-500">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-cyan-glow">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-400">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-slate-500">
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-glow to-cyan-glow" />
          <span>{post.author?.name ?? "QuICK Research Group"}</span>
        </div>
      </div>
    </Link>
  );
}
