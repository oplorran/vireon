"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { findProgram } from "@/lib/programs";
import { memberHref, useMember } from "@/lib/useMember";
import { useProgress } from "@/lib/useProgress";

const KEY = "vireon.member.program";

export function ProgramClient({ slug }: { slug: string }) {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const progress = useProgress();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setEnrolled(window.localStorage.getItem(KEY) === slug);
  }, [slug]);

  const program = findProgram(slug);
  if (!program) return null;

  const done = progress.completedDays.filter((d) => d.startsWith(`${slug}:`)).length;
  const percent = Math.round((done / program.totalDays) * 100);
  const currentDay = Math.min(done + 1, program.totalDays);

  function start() {
    window.localStorage.setItem(KEY, slug);
    setEnrolled(true);
  }

  return (
    <AppShell current="/start/programs">
      <DemoNotice />

      <div className="space-y-4">
        <Link href={memberHref("/start/programs", email)} className="text-sm text-cyan">
          {t("programs.all")}
        </Link>

        <h1 className="font-display text-3xl">{t(`programs.${slug === "7-day-starter" ? 1 : 2}.title`)}</h1>
        <p className="text-sm leading-6 text-mist">{t(`programs.${slug === "7-day-starter" ? 1 : 2}.text`)}</p>

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.pending")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>

        {enrolled ? (
          <p className="text-sm text-ok">{t("programs.percentDone", { percent })}</p>
        ) : (
          <button type="button" onClick={start} className="app-btn w-auto">
            {t("programs.start")}
          </button>
        )}

        {program.weeks.map((week) => (
          <section key={week.week}>
            {week.title && (
              <h2 className="mb-2 mt-4 font-display text-lg">
                {t("programs.week", { n: week.week, title: week.title })}
              </h2>
            )}
            <div className="space-y-2">
              {week.days.map((day) => {
                const complete = progress.completedDays.includes(`${slug}:${day.dayNumber}`);
                const locked = enrolled && !complete && day.dayNumber > currentDay;
                const isCurrent = enrolled && !complete && day.dayNumber === currentDay;

                const card = (
                  <section className="app-card flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="text-xs text-faint">{t("programs.day")} {day.dayNumber}</p>
                      <h3 className="font-semibold">{day.title[lang]}</h3>
                    </div>
                    <span
                      className={`shrink-0 text-sm ${
                        complete ? "text-ok" : isCurrent ? "text-cyan" : "text-faint"
                      }`}
                    >
                      {complete
                        ? t("programs.complete")
                        : locked
                          ? t("programs.locked")
                          : isCurrent
                            ? t("programs.current")
                            : t("programs.openDay")}
                    </span>
                  </section>
                );

                if (!enrolled || locked) return <div key={day.dayNumber}>{card}</div>;
                return (
                  <Link
                    key={day.dayNumber}
                    href={memberHref(`/start/programs/${slug}/days/${day.dayNumber}`, email)}
                  >
                    {card}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
