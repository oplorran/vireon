"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { PROGRAMS } from "@/lib/programs";
import { memberHref, useMember } from "@/lib/useMember";
import { useProgress } from "@/lib/useProgress";

const KEY = "vireon.member.program";

export function ProgramsClient() {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const progress = useProgress();
  const [enrolledSlug, setEnrolledSlug] = useState<string | null>(null);

  useEffect(() => {
    setEnrolledSlug(window.localStorage.getItem(KEY));
  }, []);

  return (
    <AppShell current="/start/programs">
      <DemoNotice />

      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("programs.title")}</h1>
        {lang !== "en" && <p className="text-xs leading-5 text-faint">{t("programs.stayEnglish")}</p>}
        <p className="text-sm leading-6 text-mist">{t("programs.sub2")}</p>

        {PROGRAMS.map((program) => {
          const enrolled = enrolledSlug === program.slug;
          const done = progress.completedDays.filter((d) => d.startsWith(`${program.slug}:`)).length;
          const percent = Math.round((done / program.totalDays) * 100);

          return (
            <section
              key={program.slug}
              className={`app-card p-5 ${
                program.theme === "cyan"
                  ? "bg-[radial-gradient(420px_160px_at_100%_0%,rgba(73,210,255,0.2),transparent_55%),rgba(16,26,46,0.94)]"
                  : "bg-[radial-gradient(420px_160px_at_100%_0%,rgba(47,123,255,0.28),transparent_55%),rgba(16,26,46,0.94)]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-cyan">
                {t("programs.levelDays", { level: program.level, n: program.totalDays })}
              </p>
              <h2 className="mt-2 font-display text-2xl">
                {t(`programs.${program.slug === "7-day-starter" ? 1 : 2}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-mist">
                {t(`programs.${program.slug === "7-day-starter" ? 1 : 2}.text`)}
              </p>
              {enrolled && (
                <p className="mt-3 text-sm text-ok">
                  {t("programs.doneOfTotal", { done, total: program.totalDays, percent })}
                </p>
              )}
              <Link href={memberHref(`/start/programs/${program.slug}`, email)}>
                <span className="app-btn mt-4 inline-flex w-auto">
                  {enrolled ? t("programs.openProgram") : t("programs.cta")}
                </span>
              </Link>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
