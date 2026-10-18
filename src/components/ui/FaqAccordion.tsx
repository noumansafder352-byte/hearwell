"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accessible accordion: one panel open at a time, keyboard-operable buttons.
 * Answers stay in the static HTML (collapsed panels are `inert`) so they are
 * indexable and readable without JavaScript-driven rendering.
 */
export function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-mist/60 sm:px-7 sm:py-6"
              >
                <span className="mt-0.5 font-display text-sm font-bold text-clinic tabular-nums" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-semibold text-navy sm:text-lg">{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-clinic bg-clinic text-white"
                      : "border-line text-clinic group-hover:border-sky",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pl-14 leading-relaxed text-navy/70 sm:px-7 sm:pl-[4.25rem]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
