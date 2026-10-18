import {
  ArrowRight,
  Check,
  Globe,
  Lightbulb,
  MapPin,
  Phone,
  Plus,
  Quote,
  X,
} from "lucide-react";
import { Fragment } from "react";
import type { Article, ArticleBlock } from "@/data/articles";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

/** Articles keep their own wording, so blocks render as-is with the site's type styles. */
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[1.0625rem] leading-[1.8] text-navy/75">
          {block.text}
        </p>
      );

    case "callout":
      return (
        <aside className="relative flex gap-4 overflow-hidden rounded-2xl bg-mist p-5 ring-1 ring-line sm:p-6">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1 bg-brand-gradient"
          />
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
            <Lightbulb className="size-5" aria-hidden />
          </span>
          <p className="self-center text-[1.0625rem] leading-relaxed font-semibold text-navy">
            {block.text}
          </p>
        </aside>
      );

    case "quote":
      return (
        <blockquote className="relative rounded-2xl bg-white py-5 pr-6 pl-14 shadow-[0_18px_40px_-30px_rgb(15_44_87/0.55)] ring-1 ring-line sm:pl-16">
          <Quote
            aria-hidden
            className="absolute top-5 left-5 size-6 rotate-180 fill-sky/20 text-sky sm:left-6"
          />
          <p className="font-display text-lg leading-snug font-semibold text-navy italic sm:text-xl">
            “{block.text}”
          </p>
        </blockquote>
      );

    case "list":
      return block.style === "alpha" ? (
        <ol className="grid gap-2.5">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3.5 text-[1.0625rem] leading-relaxed text-navy/75"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-mist text-xs font-bold text-clinic ring-1 ring-line">
                {String.fromCharCode(97 + i)}
              </span>
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul
          className={cn(
            "grid gap-x-6 gap-y-2.5",
            block.items.length > 4 && "sm:grid-cols-2",
          )}
        >
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[1.0625rem] leading-relaxed text-navy/75"
            >
              <span className="mt-[0.3rem] grid size-5 shrink-0 place-items-center rounded-full bg-clinic/10 text-clinic">
                <Check className="size-3" aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "flow":
      return (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 rounded-2xl bg-mist p-5 ring-1 ring-line sm:p-6">
          {block.steps.map((step, i) => (
            <Fragment key={step}>
              <li className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold text-navy shadow-soft ring-1 ring-line">
                <span className="grid size-7 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white tabular-nums">
                  {i + 1}
                </span>
                {step}
              </li>
              {i < block.steps.length - 1 && (
                <li aria-hidden className="text-sky">
                  <ArrowRight className="size-4" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      );

    case "profile":
      return (
        <dl className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-34px_rgb(15_44_87/0.55)] ring-1 ring-line">
          {block.rows.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "grid gap-2 px-5 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:px-6",
                i > 0 && "border-t border-line",
                i % 2 === 1 && "bg-mist/50",
              )}
            >
              <dt className="flex items-start gap-2 text-xs font-bold tracking-[0.12em] text-clinic uppercase sm:pt-1">
                <span
                  aria-hidden
                  className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-gradient"
                />
                {row.label}
              </dt>
              <dd className="text-[1rem] leading-relaxed text-navy/80">
                {row.text ?? row.items?.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_18px_44px_-34px_rgb(15_44_87/0.55)] ring-1 ring-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy-gradient text-white">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-3.5 text-xs font-bold tracking-[0.1em] uppercase first:pl-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row[0]}
                  className="border-t border-line even:bg-mist/50"
                >
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th
                        key={i}
                        scope="row"
                        className="px-5 py-3.5 font-semibold text-navy first:pl-6"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-5 py-3.5 text-navy/75">
                        {cell === "✔" || cell === "✖" ? (
                          <span
                            className={cn(
                              "grid size-7 place-items-center rounded-full",
                              cell === "✔"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-rose-500/10 text-rose-500",
                            )}
                          >
                            {cell === "✔" ? (
                              <Check className="size-4" aria-label="Yes" />
                            ) : (
                              <X className="size-4" aria-label="No" />
                            )}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return (
        <div className="grid gap-3">
          {block.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-2xl bg-white ring-1 ring-line transition-shadow open:shadow-[0_18px_44px_-34px_rgb(15_44_87/0.55)] open:ring-clinic/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-clinic transition-all duration-300 group-open:rotate-45 group-open:bg-brand-gradient group-open:text-white">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-5 pb-5 text-[1rem] leading-relaxed text-navy/75 sm:px-6">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      );

    case "contact":
      return (
        <div className="relative isolate overflow-hidden rounded-2xl bg-navy-gradient p-6 text-white sm:p-7">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_100%_0%,rgb(43_143_216/0.35),transparent_70%)]"
          />
          <p className="font-display text-lg font-bold">{siteConfig.name}</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
              {siteConfig.address.full}
            </li>
            <li>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex gap-3 transition-colors hover:text-white"
              >
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-sky"
                  aria-hidden
                />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            {block.website && (
              <li className="flex gap-3">
                <Globe
                  className="mt-0.5 size-4 shrink-0 text-sky"
                  aria-hidden
                />
                {block.website}
              </li>
            )}
          </ul>
        </div>
      );
  }
}

/** Article content: intro, then each section with its anchor heading. */
export function ArticleBody({ article, id }: { article: Article; id: string }) {
  return (
    <div id={id} className="min-w-0">
      <div className="grid gap-5">
        {article.intro.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {article.sections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={section.id}
          className={section.level === 2 ? "mt-14" : "mt-10"}
        >
          {section.level === 2 ? (
            <h2
              id={section.id}
              className="scroll-mt-[calc(var(--header-h)+2rem)] border-b border-line pb-4 text-[1.6rem] leading-tight font-bold text-navy sm:text-[1.9rem]"
            >
              {section.heading}
            </h2>
          ) : (
            <h3
              id={section.id}
              className="scroll-mt-[calc(var(--header-h)+2rem)] text-xl leading-snug font-bold text-navy sm:text-[1.35rem]"
            >
              {section.heading}
            </h3>
          )}
          {section.blocks.length > 0 && (
            <div className="mt-5 grid gap-5">
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

/** Rough reading time from the article's word count (200 words per minute). */
export function readingMinutes(article: Article) {
  const text = [
    ...article.intro,
    ...article.sections.flatMap((s) => [
      { type: "p", text: s.heading } as ArticleBlock,
      ...s.blocks,
    ]),
  ]
    .map((b) =>
      b.type === "p" || b.type === "callout" || b.type === "quote"
        ? b.text
        : b.type === "flow"
          ? b.steps.join(" ")
          : b.type === "list"
            ? b.items.join(" ")
            : b.type === "profile"
              ? b.rows
                  .map((r) =>
                    [r.label, r.text ?? "", ...(r.items ?? [])].join(" "),
                  )
                  .join(" ")
              : b.type === "table"
                ? [...b.headers, ...b.rows.flat()].join(" ")
                : b.type === "faq"
                  ? b.items.map((i) => `${i.q} ${i.a}`).join(" ")
                  : "",
    )
    .join(" ");
  return Math.max(
    1,
    Math.round(text.split(/\s+/).filter(Boolean).length / 200),
  );
}
