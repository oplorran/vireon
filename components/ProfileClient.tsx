"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { ADMIN_DEMO } from "@/lib/config";
import { LOCALE, useI18n } from "@/lib/i18n";
import { memberHref, signOut, useMember } from "@/lib/useMember";

const ITEMS = [
  { key: "profile.settings", href: "/start/profile/settings" },
  { key: "profile.saved", href: "/start/profile/saved" },
  { key: "profile.programs", href: "/start/profile/programs" },
  { key: "profile.notifications", href: "/start/notifications" },
  { key: "profile.help", href: "/start/profile/help" },
  { key: "profile.disclaimer", href: "/start/profile/disclaimer" },
  { key: "profile.terms", href: "/start/profile/terms" },
  { key: "profile.privacy", href: "/start/profile/privacy" },
  { key: "profile.delete", href: "/start/profile/delete" },
];

export function ProfileClient() {
  const { email, name, ready } = useMember();
  const { t, lang } = useI18n();
  const router = useRouter();
  const since = new Date().toLocaleDateString(LOCALE[lang]);

  if (!ready) return null;

  return (
    <AppShell current="/start/profile">
      <DemoNotice />

      <div className="space-y-4">
        <h1 className="font-display text-3xl">{t("profile.title")}</h1>

        <section className="app-card p-5">
          <p className="font-display text-2xl">{name}</p>
          <p className="mt-1 text-sm text-mist">{email ?? ADMIN_DEMO.email}</p>
          <p className="mt-2 text-xs text-faint">{t("profile.access", { date: since })}</p>
        </section>

        <section className="app-card divide-y divide-white/5">
          {ITEMS.map((item) => (
            <Link
              key={item.key}
              href={memberHref(item.href, email)}
              className="block px-5 py-4 text-sm font-medium hover:bg-white/5"
            >
              {t(item.key)}
            </Link>
          ))}
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-lg">{t("profile.install")}</h2>
          <p className="mt-2 text-sm leading-6 text-mist">{t("profile.installText")}</p>
        </section>

        <Link href="/admin" className="block text-sm font-semibold text-cyan">
          {t("profile.admin")}
        </Link>

        <button
          type="button"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          className="app-btn-ghost w-full"
        >
          {t("shell.signOut")}
        </button>
      </div>
    </AppShell>
  );
}
