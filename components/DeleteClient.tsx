"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { signOut } from "@/lib/useMember";

export function DeleteClient() {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const [deleted, setDeleted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toUpperCase() !== "DELETE") return;
    signOut();
    setDeleted(true);
  }

  if (deleted) {
    return (
      <AppShell current="/start/profile">
        <div className="space-y-4">
          <h1 className="font-display text-3xl">{t("delete.title")}</h1>
          <section className="app-card p-5">
            <p className="text-sm leading-6 text-mist">{t("delete.done")}</p>
            <Link href="/login" className="app-btn mt-4">
              {t("shell.signOut")}
            </Link>
          </section>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("delete.title")}</h1>

        <section className="app-card p-5">
          <p className="text-sm leading-6 text-mist">{t("delete.text")}</p>

          <form onSubmit={submit} className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("delete.label")}</span>
              <input required value={value} onChange={(e) => setValue(e.target.value)} className="app-input" />
            </label>
            <button type="submit" disabled={value.trim().toUpperCase() !== "DELETE"} className="app-btn-danger">
              {t("delete.cta")}
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
