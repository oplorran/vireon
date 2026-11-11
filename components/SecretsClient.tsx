"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { MODULES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function SecretsClient() {
  const { t, lang } = useI18n();

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.secrets.tag")}</p>
          <h1 className="mt-1 font-display text-3xl">{t("trick.secrets.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.secrets.sub")}</p>
        </div>

        {MODULES.map((module, m) => (
          <section key={module.id} className="space-y-2">
            <h2 className="font-display text-xl">
              {t("trick.secrets.module")} {m + 1} · {module.title[lang]}
            </h2>
            {module.lessons.map((lesson, i) => (
              <Link key={lesson.id} href={`/start/trick/secrets/${lesson.id}`} data-discover="true">
                <section className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-sm font-semibold text-cyan">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{lesson.title[lang]}</span>
                </section>
              </Link>
            ))}
          </section>
        ))}

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>
      </div>
    </AppShell>
  );
}
