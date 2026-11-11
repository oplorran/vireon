"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { CATEGORIES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";

/** Thumbnails used by the reference library, with a letter fallback. */
const IMAGES: Record<string, string> = {
  salmon: "/media/salmon.jpg",
  beans: "/media/bowl.jpg",
  tomatoes: "/media/bowl.jpg",
  avocado: "/media/salmon.jpg",
  spinach: "/media/produce.jpg",
  oranges: "/media/produce.jpg",
  walnuts: "/media/produce.jpg",
  blueberries: "/media/produce.jpg",
  oats: "/media/oatmeal.jpg",
  "berry-oat-bowl": "/media/oatmeal.jpg",
  "veggie-scramble": "/media/produce.jpg",
  "chickpea-bowl": "/media/bowl.jpg",
  "chicken-grain-bowl": "/media/bowl.jpg",
  "salmon-plate": "/media/salmon.jpg",
  "lentil-soup": "/media/bowl.jpg",
  "yogurt-cup": "/media/oatmeal.jpg",
  "apple-walnut-snack": "/media/produce.jpg",
  "brisk-walk": "/media/plank.jpg",
  "sit-to-stand": "/media/plank.jpg",
  "wall-pushup": "/media/plank.jpg",
  "pelvic-floor-awareness": "/media/glow.jpg",
  diaphragmaticBreathing: "/media/glow.jpg",
  "diaphragmatic-breathing": "/media/glow.jpg",
  "mind-wellbeing": "/media/glow.jpg",
  "mental-wellbeing": "/media/glow.jpg",
  "stress-management": "/media/glow.jpg",
  "relaxation-techniques": "/media/glow.jpg",
  "breathing-exercises": "/media/glow.jpg",
  "sleep-fundamentals": "/media/glow.jpg",
  "nighttime-routines": "/media/glow.jpg",
  "sleep-environment": "/media/glow.jpg",
  "recovery-habits": "/media/glow.jpg",
  "consistent-schedules": "/media/glow.jpg",
};

export function CategoryClient({ category }: { category: string }) {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const [tag, setTag] = useState("all");
  const [query, setQuery] = useState("");

  const data = CATEGORIES.find((c) => c.slug === category);
  if (!data) return null;

  const term = query.trim().toLowerCase();

  const items = useMemo(
    () =>
      data.items.filter((i) => {
        const inTag = tag === "all" || i.tag === tag;
        if (!inTag) return false;
        if (!term) return true;
        return `${i.title[lang]} ${i.text[lang]}`.toLowerCase().includes(term);
      }),
    [data.items, tag, term, lang],
  );

  return (
    <AppShell current="/start/discover">
      <DemoNotice />
      <div className="space-y-4">
        <Link href={memberHref("/start/discover", email)} className="text-sm text-cyan">
          {t("discover.back")}
        </Link>
        <h1 className="font-display text-3xl">{t(data.titleKey)}</h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("discover.searchShort")}
          aria-label={t("discover.searchIn", { title: t(data.titleKey) })}
          className="app-input"
        />

        <div className="flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1">
          {data.tags.map((tagKey) => {
            const active = tag === tagKey;
            return (
              <button
                key={tagKey}
                type="button"
                onClick={() => setTag(tagKey)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-3 py-2 text-sm ${
                  active ? "bg-accent text-white" : "border border-white/10 text-mist"
                }`}
              >
                {tagKey === "all" ? t("discover.all") : t(`tag.${tagKey}`)}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <section className="app-card p-6 text-center">
            <h2 className="font-display text-xl">{t("discover.nothingPublished")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">
              {t("discover.nothingPublishedText")}
            </p>
          </section>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const image = IMAGES[item.slug];
              return (
                <Link
                  key={item.slug}
                  href={memberHref(`/start/discover/${data.slug}/${item.slug}`, email)}
                  data-discover="true"
                >
                  <section className="app-card h-full overflow-hidden transition hover:border-cyan/40">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={item.title[lang]} src={image} className="h-36 w-full object-cover" />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="grid h-36 place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(73,210,255,0.35),transparent_40%),linear-gradient(160deg,#12305f,#07101f)] font-display text-2xl text-cyan"
                      >
                        {item.title[lang].charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wide text-faint">{t(`tag.${item.tag}`)}</p>
                      <h2 className="mt-1 font-semibold">{item.title[lang]}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-mist">{item.text[lang]}</p>
                    </div>
                  </section>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
