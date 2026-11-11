"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { findProgramDay } from "@/lib/programs";
import { memberHref, useMember } from "@/lib/useMember";
import { useProgress } from "@/lib/useProgress";

export function ProgramDayClient({ slug, day }: { slug: string; day: number }) {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const progress = useProgress();

  const found = findProgramDay(slug, day);
  if (!found) return null;

  const { program, day: lesson } = found;
  const id = `${slug}:${day}`;
  const complete = progress.completedDays.includes(id);

  return (
    <AppShell current="/start/programs">
      <DemoNotice />

      <article className="space-y-4">
        <Link href={memberHref(`/start/programs/${slug}`, email)} className="text-sm text-cyan">
          {t("programs.backTo", {
            title: t(`programs.${slug === "7-day-starter" ? 1 : 2}.title`),
          })}
        </Link>

        <p className="text-xs uppercase tracking-[0.16em] text-cyan">
          {t("home.program.dayOf", { n: day, total: program.totalDays })}
        </p>
        <h1 className="font-display text-3xl">{lesson.title[lang]}</h1>
        <p className="text-sm leading-6 text-mist">{lesson.introduction}</p>

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.pending")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>

        <section className="app-card richtext p-5 text-sm leading-6 text-mist">
          {lesson.article.split("\n\n").map((paragraph) => (
            <p key={paragraph} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{lesson.activityTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-mist">{lesson.activityBody}</p>
        </section>

        {lesson.related.length > 0 && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("programs.related")}</h2>
            <ul className="mt-3 space-y-2">
              {lesson.related.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={memberHref(`/start/discover/${entry.type}/${entry.slug}`, email)}
                    className="text-sm text-cyan"
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("programs.checklist")}</h2>
          <ul className="mt-3 space-y-2">
            {lesson.tasks.map((task) => {
              const key = `${id}:${task}`;
              return (
                <li key={task}>
                  <label className="flex items-start gap-3 rounded-2xl bg-white/5 px-3 py-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={key in progress.tasks}
                      onChange={() => progress.toggleTask(key, task)}
                    />
                    {task}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => progress.completeDay(id, `${lesson.title[lang]} · ${t("programs.day")} ${day}`)}
            disabled={complete}
            className="app-btn mt-4 w-full"
          >
            {complete ? t("programs.completed") : t("programs.markComplete")}
          </button>
        </section>

        <div className="flex justify-between">
          {day > 1 ? (
            <Link href={memberHref(`/start/programs/${slug}/days/${day - 1}`, email)} className="text-sm text-cyan">
              {t("programs.previous")}
            </Link>
          ) : (
            <span />
          )}
          {day < program.totalDays ? (
            <Link href={memberHref(`/start/programs/${slug}/days/${day + 1}`, email)} className="text-sm text-cyan">
              {t("programs.next")}
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
    </AppShell>
  );
}
