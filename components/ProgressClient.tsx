"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { findItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { findProgram } from "@/lib/programs";
import { memberHref, useMember } from "@/lib/useMember";
import { useProgress } from "@/lib/useProgress";
import { useSaved } from "@/lib/useSaved";

const HABITS = [
  { key: "movement", label: "progress.h1" },
  { key: "meals", label: "progress.h2" },
  { key: "sleep", label: "progress.h3" },
  { key: "pause", label: "progress.h4" },
];

const localKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function ProgressClient() {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const { saved } = useSaved();
  const progress = useProgress();
  const [programSlug, setProgramSlug] = useState<string | null>(null);

  useEffect(() => {
    setProgramSlug(window.localStorage.getItem("vireon.member.program"));
  }, []);

  const program = programSlug ? findProgram(programSlug) : null;
  const doneDays = program
    ? progress.completedDays.filter((d) => d.startsWith(`${program.slug}:`)).length
    : 0;
  const percent = program ? Math.round((doneDays / program.totalDays) * 100) : 0;

  /** Last 28 local days, oldest first, for the calendar grid. */
  const days = useMemo(
    () =>
      progress.last28.map((key, i) => {
        const parts = key.split("-");
        return {
          day: Number(parts[2]),
          key,
          today: i === 27,
        };
      }),
    [progress.last28],
  );

  /** Last 7 local days, oldest first, so each bar shows its own date. */
  const week = useMemo(() => {
    const now = new Date();
    const taskCounts: Record<string, number> = {};
    Object.values(progress.tasks).forEach((task) => {
      const key = localKey(new Date(task.at));
      taskCounts[key] = (taskCounts[key] ?? 0) + 1;
    });
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i));
      const dayKey = localKey(d);
      return {
        dayKey,
        weekday: d.toLocaleDateString(lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en", {
          weekday: "narrow",
        }),
        count: (progress.habits[dayKey] ?? []).length + (taskCounts[dayKey] ?? 0),
      };
    });
  }, [progress.habits, progress.tasks, lang]);

  const recorded =
    Object.values(progress.habits).reduce((sum, list) => sum + list.length, 0) +
    Object.keys(progress.tasks).length;
  /** Bars are relative to the busiest day of the week, with a visible floor. */
  const peak = Math.max(1, ...week.map((d) => d.count));

  return (
    <AppShell current="/start/progress">
      <DemoNotice />
      <div className="space-y-4">
        <div>
          <h1 className="font-display text-3xl">{t("progress.title")}</h1>
          <p className="mt-1 text-sm leading-6 text-mist">{t("progress.sub")}</p>
        </div>

        <section className="app-card flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">
              {program ? t("progress.current") : t("progress.none")}
            </p>
            <h2 className="mt-2 font-display text-xl sm:text-2xl">
              {program ? t(`programs.${program.slug === "7-day-starter" ? 1 : 2}.title`) : t("progress.choose")}
            </h2>
            <p className="mt-1 text-sm text-mist">
              {program
                ? t("progress.ofDays", { done: doneDays, total: program.totalDays })
                : t("progress.chooseText")}
            </p>
            <Link
              href={memberHref(program ? `/start/programs/${program.slug}` : "/start/programs", email)}
              className="mt-3 inline-block text-sm font-semibold text-cyan"
            >
              {program ? t("home.focus.open") : t("progress.open")}
            </Link>
          </div>
          <div
            className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
            aria-label={t("progress.ofDays", { done: doneDays, total: program?.totalDays ?? 30 })}
          >
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="42"
                stroke="#49D2FF"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - percent / 100)}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-2xl font-semibold">{percent}%</span>
            </div>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-3">
          <section className="app-card p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t("progress.activities")}</p>
            <p className="mt-2 font-display text-3xl">{recorded}</p>
          </section>
          <section className="app-card p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t("progress.active")}</p>
            <p className="mt-2 font-display text-3xl">{progress.activeDays}</p>
            <p className="text-xs text-faint">{t("progress.device")}</p>
          </section>
          <section className="app-card p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t("progress.completed")}</p>
            <p className="mt-2 font-display text-3xl">
              {program && doneDays === program.totalDays ? 1 : 0}
            </p>
          </section>
        </div>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("progress.habits")}</h2>
          <p className="mt-1 text-sm text-mist">{t("progress.habitsSub")}</p>
          <ul className="mt-4 space-y-2">
            {HABITS.map((habit) => {
              const active = progress.todayHabits.includes(habit.key);
              return (
                <li key={habit.key}>
                  <button
                    type="button"
                    onClick={() => progress.toggleHabit(habit.key, t(habit.label))}
                    aria-pressed={active}
                    className="flex min-h-12 w-full items-center gap-3 rounded-2xl bg-white/5 px-3 text-left text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] ${
                        active ? "bg-ok text-ink-950" : "border border-white/20"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {t(habit.label)}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("progress.week")}</h2>
          <p className="mt-1 text-sm text-mist">{t("progress.weekSub")}</p>
          <div className="mt-4 grid grid-cols-7 items-end gap-2" aria-label={t("progress.weekly")}>
            {week.map((day) => (
              <div key={day.dayKey} className="text-center">
                <div className="flex h-28 items-end justify-center">
                  <div
                    className="w-full max-w-8 rounded-t-lg bg-cyan/80"
                    style={{ height: `${Math.max(6, (day.count / peak) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] uppercase text-faint">{day.weekday}</p>
                <p className="text-[11px] text-mist">{day.count}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("progress.calendar")}</h2>
          <div className="mt-4 grid grid-cols-7 gap-2" aria-label={t("progress.calendarActivity")}>
            {days.map((d) => {
              const logged = progress.activeDayKeys.has(d.key);
              return (
                <div
                  key={d.key}
                  title={d.key}
                  className={`grid h-10 place-items-center rounded-xl text-xs ${
                    logged ? "bg-ok/20 text-ok" : d.today ? "bg-cyan/15 text-cyan" : "bg-white/5 text-faint"
                  }`}
                >
                  {d.day}
                </div>
              );
            })}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("progress.reading")}</h2>
          {progress.reads.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {progress.reads.map((entry) => {
                const item = findItem(entry.module, entry.slug);
                return (
                  <li key={`${entry.module}-${entry.slug}`}>
                    <Link
                      href={memberHref(`/start/discover/${entry.module}/${entry.slug}`, email)}
                      className="text-cyan"
                    >
                      {item ? item.title[lang] : entry.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-mist">{t("progress.readingText")}</p>
          )}
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("progress.saved")}</h2>
          {saved.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {saved.map((id) => {
                const [cat, slug] = id.split("/");
                const item = findItem(cat, slug);
                if (!item) return null;
                return (
                  <li key={id}>
                    <Link href={memberHref(`/start/discover/${cat}/${slug}`, email)} className="text-cyan">
                      {item.title[lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-mist">{t("progress.savedText")}</p>
          )}
        </section>

        {program && doneDays === program.totalDays && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("progress.completed")}</h2>
            <ul className="mt-3 space-y-1 text-sm text-mist">
              <li>{t(`programs.${program.slug === "7-day-starter" ? 1 : 2}.title`)}</li>
            </ul>
          </section>
        )}

        {recorded === 0 && (
          <section className="app-card p-5">
            <h2 className="font-display text-xl">{t("progress.noActivity")}</h2>
            <p className="mt-1 text-sm text-mist">{t("progress.noActivityText")}</p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
