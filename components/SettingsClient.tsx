"use client";

import { useEffect, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useMember, useMemberName } from "@/lib/useMember";

const PREFS = [
  { id: "programReminders", label: "settings.reminders" },
  { id: "contentUpdates", label: "settings.updates" },
  { id: "productNews", label: "settings.news" },
];

type Prefs = Record<string, boolean>;

const FIELD = "min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      {children}
    </label>
  );
}

export function SettingsClient() {
  const { email, name, ready } = useMember();
  const { save: saveName } = useMemberName();
  const { t } = useI18n();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [prefs, setPrefs] = useState<Prefs>({ programReminders: true, contentUpdates: true, productNews: false });
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;
    const parts = name.split(" ");
    setFirst(parts[0] ?? "");
    setLast(parts.slice(1).join(" "));
    try {
      const raw = window.localStorage.getItem("vireon.member.prefs");
      if (raw) setPrefs({ programReminders: false, contentUpdates: false, productNews: false, ...JSON.parse(raw) });
    } catch {
      /* private mode */
    }
  }, [ready, name]);

  function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    saveName(`${first} ${last}`.trim());
    try {
      window.localStorage.setItem("vireon.member.prefs", JSON.stringify(prefs));
    } catch {
      /* private mode */
    }
    setSaved(t("settings.saved"));
  }

  function download() {
    const read = <T,>(key: string, fallback: T): T => {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        return fallback;
      }
    };
    const payload = {
      user: { email, firstName: first, lastName: last, notificationPrefs: prefs },
      exportedAt: new Date().toISOString(),
      progress: {
        habits: read<Record<string, string[]>>("vireon.member.habits", {}),
        tasks: read<Record<string, unknown>>("vireon.member.tasks", {}),
        saved: read<string[]>("vireon.member.saved", []),
        completedDays: read<Record<string, string>>("vireon.member.days", {}),
        recent: read<unknown[]>("vireon.member.recent", []),
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vireon-max-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("settings.title")}</h1>
        {saved && (
          <p role="status" className="text-sm text-ok">
            {saved}
          </p>
        )}
        {error && (
          <section role="alert" className="app-card p-5">
            <p className="text-sm leading-6 text-mist">{error}</p>
          </section>
        )}

        <section className="app-card p-5">
          <form className="space-y-4" onSubmit={save}>
            <Field label={t("settings.first")}>
              <input
                className={FIELD}
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                required
              />
            </Field>
            <Field label={t("settings.last")}>
              <input
                className={FIELD}
                value={last}
                onChange={(e) => setLast(e.target.value)}
                required
              />
            </Field>

            <fieldset className="space-y-2">
              <legend className="text-sm text-mist">{t("settings.prefs")}</legend>
              {PREFS.map((pref) => (
                <label key={pref.id} className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={prefs[pref.id] ?? false}
                    onChange={(e) => setPrefs({ ...prefs, [pref.id]: e.target.checked })}
                  />
                  {t(pref.label)}
                </label>
              ))}
            </fieldset>

            <button type="submit" className="app-btn w-auto">
              {t("settings.save")}
            </button>
          </form>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("settings.data")}</h2>
          <p className="mt-2 text-sm leading-6 text-mist">{t("settings.dataText")}</p>
          <button type="button" onClick={download} className="app-btn-ghost mt-4">
            {t("settings.download")}
          </button>
        </section>
      </div>
    </AppShell>
  );
}
