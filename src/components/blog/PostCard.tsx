import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { images } from "@/data/images";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";

/**
 * Editorial article card: full-bleed photo with the topic tag sitting on its edge,
 * date/author line, title, excerpt and a "Read Article" link. An accent bar draws
 * along the bottom on hover. The whole card is the link.
 */
export function PostCard({ post }: { post: BlogPost }) {
  const photo = images[post.image];
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-34px_rgb(15_44_87/0.55)] ring-1 ring-line transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_64px_-38px_rgb(15_44_87/0.7)]"
    >
      {/* Photo */}
      <div className="relative aspect-[16/9] overflow-hidden bg-mist">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          style={{ objectPosition: post.imagePosition ?? "center" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-navy/10 transition-colors duration-500 group-hover:bg-navy/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/35 via-navy/5 to-transparent"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        {/* Topic tag on the photo edge */}
        <span className="relative -mt-3.5 inline-flex self-start rounded-md bg-brand-gradient px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_8px_20px_-8px_rgb(10_99_168/0.8)]">
          {post.category}
        </span>

        {(post.date || post.author) && (
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-navy/70">
            {post.date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-sky" aria-hidden />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            )}
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-3.5 text-sky" aria-hidden />
                {post.author}
              </span>
            )}
          </p>
        )}

        <h3
          className={cn(
            "text-base leading-snug font-bold text-navy transition-colors duration-300 group-hover:text-clinic sm:text-[1.075rem]",
            post.date || post.author ? "mt-2.5" : "mt-4",
          )}
        >
          {post.title}
        </h3>
        <p className="mt-2.5 mb-5 line-clamp-3 text-[0.8125rem] leading-relaxed text-navy/65">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-clinic">
          <span className="relative">
            Read Article
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-clinic transition-all duration-500 group-hover:w-full"
            />
          </span>
          <ArrowRight
            className="size-4 transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>

      {/* Accent bar */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100"
      />
    </Link>
  );
}
