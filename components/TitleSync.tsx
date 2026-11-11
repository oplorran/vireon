"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

/** Maps a member-area path to the dictionary key that names the screen. */
const TITLES: Array<[RegExp, string]> = [
  [/^\/start$/, "nav.home"],
  [/^\/start\/trick$/, "trick.title"],
  [/^\/start\/trick\/kegel$/, "trick.kegel.title"],
  [/^\/start\/trick\/lessons(\/.*)?$/, "trick.lessons.title"],
  [/^\/start\/trick\/secrets(\/.*)?$/, "trick.secrets.title"],
  [/^\/start\/trick\/recipes(\/.*)?$/, "trick.recipes.title"],
  [/^\/start\/trick\/tonic$/, "trick.tonic.title"],
  [/^\/start\/trick\/doctor$/, "trick.doctor.title"],
  [/^\/start\/programs$/, "programs.title"],
  [/^\/start\/programs\/[^/]+$/, "programs.title"],
  [/^\/start\/programs\/[^/]+\/days\/[^/]+$/, "programs.dayTitle"],
  [/^\/start\/discover(\/.*)?$/, "discover.title"],  [/^\/start\/progress$/, "progress.title"],
  [/^\/start\/notifications$/, "notifications.title"],
  [/^\/start\/profile$/, "profile.title"],
  [/^\/start\/profile\/settings$/, "profile.settings"],
  [/^\/start\/profile\/saved$/, "profile.saved"],
  [/^\/start\/profile\/programs$/, "profile.programs"],
  [/^\/start\/profile\/completed$/, "profile.programs"],
  [/^\/start\/profile\/notifications$/, "profile.notifications"],
  [/^\/start\/profile\/help$/, "profile.help"],
  [/^\/start\/profile\/disclaimer$/, "profile.disclaimer"],
  [/^\/start\/profile\/terms$/, "profile.terms"],
  [/^\/start\/profile\/privacy$/, "profile.privacy"],
  [/^\/start\/profile\/delete$/, "profile.delete"],
];

/**
 * Server `metadata` is static, so the document title would stay English forever.
 * This keeps the tab title in sync with the active language and route.
 */
export function TitleSync() {
  const pathname = usePathname();
  const { lang, t } = useI18n();

  useEffect(() => {
    if (!pathname) return;
    if (pathname !== "/start" && !pathname.startsWith("/start/")) return;

    const match = TITLES.find(([re]) => re.test(pathname));
    const label = match ? t(match[1]) : null;
    const brand = lang === "pt" ? "Protocolo Vireon" : lang === "es" ? "Protocolo Vireon" : "Vireon Protocol";
    document.title = label ? `${label} · ${brand}` : brand;
  }, [pathname, lang, t]);

  return null;
}
