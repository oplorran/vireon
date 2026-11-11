"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin, type AdminDay, type AdminProgram } from "@/lib/adminStore";

export function ProgramEditor({ programId }: { programId: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const { ready, programs, saveProgram, deleteProgram, addDay } = useAdmin();
  const program = programs.find((p) => p.id === programId);
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (!program) {
    return (
      <AdminShell>
        <p className="text-sm text-mist">{ready ? t("admin.couldNotLoad") : t("admin.loading")}</p>
      </AdminShell>
    );
  }

  function update(patch: Partial<AdminProgram>) {
    saveProgram(programId, patch);
    setMessage(t("admin.programs.saved"));
  }

  function remove() {
    if (!window.confirm(t("admin.programs.deleteConfirm"))) return;
    deleteProgram(programId);
    router.push("/admin/content/programs");
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <Link href="/admin/content/programs" className="text-sm text-cyan">
          {t("admin.programs.back")}
        </Link>
        <h1 className="font-display text-3xl">{program.title}</h1>
        {message && (
          <p className="text-sm text-mist" role="status">
            {message}
          </p>
        )}

        <section className="app-card p-5">
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              update({
                title: String(form.get("title") ?? ""),
                slug: String(form.get("slug") ?? ""),
                level: String(form.get("level") ?? ""),
                summary: String(form.get("summary") ?? ""),
                published: form.get("published") === "on",
                clinicalReview: (form.get("clinicalReview") === "approved" ? "approved" : "pending"),
              });
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.name")}</span>
              <input name="title" className="app-input" defaultValue={program.title} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.slug")}</span>
              <input name="slug" className="app-input" defaultValue={program.slug} />
              <span className="mt-1 block text-xs text-faint">{t("admin.field.slugHint")}</span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.level")}</span>
              <input name="level" className="app-input" defaultValue={program.level} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.summary")}</span>
              <textarea name="summary" className="app-input min-h-24 py-3" defaultValue={program.summary} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" defaultChecked={program.published} />
              {t("admin.field.published")}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.field.review")}</span>
              <select name="clinicalReview" className="app-input" defaultValue={program.clinicalReview}>
                <option value="pending">{t("admin.option.pending")}</option>
                <option value="approved">{t("admin.option.approved")}</option>
              </select>
            </label>

            <div className="flex flex-wrap gap-2">
              <button type="submit" className="app-btn w-auto">
                {t("admin.save")}
              </button>
              <button
                type="button"
                onClick={() => addDay(programId)}
                className="app-btn-ghost"
              >
                {t("admin.programs.addDay")}
              </button>
              <button type="button" onClick={remove} className="app-btn-danger">
                {t("admin.programs.delete")}
              </button>
            </div>
          </form>
        </section>

        {program.days.map((day) => (
          <section key={day.id} className="app-card p-4">
            <button
              type="button"
              onClick={() => setOpenDay(openDay === day.id ? null : day.id)}
              className="w-full text-left"
            >
              <p className="font-semibold">
                {t("admin.programs.day", { n: day.dayNumber, title: day.title })}
              </p>
              <p className="text-xs text-faint">
                {day.published ? t("admin.library.published") : t("admin.library.draft")}
                {day.weekTitle ? ` · ${day.weekTitle}` : ""}
              </p>
            </button>
            {openDay === day.id && <DayForm programId={programId} day={day} />}
          </section>
        ))}
      </div>
    </AdminShell>
  );
}

function DayForm({ programId, day }: { programId: string; day: AdminDay }) {
  const { t } = useI18n();
  const { saveDay, deleteDay } = useAdmin();
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    saveDay(programId, day.id, {
      title: String(form.get("title") ?? ""),
      introduction: String(form.get("introduction") ?? ""),
      article: String(form.get("article") ?? ""),
      activityTitle: String(form.get("activityTitle") ?? ""),
      activityBody: String(form.get("activityBody") ?? ""),
      weekNumber: Number(form.get("weekNumber") ?? 1),
      weekTitle: String(form.get("weekTitle") ?? "") || null,
      published: form.get("published") === "on",
      tasks: String(form.get("tasks") ?? ""),
    });
    setMessage(t("admin.programs.daySaved"));
  }

  function remove() {
    if (!window.confirm(t("admin.programs.dayDeleteConfirm"))) return;
    deleteDay(programId, day.id);
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={submit}>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.title")}</span>
        <input name="title" className="app-input" defaultValue={day.title} />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-mist">{t("admin.field.week")}</span>
          <input
            name="weekNumber"
            type="number"
            min={1}
            className="app-input"
            defaultValue={day.weekNumber}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-mist">{t("admin.field.weekTitle")}</span>
          <input name="weekTitle" className="app-input" defaultValue={day.weekTitle ?? ""} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.introduction")}</span>
        <textarea name="introduction" className="app-input min-h-20 py-3" defaultValue={day.introduction} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.article")}</span>
        <textarea name="article" className="app-input min-h-32 py-3" defaultValue={day.article} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.activityTitle")}</span>
        <input name="activityTitle" className="app-input" defaultValue={day.activityTitle} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.activity")}</span>
        <textarea name="activityBody" className="app-input min-h-20 py-3" defaultValue={day.activityBody} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{t("admin.field.tasks")}</span>
        <textarea
          name="tasks"
          className="app-input min-h-24 py-3"
          defaultValue={day.tasks}
          aria-describedby="tasks-hint"
        />
        <span id="tasks-hint" className="mt-1 block text-xs text-faint">
          {t("admin.field.onePerLine")}
        </span>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={day.published} />
        {t("admin.field.published")}
      </label>

      {message && (
        <p className="text-sm text-mist" role="status">
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="app-btn w-auto">
          {t("admin.save")}
        </button>
        <button type="button" onClick={remove} className="app-btn-danger">
          {t("admin.library.delete")}
        </button>
      </div>
    </form>
  );
}
