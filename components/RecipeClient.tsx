"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { categoryLabel, findRecipe } from "@/lib/recipes";
import { useI18n } from "@/lib/i18n";

export function RecipeClient({ id }: { id: string }) {
  const { t, lang } = useI18n();
  const recipe = findRecipe(id);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        {!recipe ? (
          <>
            <h1 className="font-display text-3xl">{t("trick.recipes.notFound")}</h1>
            <Link href="/start/trick/recipes" className="inline-flex text-sm font-semibold text-cyan">
              {t("trick.recipes.back")}
            </Link>
          </>
        ) : (
          <>
            <Link href="/start/trick/recipes" className="text-sm text-cyan">
              {t("trick.recipes.title")}
            </Link>
            <div>
              <p className="text-xs uppercase tracking-wide text-faint">
                {categoryLabel(recipe.category, lang)} · {recipe.difficulty} · {recipe.prepTime}
                {recipe.cookTime ? ` · ${recipe.cookTime}` : ""} · {recipe.servings}
              </p>
              <h1 className="mt-1 font-display text-3xl">{recipe.title}</h1>
              <p className="mt-2 text-sm leading-6 text-mist">{recipe.description}</p>
            </div>

            <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
              <h2 className="font-display text-xl">{t("trick.recipes.ingredients")}</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-mist">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
              <h2 className="font-display text-xl">{t("trick.recipes.steps")}</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-mist">
                {recipe.steps.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </section>

            {recipe.benefits.length > 0 && (
              <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
                <h2 className="font-display text-xl">{t("trick.recipes.why")}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-mist">
                  {recipe.benefits.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {recipe.tips.length > 0 && (
              <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
                <h2 className="font-display text-xl">{t("trick.recipes.tips")}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-mist">
                  {recipe.tips.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {recipe.notes.length > 0 && (
              <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
                <h2 className="font-display text-xl">{t("trick.recipes.notes")}</h2>
                {recipe.notes.map((item, i) => (
                  <p key={i} className="mt-2 text-sm leading-6 text-mist">
                    {item}
                  </p>
                ))}
              </section>
            )}

            {recipe.cautions.length > 0 && (
              <section className="rounded-[22px] border border-white/10 border-warn/30 bg-ink-800/90 p-5 shadow-card">
                <h2 className="font-display text-xl">{t("trick.recipes.cautions")}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-mist">
                  {recipe.cautions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
              <p className="font-semibold text-foam">{t("legal.short")}</p>
              <p className="mt-1">{t("legal.line")}</p>
              <p className="mt-1">{t("legal.emergency")}</p>
            </aside>
          </>
        )}
      </div>
    </AppShell>
  );
}
