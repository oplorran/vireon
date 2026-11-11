"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";

const DESK = [
  { title: "trick.protocol", body: "trick.doctor.1", href: "/start/trick" },
  { title: "trick.lessons", body: "trick.doctor.2", href: "/start/trick/lessons" },
  { title: "trick.recipes", body: "trick.doctor.3", href: "/start/trick/recipes" },
  { title: "trick.tonic", body: "trick.doctor.4", href: "/start/trick/tonic" },
  { title: "trick.kegel", body: "trick.doctor.5", href: "/start/trick/kegel" },
  { title: "trick.secrets", body: "trick.doctor.6", href: "/start/trick/secrets" },
];

export function DoctorClient() {
  const { email } = useMember();
  const { t } = useI18n();

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.doctor.tag")}</p>
          <h1 className="mt-1 font-display text-3xl">{t("trick.doctor.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.doctor.sub")}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {DESK.map((row) => (
            <Link key={row.title} href={memberHref(row.href, email)}>
              <section className="app-card h-full p-4">
                <h2 className="font-display text-xl">{t(row.title)}</h2>
                <p className="mt-2 text-sm leading-6 text-mist">{t(row.body)}</p>
              </section>
            </Link>
          ))}
        </div>

        <section className="app-card p-5 text-sm leading-6 text-mist">
          <h2 className="font-display text-xl text-foam">{t("trick.doctor.care")}</h2>
          <p className="mt-2">{t("trick.doctor.careText")}</p>
        </section>

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>
      </div>
    </AppShell>
  );
}
