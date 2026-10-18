"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Article view counter backed by Abacus (https://abacus.jasoncameron.dev), a free
 * hosted counter API — the site itself has no server. Each browser counts once per
 * article per session; development (localhost) only reads the count, so testing
 * doesn't inflate it. Shows nothing until a real number is available.
 *
 * Change NAMESPACE only if you want to start counting from zero.
 */
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "hearwell-pk-blog";

export function ViewCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const local = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const seenKey = `hw-viewed:${slug}`;
    let seen = false;
    try {
      seen = sessionStorage.getItem(seenKey) === "1";
    } catch {}

    const action = local || seen ? "get" : "hit";
    const controller = new AbortController();
    fetch(`${API}/${action}/${NAMESPACE}/${slug}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : r.status === 404 ? { value: 0 } : Promise.reject()))
      .then((data: { value?: number }) => {
        if (typeof data.value === "number") setCount(data.value);
        if (action === "hit") {
          try {
            sessionStorage.setItem(seenKey, "1");
          } catch {}
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);

  if (count === null) return null;
  return (
    <span className="inline-flex items-center gap-2">
      <Eye className="size-4 text-sky" aria-hidden />
      {count.toLocaleString("en-US")} {count === 1 ? "view" : "views"}
    </span>
  );
}
