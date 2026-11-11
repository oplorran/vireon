"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin } from "@/lib/adminStore";

export function AdminSettingsClient() {
  const { t } = useI18n();
  const { ready, settings, counts, saveSettings, removeSampleData } = useAdmin();
  const [supportEmail, setSupportEmail] = useState("");
  const [showPending, setShowPending] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!ready) return;
    setSupportEmail(settings.supportEmail);
    setShowPending(settings.showPendingClinicalContent);
  }, [ready, settings]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    saveSettings({ supportEmail, showPendingClinicalContent: showPending });
    setStatus(t("admin.settings.saved"));
  }

  function wipe() {
    if (!window.confirm(t("admin.settings.removeConfirm"))) return;
    removeSampleData();
    setStatus(t("admin.settings.removed"));
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.settings.title")}</h1>

        <section className="app-card p-5">
          <form className="space-y-3" onSubmit={submit}>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.settings.support")}</span>
              <input
                name="supportEmail"
                type="email"
                className="app-input"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="showPending"
                checked={showPending}
                onChange={(e) => setShowPending(e.target.checked)}
              />
              {t("admin.settings.pending")}
            </label>

            <button type="submit" className="app-btn w-auto">
              {t("admin.settings.save")}
            </button>
          </form>
          {status && (
            <p className="mt-3 text-sm text-mist" role="status">
              {status}
            </p>
          )}
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("admin.settings.sampleTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-mist">{t("admin.settings.sampleText")}</p>
          <button
            type="button"
            onClick={wipe}
            disabled={!counts.sampleData}
            className="app-btn-danger mt-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("admin.settings.remove")}
          </button>
        </section>
      </div>
    </AdminShell>
  );
}
