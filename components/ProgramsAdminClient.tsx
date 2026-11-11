"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin } from "@/lib/adminStore";

export function ProgramsAdminClient() {
  const { t } = useI18n();
  const { ready, programs, createProgram } = useAdmin();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const router = useRouterSafe();

  function create(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !summary.trim()) return;
    const created = createProgram({ title: title.trim(), summary: summary.trim() });
    router.push(`/admin/content/programs/${created.id}`);
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <Link href="/admin/content" className="text-sm text-cyan">
          {t("admin.content.title")}
        </Link>
        <h1 className="font-display text-3xl">{t("admin.programs.title")}</h1>

        <section className="app-card p-5">
          <form className="space-y-3" onSubmit={create}>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.programs.name")}</span>
              <input
                className="app-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.summary")}</span>
              <textarea
                className="app-input min-h-24 py-3"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="app-btn w-auto">
              {t("admin.programs.create")}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </section>

        <div className="space-y-3">
          {ready &&
            programs.map((p) => (
              <Link key={p.id} href={`/admin/content/programs/${p.id}`} className="block">
                <section className="app-card p-4">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-mist">
                    {t("admin.programs.days", { n: p.days.length })} ·{" "}
                    {p.published ? t("admin.library.published") : t("admin.library.draft")} ·{" "}
                    {t(`admin.review.${p.clinicalReview}`)}
                  </p>
                </section>
              </Link>
            ))}
        </div>
      </div>
    </AdminShell>
  );
}

import { useRouter } from "next/navigation";

function useRouterSafe() {
  return useRouter();
}
