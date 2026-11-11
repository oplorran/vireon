"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { RECIPE_CATEGORIES, RECIPES, categoryLabel } from "@/lib/recipes";
import { useI18n } from "@/lib/i18n";

export function RecipesClient() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    return RECIPES.filter((recipe) => {
      const inCategory = filter === "all" || recipe.category === filter;
      if (!inCategory) return false;
      if (!term) return true;
      return `${recipe.title} ${recipe.description}`.toLowerCase().includes(term);
    });
  }, [filter, query]);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.recipes.tag")}</p>
          <h1 className="mt-1 font-display text-3xl">{t("trick.recipes.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.recipes.sub")}</p>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("trick.recipes.search")}
          aria-label={t("trick.recipes.search")}
          className="min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint"
        />

        <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${
              filter === "all" ? "bg-accent text-white" : "bg-white/5 text-mist"
            }`}
          >
            {t("discover.all")}
          </button>
          {RECIPE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${
                filter === category.id ? "bg-accent text-white" : "bg-white/5 text-mist"
              }`}
            >
              {category.label[lang]}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((recipe) => (
            <Link key={recipe.id} href={`/start/trick/recipes/${recipe.id}`} data-discover="true">
              <section className="h-full rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card">
                <p className="text-xs uppercase tracking-wide text-faint">
                  {categoryLabel(recipe.category, lang)} · {recipe.prepTime}
                </p>
                <h2 className="mt-1 font-semibold">{recipe.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-mist">{recipe.description}</p>
              </section>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-6 text-center shadow-card">
            <h2 className="font-display text-xl">{t("trick.recipes.empty")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t("trick.recipes.emptyHint")}</p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
