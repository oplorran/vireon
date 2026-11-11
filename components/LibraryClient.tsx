"use client";

import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin, type Kind } from "@/lib/adminStore";

const TITLE: Record<Kind, string> = {
  foods: "admin.content.foods",
  recipes: "admin.content.recipes",
  exercises: "admin.content.exercises",
  articles: "admin.content.articles",
};

export function LibraryClient({ kind }: { kind: Kind }) {
  const { t } = useI18n();
  const { ready, library } = useAdmin();
  const items = library.filter((i) => i.kind === kind);

  return (
    <AdminShell>
      <div className="space-y-4">
        <Link href="/admin/content" className="text-sm text-cyan">
          {t("admin.content.title")}
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="min-w-0 font-display text-2xl sm:text-3xl">{t(TITLE[kind])}</h1>
          <Link href={`/admin/content/${kind}/new`}>
            <span className="app-btn w-auto">{t("admin.library.new")}</span>
          </Link>
        </div>

        {ready && items.length === 0 && (
          <section className="app-card p-6 text-center">
            <h2 className="font-display text-xl">{t("admin.library.emptyTitle")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">
              {t("admin.library.emptyBody")}
            </p>
          </section>
        )}

        <div className="space-y-3">
          {items.map((item) => (
            <Link key={item.id} href={`/admin/content/${kind}/${item.id}`} className="block">
              <section className="app-card p-4">
                <p className="font-semibold">{item.name || item.title}</p>
                <p className="text-sm text-mist">
                  {item.published ? t("admin.library.published") : t("admin.library.draft")} ·{" "}
                  {t(`admin.review.${item.clinicalReview}`)}
                </p>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
