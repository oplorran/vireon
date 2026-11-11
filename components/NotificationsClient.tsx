"use client";

import { useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

export function NotificationsClient() {
  const { t } = useI18n();
  const [read, setRead] = useState(false);

  return (
    <AppShell current="/start/notifications">
      <DemoNotice />
      {read ? (
        <section className="app-card p-6 text-center">
          <h2 className="font-display text-xl">{t("notifications.empty")}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t("notifications.emptyText")}</p>
        </section>
      ) : (
        <div className="space-y-3">
          <h1 className="font-display text-3xl">{t("notifications.title")}</h1>
          <section className="app-card p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{t("notifications.welcome")}</h2>
              <span className="text-xs text-cyan">{t("notifications.new")}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-mist">{t("notifications.welcomeText")}</p>
            <p className="mt-2 text-xs text-warn">{t("notifications.sample")}</p>
            <button type="button" onClick={() => setRead(true)} className="app-btn-ghost mt-3">
              {t("notifications.markRead")}
            </button>
          </section>
        </div>
      )}
    </AppShell>
  );
}
