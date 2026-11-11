"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { MODULES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function SecretLessonClient({ id }: { id: string }) {
  const { t, lang } = useI18n();

  const moduleIndex = MODULES.findIndex((module) => module.lessons.some((lesson) => lesson.id === id));
  const lesson = moduleIndex === -1 ? null : MODULES[moduleIndex].lessons.find((item) => item.id === id);

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        {!lesson || moduleIndex === -1 ? (
          <>
            <h1 className="font-display text-3xl">{t("trick.secrets.notFound")}</h1>
            <Link href="/start/trick/secrets" className="inline-flex text-sm font-semibold text-cyan">
              {t("trick.secrets.back")}
            </Link>
          </>
        ) : (
          <>
            <Link href="/start/trick/secrets" className="text-sm text-cyan">
              {t("trick.secrets.title")}
            </Link>
            <div>
              <p className="text-xs uppercase tracking-wide text-faint">
                {t("trick.secrets.module")} {moduleIndex + 1} · {MODULES[moduleIndex].title[lang]}
              </p>
              <h1 className="mt-1 font-display text-3xl">{lesson.title[lang]}</h1>
            </div>

            <video
              key={lesson.url}
              className="aspect-video w-full rounded-[22px] bg-black"
              controls
              playsInline
              preload="metadata"
              src={lesson.url}
            >
              {t("trick.secrets.videoUnsupported")}
            </video>

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
