"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { COURSES } from "@/lib/content";
import { findCourse } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export function CourseClient({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const course = COURSES.find((item) => item.slug === slug);
  const payload = findCourse(slug);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        {!course || !payload ? (
          <>
            <h1 className="font-display text-3xl">{t("trick.lessons.notFound")}</h1>
            <Link href="/start/trick/lessons" className="inline-flex text-sm font-semibold text-cyan">
              {t("trick.lessons.backToCourse")}
            </Link>
          </>
        ) : (
          <>
            <Link href="/start/trick/lessons" className="text-sm text-cyan">
              {t("trick.lessons.title")}
            </Link>
            <div>
              <h1 className="font-display text-3xl">{course.title[lang]}</h1>
              <p className="mt-2 text-sm leading-6 text-mist">{course.text[lang]}</p>
            </div>

            <ol className="space-y-2">
              {payload.lessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link href={`/start/trick/lessons/${payload.slug}/${lesson.slug}`}>
                    <section className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-sm font-semibold text-cyan">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{lesson.title[lang]}</span>
                        <span className="mt-1 block text-xs text-faint">
                          {lesson.outline ? t("trick.lessons.outlineTag") : t("trick.lessons.written")}
                        </span>
                      </span>
                    </section>
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </AppShell>
  );
}
