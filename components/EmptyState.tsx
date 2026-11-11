"use client";

import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

/** Empty-state page used by saved items, completed programs and notifications. */
export function EmptyState({
  current,
  titleKey,
  emptyKey,
  textKey,
}: {
  current: string;
  titleKey: string;
  emptyKey: string;
  textKey: string;
}) {
  const { t } = useI18n();

  return (
    <AppShell current={current}>
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t(titleKey)}</h1>
        <section className="app-card p-6 text-center">
          <h2 className="font-display text-xl">{t(emptyKey)}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t(textKey)}</p>
        </section>
      </div>
    </AppShell>
  );
}
