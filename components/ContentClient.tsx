"use client";

import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";

export function ContentClient() {
  const { t } = useI18n();

  const sections = [
    { title: t("admin.content.programs"), text: t("admin.content.programsText"), href: "/admin/content/programs" },
    { title: t("admin.content.foods"), text: t("admin.content.foodsText"), href: "/admin/content/foods" },
    { title: t("admin.content.recipes"), text: t("admin.content.recipesText"), href: "/admin/content/recipes" },
    { title: t("admin.content.exercises"), text: t("admin.content.exercisesText"), href: "/admin/content/exercises" },
    { title: t("admin.content.articles"), text: t("admin.content.articlesText"), href: "/admin/content/articles" },
  ];

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.content.title")}</h1>
        <p className="text-sm text-mist">{t("admin.content.sub")}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <section className="app-card p-5 transition hover:border-accent/40">
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-mist">{s.text}</p>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
