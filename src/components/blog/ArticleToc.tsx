"use client";

import { ChevronDown, ListOrdered } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TocItem {
  id: string;
  heading: string;
  level: 2 | 3;
}

/** Tracks which section is in view and how far through the article the reader is. */
function useArticleProgress(ids: string[], articleId: string) {
  const [active, setActive] = useState(ids[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Active section: the last heading that has passed a line just below the header.
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);

      const article = document.getElementById(articleId);
      if (article) {
        const rect = article.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.6;
        setProgress(Math.min(1, Math.max(0, (line - rect.top) / Math.max(total, 1))));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, articleId]);

  return { active, progress };
}

interface Chapter {
  item: TocItem;
  children: TocItem[];
}

/** Groups level-3 headings under the level-2 heading before them. */
function toChapters(items: TocItem[]): Chapter[] {
  const chapters: Chapter[] = [];
  for (const item of items) {
    if (item.level === 2 || chapters.length === 0) chapters.push({ item, children: [] });
    else chapters[chapters.length - 1].children.push(item);
  }
  return chapters;
}

/**
 * Chapter list: each main heading is a numbered row; the chapter being read opens to
 * show its sub-points on a timeline that fills in as you read.
 */
function TocList({ items, active, onNavigate }: { items: TocItem[]; active: string; onNavigate?: () => void }) {
  const chapters = toChapters(items);
  const order = items.map((i) => i.id);
  const activeIndex = order.indexOf(active);

  return (
    <ol className="grid gap-2">
      {chapters.map((chapter, ci) => {
        const ids = [chapter.item.id, ...chapter.children.map((c) => c.id)];
        const start = order.indexOf(chapter.item.id);
        const end = start + ids.length - 1;
        const current = activeIndex >= start && activeIndex <= end;
        const done = activeIndex > end;
        const childActive = chapter.children.findIndex((c) => c.id === active);

        return (
          <li
            key={chapter.item.id}
            data-current={current || undefined}
            className={cn(
              "rounded-2xl transition-all duration-500",
              current ? "bg-white shadow-[0_14px_34px_-22px_rgb(15_44_87/0.55)] ring-1 ring-clinic/20" : "ring-1 ring-transparent",
            )}
          >
            <a
              href={`#${chapter.item.id}`}
              onClick={onNavigate}
              aria-current={active === chapter.item.id ? "location" : undefined}
              className={cn(
                "group flex items-start gap-3.5 rounded-2xl p-3 transition-colors duration-300",
                !current && "hover:bg-white/70",
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl font-display text-sm font-bold tabular-nums transition-all duration-500",
                  current
                    ? "bg-brand-gradient text-white shadow-[0_8px_18px_-8px_rgb(10_99_168/0.9)]"
                    : done
                      ? "bg-clinic/10 text-clinic"
                      : "bg-white text-navy/40 ring-1 ring-line",
                )}
              >
                {String(ci + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 pt-0.5">
                <span
                  className={cn(
                    "block text-sm leading-snug font-semibold transition-colors duration-300",
                    current ? "text-navy" : done ? "text-navy/70" : "text-navy/70 group-hover:text-navy",
                  )}
                >
                  {chapter.item.heading}
                </span>
                {chapter.children.length > 0 && !current && (
                  <span className="mt-1 block text-xs text-navy/70">{chapter.children.length} {chapter.children.length === 1 ? "point" : "points"}</span>
                )}
              </span>
            </a>

            {/* Sub-points of the chapter being read */}
            {current && chapter.children.length > 0 && (
              <ol className="relative ml-[1.85rem] grid gap-0.5 pr-3 pb-3 pl-4">
                <span aria-hidden className="absolute top-1 bottom-4 left-0 w-px bg-line" />
                <span
                  aria-hidden
                  className="absolute top-1 left-0 w-px origin-top bg-brand-gradient transition-all duration-500"
                  style={{
                    height: childActive < 0 ? 0 : `calc((100% - 1.25rem) * ${(childActive + 1) / chapter.children.length})`,
                  }}
                />
                {chapter.children.map((child, i) => {
                  const isActive = child.id === active;
                  const read = childActive > i;
                  return (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        onClick={onNavigate}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "group relative flex rounded-lg py-1.5 pr-2 pl-3 text-[0.8125rem] leading-snug transition-colors duration-300",
                          isActive ? "bg-mist font-semibold text-clinic" : read ? "text-navy/65" : "text-navy/50 hover:text-navy",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-[0.7rem] -left-[1.2rem] size-2 rounded-full ring-2 ring-white transition-all duration-300",
                            isActive ? "scale-125 bg-clinic" : read ? "bg-sky" : "bg-line",
                          )}
                        />
                        {child.heading}
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Circular reading-progress ring with the percentage in the middle. */
function ProgressRing({ progress }: { progress: number }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid size-14 shrink-0 place-items-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3" className="stroke-white/15" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-sky transition-[stroke-dashoffset] duration-200"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span className="text-xs font-bold text-white tabular-nums">{Math.round(progress * 100)}%</span>
    </span>
  );
}

/**
 * Article table of contents. Desktop: sticky side panel with a reading-progress ring
 * and the current section highlighted. Mobile: a collapsible panel above the article.
 */
export function ArticleToc({ items, articleId }: { items: TocItem[]; articleId: string }) {
  const { active, progress } = useArticleProgress(
    items.map((i) => i.id),
    articleId,
  );
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the chapter being read visible inside the (scrollable) desktop panel.
  useEffect(() => {
    const box = listRef.current;
    const el = box?.querySelector<HTMLElement>("[data-current]");
    if (!box || !el) return;
    const top = el.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top + el.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTo({ top: Math.max(0, top - 12), behavior: "smooth" });
    }
  }, [active]);

  return (
    <>
      {/* Mobile */}
      <div className="rounded-2xl bg-white ring-1 ring-line lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="flex items-center gap-3 font-semibold text-navy">
            <ListOrdered className="size-5 text-clinic" aria-hidden />
            Table of Contents
          </span>
          <ChevronDown className={cn("size-5 text-navy/50 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        {open && (
          <div className="border-t border-line px-5 py-4">
            <TocList items={items} active={active} onNavigate={() => setOpen(false)} />
          </div>
        )}
      </div>

      {/* Desktop */}
      <nav
        aria-label="Table of contents"
        className="sticky top-[calc(var(--header-h)+1.5rem)] hidden max-h-[calc(100dvh-var(--header-h)-3rem)] flex-col overflow-hidden rounded-[1.75rem] bg-mist/70 shadow-[0_30px_70px_-45px_rgb(15_44_87/0.6)] ring-1 ring-line lg:flex"
      >
        <div className="relative isolate shrink-0 overflow-hidden bg-navy-gradient px-6 py-6 text-white">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_100%_at_100%_0%,rgb(43_143_216/0.45),transparent_70%)]"
          />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.18em] text-sky uppercase">
                <ListOrdered className="size-3.5" aria-hidden />
                In this article
              </p>
              <p className="mt-1.5 font-display text-xl leading-tight font-bold">Table of Contents</p>
              <p className="mt-1 text-xs text-white/55">
                {toChapters(items).length} sections · {items.length} topics
              </p>
            </div>
            <ProgressRing progress={progress} />
          </div>
        </div>
        <div ref={listRef} className="relative overflow-y-auto overscroll-contain p-3">
          <TocList items={items} active={active} />
        </div>
      </nav>
    </>
  );
}
