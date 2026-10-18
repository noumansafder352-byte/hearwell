"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { blogCategories, blogPosts, type BlogCategory } from "@/data/blog";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

/** Blog index: topic filter, then a grid of article cards. */
export function BlogIndex() {
  const [filter, setFilter] = useState<BlogCategory | "All">("All");
  const posts =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === filter);
  const tabs: (BlogCategory | "All")[] = ["All", ...blogCategories];

  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        {/* Filter */}
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Latest Articles
          </h2>
          <div
            role="tablist"
            aria-label="Filter articles by topic"
            className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:max-w-none sm:px-0"
          >
            {tabs.map((tab) => {
              const active = tab === filter;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                    active
                      ? "text-white"
                      : "bg-white text-navy/70 ring-1 ring-line hover:text-clinic",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="blog-filter"
                      className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_10px_24px_-12px_rgb(10_99_168/0.9)]"
                      transition={{ duration: 0.4, ease }}
                    />
                  )}
                  <span className="relative">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            data-reveal
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            className="mt-10"
          >
            {posts.length > 0 ? (
              <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {posts.map((post, i) => (
                  <motion.li
                    data-reveal
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease }}
                  >
                    <PostCard post={post} />
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="mx-auto max-w-6xl rounded-3xl bg-white p-10 text-center text-navy/70 ring-1 ring-line">
                No articles in this topic yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
