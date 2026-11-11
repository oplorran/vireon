"use client";

import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin } from "@/lib/adminStore";

export function PeopleClient() {
  const { t } = useI18n();
  const { ready, people, toggleStatus, toggleAccess } = useAdmin();
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const term = query.trim().toLowerCase();
  const visible = people.filter((p) =>
    term ? `${p.firstName} ${p.lastName} ${p.email}`.toLowerCase().includes(term) : true,
  );

  function action(fn: () => void) {
    fn();
    setStatus(t("admin.people.updated"));
  }

  return (
    <AdminShell>
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("admin.people.title")}</h1>

        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(draft);
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("admin.people.search")}
            aria-label={t("admin.people.searchLabel")}
            className="app-input sm:min-w-0 sm:flex-1"
          />
          <button type="submit" className="app-btn-ghost w-full sm:w-auto">
            {t("admin.people.find")}
          </button>
        </form>

        {status && (
          <p role="status" className="text-sm text-mist">
            {status}
          </p>
        )}

        {ready && visible.length === 0 && (
          <section className="app-card p-6 text-center">
            <h2 className="font-display text-xl">
              {term ? t("admin.people.noMatch", { q: query }) : t("admin.people.emptyTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">
              {t("admin.people.emptyBody")}
            </p>
          </section>
        )}

        <div className="space-y-3">
          {visible.map((p) => (
            <section key={p.id} className="app-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {p.firstName} {p.lastName}
                  </p>
                  <p className="break-all text-sm text-mist">{p.email}</p>
                  <p className="mt-1 text-xs text-faint">
                    {t(`admin.role.${p.role}`)} · {t(`admin.status.${p.status}`)} · {t("admin.people.email")}{" "}
                    {p.emailVerified ? t("admin.people.confirmed") : t("admin.people.pendingEmail")} ·{" "}
                    {t("admin.access")} {t(`admin.access.${p.access}`)}
                    {p.isSample ? ` · ${t("admin.sampleShort").toLowerCase()}` : ""}
                  </p>
                </div>

                {p.role !== "admin" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => action(() => toggleStatus(p.id))}
                      className="app-btn-ghost"
                    >
                      {p.status === "suspended" ? t("admin.people.suspended") : t("admin.people.suspend")}
                    </button>
                    {p.access !== "none" && (
                      <button
                        type="button"
                        onClick={() => action(() => toggleAccess(p.id))}
                        className="app-btn-danger"
                      >
                        {p.access === "revoked" ? t("admin.people.return") : t("admin.people.revoke")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
