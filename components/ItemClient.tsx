"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { findItem } from "@/lib/content";
import { FOOD_RECIPES, FOOD_USES } from "@/lib/food-meta";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";
import { savedId, useSaved } from "@/lib/useSaved";
import { useProgress } from "@/lib/useProgress";

export function ItemClient({ category, slug }: { category: string; slug: string }) {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const { saved, toggle } = useSaved();
  const { logRead } = useProgress();

  const item = findItem(category, slug);

  useEffect(() => {
    if (item) logRead(item.title[lang], category, slug);
    // Only once per opened item, not on every language switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, slug]);

  if (!item) return null;

  const id = savedId(category, slug);
  const isSaved = saved.includes(id);
  const isFood = category === "nutrition";

  return (
    <AppShell current="/start/discover">
      <DemoNotice />

      <article className="space-y-4">
        <Link href={memberHref(`/start/discover/${category}`, email)} className="text-sm text-cyan">
          {t("discover.back")}
        </Link>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-faint">{t(`tag.${item.tag}`)}</p>
            <h1 className="font-display text-2xl sm:text-3xl">{item.title[lang]}</h1>
          </div>
          <button
            type="button"
            onClick={() => toggle(id)}
            aria-pressed={isSaved}
            className="app-btn-ghost shrink-0"
          >
            {isSaved ? t("discover.saved") : t("discover.save")}
          </button>
        </div>

        <p className="text-sm leading-6 text-mist">{item.text[lang]}</p>

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.pending")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>

        {item.body && (
          <section className="app-card p-5 text-sm leading-6 text-mist">
            {item.body[lang].map((p, i) => (
              <p key={i} className={i === 0 ? undefined : "mt-3"}>
                {p}
              </p>
            ))}
          </section>
        )}

        {item.nutrition && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("discover.about")}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {item.nutrition.map((row) => (
                <div key={row.label.en}>
                  <dt className="capitalize text-faint">{row.label[lang]}</dt>
                  <dd>{row.value[lang]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-faint">{t("discover.approx")}</p>
          </section>
        )}

        {isFood && FOOD_USES[item.slug] && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("discover.uses")}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist">
              {FOOD_USES[item.slug].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {isFood && (FOOD_RECIPES[item.slug] ?? []).length > 0 && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("discover.relatedRecipes")}</h2>
            <ul className="mt-3 space-y-2">
              {(FOOD_RECIPES[item.slug] ?? []).map((slug) => {
                const recipe = findItem("recipes", slug);
                if (!recipe) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={memberHref(`/start/discover/recipes/${slug}`, email)}
                      className="text-cyan"
                    >
                      {recipe.title[lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </AppShell>
  );
}
