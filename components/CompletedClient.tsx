"use client";

import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

export function CompletedClient() {
  const { t } = useI18n();

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <section className="app-card p-6 text-center">
        <h2 className="font-display text-xl">{t("completed.empty")}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t("completed.emptyText")}</p>
      </section>
    </AppShell>
  );
}
