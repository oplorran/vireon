"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "vireon.member.saved";

/** Saved Discover items, stored locally so the Save button and the profile list agree. */
export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      setSaved(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setSaved([]);
    }
    setReady(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);

  return { saved, toggle, ready };
}

/** "nutrition/salmon" → used as the saved-item id. */
export const savedId = (category: string, slug: string) => `${category}/${slug}`;
