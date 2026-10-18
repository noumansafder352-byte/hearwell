import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ChevronRight, Clock, UserRound } from "lucide-react";
import { ArticleBody, readingMinutes } from "@/components/blog/ArticleBody";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { ViewCount } from "@/components/blog/ViewCount";
import { PostCard } from "@/components/blog/PostCard";
import { SoundRings } from "@/components/ui/SoundWave";
import { articles } from "@/data/articles";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/date";
import { pageMetadata } from "@/lib/seo";

/** Only articles with content get a page; other card links stay unbuilt until added. */
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.filter((post) => articles[post.slug]).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.excerpt.replace(/\s*…$/, "."),
      path: `/blog/${post.slug}`,
    }),
    // TODO(owner): remove together with the blog index noindex once the articles are published.
    robots: { index: false, follow: true },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const article = articles[slug];
  if (!post || !article) notFound();

  const toc = article.sections.map(({ id, heading, level }) => ({ id, heading, level }));
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const articleId = "article-content";

  return (
    <>
      {/* ---------- Article header ---------- */}
      <section className="header-offset relative isolate overflow-hidden bg-navy-gradient pb-14 text-white sm:pb-16 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_85%_10%,rgb(43_143_216/0.3),transparent_70%)]"
        />
        <SoundRings className="-top-40 -right-40 -z-10 size-[34rem] text-white/10" />

        <div className="container-site pt-14 sm:pt-16 lg:pt-20">
          <nav aria-label="Breadcrumb" className="rise">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden />
                <Link href="/blog/" className="transition-colors hover:text-white">
                  Our Blog
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden />
                <span aria-current="page" className="text-white/90">
                  {post.category}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-4xl">
            <span className="rise inline-flex rounded-md bg-brand-gradient px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] uppercase shadow-[0_8px_20px_-8px_rgb(43_143_216/0.8)]">
              {post.category}
            </span>
            <h1 className="rise mt-5 text-[2rem] leading-[1.12] font-bold sm:text-[2.6rem] lg:text-[3.1rem]">
              {post.title}
            </h1>
            <p className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              {post.date && (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-sky" aria-hidden />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              )}
              {post.author && (
                <span className="inline-flex items-center gap-2">
                  <UserRound className="size-4 text-sky" aria-hidden />
                  {post.author}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-sky" aria-hidden />
                {readingMinutes(article)} min read
              </span>
              <ViewCount slug={post.slug} />
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Table of contents + article ---------- */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-16">
          <aside className="lg:self-stretch">
            <ArticleToc items={toc} articleId={articleId} />
          </aside>

          <article className="max-w-[52rem]">
            <ArticleBody article={article} id={articleId} />

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
              <Link
                href="/blog/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-clinic"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
                Back to all articles
              </Link>
              <span className="rounded-md bg-mist px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-clinic uppercase ring-1 ring-line">
                {post.category}
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- Related articles ---------- */}
      {related.length > 0 && (
        <section className="bg-mist py-16 sm:py-20">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Keep Reading</p>
                <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Related Articles</h2>
              </div>
              <Link href="/blog/" className="text-sm font-semibold text-clinic hover:underline">
                View all articles
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

    </>
  );
}
