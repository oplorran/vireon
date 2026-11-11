"use client";

import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

/** Legal reading page: title + numbered paragraphs from the dictionary. */
export function LegalPage({
  titleKey,
  prefix,
  paragraphs,
}: {
  titleKey: string;
  prefix: string;
  paragraphs: number;
}) {
  const { t } = useI18n();

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t(titleKey)}</h1>
        <section className="app-card p-5">
          <p className="whitespace-pre-wrap text-sm leading-7 text-mist">
            {Array.from({ length: paragraphs }, (_, i) => t(`${prefix}.p${i + 1}`)).join(" ")}
          </p>
        </section>
      </div>
    </AppShell>
  );
}
