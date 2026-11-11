"use client";

import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { LOCALE, useI18n } from "@/lib/i18n";
import { inviteUrl, useAdmin } from "@/lib/adminStore";

export function InvitesClient() {
  const { t, lang } = useI18n();
  const { ready, invites, createInvite, revokeInvite } = useAdmin();

  const [form, setForm] = useState({ label: "", email: "", expiresInDays: 14 });
  const [fresh, setFresh] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function create(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const invite = createInvite({
        label: form.label,
        email: form.email,
        expiresInDays: form.expiresInDays,
      });
      setFresh(inviteUrl(invite.token));
      setForm({ label: "", email: "", expiresInDays: 14 });
      setCopied(false);
    } catch {
      setError(t("admin.invites.created"));
    }
  }

  async function copy() {
    if (!fresh) return;
    try {
      await navigator.clipboard.writeText(fresh);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  function revoke(id: string) {
    if (!window.confirm(t("admin.invites.revokeConfirm"))) return;
    revokeInvite(id);
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.invites.title")}</h1>
        <p className="text-sm leading-6 text-mist">{t("admin.invites.sub")}</p>

        <section className="app-card p-5">
          <form className="grid gap-3 md:grid-cols-2" onSubmit={create}>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.invites.name")}</span>
              <input
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder={t("admin.invites.namePh")}
                className="app-input"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.invites.email")}</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="app-input"
              />
              <span className="mt-1 block text-xs text-faint">{t("admin.invites.emailHint")}</span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.invites.days")}</span>
              <input
                type="number"
                min={1}
                max={90}
                value={form.expiresInDays}
                onChange={(e) => setForm({ ...form, expiresInDays: Number(e.target.value) })}
                className="app-input"
              />
            </label>

            <button type="submit" className="app-btn md:col-span-2 md:justify-self-end md:w-auto">
              {t("admin.invites.create")}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-3 text-sm text-danger">
              {error}
            </p>
          )}
        </section>

        {fresh && (
          <section className="app-card p-5" role="dialog" aria-label={t("admin.invites.copyTitle")}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl">{t("admin.invites.copyTitle")}</h2>
              <button
                type="button"
                onClick={() => setFresh(null)}
                className="text-sm text-mist hover:text-white"
              >
                {t("admin.invites.close")}
              </button>
            </div>
            <p className="mt-2 text-sm leading-6 text-mist">{t("admin.invites.copyBody")}</p>
            <p className="mt-3 break-all rounded-2xl bg-night px-3 py-2 text-sm text-cyan">{fresh}</p>
            <button type="button" onClick={copy} className="app-btn mt-4 w-auto">
              {copied ? t("admin.invites.copied") : t("admin.invites.copy")}
            </button>
          </section>
        )}

        <div className="space-y-3">
          {ready &&
            invites.map((inv) => (
              <section key={inv.id} className="app-card p-4 text-sm">
                <p className="font-semibold">
                  {inv.label} · {t(`admin.istatus.${inv.status}`)}
                </p>
                <p className="text-mist">
                  {t("admin.invites.final")} {inv.hint}
                  {inv.isSample ? ` · ${t("admin.sampleShort").toLowerCase()}` : ""}
                </p>
                <p className="text-faint">
                  {t("admin.invites.expires", {
                    date: new Date(inv.expiresAt).toLocaleString(LOCALE[lang]),
                  })}
                  {inv.intendedEmail ? ` · ${inv.intendedEmail}` : ""}
                  {inv.usedByEmail ? ` · ${t("admin.invites.used", { email: inv.usedByEmail })}` : ""}
                </p>
                {inv.status === "active" && (
                  <button
                    type="button"
                    onClick={() => revoke(inv.id)}
                    className="app-btn-danger mt-3"
                  >
                    {t("admin.invites.revoke")}
                  </button>
                )}
              </section>
            ))}

          {ready && invites.length === 0 && (
            <p className="app-card p-5 text-sm text-mist">{t("admin.invites.empty")}</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
