"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { COURSES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function LessonsClient() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");

  const courses = useMemo(() => COURSES.map((course, i) => ({ ...course, index: i })), []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((course) =>
      [course.title[lang], course.text[lang], course.title.en, course.text.en]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [courses, lang, query]);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.lessons.tag")}</p>
          <h1 className="mt-1 font-display text-3xl">{t("trick.lessons.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.lessons.count")}</p>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("trick.lessons.search")}
          aria-label={t("trick.lessons.search")}
          className="min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((course) => (
            <Link key={course.slug} href={`/start/trick/lessons/${course.slug}`} data-discover="true">
              <section className="h-full rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card">
                <p className="text-xs uppercase tracking-wide text-faint">
                  {course.featured
                    ? t("trick.lessons.featured")
                    : course.index === courses.length - 1
                      ? t("trick.lessons.outline")
                      : `${t("trick.lessons.course")} ${course.index + 1}`}
                </p>
                <h2 className="mt-1 font-display text-xl">{course.title[lang]}</h2>
                <p className="mt-2 text-sm leading-6 text-mist">{course.text[lang]}</p>
                <p className="mt-3 text-xs text-cyan">
                  {course.lessons} {t("trick.lessons.lessons")}
                </p>
              </section>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
            <p className="font-semibold">{t("trick.lessons.empty")}</p>
            <p className="mt-1 text-sm text-mist">{t("trick.lessons.emptyHint")}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
