"use client";

import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { TONICS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function TonicClient() {
  const { t, lang } = useI18n();

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{t("trick.tonic.tag")}</p>
        <div>
          <h1 className="font-display text-3xl">{t("trick.tonic.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.tonic.sub")}</p>
        </div>

        {TONICS.map((tonic, i) => (
          <section key={i} className="app-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan">
              {t(`tag.${tonic.tag}`)} · {t(`tag.${tonic.level}`)} · {tonic.minutes} {t("trick.recipes.min")}
            </p>
            <h2 className="mt-1.5 font-display text-lg">{tonic.title[lang]}</h2>
            <p className="mt-1.5 text-sm leading-6 text-mist">{tonic.text[lang]}</p>
            <p className="mt-3 text-xs text-faint">
              {t("trick.tonic.window")}: {tonic.window} {t("trick.recipes.min")}
            </p>
          </section>
        ))}

        <section className="app-card space-y-2 p-5 text-xs leading-6 text-faint">
          <p>{t("legal.short")}</p>
          <p>{t("legal.emergency")}</p>
        </section>
      </div>
    </AppShell>
  );
}
