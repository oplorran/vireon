"use client";

import Link from "next/link";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { findItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";
import { useSaved } from "@/lib/useSaved";

export function SavedClient() {
  const { email } = useMember();
  const { t, lang } = useI18n();
  const { saved } = useSaved();

  return (
    <AppShell current="/start/profile">
      <DemoNotice />
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("profile.saved")}</h1>

        {saved.length === 0 ? (
          <section className="app-card p-5">
            <p className="font-display text-xl">{t("saved.empty")}</p>
            <p className="mt-2 text-sm leading-6 text-mist">{t("saved.emptyText")}</p>
            <Link href={memberHref("/start/discover", email)} className="app-btn mt-4">
              {t("discover.title")}
            </Link>
          </section>
        ) : (
          <section className="app-card divide-y divide-white/5">
            {saved.map((id) => {
              const [cat, slug] = id.split("/");
              const item = findItem(cat, slug);
              if (!item) return null;
              return (
                <Link
                  key={id}
                  href={memberHref(`/start/discover/${cat}/${slug}`, email)}
                  className="block px-5 py-4 hover:bg-white/5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-faint">{t(`tag.${item.tag}`)}</p>
                  <p className="mt-1 text-sm font-semibold">{item.title[lang]}</p>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </AppShell>
  );
}
