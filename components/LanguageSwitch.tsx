"use client";

import { LANGS, useI18n, type Lang } from "@/lib/i18n";

const LABEL: Record<Lang, string> = { en: "EN", pt: "PT", es: "ES" };

/** EN / PT / ES switch that actually translates the member area. */
export function LanguageSwitch() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex shrink-0 rounded-full border border-white/10 bg-night/80 p-0.5"
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`min-h-11 min-w-11 rounded-full px-2 text-xs font-semibold transition ${
              active ? "bg-accent text-white" : "text-mist hover:text-white"
            }`}
          >
            {LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
