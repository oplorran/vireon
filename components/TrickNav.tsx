"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { memberHref, useMember } from "@/lib/useMember";

const TABS = [
  { key: "trick.protocol", href: "/start/trick" },
  { key: "trick.kegel", href: "/start/trick/kegel" },
  { key: "trick.lessons", href: "/start/trick/lessons" },
  { key: "trick.secrets", href: "/start/trick/secrets" },
  { key: "trick.recipes", href: "/start/trick/recipes" },
  { key: "trick.tonic", href: "/start/trick/tonic" },
  { key: "trick.doctor", href: "/start/trick/doctor" },
];

/** Horizontal sub-navigation shared by every Trick screen. */
export function TrickNav({ extra = [] }: { extra?: { key: string; href: string }[] }) {
  const { t } = useI18n();
  const { email } = useMember();
  const pathname = usePathname();
  const tabs = [...TABS, ...extra];

  return (
    <nav
      aria-label="Trick"
      className="sticky top-16 z-10 -mx-4 mb-4 border-b border-white/10 bg-ink-950/95 px-4 backdrop-blur"
    >
      <ul className="flex w-full gap-2 overflow-x-auto overscroll-x-contain py-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href} className="shrink-0">
              <Link
                href={memberHref(tab.href, email)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold ${
                  active ? "bg-accent text-white" : "bg-white/5 text-mist"
                }`}
              >
                {t(tab.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
