"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AppBrand } from "@/components/AppBrand";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useI18n } from "@/lib/i18n";
import { adminSignOut } from "@/lib/adminSession";

const ICONS: Record<string, React.ReactNode> = {
  home: (
    <>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </>
  ),
  people: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  invites: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  content: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  notices: (
    <>
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </>
  ),
  settings: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  out: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {ICONS[name]}
    </svg>
  );
}

const NAV = [
  { label: "admin.nav.home", href: "/admin" },
  { label: "admin.nav.people", href: "/admin/people" },
  { label: "admin.nav.invites", href: "/admin/invites" },
  { label: "admin.nav.content", href: "/admin/content" },
  { label: "admin.nav.notices", href: "/admin/notices" },
  { label: "admin.nav.settings", href: "/admin/settings" },
];

/** Which sidebar entry lights up for a given path. */
function activeFor(pathname: string) {
  if (pathname === "/admin") return "/admin";
  const match = NAV.map((n) => n.href).find((href) => href !== "/admin" && pathname.startsWith(href));
  return match ?? "";
}

/** Dark shell with sidebar, shared by every admin screen. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = activeFor(pathname);

  function leave() {
    adminSignOut();
    router.push("/admin/login");
  }

  return (
    <div className="app-shell">
      <div className="app-glow" />

      {open && (
        <button
          type="button"
          aria-label={t("admin.closeMenu")}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-night/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(260px,85vw)] flex-col border-r border-white/10 bg-night p-4 transition-transform md:w-[260px] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <AppBrand href="/admin" />
          <button
            type="button"
            aria-label={t("admin.close")}
            onClick={() => setOpen(false)}
            className="text-mist md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-3 px-1 text-xs text-faint">Avery · {t("admin.role")}</p>

        <nav className="mt-6 space-y-1 overflow-y-auto" aria-label={t("admin.menu")}>
          {NAV.map((item) => {
            const active = item.href === current;
            const icon = item.href.split("/").pop() || "home";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-accent text-white" : "text-mist hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon name={icon} />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={leave}
          className="mt-auto flex items-center gap-2 px-3 py-3 text-sm text-mist hover:text-white"
        >
          <Icon name="out" />
          {t("shell.signOut")}
        </button>
      </aside>

      <div className="min-w-0 md:pl-[260px]">
        <header className="flex items-center gap-3 border-b border-white/5 px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label={t("admin.openMenu")}
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 shrink-0 place-items-center text-mist"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <AppBrand href="/admin" />
          <div className="ml-auto">
            <LanguageSwitch />
          </div>
        </header>

        <div className="hidden justify-end px-8 pt-4 md:flex">
          <LanguageSwitch />
        </div>

        <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 pb-16 md:px-8">{children}</main>
      </div>
    </div>
  );
}
