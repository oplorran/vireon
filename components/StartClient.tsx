"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { CATEGORIES, findItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { findProgram } from "@/lib/programs";
import { memberHref, useMember } from "@/lib/useMember";
import { useProgress } from "@/lib/useProgress";

const QUICK = [
  { href: "/start/discover/nutrition", key: "home.nutrition", icon: "leaf" },
  { href: "/start/discover/exercises", key: "home.exercise", icon: "dumbbell" },
  { href: "/start/discover/sleep", key: "home.sleep", icon: "moon" },
  { href: "/start/discover/stress", key: "home.stress", icon: "wind" },
];

const ICONS: Record<string, React.ReactNode> = {
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6c1.1-.22 2.15-.53 2.92-1" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  wind: (
    <>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </>
  ),
};

/** Ring with the exact reference geometry (r=42, 10px stroke). */
function Ring({ value }: { value: number }) {
  const percent = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 42;
  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
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
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-2xl font-semibold">{Math.round(percent)}%</span>
      </div>
    </div>
  );
}

export function StartClient() {
  const { email, name } = useMember();
  const { t, lang } = useI18n();
  const progress = useProgress();
  const [programSlug, setProgramSlug] = useState<string | null>(null);

  useEffect(() => {
    setProgramSlug(window.localStorage.getItem("vireon.member.program"));
  }, []);

  const program = programSlug ? findProgram(programSlug) : null;
  const done = program ? progress.completedDays.filter((d) => d.startsWith(`${program.slug}:`)).length : 0;
  const percent = program ? Math.round((done / program.totalDays) * 100) : 0;
  const currentDay = program
    ? Math.min(done + 1, program.totalDays)
    : 0;
  const focusDay = program
    ? program.weeks.flatMap((w) => w.days).find((d) => d.dayNumber === currentDay)
    : null;

  /** Rotating daily read, seeded by the date so it changes once a day. */
  const seed = Math.floor(Date.now() / 86_400_000);
  const pool = CATEGORIES.flatMap((c) => c.items.map((i) => ({ c, i })));
  const daily = pool[seed % pool.length];
  const dailyItem = findItem(daily.c.slug, daily.i.slug);

  return (
    <AppShell current="/start">
      <DemoNotice />

      <div className="space-y-4">
        <div>
          <p className="text-sm text-mist">{t("home.welcome")}</p>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">{name}</h1>
          <p className="mt-1 text-sm text-faint">{t("home.sub")}</p>
        </div>

        <section className="app-card overflow-hidden bg-[radial-gradient(500px_180px_at_100%_0%,rgba(73,210,255,0.18),transparent_50%),rgba(16,26,46,0.92)] p-5">
          {program ? (
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan">
                  {percent === 100 ? t("home.program.completed") : t("home.program.tag")}
                </p>
                <h2 className="mt-2 font-display text-xl sm:text-2xl">
                  {t(`programs.${program.slug === "7-day-starter" ? 1 : 2}.title`)}
                </h2>
                <p className="mt-1 text-sm text-mist">
                  {t("home.program.dayOf", { n: currentDay, total: program.totalDays })}
                </p>
                <Link href={memberHref(`/start/programs/${program.slug}`, email)}>
                  <span className="app-btn mt-4 inline-flex w-auto">{t("home.program.continue")}</span>
                </Link>
              </div>
              <Ring value={percent} />
            </div>
          ) : (
            <div>
              <h2 className="font-display text-2xl">{t("home.program.title")}</h2>
              <p className="mt-2 text-sm text-mist">{t("home.program.text")}</p>
              <Link href={memberHref("/start/programs", email)}>
                <span className="app-btn mt-4 inline-flex w-auto">{t("home.program.cta")}</span>
              </Link>
            </div>
          )}
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("home.focus.title")}</h2>
          {focusDay ? (
            <>
              <p className="mt-1 text-sm text-mist">
                {`${focusDay.title[lang]}. ${t(focusDay.activityTitle)}.`}
              </p>
              <ul className="mt-4 space-y-2">
                {focusDay.tasks.map((task) => {
                  const key = `${program?.slug}:${focusDay.dayNumber}:${task}`;
                  const done = key in progress.tasks;
                  return (
                    <li
                      key={task}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 text-sm"
                    >
                      <span
                        className={
                          done
                            ? "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok text-ink-950"
                            : "h-5 w-5 shrink-0 rounded-full border border-white/20"
                        }
                        aria-hidden="true"
                      >
                        {done ? "✓" : ""}
                      </span>
                      <span className={done ? "text-mist" : ""}>{task}</span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={memberHref(`/start/programs/${program?.slug}/days/${focusDay.dayNumber}`, email)}
                className="mt-4 inline-block text-sm font-semibold text-cyan"
              >
                {t("home.focus.open")}
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-mist">{t("home.focus.text")}</p>
          )}
        </section>

        {dailyItem && (
          <Link href={memberHref(`/start/discover/${daily.c.slug}/${daily.i.slug}`, email)} className="block">
            <section className="app-card p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan">{t("home.read.tag")}</p>
              <h2 className="mt-2 font-display text-xl">{dailyItem.title[lang]}</h2>
              <p className="mt-2 text-sm leading-6 text-mist">{dailyItem.text[lang]}</p>
            </section>
          </Link>
        )}

        <div className="grid grid-cols-2 gap-3">
          {QUICK.map((item) => (
            <Link
              key={item.href}
              href={memberHref(item.href, email)}
              className="app-card p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-cyan"
              >
                {ICONS[item.icon]}
              </svg>
              <p className="mt-3 font-semibold">{t(item.key)}</p>
            </Link>
          ))}
        </div>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("home.recent.title")}</h2>
          {progress.recent.length === 0 ? (
            <p className="mt-2 text-sm text-mist">{t("home.recent.text")}</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {progress.recent.map((entry) => (
                <li key={`${entry.at}-${entry.label}`} className="text-sm text-mist">
                  <span className="text-foam">{entry.label}</span>
                  <span className="mt-0.5 block text-xs text-faint">
                    {new Date(entry.at).toLocaleString(
                      lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en",
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
