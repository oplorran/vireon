"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { CATEGORIES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";

export function DiscoverClient() {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();

  /** Flat matches across every library, shown above the category cards. */
  const matches = useMemo(() => {
    if (!term) return [];
    return CATEGORIES.flatMap((c) =>
      c.items
        .filter((i) => `${i.title[lang]} ${i.text[lang]}`.toLowerCase().includes(term))
        .map((i) => ({ category: c.slug, slug: i.slug, title: i.title[lang] })),
    );
  }, [term, lang]);

  return (
    <AppShell current="/start/discover">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("discover.title")}</h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("discover.search")}
          aria-label={t("discover.searchLabel")}
          className="app-input"
        />

        {term && (
          <section className="app-card space-y-2 p-4 text-sm">
            {matches.length === 0 ? (
              <p className="text-mist">{t("discover.noMatch")}</p>
            ) : (
              matches.map((m) => (
                <Link
                  key={`${m.category}/${m.slug}`}
                  href={memberHref(`/start/discover/${m.category}/${m.slug}`, email)}
                  className="block text-cyan"
                >
                  {m.title}
                </Link>
              ))
            )}
          </section>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={memberHref(`/start/discover/${c.slug}`, email)}>
              <section className="app-card h-full p-5 transition hover:border-cyan/40">
                <h2 className="font-display text-xl">{t(c.titleKey)}</h2>
                <p className="mt-2 text-sm leading-6 text-mist">{t(c.textKey)}</p>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
