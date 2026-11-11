"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { COURSES } from "@/lib/content";
import { findLesson } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export function LessonClient({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const { t, lang } = useI18n();
  const course = COURSES.find((item) => item.slug === courseSlug);
  const found = findLesson(courseSlug, lessonSlug);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        {!course || !found ? (
          <>
            <h1 className="font-display text-3xl">{t("trick.lessons.lessonNotFound")}</h1>
            <Link href="/start/trick/lessons" className="inline-flex text-sm font-semibold text-cyan">
              {t("trick.lessons.backToCourse")}
            </Link>
          </>
        ) : (
          <>
            <Link href={`/start/trick/lessons/${courseSlug}`} className="text-sm text-cyan">
              {course.title[lang]}
            </Link>
            <div>
              <p className="text-xs uppercase tracking-wide text-faint">
                {t("trick.lessons.lesson")} {found.index + 1}
              </p>
              <h1 className="mt-1 font-display text-3xl">{found.lesson.title[lang]}</h1>
            </div>

            <section className="space-y-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">
              {found.lesson.body[lang].map((paragraph, i) => (
                <p key={i} className="text-sm leading-6 text-mist">
                  {paragraph}
                </p>
              ))}
            </section>

            {found.course.lessons[found.index + 1] && (
              <Link
                href={`/start/trick/lessons/${courseSlug}/${found.course.lessons[found.index + 1].slug}`}
                className="inline-flex text-sm font-semibold text-cyan"
              >
                {`${t("trick.lessons.next")}: ${found.course.lessons[found.index + 1].title[lang]}`}
              </Link>
            )}

            <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
              <p className="font-semibold text-foam">{t("legal.short")}</p>
              <p className="mt-1">{t("legal.line")}</p>
              <p className="mt-1">{t("legal.emergency")}</p>
            </aside>
          </>
        )}
      </div>
    </AppShell>
  );
}
