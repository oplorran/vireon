"use client";

import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

const FAQ = [1, 2, 3, 4, 5];

export function HelpClient() {
  const { t } = useI18n();

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("help.title")}</h1>

        <div className="space-y-3">
          {FAQ.map((n) => (
            <section key={n} className="app-card p-5">
              <h2 className="font-semibold">{t(`help.${n}.q`)}</h2>
              <p className="mt-2 text-sm leading-6 text-mist">{t(`help.${n}.a`)}</p>
            </section>
          ))}

          <section className="app-card p-5 text-sm leading-6 text-mist">{t("help.emergency")}</section>
        </div>
      </div>
    </AppShell>
  );
}
