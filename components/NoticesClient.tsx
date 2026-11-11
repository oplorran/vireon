"use client";

import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { LOCALE, useI18n } from "@/lib/i18n";
import { useAdmin } from "@/lib/adminStore";

export function NoticesClient() {
  const { t, lang } = useI18n();
  const { ready, notices, outbox, publishNotice } = useAdmin();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [openMessage, setOpenMessage] = useState<string | null>(null);

  function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    publishNotice({ title: title.trim(), body: body.trim() });
    setTitle("");
    setBody("");
    setStatus(t("admin.notices.saved"));
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.notices.title")}</h1>
        <p className="text-sm text-mist">{t("admin.notices.sub")}</p>

        <section className="app-card p-5">
          <form className="space-y-3" onSubmit={publish}>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.notices.fieldTitle")}</span>
              <input
                className="app-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{t("admin.notices.message")}</span>
              <textarea
                className="app-input min-h-24 py-3"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="app-btn w-auto">
              {t("admin.notices.publish")}
            </button>
          </form>
          {status && (
            <p className="mt-3 text-sm text-mist" role="status">
              {status}
            </p>
          )}
        </section>

        <div className="space-y-3">
          {ready &&
            notices.map((n) => (
              <section key={n.id} className="app-card p-4 text-sm">
                <p className="font-semibold">{n.title}</p>
                <p className="text-mist">{n.body}</p>
                <p className="mt-1 text-xs text-faint">{new Date(n.createdAt).toLocaleString(LOCALE[lang])}</p>
                {n.isSample && <p className="text-xs text-warn">{t("admin.sampleShort")}</p>}
              </section>
            ))}
        </div>

        {ready && outbox.length > 0 && (
          <h2 className="font-display text-xl">{t("admin.notices.outbox")}</h2>
        )}

        <div className="space-y-3">
          {outbox.map((m) => (
            <section key={m.id} className="app-card p-4 text-sm">
              <p className="font-semibold">{m.subject}</p>
              <p className="text-mist">{m.to}</p>
              <button
                type="button"
                className="mt-2 text-cyan"
                onClick={() => setOpenMessage(openMessage === m.id ? null : m.id)}
              >
                {openMessage === m.id ? t("admin.notices.hide") : t("admin.notices.show")}
              </button>
              {openMessage === m.id && (
                <p className="mt-2 whitespace-pre-wrap text-mist">{m.body}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
