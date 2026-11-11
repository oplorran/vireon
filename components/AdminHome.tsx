"use client";

import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { LOCALE, useI18n } from "@/lib/i18n";
import { useAdmin } from "@/lib/adminStore";

export function AdminHome() {
  const { t, lang } = useI18n();
  const { ready, counts, activity, people } = useAdmin();
  const admin = people.find((p) => p.role === "admin");

  const shortcuts = [
    { title: t("admin.home.invite"), text: t("admin.home.inviteText"), href: "/admin/invites" },
    { title: t("admin.home.people"), text: t("admin.home.peopleText"), href: "/admin/people" },
    { title: t("admin.home.content"), text: t("admin.home.contentText"), href: "/admin/content" },
  ];

  const numbers = [
    { value: counts.accounts, label: t("admin.home.accounts") },
    { value: counts.activeMembers, label: t("admin.home.active") },
    { value: counts.suspended, label: t("admin.home.suspended") },
    { value: counts.programsStarted, label: t("admin.home.started") },
  ];

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.home.title")}</h1>
        <p className="text-sm text-mist">{t("admin.home.sub")}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <section className="app-card p-5 transition hover:border-accent/40">
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-mist">{s.text}</p>
              </section>
            </Link>
          ))}
        </div>

        {counts.sampleData && (
          <p className="rounded-2xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-warn">
            {t("admin.home.sample")}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((n) => (
            <section key={n.label} className="app-card p-4">
              <p className="text-[10px] uppercase leading-tight tracking-[0.12em] text-faint">{n.label}</p>
              <p className="mt-2 font-display text-3xl">{ready ? n.value : "—"}</p>
            </section>
          ))}
        </div>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("admin.home.activity")}</h2>
          {activity.length === 0 ? (
            <p className="mt-2 text-sm text-mist">{t("admin.home.empty")}</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-mist">
              {activity.map((a) => (
                <li key={a.id}>
                  {a.isSample && (
                    <span className="mr-1.5 text-[10px] font-bold uppercase text-faint">
                      {t("admin.sampleShort")}
                    </span>
                  )}
                  {a.summary}
                  <span className="ml-2 text-[10px] text-faint">
                    {new Date(a.at).toLocaleString(LOCALE[lang])}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="sr-only">{admin?.firstName}</p>
      </div>
    </AdminShell>
  );
}
